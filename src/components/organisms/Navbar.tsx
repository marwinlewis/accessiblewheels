"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, BadgeIndianRupee, BookOpen, Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/context";
import LanguageSwitcher from "@/components/molecules/LanguageSwitcher";

export interface NavbarProps {
  siteTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ siteTitle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, locale } = useLanguage();
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href={prefix || "/"} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-lg flex-shrink-0"
            >
              ♿
            </span>
            <span className="truncate">
              <span className="block text-base font-bold text-slate-900 leading-tight">
                {t.nav.brandTitle || siteTitle || "Adapted Vehicle India"}
              </span>
              <span className="block text-xs text-slate-600 leading-tight">
                {t.nav.brandSubtitle || "Information for disabled drivers"}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links & Language Switcher */}
          <div className="hidden md:flex items-center gap-2">
            <nav className="flex items-center gap-1" aria-label="Primary">
              <Link
                href={`${prefix}/#guide`}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-blue-700" aria-hidden="true" />
                <span>{t.nav.guide}</span>
              </Link>

              <Link
                href={`${prefix}/step-3#workshops`}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-blue-700" aria-hidden="true" />
                <span>{t.nav.workshops}</span>
              </Link>

              <Link
                href={`${prefix}/#calculator`}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md flex items-center gap-1.5"
              >
                <BadgeIndianRupee className="w-4 h-4 text-blue-700" aria-hidden="true" />
                <span>{t.nav.taxRules}</span>
              </Link>
            </nav>

            <div className="h-6 w-px bg-slate-200 mx-1" aria-hidden="true" />

            {/* Header Language Switcher Dropdown */}
            <LanguageSwitcher variant="desktop" />
          </div>

          {/* Mobile Actions: Language Switcher + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher variant="desktop" className="text-xs" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-md"
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-1"
          aria-label="Primary"
        >
          <Link
            href={`${prefix}/#guide`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-md"
          >
            <BookOpen className="w-5 h-5 text-blue-700" aria-hidden="true" />
            <span>{t.nav.guide}</span>
          </Link>
          <Link
            href={`${prefix}/step-3`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-md"
          >
            <MapPin className="w-5 h-5 text-blue-700" aria-hidden="true" />
            <span>{t.nav.workshops}</span>
          </Link>
          <Link
            href={`${prefix}/#calculator`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-md"
          >
            <BadgeIndianRupee className="w-5 h-5 text-blue-700" aria-hidden="true" />
            <span>{t.nav.taxRules}</span>
          </Link>

          {/* Mobile Language Switcher Section */}
          <LanguageSwitcher variant="mobile" />
        </nav>
      )}
    </header>
  );
};

export default Navbar;
