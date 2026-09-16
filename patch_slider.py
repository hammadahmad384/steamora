import re

with open('src/components/ui/BeforeAfterSlider.tsx', 'r') as f:
    content = f.read()

imports = """import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

import carpetBefore from '../../assets/images/carpet_cleaning_1789557680961.jpg';
import sofaBefore from '../../assets/images/couch_cleaning_1789557730033.jpg';
import upholsteryBefore from '../../assets/images/upholstery_cleaning_1789557694109.jpg';
import mattressBefore from '../../assets/images/mattress_cleaning_1789557704437.jpg';
import blindBefore from '../../assets/images/blind_cleaning_1789557718412.jpg';
"""

content = content.replace("import React, { useState, useRef, useCallback } from 'react';\nimport { Sparkles, MoveHorizontal } from 'lucide-react';", imports)

new_items = """const ITEMS: BeforeAfterItem[] = [
  {
    id: 'carpet',
    category: 'Carpet Restoration',
    title: 'High-Traffic Living Room Wool Carpet',
    location: 'Richmond Victorian Terrace',
    beforeImg: carpetBefore,
    afterImg: '/images/carpet-cleaning.webp',
    description: 'Years of embedded soot, red wine spills, and ground-in garden dust removed via 210°F dual-vacuum extraction.',
    metric: '99.4% Soil & Tannin Extraction'
  },
  {
    id: 'sofa',
    category: 'Sofa Cleaning',
    title: 'Designer 4-Seater Cream Modular Lounge',
    location: 'Southbank High-Rise Residence',
    beforeImg: sofaBefore,
    afterImg: '/images/couch-cleaning.webp',
    description: 'Lifted stubborn latte rings, pet body grease, and fabric discoloration using low-moisture botanical enzyme foam.',
    metric: '100% Watermark Removal'
  },
  {
    id: 'upholstery',
    category: 'Dining & Velvet',
    title: 'Mid-Century Velvet Dining Chairs & Ottoman',
    location: 'South Yarra Apartment',
    beforeImg: upholsteryBefore,
    afterImg: '/images/upholstery-cleaning.webp',
    description: 'Delicate hand extraction revitalised compressed velvet fibers and eradicated oily handrest stains.',
    metric: 'Zero Fiber Shrinkage'
  },
  {
    id: 'mattress',
    category: 'Mattress Sanitisation',
    title: 'King Size Pillow-Top Mattress',
    location: 'Brighton Coastal Estate',
    beforeImg: mattressBefore,
    afterImg: '/images/mattress-cleaning.webp',
    description: 'Deep extraction removed dust mites, allergens, and perspiration stains, restoring a hygienic sleep environment.',
    metric: 'Allergen-Free Certification'
  },
  {
    id: 'blind',
    category: 'Blind Cleaning',
    title: 'Venetian & Roller Blinds',
    location: 'Melbourne CBD Apartment',
    beforeImg: blindBefore,
    afterImg: '/images/blind-cleaning.webp',
    description: 'Ultrasonic cleaning technology dissolved accumulated dust, grease, and nicotine stains without damaging delicate slats.',
    metric: 'Original Brilliance Restored'
  }
];"""

content = re.sub(r"const ITEMS: BeforeAfterItem\[\] = \[[\s\S]*?\];", new_items, content)

with open('src/components/ui/BeforeAfterSlider.tsx', 'w') as f:
    f.write(content)
