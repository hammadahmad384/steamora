import re

with open('src/utils/seo.ts', 'r') as f:
    content = f.read()

replacement = """
    case 'service-carpet':
      return {
        title: 'Carpet Cleaning Melbourne | STEAMORA Cleaning',
        description: 'Professional carpet cleaning in Melbourne from STEAMORA Cleaning. Refresh carpets and remove built-up dirt and stains. Request a free quote.',
        keywords: 'carpet cleaning melbourne, professional carpet cleaning, steam cleaning carpets',
        canonicalPath: '/carpet-cleaning'
      };
    case 'service-sofa':
    case 'service-couch':
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
"""

content = re.sub(r"    case 'service-carpet':[\s\S]*?case 'service-areas':", replacement + "    case 'service-areas':", content)

with open('src/utils/seo.ts', 'w') as f:
    f.write(content)
