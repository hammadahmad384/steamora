import { PageRoute } from '../types';
import { COMPANY_INFO, trackConversion } from '../data/config';
import { SERVICES } from '../data/servicesData';
import { MELBOURNE_SUBURBS } from '../data/suburbsData';
import { REVIEWS } from '../data/reviewsData';
import { FAQS } from '../data/faqsData';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import QuoteCalculator from '../components/quote/QuoteCalculator';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Zap, 
  Leaf, 
  Calendar,
  Clock,
  ChevronDown,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';

interface HomePageProps {
  onNavigate: (route: PageRoute, params?: any) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export default function HomePage({ onNavigate, onOpenQuoteModal }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const handlePhoneClick = () => {
    trackConversion('phone_call_click', 'Hero Call Click');
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* 2. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-20 right-1/4 w-[450px] h-[450px] bg-sky-200/40 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-md shadow-slate-900/10">
                <span className="flex text-amber-400 text-xs">★★★★★</span>
                <span className="text-slate-200">Rated {COMPANY_INFO.ratings.googleRating} by Melbourne Customers</span>
              </div>

              {/* Headlines */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.08]">
                  Premium Steam Cleaning in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600">Melbourne</span>
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-slate-800 font-['Outfit']">
                  Fresh Spaces. Elevated Living.
                </p>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Professional carpet, upholstery, mattress and commercial steam cleaning services across Melbourne. Experience exceptional cleaning results with a team you can trust.
              </p>

              {/* Hero CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-base shadow-xl shadow-teal-600/25 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onNavigate('inquiry')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#128C7E] text-white font-extrabold text-base shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>Customer Inquiry</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  onClick={handlePhoneClick}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-xl shadow-slate-900/10 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>

              {/* Trust Indicators Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200/80 text-xs font-semibold text-slate-700 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Professional Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Eco-Friendly Solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Fast & Reliable Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Melbourne-Wide Service</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Hero Card with Real Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
                    alt="Steamora Professional Steam Cleaning in Melbourne"
                    className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Overlaid Floating Badge: Same-Day Booking */}
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-white/40 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                        Melbourne Dispatch
                      </div>
                      <div className="text-xs font-extrabold text-slate-900">
                        Same-Day Slots Available
                      </div>
                    </div>
                  </div>

                  {/* Overlaid Floating Badge: Bond Back Guarantee */}
                  <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 text-white border border-slate-700/70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          100% Bond Back Guarantee
                        </div>
                        <div className="text-[11px] text-slate-300">
                          REIV compliant real estate receipts
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onNavigate('book-online')}
                      className="px-3.5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl font-bold text-xs"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST SECTION: Why Melbourne Chooses Steamora */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            The Steamora Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
            Why Melbourne Chooses Steamora
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Engineered around luxury standards, commercial-grade thermal technology, and genuine Melbourne hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Professional Service
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Experienced professionals delivering exceptional results with certified mastery over delicate wool, velvet, and luxury tiles.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Premium Equipment
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Industrial 210°F hot-water thermal extraction, high-velocity dual-vacuum motors, and enclosed rotary hydro-scrubbers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Eco-Friendly Solutions
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Safer cleaning solutions for your home, children, and pets. Biodegradable, plant-derived, non-toxic, and zero residue.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg shadow-slate-900/5 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Reliable & Convenient
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Easy 60-second online booking, punctual arrival windows, 2–4 hour rapid dry times, and transparent fixed pricing.
            </p>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
              What We Do Best
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
              Our Professional Cleaning Services
            </h2>
            <p className="text-slate-600 text-base mt-1 max-w-xl">
              Specialized thermal steam extraction tailored for Melbourne homes, luxury apartments, and commercial venues.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 group"
          >
            <span>View All Cleaning Services & Pricing</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg shadow-slate-900/5 flex flex-col group hover:shadow-xl transition-all duration-300"
            >
              {/* Service Banner Image */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={srv.bannerImage}
                  alt={srv.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 shadow-md">
                    {srv.startingPrice}
                  </span>
                </div>
                {srv.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-600 text-white shadow-md">
                      {srv.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {srv.shortTitle}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">
                    {srv.tagline}
                  </p>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {srv.heroDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(`service-${srv.id.split('-')[0]}` as PageRoute)}
                    className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 group/btn"
                  >
                    <span>Learn More</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>

                  <button
                    onClick={() => onOpenQuoteModal(srv.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BEFORE AND AFTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            Visual Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
            See the Steamora Difference
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Drag the interactive slider below to inspect deep stain removal, fabric revitalization, and grout restoration across real Melbourne properties.
          </p>
        </div>

        <BeforeAfterSlider />
      </section>

      {/* 6. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Ambient blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-teal-300 bg-teal-500/20 px-3.5 py-1 rounded-full border border-teal-500/30">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
              Professional Cleaning Made Simple
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              From online request to immaculate space in three effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 relative">
              <div className="w-12 h-12 rounded-xl bg-teal-400 text-slate-950 font-extrabold text-lg flex items-center justify-center mb-6">
                01
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                Step 1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Request a Quote
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tell us what you need cleaned through our 60-second online calculator, chatbot, or phone dispatch.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 relative">
              <div className="w-12 h-12 rounded-xl bg-teal-400 text-slate-950 font-extrabold text-lg flex items-center justify-center mb-6">
                02
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                Step 2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Choose Your Time
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Select a convenient date and time window. We operate 7 days across Melbourne with punctual notifications.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 relative">
              <div className="w-12 h-12 rounded-xl bg-teal-400 text-slate-950 font-extrabold text-lg flex items-center justify-center mb-6">
                03
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                Step 3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Enjoy a Fresher Space
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our certified master technicians take care of the rest. Relax while your floors and fabrics dry soft and clean.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('book-online')}
              className="px-8 py-4 bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-400/20 transition-all uppercase tracking-wide inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Your Clean Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. SERVICE AREAS (Local SEO Melbourne) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            Local Melbourne Coverage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
            Proudly Serving Melbourne
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Steamora provides professional steam cleaning services across Melbourne and surrounding areas within 45km of the CBD.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MELBOURNE_SUBURBS.slice(0, 8).map((sub) => (
            <button
              key={sub.slug}
              onClick={() => onNavigate('suburb-detail', sub.slug)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-500/60 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-teal-600">{sub.postcode}</span>
                <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                {sub.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {sub.shortDescription}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600 group-hover:text-teal-600">
                <span>View Suburb Guide</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('service-areas')}
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700"
          >
            <span>See All 45+ Melbourne Suburbs & Outer Regions</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* 8. WHY CHOOSE US: The Steamora Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-700 bg-teal-100 px-3.5 py-1 rounded-full">
              Our Guarantee
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
              The Steamora Standard
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Every appointment is guided by our 8 core commitments to quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Attention to Detail', desc: 'No rushed corners. We hand-detail skirtings and treat every individual spot.' },
              { title: 'Professional Equipment', desc: 'Commercial 210°F extraction machines with hospital-grade vacuum recovery.' },
              { title: 'Friendly Service', desc: 'Uniformed, police-checked, certified Melbourne master technicians.' },
              { title: 'Convenient Booking', desc: '60-second online booking with instant text confirmation and SMS tracker.' },
              { title: 'Competitive Pricing', desc: 'Upfront transparent quotes with zero hidden travel fees or weekend surcharges.' },
              { title: 'Melbourne-Based Team', desc: 'Locally owned and operated with deep familiarity with local building logistics.' },
              { title: 'Residential & Commercial', desc: 'Equipped for single apartments through to multi-storey corporate towers.' },
              { title: 'Customer-Focused Service', desc: '100% satisfaction guarantee. If you are not delighted, we re-clean free.' }
            ].map((std, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-sm mb-3">
                  ✓
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{std.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. REVIEWS SECTION: Google Reviews Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
              Social Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
              Trusted by Melbourne Customers
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400 text-sm">
                {'★'.repeat(5)}
              </div>
              <span className="text-sm font-bold text-slate-800">
                {COMPANY_INFO.ratings.googleRating} Google Rating ({COMPANY_INFO.ratings.totalReviews}+ Verified Reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('reviews')}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs"
            >
              See More Reviews
            </button>
            <a
              href={COMPANY_INFO.social.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <span>Write Google Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 6).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-lg shadow-slate-900/5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {rev.date}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.avatarUrl && (
                    <img
                      src={rev.avatarUrl}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <div>
                    <div className="font-bold text-xs text-slate-900">{rev.author}</div>
                    <div className="text-[11px] text-slate-600">{rev.location}</div>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ONLINE QUOTE FORM (Full In-Page Calculator) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteCalculator />
      </section>

      {/* 12. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Everything you need to know about steam cleaning costs, drying times, and Melbourne service details.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.slice(0, 6).map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:text-teal-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('faq')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700"
          >
            <span>Read All Questions & Tenancy FAQ</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* 13. FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-14 lg:p-16 text-center text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-teal-300 bg-teal-500/20 px-4 py-1.5 rounded-full border border-teal-500/30">
              Transform Your Space Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready for a Fresher, Cleaner Space?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Book professional steam cleaning with Steamora today. Fast fixed pricing, certified technicians, and 100% satisfaction guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl shadow-teal-500/30 transition-all uppercase tracking-wide cursor-pointer"
              >
                GET A FREE QUOTE
              </button>

              <button
                onClick={() => onNavigate('inquiry')}
                className="w-full sm:w-auto px-7 py-4 bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#128C7E] text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>CUSTOMER INQUIRY</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneTel}`}
                onClick={handlePhoneClick}
                className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-teal-300" />
                <span>CALL: {COMPANY_INFO.phone}</span>
              </a>
            </div>

            <p className="text-xs text-slate-400">
              Zero upfront payments • Same-day dispatch available in Greater Melbourne
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
