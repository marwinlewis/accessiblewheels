"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  FileCheck2,
  MapPin,
} from "lucide-react";

export interface KeyPoint {
  title: string;
  text: string;
  linkUrl?: string;
  linkLabel?: string;
}

export interface Tab {
  id: number;
  label: string;
  slug: string;
  title: string;
  description?: string;
  keyPoints?: KeyPoint[];
  content?: any;
  showMap?: boolean;
  children?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  openedTab?: number;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, openedTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(openedTab);
  const currentTab = tabs[activeTab] || tabs[0];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (typeof window !== "undefined") {
      const slug = tabs[index]?.slug || `step-${index + 1}`;
      window.history.pushState({}, "", `/${slug}`);
    }
  };

  useEffect(() => {
    if (openedTab >= 0 && openedTab < tabs.length) {
      setActiveTab(openedTab);
    }
  }, [openedTab, tabs.length]);

  if (!currentTab) return null;

  return (
    <div id="guide" className="w-full max-w-7xl mx-auto py-8">
      {/* Step Progress */}
      <div className="card p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
            Step-by-step guide
          </span>
          <span className="text-xs font-semibold text-slate-600">
            Step {activeTab + 1} of {tabs.length}
          </span>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
          role="tablist"
          aria-label="Guide steps"
        >
          {tabs.map((tab, idx) => {
            const isActive = activeTab === idx;
            const isCompleted = activeTab > idx;

            return (
              <button
                key={tab.slug || idx}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(idx)}
                className={`flex flex-col p-3 sm:p-4 rounded-md text-left border transition-colors ${
                  isActive
                    ? "bg-blue-50 border-blue-700 text-slate-900"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      isActive
                        ? "bg-blue-800 text-white"
                        : isCompleted
                        ? "bg-slate-700 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> : idx + 1}
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wide">
                    {tab.label}
                  </span>
                </div>

                <span className="text-xs sm:text-sm font-semibold line-clamp-1">
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Content */}
      <div className="card p-6 sm:p-10 mb-8">
        <div className="border-b border-slate-200 pb-6 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-700 border border-slate-200 rounded">
              {currentTab.label}
            </span>
            {currentTab.showMap && (
              <span className="px-2.5 py-1 text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 rounded flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Includes workshop map</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentTab.title}
          </h2>

          {currentTab.description && (
            <p className="mt-3 text-base text-slate-700 max-w-3xl leading-relaxed">
              {currentTab.description}
            </p>
          )}
        </div>

        {/* Key Points */}
        {currentTab.keyPoints && currentTab.keyPoints.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 mb-5 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4" aria-hidden="true" />
              <span>What to do</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentTab.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className="p-5 rounded-md border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {point.title}
                      </h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2">
                      {point.text}
                    </p>
                  </div>

                  {point.linkUrl && (
                    <div className="mt-4 pt-3 border-t border-slate-200">
                      <a
                        href={point.linkUrl}
                        target={point.linkUrl.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:underline"
                      >
                        <span>{point.linkLabel || "Open official portal"}</span>
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Embedded Children (e.g. Workshop Map on Step 3) */}
        {currentTab.children && (
          <div className="mt-8 pt-8 border-t border-slate-200">
            {currentTab.children}
          </div>
        )}

        {/* Step Navigation */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => handleTabChange(Math.max(0, activeTab - 1))}
            disabled={activeTab === 0}
            className={`px-4 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 border ${
              activeTab === 0
                ? "opacity-40 cursor-not-allowed text-slate-500 bg-slate-50 border-slate-200"
                : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
            }`}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous step</span>
          </button>

          <button
            onClick={() => handleTabChange(Math.min(tabs.length - 1, activeTab + 1))}
            disabled={activeTab === tabs.length - 1}
            className={`px-4 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 ${
              activeTab === tabs.length - 1
                ? "opacity-40 cursor-not-allowed text-slate-500 bg-slate-100"
                : "bg-blue-800 hover:bg-blue-900 text-white"
            }`}
          >
            <span>{activeTab === tabs.length - 1 ? "Last step" : "Next step"}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
