"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/context";

export interface FooterProps {
  about?: {
    title?: string;
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
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* About */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="text-base font-bold text-slate-900">
              {about?.title || t.footer.aboutTitle}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              {about?.text || t.footer.aboutText}
            </p>

            <p className="text-xs text-slate-500 pt-1">
              {t.footer.notGovNotice}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">
              {quickLinks?.title || t.footer.stepGuideTitle}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/step-1" className="text-blue-800 hover:text-blue-900 hover:underline">
                  {t.footer.step1Link}
                </Link>
              </li>
              <li>
                <Link href="/step-2" className="text-blue-800 hover:text-blue-900 hover:underline">
                  {t.footer.step2Link}
                </Link>
              </li>
              <li>
                <Link href="/step-3" className="text-blue-800 hover:text-blue-900 hover:underline">
                  {t.footer.step3Link}
                </Link>
              </li>
              <li>
                <Link href="/step-4" className="text-blue-800 hover:text-blue-900 hover:underline">
                  {t.footer.step4Link}
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="text-blue-800 hover:text-blue-900 hover:underline">
                  {t.footer.taxRulesLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Portals & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900">
              {contact?.title || t.footer.officialPortalsTitle}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://www.swavlambancard.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-800 hover:text-blue-900 hover:underline"
                >
                  <span>{t.footer.udidPortalLink}</span>
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
                  <span>{t.footer.parivahanLink}</span>
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
                  <span>{t.footer.mhiLink}</span>
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
                  <span>{t.footer.maintainerLink}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 text-xs text-slate-500">
          <p>
            &copy; {currentYear} AdaptedVehicle.in. {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
