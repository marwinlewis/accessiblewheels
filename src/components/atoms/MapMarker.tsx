import React from "react";

interface MapMarkerProps {
  position?: { lat: number; lng: number };
  label?: string;
  title?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * MapMarker component - renders a marker icon for Google Maps
 * This is a presentational component that represents what a marker looks like.
 * The actual placement on the map is handled by the MapView organism.
 */
const MapMarker: React.FC<MapMarkerProps> = ({
  label,
  title,
  isActive = false,
  onClick,
  className = "",
}) => {
  return (
    <div
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center cursor-pointer transition-transform duration-200 ${
        isActive ? "scale-125" : "scale-100 hover:scale-110"
      } ${className}`}
    >
      <div
        className={`relative w-8 h-8 ${
          isActive ? "drop-shadow-lg" : "drop-shadow"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${
            isActive ? "text-red-600" : "text-blue-600"
          }`}
        >
          <path d="M12 2C6.48 2 2 6.48 2 12c0 7 10 13 10 13s10-6 10-13c0-5.52-4.48-10-10-10zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
        </svg>

        {label && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white border border-gray-300 rounded px-2 py-1 text-xs font-semibold text-gray-800 shadow-md">
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapMarker;
