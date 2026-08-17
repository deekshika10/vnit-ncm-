import React from 'react';
import { SectorCategory } from '../types';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  selectedSector: SectorCategory | 'All';
  onSelectSector: (sector: SectorCategory | 'All') => void;
  onExploreClick: () => void;
}

const SECTORS: Array<SectorCategory | 'All'> = [
  'All',
  'IT & Cloud',
  'Aerospace & Defence',
  'Manufacturing',
  'Logistics',
  'Healthcare',
  'Education & Research',
  'EV & Mobility',
  'AgriTech',
  'Engineering'
];

export const Hero: React.FC<HeroProps> = ({ 
  selectedSector, 
  onSelectSector, 
  onExploreClick 
}) => {
  return (
    <section className="relative pt-8 pb-3 sm:pt-12 sm:pb-5 bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Eyebrow Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3C9270] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#5C6773] font-sans">
              Central India Capability Intelligence • Zero Mile Geographic Centroid
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#7E8B99] font-sans hidden sm:inline">
            21.1458° N, 79.0882° E • Elevation 310m
          </span>
        </div>

        {/* Hero Title and Editorial Framing */}
        <div className="max-w-4xl mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#17212B] font-display tracking-tight leading-[1.08] mb-3">
            NAGPUR CAPABILITY MAP
          </h1>

          <p className="text-base sm:text-lg text-[#3E4A56] leading-relaxed max-w-2xl font-normal font-sans">
            Explore the talent, skills, industries, and opportunities shaping Central India's emerging economic capital.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 font-sans">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#17212B] hover:text-[#2878A8] transition-colors cursor-pointer font-sans"
            >
              <span>EXPLORE THE CITY</span>
              <ArrowRight className="w-4 h-4 text-[#2878A8] group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[#D8D3C5] text-xs hidden sm:inline">|</span>
            <span className="text-xs text-[#5C6773] font-sans font-medium">
              8 Strategic Capability Corridors Active
            </span>
          </div>
        </div>

        {/* Sector Ecosystem Filter Bar */}
        <div className="pt-3.5 border-t border-[#E8E4D9]">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <span className="text-[11px] font-semibold text-[#5C6773] font-sans">
              Filter by Capability Ecosystem:
            </span>
            <span className="text-[11px] text-[#7E8B99] font-sans hidden sm:inline">
              Select an ecosystem to highlight interconnected city anchors
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {SECTORS.map((sector) => {
              const isSelected = selectedSector === sector;
              return (
                <button
                  key={sector}
                  onClick={() => onSelectSector(sector)}
                  className={`px-3.5 py-1.5 rounded-xs text-xs whitespace-nowrap transition-all duration-150 cursor-pointer font-sans ${
                    isSelected
                      ? 'bg-[#17212B] text-[#F5F1E8] shadow-2xs font-semibold'
                      : 'bg-[#FAF8F5] text-[#3E4A56] hover:bg-[#E8E4D9] hover:text-[#17212B] border border-[#E8E4D9] font-medium'
                  }`}
                >
                  {sector === 'All' ? 'All Ecosystems' : sector}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
