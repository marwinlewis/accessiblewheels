import React, { ReactNode } from "react";

interface ResultsLayoutProps {
  sidebar: ReactNode;
  mainContent: ReactNode;
  className?: string;
}

/**
 * ResultsLayout Template - Provides a two-column layout
 * On mobile: stacks vertically (sidebar below map)
 * On desktop: sidebar on left, map on right
 */
const ResultsLayout: React.FC<ResultsLayoutProps> = ({
  sidebar,
  mainContent,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row gap-4 h-full w-full ${className}`}
    >
      {/* Main Content (Map) - Shown first on desktop, but map takes priority */}
      <div className="flex-1 min-h-80 lg:min-h-full">{mainContent}</div>

      {/* Sidebar (Shop List) - Responsive width */}
      <div className="w-full lg:w-80 flex flex-col overflow-y-auto">
        {sidebar}
      </div>
    </div>
  );
};

export default ResultsLayout;
