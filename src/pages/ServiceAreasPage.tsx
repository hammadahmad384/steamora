import React, { useState } from 'react';
import { PageRoute } from '../types';
import { MELBOURNE_SUBURBS } from '../data/suburbsData';
import { COMPANY_INFO, trackConversion } from '../data/config';
import { MapPin, Search, CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface ServiceAreasPageProps {
  onNavigate: (route: PageRoute, params?: any) => void;
  onOpenQuoteModal: () => void;
}

export default function ServiceAreasPage({ onNavigate, onOpenQuoteModal }: ServiceAreasPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [postcodeCheck, setPostcodeCheck] = useState('');
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const filteredSuburbs = MELBOURNE_SUBURBS.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || sub.postcode.includes(searchQuery);
    const matchesRegion = selectedRegion === 'all' || sub.region.toLowerCase().includes(selectedRegion.toLowerCase());
    return matchesSearch && matchesRegion;
  });

  const handleCheckPostcode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = postcodeCheck.trim();
    if (!clean) return;

    const found = MELBOURNE_SUBURBS.find(s => s.postcode === clean || s.name.toLowerCase() === clean.toLowerCase());
    if (found) {
      setCheckResult(`Great news! We service ${found.name} (${found.postcode}) with regular same-day mobile dispatch!`);
    } else {
      setCheckResult(`Yes! We service all Greater Melbourne postcodes including ${clean}. Standard travel rates apply.`);
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400 bg-teal-500/20 px-3.5 py-1 rounded-full border border-teal-500/30">
            Greater Melbourne Coverage
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Proudly Serving Greater Melbourne
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From luxury high-rises in Southbank and Docklands to heritage family homes in Camberwell and Brighton. Rapid mobile dispatch within 45km of Melbourne CBD.
          </p>

          {/* Quick Postcode Checker Box */}
          <div className="max-w-xl mx-auto mt-8 bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-2xl">
            <form onSubmit={handleCheckPostcode} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-teal-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={postcodeCheck}
                  onChange={(e) => setPostcodeCheck(e.target.value)}
                  placeholder="Enter your Melbourne suburb or postcode (e.g. 3121)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl uppercase tracking-wider shrink-0 transition-colors"
              >
                Check Coverage
              </button>
            </form>

            {checkResult && (
              <div className="mt-3 p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                <span>{checkResult}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Suburbs' },
              { id: 'inner', label: 'Inner Melbourne' },
              { id: 'east', label: 'Eastern Suburbs' },
              { id: 'south', label: 'South Eastern & Bayside' },
              { id: 'north', label: 'Northern Suburbs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  selectedRegion === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suburb or postcode..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Suburbs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSuburbs.map((sub) => (
            <button
              key={sub.slug}
              onClick={() => onNavigate('suburb-detail', sub.slug)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-500/50 shadow-sm hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                    VIC {sub.postcode}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-600">
                    {sub.distanceFromCbd}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-600 transition-colors">
                  {sub.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {sub.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
                <span>View Local Suburb Page</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>

        {filteredSuburbs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-sm">
              No suburbs found matching "{searchQuery}". But don't worry, we service all of Greater Melbourne!
            </p>
            <button
              onClick={() => onOpenQuoteModal()}
              className="mt-4 px-6 py-2.5 bg-teal-600 text-white font-bold text-xs rounded-xl"
            >
              Request Service in Your Suburb
            </button>
          </div>
        )}
      </section>

      {/* Melbourne Logistics & Access Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">High-Rise & CBD Parking Permit Ready</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We carry lightweight portable high-pressure extractors designed specifically for lift access and underground parking clearances across Southbank and Docklands towers.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">7-Day Weekend Appointments</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We know Melbourne moves fast. Book Saturday or Sunday cleans with zero weekend penalty surcharges.
            </p>
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">Emergency Same-Day Response</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Accidental wine spillage, pet disaster, or unexpected rental inspection? Call our Melbourne team at {COMPANY_INFO.phone} for prioritized dispatch.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
