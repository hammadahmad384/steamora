import { ServiceDetail } from '../types';

export const SERVICES: ServiceDetail[] = [
  {
    id: 'carpet-cleaning',
    title: 'Carpet Steam Cleaning',
    shortTitle: 'Carpet Cleaning',
    slug: 'carpet-cleaning',
    tagline: 'Deep thermal extraction for revitalised carpets',
    heroDescription: 'Restore the texture, vibrant color, and hygienic freshness of your carpets. Our industrial hot-water extraction lifts stubborn dirt safely.',
    icon: 'Sparkles',
    startingPrice: '$30 - $35 Per Room',
    badge: 'Most Popular',
    bannerImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    overview: 'Our carpet cleaning service employs high-temperature steam extraction that penetrates deep into carpet piles, sanitising fibers and eliminating bacteria without any additional chemical treatments.',
    features: [
      'Industrial hot-water extraction',
      'Safe on all carpet types',
      'Rapid dry formulation',
      'End-of-lease receipt provided'
    ],
    processSteps: [
      { step: 1, title: 'Pre-Inspection', description: 'We inspect the carpet to determine the best approach.' },
      { step: 2, title: 'Pre-Vacuuming', description: 'Dry vacuuming removes dry dirt.' },
      { step: 3, title: 'Steam Cleaning', description: 'Pressurized steam flushes out dirt and grime.' }
    ],
    benefits: [
      { title: 'Extends Carpet Longevity', description: 'Removing abrasive sand and soil prevents premature wear.' },
      { title: '100% Bond Back Guarantee', description: 'We provide real estate compliant receipts.' }
    ],
    faq: [
      { question: 'How long do carpets take to dry?', answer: 'Typically 2 to 4 hours.' }
    ],
    pricingTiers: [
      {
        name: 'Standard Room',
        price: '$30 - $35',
        description: 'Pricing per standard room size.',
        items: ['Deep Steam Cleaning', 'Standard Stain Removal', 'Basic Deodorising']
      }
    ]
  },
  {
    id: 'mattress-cleaning',
    title: 'Mattress Sanitisation',
    shortTitle: 'Mattress Cleaning',
    slug: 'mattress-cleaning',
    tagline: 'Sleep better with a completely sanitised mattress',
    heroDescription: 'We remove dust mites, dead skin cells, and allergens from your mattress, ensuring a hygienic and healthy sleep environment.',
    icon: 'Bed',
    startingPrice: '$80 - $100',
    badge: 'Hygienic',
    bannerImage: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    overview: 'Mattresses harbor millions of dust mites and allergens. Our deep extraction method purifies your mattress completely.',
    features: [
      'Deep dust mite removal',
      'Allergen reduction',
      'Safe, non-toxic process'
    ],
    processSteps: [
      { step: 1, title: 'Inspection', description: 'Checking the mattress condition.' },
      { step: 2, title: 'Extraction', description: 'Deep vacuuming and steam cleaning.' },
      { step: 3, title: 'Drying', description: 'High-speed air drying.' }
    ],
    benefits: [
      { title: 'Better Sleep', description: 'Breathe easier with a clean mattress.' },
      { title: 'Removes Allergens', description: 'Say goodbye to dust mites.' }
    ],
    faq: [
      { question: 'How soon can I sleep on it?', answer: 'Usually within 4-6 hours.' }
    ],
    pricingTiers: [
      {
        name: 'Mattress Clean',
        price: '$80 - $100',
        description: 'Comprehensive mattress cleaning.',
        items: ['Deep Steam Extraction', 'Dust Mite Removal']
      }
    ]
  },
  {
    id: 'couch-cleaning',
    title: 'Couch Cleaning',
    shortTitle: 'Couch Cleaning',
    slug: 'couch-cleaning',
    tagline: 'Revitalize your couch and sofas',
    heroDescription: 'Safely lift dirt, body oils, and food spills from your couch. We restore vibrant texture without fabric shrinkage.',
    icon: 'Armchair',
    startingPrice: '$25 - $35 Per Seat',
    badge: 'Fabric Safe',
    bannerImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
    overview: 'Using gentle moisture-controlled extraction, our specialists treat delicate linens, cotton blends, and synthetic couches.',
    features: [
      'Low-moisture hand tool extraction',
      'Safe on most fabrics',
      'Removes daily dirt and grime'
    ],
    processSteps: [
      { step: 1, title: 'Fabric Test', description: 'We check the fabric type to ensure safe cleaning.' },
      { step: 2, title: 'Cleaning', description: 'Gentle steam extraction.' }
    ],
    benefits: [
      { title: 'Looks Like New', description: 'Restores the original color and feel.' }
    ],
    faq: [
      { question: 'Is it safe for my fabric?', answer: 'Yes, we test all fabrics before cleaning.' }
    ],
    pricingTiers: [
      {
        name: 'Per Seat',
        price: '$25 - $35',
        description: 'Standard pricing per seating position.',
        items: ['Gentle Steam Extraction', 'Fabric Care']
      }
    ]
  },
  {
    id: 'blind-cleaning',
    title: 'Blind Cleaning',
    shortTitle: 'Blind Cleaning',
    slug: 'blind-cleaning',
    tagline: 'Dust-free and spotless blinds',
    heroDescription: 'Thoroughly clean and refresh your blinds, removing accumulated dust and allergens for a brighter home.',
    icon: 'Maximize',
    startingPrice: '$25 - $35',
    badge: 'Detail Focused',
    bannerImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    overview: 'Blinds are magnets for dust. Our meticulous cleaning process ensures every slat is perfectly clean.',
    features: [
      'Removes built-up dust',
      'Careful handling of delicate blinds',
      'Enhances indoor air quality'
    ],
    processSteps: [
      { step: 1, title: 'Dusting', description: 'Initial removal of loose dust.' },
      { step: 2, title: 'Wiping', description: 'Detailed cleaning of each section.' }
    ],
    benefits: [
      { title: 'Brighter Rooms', description: 'Clean blinds let in more light.' }
    ],
    faq: [
      { question: 'Do you take the blinds down?', answer: 'Usually we clean them in place for your convenience.' }
    ],
    pricingTiers: [
      {
        name: 'Standard Blind',
        price: '$25 - $35',
        description: 'Pricing per standard blind unit.',
        items: ['Detailed Dusting', 'Spot Cleaning']
      }
    ]
  },
  {
    id: 'rug-cleaning',
    title: 'Rug Cleaning',
    shortTitle: 'Rug Cleaning',
    slug: 'rug-cleaning',
    tagline: 'Expert care for your area rugs',
    heroDescription: 'Delicate yet effective cleaning for all types of rugs, preserving their vibrant colors and intricate patterns.',
    icon: 'Layers',
    startingPrice: '$80 - $100',
    badge: 'Premium Care',
    bannerImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    overview: 'Rugs require special attention. We carefully clean them to remove deep-seated dirt while protecting the fibers.',
    features: [
      'Safe for most rug types',
      'Deep dirt extraction',
      'Color preservation'
    ],
    processSteps: [
      { step: 1, title: 'Inspection', description: 'Checking for colorfastness.' },
      { step: 2, title: 'Cleaning', description: 'Tailored steam or dry cleaning.' }
    ],
    benefits: [
      { title: 'Restores Beauty', description: 'Brings back the original vibrancy.' }
    ],
    faq: [
      { question: 'Can you clean oriental rugs?', answer: 'Yes, we assess each rug to determine the safest method.' }
    ],
    pricingTiers: [
      {
        name: 'Standard Rug',
        price: '$80 - $100',
        description: 'Depending on size and material.',
        items: ['Deep Cleaning', 'Fiber Protection']
      }
    ]
  }
];
