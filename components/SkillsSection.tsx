import React, { useState } from 'react';
import { SKILL_CATEGORIES_DATA } from '../data/nagpurData';
import { SkillItem } from '../types';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Critical Gap' | 'Moderate' | 'High'>('All');
  const [activeSkillId, setActiveSkillId] = useState<string>(SKILL_CATEGORIES_DATA[0].id);

  const filteredSkills = SKILL_CATEGORIES_DATA.filter(skill => {
    if (selectedFilter === 'All') return true;
    return skill.readinessLevel === selectedFilter;
  });

  const activeSkill = SKILL_CATEGORIES_DATA.find(s => s.id === activeSkillId) || SKILL_CATEGORIES_DATA[0];

  const getReadinessBadge = (level: SkillItem['readinessLevel']) => {
    switch (level) {
      case 'Critical Gap':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#FBEEEC] text-[#D65F52] border border-[#F3C2BD] font-data">
            <AlertTriangle className="w-3 h-3" />
            Critical Gap ({activeSkill.gapPercent}%)
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#FCF3EA] text-[#E58A32] border border-[#F7D5B0] font-data">
            <TrendingUp className="w-3 h-3" />
            Moderate ({activeSkill.gapPercent}%)
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-[#EEF7F2] text-[#3C9270] border border-[#B2DEC9] font-data">
            <CheckCircle2 className="w-3 h-3" />
            High Readiness
          </span>
        );
    }
  };

  return (
    <section id="skills" className="py-12 sm:py-16 bg-[#F5F1E8] border-t border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#E8E4D9]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans mb-2">
              Workforce Architecture & Requisition Index
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#17212B] tracking-tight font-display">
              Nagpur Skill Matrix
            </h2>
            <p className="text-sm text-[#3E4A56] max-w-2xl mt-1.5 leading-relaxed font-sans">
              Evaluating talent supply volumes against 24-month industrial requisition velocities across 8 fundamental capability domains.
            </p>
          </div>

          {/* Readiness Filters */}
          <div className="flex items-center gap-1.5 flex-wrap font-sans">
            <span className="text-[11px] font-semibold text-[#5C6773] uppercase tracking-wider mr-1">
              Filter:
            </span>
            {(['All', 'Critical Gap', 'Moderate', 'High'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-xs text-xs font-medium transition-all cursor-pointer font-sans ${
                  selectedFilter === filter
                    ? 'bg-[#17212B] text-[#F5F1E8] shadow-2xs font-semibold'
                    : 'bg-[#FAF8F5] text-[#3E4A56] hover:bg-[#E8E4D9] hover:text-[#17212B] border border-[#E8E4D9]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
          {/* Left Column: Skill Category List */}
          <div className="lg:col-span-5 space-y-2">
            {filteredSkills.map((skill) => {
              const isSelected = skill.id === activeSkillId;
              return (
                <div
                  key={skill.id}
                  onClick={() => setActiveSkillId(skill.id)}
                  className={`p-3.5 rounded-xs border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#FAF8F5] border-[#17212B] shadow-xs border-l-4 border-l-[#2878A8]'
                      : 'bg-[#E8E4D9]/60 hover:bg-[#FAF8F5] border-[#E8E4D9] text-[#3E4A56]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-semibold font-display text-[#17212B]">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-semibold font-sans px-1.5 py-0.5 rounded-xs ${
                      skill.readinessLevel === 'Critical Gap' ? 'bg-[#FBEEEC] text-[#D65F52]' :
                      skill.readinessLevel === 'Moderate' ? 'bg-[#FCF3EA] text-[#E58A32]' :
                      'bg-[#EEF7F2] text-[#3C9270]'
                    }`}>
                      {skill.readinessLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#5C6773] font-sans">
                    <span>Supply: <strong className="font-semibold text-[#17212B]">{skill.supplyCount.toLocaleString()}</strong></span>
                    <span>Demand: <strong className="font-semibold text-[#17212B]">{skill.demandCount.toLocaleString()}</strong></span>
                  </div>

                  {/* Readiness Progress Bar */}
                  <div className="w-full h-1.5 bg-[#D8D3C5] rounded-full overflow-hidden mt-2.5">
                    <div 
                      className={`h-full transition-all duration-300 rounded-full ${
                        skill.readinessLevel === 'Critical Gap' ? 'bg-[#D65F52]' :
                        skill.readinessLevel === 'Moderate' ? 'bg-[#E58A32]' :
                        'bg-[#3C9270]'
                      }`}
                      style={{ width: `${Math.max(10, 100 - (skill.gapPercent || 0))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Skill Deep-Dive Card */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E8E4D9] p-6 sm:p-7 rounded-xs shadow-2xs space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E8E4D9] pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans">
                  Capability Detail View
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#17212B] font-display mt-0.5">
                  {activeSkill.name}
                </h3>
              </div>
              {getReadinessBadge(activeSkill.readinessLevel)}
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#E8E4D9]/60 border border-[#E8E4D9] rounded-xs space-y-0.5">
                <span className="text-[11px] font-semibold text-[#5C6773] uppercase font-sans block">Local Supply</span>
                <span className="text-base font-bold text-[#17212B] font-display">{activeSkill.supplyCount.toLocaleString()}</span>
              </div>

              <div className="p-3 bg-[#E8E4D9]/60 border border-[#E8E4D9] rounded-xs space-y-0.5">
                <span className="text-[11px] font-semibold text-[#5C6773] uppercase font-sans block">Industry Need</span>
                <span className="text-base font-bold text-[#17212B] font-display">{activeSkill.demandCount.toLocaleString()}</span>
              </div>

              <div className="p-3 bg-[#E8E4D9]/60 border border-[#E8E4D9] rounded-xs space-y-0.5 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-semibold text-[#5C6773] uppercase font-sans block">Growth Velocity</span>
                <span className="text-base font-bold text-[#3C9270] font-display">{activeSkill.demandGrowth}</span>
              </div>
            </div>

            {/* Primary Skill Components */}
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans block mb-2">
                Core Sub-Competencies & Emerging Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeSkill.emergingSkills.map((sub, idx) => (
                  <span key={idx} className="text-xs font-medium bg-[#E8E4D9] text-[#17212B] px-2.5 py-1 rounded-xs border border-[#D8D3C5] font-sans">
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Feeder & Industry Corridors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E4D9] text-xs font-sans">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#5C6773] flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#2878A8]" /> Academic Feeder Anchors:
                </span>
                <p className="text-[#17212B] font-normal">
                  {activeSkill.topInstitutions.join(', ')}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#5C6773] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#E58A32]" /> Top Hiring Employers:
                </span>
                <p className="text-[#17212B] font-normal">
                  {activeSkill.topEmployers.join(', ')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
