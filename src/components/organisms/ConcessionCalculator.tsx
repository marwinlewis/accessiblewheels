"use client";

import React, { useState } from "react";
import { Info, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export const ConcessionCalculator: React.FC = () => {
  const [carPrice, setCarPrice] = useState<number>(900000); // ex-showroom (pre-GST) price in rupees

  const gstAmount = Math.round(carPrice * 0.18);
  const totalWithGst = carPrice + gstAmount;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const presets = [600000, 850000, 1100000, 1500000];

  return (
    <section id="calculator" className="py-14 md:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            GST and road tax rules for your car
          </h2>
          <p className="mt-3 text-slate-700 text-base leading-relaxed">
            These rules changed in late 2025. Here&apos;s the current position, and an estimate of the 18% GST on a
            car price you enter.
          </p>
        </div>

        {/* Important update notice */}
        <div className="rounded-md p-4 sm:p-5 mb-8 border" style={{ background: "var(--warning-bg)", borderColor: "var(--warning-border)" }}>
          <div className="flex gap-3">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "var(--warning-text)" }} aria-hidden="true" />
            <div className="text-sm" style={{ color: "var(--warning-text)" }}>
              <p className="font-semibold">GST concession certificates for small cars were discontinued in October 2025.</p>
              <p className="mt-1 leading-relaxed">
                Following the September 2025 GST reform, small cars (up to 4,000mm long, engine ≤1200cc
                petrol/CNG/LPG or ≤1500cc diesel) now attract a flat 18% GST with no compensation cess —
                for every buyer, disabled or not. Because the general rate and the old disability concession
                rate are now the same, the Ministry of Heavy Industries stopped issuing GST concession
                certificates for orthopaedic disability on these vehicles. There is no longer a GST saving
                specific to disability for this category of car.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* GST estimator */}
          <div className="lg:col-span-6 card p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-4">Estimate GST on a car price</h3>

            <label htmlFor="car-price" className="block text-sm font-medium text-slate-700 mb-2">
              Ex-showroom price (before GST):{" "}
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
              <span>₹4 lakh</span>
              <span>₹15 lakh</span>
              <span>₹25 lakh</span>
            </div>

            <div className="mt-4">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Common price presets
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
                18% GST rate applies only if the car is:
              </h4>
              <ul className="text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                <li>No longer than 4,000mm</li>
                <li>Petrol, LPG or CNG engine of 1,200cc or less, or diesel engine of 1,500cc or less</li>
              </ul>
              <p className="text-xs text-slate-500 pt-1">
                Larger cars and SUVs outside this description are taxed at 40% GST for all buyers.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-6 space-y-4">
            <div className="card p-6 sm:p-8">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Estimated GST (18%)
              </span>
              <div className="mt-2 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formatCurrency(gstAmount)}
              </div>
              <p className="mt-2 text-sm text-slate-600">
                On an ex-showroom price of {formatCurrency(carPrice)}, GST at 18% adds {formatCurrency(gstAmount)},
                for an estimated on-road-before-registration price of {formatCurrency(totalWithGst)}. This is an
                estimate only — it excludes road tax, insurance and other charges, and applies the same to every
                buyer of a qualifying small car.
              </p>
            </div>

            <div className="panel p-5 text-sm space-y-3">
              <div className="pb-2 border-b border-slate-200">
                <p className="font-semibold text-slate-900">Road tax exemption: varies by state</p>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  A car registered with the RTO as an &quot;Adapted Vehicle&quot; can qualify for a partial or full road tax
                  waiver, but the amount is set by each state&apos;s own motor vehicle taxation rules — it is not a
                  fixed national percentage. Contact your state transport department or RTO for the figure that
                  applies where you live.
                </p>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-medium text-slate-700">Next step: register the vehicle</span>
                <Link
                  href="/step-2"
                  className="text-blue-800 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Read Step 2</span>
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
              <span>Ministry of Heavy Industries: GST concession updates</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcessionCalculator;
