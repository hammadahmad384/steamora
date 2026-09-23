// Steamora Automatic Email Dispatch Utility
// Automatically delivers incoming quotes, inquiries, and bookings straight to steamoracleaning@gmail.com

import { COMPANY_INFO } from '../data/config';

export interface EmailQuotePayload {
  name: string;
  phone: string;
  email?: string;
  suburb: string;
  service: string;
  estimatedPrice?: string | number;
  details?: string;
  propertyType?: string;
  roomsCount?: number;
  hasStains?: boolean;
  hasPetOdour?: boolean;
  preferredDate?: string;
  preferredTime?: string;
  source?: string;
}

const TARGET_EMAIL = COMPANY_INFO.email; // steamoracleaning@gmail.com

/**
 * Sends quote details directly to steamoracleaning@gmail.com in the background.
 * Uses FormSubmit AJAX API with table formatting and no captcha requirement.
 */
export async function dispatchQuoteToOwnerEmail(data: EmailQuotePayload): Promise<{ success: boolean; message: string }> {
  try {
    const formattedDate = new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Melbourne',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const payload = {
      _subject: `🔔 New STEAMORA Free Quote: ${data.name} (${data.suburb}) - ${data.service}`,
      _replyto: data.email || undefined,
      _template: 'table',
      _captcha: 'false',
      _autoresponse: data.email 
        ? `Thank you for requesting a steam cleaning quote with Steamora Melbourne! Our dispatch team has received your request for ${data.service} in ${data.suburb}. A specialist will review your details and be in touch shortly. For urgent inquiries, call or WhatsApp us on ${COMPANY_INFO.phone}.`
        : undefined,
      'Customer Name': data.name,
      'Contact Phone': data.phone,
      'Customer Email': data.email || 'Not provided',
      'Melbourne Suburb': data.suburb,
      'Requested Service': data.service,
      'Estimated Price Range': data.estimatedPrice ? `$${data.estimatedPrice} AUD` : 'To be confirmed',
      'Property Type': data.propertyType || 'Residential',
      'Number of Rooms / Areas': data.roomsCount !== undefined ? data.roomsCount : 'N/A',
      'Stains / Spot Treatment': data.hasStains ? 'Yes - targeted stain treatment requested' : 'No',
      'Pet Odour / Sanitisation': data.hasPetOdour ? 'Yes - pet odour & anti-microbial requested' : 'No',
      'Preferred Schedule': data.preferredDate ? `${data.preferredDate} (${data.preferredTime || 'Anytime'})` : (data.preferredTime || 'Flexible / ASAP'),
      'Customer Notes / Instructions': data.details || 'None provided',
      'Submission Source': data.source || 'Steamora Free Quote Calculator',
      'Timestamp (Melbourne VIC)': formattedDate
    };

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TARGET_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { success: true, message: `Dispatched to ${TARGET_EMAIL}` };
    } else {
      console.warn('FormSubmit returned non-ok status, falling back gracefully:', response.status);
      return { success: false, message: 'Non-ok response from email service' };
    }
  } catch (error) {
    console.error('Email dispatch error (handled):', error);
    return { success: false, message: 'Network error or ad-blocker prevented email dispatch' };
  }
}
