import React from "react";
import ShopCard, { type Shop } from "../molecules/ShopCard";

interface ShopListProps {
  shops: Shop[];
  onShopClick: (shop: Shop) => void;
  activeShopId?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const ShopList: React.FC<ShopListProps> = ({
  shops,
  onShopClick,
  activeShopId,
  isLoading = false,
  emptyMessage = "No shops found. Try searching for a different city.",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col h-full max-h-screen md:max-h-none bg-gray-50 rounded-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-10">
        <h2 className="font-bold text-lg text-gray-900">
          {shops.length > 0
            ? `${shops.length} Shops Found`
            : "Car Modification Shops"}
        </h2>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto max-h-screen">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-8">
              <div className="inline-block">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
              <p className="mt-4 text-gray-600">Loading shops...</p>
            </div>
          </div>
        ) : shops.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-8 px-4">
              <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.5a2 2 0 00-1 .268m-6 0a2 2 0 00-1-.268H5a2 2 0 00-2 2v4a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-600 text-sm">{emptyMessage}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 p-3">
            {shops.map((shop) => (
              <ShopCard
                key={shop.documentId}
                shop={shop}
                onClick={onShopClick}
                isActive={activeShopId === shop.documentId}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      {shops.length > 0 && (
        <div className="bg-white px-4 py-3 border-t border-gray-200 text-xs text-gray-500 text-center">
          Click on a shop to see it on the map
        </div>
      )}
    </div>
  );
};

export default ShopList;
