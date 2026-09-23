import React, { useState, useEffect } from 'react';
import { 
  X, 
  Inbox, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Download, 
  ExternalLink,
  Shield,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { getSavedLeads, updateLeadStatus, clearLeads, LeadRecord } from '../../utils/leadStorage';
import { COMPANY_INFO } from '../../data/config';

interface OwnerLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OwnerLeadsModal({ isOpen, onClose }: OwnerLeadsModalProps) {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'guide'>('leads');

  const refreshLeads = () => {
    setLeads(getSavedLeads());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
    }

    const handler = () => {
      refreshLeads();
    };

    window.addEventListener('steamora_lead_saved', handler);
    return () => window.removeEventListener('steamora_lead_saved', handler);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Type', 'Date', 'Name', 'Phone', 'Email', 'Suburb', 'Service', 'Price', 'Status', 'Details'];
    const rows = leads.map(l => [
      l.id,
      l.type,
      new Date(l.timestamp).toLocaleString(),
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.suburb}"`,
      `"${l.service}"`,
      `"${l.estimatedPrice || ''}"`,
      l.status,
      `"${(l.details || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `steamora-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all recorded leads from this browser?')) {
      clearLeads();
      setLeads([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl my-auto overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-slate-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">Owner Dispatch & Leads Portal</h3>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 font-extrabold px-2 py-0.5 rounded-full border border-teal-500/30">
                  {leads.length} Leads
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Steamora Melbourne • Live incoming quotes, inquiries, and customer bookings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'leads' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Incoming Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'guide' 
                  ? 'bg-slate-900 text-white' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How Notifications Work</span>
            </button>
          </div>

          {activeTab === 'leads' && leads.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 flex items-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleClear}
                className="px-2.5 py-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'guide' ? (
            <div className="space-y-6 text-sm text-slate-700 max-w-2xl mx-auto">
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl">
                <h4 className="font-bold text-teal-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  How the Steamora Owner Gets Notified When Someone Submits a Quote
                </h4>
                <p className="text-xs text-teal-800 mt-1.5 leading-relaxed">
                  When a customer fills out any quote, booking, or enquiry on Steamora, multiple notification channels work together so you never miss a job.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">1</span>
                    <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                    <span>Instant WhatsApp Notification (Direct to Phone)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When customers submit their quote or enquiry, a pre-formatted message with their Name, Phone, Suburb, Service, and Estimated Price is prepared directly for your business WhatsApp line (<strong className="text-slate-900">{COMPANY_INFO.whatsapp.display}</strong>). One tap opens the chat directly so you can respond within seconds.
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs">2</span>
                    <Mail className="w-4 h-4 text-teal-600" />
                    <span>Direct Email Dispatch ({COMPANY_INFO.email})</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every quote and booking provides a 1-click email dispatch directly to <strong className="text-slate-900">{COMPANY_INFO.email}</strong> with structured timestamps and line-item details.
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">3</span>
                    <Inbox className="w-4 h-4 text-blue-600" />
                    <span>Website Leads Storage (This Portal)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every quote, booking, and contact submission on this browser is automatically captured in this Dispatch Portal. You can view contact numbers, mark leads as Contacted or Booked, and export them to a CSV spreadsheet anytime.
                  </p>
                </div>

                <div className="p-4 border border-teal-200 rounded-2xl bg-teal-50/50">
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs">4</span>
                    <Shield className="w-4 h-4 text-teal-600" />
                    <span>Automatic Background Email Dispatch (Active)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Whenever any visitor submits a Free Quote, Booking, or Inquiry form, a background dispatch request is immediately triggered to deliver the customer's contact details, suburb, service, and estimated price directly to <strong className="text-slate-900">{COMPANY_INFO.email}</strong>.
                  </p>
                </div>
              </div>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Inbox className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">No Leads Submitted Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                When a customer submits a quote, booking, or inquiry on the website, it will appear here in real-time with full customer contact information.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {leads.map((lead) => {
                const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
                const waUrl = `https://wa.me/${cleanPhone.startsWith('0') ? '61' + cleanPhone.substring(1) : cleanPhone}?text=${encodeURIComponent(
                  `Hi ${lead.name}, this is Steamora Melbourne following up on your ${lead.service} request for ${lead.suburb}.`
                )}`;

                return (
                  <div 
                    key={lead.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-500/40 transition-all shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                          lead.type === 'booking' 
                            ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                            : lead.type === 'quote'
                            ? 'bg-teal-100 text-teal-700 border border-teal-200'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                          {lead.type}
                        </span>
                        <h4 className="font-extrabold text-slate-900 text-base">{lead.name}</h4>
                        <span className="text-xs text-slate-500 font-medium">({lead.suburb})</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(lead.timestamp).toLocaleDateString()} {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                            lead.status === 'booked' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                              : lead.status === 'contacted'
                              ? 'bg-amber-50 text-amber-700 border-amber-300'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="booked">Booked</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 text-[11px]">Phone:</span>
                        <p className="font-bold text-slate-900">{lead.phone}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[11px]">Email:</span>
                        <p className="font-bold text-slate-900 truncate">{lead.email || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[11px]">Service:</span>
                        <p className="font-bold text-slate-900 capitalize">{lead.service.replace(/-/g, ' ')}</p>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[11px]">Estimate / Total:</span>
                        <p className="font-bold text-teal-600">{lead.estimatedPrice ? `$${lead.estimatedPrice} AUD` : 'To Quote'}</p>
                      </div>
                    </div>

                    {lead.details && (
                      <div className="text-xs bg-slate-50 p-2.5 rounded-xl text-slate-600 border border-slate-100">
                        <span className="font-semibold text-slate-700">Details: </span>
                        {lead.details}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <a
                        href={`tel:${lead.phone}`}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        <span>Call Customer</span>
                      </a>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}?subject=${encodeURIComponent(`Steamora Steam Cleaning Quote - ${lead.name}`)}`}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>Send Email</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Steamora Mobile Cleaning Dispatch • Melbourne, VIC</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
