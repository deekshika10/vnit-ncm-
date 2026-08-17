import React, { useState } from 'react';
import { TIMELINE_2030_DATA } from '../data/nagpurData';

export const Nagpur2030: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2026' | '2028' | '2030'>('2028');

  const activeMilestone = TIMELINE_2030_DATA.find(m => m.year === selectedYear) || TIMELINE_2030_DATA[0];

  const strategicThemes = [
    { name: "Talent Growth", metric: "+48% by 2030", desc: "Local engineering retention and specialized workforce scaling" },
    { name: "Technology Adoption", metric: "35% AI & SaaS", desc: "Enterprise cloud centers and automated production lines" },
    { name: "Industrial Expansion", metric: "4,500+ Hectares", desc: "MIHAN Aviation and Butibori defense corridor maturation" },
    { name: "Emerging Skills", metric: "BMS, Avionics, MLOps", desc: "Targeted curriculum realignment across VNIT, LIT & colleges" },
    { name: "Infrastructure & Logistics", metric: "Samruddhi + Metro 2", desc: "Zero-mile multimodal freight connectivity across India" },
    { name: "Innovation & Startups", metric: "250+ DeepTech Startups", desc: "Incubators at VNIT TBI, IIM InFED, and AIIMS Healthcare" },
  ];

  return (
    <section id="nagpur-2030" className="py-12 sm:py-16 bg-[#F5F1E8] border-t border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans mb-2">
            Forward-Looking Civic & Economic Scenarios
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#17212B] tracking-tight font-display">
            Nagpur 2030 Strategic Trajectories
          </h2>

          <p className="text-sm text-[#3E4A56] mt-1.5 leading-relaxed font-sans">
            Strategic projections and growth trajectories mapping the transformation of Central India's anchor metropolis.
          </p>
        </div>

        {/* Horizontal Timeline Navigation (2026 → 2028 → 2030) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 font-sans">
          {TIMELINE_2030_DATA.map((milestone) => {
            const isSelected = milestone.year === selectedYear;
            return (
              <button
                key={milestone.year}
                onClick={() => setSelectedYear(milestone.year as any)}
                className={`p-5 rounded-xs border text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#17212B] text-[#F5F1E8] border-[#17212B] shadow-xs'
                    : 'bg-[#FAF8F5] hover:bg-[#E8E4D9] text-[#17212B] border-[#E8E4D9]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-2xl sm:text-3xl font-bold font-display ${
                    isSelected ? 'text-[#D9A441]' : 'text-[#17212B]'
                  }`}>
                    {milestone.year}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider font-sans px-2 py-0.5 rounded-xs ${
                    isSelected ? 'bg-[#253342] text-slate-200' : 'bg-[#E8E4D9] text-[#5C6773] border border-[#D8D3C5]'
                  }`}>
                    Horizon Phase
                  </span>
                </div>
                <div className="text-xs font-semibold font-display line-clamp-1">{milestone.theme}</div>
                <div className="text-[11px] opacity-75 font-sans mt-0.5 line-clamp-1">{milestone.headline}</div>
              </button>
            );
          })}
        </div>

        {/* Timeline Milestone Deep Dive */}
        <div className="bg-[#FAF8F5] border border-[#E8E4D9] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6 font-sans">
          <div className="border-b border-[#E8E4D9] pb-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2878A8] font-sans">
              Scenario Focus: Horizon {activeMilestone.year} • {activeMilestone.theme}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#17212B] font-display mt-1">
              {activeMilestone.headline}
            </h3>
            <p className="text-xs text-[#3E4A56] font-sans mt-2 leading-relaxed">
              {activeMilestone.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeMilestone.keyIndicators.map((ind, idx) => (
              <div key={idx} className="p-4 bg-[#E8E4D9]/60 border border-[#E8E4D9] rounded-xs">
                <span className="text-[11px] font-semibold uppercase text-[#5C6773] font-sans block mb-1">
                  {ind.metric}
                </span>
                <span className="text-lg font-bold text-[#17212B] font-display">{ind.projected}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="p-4 bg-[#EBF3F8] border border-[#BBD5E6] rounded-xs text-xs font-sans text-[#1F5F85]">
              <span className="font-semibold uppercase tracking-wider block mb-1">Strategic Projection:</span>
              <span>{activeMilestone.strategicProjection}</span>
            </div>
          </div>
        </div>

        {/* 6 Strategic Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-6 font-sans">
          {strategicThemes.map((theme, idx) => (
            <div key={idx} className="p-4 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#17212B] font-display">{theme.name}</span>
                <span className="text-[11px] font-semibold text-[#3C9270] font-sans">{theme.metric}</span>
              </div>
              <p className="text-[11px] text-[#5C6773] font-sans">
                {theme.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
