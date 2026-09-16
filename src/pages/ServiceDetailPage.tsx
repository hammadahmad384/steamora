import { useState } from 'react';
import { PageRoute } from '../types';
import { SERVICES } from '../data/servicesData';
import { COMPANY_INFO, trackConversion } from '../data/config';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  ArrowLeft, 
  ChevronDown,
  Clock,
  Zap,
  Check
} from 'lucide-react';

interface ServiceDetailPageProps {
  serviceSlug: string; // e.g. "carpet", "upholstery", "mattress", "tile", "commercial"
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export default function ServiceDetailPage({ serviceSlug, onNavigate, onOpenQuoteModal }: ServiceDetailPageProps) {
  const service = SERVICES.find(s => s.id.startsWith(serviceSlug)) || SERVICES[0];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handlePhoneClick = () => {
    trackConversion('phone_call_click', `Service Detail Call: ${service.shortTitle}`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Service Breadcrumb & Hero */}
      <section className="bg-slate-950 text-white pt-10 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button onClick={() => onNavigate('home')} className="hover:text-white">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate('services')} className="hover:text-white">Services</button>
            <span>/</span>
            <span className="text-teal-400 font-semibold">{service.shortTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {service.title} in Melbourne
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
                {service.heroDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenQuoteModal(service.id)}
                  className="px-7 py-3.5 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-500/25 transition-all uppercase tracking-wide flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Get a Free Quote</span>
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneTel}`}
                  onClick={handlePhoneClick}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call {COMPANY_INFO.phone}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>100% Bond Back Ready</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>Rapid 2–4 Hour Dry Time</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-teal-400" />
                  <span>From {service.startingPrice}</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src={service.bannerImage}
                  alt={service.bannerAlt || service.title}
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-xs font-bold text-teal-300 uppercase">
                    Steamora Melbourne Fleet
                  </div>
                  <div className="text-sm font-semibold">
                    Equipped with 210°F Hot-Water Thermal Extractors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Key Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
              Overview & Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Why Melbourne Chooses Our {service.shortTitle}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {service.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div>
              <span className="text-xs uppercase font-bold text-teal-400">Fixed Upfront Pricing</span>
              <h3 className="text-2xl font-extrabold mt-1">Starting from {service.startingPrice}</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero hidden credit card surcharges or fuel fees within 45km of Melbourne CBD.
              </p>
            </div>

            <div className="space-y-3 border-t border-slate-800 pt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Pricing Basis</span>
                <span className="font-semibold text-white">Transparent Room / Item rate</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Chemical Safety</span>
                <span className="font-semibold text-white">WoolSafe Non-Toxic Certified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Technician Certs</span>
                <span className="font-semibold text-white">IICRC Certified Operators</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Insurance Cover</span>
                <span className="font-semibold text-white">$20,000,000 Public Liability</span>
              </div>
            </div>

            <button
              onClick={() => onOpenQuoteModal(service.id)}
              className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm uppercase tracking-wide transition-colors"
            >
              Get Instant Estimate
            </button>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            The Steamora Method
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
            Our 5-Step Deep Cleaning Process
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Every fiber and surface is inspected, conditioned, and neutralized for maximum durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {service.processSteps.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 font-extrabold text-sm flex items-center justify-center mb-4">
                  0{step.step}
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-2">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Packages */}
      {service.pricingTiers && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
              Transparent Rates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
              {service.shortTitle} Service Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.pricingTiers.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-3xl p-7 border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'bg-white border-teal-500 shadow-xl ring-2 ring-teal-500/20'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Package
                    </span>
                    {pkg.popular && (
                      <span className="text-[11px] font-extrabold uppercase tracking-wider bg-teal-600 text-white px-2.5 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                  <div className="mt-3 mb-4">
                    <span className="text-3xl font-extrabold text-slate-950">{pkg.price}</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-6">{pkg.description}</p>

                  <div className="space-y-2.5 border-t border-slate-100 pt-4">
                    {pkg.items.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => onOpenQuoteModal(service.id)}
                    className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
                      pkg.popular
                        ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    Select This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Before and After Interactive Slider for this Service */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            Real Results
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 mt-2">
            Before & After Gallery
          </h2>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* Service-Specific FAQs */}
      {service.faq && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
              Questions Answered
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-2">
              Frequently Asked Questions About {service.shortTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {service.faq.map((faqItem, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-teal-600 transition-colors"
                  >
                    <span>{faqItem.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-teal-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                      {faqItem.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Direct Booking Hook */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Restore Your {service.shortTitle}?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Book online in 60 seconds with no upfront credit card required, or speak with our Melbourne dispatch coordinators.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenQuoteModal(service.id)}
              className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl uppercase tracking-wide shadow-xl shadow-teal-500/20"
            >
              Get Free Instant Quote
            </button>
            <button
              onClick={() => onNavigate('book-online')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20"
            >
              Schedule Online Now
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTERNAL LINKING */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Our Cleaning Services</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => onNavigate('service-sofa')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Sofa Cleaning</button>
            <button onClick={() => onNavigate('service-carpet')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Carpet Cleaning</button>
            <button onClick={() => onNavigate('service-upholstery')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Upholstery Cleaning</button>
            <button onClick={() => onNavigate('service-mattress')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Mattress Cleaning</button>
            <button onClick={() => onNavigate('service-blind')} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-teal-600 hover:border-teal-200 transition-colors shadow-sm font-medium">Blind Cleaning</button>
          </div>
          <div className="mt-8">
            <button onClick={() => onNavigate('home')} className="text-teal-600 hover:text-teal-700 font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
