"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Globe, Check, ChevronDown, Search, X, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/context";
import { Language } from "@/i18n/languages";

interface LanguageSwitcherProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "desktop",
  className = "",
}) => {
  const { locale, t, languages, setLocale, isPending } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentLanguage = useMemo(() => {
    return languages.find((lang) => lang.code === locale) || languages[0];
  }, [languages, locale]);

  // Filter languages by search query in English, native script, or code
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return languages;
    const query = searchQuery.toLowerCase().trim();
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query) ||
        (lang.region && lang.region.toLowerCase().includes(query))
    );
  }, [languages, searchQuery]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Auto-focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelectLanguage = (lang: Language) => {
    setLocale(lang.code);
    setIsOpen(false);
    setSearchQuery("");
  };

  if (variant === "mobile") {
    return (
      <div className={`pt-3 border-t border-slate-200 mt-3 ${className}`}>
        <div className="flex items-center justify-between mb-2 px-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.nav.selectLanguage}</span>
          </span>
          <span className="text-xs font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            {currentLanguage.nativeName}
          </span>
        </div>

        {/* Search inside mobile menu */}
        <div className="px-3 mb-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchLanguagePlaceholder}
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear language search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable grid of Indian languages */}
        <div className="grid grid-cols-2 gap-1.5 px-3 max-h-48 overflow-y-auto pr-1">
          {filteredLanguages.map((lang) => {
            const isSelected = lang.code === locale;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang)}
                className={`flex items-center justify-between px-2.5 py-1.5 text-xs rounded-md border text-left transition-colors ${
                  isSelected
                    ? "bg-blue-800 text-white border-blue-800 font-semibold shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="truncate pr-1">
                  <span className="block font-bold leading-tight">{lang.nativeName}</span>
                  <span className={`block text-[10px] leading-tight ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                    {lang.name}
                  </span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md border transition-all duration-150 ${
          isOpen
            ? "bg-blue-50 border-blue-600 text-blue-900 shadow-xs ring-2 ring-blue-600/20"
            : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${t.nav.selectLanguage}: ${currentLanguage.nativeName} (${currentLanguage.name})`}
      >
        <Globe className="w-4 h-4 text-blue-700 flex-shrink-0" aria-hidden="true" />
        <span className="font-semibold text-slate-900">{currentLanguage.nativeName}</span>
        <span className="hidden xl:inline text-xs text-slate-500 font-normal">
          ({currentLanguage.name})
        </span>
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 text-blue-700 animate-spin" />
        ) : (
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${
              isOpen ? "rotate-180 text-blue-700" : ""
            }`}
            aria-hidden="true"
          />
        )}
      </button>

      {/* Floating Dropdown Panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.selectLanguage}
        >
          {/* Header */}
          <div className="px-4 pt-3.5 pb-2.5 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                <Globe className="w-4 h-4 text-blue-700" />
                <span>{t.nav.selectLanguage}</span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                22 Indian Languages + English
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.nav.searchLanguagePlaceholder}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Languages Grid */}
          <div
            className="p-2 max-h-80 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-1"
            role="listbox"
            aria-label="Supported Languages"
          >
            {filteredLanguages.length === 0 ? (
              <div className="col-span-2 py-6 text-center text-xs sm:text-sm text-slate-500">
                No matching language found for &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === locale;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectLanguage(lang)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all ${
                      isSelected
                        ? "bg-blue-50 border border-blue-600 text-blue-900"
                        : "hover:bg-slate-100 text-slate-700 border border-transparent"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-bold ${isSelected ? "text-blue-900" : "text-slate-900"}`}>
                          {lang.nativeName}
                        </span>
                        {lang.dir === "rtl" && (
                          <span className="text-[10px] uppercase font-semibold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                            RTL
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 block leading-tight">
                        {lang.name}
                        {lang.region ? ` • ${lang.region}` : ""}
                      </span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-700 flex-shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>⚡ Server-Side Rendered (SSR)</span>
            <span>Eighth Schedule Recognized</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
