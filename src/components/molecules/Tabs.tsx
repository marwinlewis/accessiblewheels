"use client";

import React, { useState, ReactNode } from "react";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "./BlockRendererComponent";

export interface Tab {
  id: number;
  label: string;
  title: string;
  description?: string;
  content?: BlocksContent;
  children?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab] as Tab;

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-4 px-2 text-center font-semibold transition-all duration-200 ${
                activeTab === index
                  ? "bg-blue-600 text-white border-b-4 border-blue-700"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="text-sm md:text-base">{tab.label}</div>
              <div className="text-xs md:text-sm truncate">{tab.title}</div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8 bg-white">
          {currentTab.content && (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                    <span className="text-blue-600 font-bold text-lg">
                      {currentTab.id}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {currentTab.title}
                  </h2>
                </div>
                {currentTab.description && (
                  <p className="text-gray-600 ml-13">
                    {currentTab.description}
                  </p>
                )}
              </div>

              {/* Details List */}
              {currentTab.content && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Key Points:
                  </h3>
                  {currentTab.content && (
                    <div className="text-gray-700 pt-0.5">
                      <BlockRendererClient content={currentTab.content} />
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {currentTab.children && currentTab.children}
          {/* Progress Indicator */}
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${((activeTab + 1) / tabs.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 font-semibold">
                {activeTab + 1}/{tabs.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
          disabled={activeTab === 0}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setActiveTab(Math.min(tabs.length - 1, activeTab + 1))}
          disabled={activeTab === tabs.length - 1}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === tabs.length - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tabs;
