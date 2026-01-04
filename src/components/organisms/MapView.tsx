"use client";

import React, { useEffect, useRef, useState } from "react";
import MapMarker from "../atoms/MapMarker";
import { type Shop } from "../molecules/ShopCard";

interface MapViewProps {
  shops: Shop[];
  activeShopId?: string;
  centerLat?: number;
  centerLng?: number;
  onMarkerClick?: (shop: Shop) => void;
  isLoading?: boolean;
  className?: string;
  onUserLocation?: (lat: number, lng: number) => void;
  onUserLocationError?: (message: string) => void;
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
  centerLat = 40.7128,
  centerLng = -74.006,
  onMarkerClick,
  isLoading = false,
  className = "",
  onUserLocation,
  onUserLocationError,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any | null>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const userMarkerRef = useRef<any | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Initialize Google Map
  useEffect(() => {
    if (!mapRef.current) return;

    // Wait for Google Maps API to load
    const checkGoogleMaps = setInterval(() => {
      if ((window as any).google && (window as any).google.maps) {
        clearInterval(checkGoogleMaps);

        googleMapRef.current = new (window as any).google.maps.Map(
          mapRef.current!,
          {
            zoom: 12,
            center: { lat: centerLat, lng: centerLng },
            mapTypeControl: false,
            fullscreenControl: true,
            zoomControl: true,
            streetViewControl: false,
          }
        );

        setMapReady(true);
      }
    }, 100);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkGoogleMaps);
      console.error("Google Maps API failed to load after 10 seconds");
    }, 10000);

    return () => {
      clearInterval(checkGoogleMaps);
      clearTimeout(timeout);
    };
  }, []);

  // Pan map when centerLat/centerLng props change without recreating the map
  useEffect(() => {
    if (!googleMapRef.current || !mapReady) return;
    try {
      googleMapRef.current.panTo({ lat: centerLat, lng: centerLng });
      // Keep a reasonable zoom when panning via search
      googleMapRef.current.setZoom(12);
    } catch (err) {
      console.warn("Failed to pan map to new center:", err);
    }
  }, [centerLat, centerLng, mapReady]);

  // Attempt to get the user's current location and center the map there
  useEffect(() => {
    if (!mapReady || !googleMapRef.current) return;

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          try {
            googleMapRef.current!.panTo({ lat: latitude, lng: longitude });
            googleMapRef.current!.setZoom(14);

            // Show a small user-location marker
            if (userMarkerRef.current) {
              userMarkerRef.current.setMap(null);
            }

            userMarkerRef.current = new (window as any).google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: googleMapRef.current,
              title: "Your location",
              icon: {
                path: (window as any).google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#2563eb",
                fillOpacity: 0.9,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              },
            });

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
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      onUserLocationError?.("Geolocation is not supported by this browser.");
    }

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
        userMarkerRef.current = null;
      }
    };
  }, [mapReady]);

  // Update markers when shops change
  useEffect(() => {
    if (!googleMapRef.current || !mapReady) return;

    const infoWindows = new Map<string, any>();

    // Clear old markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current.clear();
    infoWindows.forEach((iw) => iw.close());

    // Add new markers
    shops.forEach((shop) => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: googleMapRef.current,
        title: shop.name,
        animation:
          activeShopId === shop.id
            ? (window as any).google.maps.Animation.BOUNCE
            : undefined,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: activeShopId === shop.id ? 10 : 7,
          fillColor: activeShopId === shop.id ? "#dc2626" : "#2563eb",
          fillOpacity: activeShopId === shop.id ? 0.9 : 0.7,
          strokeColor: "#fff",
          strokeWeight: 2,
        },
      });

      // Info window
      const distanceText =
        typeof (shop as any).distance === "number"
          ? `${(shop as any).distance.toFixed(1)} km away`
          : "Distance unknown";

      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-weight: 600;">${shop.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${shop.address}</p>
            <p style="margin: 0; font-size: 12px; font-weight: 600; color: #2563eb;">${distanceText}</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindows.forEach((iw) => iw.close());
        infoWindow.open(googleMapRef.current, marker);
        onMarkerClick?.(shop);
      });

      markersRef.current.set(shop.id, marker);
      infoWindows.set(shop.id, infoWindow);
    });

    return () => {
      infoWindows.forEach((iw) => iw.close());
    };
  }, [shops, activeShopId, mapReady, onMarkerClick]);

  // Center map on active shop
  useEffect(() => {
    if (!googleMapRef.current || !activeShopId) return;

    const activeShop = shops.find((s) => s.id === activeShopId);
    if (activeShop) {
      googleMapRef.current.panTo({ lat: activeShop.lat, lng: activeShop.lng });
      googleMapRef.current.setZoom(15);
    }
  }, [activeShopId, shops]);

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

      {!((window as any).google && (window as any).google.maps) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center px-4">
            <p className="text-gray-600 text-sm font-medium">
              Google Maps API not loaded
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Add your API key to .env.local
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
