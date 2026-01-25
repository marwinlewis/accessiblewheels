"use client";

import React, { useState, useCallback } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import ShopList from "@/components/organisms/ShopList";

import ResultsLayout from "@/components/templates/ResultsLayout";
import { type Shop } from "@/components/molecules/ShopCard";
import { useIsClient } from "@/hooks/useEnvironment";

import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("@/components/organisms/MapView").then((mod) => mod.default),
  { ssr: false },
);

interface SearchLocation {
  lat: number;
  lng: number;
  address: string;
  addressType: "city" | "state" | "country";
}

/**
 * Calculate distance between two coordinates using Haversine formula (in km)
 */
const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
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

interface CarModifiersPageProps {
  shops: Shop[];
}

const CarModifiersPage: React.FC<CarModifiersPageProps> = ({ shops }) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeShopId, setActiveShopId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState<SearchLocation>({
    lat: 20.5937,
    lng: 78.9629,
    address: "India",
    addressType: "country",
  });
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [visibleShops, setVisibleShops] = useState<Shop[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [geolocationDenied, setGeolocationDenied] = useState(false);
  const isClient = useIsClient();

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
    setGeolocationDenied(false); // User is searching, so allow distance calculation

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      // If not in the static map, call server-side geocode endpoint (biased to India)
      try {
        const resp = await fetch(
          `/api/geocode?q=${encodeURIComponent(searchValue)}`,
        );
        if (resp.ok) {
          const json = await resp.json();
          if (json && json.location) {
            setSearchLocation({
              lat: json.location.lat,
              lng: json.location.lng,
              address: json.formatted_address || searchValue,
              addressType: json.addressType || "city",
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
        `Could not find location "${searchValue}". Try a different place in India.`,
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
    console.log({ shop });
    setActiveShopId(shop.documentId);
    // Map will automatically center due to useEffect in MapView
  }, []);

  /**
   * Sort shops: prioritize shops from searched city, then by distance from search location
   */
  const sortedShops = React.useMemo(() => {
    const searchedCity = searchLocation.address.toLowerCase().trim();
    const searchedCityKey =
      searchedCity === "your location" ? "" : searchedCity.split(",")[0].trim();
    const isInitialSearch = searchLocation.address === "India";

    // Separate shops into two groups with calculated distances
    const shopsFromSearchCity: Shop[] = [];
    const otherShops: Shop[] = [];

    // Use user location when available; otherwise fall back to searchLocation
    const origin = userLocation ?? {
      lat: searchLocation.lat,
      lng: searchLocation.lng,
    };

    // Only calculate distances if:
    // 1. User allowed geolocation (userLocation is set), OR
    // 2. User has explicitly searched for a location (searchLocation is not default "India")
    const shouldCalculateDistance = !geolocationDenied || !isInitialSearch;

    shops.forEach((shop) => {
      const enrichedShop = { ...shop } as Shop;

      if (shouldCalculateDistance) {
        const distance = calculateDistance(
          origin.lat,
          origin.lng,
          shop.lat,
          shop.lng,
        );
        enrichedShop.distance = distance;
      }
      // If geolocation denied and no search, don't set distance (leave as undefined)

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
  }, [shops, searchLocation, userLocation, geolocationDenied]);

  // Show visible shops when zoomed in, otherwise show sorted shops
  const shopsForList = visibleShops !== null ? visibleShops : sortedShops;

  return (
    <div className="flex flex-col w-full sm:h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-5 py-6">
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
      <main className="flex-1 sm:overflow-hidden">
        <div className="h-full max-w-8xl mx-auto px-4 sm:px-4 lg:px-5 py-6">
          {isClient && (
            <ResultsLayout
              mainContent={
                <MapView
                  shops={sortedShops}
                  activeShopId={activeShopId}
                  centerLat={searchLocation.lat}
                  centerLng={searchLocation.lng}
                  addressType={searchLocation.addressType}
                  onMarkerClick={handleShopClick}
                  onVisibleShopsChange={setVisibleShops}
                  onUserLocation={(lat, lng) => {
                    setUserLocation({ lat, lng });
                    setSearchLocation({
                      lat,
                      lng,
                      address: "Your location",
                      addressType: "city",
                    });
                  }}
                  onUserLocationError={(msg) => {
                    setError(msg);
                    setGeolocationDenied(true);
                  }}
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
          )}
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
