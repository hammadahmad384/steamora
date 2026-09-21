import React, { useState } from 'react';
import { COMPANY_INFO, trackConversion } from '../data/config';
import { MELBOURNE_SUBURBS } from '../data/suburbsData';
import { SERVICES } from '../data/servicesData';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import {
  Send,
  Mail,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquareQuote,
  Copy,
  Check
} from 'lucide-react';
import { PageRoute } from '../types';

interface InquiryPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal?: () => void;
}

export default function InquiryPage({ onNavigate, onOpenQuoteModal }: InquiryPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Carpet Steam Cleaning',
    time: 'Morning (8:00 AM – 11:00 AM)',
    area: 'Melbourne CBD',
    message: ''
  });

  const [isCustomArea, setIsCustomArea] = useState(false);
  const [customArea, setCustomArea] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [copied, setCopied] = useState(false);

  // Time preference options
  const timeOptions = [
    'Morning (8:00 AM – 11:00 AM)',
    'Midday (11:00 AM – 2:00 PM)',
    'Afternoon (2:00 PM – 5:00 PM)',
    'Evening (5:00 PM – 7:30 PM)',
    'Urgent / Same-Day Service (ASAP)',
    'Flexible / Any Time Available'
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim() || formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errs.phone = 'Please enter a valid Australian phone number (at least 8 digits)';
    }
    if (isCustomArea || formData.area === 'Other') {
      if (!customArea.trim()) {
        errs.customArea = 'Please enter your suburb or location';
      }
    } else if (!formData.area.trim()) {
      errs.area = 'Please select or specify your Melbourne area';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Build structured message for WhatsApp and Email
  const buildInquiryText = (data: typeof formData) => {
    return [
      `*New STEAMORA Customer Inquiry*`,
      `---------------------------------`,
      `*Customer Name:* ${data.name}`,
      `*Phone:* ${data.phone}`,
      `*Email:* ${data.email}`,
      `*Service Required:* ${data.service}`,
      `*Preferred Service Time:* ${data.time}`,
      `*Suburb / Area:* ${data.area}`,
      `*Message / Requirements:*`,
      data.message.trim() ? data.message.trim() : 'No additional message provided.'
    ].join('\n');
  };

  const getWhatsAppLink = (data: typeof formData) => {
    const text = buildInquiryText(data);
    const cleanNumber = COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  };

  const getMailtoLink = (data: typeof formData) => {
    const subject = `Steam Cleaning Inquiry - ${data.name} (${data.area}) - ${data.service}`;
    const body = [
      `Hi Steamora Team,`,
      ``,
      `I would like to enquire about steam cleaning services. Here are my details:`,
      ``,
      `• Name: ${data.name}`,
      `• Phone: ${data.phone}`,
      `• Email: ${data.email}`,
      `• Service: ${data.service}`,
      `• Preferred Time: ${data.time}`,
      `• Area / Suburb: ${data.area}`,
      `• Message / Details:`,
      data.message.trim() ? data.message.trim() : 'N/A',
      ``,
      `Looking forward to your quick response.`,
      `Sent via Steamora Customer Inquiry Portal`
    ].join('\n');

    return `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const resolvedArea = (isCustomArea || formData.area === 'Other') && customArea.trim()
      ? customArea.trim()
      : formData.area;

    const dataToSubmit = { ...formData, area: resolvedArea };
    setSubmittedData(dataToSubmit);

    // Track analytics conversion
    trackConversion(
      'inquiry_submit',
      `Customer Inquiry: ${dataToSubmit.name} (${dataToSubmit.area}) - ${dataToSubmit.service}`
    );

    setIsSubmitted(true);

    // Automatically trigger WhatsApp direct send in a new tab
    const waUrl = getWhatsAppLink(dataToSubmit);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    if (!submittedData) return;
    const text = buildInquiryText(submittedData);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 pt-6">
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
          <MessageSquareQuote className="w-4 h-4 text-[#25D366]" />
          <span>Direct Dispatch & Instant Response</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          Customer Inquiry Portal
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Submit your steam cleaning requirements below. Your inquiry is transmitted <strong className="text-slate-900">directly to our WhatsApp dispatch line ({COMPANY_INFO.whatsapp.display})</strong> and <strong className="text-slate-900">email ({COMPANY_INFO.email})</strong> for an immediate response.
        </p>

        {/* Quick Contact Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`tel:${COMPANY_INFO.phoneTel}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-teal-600" />
            <span>Call {COMPANY_INFO.phone}</span>
          </a>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
            <span>WhatsApp {COMPANY_INFO.whatsapp.display}</span>
          </a>
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-teal-600" />
            <span>{COMPANY_INFO.email}</span>
          </a>
        </div>
      </section>

      {/* Main Grid: Benefits + Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Dispatch Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Multi-Channel Dispatch</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                How It Works
              </h2>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white block font-bold">Direct WhatsApp Transmission</strong>
                    <span>Your inquiry immediately opens WhatsApp with all your job details pre-filled.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white block font-bold">Direct Email Receipt</strong>
                    <span>Sent directly to <span className="text-teal-300">{COMPANY_INFO.email}</span> for permanent record and dispatch booking.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white block font-bold">15-Minute Guaranteed Reply</strong>
                    <span>Our Melbourne dispatch team reviews availability and confirms your fixed price.</span>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Melbourne-Wide Mobile Coverage (45km radius)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>
            </div>

            {/* Melbourne Operating Hours Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Operating & Dispatch Hours</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Monday – Friday:</span>
                  <span className="font-semibold text-slate-900">{COMPANY_INFO.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold text-slate-900">{COMPANY_INFO.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold text-slate-900">{COMPANY_INFO.hours.sunday}</span>
                </div>
                <div className="pt-2 text-teal-600 font-semibold border-t border-slate-100">
                  ⚡ {COMPANY_INFO.hours.emergency}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form or Submission Confirmation */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
            {isSubmitted && submittedData ? (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
                    Inquiry Generated Successfully
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Thank You, {submittedData.name}!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-lg mx-auto">
                    Your inquiry has been compiled for direct dispatch. If WhatsApp did not open automatically, click the button below to connect with us immediately, or send the email copy directly.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 text-xs space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-900 text-sm">Inquiry Summary</span>
                    <button
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-bold"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div><span className="text-slate-500">Service:</span> <strong className="text-slate-900">{submittedData.service}</strong></div>
                    <div><span className="text-slate-500">Area / Suburb:</span> <strong className="text-slate-900">{submittedData.area}</strong></div>
                    <div><span className="text-slate-500">Preferred Time:</span> <strong className="text-slate-900">{submittedData.time}</strong></div>
                    <div><span className="text-slate-500">Phone:</span> <strong className="text-slate-900">{submittedData.phone}</strong></div>
                    <div className="sm:col-span-2"><span className="text-slate-500">Email:</span> <strong className="text-slate-900">{submittedData.email}</strong></div>
                    {submittedData.message && (
                      <div className="sm:col-span-2 pt-1 border-t border-slate-200">
                        <span className="text-slate-500 block mb-0.5">Message / Requirements:</span>
                        <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-800 text-xs italic">
                          "{submittedData.message}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={getWhatsAppLink(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion('whatsapp_click', 'Inquiry Confirmation WhatsApp')}
                    className="py-4 px-5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all text-center"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                    <span>Send on WhatsApp ({COMPANY_INFO.whatsapp.display})</span>
                  </a>

                  <a
                    href={getMailtoLink(submittedData)}
                    onClick={() => trackConversion('quote_form_submit', 'Inquiry Confirmation Email Send')}
                    className="py-4 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all text-center"
                  >
                    <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                    <span>Send Email ({COMPANY_INFO.email})</span>
                  </a>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmittedData(null);
                      setIsCustomArea(false);
                      setCustomArea('');
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline"
                  >
                    ← Submit another customer inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      Customer Inquiry Form
                    </h3>
                    <span className="text-xs text-slate-500">
                      * Required fields
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Provide your details below to receive a customized quote directly to WhatsApp and email.
                  </p>
                </div>

                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. David Harrison"
                      className={`w-full text-xs sm:text-sm py-3 px-3.5 rounded-xl border ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0449 993 786"
                      className={`w-full text-xs sm:text-sm py-3 px-3.5 rounded-xl border ${
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Row 2: Email & Melbourne Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. david@example.com"
                      className={`w-full text-xs sm:text-sm py-3 px-3.5 rounded-xl border ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Melbourne Area / Suburb *
                    </label>
                    <select
                      value={isCustomArea ? 'Other' : formData.area}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Other') {
                          setIsCustomArea(true);
                          setFormData({ ...formData, area: 'Other' });
                        } else {
                          setIsCustomArea(false);
                          setFormData({ ...formData, area: val });
                          if (errors.customArea) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.customArea;
                              return next;
                            });
                          }
                        }
                      }}
                      className="w-full text-xs sm:text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-800"
                    >
                      <optgroup label="Popular Melbourne Suburbs">
                        {MELBOURNE_SUBURBS.map((sub) => (
                          <option key={sub.slug} value={`${sub.name} (VIC ${sub.postcode})`}>
                            {sub.name} (VIC {sub.postcode})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Locations">
                        <option value="Other">Other Suburb / Not Listed (Type manually)</option>
                        <option value="Mornington Peninsula / Outer Region">Mornington Peninsula / Outer Region</option>
                        <option value="Geelong / Regional Victoria">Geelong / Regional Victoria</option>
                      </optgroup>
                    </select>

                    {isCustomArea && (
                      <div className="mt-2.5">
                        <label className="block text-[11px] font-bold text-teal-700 mb-1">
                          Enter your Suburb / Postcode / Location *
                        </label>
                        <input
                          type="text"
                          value={customArea}
                          onChange={(e) => {
                            setCustomArea(e.target.value);
                            if (errors.customArea) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.customArea;
                                return next;
                              });
                            }
                          }}
                          placeholder="e.g. Cranbourne, Altona 3018, Ballarat, Frankston..."
                          className={`w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border ${
                            errors.customArea ? 'border-red-500 bg-red-50/20' : 'border-teal-400 bg-teal-50/20'
                          } focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 placeholder:text-slate-400`}
                          autoFocus
                        />
                        {errors.customArea && (
                          <p className="text-red-500 text-xs mt-1 font-medium">{errors.customArea}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 3: Service & Preferred Service Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full text-xs sm:text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-800"
                    >
                      <option value="Carpet Steam Cleaning">Carpet Steam Cleaning (Residential / Commercial)</option>
                      <option value="Couch & Upholstery Cleaning">Couch & Upholstery Deep Steam Cleaning</option>
                      <option value="Mattress Deep Sanitisation">Mattress Deep Thermal Sanitisation</option>
                      <option value="Blind Cleaning">Blind Cleaning (Venetian / Vertical / Roman)</option>
                      <option value="Rug Deep Steam Cleaning">Rug Deep Steam Cleaning (Persian / Wool / Modern)</option>
                      <option value="End of Lease Carpet Clean">End of Lease / Bond Guarantee Package</option>
                      <option value="Emergency Flood Water Extraction">24/7 Emergency Flood / Water Extraction</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Preferred Service Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full text-xs sm:text-sm py-3 px-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-800"
                    >
                      {timeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Any Message, Specific Stains, or Room Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. 3 bedrooms + lounge room in South Yarra. One bedroom has pet stains. Needed for end of lease inspection on Thursday morning."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    You can also attach photos once WhatsApp opens for a fast fixed quote.
                  </p>
                </div>

                {/* Direct Delivery Notice */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-slate-700 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Real-Time Delivery</span>
                    <span>Transmits directly to WhatsApp ({COMPANY_INFO.whatsapp.display}) & Email ({COMPANY_INFO.email})</span>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#128C7E] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white" />
                    <span>Send Inquiry to WhatsApp & Email</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 pt-1 text-center">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    No obligation free quote
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-600" />
                    Fast 15-min reply
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    Direct to Melbourne Dispatch
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
