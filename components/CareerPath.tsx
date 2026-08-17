import React, { useState } from 'react';
import { CAREER_STEPS_DATA, CAREER_DOMAINS_INTERACTIVE } from '../data/nagpurData';
import { 
  Compass, 
  Search, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  MapPin
} from 'lucide-react';

export const CareerPath: React.FC = () => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>(CAREER_DOMAINS_INTERACTIVE[0].id);

  const activeDomain = CAREER_DOMAINS_INTERACTIVE.find(d => d.id === selectedDomainId) || CAREER_DOMAINS_INTERACTIVE[0];

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return Compass;
      case 1: return Search;
      case 2: return GraduationCap;
      case 3: return Building2;
      case 4: return Briefcase;
      default: return Sparkles;
    }
  };

  return (
    <section id="career-path" className="py-12 sm:py-16 bg-[#F5F1E8] border-t border-[#E8E4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#5C6773] font-data mb-2">
            Talent Empowerment & Student Pathway
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#17212B] tracking-tight">
            How Students & Talent Use the Capability Map
          </h2>

          <p className="text-sm text-[#3E4A56] mt-1.5 leading-relaxed">
            A structured 5-step methodology connecting university education, vocational certification, and local cluster opportunities across Nagpur.
          </p>
        </div>

        {/* 5-Step Editorial Flow */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {CAREER_STEPS_DATA.map((step, idx) => {
              const Icon = getStepIcon(idx);
              return (
                <div 
                  key={step.stepNumber} 
                  className="bg-[#FAF8F5] p-4.5 border border-[#E8E4D9] flex flex-col justify-between relative group hover:border-[#17212B] transition-all rounded-xs shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[#E8E4D9]">
                      <span className="text-2xl font-bold text-[#17212B] font-data">
                        {step.stepNumber}
                      </span>
                      <div className="w-7 h-7 rounded-xs bg-[#E8E4D9] border border-[#D8D3C5] flex items-center justify-center text-[#2878A8]">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-[#17212B] mb-1 uppercase font-data">
                      {step.title}
                    </h3>
                    <div className="text-[10px] text-[#5C6773] font-data mb-2 italic">
                      {step.subtitle}
                    </div>

                    <p className="text-xs text-[#3E4A56] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E4D9] text-[10px] font-bold text-[#2878A8] font-data uppercase tracking-wider flex items-center gap-1">
                    <span>Explore Stage</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Domain Pathways Interactive Explorer */}
        <div className="bg-[#FAF8F5] border border-[#E8E4D9] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E4D9] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C6773] font-data">
                Specialized Career Pathways
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17212B] font-sans mt-0.5">
                Explore Domain Pathways in Nagpur
              </h3>
            </div>

            {/* Domain Pills */}
            <div className="flex flex-wrap gap-1.5">
              {CAREER_DOMAINS_INTERACTIVE.map((dom) => {
                const isSelected = dom.id === selectedDomainId;
                return (
                  <button
                    key={dom.id}
                    onClick={() => setSelectedDomainId(dom.id)}
                    className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer font-data ${
                      isSelected
                        ? 'bg-[#17212B] text-[#F5F1E8] shadow-2xs font-bold'
                        : 'bg-[#E8E4D9]/70 text-[#3E4A56] hover:bg-[#E8E4D9] hover:text-[#17212B] border border-[#D8D3C5]'
                    }`}
                  >
                    {dom.domainName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#2878A8] font-data block">
                01 • Recommended Academic Foundation
              </span>
              <p className="text-sm font-bold text-[#18181B] font-sans">
                {activeDomain.recommendedAnchor}
              </p>
              <p className="text-xs text-[#3E4A56] font-data leading-relaxed">
                Programs providing foundation for target cluster: <strong>{activeDomain.targetCluster}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#E58A32] font-data block">
                02 • High-Value Skills to Acquire
              </span>
              <div className="flex flex-wrap gap-1">
                {activeDomain.keySkillsToAcquire.map((skill, idx) => (
                  <span key={idx} className="text-xs font-medium bg-[#FCF3EA] text-[#E58A32] px-2.5 py-1 rounded-xs border border-[#F7D5B0] font-data">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#3C9270] font-data block">
                03 • Top Hiring Companies & Packages
              </span>
              <p className="text-xs font-medium text-[#17212B] font-data">
                {activeDomain.topHiringCompanies.join(', ')}
              </p>
              <p className="text-xs text-[#3C9270] font-data font-bold">
                Salary Benchmark: {activeDomain.averageStartingPackage}
              </p>
              <span className="text-[10px] text-[#5C6773] font-data block">
                {activeDomain.gapReductionImpact}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
