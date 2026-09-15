import { useState } from 'react';
import { COMPANY_INFO, trackConversion } from '../../data/config';
import { X, Send, ShieldCheck, Clock } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState(
    "Hi Steamora! I'm interested in getting a quote for steam cleaning in Melbourne."
  );

  const handleLaunchWhatsApp = () => {
    trackConversion('whatsapp_click', 'WhatsApp Inquiry Initiated');
    const cleanNumber = COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(customMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="WhatsApp enquiry assistant" className="fixed bottom-24 sm:bottom-8 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Interactive Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#25D366] shadow-sm">
                    <WhatsAppIcon className="w-6 h-6 fill-[#25D366]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#128C7E]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white leading-tight">
                    STEAMORA Melbourne
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>WhatsApp • {COMPANY_INFO.whatsapp.display}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 text-xs">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200/70 text-slate-700">
              <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                <span>Chat directly on {COMPANY_INFO.whatsapp.display}</span>
              </p>
              <p className="text-slate-600">
                Send us a message or photos here on WhatsApp. Our Melbourne dispatch team provides fast fixed-price quotes and confirms same-day booking availability.
              </p>
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Typical response: Under 5 minutes</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Your Enquiry Message
              </label>
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#25D366] bg-white"
                placeholder="Type your message or suburb..."
              />
            </div>

            <button
              onClick={handleLaunchWhatsApp}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#128C7E] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>Start WhatsApp Chat ({COMPANY_INFO.whatsapp.display})</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct connection to Steamora Melbourne Dispatch</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) trackConversion('whatsapp_click', 'WhatsApp Widget Opened');
        }}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#128C7E] text-white px-4 py-3 rounded-full shadow-2xl shadow-[#25D366]/40 hover:shadow-[#25D366]/60 transition-all duration-300 transform hover:-translate-y-0.5 border border-emerald-300/40"
        aria-label="Chat with Steamora on WhatsApp"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
        </div>
        <span className="text-sm font-extrabold tracking-tight hidden sm:inline">
          WhatsApp Us
        </span>
      </button>
    </aside>
  );
}
