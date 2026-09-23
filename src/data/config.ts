export const COMPANY_INFO = {
  name: 'STEAMORA',
  legalName: 'Steamora Cleaning Services Pty Ltd',
  tagline: 'Fresh Spaces. Elevated Living.',
  subtagline: 'Premium Residential & Commercial Steam Cleaning Across Greater Melbourne',
  abn: '74 619 824 501',
  phone: '0449 993 786',
  phoneDisplay: '+61 449 993 786',
  phoneTel: '+61449993786',
  mobilePhone: '0449 993 786',
  mobileTel: '+61449993786',
  email: 'steamoracleaning@gmail.com',
  bookingsEmail: 'steamoracleaning@gmail.com',
  address: 'Level 14, 120 Collins Street, Melbourne VIC 3000',
  city: 'Melbourne',
  state: 'Victoria',
  country: 'Australia',
  hours: {
    weekdays: '7:00 AM – 7:00 PM',
    saturday: '8:00 AM – 6:00 PM',
    sunday: '8:30 AM – 5:00 PM',
    emergency: '24/7 Emergency Water Extraction Available'
  },
  whatsapp: {
    number: '+61449993786',
    display: '+61 449 993 786',
    defaultMessage: encodeURIComponent("Hi Steamora! I'm interested in getting a quote for steam cleaning in Melbourne.")
  },
  social: {
    facebook: 'https://facebook.com/steamoramelbourne',
    instagram: 'https://instagram.com/steamora_au',
    linkedin: 'https://linkedin.com/company/steamora',
    googleReviewUrl: 'https://g.page/r/steamora-melbourne/review'
  },
  ratings: {
    stars: 4.9,
    totalReviews: 384,
    googleRating: '4.9 / 5.0'
  },
  coverageRadius: 'Servicing Greater Melbourne within 45km of CBD',
  warranty: '100% Satisfaction Guarantee — Free Re-clean if Not Delighted'
};

// Event tracking helper for GA4, Google Ads, GTM, Meta Pixel
export type AnalyticsEventType = 
  | 'phone_call_click'
  | 'quote_form_submit'
  | 'inquiry_submit'
  | 'booking_submit'
  | 'whatsapp_click'
  | 'view_service'
  | 'calculator_used'
  | 'modal_open';

export interface TrackingEvent {
  id: string;
  type: AnalyticsEventType;
  label: string;
  value?: number;
  timestamp: string;
}

let eventSubscribers: ((event: TrackingEvent) => void)[] = [];

export function trackConversion(type: AnalyticsEventType, label: string, value?: number) {
  const event: TrackingEvent = {
    id: 'evt_' + Math.random().toString(36).substring(2, 9),
    type,
    label,
    value,
    timestamp: new Date().toLocaleTimeString()
  };

  // Push to dataLayer if available (GTM / GA4 standard)
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: type,
      event_label: label,
      value: value || 0,
      timestamp: new Date().toISOString()
    });
    console.log('[STEAMORA GA4/GTM TRACKED]', event);
  }

  // Notify active listeners (e.g. for user toast feedback)
  eventSubscribers.forEach(cb => cb(event));
  return event;
}

export function subscribeToAnalytics(callback: (event: TrackingEvent) => void) {
  eventSubscribers.push(callback);
  return () => {
    eventSubscribers = eventSubscribers.filter(cb => cb !== callback);
  };
}
