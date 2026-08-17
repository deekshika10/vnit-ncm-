import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CityChangingIntroProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const CityChangingIntro: React.FC<CityChangingIntroProps> = ({ onNavigateToSection }) => {
  return (
    <section className="border-t border-[#E8E4D9] bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 border-b border-[#E8E4D9]">
          
          {/* Main Statement */}
          <div className="p-6 md:p-8 md:border-r border-b md:border-b-0 border-[#E8E4D9] bg-[#E8E4D9]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans mb-2">
              Macro Positioning
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#17212B] mb-2.5 leading-snug font-display">
              The city is changing.
            </h3>
            <p className="text-xs text-[#3E4A56] leading-relaxed font-sans">
              Nagpur is systematically developing capabilities across deep-tech, aerospace MRO, EV mobility, and logistics.
            </p>
          </div>

          {/* 01 — TALENT */}
          <div 
            onClick={() => onNavigateToSection('skills')}
            className="p-6 md:p-8 md:border-r border-b md:border-b-0 border-[#E8E4D9] group hover:bg-[#FAF8F5] transition-all cursor-pointer flex flex-col justify-between font-sans"
          >
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2878A8] font-sans mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2878A8]" />
                <span>01 — TALENT</span>
              </div>
              <h4 className="font-semibold text-sm text-[#17212B] mb-2 tracking-normal group-hover:text-[#2878A8] transition-colors font-display">
                Base & Scale
              </h4>
              <p className="text-xs text-[#3E4A56] leading-relaxed mb-6 font-sans">
                842,000 engineering and technical workforce expanding 12% YoY across 40+ premier academic institutions.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#17212B] group-hover:text-[#2878A8] flex items-center gap-1.5 font-sans">
              <span>Skills Matrix</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 02 — DEMAND */}
          <div 
            onClick={() => onNavigateToSection('industries')}
            className="p-6 md:p-8 md:border-r border-b md:border-b-0 border-[#E8E4D9] group hover:bg-[#FAF8F5] transition-all cursor-pointer flex flex-col justify-between font-sans"
          >
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#E58A32] font-sans mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E58A32]" />
                <span>02 — DEMAND</span>
              </div>
              <h4 className="font-semibold text-sm text-[#17212B] mb-2 tracking-normal group-hover:text-[#E58A32] transition-colors font-display">
                Industry Needs
              </h4>
              <p className="text-xs text-[#3E4A56] leading-relaxed mb-6 font-sans">
                High demand in EV battery systems, Boeing MRO avionics, and logistics with 308,000+ open roles forecasted.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#17212B] group-hover:text-[#E58A32] flex items-center gap-1.5 font-sans">
              <span>Industrial Corridors</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 03 — OPPORTUNITY */}
          <div 
            onClick={() => onNavigateToSection('career-path')}
            className="p-6 md:p-8 group hover:bg-[#FAF8F5] transition-all cursor-pointer flex flex-col justify-between font-sans"
          >
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#3C9270] font-sans mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3C9270]" />
                <span>03 — OPPORTUNITY</span>
              </div>
              <h4 className="font-semibold text-sm text-[#17212B] mb-2 tracking-normal group-hover:text-[#3C9270] transition-colors font-display">
                Strategic Path
              </h4>
              <p className="text-xs text-[#3E4A56] leading-relaxed mb-6 font-sans">
                Connecting local research output from VNIT & IIIT directly to global MIHAN enterprises and regional corridors.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#17212B] group-hover:text-[#3C9270] flex items-center gap-1.5 font-sans">
              <span>Career Pathways</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
