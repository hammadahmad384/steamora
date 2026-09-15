import { PageRoute } from '../types';
import { COMPANY_INFO, trackConversion } from '../data/config';
import QuoteCalculator from '../components/quote/QuoteCalculator';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { REVIEWS } from '../data/reviewsData';
import { 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Star, 
  Award,
  ArrowRight
} from 'lucide-react';

interface GoogleAdsLandingPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: () => void;
}

export default function GoogleAdsLandingPage({ onNavigate, onOpenQuoteModal }: GoogleAdsLandingPageProps) {
  const handlePhoneClick = () => {
    trackConversion('phone_call_click', 'Google Ads Landing Page Call Header');
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* High-Impact Ads Hero: Split layout with Form ABOVE THE FOLD */}
      <section className="bg-slate-950 text-white pt-8 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-5 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Melbourne's #1 Rated Steam Cleaning Specialists</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
                Professional Carpet & Steam Cleaning in <span className="text-teal-400">Melbourne</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                Experience hospital-grade 210°F thermal extraction. Fast 2–4 hour drying, 100% bond-back guarantee, and non-toxic formulas safe for kids and pets.
              </p>

              {/* Instant Call Banner */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                      Need Same-Day Priority Service?
                    </div>
                    <a
                      href={`tel:${COMPANY_INFO.phoneTel}`}
                      onClick={handlePhoneClick}
                      className="text-xl sm:text-2xl font-extrabold text-white hover:text-teal-400 transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href={`tel:${COMPANY_INFO.phoneTel}`}
                    onClick={handlePhoneClick}
                    className="w-full sm:w-auto px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl uppercase tracking-wider text-center"
                  >
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion('whatsapp_click', 'Google Ads WhatsApp Click')}
                    className="w-full sm:w-auto px-5 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Bullet Points of Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                {[
                  'Rooms from $89 — No Hidden Travel Fees',
                  '100% Bond Return Real Estate Receipts',
                  'Rapid 2–4 Hour Advanced Dry Time',
                  'WoolSafe Non-Toxic & Eco-Friendly Chemicals',
                  '7-Day Availability with Punctual Windows',
                  'Police Checked, Uniformed & $20M Insured'
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Trust Ratings */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                <div className="flex text-amber-400 text-sm">
                  {'★'.repeat(5)}
                </div>
                <span className="text-xs text-slate-300 font-semibold">
                  4.9 / 5 Rating on Google • Over 450+ Verified Melbourne Clients
                </span>
              </div>
            </div>

            {/* Right Above-the-Fold Quote Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-white/20">
                <div className="text-center mb-4">
                  <span className="text-[11px] uppercase font-extrabold tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                    Fast 60-Second Calculation
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-950 mt-1.5">
                    Get Your Instant Free Quote
                  </h3>
                  <p className="text-xs text-slate-500">
                    Zero obligation • Instant live pricing
                  </p>
                </div>

                <QuoteCalculator className="p-0 border-0 shadow-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Proof Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
            Before & After
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2">
            Real Melbourne Results
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Slide horizontally to see how our thermal extraction removes heavy traffic wear and stains.
          </p>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* Top 3 Verified Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{rev.author}</span>
                <span className="text-teal-600 font-semibold">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Urgency Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Need Your Space Cleaned Today or Tomorrow?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
            Our vans are active in your area. Speak directly with our Melbourne dispatch team now for immediate booking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              onClick={handlePhoneClick}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm sm:text-base rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-teal-500/25"
            >
              <Phone className="w-5 h-5" />
              <span>CALL {COMPANY_INFO.phone} NOW</span>
            </a>
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-xl border border-white/20"
            >
              REQUEST ONLINE QUOTE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
