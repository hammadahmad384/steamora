export type ServiceId = 
  | 'carpet-cleaning'
  | 'couch-cleaning'
  | 'mattress-cleaning'
  | 'blind-cleaning'
  | 'rug-cleaning';

export interface ServiceDetail {
  id: ServiceId;
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  heroDescription: string;
  icon: string;
  startingPrice: string;
  badge?: string;
  bannerImage: string;
  beforeImage: string;
  afterImage: string;
  overview: string;
  features: string[];
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  pricingTiers: {
    name: string;
    price: string;
    popular?: boolean;
    description: string;
    items: string[];
  }[];
}

export interface SuburbLocation {
  slug: string;
  name: string;
  postcode: string;
  region: string;
  landmark: string;
  distanceFromCbd: string;
  shortDescription: string;
  fullDescription: string;
  housingProfile: string;
  keyServices: string[];
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  suburb: string;
  rating: number;
  date: string;
  service: string;
  verified: boolean;
  content: string;
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  category: 'General' | 'Carpet' | 'Upholstery' | 'Pricing' | 'Commercial';
  question: string;
  answer: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  suburb: string;
  service: ServiceId | 'other';
  propertyType: 'house' | 'apartment' | 'office' | 'commercial' | 'townhouse';
  roomsCount: number;
  hasStains: boolean;
  hasPetOdour: boolean;
  preferredDate: string;
  notes: string;
}

export interface BookingFormData {
  service: ServiceId;
  propertyType: 'house' | 'apartment' | 'office' | 'commercial';
  roomsCount: number;
  sofasCount?: number;
  mattressesCount?: number;
  tileAreaSqm?: number;
  extras: {
    petOdourTreatment: boolean;
    scotchgardStainShield: boolean;
    deepSanitization: boolean;
    antiAllergenTreatment: boolean;
  };
  suburb: string;
  streetAddress: string;
  parkingAvailable: 'street' | 'driveway' | 'visitor' | 'none';
  liftAccess: boolean;
  preferredDate: string;
  preferredTimeSlot: 'morning' | 'midday' | 'afternoon';
  fullName: string;
  email: string;
  phone: string;
  specialInstructions: string;
}

export interface CustomerInquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredTime: string;
  area: string;
  message: string;
}

export type PageRoute = 
  | 'home'
  | 'about'
  | 'services'
  | 'service-carpet'
  | 'service-couch'
  | 'service-mattress'
  | 'service-blind'
  | 'service-rug'
  | 'service-areas'
  | 'suburb-detail'
  | 'reviews'
  | 'faq'
  | 'quote'
  | 'inquiry'
  | 'book-online'
  | 'contact'
  | 'google-ads-landing';
