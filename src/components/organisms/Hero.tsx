"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, BadgeIndianRupee } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="pt-10 pb-14 md:pt-14 md:pb-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-blue-800 mb-3">
            Updated September 2026 with the current GST, road tax and licensing rules
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            A plain guide to adapted vehicles and driving licences for disabled people in India
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-700 leading-relaxed">
            Step-by-step help for getting your UDID card, buying and registering an adapted vehicle, finding a
            certified modification workshop, and applying for your driving licence — with links to every official
            government portal you&apos;ll need.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="#guide"
              className="px-5 py-3 rounded-md bg-blue-800 hover:bg-blue-900 text-white font-semibold text-sm flex items-center gap-2"
            >
              <span>Start the 4-step guide</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              href="/step-3#workshops"
              className="px-5 py-3 rounded-md bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Find a workshop</span>
            </Link>

            <Link
              href="#calculator"
              className="px-5 py-3 rounded-md bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-300 flex items-center gap-2"
            >
              <BadgeIndianRupee className="w-4 h-4" aria-hidden="true" />
              <span>GST &amp; road tax rules</span>
            </Link>
          </div>
        </div>

        {/* Key facts */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">18% GST</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Flat rate on qualifying small cars</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Since the September 2025 GST reform, small cars carry a flat 18% GST with no cess for every buyer —
              this is no longer a disability-only concession.
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">Road tax</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Varies by state</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Registering a car as an &quot;Adapted Vehicle&quot; can bring a partial or full road tax waiver, but the amount
              is set by each state — check with your local RTO.
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">Certified workshops</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">Hand controls &amp; steering aids</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Find workshops that fit hand-operated controls, steering knobs and other adaptations, and confirm
              which ones hold current ARAI/ICAT certification before booking.
            </p>
          </div>

          <div className="card p-5">
            <div className="text-xl font-bold text-slate-900">4 steps</div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">UDID to permanent licence</div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              From your medical assessment to the Parivahan theory test and final practical driving test — one
              clear checklist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
