import { useState, useEffect } from 'react';
import { PageRoute } from '../../types';
import { COMPANY_INFO, trackConversion } from '../../data/config';
import { SERVICES } from '../../data/servicesData';
import { MELBOURNE_SUBURBS } from '../../data/suburbsData';
import Logo from '../ui/Logo';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  Calendar, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, params?: any) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export default function Navbar({ currentRoute, onNavigate, onOpenQuoteModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [suburbsDropdown, setSuburbsDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (route: PageRoute, params?: any) => {
    onNavigate(route, params);
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setSuburbsDropdown(false);
  };

  const handlePhoneClick = () => {
    trackConversion('phone_call_click', 'Navbar Call Button Click');
  };

  return (
    <>
      {/* Top Bar for Melbourne Location & Urgent Dispatch */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Melbourne-Wide Service • Greater Melbourne & Suburbs</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>7 Days: 7:00 AM – 7:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <span className="hidden lg:inline text-slate-300">
              Bond-Back Real Estate Compliant
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              onClick={handlePhoneClick}
              className="flex items-center gap-1.5 font-bold text-white hover:text-teal-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Call: <strong className="text-teal-300">{COMPANY_INFO.phone}</strong></span>
            </a>
            <span className="text-slate-400">|</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('whatsapp_click', 'Navbar Top WhatsApp Click')}
              className="flex items-center gap-1.5 font-bold text-emerald-300 hover:text-white transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp:</span>
              <strong className="text-emerald-300 font-bold">{COMPANY_INFO.whatsapp.display}</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5 py-3 border-b border-slate-200/80' 
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('home')}
            className="group focus:outline-none text-left"
            aria-label="Steamora Home"
          >
            <Logo size="md" showTagline={true} />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleLinkClick('home')}
              className={`transition-colors hover:text-teal-600 ${
                currentRoute === 'home' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                onClick={() => handleLinkClick('services')}
                className={`flex items-center gap-1 transition-colors hover:text-teal-600 ${
                  currentRoute.startsWith('service') && currentRoute !== 'service-areas' ? 'text-teal-600 font-bold' : ''
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-3 px-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Professional Cleaning Services
                  </div>
                  {SERVICES.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleLinkClick(`service-${srv.id.split('-')[0]}` as PageRoute)}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group/item"
                    >
                      <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0 group-hover/item:scale-125 transition-transform" />
                      <div>
                        <div className="font-bold text-slate-900 text-xs group-hover/item:text-teal-600">
                          {srv.shortTitle}
                        </div>
                        <div className="text-[11px] text-slate-600 line-clamp-1">
                          {srv.startingPrice} • {srv.tagline}
                        </div>
                      </div>
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                    <button
                      onClick={() => handleLinkClick('services')}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center justify-between w-full"
                    >
                      <span>View All Services & Pricing</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('about')}
              className={`transition-colors hover:text-teal-600 ${
                currentRoute === 'about' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              About Us
            </button>

            {/* Service Areas Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setSuburbsDropdown(true)}
              onMouseLeave={() => setSuburbsDropdown(false)}
            >
              <button
                onClick={() => handleLinkClick('service-areas')}
                className={`flex items-center gap-1 transition-colors hover:text-teal-600 ${
                  currentRoute === 'service-areas' || currentRoute === 'suburb-detail' ? 'text-teal-600 font-bold' : ''
                }`}
              >
                <span>Service Areas</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              {suburbsDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 mt-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Popular Melbourne Suburbs
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {MELBOURNE_SUBURBS.slice(0, 8).map((sub) => (
                      <button
                        key={sub.slug}
                        onClick={() => handleLinkClick('suburb-detail', sub.slug)}
                        className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-xs font-medium text-slate-700 hover:text-teal-600 truncate"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleLinkClick('service-areas')}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center justify-between w-full"
                    >
                      <span>Explore All Melbourne Locations</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => handleLinkClick('reviews')}
              className={`transition-colors hover:text-teal-600 ${
                currentRoute === 'reviews' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              Reviews
            </button>

            <button
              onClick={() => handleLinkClick('faq')}
              className={`transition-colors hover:text-teal-600 ${
                currentRoute === 'faq' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              FAQ
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className={`transition-colors hover:text-teal-600 ${
                currentRoute === 'contact' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => handleLinkClick('inquiry')}
              className={`relative px-3 py-1.5 rounded-xl font-bold transition-all text-xs flex items-center gap-1.5 ${
                currentRoute === 'inquiry'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <WhatsAppIcon className={`w-3.5 h-3.5 ${currentRoute === 'inquiry' ? 'fill-white' : 'fill-[#25D366]'}`} />
              <span>Inquiry</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('whatsapp_click', 'Navbar Desktop WhatsApp Button')}
              className="px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              title={`WhatsApp: ${COMPANY_INFO.whatsapp.display}`}
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => handleLinkClick('book-online')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>Book Online</span>
            </button>

            <button
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all duration-200 flex items-center gap-1.5 group"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-200" />
              <span>Get a Free Quote</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('whatsapp_click', 'Mobile Header WhatsApp Click')}
              className="p-2 rounded-xl bg-emerald-50 text-[#25D366] hover:bg-emerald-100"
              aria-label={`WhatsApp Steamora at ${COMPANY_INFO.whatsapp.display}`}
              title="WhatsApp Steamora"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneTel}`}
              onClick={handlePhoneClick}
              className="p-2 rounded-xl bg-teal-50 text-teal-600 hover:bg-teal-100"
              aria-label={`Call Steamora at ${COMPANY_INFO.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3 duration-200 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => handleLinkClick('home')}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-sm"
              >
                Home
              </button>
              <button
                onClick={() => handleLinkClick('services')}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-sm"
              >
                All Services
              </button>
              <button
                onClick={() => handleLinkClick('about')}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-sm"
              >
                About Us
              </button>
              <button
                onClick={() => handleLinkClick('service-areas')}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-sm"
              >
                Service Areas
              </button>
              <button
                onClick={() => handleLinkClick('reviews')}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-sm"
              >
                Reviews (4.9 ★)
              </button>
              <button
                onClick={() => handleLinkClick('faq')}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-sm"
              >
                FAQs
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="text-left px-3 py-2 rounded-xl bg-slate-50 text-slate-800 font-bold text-sm"
              >
                Contact
              </button>
              <button
                onClick={() => handleLinkClick('inquiry')}
                className="text-left px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-sm border border-emerald-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5">
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                  <span>Customer Inquiry</span>
                </div>
                <span className="text-[10px] uppercase font-bold bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">New</span>
              </button>
            </div>

            {/* Direct Service Quick Links */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1 px-1">
                Direct Service Pages
              </div>
              <div className="space-y-1">
                {SERVICES.map(srv => (
                  <button
                    key={srv.id}
                    onClick={() => handleLinkClick(`service-${srv.id.split('-')[0]}` as PageRoute)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-between"
                  >
                    <span>{srv.shortTitle}</span>
                    <span className="text-[11px] text-teal-600">{srv.startingPrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Call & Quote CTAs */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackConversion('whatsapp_click', 'Mobile Menu WhatsApp Click');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp Chat ({COMPANY_INFO.whatsapp.display})</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get a Free Quote</span>
              </button>
              <button
                onClick={() => handleLinkClick('book-online')}
                className="w-full py-3 rounded-xl border border-slate-300 text-slate-800 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>Book Online (Instant Scheduler)</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
