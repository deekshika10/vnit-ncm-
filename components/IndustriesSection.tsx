import React, { useState } from 'react';
import { INDUSTRY_ECOSYSTEMS_DATA } from '../data/nagpurData';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Zap,
  CheckCircle2
} from 'lucide-react';

interface IndustriesSectionProps {
  onInspectNodeOnMap?: (nodeId: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onInspectNodeOnMap }) => {
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>(INDUSTRY_ECOSYSTEMS_DATA[0].id);

  const activeIndustry = INDUSTRY_ECOSYSTEMS_DATA.find(i => i.id === selectedIndustryId) || INDUSTRY_ECOSYSTEMS_DATA[0];

  return (
    <section id="industries" className="py-12 sm:py-16 bg-[#F5F1E8] border-t border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans mb-2">
            Economic Corridors & Industrial Anchors
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#17212B] tracking-tight font-display">
            Major Nagpur Industry Ecosystems
          </h2>
          <p className="text-sm text-[#3E4A56] mt-1.5 leading-relaxed font-sans">
            From the multi-modal SEZ at MIHAN to defense propellants in Butibori and the manufacturing foundry at Hingna.
          </p>
        </div>

        {/* 8 Industry Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 font-sans">
          {INDUSTRY_ECOSYSTEMS_DATA.map((ind) => {
            const isSelected = ind.id === selectedIndustryId;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustryId(ind.id)}
                className={`p-4 rounded-xs text-left transition-all duration-150 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#17212B] text-[#F5F1E8] border-[#17212B] shadow-xs'
                    : 'bg-[#FAF8F5] hover:bg-[#E8E4D9] text-[#17212B] border-[#E8E4D9]'
                }`}
              >
                <div>
                  <div className={`text-[10px] font-semibold uppercase tracking-wider mb-1 font-sans ${
                    isSelected ? 'text-[#D9A441]' : 'text-[#5C6773]'
                  }`}>
                    {ind.category}
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm leading-tight mb-2 font-display">
                    {ind.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-current/15 text-[11px] font-sans">
                  <span className={isSelected ? 'text-[#C5D0DC]' : 'text-[#5C6773]'}>{ind.workforceSize.toLocaleString()}</span>
                  <span className={isSelected ? 'text-[#D9A441] font-semibold' : 'text-[#3C9270] font-semibold'}>{ind.annualGrowth}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Spotlight Card */}
        <div className="bg-[#FAF8F5] border border-[#E8E4D9] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6 font-sans">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#E8E4D9] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-xs text-[11px] font-semibold uppercase bg-[#EBF3F8] text-[#2878A8] border border-[#BBD5E6] font-sans">
                  {activeIndustry.category}
                </span>
                <span className="text-xs text-[#5C6773] font-sans flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E58A32]" /> {activeIndustry.locationArea}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#17212B] font-display">
                {activeIndustry.name}
              </h3>
              <p className="text-xs text-[#5C6773] font-sans italic mt-0.5">
                {activeIndustry.tagline}
              </p>
            </div>

            {/* Inspect on Spatial Map CTA */}
            {onInspectNodeOnMap && (
              <button
                onClick={() => onInspectNodeOnMap(activeIndustry.mapNodeId)}
                className="inline-flex items-center gap-1.5 bg-[#17212B] hover:bg-[#253342] text-[#F5F1E8] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider font-sans transition-all cursor-pointer shadow-2xs group"
              >
                <span>View On Map</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9A441] group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#3E4A56] leading-relaxed font-sans">
            {activeIndustry.description}
          </p>

          {/* Key Anchors & Primary Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans block mb-2">
                Anchor Enterprises & Facilities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeIndustry.keyAnchors.map((emp, idx) => (
                  <span key={idx} className="text-xs font-medium bg-[#E8E4D9] text-[#17212B] px-3 py-1 rounded-xs border border-[#D8D3C5] font-sans">
                    {emp}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans block mb-2">
                Primary Focus Capabilities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeIndustry.primaryFocus.map((role, idx) => (
                  <span key={idx} className="text-xs font-semibold bg-[#EBF3F8] text-[#2878A8] px-3 py-1 rounded-xs border border-[#BBD5E6] font-sans">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
