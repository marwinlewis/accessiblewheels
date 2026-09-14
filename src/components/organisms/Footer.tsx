"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Settings } from "lucide-react";

export interface FooterProps {
  about?: {
    title?: string;
    content?: any;
    text?: string;
  };
  quickLinks?: {
    title?: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
  };
  contact?: {
    title?: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
  };
}

export const Footer: React.FC<FooterProps> = ({ about, quickLinks, contact }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* About */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="text-base font-bold text-slate-900">
              Adapted Vehicle India
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              {about?.text ||
                "An independent, plain-language guide to buying and registering an adapted vehicle and getting a driving licence in India as a person with disability — with links to the official government portals for every step."}
            </p>

            <p className="text-xs text-slate-500 pt-1">
              This site is not a government website. Always confirm current rules with the official portals listed below.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">
              {quickLinks?.title || "Step-by-Step Guide"}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/step-1" className="text-blue-800 hover:text-blue-900 hover:underline">
                  Step 1: UDID Card &amp; Medical Assessment
                </Link>
              </li>
              <li>
                <Link href="/step-2" className="text-blue-800 hover:text-blue-900 hover:underline">
                  Step 2: Buying &amp; Registering the Vehicle
                </Link>
              </li>
              <li>
                <Link href="/step-3" className="text-blue-800 hover:text-blue-900 hover:underline">
                  Step 3: Workshops &amp; Learner&apos;s Licence
                </Link>
              </li>
              <li>
                <Link href="/step-4" className="text-blue-800 hover:text-blue-900 hover:underline">
                  Step 4: Practical Test &amp; Licence
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="text-blue-800 hover:text-blue-900 hover:underline">
                  GST &amp; Road Tax Rules
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Portals & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">
              {contact?.title || "Official Portals"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.swavlambancard.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-800 hover:text-blue-900 hover:underline"
                >
                  <span>Swavlamban UDID Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://sarathi.parivahan.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-800 hover:text-blue-900 hover:underline"
                >
                  <span>Parivahan Sarathi (Licence)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://heavyindustries.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-800 hover:text-blue-900 hover:underline"
                >
                  <span>Ministry of Heavy Industries</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/marwinlewis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-800 hover:text-blue-900 hover:underline"
                >
                  <span>Maintainer: Marwin Lewis</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-xs text-slate-500">
          <p>
            &copy; {currentYear} AdaptedVehicle.in. Information is based on the Central Motor Vehicles Rules,
            GST Council notifications and Ministry of Heavy Industries circulars, and is provided for general
            guidance only — it is not legal advice. Rules change; always verify with the official portals above
            or your local RTO before relying on any figure here.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
