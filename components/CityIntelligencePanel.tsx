import React from 'react';
import { CITY_OVERVIEW_STATS } from '../data/nagpurData';
import { SectorCategory } from '../types';

interface CityIntelligencePanelProps {
  selectedSector: SectorCategory | 'All';
  highlightedCount: number;
  totalClustersCount: number;
}

export const CityIntelligencePanel: React.FC<CityIntelligencePanelProps> = ({
  selectedSector,
  highlightedCount,
  totalClustersCount
}) => {
  return (
    <div className="bg-[#FAF8F5] border border-[#E8E4D9] p-5 sm:p-6 flex flex-col justify-between h-full rounded-xs shadow-2xs">
      {/* Top Header & Key Indicators */}
      <div className="space-y-6">
        <div className="border-b border-[#E8E4D9] pb-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#5C6773] font-sans">
            City Indicators
          </span>
          <span className="text-[11px] font-semibold text-[#17212B] font-sans bg-[#E8E4D9] px-2.5 py-0.5 border border-[#D8D3C5] rounded-xs">
            {selectedSector === 'All' ? 'Metropolitan Scope' : selectedSector}
          </span>
        </div>

        {/* Metric Stack with Clear Visual Hierarchy & Large Numbers */}
        <div className="space-y-6">
          {/* 1. Total Talent Pool (Confident Medium Blue) */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2878A8] mb-1 font-sans flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2878A8]" />
              <span>Total Talent Pool</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[#17212B] tracking-tight font-display">
              {CITY_OVERVIEW_STATS.totalTalentPool.value}
            </div>
            <div className="text-xs text-[#5C6773] mt-1 flex items-center gap-1.5 font-sans">
              <span className="text-[#3C9270] font-semibold">{CITY_OVERVIEW_STATS.totalTalentPool.growth}</span>
              <span>• Technical & engineering base</span>
            </div>
          </div>

          {/* 2. Active Skill Gap (Coral Red) */}
          <div className="pt-5 border-t border-[#E8E4D9]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#D65F52] mb-1 font-sans flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D65F52]" />
              <span>Active Skill Gap</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[#17212B] tracking-tight font-display">
              {CITY_OVERVIEW_STATS.activeSkillGap.value}
            </div>
            <div className="text-xs text-[#5C6773] mt-1 flex items-center gap-1.5 font-sans">
              <span className="text-[#D65F52] font-semibold">{CITY_OVERVIEW_STATS.activeSkillGap.growth}</span>
              <span>• Deficit in EV, Cloud & Aero</span>
            </div>
          </div>

          {/* 3. Industry Demand (Warm Orange) */}
          <div className="pt-5 border-t border-[#E8E4D9]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E58A32] mb-1 font-sans flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E58A32]" />
              <span>Industry Demand</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[#17212B] tracking-tight font-display">
              {CITY_OVERVIEW_STATS.industryDemand.value}
            </div>
            <div className="text-xs text-[#5C6773] mt-1 flex items-center gap-1.5 font-sans">
              <span className="text-[#E58A32] font-semibold">{CITY_OVERVIEW_STATS.industryDemand.growth}</span>
              <span>• 24-month open positions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Clusters Summary */}
      <div className="mt-8 pt-5 border-t border-[#E8E4D9]">
        <div className="bg-[#17212B] text-[#F5F1E8] p-4 rounded-xs flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-xs font-semibold tracking-wide uppercase font-sans">Active Clusters</div>
            <div className="text-[11px] text-[#A8B2BD] font-sans">
              {highlightedCount} in view / {totalClustersCount} total
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#F5F1E8] font-display">
            {CITY_OVERVIEW_STATS.capabilityClusters.value}
          </span>
        </div>
      </div>
    </div>
  );
};
