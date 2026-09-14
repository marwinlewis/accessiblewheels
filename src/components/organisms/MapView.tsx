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
  addressType?: "city" | "state" | "country";
  onMarkerClick?: (shop: Shop) => void;
  isLoading?: boolean;
  className?: string;
  onUserLocation?: (lat: number, lng: number) => void;
  onUserLocationError?: (message: string) => void;
  onVisibleShopsChange?: (visibleShops: Shop[]) => void;
}

const defaultZoom = {
  country: 5,
  city: 12,
  street: 15,
  state: 7,
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export const MapView: React.FC<MapViewProps> = ({
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
      zoomControl: false,
    });

    // Add zoom control in bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // CartoDB Voyager or OpenStreetMap
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Pan map when centerLat/centerLng props change
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
  }, [centerLat, centerLng, mapReady, addressType]);

  // Handle user geolocation
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;

    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          try {
            if (userMarkerRef.current) {
              userMarkerRef.current.remove();
            }

            userMarkerRef.current = L.circleMarker([latitude, longitude], {
              radius: 8,
              color: "#0b5fb0",
              weight: 3,
              fillColor: "#0b5fb0",
              fillOpacity: 0.85,
            }).addTo(mapInstanceRef.current!) as any;

            onUserLocation?.(latitude, longitude);
          } catch (err) {
            console.warn("Error displaying user location", err);
          }
        },
        (err) => {
          // Geolocation silently ignored or handled
          console.warn("Geolocation prompt was dismissed/unavailable", err);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
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

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    shops.forEach((shop) => {
      const shopId = shop.id || shop.documentId || shop.name;
      const isSelected = activeShopId === shopId;

      const el = document.createElement("div");
      el.className = "cursor-pointer transform hover:scale-125 transition-transform duration-200";
      el.innerHTML = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center;">
          ${
            isSelected
              ? `<div style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background: rgba(56, 189, 248, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
              : ""
          }
          <svg viewBox="0 0 24 24" fill="currentColor" style="width: 32px; height: 32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35)); color: ${
            isSelected ? "#0b5fb0" : "#334155"
          };">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>
      `;

      const marker = L.marker([shop.lat, shop.lng], {
        title: shop.name,
        riseOnHover: true,
        icon: L.divIcon({
          className: "",
          html: el.outerHTML,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        }),
      }).addTo(mapInstanceRef.current!);

      const popupHtml = `
        <div style="min-width: 220px; font-family: inherit;">
          <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 4px;">
            ${shop.name}
          </div>
          <div style="display: inline-block; font-size: 11px; font-weight: 600; color: #0b5fb0; background: #eaf2fb; padding: 2px 6px; border-radius: 4px; margin-bottom: 6px;">
            ★ ${shop.rating.toFixed(1)} (${shop.reviews} reviews)${shop.verified ? " • Verified" : ""}
          </div>
          <div style="font-size: 12px; color: #475569; margin-bottom: 8px; line-height: 1.4;">
            ${shop.address}
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px solid #e2e8f0;">
            <span style="font-size: 11px; font-weight: 600; color: #157347;">
              ${typeof shop.distance === "number" ? `${shop.distance.toFixed(1)} km away` : "Workshop"}
            </span>
            <a href="${shop.googleMapUrl}" target="_blank" style="font-size: 11px; color: #0b5fb0; text-decoration: underline; font-weight: 500;">
              Google Maps &rarr;
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on("click", () => {
        onMarkerClick?.(shop);
      });

      markersRef.current.set(shopId, marker);
    });
  }, [shops, activeShopId, mapReady, onMarkerClick]);

  // Center map on active shop
  useEffect(() => {
    if (!mapInstanceRef.current || !activeShopId) return;

    const activeShop = shops.find(
      (s) => (s.id || s.documentId || s.name) === activeShopId
    );

    if (activeShop) {
      mapInstanceRef.current.panTo([activeShop.lat, activeShop.lng]);
      const marker = markersRef.current.get(activeShopId);
      if (marker) {
        marker.openPopup();
      }
      setTimeout(() => {
        mapInstanceRef.current?.setZoom(11);
      }, 500);
    }
  }, [activeShopId, shops]);

  // Bounds change notification
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || !onVisibleShopsChange) return;

    let debounceTimer: NodeJS.Timeout;

    const computeVisibleShops = () => {
      try {
        const bounds = mapInstanceRef.current!.getBounds();
        if (!bounds) return;

        const visibleShopsList = shops.filter((shop) =>
          bounds.contains(L.latLng(shop.lat, shop.lng))
        );

        onVisibleShopsChange(visibleShopsList);
      } catch (err) {
        console.warn("Error computing visible shops:", err);
      }
    };

    computeVisibleShops();
    const onMove = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(computeVisibleShops, 250);
    };

    mapInstanceRef.current.on("moveend", onMove);

    return () => {
      clearTimeout(debounceTimer);
      mapInstanceRef.current?.off("moveend", onMove);
    };
  }, [mapReady, shops, onVisibleShopsChange]);

  return (
    <div
      className={`relative w-full h-80 sm:h-full min-h-[400px] sm:min-h-[550px] rounded-md overflow-hidden border border-slate-200 ${className}`}
    >
      <div ref={mapRef} className="w-full h-full" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-20">
          <div className="card px-6 py-4 flex items-center gap-3">
            <div
              className="w-6 h-6 border-2 border-slate-300 border-t-blue-800 rounded-full animate-spin"
              role="status"
              aria-label="Loading"
            />
            <span className="text-sm font-semibold text-slate-700">Updating map...</span>
          </div>
        </div>
      )}

      {/* Status label */}
      <div className="absolute top-4 left-4 z-10 card px-3 py-1.5 text-xs text-slate-700 font-medium">
        Workshop map
      </div>
    </div>
  );
};

export default MapView;
