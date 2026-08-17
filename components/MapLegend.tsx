import React from 'react';
import { ClusterType } from '../types';
import { CLUSTER_TYPE_CONFIG } from '../data/nagpurData';

interface MapLegendProps {
  selectedType: ClusterType | 'All';
  onSelectType: (type: ClusterType | 'All') => void;
  clusterCounts: Record<string, number>;
}

export const MapLegend: React.FC<MapLegendProps> = ({
  selectedType,
  onSelectType,
  clusterCounts
}) => {
  const legendItems: Array<{ type: ClusterType | 'All'; label: string; countKey?: string; color: string }> = [
    { type: 'All', label: 'All Layers', color: '#17212B' },
    { type: 'talent_hub', label: 'Talent & IT Hub', countKey: 'talent_hub', color: '#2878A8' },
    { type: 'industry_cluster', label: 'Industry Cluster', countKey: 'industry_cluster', color: '#E58A32' },
    { type: 'academic_anchor', label: 'Academic Anchor', countKey: 'academic_anchor', color: '#7467A8' },
    { type: 'growth_opportunity', label: 'Growth Opportunity', countKey: 'growth_opportunity', color: '#3C9270' },
  ];

  const totalCount = Object.values(clusterCounts).reduce((acc: number, curr: number) => acc + (curr || 0), 0);

  return (
    <div className="bg-[#FAF8F5] border border-[#E8E4D9] p-2.5 sm:p-3 rounded-xs shadow-2xs">
      <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-[#E8E4D9]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-xs tracking-wider uppercase text-[#5C6773] font-sans">
            Layer Filter & Legend
          </span>
          <span className="text-[11px] text-[#7E8B99] font-sans hidden sm:inline">
            (Filter map hotspots by functional type)
          </span>
        </div>
        {selectedType !== 'All' && (
          <button
            onClick={() => onSelectType('All')}
            className="text-[11px] font-semibold text-[#2878A8] hover:text-[#1F5F85] uppercase font-sans cursor-pointer transition-colors"
          >
            Reset Layer Filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2 font-sans">
        {legendItems.map((item) => {
          const isAll = item.type === 'All';
          const isSelected = selectedType === item.type;
          const count = isAll ? totalCount : (item.countKey ? clusterCounts[item.countKey] || 0 : 0);

          return (
            <button
              key={item.type}
              onClick={() => onSelectType(item.type)}
              className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xs text-left transition-all duration-150 text-xs cursor-pointer select-none font-sans ${
                isSelected
                  ? 'bg-[#17212B] text-[#F5F1E8] shadow-2xs border border-[#17212B]'
                  : 'bg-[#FAF8F5] hover:bg-[#E8E4D9] text-[#3E4A56] border border-[#E8E4D9]'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span 
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ 
                    backgroundColor: item.color
                  }}
                />
                <span className="font-medium text-xs truncate">{item.label}</span>
              </div>
              <span className={`text-[11px] font-semibold font-sans px-1.5 py-0.2 rounded-xs shrink-0 ${
                isSelected 
                  ? 'bg-[#253342] text-white' 
                  : 'bg-[#E8E4D9] text-[#5C6773] border border-[#D8D3C5]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
