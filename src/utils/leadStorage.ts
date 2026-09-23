// Steamora Client-Side Lead Storage & Dispatch Tracking
// Stores incoming quotes, bookings, and inquiries locally and manages dispatch notifications.

export interface LeadRecord {
  id: string;
  type: 'quote' | 'booking' | 'inquiry' | 'contact';
  name: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  details?: string;
  estimatedPrice?: string | number;
  timestamp: string;
  status: 'new' | 'contacted' | 'booked';
}

const STORAGE_KEY = 'steamora_submitted_leads';

export function saveLead(lead: Omit<LeadRecord, 'id' | 'timestamp' | 'status'>): LeadRecord {
  const newLead: LeadRecord = {
    ...lead,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    status: 'new'
  };

  try {
    const existing = getSavedLeads();
    const updated = [newLead, ...existing].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Trigger custom event so any open dispatch listeners can update live
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('steamora_lead_saved', { detail: newLead }));
    }
  } catch (err) {
    console.error('Error saving lead to local storage:', err);
  }

  return newLead;
}

export function getSavedLeads(): LeadRecord[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'booked'): void {
  try {
    const leads = getSavedLeads();
    const updated = leads.map(l => (l.id === id ? { ...l, status } : l));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('steamora_lead_saved'));
    }
  } catch (err) {
    console.error('Error updating lead status:', err);
  }
}

export function clearLeads(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('steamora_lead_saved'));
    }
  } catch (err) {
    console.error('Error clearing leads:', err);
  }
}
