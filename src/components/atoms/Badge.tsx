import React from "react";

interface BadgeProps {
  rating: number;
  maxRating?: number;
  variant?: "gold" | "silver" | "bronze" | "gray";
  showLabel?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  rating,
  maxRating = 5,
  variant,
  showLabel = true,
  className = "",
}) => {
  // Determine variant based on rating if not explicitly set
  const getVariant = (): "gold" | "silver" | "bronze" | "gray" => {
    if (variant) return variant;
    if (rating >= 4.5) return "gold";
    if (rating >= 4) return "silver";
    if (rating >= 3.5) return "bronze";
    return "gray";
  };

  const variantStyles = {
    gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
    silver: "bg-gray-100 text-gray-800 border-gray-300",
    bronze: "bg-orange-100 text-orange-800 border-orange-300",
    gray: "bg-gray-200 text-gray-700 border-gray-400",
  };

  const selectedVariant = getVariant();

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border ${variantStyles[selectedVariant]} text-sm font-medium ${className}`}
    >
      <span>★</span>
      <span>{rating.toFixed(1)}</span>
      {showLabel && <span className="text-xs">/ {maxRating}</span>}
    </div>
  );
};

export default Badge;
