"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Shop } from "../molecules/ShopCard";
import { useIsClient } from "@/hooks/useEnvironment";

interface MapViewProps {
  shops: Shop[];
  activeShopId?: string;
  centerLat?: number;
  centerLng?: number;
  addressType: "city" | "state" | "country";
  onMarkerClick?: (shop: Shop) => void;
  isLoading?: boolean;
  className?: string;
  onUserLocation?: (lat: number, lng: number) => void;
  onUserLocationError?: (message: string) => void;
  onVisibleShopsChange?: (visibleShops: Shop[]) => void;
}

enum defaultZoom {
  country = 5,
  city = 12,
  street = 15,
  state = 7,
}

enum defaultCenter {
  lat = 20.5937,
  lng = 78.9629,
}

/**
 * MapView Organism - Renders an interactive Google Map with markers
 * This component manages the Google Maps instance and marker updates.
 *
 * To use this with Google Maps:
 * 1. Get a Google Maps API key from https://cloud.google.com/maps-platform
 * 2. Add it to your .env.local: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
 * 3. Add the script tag to your app layout or use @react-google-maps/api library
 */
const MapView: React.FC<MapViewProps> = ({
  shops,
  activeShopId,
  centerLat = defaultCenter.lat,
  centerLng = defaultCenter.lng,
  addressType = "city",
  onMarkerClick,
  isLoading = false,
  className = "",
  onUserLocation,
  onUserLocationError,
  onVisibleShopsChange,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const isClient = useIsClient();

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: defaultZoom.country,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Pan map when centerLat/centerLng props change without recreating the map
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;
    try {
      if (centerLat !== defaultCenter.lat && centerLng !== defaultCenter.lng) {
        mapInstanceRef.current.panTo([centerLat, centerLng]);
        if (addressType === "country") {
          mapInstanceRef.current.setZoom(defaultZoom.country);
        } else if (addressType === "state") {
          mapInstanceRef.current.setZoom(defaultZoom.state);
        } else {
          mapInstanceRef.current.setZoom(defaultZoom.city);
        }
      }
    } catch (err) {
      console.warn("Failed to pan map to new center:", err);
    }
  }, [centerLat, centerLng, mapReady]);

  // Attempt to get the user's current location and center the map there
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          try {
            mapInstanceRef.current!.panTo([latitude, longitude]);
            mapInstanceRef.current!.setZoom(defaultZoom.city);

            // Show a small user-location marker
            if (userMarkerRef.current) {
              userMarkerRef.current.remove();
            }

            userMarkerRef.current = L.circleMarker([latitude, longitude], {
              radius: 6,
              color: "#ffffff",
              weight: 2,
              fillColor: "#2563eb",
              fillOpacity: 0.9,
            }).addTo(mapInstanceRef.current!) as any;

            onUserLocation?.(latitude, longitude);
          } catch (err) {
            console.warn("Error centering map on user location", err);
            onUserLocationError?.("Failed to center map on your location.");
          }
        },
        (err) => {
          console.warn("Geolocation error:", err);
          // Provide a friendly message for common error codes
          let msg = "Failed to get your location.";
          if (err && typeof err.code === "number") {
            switch (err.code) {
              case 1:
                msg =
                  "Location permission denied. Allow location access in your browser.";
                break;
              case 2:
                msg = "Position unavailable.";
                break;
              case 3:
                msg = "Location request timed out.";
                break;
            }
          } else if (err && err.message) {
            msg = err.message;
          }

          onUserLocationError?.(msg);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      );
    } else {
      onUserLocationError?.("Geolocation is not supported by this browser.");
    }

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
    };
  }, [mapReady]);

  // Update markers when shops change
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    shops.forEach((shop) => {
      const el = document.createElement("div");
      // Use a simple SVG marker for consistent styling
      el.innerHTML = `\n        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:24px;height:24px; color: ${
        activeShopId === shop.documentId ? "#dc2626" : "#6a06cf"
      }">\n          <path d=\"M12 2C6.48 2 2 6.48 2 12c0 7 10 13 10 13s10-6 10-13c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z\" />\n        </svg>\n      `;

      const marker = L.marker([shop.lat, shop.lng], {
        title: shop.name,
        riseOnHover: true,
        icon: L.divIcon({
          className: "",
          html: el.outerHTML,
          iconSize: [24, 24],
          iconAnchor: [12, 24],
        }),
      }).addTo(mapInstanceRef.current!);

      marker.on("click", () => {
        marker
          .bindPopup(
            `\n            <div style=\"padding: 8px;\">\n              <h3 style=\"margin: 0 0 4px 0; font-weight: 600;\">${
              shop.name
            }</h3>\n              <p style=\"margin: 0 0 4px 0; font-size: 12px; color: #666;\">${
              shop.address
            }</p>\n              <p style=\"margin: 0; font-size: 12px; font-weight: 600; color: #2563eb;\">${
              typeof (shop as any).distance === "number"
                ? `${(shop as any).distance.toFixed(1)} km away`
                : "Distance unknown"
            }</p>\n            </div>\n          `,
          )
          .openPopup();

        onMarkerClick?.(shop);
      });

      markersRef.current.set(shop.documentId, marker);
    });
  }, [shops, activeShopId, mapReady, onMarkerClick]);

  // Center map on active shop
  useEffect(() => {
    if (!mapInstanceRef.current || !activeShopId) return;

    const activeShop = shops.find((s) => s.documentId === activeShopId);
    if (activeShop) {
      mapInstanceRef.current.panTo([activeShop.lat, activeShop.lng]);
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current?.setZoom(10);
        }, 800);
      }
    }
  }, [activeShopId, shops]);

  // Compute and notify visible shops when map bounds change (zoom/pan)
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || !onVisibleShopsChange) return;

    let debounceTimer: NodeJS.Timeout;

    const computeVisibleShops = () => {
      try {
        const bounds = mapInstanceRef.current!.getBounds();
        if (!bounds) return;

        const visibleShopsList = shops.filter((shop) =>
          bounds.contains(L.latLng(shop.lat, shop.lng)),
        );

        onVisibleShopsChange(visibleShopsList);
      } catch (err) {
        console.warn("Error computing visible shops:", err);
      }
    };

    computeVisibleShops();
    const onMove = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(computeVisibleShops, 200);
    };

    mapInstanceRef.current.on("moveend", onMove);

    return () => {
      clearTimeout(debounceTimer);
      mapInstanceRef.current?.off("moveend", onMove);
    };
  }, [mapReady, shops, onVisibleShopsChange]);

  return (
    <div
      className={`relative w-full h-full bg-gray-200 rounded-lg overflow-hidden ${className}`}
    >
      <div ref={mapRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg px-6 py-4 shadow-lg">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
            <p className="mt-3 text-sm text-gray-600 whitespace-nowrap">
              Loading map...
            </p>
          </div>
        </div>
      )}

      {isClient && !mapInstanceRef.current && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center px-4">
            <p className="text-gray-600 text-sm font-medium">
              Map not initialized
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
