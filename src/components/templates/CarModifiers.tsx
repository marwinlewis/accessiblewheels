"use client";

import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import ShopList from "@/components/organisms/ShopList";
import MapView from "@/components/organisms/MapView";
import ResultsLayout from "@/components/templates/ResultsLayout";
import { type Shop } from "@/components/molecules/ShopCard";
import DUMMY_SHOPS_JSON from "@/data/dummy-shops-india.json";

// Use the JSON file with Indian city dummy shops. In case TypeScript
// doesn't infer the type for JSON imports, cast to `Shop[]`.
const DUMMY_SHOPS: Shop[] = DUMMY_SHOPS_JSON as unknown as Shop[];

interface SearchLocation {
  lat: number;
  lng: number;
  address: string;
}

// Map of Indian city names to approximate coordinates
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  mumbai: { lat: 19.0761, lng: 72.8775 },
  delhi: { lat: 28.6139, lng: 77.209 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  bengaluru: { lat: 12.9716, lng: 77.5946 },
  chennai: { lat: 13.0827, lng: 80.2707 },
  kolkata: { lat: 22.5726, lng: 88.3639 },
  hyderabad: { lat: 17.3648, lng: 78.4747 },
  pune: { lat: 18.5204, lng: 73.8567 },
  ahmedabad: { lat: 23.0225, lng: 72.5714 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
  lucknow: { lat: 26.8467, lng: 80.9462 },
};

/**
 * Calculate distance between two coordinates using Haversine formula (in km)
 */
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const CarModifiersPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [shops, setShops] = useState<Shop[]>(DUMMY_SHOPS);
  const [activeShopId, setActiveShopId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState<SearchLocation>({
    lat: 20.5937,
    lng: 78.9629,
    address: "India",
  });
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [visibleShops, setVisibleShops] = useState<Shop[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle city search with actual coordinates
   */
  const handleSearch = useCallback(async () => {
    if (!searchValue.trim()) {
      setError("Please enter a city or location");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      const cityKey = searchValue.toLowerCase().trim();
      const coords = CITY_COORDS[cityKey];

      if (coords) {
        setSearchLocation({
          lat: coords.lat,
          lng: coords.lng,
          address: searchValue,
        });
        setActiveShopId(undefined);
        return;
      }

      // If not in the static map, call server-side geocode endpoint (biased to India)
      try {
        const resp = await fetch(
          `/api/geocode?q=${encodeURIComponent(searchValue)}`
        );
        if (resp.ok) {
          const json = await resp.json();
          if (json && json.location) {
            setSearchLocation({
              lat: json.location.lat,
              lng: json.location.lng,
              address: json.formatted_address || searchValue,
            });
            setActiveShopId(undefined);
            return;
          }
        } else {
          console.warn("Server geocode returned", resp.status);
        }
      } catch (e) {
        console.error("Server geocode failed", e);
      }

      setError(
        `Could not find location "${searchValue}". Try a different place in India.`
      );
    } catch (err) {
      setError("Failed to search for shops. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  /**
   * Handle shop card click - center map on selected shop
   */
  const handleShopClick = useCallback((shop: Shop) => {
    setActiveShopId(shop.id);
    // Map will automatically center due to useEffect in MapView
  }, []);

  // Load initial shops on component mount
  useEffect(() => {
    // Simulate initial data load
    setShops(DUMMY_SHOPS);
  }, []);

  /**
   * Sort shops: prioritize shops from searched city, then by distance from search location
   */
  const sortedShops = React.useMemo(() => {
    const searchedCity = searchLocation.address.toLowerCase().trim();
    const searchedCityKey =
      searchedCity === "your location" ? "" : searchedCity.split(",")[0].trim();

    // Separate shops into two groups with calculated distances
    const shopsFromSearchCity: Shop[] = [];
    const otherShops: Shop[] = [];

    // Use user location when available; otherwise fall back to searchLocation
    const origin = userLocation ?? {
      lat: searchLocation.lat,
      lng: searchLocation.lng,
    };

    shops.forEach((shop) => {
      const distance = calculateDistance(
        origin.lat,
        origin.lng,
        shop.lat,
        shop.lng
      );
      const enrichedShop = { ...shop } as Shop;
      enrichedShop.distance = distance;

      // Check if shop is from the searched city
      const shopCity = shop.address.toLowerCase();
      if (searchedCityKey && shopCity.includes(searchedCityKey)) {
        shopsFromSearchCity.push(enrichedShop);
      } else {
        otherShops.push(enrichedShop);
      }
    });

    if (origin) {
      // Sort both groups by distance when we have a user location
      shopsFromSearchCity.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      otherShops.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else {
      // Without user location, sort by rating as a fallback
      shopsFromSearchCity.sort((a, b) => b.rating - a.rating);
      otherShops.sort((a, b) => b.rating - a.rating);
    }

    // Combine: searched city shops first, then all others
    return [...shopsFromSearchCity, ...otherShops];
  }, [shops, searchLocation, userLocation]);

  // Show visible shops when zoomed in, otherwise show sorted shops
  const shopsForList = visibleShops !== null ? visibleShops : sortedShops;

  return (
    <div className="flex flex-col w-full h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Car Modifiers Locator
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Find the best car modification shops near you
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearch={handleSearch}
            placeholder="Enter a city name (e.g., Mumbai, Delhi, Bengaluru)..."
            isLoading={isLoading}
          />

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <svg
                className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Current Location Info */}
          {searchLocation && (
            <p className="text-xs text-gray-500 mt-3">
              Showing results near:{" "}
              <span className="font-semibold text-gray-700">
                {searchLocation.address}
              </span>
            </p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <ResultsLayout
            mainContent={
              <MapView
                shops={sortedShops}
                activeShopId={activeShopId}
                centerLat={searchLocation.lat}
                centerLng={searchLocation.lng}
                onMarkerClick={handleShopClick}
                onVisibleShopsChange={setVisibleShops}
                onUserLocation={(lat, lng) => {
                  setUserLocation({ lat, lng });
                  setSearchLocation({ lat, lng, address: "Your location" });
                }}
                onUserLocationError={(msg) => setError(msg)}
                isLoading={isLoading}
              />
            }
            sidebar={
              <ShopList
                shops={shopsForList}
                onShopClick={handleShopClick}
                activeShopId={activeShopId}
                isLoading={isLoading}
              />
            }
          />
        </div>
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-gray-200 py-4 px-4 text-center text-xs text-gray-500">
        <p>
          💡 Click on a shop card to center the map. Use the search bar to find
          shops in different cities.
        </p>
      </footer>
    </div>
  );
};

export default CarModifiersPage;
