import React from "react";
import Badge from "../atoms/Badge";
import Link from "next/link";

interface Shop {
  documentId: string;
  name: string;
  rating: number;
  reviews: number;
  distance?: number; // in km (optional — may be unavailable when user location is unknown)
  address: string;
  imageUrl: string;
  lat: number;
  lng: number;
  images: Array<{
    url: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  }>;
  googleMapUrl: string;
}

interface ShopCardProps {
  shop: Shop;
  onClick?: (shop: Shop) => void;
  isActive?: boolean;
  className?: string;
}

const ShopCard: React.FC<ShopCardProps> = ({
  shop,
  onClick,
  isActive = false,
  className = "",
}) => {
  return (
    <div
      onClick={() => onClick?.(shop)}
      className={`group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer ${
        isActive ? "ring-2 ring-blue-500 shadow-lg" : ""
      } ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-40 overflow-hidden bg-gray-200">
        <img
          src={`${
            shop?.images?.[0]?.formats?.large?.url || shop?.images?.[0]?.url
          }`}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Content Container */}
      <div className="p-4 bg-white">
        {/* Header with Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-lg flex-1 line-clamp-2">
            {shop.name}
          </h3>
          <Badge rating={shop.rating} showLabel={false} />
        </div>

        {/* Rating Info */}
        <p className="text-xs text-gray-500 mb-2">({shop.reviews} reviews)</p>

        {/* Address */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {shop.address}
        </p>

        {/* Distance */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          {typeof shop.distance === "number" ? (
            <span className="text-sm font-semibold text-blue-600">
              {shop.distance.toFixed(1)} km away
            </span>
          ) : (
            <span className="text-sm text-gray-400">Distance unknown</span>
          )}
          <Link href={shop.googleMapUrl} target="_blank">
            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded font-medium">
              View on Google Maps
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { type Shop };
export default ShopCard;
