"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, BadgeIndianRupee, BookOpen, Settings, Menu, X } from "lucide-react";

export interface NavbarProps {
  siteTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ siteTitle = "AdaptedVehicle.in" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-lg"
            >
              ♿
            </span>
            <span>
              <span className="block text-base font-bold text-slate-900 leading-tight">
                Adapted Vehicle India
              </span>
              <span className="block text-xs text-slate-600 leading-tight">
                Information for disabled drivers
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            <Link
              href="/#guide"
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>4-Step Guide</span>
            </Link>

            <Link
              href="/step-3"
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Find a Workshop</span>
            </Link>

            <Link
              href="/#calculator"
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md flex items-center gap-1.5"
            >
              <BadgeIndianRupee className="w-4 h-4" aria-hidden="true" />
              <span>Tax Rules</span>
            </Link>

            <div className="h-5 w-px bg-slate-200 mx-2" aria-hidden="true" />

            <a href="/admin"
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100 flex items-center gap-1.5"
              title="Content admin panel"
            >
              <Settings className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Admin</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-md"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
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
            href="/#guide"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-md"
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            4-Step Guide
          </Link>
          <Link
            href="/step-3"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-md"
          >
            <MapPin className="w-5 h-5" aria-hidden="true" />
            Find a Workshop
          </Link>
          <Link
            href="/#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-100 rounded-md"
          >
            <BadgeIndianRupee className="w-5 h-5" aria-hidden="true" />
            Tax Rules
          </Link>
          <div className="pt-2 border-t border-slate-200">
            <a href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold border border-slate-300 rounded-md hover:bg-slate-100"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              Admin
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
