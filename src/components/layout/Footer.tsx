import { PageRoute } from '../../types';
import { COMPANY_INFO, trackConversion } from '../../data/config';
import { SERVICES } from '../../data/servicesData';
import { MELBOURNE_SUBURBS } from '../../data/suburbsData';
import Logo from '../ui/Logo';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Award, 
  Sparkles,
  Facebook,
  Instagram,
  Linkedin,
  Inbox
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute, params?: any) => void;
  onOpenQuoteModal: () => void;
  onOpenOwnerLeads?: () => void;
}

export default function Footer({ onNavigate, onOpenQuoteModal, onOpenOwnerLeads }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-28 lg:pb-12 border-t border-slate-800">
      {/* Pre-Footer Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-teal-950 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Melbourne’s Trusted Steam Experts</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready for a Fresher, Healthier Space?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Book professional steam cleaning with Steamora today. 100% money-back guarantee, non-toxic solutions, and same-day availability across Greater Melbourne.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onOpenQuoteModal()}
              className="w-full sm:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-500/25 transition-all duration-200 uppercase tracking-wide"
            >
              Get Free Quote
            </button>
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              onClick={() => trackConversion('phone_call_click', 'Footer Banner Call')}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 active:bg-white/5 text-white font-bold text-sm rounded-2xl border border-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>Call {COMPANY_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('whatsapp_click', 'Footer Banner WhatsApp')}
              className="w-full sm:w-auto px-6 py-4 bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#128C7E] text-white font-bold text-sm rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80 text-sm">
          {/* Col 1: Brand & NAP */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="white" size="md" showTagline={true} />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              STEAMORA is Melbourne’s premier residential and commercial steam cleaning specialist. We combine medical-grade thermal extraction with WoolSafe non-toxic chemistry to elevate your living and working environments.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneTel}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366] shrink-0" />
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('whatsapp_click', 'Footer NAP WhatsApp')}
                  className="hover:text-emerald-300 transition-colors text-emerald-400 font-semibold"
                >
                  WhatsApp: {COMPANY_INFO.whatsapp.display}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-500">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{COMPANY_INFO.hours.weekdays} • Weekends available</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('whatsapp_click', 'Footer Social WhatsApp')}
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 hover:border-[#25D366] transition-colors"
                aria-label="Steamora WhatsApp"
                title={`WhatsApp ${COMPANY_INFO.whatsapp.display}`}
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                aria-label="Steamora Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                aria-label="Steamora Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800 transition-colors"
                aria-label="Steamora LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.social.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-800 transition-colors"
              >
                <span className="text-amber-400">★★★★★</span>
                <span>Google Reviews</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Cleaning Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES.map(srv => (
                <li key={srv.id}>
                  <button
                    onClick={() => onNavigate(`service-${srv.id.split('-')[0]}` as PageRoute)}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('services')}
                  className="font-bold text-teal-400 hover:text-teal-300 text-xs"
                >
                  View All Services & Pricing →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Melbourne Suburbs (Local SEO Internal Links) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Melbourne Suburbs
            </h4>
            <ul className="space-y-2 text-xs">
              {MELBOURNE_SUBURBS.slice(0, 7).map(sub => (
                <li key={sub.slug}>
                  <button
                    onClick={() => onNavigate('suburb-detail', sub.slug)}
                    className="hover:text-teal-400 transition-colors text-left flex items-center justify-between w-full"
                  >
                    <span>{sub.name}</span>
                    <span className="text-slate-600 text-[10px]">{sub.postcode}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('service-areas')}
                  className="font-bold text-teal-400 hover:text-teal-300 text-xs"
                >
                  All 45+ Melbourne Locations →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Credentials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Steamora Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Our Company
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reviews')} className="hover:text-white transition-colors">
                  Melbourne Reviews ({COMPANY_INFO.ratings.totalReviews}+)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book-online')} className="hover:text-white transition-colors font-semibold text-teal-300">
                  Book Online (Instant)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenQuoteModal()} className="hover:text-white transition-colors font-semibold text-teal-300">
                  Get Free Instant Quote
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Steamora Melbourne
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inquiry')} className="hover:text-white transition-colors text-emerald-300 font-bold flex items-center gap-1">
                  <span>Customer Inquiry (WhatsApp & Email)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('google-ads-landing')} className="text-slate-600 hover:text-slate-400 text-[11px]">
                  Special Carpet Clean Offer
                </button>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>ABN: {COMPANY_INFO.abn}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Award className="w-3.5 h-3.5 text-teal-400" />
                <span>$20M Public Liability Insured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Steamora Cleaning Services Pty Ltd. All Rights Reserved. Melbourne, Victoria, Australia.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => onNavigate('faq')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('faq')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">
              Melbourne Dispatch
            </button>
            {onOpenOwnerLeads && (
              <button 
                onClick={onOpenOwnerLeads} 
                className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-semibold border-l border-slate-800 pl-4"
                title="View customer submitted quotes & bookings"
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Owner Leads Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
