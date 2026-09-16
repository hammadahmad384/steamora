import re

with open('src/components/ui/BeforeAfterSlider.tsx', 'r') as f:
    content = f.read()

new_items = """const ITEMS: BeforeAfterItem[] = [
  {
    id: 'carpet',
    category: 'Carpet Restoration',
    title: 'High-Traffic Living Room Wool Carpet',
    location: 'Richmond Victorian Terrace',
    beforeImg: carpetBefore,
    afterImg: carpetBefore,
    description: 'Years of embedded soot, red wine spills, and ground-in garden dust removed via 210°F dual-vacuum extraction.',
    metric: '99.4% Soil & Tannin Extraction'
  },
  {
    id: 'sofa',
    category: 'Sofa Cleaning',
    title: 'Designer 4-Seater Cream Modular Lounge',
    location: 'Southbank High-Rise Residence',
    beforeImg: sofaBefore,
    afterImg: sofaBefore,
    description: 'Lifted stubborn latte rings, pet body grease, and fabric discoloration using low-moisture botanical enzyme foam.',
    metric: '100% Watermark Removal'
  },
  {
    id: 'upholstery',
    category: 'Dining & Velvet',
    title: 'Mid-Century Velvet Dining Chairs & Ottoman',
    location: 'South Yarra Apartment',
    beforeImg: upholsteryBefore,
    afterImg: upholsteryBefore,
    description: 'Delicate hand extraction revitalised compressed velvet fibers and eradicated oily handrest stains.',
    metric: 'Zero Fiber Shrinkage'
  },
  {
    id: 'mattress',
    category: 'Mattress Sanitisation',
    title: 'King Size Pillow-Top Mattress',
    location: 'Brighton Coastal Estate',
    beforeImg: mattressBefore,
    afterImg: mattressBefore,
    description: 'Deep extraction removed dust mites, allergens, and perspiration stains, restoring a hygienic sleep environment.',
    metric: 'Allergen-Free Certification'
  },
  {
    id: 'blind',
    category: 'Blind Cleaning',
    title: 'Venetian & Roller Blinds',
    location: 'Melbourne CBD Apartment',
    beforeImg: blindBefore,
    afterImg: blindBefore,
    description: 'Ultrasonic cleaning technology dissolved accumulated dust, grease, and nicotine stains without damaging delicate slats.',
    metric: 'Original Brilliance Restored'
  }
];"""

content = re.sub(r"const ITEMS: BeforeAfterItem\[\] = \[[\s\S]*?\];", new_items, content)

with open('src/components/ui/BeforeAfterSlider.tsx', 'w') as f:
    f.write(content)
