import { COMPANY_INFO, trackConversion } from '../../data/config';
import { Phone, Calendar } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';

interface MobileBottomBarProps {
  onOpenQuoteModal: () => void;
}

export default function MobileBottomBar({ onOpenQuoteModal }: MobileBottomBarProps) {
  const handleCallClick = () => {
    trackConversion('phone_call_click', 'Mobile Sticky Bottom Call');
  };

  const handleWhatsAppClick = () => {
    trackConversion('whatsapp_click', 'Mobile Sticky Bottom WhatsApp');
  };

  const handleQuoteClick = () => {
    trackConversion('modal_open', 'Mobile Sticky Bottom Quote');
    onOpenQuoteModal();
  };

  return (
    <aside aria-label="Quick mobile booking actions" className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Call Now Button */}
        <a
          href={`tel:${COMPANY_INFO.phoneTel}`}
          onClick={handleCallClick}
          className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 shadow-sm active:scale-[0.98] transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-teal-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="py-2.5 px-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#128C7E] text-white font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 shadow-sm active:scale-[0.98] transition-transform"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        {/* Get Quote Button */}
        <button
          onClick={handleQuoteClick}
          className="py-2.5 px-2 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-bold text-xs flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 shadow-sm active:scale-[0.98] transition-transform"
        >
          <Calendar className="w-3.5 h-3.5 text-white" />
          <span>Quote</span>
        </button>
      </div>
    </aside>
  );
}
