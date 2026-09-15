import { PageRoute } from '../types';
import { MELBOURNE_SUBURBS } from '../data/suburbsData';
import { SERVICES } from '../data/servicesData';
import { REVIEWS } from '../data/reviewsData';
import { COMPANY_INFO, trackConversion } from '../data/config';
import QuoteCalculator from '../components/quote/QuoteCalculator';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import { 
  MapPin, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowLeft,
  Calendar,
  Building
} from 'lucide-react';

interface SuburbLandingPageProps {
  suburbSlug: string;
  onNavigate: (route: PageRoute, params?: any) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export default function SuburbLandingPage({ suburbSlug, onNavigate, onOpenQuoteModal }: SuburbLandingPageProps) {
  const normalizedSlug = (suburbSlug || '').toLowerCase().trim();
  const suburb = MELBOURNE_SUBURBS.find(s => 
    s.slug === normalizedSlug || 
    s.slug.endsWith(`-${normalizedSlug}`) ||
    s.slug.replace('carpet-cleaning-', '') === normalizedSlug ||
    s.name.toLowerCase() === normalizedSlug.replace(/-/g, ' ')
  ) || MELBOURNE_SUBURBS[0];
  
  // Find reviews near this suburb or general
  const localReviews = REVIEWS.filter(r => r.location.toLowerCase().includes(suburb.name.toLowerCase()));
  const displayReviews = localReviews.length > 0 ? localReviews : REVIEWS.slice(0, 3);

  const handlePhoneClick = () => {
    trackConversion('phone_call_click', `Suburb Call: ${suburb.name}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Suburb Hero */}
      <section className="bg-slate-950 text-white pt-10 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button onClick={() => onNavigate('home')} className="hover:text-white">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate('service-areas')} className="hover:text-white">Melbourne Suburbs</button>
            <span>/</span>
            <span className="text-teal-400 font-semibold">{suburb.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
                <MapPin className="w-3.5 h-3.5" />
                <span>{suburb.region} • Postcode {suburb.postcode}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Premium Steam Cleaning in <span className="text-teal-400">{suburb.name}</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Expert carpet, couch, mattress, and tile steam cleaning in {suburb.name} (VIC {suburb.postcode}). Rapid mobile van dispatch, same-day bookings, and 100% bond back satisfaction guaranteed.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-500/25 transition-all uppercase tracking-wide flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Get a Free {suburb.name} Quote</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  onClick={handlePhoneClick}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call Dispatch: {COMPANY_INFO.phone}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>REIV Real Estate Approved</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>{suburb.distanceFromCbd} from CBD</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-teal-400" />
                  <span>Apartment & Lift Friendly</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Location Snapshot
                  </span>
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    Active Mobile Unit
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Suburb:</span>
                    <span className="font-bold text-white">{suburb.name}, VIC {suburb.postcode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dispatch Window:</span>
                    <span className="font-bold text-white">Same-Day or Next-Day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Travel Surcharges:</span>
                    <span className="font-bold text-emerald-400">$0 (Free Melbourne Travel)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Building Access:</span>
                    <span className="font-bold text-white">Driveway, Street & Basement</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('book-online')}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs rounded-xl uppercase tracking-wider"
                  >
                    Book {suburb.name} Technician
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suburb Specific Details & Property Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
              Tailored For {suburb.name}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Specialized Care For {suburb.name} Homes & Offices
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {suburb.housingProfile}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Whether you are preparing for an end-of-lease inspection with local real estate agents in {suburb.name}, sanitising high-traffic commercial suites, or freshening your private residence, Steamora provides the highest standard of clean.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>End of Lease bond-back receipts provided immediately</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Quiet, non-invasive extraction suitable for apartment complexes</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Pet stain bio-enzymatic treatment for local dog & cat owners</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* In-Page Quote Form for this Suburb */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            Instant Online Calculation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2">
            Calculate Your {suburb.name} Steam Clean
          </h2>
        </div>
        <QuoteCalculator />
      </section>
    </div>
  );
}
