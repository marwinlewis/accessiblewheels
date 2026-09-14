"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, BadgeIndianRupee } from "lucide-react";
import { useLanguage } from "@/i18n/context";

export const Hero: React.FC = () => {
  const { t, locale } = useLanguage();
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  return (
    <section className="pt-10 pb-14 md:pt-14 md:pb-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-blue-800 mb-3">
            {t.hero.badge}
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {t.hero.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            {t.hero.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`${prefix}/#guide`}
              className="px-5 py-3 rounded-md bg-blue-800 hover:bg-blue-900 text-white font-semibold text-sm flex items-center gap-2"
            >
              <span>{t.hero.startGuide}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              href={`${prefix}/step-3#workshops`}
              className="px-5 py-3 rounded-md bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{t.hero.findWorkshop}</span>
            </Link>

            <Link
              href={`${prefix}/#calculator`}
              className="px-5 py-3 rounded-md bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 flex items-center gap-2"
            >
              <BadgeIndianRupee className="w-4 h-4" aria-hidden="true" />
              <span>{t.hero.taxRules}</span>
            </Link>
          </div>
        </div>

        {/* Key facts cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">{t.hero.stat1Title}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">{t.hero.stat1Subtitle}</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {t.hero.stat1Desc}
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">{t.hero.stat2Title}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">{t.hero.stat2Subtitle}</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {t.hero.stat2Desc}
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">{t.hero.stat3Title}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">{t.hero.stat3Subtitle}</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {t.hero.stat3Desc}
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">{t.hero.stat4Title}</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">{t.hero.stat4Subtitle}</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {t.hero.stat4Desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
