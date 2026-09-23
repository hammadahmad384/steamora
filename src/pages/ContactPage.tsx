import React, { useState } from 'react';
import { PageRoute } from '../types';
import { COMPANY_INFO, trackConversion } from '../data/config';
import { MELBOURNE_SUBURBS } from '../data/suburbsData';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { saveLead } from '../utils/leadStorage';
import { dispatchQuoteToOwnerEmail } from '../utils/emailDispatch';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Send,
  MessageSquare
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQuoteModal: () => void;
}

export default function ContactPage({ onNavigate, onOpenQuoteModal }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: 'Melbourne CBD',
    service: 'Carpet Steam Cleaning',
    message: ''
  });

  const [isCustomSuburb, setIsCustomSuburb] = useState(false);
  const [customSuburb, setCustomSuburb] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Valid phone number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (isCustomSuburb || formData.suburb === 'Other') {
      if (!customSuburb.trim()) errs.customSuburb = 'Please enter your suburb or location';
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
      `Contact Enquiry: ${formData.name} (${resolvedSuburb}) - ${formData.service}`
    );

    saveLead({
      type: 'contact',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      suburb: resolvedSuburb,
      service: formData.service,
      details: formData.message || 'General contact enquiry'
    });

    // Automatically send notification email directly to steamoracleaning@gmail.com
    dispatchQuoteToOwnerEmail({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      suburb: resolvedSuburb,
      service: formData.service,
      details: formData.message,
      source: 'Steamora Melbourne Contact Form'
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Melbourne Headquarters & Mobile Dispatch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Contact Steamora Melbourne
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have a question, need an urgent booking, or want a custom quotation? We are here to help 7 days a week.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Left */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600 bg-teal-50 px-3.5 py-1 rounded-full">
                Direct Touchpoints
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-3 tracking-tight">
                Get In Touch Directly
              </h2>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                Our central dispatch team coordinates mobile service vans across Melbourne, with real-time tracking and prompt SMS updates.
              </p>
            </div>

            {/* NAP Cards */}
            <div className="space-y-4 text-sm">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Phone Dispatch</div>
                  <a href={`tel:${COMPANY_INFO.phoneTel}`} className="text-teal-600 font-extrabold hover:underline text-base">
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Urgent & Same-Day Enquiries (Greater Melbourne)</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span>WhatsApp Direct</span>
                    <span className="text-[10px] uppercase font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Fastest</span>
                  </div>
                  <a 
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${COMPANY_INFO.whatsapp.defaultMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion('whatsapp_click', 'Contact Page WhatsApp Card')}
                    className="text-emerald-700 font-extrabold hover:underline text-base block"
                  >
                    {COMPANY_INFO.whatsapp.display}
                  </a>
                  <p className="text-xs text-slate-600 mt-0.5">Send photos of stains or rooms for an instant fixed quote</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Email Address</div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-teal-600 font-semibold hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Average response under 30 minutes</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Melbourne Coverage</div>
                  <p className="text-slate-700 font-medium">{COMPANY_INFO.address}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Servicing within 45km of Melbourne CBD</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Operating Hours</div>
                  <p className="text-slate-700 font-medium">{COMPANY_INFO.hours.weekdays}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Weekend & after-hours available by appointment</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-teal-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Australian Company Details</span>
              </div>
              <p className="text-slate-300">
                Steamora Cleaning Services Pty Ltd • ABN: {COMPANY_INFO.abn}
              </p>
              <p className="text-slate-400">
                Fully insured with $20,000,000 public and product liability coverage across Victoria.
              </p>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Your enquiry has been received by our Melbourne dispatch team. A specialist will call, SMS, or email you at <span className="font-semibold text-slate-900">{formData.email}</span> within 15–30 minutes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi Steamora, I just submitted an inquiry for ${formData.service} in ${formData.suburb}. Name: ${formData.name}, Phone: ${formData.phone}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion('whatsapp_click', 'Contact Success WhatsApp')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Open in WhatsApp ({COMPANY_INFO.whatsapp.display})</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Steam Cleaning Enquiry - ${formData.name} (${formData.suburb})`)}&body=${encodeURIComponent(
                      `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nSuburb: ${formData.suburb}\nService: ${formData.service}\nMessage: ${formData.message}`
                    )}`}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-4 h-4 text-teal-400" />
                    <span>Send to {COMPANY_INFO.email}</span>
                  </a>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        suburb: 'Melbourne CBD',
                        service: 'Carpet Steam Cleaning',
                        message: ''
                      });
                    }}
                    className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Send Us an Online Message
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Fill in the form below and we'll reply right away.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className={`w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border ${
                        errors.name ? 'border-red-500' : 'border-slate-300'
                      } focus:ring-2 focus:ring-teal-500`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0488 123 456"
                      className={`w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border ${
                        errors.phone ? 'border-red-500' : 'border-slate-300'
                      } focus:ring-2 focus:ring-teal-500`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className={`w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border ${
                        errors.email ? 'border-red-500' : 'border-slate-300'
                      } focus:ring-2 focus:ring-teal-500`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
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
                      className="w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      {MELBOURNE_SUBURBS.map(sub => (
                        <option key={sub.slug} value={sub.name}>
                          {sub.name} (VIC {sub.postcode})
                        </option>
                      ))}
                      <option value="Other">Other Suburb / Not Listed (Type manually)</option>
                    </select>

                    {isCustomSuburb && (
                      <div className="mt-2">
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
                          className={`w-full text-xs sm:text-sm py-2 px-3 rounded-lg border ${
                            errors.customSuburb ? 'border-red-500 bg-red-50/20' : 'border-teal-400 bg-teal-50/20'
                          } focus:ring-2 focus:ring-teal-500 text-slate-900`}
                          autoFocus
                        />
                        {errors.customSuburb && (
                          <p className="text-red-500 text-xs mt-1">{errors.customSuburb}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full text-xs sm:text-sm py-2.5 px-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Carpet Steam Cleaning">Carpet Steam Cleaning (Residential / Commercial)</option>
                    <option value="Upholstery & Couch Cleaning">Upholstery & Couch Steam Cleaning</option>
                    <option value="Mattress Deep Sanitisation">Mattress Deep Thermal Sanitisation</option>
                    <option value="Blind Cleaning">Blind Cleaning (Roller / Venetian / Vertical)</option>
                    <option value="Rug Steam Cleaning">Rug Deep Steam Cleaning</option>
                    <option value="End of Lease Cleaning">End of Lease / Bond Guarantee Package</option>
                    <option value="Commercial Office Cleaning">Commercial Office / Venue Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    How can we help? (Number of rooms, stain details, preferred dates)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Need 3 bedrooms cleaned in Richmond on Friday for an end-of-lease inspection. There is one pet stain in the hallway."
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-teal-600/25 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry to Melbourne Dispatch</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
