import React from 'react';
import { MapClusterNode } from '../types';
import { CLUSTER_TYPE_CONFIG } from '../data/nagpurData';
import { 
  X, 
  MapPin, 
  Building, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface NodeInspectorProps {
  node: MapClusterNode | null;
  onClose: () => void;
  onSelectConnectedNode: (nodeId: string) => void;
  allNodes: MapClusterNode[];
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  node,
  onClose,
  onSelectConnectedNode,
  allNodes
}) => {
  if (!node) return null;

  const typeConfig = CLUSTER_TYPE_CONFIG[node.type];
  const connectedNodes = allNodes.filter(n => node.connectedNodeIds.includes(n.id));

  return (
    <div className="bg-[#FAF8F5] border border-[#E8E4D9] p-5 shadow-lg max-h-[85vh] overflow-y-auto text-[#17212B] font-sans">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-[#E8E4D9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-[10px] font-semibold uppercase tracking-wider font-sans"
              style={{ 
                backgroundColor: typeConfig.bgLight, 
                color: typeConfig.color, 
                border: `1px solid ${typeConfig.border}` 
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: typeConfig.color }} />
              {typeConfig.label}
            </span>
            <span className="text-[11px] font-semibold text-[#5C6773] font-sans">
              {node.category}
            </span>
          </div>

          <h3 className="text-xl font-display font-bold text-[#17212B] tracking-tight">
            {node.name}
          </h3>
          <div className="text-xs text-[#5C6773] flex items-center gap-1 mt-0.5 font-sans">
            <MapPin className="w-3.5 h-3.5 text-[#5C6773] shrink-0" />
            <span>{node.corridor}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-[#5C6773] hover:text-[#17212B] hover:bg-[#E8E4D9] rounded-xs transition-colors cursor-pointer"
          aria-label="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-[#3E4A56] leading-relaxed mb-4 font-sans">
        {node.description}
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 p-3 bg-[#E8E4D9]/50 border border-[#E8E4D9] mb-4">
        <div>
          <div className="text-[10px] uppercase font-semibold text-[#5C6773] font-sans">Talent Base</div>
          <div className="text-base font-bold text-[#17212B] font-display">
            {node.talentCount.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#5C6773] font-sans">active pool</div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-semibold text-[#5C6773] font-sans">Open Demand</div>
          <div className="text-base font-bold text-[#2878A8] font-display">
            {node.openDemand.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#2878A8] font-sans">24-mo hiring</div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-semibold text-[#5C6773] font-sans">Skill Gap</div>
          <div className="text-base font-bold text-[#E58A32] font-display">
            {node.skillGapPercentage}%
          </div>
          <div className="text-[10px] text-[#E58A32] font-sans">curriculum gap</div>
        </div>
      </div>

      {/* Key Anchors */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans mb-2 flex items-center gap-1.5">
          <Building className="w-3 h-3 text-[#5C6773]" />
          <span>Anchor Institutions & Enterprises</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {node.anchors.map((anchor, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-xs text-[11px] font-medium bg-[#FAF8F5] text-[#17212B] border border-[#E8E4D9] font-sans"
            >
              {anchor}
            </span>
          ))}
        </div>
      </div>

      {/* Key In-demand Skills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#2878A8]" />
          <span>Critical Capabilities & In-Demand Skills</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {node.keySkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-xs text-[11px] font-medium bg-[#E8E4D9]/60 text-[#17212B] border border-[#E8E4D9] font-sans"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Connected Nodes */}
      {connectedNodes.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans mb-2 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-[#5C6773]" />
            <span>Interlinked Capability Corridors</span>
          </div>
          <div className="space-y-1.5">
            {connectedNodes.map((cNode) => (
              <button
                key={cNode.id}
                onClick={() => onSelectConnectedNode(cNode.id)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xs text-xs bg-[#FAF8F5] hover:bg-[#E8E4D9] text-[#17212B] transition-colors border border-[#E8E4D9] group cursor-pointer font-sans"
              >
                <div className="flex items-center gap-2 truncate">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: CLUSTER_TYPE_CONFIG[cNode.type].color }}
                  />
                  <span className="font-medium text-[#17212B] truncate">{cNode.name}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#2878A8] font-medium group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
