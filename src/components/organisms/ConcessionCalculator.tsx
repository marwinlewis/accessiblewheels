"use client";

import React, { useState } from "react";
import { Info, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/i18n/context";

export const ConcessionCalculator: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(900000); // ex-showroom (pre-GST) price in rupees
  const { t, locale } = useLanguage();
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  const gstAmount = Math.round(carPrice * 0.18);
  const totalWithGst = carPrice + gstAmount;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const presets = [600000, 850000, 1100000, 1500000];

  const summaryText = t.calculator.estimatedGstSummary
    .replace("{price}", formatCurrency(carPrice))
    .replace("{gst}", formatCurrency(gstAmount))
    .replace("{total}", formatCurrency(totalWithGst));

  return (
    <section id="calculator" className="py-14 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-slate-700 text-base leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Important update notice */}
        <div
          className="rounded-md p-4 sm:p-5 mb-8 border"
          style={{ background: "var(--warning-bg)", borderColor: "var(--warning-border)" }}
        >
          <div className="flex gap-3">
            <Info
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: "var(--warning-text)" }}
              aria-hidden="true"
            />
            <div className="text-sm" style={{ color: "var(--warning-text)" }}>
              <p className="font-semibold">{t.calculator.alertTitle}</p>
              <p className="mt-1 leading-relaxed">
                {t.calculator.alertDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* GST estimator */}
          <div className="lg:col-span-6 card p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-4">{t.calculator.estimateTitle}</h3>

            <label htmlFor="car-price" className="block text-sm font-medium text-slate-700 mb-2">
              {t.calculator.exShowroomLabel}{" "}
              <span className="font-bold text-slate-900">{formatCurrency(carPrice)}</span>
            </label>
            <input
              id="car-price"
              type="range"
              min="400000"
              max="2500000"
              step="25000"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-800"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>₹4L</span>
              <span>₹15L</span>
              <span>₹25L</span>
            </div>

            <div className="mt-4">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                {t.calculator.commonPresets}
              </span>
              <div className="grid grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCarPrice(preset)}
                    className={`py-2 px-3 text-xs font-semibold rounded-md border ${
                      carPrice === preset
                        ? "bg-blue-50 border-blue-700 text-blue-800"
                        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    ₹{preset / 100000}L
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {t.calculator.gstAppliesIf}
              </h4>
              <ul className="text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                <li>{t.calculator.gstCondition1}</li>
                <li>{t.calculator.gstCondition2}</li>
              </ul>
              <p className="text-xs text-slate-500 pt-1">
                {t.calculator.gstConditionNote}
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-6 space-y-4">
            <div className="card p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {t.calculator.estimatedGstTitle}
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formatCurrency(gstAmount)}
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {summaryText}
              </p>
            </div>

            <div className="panel p-5 text-sm space-y-3">
              <div className="pb-2 border-b border-slate-200">
                <p className="font-semibold text-slate-900">{t.calculator.roadTaxTitle}</p>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  {t.calculator.roadTaxDesc}
                </p>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-medium text-slate-700">{t.calculator.nextStepLabel}</span>
                <Link
                  href={`${prefix}/step-2#guide`}
                  className="text-blue-800 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>{t.calculator.readStep2}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <a
              href="https://heavyindustries.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:underline"
            >
              <span>{t.calculator.officialUpdateLink}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcessionCalculator;
