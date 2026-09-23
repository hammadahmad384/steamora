import { useEffect } from 'react';
import { PageRoute } from '../types';
import { SERVICES } from '../data/servicesData';
import { MELBOURNE_SUBURBS } from '../data/suburbsData';
import { COMPANY_INFO } from '../data/config';
import { FAQS } from '../data/faqsData';

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalPath?: string;
  serviceData?: {
    name: string;
    price: number;
    priceFormatted: string;
    image: string;
  };
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
        description: `Professional cleaning services in Melbourne from STEAMORA Cleaning. Explore sofa, carpet, upholstery, mattress, blind and rug cleaning services. Request a free quote.`,
        keywords: 'steam cleaning melbourne, carpet steam cleaning, couch cleaning melbourne, upholstery cleaning melbourne, mattress sanitisation, blind cleaning, rug cleaning',
        ogTitle: `STEAMORA Cleaning | Professional Cleaning Services in Melbourne`,
        ogDescription: `Professional cleaning services in Melbourne from STEAMORA Cleaning. Explore sofa, carpet, upholstery, mattress, blind and rug cleaning services. Request a free quote.`,
        ogImage: '/images/carpet-cleaning.webp',
        canonicalPath: '/'
      };

    case 'about':
      return {
        title: `About Us${BRAND_SUFFIX}`,
        description: `Learn about STEAMORA's mission, industrial 210°F thermal extraction equipment, non-toxic eco solutions, and certified steam cleaning team servicing Greater Melbourne.`,
        keywords: 'about steamora, melbourne cleaning company, steam cleaning experts melbourne, professional cleaners melbourne',
        canonicalPath: '/about'
      };

    case 'services': {
      if (param) {
        const cleanParam = param.toLowerCase().trim();
        if (cleanParam === 'carpet-cleaning' || cleanParam === 'carpet') return getPageSeo('service-carpet');
        if (cleanParam === 'sofa-cleaning' || cleanParam === 'sofa' || cleanParam === 'couch-cleaning') return getPageSeo('service-sofa');
        if (cleanParam === 'upholstery-cleaning' || cleanParam === 'upholstery') return getPageSeo('service-upholstery');
        if (cleanParam === 'mattress-cleaning' || cleanParam === 'mattress') return getPageSeo('service-mattress');
        if (cleanParam === 'blind-cleaning' || cleanParam === 'blind') return getPageSeo('service-blind');
        if (cleanParam === 'rug-cleaning' || cleanParam === 'rug') return getPageSeo('service-rug');
      }
      return {
        title: `Steam Cleaning Services & Pricing${BRAND_SUFFIX}`,
        description: `Transparent Melbourne steam cleaning pricing: Carpet Steam Cleaning ($30–$35/room), Mattresses ($80–$100), Couch Cleaning ($25–$35/seat), Blinds ($25–$35), and Rugs ($80–$100).`,
        keywords: 'carpet cleaning prices melbourne, couch cleaning cost, mattress cleaning rates, steam cleaning services list',
        canonicalPath: '/services'
      };
    }

    case 'service-carpet':
      return {
        title: 'Carpet Steam Cleaning Melbourne | From $30 | STEAMORA Cleaning',
        description: 'Melbourne carpet steam cleaning from $30/room. 210°F industrial extraction, tough stain removal, fast drying, and 100% bond-back guarantee. Get a free quote!',
        keywords: 'carpet steam cleaning melbourne, professional carpet cleaning melbourne, steam cleaning carpets, end of lease carpet clean, bond back carpet cleaner',
        canonicalPath: '/carpet-cleaning',
        ogTitle: 'Carpet Steam Cleaning Melbourne | From $30 | STEAMORA Cleaning',
        ogDescription: 'Melbourne carpet steam cleaning from $30/room. 210°F industrial extraction, tough stain removal, fast drying, and 100% bond-back guarantee. Get a free quote!',
        ogImage: '/images/carpet-cleaning.webp',
        serviceData: {
          name: 'Carpet Steam Cleaning',
          price: 30,
          priceFormatted: '$30 - $35 Per Room',
          image: '/images/carpet-cleaning.webp'
        }
      };

    case 'service-sofa':
      return {
        title: 'Sofa & Couch Steam Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Professional sofa and couch steam cleaning in Melbourne from $25/seat. Gentle fabric care, deep stain removal, and rapid drying. Get a free instant quote!',
        keywords: 'sofa cleaning melbourne, couch steam cleaning melbourne, upholstery cleaning, lounge cleaning melbourne, professional sofa clean',
        canonicalPath: '/sofa-cleaning',
        ogTitle: 'Sofa & Couch Steam Cleaning Melbourne | STEAMORA Cleaning',
        ogDescription: 'Professional sofa and couch steam cleaning in Melbourne from $25/seat. Gentle fabric care, deep stain removal, and rapid drying. Get a free instant quote!',
        ogImage: '/images/couch-cleaning.webp',
        serviceData: {
          name: 'Sofa & Couch Steam Cleaning',
          price: 25,
          priceFormatted: '$25 - $35 Per Seat',
          image: '/images/couch-cleaning.webp'
        }
      };

    case 'service-upholstery':
      return {
        title: 'Upholstery Steam Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Expert upholstery cleaning in Melbourne for lounges, dining chairs, and armchairs from $25/seat. Gentle fiber sanitisation and stain removal. Book today!',
        keywords: 'upholstery cleaning melbourne, furniture steam cleaning, dining chair cleaning, armchair fabric cleaning, fabric steam clean melbourne',
        canonicalPath: '/upholstery-cleaning',
        ogTitle: 'Upholstery Steam Cleaning Melbourne | STEAMORA Cleaning',
        ogDescription: 'Expert upholstery cleaning in Melbourne for lounges, dining chairs, and armchairs from $25/seat. Gentle fiber sanitisation and stain removal. Book today!',
        ogImage: '/images/upholstery-cleaning.webp',
        serviceData: {
          name: 'Upholstery Cleaning',
          price: 25,
          priceFormatted: '$25 - $35 Per Seat',
          image: '/images/upholstery-cleaning.webp'
        }
      };

    case 'service-mattress':
      return {
        title: 'Mattress Steam Cleaning & Sanitisation Melbourne | STEAMORA',
        description: 'Hygienic mattress steam cleaning & sanitisation in Melbourne from $80. Eliminates 99.9% of dust mites, allergens, dead skin, and stains. Wake up refreshed!',
        keywords: 'mattress cleaning melbourne, mattress sanitisation melbourne, dust mite removal mattress, steam clean mattress melbourne, clean mattress',
        canonicalPath: '/mattress-cleaning',
        ogTitle: 'Mattress Steam Cleaning & Sanitisation Melbourne | STEAMORA',
        ogDescription: 'Hygienic mattress steam cleaning & sanitisation in Melbourne from $80. Eliminates 99.9% of dust mites, allergens, dead skin, and stains. Wake up refreshed!',
        ogImage: '/images/mattress-cleaning.webp',
        serviceData: {
          name: 'Mattress Sanitisation & Steam Cleaning',
          price: 80,
          priceFormatted: '$80 - $100',
          image: '/images/mattress-cleaning.webp'
        }
      };

    case 'service-blind':
      return {
        title: 'Blind Cleaning Melbourne | On-Site Service | STEAMORA Cleaning',
        description: 'Professional on-site blind cleaning in Melbourne from $25/unit. Clean roller, venetian, and vertical blinds without removal. Remove dust and allergens safely!',
        keywords: 'blind cleaning melbourne, roller blind cleaning, venetian blind cleaner, on site blind cleaning melbourne, vertical blind cleaning',
        canonicalPath: '/blind-cleaning',
        ogTitle: 'Blind Cleaning Melbourne | On-Site Service | STEAMORA Cleaning',
        ogDescription: 'Professional on-site blind cleaning in Melbourne from $25/unit. Clean roller, venetian, and vertical blinds without removal. Remove dust and allergens safely!',
        ogImage: '/images/blind-cleaning.webp',
        serviceData: {
          name: 'Blind Cleaning',
          price: 25,
          priceFormatted: '$25 - $35 Per Blind',
          image: '/images/blind-cleaning.webp'
        }
      };

    case 'service-rug':
      return {
        title: 'Rug Cleaning Melbourne | Persian, Wool & Area Rugs | STEAMORA',
        description: 'Specialist rug cleaning in Melbourne from $80. Gentle fiber care for Persian, oriental, wool, and modern area rugs. Color-safe stain removal. Instant quote!',
        keywords: 'rug cleaning melbourne, persian rug cleaning melbourne, oriental rug steam clean, wool rug cleaner melbourne, area rug cleaning',
        canonicalPath: '/rug-cleaning',
        ogTitle: 'Rug Cleaning Melbourne | Persian, Wool & Area Rugs | STEAMORA',
        ogDescription: 'Specialist rug cleaning in Melbourne from $80. Gentle fiber care for Persian, oriental, wool, and modern area rugs. Color-safe stain removal. Instant quote!',
        ogImage: 'https://steamoracleaning.com.au/images/rug-cleaning.webp',
        serviceData: {
          name: 'Rug Cleaning & Preservation',
          price: 80,
          priceFormatted: '$80 - $100',
          image: 'https://steamoracleaning.com.au/images/rug-cleaning.webp'
        }
      };
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
 * Helper to update or create a JSON-LD structured data script.
 */
export function setStructuredData(schema: object, id: string = 'schema-dynamic-jsonld') {
  if (typeof document === 'undefined') return;
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema, null, 2);
}

/**
 * Helper to remove a structured data script by ID.
 */
export function removeStructuredData(id: string) {
  if (typeof document === 'undefined') return;
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

/**
 * Generates Schema.org FAQPage JSON-LD structured data for search engine visibility.
 */
export const generateFaqSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

const generateBaseSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": "STEAMORA Cleaning",
    "image": `${BASE_URL}/android-chrome-512x512.png`,
    "url": BASE_URL,
    "telephone": COMPANY_INFO.phone,
    "email": COMPANY_INFO.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "120 Collins Street",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "postalCode": "3000",
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -37.8136,
      "longitude": 144.9631
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "07:00",
        "closes": "19:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": COMPANY_INFO.ratings.stars.toString(),
      "reviewCount": COMPANY_INFO.ratings.totalReviews.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };
};

const generateServiceSchema = (
  serviceName: string, 
  serviceUrl: string, 
  description: string,
  image?: string,
  price?: number,
  priceFormatted?: string
) => {
  const imageUrl = image 
    ? (image.startsWith('http') ? image : `${BASE_URL}${image}`)
    : `${BASE_URL}/android-chrome-512x512.png`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${serviceName} Melbourne`,
    "serviceType": serviceName,
    "url": serviceUrl,
    "description": description,
    "image": imageUrl,
    "provider": {
      "@type": "CleaningService",
      "name": "STEAMORA Cleaning",
      "url": BASE_URL,
      "telephone": COMPANY_INFO.phone,
      "email": COMPANY_INFO.email,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "120 Collins Street",
        "addressLocality": "Melbourne",
        "addressRegion": "VIC",
        "postalCode": "3000",
        "addressCountry": "AU"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Melbourne"
    },
    ...(price ? {
      "offers": {
        "@type": "Offer",
        "price": price.toString(),
        "priceCurrency": "AUD",
        "description": priceFormatted || `From $${price}`,
        "availability": "https://schema.org/InStock",
        "url": serviceUrl
      }
    } : {})
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
  setMetaTag('property', 'og:site_name', 'STEAMORA Cleaning');
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:locale', 'en_AU');
  setMetaTag('property', 'og:title', resolvedSeo.ogTitle || resolvedSeo.title);
  setMetaTag('property', 'og:description', resolvedSeo.ogDescription || resolvedSeo.description);

  if (resolvedSeo.canonicalPath) {
    const fullUrl = resolvedSeo.canonicalPath.startsWith('http') 
      ? resolvedSeo.canonicalPath 
      : `${BASE_URL}${resolvedSeo.canonicalPath}`;
    setMetaTag('property', 'og:url', fullUrl);
    setCanonicalUrl(resolvedSeo.canonicalPath);
  }

  const socialImage = resolvedSeo.ogImage 
    ? (resolvedSeo.ogImage.startsWith('http') ? resolvedSeo.ogImage : `${BASE_URL}${resolvedSeo.ogImage}`)
    : `${BASE_URL}/android-chrome-512x512.png`;
  setMetaTag('property', 'og:image', socialImage);

  // 5. Update Twitter Card Meta Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', resolvedSeo.ogTitle || resolvedSeo.title);
  setMetaTag('name', 'twitter:description', resolvedSeo.ogDescription || resolvedSeo.description);
  setMetaTag('name', 'twitter:image', socialImage);

  // 6. Update Structured Data
  if (route === 'faq') {
    setStructuredData(generateFaqSchema(), 'schema-faq-jsonld');
    removeStructuredData('schema-dynamic-jsonld');
  } else {
    removeStructuredData('schema-faq-jsonld');
    if (resolvedSeo.serviceData && resolvedSeo.canonicalPath) {
      const fullServiceUrl = `${BASE_URL}${resolvedSeo.canonicalPath}`;
      setStructuredData(
        generateServiceSchema(
          resolvedSeo.serviceData.name,
          fullServiceUrl,
          resolvedSeo.description,
          resolvedSeo.serviceData.image,
          resolvedSeo.serviceData.price,
          resolvedSeo.serviceData.priceFormatted
        )
      );
    } else if (
      resolvedSeo.canonicalPath && 
      resolvedSeo.canonicalPath !== '/' && 
      !resolvedSeo.canonicalPath.includes('suburbs') && 
      !resolvedSeo.canonicalPath.includes('service-areas')
    ) {
      const serviceName = resolvedSeo.title.split('|')[0].trim();
      setStructuredData(
        generateServiceSchema(
          serviceName,
          `${BASE_URL}${resolvedSeo.canonicalPath}`,
          resolvedSeo.description,
          resolvedSeo.ogImage
        )
      );
    } else {
      setStructuredData(generateBaseSchema());
    }
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
