import re

with open('src/utils/seo.ts', 'r') as f:
    content = f.read()

helper = """
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
    "image": "https://steamoracleaning.com.au/images/carpet-cleaning.webp",
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
"""

content = content.replace("/**\n * Dynamically updates", helper + "\n/**\n * Dynamically updates")

# Inject into updatePageSeo
inject_schema = """  // 5. Update Twitter Card Meta Tags
  setMetaTag('name', 'twitter:title', resolvedSeo.ogTitle || resolvedSeo.title);
  setMetaTag('name', 'twitter:description', resolvedSeo.ogDescription || resolvedSeo.description);

  // 6. Update Structured Data
  if (resolvedSeo.canonicalPath && resolvedSeo.canonicalPath !== '/' && !resolvedSeo.canonicalPath.includes('suburbs') && !resolvedSeo.canonicalPath.includes('service-areas')) {
     const serviceName = resolvedSeo.title.split('|')[0].trim();
     setStructuredData(generateServiceSchema(serviceName, `https://steamoracleaning.com.au${resolvedSeo.canonicalPath}`, resolvedSeo.description));
  } else {
     setStructuredData(generateBaseSchema());
  }
"""

content = content.replace("  // 5. Update Twitter Card Meta Tags\n  setMetaTag('name', 'twitter:title', resolvedSeo.ogTitle || resolvedSeo.title);\n  setMetaTag('name', 'twitter:description', resolvedSeo.ogDescription || resolvedSeo.description);", inject_schema)

with open('src/utils/seo.ts', 'w') as f:
    f.write(content)
