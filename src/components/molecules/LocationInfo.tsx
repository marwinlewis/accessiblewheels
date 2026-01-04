import React from "react";

interface LocationInfoProps {
  icon: "location" | "phone" | "clock" | "website";
  label: string;
  value: string;
  href?: string;
  className?: string;
}

const iconMap = {
  location: (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  phone: (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.331.72.742 1.394 1.207 2.011.466.618.955 1.192 1.457 1.71l1.414-1.414a1 1 0 011.414 0l3.534 3.534a1 1 0 010 1.414l-1.414 1.414c.518.502 1.092.991 1.71 1.457.617.465 1.29.876 2.011 1.207l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57a2.571 2.571 0 01-2.528-2.131A26.323 26.323 0 003.133 5.529a2.571 2.571 0 01-2.002-2.515A.5.5 0 012 3z" />
    </svg>
  ),
  clock: (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-2.829 2.829a1 1 0 101.415 1.415L9 10.414V6z"
        clipRule="evenodd"
      />
    </svg>
  ),
  website: (
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.586 4.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM12 0a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L13 2.414V9a1 1 0 11-2 0V2.414L6.707 8.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0112 0z" />
    </svg>
  ),
};

const LocationInfo: React.FC<LocationInfoProps> = ({
  icon,
  label,
  value,
  href,
  className = "",
}) => {
  const content = (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="flex-shrink-0 text-blue-600 mt-0.5">{iconMap[icon]}</div>
      <div className="flex-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-900 break-words">{value}</p>
      </div>
    </div>
  );

  if (href && (icon === "phone" || icon === "website")) {
    return (
      <a
        href={href}
        target={icon === "website" ? "_blank" : undefined}
        rel={icon === "website" ? "noopener noreferrer" : undefined}
        className="hover:opacity-70 transition-opacity duration-200"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default LocationInfo;
