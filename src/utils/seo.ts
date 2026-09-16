import { useEffect } from 'react';
import { PageRoute } from '../types';
import { SERVICES } from '../data/servicesData';
import { MELBOURNE_SUBURBS } from '../data/suburbsData';
import { COMPANY_INFO } from '../data/config';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalPath?: string;
}

const BASE_URL = 'https://steamoracleaning.com.au';
const BRAND_SUFFIX = ' | STEAMORA Cleaning';

/**
 * Resolves SEO metadata (title, description, OG tags) dynamically based on the current page route and parameters.
 */
export function getPageSeo(route: PageRoute, param?: string): PageSeoConfig {
  switch (route) {
    case 'home':
      return {
        title: `STEAMORA Cleaning | Professional Cleaning Services in Melbourne`,
        description: `Professional cleaning services in Melbourne from STEAMORA Cleaning. Explore sofa, carpet, upholstery, mattress and blind cleaning services. Request a free quote.`,
        keywords: 'steam cleaning melbourne, carpet steam cleaning, couch cleaning melbourne, mattress sanitisation, end of lease carpet cleaning',
        canonicalPath: '/'
      };

    case 'about':
      return {
        title: `About Us${BRAND_SUFFIX}`,
        description: `Learn about STEAMORA's mission, industrial 210°F thermal extraction equipment, non-toxic eco solutions, and certified steam cleaning team servicing Greater Melbourne.`,
        keywords: 'about steamora, melbourne cleaning company, steam cleaning experts melbourne, professional cleaners melbourne',
        canonicalPath: '/about'
      };

    case 'services':
      return {
        title: `Steam Cleaning Services & Pricing${BRAND_SUFFIX}`,
        description: `Transparent Melbourne steam cleaning pricing: Carpet Steam Cleaning ($30–$35/room), Mattresses ($80–$100), Couch Cleaning ($25–$35/seat), Blinds ($25–$35), and Rugs ($80–$100).`,
        keywords: 'carpet cleaning prices melbourne, couch cleaning cost, mattress cleaning rates, steam cleaning services list',
        canonicalPath: '/services'
      };


    case 'service-carpet':
      return {
        title: 'Carpet Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Professional carpet cleaning in Melbourne from STEAMORA Cleaning. Refresh carpets and remove built-up dirt and stains. Request a free quote.',
        keywords: 'carpet cleaning melbourne, professional carpet cleaning, steam cleaning carpets',
        canonicalPath: '/carpet-cleaning'
      };
    case 'service-sofa':
      return {
        title: 'Sofa Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Professional sofa cleaning in Melbourne. Refresh your sofa and couch with professional cleaning from STEAMORA Cleaning. Request a free quote.',
        keywords: 'sofa cleaning melbourne, couch cleaning melbourne, upholstery cleaning, professional sofa clean',
        canonicalPath: '/sofa-cleaning'
      };
    case 'service-mattress':
      return {
        title: 'Mattress Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Professional mattress cleaning in Melbourne from STEAMORA Cleaning. Refresh your mattress with professional cleaning. Request a free quote.',
        keywords: 'mattress cleaning melbourne, professional mattress cleaning, clean mattress',
        canonicalPath: '/mattress-cleaning'
      };
    case 'service-upholstery':
      return {
        title: 'Upholstery Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Professional upholstery cleaning in Melbourne from STEAMORA Cleaning. Refresh upholstered furniture with professional cleaning. Request a free quote.',
        keywords: 'upholstery cleaning melbourne, fabric cleaning, professional upholstery cleaners',
        canonicalPath: '/upholstery-cleaning'
      };
    case 'service-blind':
      return {
        title: 'Blind Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Professional blind cleaning in Melbourne from STEAMORA Cleaning. Remove accumulated dust and dirt and refresh your blinds. Request a free quote.',
        keywords: 'blind cleaning melbourne, window blind cleaners, professional blind cleaning',
        canonicalPath: '/blind-cleaning'
      };
    case 'service-rug': {
      const targetSlug = 'rug-cleaning';
      const service = SERVICES.find(s => s.id === targetSlug) || SERVICES[0];
      return {
        title: `${service.title} Melbourne | STEAMORA Cleaning`,
        description: `Professional ${service.shortTitle.toLowerCase()} in Melbourne. ${service.tagline}. Request a free quote.`,
        keywords: `${service.shortTitle.toLowerCase()} melbourne, ${service.title.toLowerCase()}, steam clean ${service.shortTitle.toLowerCase()}`,
        canonicalPath: `/rug-cleaning`
      };
    }
    case 'service-areas':
      return {
        title: `Service Areas Across Greater Melbourne${BRAND_SUFFIX}`,
        description: `STEAMORA services 45+ suburbs across Melbourne CBD, Inner South, Inner East, West, and North. Fast dispatch, zero travel surcharges, same-day service available.`,
        keywords: 'steam cleaning service areas, carpet cleaning suburbs melbourne, local steam cleaner melbourne',
        canonicalPath: '/service-areas'
      };

    case 'suburb-detail': {
      const targetSlug = (param || '').toLowerCase().trim();
      const suburb = MELBOURNE_SUBURBS.find(s => 
        s.slug === targetSlug || 
        s.slug.endsWith(`-${targetSlug}`) ||
        s.slug.replace('carpet-cleaning-', '') === targetSlug ||
        s.name.toLowerCase() === targetSlug.replace(/-/g, ' ')
      ) || MELBOURNE_SUBURBS[0];

      return {
        title: `Carpet & Steam Cleaning ${suburb.name} (VIC ${suburb.postcode})${BRAND_SUFFIX}`,
        description: `Top-rated steam cleaning in ${suburb.name} (${suburb.postcode}) and ${suburb.region}. ${suburb.shortDescription || `Specialist carpet, couch, mattress, and rug cleaning.`} 100% bond-back guarantee.`,
        keywords: `carpet cleaning ${suburb.name.toLowerCase()}, steam cleaning ${suburb.name.toLowerCase()}, bond cleaning ${suburb.postcode}, ${suburb.name.toLowerCase()} couch cleaning`,
        canonicalPath: `/suburbs/${suburb.slug}`
      };
    }

    case 'reviews':
      return {
        title: `Verified Customer Reviews (4.9★)${BRAND_SUFFIX}`,
        description: `Read verified 5-star reviews from ${COMPANY_INFO.ratings.totalReviews}+ Melbourne homeowners, renters, and commercial property managers who trust STEAMORA.`,
        keywords: 'steamora reviews, melbourne carpet cleaning reviews, customer testimonials steam cleaning',
        canonicalPath: '/reviews'
      };

    case 'faq':
      return {
        title: `Frequently Asked Questions${BRAND_SUFFIX}`,
        description: `Find answers to common questions about steam cleaning drying times, carpet stain removal, upholstery care, end-of-lease bond requirements, and pricing.`,
        keywords: 'steam cleaning faq, carpet drying time, how long does couch cleaning take, bond back carpet clean rules',
        canonicalPath: '/faq'
      };

    case 'book-online':
      return {
        title: `Book Steam Cleaning Online | Fast Instant Booking${BRAND_SUFFIX}`,
        description: `Book your Melbourne steam cleaning appointment online in under 2 minutes. Instant upfront pricing, flexible time slots, no credit card required to schedule.`,
        keywords: 'book steam cleaner online, instant carpet cleaning booking, schedule couch cleaning melbourne',
        canonicalPath: '/book-online'
      };

    case 'contact':
      return {
        title: `Contact Us | Phone ${COMPANY_INFO.phone}${BRAND_SUFFIX}`,
        description: `Contact STEAMORA Melbourne. Call ${COMPANY_INFO.phone}, message our team on WhatsApp, or send an enquiry. Available 7 days for residential & emergency steam cleaning.`,
        keywords: 'contact steamora, steam cleaning phone number, melbourne cleaners contact, steam cleaning quotes',
        canonicalPath: '/contact'
      };

    case 'quote':
      return {
        title: `Instant Steam Cleaning Quote Calculator${BRAND_SUFFIX}`,
        description: `Get a transparent, real-time steam cleaning price estimate for your Melbourne home or apartment. Free, instant quote with no obligation.`,
        keywords: 'steam cleaning quote, carpet cleaning price calculator, instant quote steam cleaning melbourne',
        canonicalPath: '/quote'
      };

    case 'inquiry':
      return {
        title: `Customer Instant Inquiry | Direct WhatsApp & Email${BRAND_SUFFIX}`,
        description: `Submit your steam cleaning inquiry directly to STEAMORA Melbourne. Instant dispatch via WhatsApp and email (${COMPANY_INFO.email}). Same-day response guaranteed.`,
        keywords: 'steam cleaning inquiry, steamora customer inquiry, carpet cleaning quote melbourne, whatsapp steam cleaner',
        canonicalPath: '/inquiry'
      };

    case 'google-ads-landing':
      return {
        title: `Melbourne Steam Cleaning Specials | Same-Day Service${BRAND_SUFFIX}`,
        description: `Exclusive steam cleaning deals in Greater Melbourne. Carpets from $30/room, couches from $25/seat. Hospital-grade sanitisation & rapid drying. Book now!`,
        keywords: 'carpet cleaning specials melbourne, discount steam cleaning, same day carpet clean',
        canonicalPath: '/special-offer'
      };

    default:
      return {
        title: `STEAMORA | Premium Steam Cleaning Melbourne`,
        description: `Melbourne's premier steam cleaning service for carpets, couches, mattresses, blinds, and rugs. Fresh Spaces. Elevated Living.`,
        canonicalPath: '/'
      };
  }
}

/**
 * Helper to update or create a <meta> element in <head>.
 */
function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create the canonical <link> element in <head>.
 */
function setCanonicalUrl(canonicalPath: string) {
  if (typeof document === 'undefined') return;

  const url = canonicalPath.startsWith('http') ? canonicalPath : `${BASE_URL}${canonicalPath}`;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}


/**
 * Helper to update or create the JSON-LD structured data script.
 */
function setStructuredData(schema: object) {
  if (typeof document === 'undefined') return;
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

const generateBaseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "STEAMORA Cleaning",
    "image": "https://steamoracleaning.com.au/android-chrome-512x512.png",
    "url": "https://steamoracleaning.com.au",
    "telephone": "0426 000 000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU"
    }
  };
};

const generateServiceSchema = (serviceName: string, serviceUrl: string, description: string) => {
  const base = generateBaseSchema();
  return {
    ...base,
    "service": {
      "@type": "Service",
      "serviceType": serviceName,
      "url": serviceUrl,
      "description": description,
      "provider": {
        "@type": "LocalBusiness",
        "name": "STEAMORA Cleaning"
      }
    }
  };
};

/**
 * Dynamically updates the document title, meta description, Open Graph, and Twitter SEO tags
 * based on the current page route and parameters.
 *
 * @param route Current page route
 * @param param Optional route parameter (e.g. suburb slug or service slug)
 * @param overrides Optional custom overrides for title, description, etc.
 * @returns The resolved SEO configuration
 */
export function updatePageSeo(
  route: PageRoute, 
  param?: string, 
  overrides?: Partial<PageSeoConfig>
): PageSeoConfig {
  if (typeof document === 'undefined') {
    return { title: '', description: '' };
  }

  const baseSeo = getPageSeo(route, param);
  const resolvedSeo: PageSeoConfig = {
    ...baseSeo,
    ...overrides
  };

  // 1. Update Document Title
  document.title = resolvedSeo.title;

  // 2. Update Meta Description
  setMetaTag('name', 'description', resolvedSeo.description);

  // 3. Update Keywords (if available)
  if (resolvedSeo.keywords) {
    setMetaTag('name', 'keywords', resolvedSeo.keywords);
  }

  // 4. Update Open Graph Meta Tags
  setMetaTag('property', 'og:title', resolvedSeo.ogTitle || resolvedSeo.title);
  setMetaTag('property', 'og:description', resolvedSeo.ogDescription || resolvedSeo.description);
  if (resolvedSeo.canonicalPath) {
    const fullUrl = resolvedSeo.canonicalPath.startsWith('http') 
      ? resolvedSeo.canonicalPath 
      : `${BASE_URL}${resolvedSeo.canonicalPath}`;
    setMetaTag('property', 'og:url', fullUrl);
    setCanonicalUrl(resolvedSeo.canonicalPath);
  }

  // 5. Update Twitter Card Meta Tags
  setMetaTag('name', 'twitter:title', resolvedSeo.ogTitle || resolvedSeo.title);
  setMetaTag('name', 'twitter:description', resolvedSeo.ogDescription || resolvedSeo.description);

  // 6. Update Structured Data
  if (resolvedSeo.canonicalPath && resolvedSeo.canonicalPath !== '/' && !resolvedSeo.canonicalPath.includes('suburbs') && !resolvedSeo.canonicalPath.includes('service-areas')) {
     const serviceName = resolvedSeo.title.split('|')[0].trim();
     setStructuredData(generateServiceSchema(serviceName, `https://steamoracleaning.com.au${resolvedSeo.canonicalPath}`, resolvedSeo.description));
  } else {
     setStructuredData(generateBaseSchema());
  }


  return resolvedSeo;
}

/**
 * React hook to automatically synchronize document SEO tags whenever route or parameters change.
 */
export function usePageSeo(
  route: PageRoute, 
  param?: string, 
  overrides?: Partial<PageSeoConfig>
) {
  useEffect(() => {
    updatePageSeo(route, param, overrides);
  }, [route, param, overrides?.title, overrides?.description]);
}
