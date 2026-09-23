import React, { useState } from 'react';
import { trackConversion, COMPANY_INFO } from '../../data/config';
import { MELBOURNE_SUBURBS } from '../../data/suburbsData';
import { CheckCircle2, Calculator, ArrowRight, ShieldCheck, Sparkles, Mail, Phone } from 'lucide-react';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import { saveLead } from '../../utils/leadStorage';
import { dispatchQuoteToOwnerEmail } from '../../utils/emailDispatch';

interface QuoteCalculatorProps {
  initialService?: string;
  onSuccess?: () => void;
  className?: string;
}

export default function QuoteCalculator({
  initialService = 'carpet-cleaning',
  onSuccess,
  className = ''
}: QuoteCalculatorProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    suburb: 'Richmond',
    service: initialService,
    propertyType: 'house',
    roomsCount: 3,
    hasStains: false,
    hasPetOdour: false,
    preferredDate: '',
    message: ''
  });

  const [isCustomSuburb, setIsCustomSuburb] = useState(false);
  const [customSuburb, setCustomSuburb] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailDispatched, setIsEmailDispatched] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Dynamic price calculation estimate
  const calculateEstimate = () => {
    let base = 0;
    if (formData.service === 'carpet-cleaning') {
      base = formData.roomsCount * 30; // Min range
    } else if (formData.service === 'mattress-cleaning') {
      base = formData.roomsCount * 80; // Min range
    } else if (formData.service === 'couch-cleaning') {
      base = formData.roomsCount * 25; // Min range
    } else if (formData.service === 'blind-cleaning') {
      base = formData.roomsCount * 25; // Min range
    } else if (formData.service === 'rug-cleaning') {
      base = formData.roomsCount * 80; // Min range
    } else {
      base = formData.roomsCount * 30;
    }

    if (formData.propertyType === 'commercial') base *= 1.25;

    return Math.round(base);
  };

  // For display, we'll want to show a range. We can return an object or handle it later. Let's just return min and add a span.
  const estimatedPriceMin = calculateEstimate();
  let estimatedPriceMax = 0;
  if (formData.service === 'carpet-cleaning') estimatedPriceMax = formData.roomsCount * 35;
  else if (formData.service === 'mattress-cleaning') estimatedPriceMax = formData.roomsCount * 100;
  else if (formData.service === 'couch-cleaning') estimatedPriceMax = formData.roomsCount * 35;
  else if (formData.service === 'blind-cleaning') estimatedPriceMax = formData.roomsCount * 35;
  else if (formData.service === 'rug-cleaning') estimatedPriceMax = formData.roomsCount * 100;
  else estimatedPriceMax = formData.roomsCount * 35;
  
  if (formData.propertyType === 'commercial') estimatedPriceMax *= 1.25;
  estimatedPriceMax = Math.round(estimatedPriceMax);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter a valid phone number';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Please enter at least 8 digits';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid email address';
    }
    if (isCustomSuburb || formData.suburb === 'Other') {
      if (!customSuburb.trim()) errs.customSuburb = 'Please enter your suburb or location';
    } else if (!formData.suburb.trim()) {
      errs.suburb = 'Please select your Melbourne suburb';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const resolvedSuburb = (isCustomSuburb || formData.suburb === 'Other') && customSuburb.trim()
      ? customSuburb.trim()
      : formData.suburb;

    trackConversion(
      'quote_form_submit',
      `Free Quote: ${formData.fullName} - ${formData.service} (${resolvedSuburb})`,
      estimatedPriceMin
    );

    // Save lead record for owner access & persistence
    saveLead({
      type: 'quote',
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      suburb: resolvedSuburb,
      service: formData.service,
      estimatedPrice: `${estimatedPriceMin} - ${estimatedPriceMax}`,
      details: `Rooms: ${formData.roomsCount}, Property: ${formData.propertyType}, Stains: ${formData.hasStains ? 'Yes' : 'No'}, Pet Odour: ${formData.hasPetOdour ? 'Yes' : 'No'}${formData.message ? ` | Notes: ${formData.message}` : ''}`
    });

    // Automatically send notification email directly to steamoracleaning@gmail.com
    dispatchQuoteToOwnerEmail({
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      suburb: resolvedSuburb,
      service: formData.service,
      estimatedPrice: `${estimatedPriceMin} – ${estimatedPriceMax}`,
      propertyType: formData.propertyType,
      roomsCount: formData.roomsCount,
      hasStains: formData.hasStains,
      hasPetOdour: formData.hasPetOdour,
      details: formData.message,
      source: 'Steamora Free Quote Calculator'
    }).then((res) => {
      if (res.success) {
        setIsEmailDispatched(true);
      }
    });

    setFormData(prev => ({ ...prev, suburb: resolvedSuburb }));
    setIsSubmitted(true);
    if (onSuccess) onSuccess();
  };

  const getQuoteWhatsAppUrl = () => {
    const text = [
      `*🔔 New STEAMORA Quote Submission*`,
      `---------------------------------`,
      `*Customer:* ${formData.fullName}`,
      `*Phone:* ${formData.phone}`,
      `*Email:* ${formData.email}`,
      `*Suburb:* ${formData.suburb} (VIC)`,
      `*Service:* ${formData.service.replace(/-/g, ' ')}`,
      `*Property:* ${formData.propertyType}`,
      `*Rooms:* ${formData.roomsCount}`,
      `*Estimated Range:* $${estimatedPriceMin} – $${estimatedPriceMax} AUD`,
      formData.hasStains ? `*Stain Treatment Needed:* Yes` : null,
      formData.hasPetOdour ? `*Pet Odour / Sanitisation:* Yes` : null,
      formData.message?.trim() ? `*Notes:* ${formData.message.trim()}` : null,
      `---------------------------------`,
      `Submitted via Steamora Free Quote Calculator`
    ].filter(Boolean).join('\n');

    const cleanNumber = COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const getQuoteMailtoUrl = () => {
    const subject = `Steam Cleaning Quote Request - ${formData.fullName} (${formData.suburb}) - $${estimatedPriceMin}-$${estimatedPriceMax}`;
    const body = [
      `Hi Steamora Dispatch,`,
      ``,
      `A new customer quote has been submitted on steamora.com.au:`,
      ``,
      `• Customer Name: ${formData.fullName}`,
      `• Phone: ${formData.phone}`,
      `• Email: ${formData.email}`,
      `• Suburb: ${formData.suburb}`,
      `• Service: ${formData.service}`,
      `• Estimated Price: $${estimatedPriceMin} – $${estimatedPriceMax} AUD`,
      `• Property Type: ${formData.propertyType}`,
      `• Rooms: ${formData.roomsCount}`,
      `• Specific Notes: ${formData.message || 'None'}`,
      ``,
      `Timestamp: ${new Date().toLocaleString()}`
    ].join('\n');

    return `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-teal-500/20 text-center animate-in zoom-in-95 duration-300 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs uppercase font-bold tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
          Quote Request Received
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
          Thank you, {formData.fullName}!
        </h3>
        <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-6">
          We’ve received your quote request for your <span className="font-semibold text-slate-900">{formData.suburb}</span> property. A member of the Steamora Melbourne team will contact you within 15 minutes with your confirmed fixed quote.
        </p>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 max-w-md mx-auto text-left mb-4">
          <div className="text-xs uppercase tracking-wider font-bold text-slate-600 mb-2">
            Quote Reference Summary
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-slate-600">Estimated Range:</span> <strong className="text-slate-900">${estimatedPriceMin} – ${estimatedPriceMax} AUD</strong></div>
            <div><span className="text-slate-600">Service:</span> <strong className="text-slate-900 capitalize">{formData.service.replace(/-/g, ' ')}</strong></div>
            <div><span className="text-slate-600">Suburb:</span> <strong className="text-slate-900">{formData.suburb} (VIC)</strong></div>
            <div><span className="text-slate-600">Contact:</span> <strong className="text-slate-900">{formData.phone}</strong></div>
          </div>
        </div>

        {/* Dispatch Notification Status */}
        <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-3 max-w-md mx-auto text-xs text-emerald-900 flex items-center justify-center gap-2 mb-6 text-left">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {isEmailDispatched ? (
              <>Email dispatched directly to <strong>{COMPANY_INFO.email}</strong></>
            ) : (
              <>Quote recorded & dispatched to <strong>{COMPANY_INFO.email}</strong></>
            )}
          </span>
        </div>

        {/* Real-time Dispatch Actions */}
        <div className="space-y-3 max-w-md mx-auto mb-6">
          <p className="text-xs text-slate-500 font-medium">
            Connect immediately with our Melbourne dispatch team:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={getQuoteWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('whatsapp_click', 'Quote Confirmation WhatsApp')}
              className="px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Send via WhatsApp</span>
            </a>
            <a
              href={getQuoteMailtoUrl()}
              onClick={() => trackConversion('quote_form_submit', 'Quote Confirmation Email Click')}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-slate-900/10 transition-all hover:scale-[1.02]"
            >
              <Mail className="w-4 h-4 text-teal-400" />
              <span>Send to {COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 border-t border-slate-100">
          <a
            href={`tel:${COMPANY_INFO.phoneTel}`}
            onClick={() => trackConversion('phone_call_click', 'Quote Success Call')}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>Call Melbourne Dispatch ({COMPANY_INFO.phone})</span>
          </a>
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full sm:w-auto px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold text-xs transition-colors"
          >
            Submit Another Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-200/80 relative overflow-hidden ${className}`}>
      {/* Decorative subtle top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-400 to-slate-900" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Fast 60-Second Estimate</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Get Your Free Quote
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            No obligation. Upfront fixed Melbourne pricing with zero hidden surcharges.
          </p>
        </div>

        {/* Live Estimate Badge */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:text-right shrink-0 border border-slate-800 shadow-lg">
          <div className="text-[11px] font-semibold text-teal-300 uppercase tracking-wider flex items-center gap-1 sm:justify-end">
            <Calculator className="w-3.5 h-3.5" />
            Estimated Guide Price
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
            ${estimatedPriceMin}-${estimatedPriceMax} <span className="text-xs font-normal text-slate-400">AUD inc. GST</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Final exact price confirmed prior to start
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Service and Property Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Service Required *
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-800"
            >
              <option value="carpet-cleaning">Carpet Steam Cleaning</option>
              <option value="mattress-cleaning">Mattress Cleaning</option>
              <option value="couch-cleaning">Couch Cleaning</option>
              <option value="blind-cleaning">Blind Cleaning</option>
              <option value="rug-cleaning">Rug Cleaning</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Property Type *
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as any })}
              className="w-full text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-800"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment / Unit</option>
              <option value="townhouse">Townhouse</option>
              <option value="office">Office</option>
              <option value="commercial">Commercial Property</option>
            </select>
          </div>
        </div>

        {/* Row 2: Rooms Counter & Suburb */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Approx. Rooms / Areas / Items
            </label>
            <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, roomsCount: Math.max(1, formData.roomsCount - 1) })}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-sm text-slate-900">
                {formData.roomsCount} {formData.roomsCount === 1 ? 'Area / Room' : 'Areas / Rooms'}
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, roomsCount: Math.min(12, formData.roomsCount + 1) })}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Melbourne Suburb *
            </label>
            <select
              value={isCustomSuburb ? 'Other' : formData.suburb}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'Other') {
                  setIsCustomSuburb(true);
                  setFormData({ ...formData, suburb: 'Other' });
                } else {
                  setIsCustomSuburb(false);
                  setFormData({ ...formData, suburb: val });
                  if (errors.customSuburb) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.customSuburb;
                      return next;
                    });
                  }
                }
              }}
              className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                errors.suburb ? 'border-red-500' : 'border-slate-300'
              } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium text-slate-800`}
            >
              {MELBOURNE_SUBURBS.map((sub) => (
                <option key={sub.slug} value={sub.name}>
                  {sub.name} ({sub.postcode})
                </option>
              ))}
              <option value="Other">Other Suburb / Not Listed (Type manually)</option>
            </select>
            {errors.suburb && <p className="text-red-500 text-xs mt-1">{errors.suburb}</p>}

            {isCustomSuburb && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={customSuburb}
                  onChange={(e) => {
                    setCustomSuburb(e.target.value);
                    if (errors.customSuburb) {
                      setErrors((prev) => {
                        const next = { ...prev };
                        delete next.customSuburb;
                        return next;
                      });
                    }
                  }}
                  placeholder="Type your suburb or location..."
                  className={`w-full text-xs sm:text-sm py-2.5 px-3 rounded-lg border ${
                    errors.customSuburb ? 'border-red-500 bg-red-50/20' : 'border-teal-400 bg-teal-50/20'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900`}
                  autoFocus
                />
                {errors.customSuburb && (
                  <p className="text-red-500 text-xs mt-1">{errors.customSuburb}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Row 4: Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Jessica Miller"
              className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                errors.fullName ? 'border-red-500' : 'border-slate-300'
              } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 0400 123 456"
              className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                errors.phone ? 'border-red-500' : 'border-slate-300'
              } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. jessica@example.com"
              className={`w-full text-sm py-3 px-3.5 rounded-xl border ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Row 5: Preferred Date & Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Date
            </label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
              className="w-full text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Additional Notes or Message
            </label>
            <input
              type="text"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. End of lease key collection or parking notes"
              className="w-full text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-base tracking-wide uppercase transition-all duration-300 shadow-xl shadow-teal-600/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>GET MY FREE QUOTE</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 pt-2 text-center">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            100% Satisfaction Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            WoolSafe Certified & Non-Toxic
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Bond-Back Real Estate Compliant
          </span>
        </div>
      </form>
    </div>
  );
}
