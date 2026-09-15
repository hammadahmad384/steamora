import { PageRoute } from '../types';
import { COMPANY_INFO, trackConversion } from '../data/config';
import { ShieldCheck, Award, HeartHandshake, Sparkles, CheckCircle2, Phone, Calendar } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: () => void;
}

export default function AboutPage({ onNavigate, onOpenQuoteModal }: AboutPageProps) {
  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-400 bg-teal-500/20 px-3.5 py-1 rounded-full border border-teal-500/30">
            Our Melbourne Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Elevating Melbourne Spaces With Precision Steam Care
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Founded with a singular vision: to deliver hospital-grade steam hygiene without the harsh toxic residues of traditional cleaning companies.
          </p>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
              The Steamora Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              We Don't Just Clean Surfaces. We Elevate Living Environments.
            </h2>
            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                In 2018, our founders recognized a glaring gap in the Melbourne cleaning market: homeowners and office managers were repeatedly forced to choose between cheap, rushed operators who left soaked carpets smelling of chemical fumes, or overpriced agencies with unreliable scheduling.
              </p>
              <p>
                STEAMORA was built on the principle of uncompromising quality. We invested in industrial 210°F dual-vacuum thermal extraction equipment imported from leading European fabric care specialists, paired with plant-derived, non-toxic bio-enzymes that are WoolSafe certified and 100% biodegradable.
              </p>
              <p>
                Today, our fleet of mobile service units operates 7 days a week across Greater Melbourne, caring for luxury penthouses on Collins Street, heritage Victorian cottages in Richmond, waterfront modern residences in Docklands, and boutique corporate suites in South Yarra.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-2xl font-extrabold text-teal-600">3,500+</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Melbourne Homes Cleaned</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="text-2xl font-extrabold text-teal-600">4.9 ★</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Google Rating</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 col-span-2 sm:col-span-1">
                <div className="text-2xl font-extrabold text-teal-600">100%</div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">Bond Refund Rate</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
                alt="Steamora Master Technicians at work in Melbourne"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-teal-300">
                  Certified Master Technicians
                </span>
                <h4 className="text-lg font-bold mt-1">
                  Uniformed, Police-Checked, Fully Insured ($20M)
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
            Our Guiding Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-3 tracking-tight">
            The Values That Set Steamora Apart
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-900/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Uncompromising Integrity</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We provide fixed upfront quotes without hidden "heavy soil" surcharges or on-site pressure tactics. If our work doesn't satisfy your standards, we re-clean completely free.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-900/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Scientific Fabric Care</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Different textiles require tailored chemistries. We treat delicate New Zealand wool, French velvet, and Belgian linen with custom pH-calibrated solutions to prevent fiber shock.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-900/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Genuine Melbourne Hospitality</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our technicians arrive on time, remove footwear or wear protective booties, treat your belongings with care, and leave your home feeling elevated and revitalized.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Experience the Steamora Standard in Your Home
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Get an instant fixed-price estimate online or speak directly with our Melbourne service coordinators today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-500/20"
            >
              GET A FREE QUOTE
            </button>
            <button
              onClick={() => onNavigate('book-online')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20"
            >
              BOOK ONLINE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
