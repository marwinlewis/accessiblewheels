"use client";

import React from "react";
import ShopCard, { type Shop } from "../molecules/ShopCard";
import { Wrench } from "lucide-react";

interface ShopListProps {
  shops: Shop[];
  onShopClick: (shop: Shop) => void;
  activeShopId?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export const ShopList: React.FC<ShopListProps> = ({
  shops,
  onShopClick,
  activeShopId,
  isLoading = false,
  emptyMessage = "No workshops found for this search. Try selecting a different city or clearing filters.",
  className = "",
}) => {
  return (
    <div className={`flex flex-col h-full card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
        <h2 className="font-bold text-sm sm:text-base text-slate-900">
          {shops.length > 0 ? `${shops.length} workshops` : "Modification workshops"}
        </h2>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar max-h-[600px] sm:max-h-none">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div
              className="w-8 h-8 border-2 border-slate-300 border-t-blue-800 rounded-full animate-spin mb-3"
              role="status"
              aria-label="Loading"
            />
            <p className="text-slate-500 text-sm">Finding workshops...</p>
          </div>
        ) : shops.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
              <Wrench className="w-6 h-6" aria-hidden="true" />
            </div>
            <p className="text-slate-800 text-sm font-medium">No workshops found</p>
            <p className="text-slate-500 text-sm mt-1 max-w-xs">{emptyMessage}</p>
          </div>
        ) : (
          shops.map((shop) => {
            const key = shop.id || shop.documentId || shop.name;
            const isSelected = activeShopId === shop.id || activeShopId === shop.documentId;
            return (
              <ShopCard
                key={key}
                shop={shop}
                onClick={onShopClick}
                isActive={isSelected}
              />
            );
          })
        )}
      </div>

      {/* Footer Helper */}
      {shops.length > 0 && (
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Select a workshop to focus it on the map</span>
          <span>Total: {shops.length}</span>
        </div>
      )}
    </div>
  );
};

export default ShopList;
