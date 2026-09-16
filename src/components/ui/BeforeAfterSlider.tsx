import React, { useState, useRef, useCallback } from 'react';
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
import sofaBefore from '../../assets/images/couch_cleaning_1789557730033.jpg';
import upholsteryBefore from '../../assets/images/upholstery_cleaning_1789557694109.jpg';
import mattressBefore from '../../assets/images/mattress_cleaning_1789557704437.jpg';
import blindBefore from '../../assets/images/blind_cleaning_1789557718412.jpg';


interface BeforeAfterItem {
  id: string;
  category: string;
  title: string;
  location: string;
  beforeImg: string;
  afterImg: string;
  description: string;
  metric: string;
}

const ITEMS: BeforeAfterItem[] = [
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
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>('carpet');
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = ITEMS.find(item => item.id === activeTab) || ITEMS[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Category selector pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSliderPos(50);
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 ring-1 ring-slate-800'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80 hover:text-slate-900'
            }`}
          >
            {item.category}
          </button>
        ))}
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-900/5 border border-slate-200/80">
        <div 
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[320px] sm:h-[460px] md:h-[520px] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-slate-900"
        >
          {/* After Image (Full background) */}
          <img 
            src={activeItem.afterImg} 
            alt={`Cleaned by Steamora: ${activeItem.title}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Before Image (Clipped overlay) */}
          <div 
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img 
              src={activeItem.beforeImg} 
              alt={`Before cleaning: ${activeItem.title}`}
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: containerRef.current?.offsetWidth || '100%' }}
            />
            
            
          </div>

          {/* Dividing Bar */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Central Drag Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border-2 border-teal-500">
              <MoveHorizontal className="w-5 h-5 text-teal-600 animate-pulse" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-900/85 text-amber-300 backdrop-blur-md border border-white/20 shadow-md">
              Before Steamora
            </span>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-teal-600/90 text-white backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              After Steamora Clean
            </span>
          </div>

          {/* Interactive Hint Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-slate-900/75 backdrop-blur-md text-white/90 text-xs font-medium flex items-center gap-2 pointer-events-none">
            <MoveHorizontal className="w-3.5 h-3.5 text-teal-400" />
            <span>Drag slider to compare difference</span>
          </div>
        </div>

        {/* Project Details Below Canvas */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                {activeItem.location}
              </span>
              <span className="text-xs font-medium text-slate-600">
                {activeItem.category}
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900">
              {activeItem.title}
            </h4>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {activeItem.description}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3 text-left md:text-right shrink-0">
            <div className="text-xs text-slate-600 font-medium uppercase tracking-wider">
              Verified Result
            </div>
            <div className="text-base sm:text-lg font-extrabold text-teal-600 mt-0.5">
              {activeItem.metric}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
