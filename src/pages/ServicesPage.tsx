import { PageRoute } from '../types';
import { SERVICES } from '../data/servicesData';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export default function ServicesPage({ onNavigate, onOpenQuoteModal }: ServicesPageProps) {
  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400 bg-teal-500/20 px-3.5 py-1 rounded-full border border-teal-500/30">
            Comprehensive Floor & Fabric Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Our Professional Steam Cleaning Services
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every service utilizes 210°F dual-vacuum thermal extraction, medical-grade sanitisation, and 100% WoolSafe non-toxic formulations across Greater Melbourne.
          </p>
        </div>
      </section>

      {/* Services List Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SERVICES.map((srv, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div
              key={srv.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-900/5 ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Side */}
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-slate-100 group">
                  <img
                    src={srv.bannerImage}
                    alt={srv.title}
                    className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-900 shadow-md">
                      {srv.startingPrice}
                    </span>
                  </div>
                  {srv.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-600 text-white shadow-md">
                        {srv.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Side */}
              <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>{srv.tagline}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {srv.title}
                </h2>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {srv.overview}
                </p>

                {/* Key Features Bullet List */}
                <div className="space-y-2 pt-2">
                  {srv.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate(`service-${srv.id.split('-')[0]}` as PageRoute)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-slate-900/10"
                  >
                    <span>Full Service Details & Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(srv.id)}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-600/20"
                  >
                    Get Free Quote
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Looking for a Custom Combination Package?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Bundle carpet steam cleaning with sofa or mattress sanitisation to save up to 25% on combined appointments.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-500/20 uppercase tracking-wide"
            >
              Get Custom Bundle Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
