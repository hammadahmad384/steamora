import re

with open('src/components/ui/BeforeAfterSlider.tsx', 'r') as f:
    content = f.read()

# First, update imports
imports = """import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

import carpetClean from '../../assets/images/carpet_clean_1789575779353.jpg';
import carpetDirty from '../../assets/images/carpet_dirty_1789575868087.jpg';

import sofaClean from '../../assets/images/sofa_clean_1789575797999.jpg';
import sofaDirty from '../../assets/images/sofa_dirty_1789575885563.jpg';

import upholsteryClean from '../../assets/images/upholstery_clean_1789575812050.jpg';
import upholsteryDirty from '../../assets/images/upholstery_dirty_1789575904935.jpg';

import mattressClean from '../../assets/images/mattress_clean_1789575828605.jpg';
import mattressDirty from '../../assets/images/mattress_dirty_1789575922187.jpg';

import blindsClean from '../../assets/images/blinds_clean_1789575842157.jpg';
import blindsDirty from '../../assets/images/blinds_dirty_1789575939485.jpg';
"""

content = re.sub(r"import React,.*?from 'lucide-react';\n(\nimport.*?\.jpg';\n)*", imports, content, flags=re.DOTALL)

# Update ITEMS array
new_items = """const ITEMS: BeforeAfterItem[] = [
  {
    id: 'carpet',
    category: 'Carpet Restoration',
    title: 'High-Traffic Living Room Wool Carpet',
    location: 'Richmond Victorian Terrace',
    beforeImg: carpetDirty,
    afterImg: carpetClean,
    description: 'Years of embedded soot, red wine spills, and ground-in garden dust removed via 210°F dual-vacuum extraction.',
    metric: '99.4% Soil & Tannin Extraction'
  },
  {
    id: 'sofa',
    category: 'Sofa Cleaning',
    title: 'Designer 4-Seater Cream Modular Lounge',
    location: 'Southbank High-Rise Residence',
    beforeImg: sofaDirty,
    afterImg: sofaClean,
    description: 'Lifted stubborn latte rings, pet body grease, and fabric discoloration using low-moisture botanical enzyme foam.',
    metric: '100% Watermark Removal'
  },
  {
    id: 'upholstery',
    category: 'Dining & Velvet',
    title: 'Mid-Century Velvet Dining Chairs & Ottoman',
    location: 'South Yarra Apartment',
    beforeImg: upholsteryDirty,
    afterImg: upholsteryClean,
    description: 'Delicate hand extraction revitalised compressed velvet fibers and eradicated oily handrest stains.',
    metric: 'Zero Fiber Shrinkage'
  },
  {
    id: 'mattress',
    category: 'Mattress Sanitisation',
    title: 'King Size Pillow-Top Mattress',
    location: 'Brighton Coastal Estate',
    beforeImg: mattressDirty,
    afterImg: mattressClean,
    description: 'Deep extraction removed dust mites, allergens, and perspiration stains, restoring a hygienic sleep environment.',
    metric: 'Allergen-Free Certification'
  },
  {
    id: 'blind',
    category: 'Blind Cleaning',
    title: 'Venetian & Roller Blinds',
    location: 'Melbourne CBD Apartment',
    beforeImg: blindsDirty,
    afterImg: blindsClean,
    description: 'Ultrasonic cleaning technology dissolved accumulated dust, grease, and nicotine stains without damaging delicate slats.',
    metric: 'Original Brilliance Restored'
  }
];"""

content = re.sub(r"const ITEMS: BeforeAfterItem\[\] = \[[\s\S]*?\];", new_items, content)

# Remove the CSS dirt filter
content = content.replace('{/* Subtle filter on before to simulate grime/stain if photo is clean */}\n            <div className="absolute inset-0 bg-amber-950/20 mix-blend-multiply pointer-events-none" />', '')

with open('src/components/ui/BeforeAfterSlider.tsx', 'w') as f:
    f.write(content)
