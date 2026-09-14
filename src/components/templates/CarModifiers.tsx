"use client";

import React, { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Search, Navigation, Filter, X } from "lucide-react";
import { type Shop } from "@/components/molecules/ShopCard";
import ShopList from "@/components/organisms/ShopList";
import { useIsClient } from "@/hooks/useEnvironment";
import { useLanguage } from "@/i18n/context";

const MapView = dynamic(
  () => import("@/components/organisms/MapView").then((mod) => mod.default),
  { ssr: false }
);

interface SearchLocation {
  lat: number;
  lng: number;
  address: string;
  addressType: "city" | "state" | "country";
}

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

interface CarModifiersPageProps {
  shops: Shop[];
}

const CITIES = [
  { name: "All Cities", lat: 20.5937, lng: 78.9629, type: "country" as const },
  { name: "Mumbai", lat: 19.19, lng: 72.8, type: "city" as const },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, type: "city" as const },
  { name: "Chennai", lat: 13.0827, lng: 80.2707, type: "city" as const },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873, type: "city" as const },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714, type: "city" as const },
  { name: "Karnal", lat: 29.6857, lng: 76.9905, type: "city" as const },
];

export const CarModifiersPage: React.FC<CarModifiersPageProps> = ({ shops }) => {
  const { t } = useLanguage();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [activeShopId, setActiveShopId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState<SearchLocation>({
    lat: 20.5937,
    lng: 78.9629,
    address: "India",
    addressType: "country",
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [visibleShops, setVisibleShops] = useState<Shop[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isClient = useIsClient();

  const handleCitySelect = (city: (typeof CITIES)[0]) => {
    setSelectedCity(city.name);
    setSearchLocation({
      lat: city.lat,
      lng: city.lng,
      address: city.name === "All Cities" ? "India" : city.name,
      addressType: city.type,
    });
    setActiveShopId(undefined);
    setError(null);
  };

  const handleSearch = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchValue.trim()) {
      setSelectedCity("All Cities");
      setSearchLocation({
        lat: 20.5937,
        lng: 78.9629,
        address: "India",
        addressType: "country",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resp = await fetch(`/api/geocode?q=${encodeURIComponent(searchValue)}`);
      if (resp.ok) {
        const json = await resp.json();
        if (json && json.location) {
          setSearchLocation({
            lat: json.location.lat,
            lng: json.location.lng,
            address: json.formatted_address || searchValue,
            addressType: json.addressType || "city",
          });
          setSelectedCity(searchValue);
          setActiveShopId(undefined);
          return;
        }
      }
      setError(`Could not find location "${searchValue}". Try cities like Mumbai, Jaipur, Bangalore, etc.`);
    } catch {
      setError("Failed to geocode location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setSearchLocation({
            lat: latitude,
            lng: longitude,
            address: "Your Location",
            addressType: "city",
          });
          setSelectedCity("Near Me");
          setIsLoading(false);
        },
        () => {
          setError(t.workshops.locationDenied);
          setIsLoading(false);
        }
      );
    }
  };

  const sortedShops = useMemo(() => {
    const origin = userLocation ?? {
      lat: searchLocation.lat,
      lng: searchLocation.lng,
    };

    const isCountry = searchLocation.address === "India" && !userLocation;

    return shops
      .map((shop) => {
        const distance = isCountry
          ? undefined
          : calculateDistance(origin.lat, origin.lng, shop.lat, shop.lng);
        return { ...shop, distance };
      })
      .sort((a, b) => {
        if (typeof a.distance === "number" && typeof b.distance === "number") {
          return a.distance - b.distance;
        }
        return b.rating - a.rating;
      });
  }, [shops, searchLocation, userLocation]);

  const shopsForList = visibleShops !== null ? visibleShops : sortedShops;

  return (
    <div id="workshops" className="w-full space-y-6 pt-4">
      {/* Search & City Filter Bar */}
      <div className="card p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
              <label htmlFor="workshop-search" className="sr-only">
                {t.workshops.searchPlaceholder}
              </label>
              <input
                id="workshop-search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t.workshops.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-700"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchValue("");
                    handleCitySelect(CITIES[0]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-md bg-blue-800 hover:bg-blue-900 text-white text-sm font-semibold flex items-center gap-1.5"
            >
              <span>{t.workshops.searchButton}</span>
            </button>
          </form>

          {/* Near Me GPS Button */}
          <button
            onClick={handleUseMyLocation}
            className="px-4 py-2.5 rounded-md bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.workshops.useMyLocation}</span>
          </button>
        </div>

        {/* Quick Filter City Pills */}
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1 mr-1 flex-shrink-0">
            <Filter className="w-3 h-3" aria-hidden="true" />
            {t.workshops.citiesLabel}
          </span>
          {CITIES.map((c) => (
            <button
              key={c.name}
              onClick={() => handleCitySelect(c)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap border ${
                selectedCity === c.name
                  ? "bg-blue-50 text-blue-800 border-blue-700"
                  : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {c.name === "All Cities" ? t.workshops.allCities : c.name}
            </button>
          ))}
        </div>

        {/* Error Notice */}
        {error && (
          <div role="alert" className="mt-3 p-3 rounded-md bg-red-50 border border-red-300 text-red-800 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Main Split View: Map + Workshops List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Workshop Cards */}
        <div className="lg:col-span-5 order-2 lg:order-1 h-full">
          <ShopList
            shops={shopsForList}
            onShopClick={(shop) => {
              const shopId = shop.id || shop.documentId || shop.name;
              setActiveShopId(shopId);
            }}
            activeShopId={activeShopId}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column: Interactive Map */}
        <div className="lg:col-span-7 order-1 lg:order-2 h-[450px] sm:h-[650px] sticky top-24">
          {isClient && (
            <MapView
              shops={sortedShops}
              activeShopId={activeShopId}
              centerLat={searchLocation.lat}
              centerLng={searchLocation.lng}
              addressType={searchLocation.addressType}
              onMarkerClick={(shop) => {
                const shopId = shop.id || shop.documentId || shop.name;
                setActiveShopId(shopId);
              }}
              onVisibleShopsChange={setVisibleShops}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarModifiersPage;
