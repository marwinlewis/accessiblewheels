"use client";

import React from "react";
import { Star, MapPin, Phone, ExternalLink, Navigation, ShieldCheck } from "lucide-react";

export interface Shop {
  id?: string;
  documentId?: string;
  name: string;
  rating: number;
  reviews: number;
  distance?: number; // in km
  city?: string;
  address: string;
  lat: number;
  lng: number;
  phoneNumbers?: Array<{ phone: string } | string>;
  images?: Array<any>;
  googleMapUrl: string;
  verified?: boolean;
}

interface ShopCardProps {
  shop: Shop;
  onClick?: (shop: Shop) => void;
  isActive?: boolean;
  className?: string;
}

const FALLBACK_API_IMAGE = "/media/car_ferro_a2a4e82d9d.jpg";

function getShopImageUrl(images?: Array<any>): string {
  const firstImage = images?.[0];
  if (!firstImage) return FALLBACK_API_IMAGE;

  if (typeof firstImage === "string") {
    if (firstImage.startsWith("http://") || firstImage.startsWith("https://")) {
      return firstImage;
    }
    if (firstImage.startsWith("/media/")) {
      return firstImage;
    }
    if (firstImage.startsWith("/api/media/file/")) {
      return firstImage.replace(/^\/api\/media\/file\//, "/media/");
    }
    return `/media/${firstImage}`;
  }

  if (typeof firstImage === "object") {
    const candidate =
      firstImage.url ||
      firstImage.sizes?.medium?.url ||
      firstImage.sizes?.thumbnail?.url ||
      (firstImage.filename ? `/media/${firstImage.filename}` : "");

    if (candidate) {
      if (candidate.startsWith("/api/media/file/")) {
        return candidate.replace(/^\/api\/media\/file\//, "/media/");
      }
      return candidate;
    }
  }

  return FALLBACK_API_IMAGE;
}

export const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  onClick,
  isActive = false,
  className = "",
}) => {
  const imageUrl = getShopImageUrl(shop.images);

  // Normalize phone numbers
  const phones: string[] = [];
  if (Array.isArray(shop.phoneNumbers)) {
    shop.phoneNumbers.forEach((p) => {
      if (typeof p === "string") phones.push(p);
      else if (p && typeof p === "object" && p.phone) phones.push(p.phone);
    });
  }

  const primaryPhone = phones[0];

  return (
    <div
      onClick={() => onClick?.(shop)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(shop);
        }
      }}
      className={`rounded-md overflow-hidden card cursor-pointer ${
        isActive ? "ring-2 ring-blue-700 border-blue-700" : "hover:border-slate-400"
      } ${className}`}
    >
      {/* Image Banner */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={`${shop.name} workshop`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.dataset.fallbackTried) {
              target.dataset.fallbackTried = "true";
              target.src = FALLBACK_API_IMAGE;
            }
          }}
        />

        {shop.verified && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Verified</span>
          </div>
        )}

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
          <span>{shop.rating.toFixed(1)}</span>
          <span className="text-[11px] text-slate-500 font-normal">({shop.reviews})</span>
        </div>

        {shop.city && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white border border-slate-300 text-slate-700 text-xs font-medium">
            {shop.city}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-slate-900 text-base line-clamp-1">
          {shop.name}
        </h3>

        <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>{shop.address}</span>
        </p>

        {/* Distance and Quick Actions */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            {typeof shop.distance === "number" ? (
              <span className="text-slate-700 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                {shop.distance.toFixed(1)} km away
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1">
                <Navigation className="w-3 h-3" aria-hidden="true" />
                Select a location
              </span>
            )}
          </div>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone}`}
                className="p-2 rounded-md bg-white hover:bg-slate-50 text-slate-600 border border-slate-300"
                title={`Call ${primaryPhone}`}
                aria-label={`Call ${shop.name} at ${primaryPhone}`}
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            )}

            {shop.googleMapUrl && (
              <a
                href={shop.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 text-xs font-semibold rounded-md bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1"
                title="View directions on Google Maps"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
