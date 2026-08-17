export type ClusterType = 
  | 'talent_hub' 
  | 'industry_cluster' 
  | 'academic_anchor' 
  | 'skill_gap' 
  | 'growth_opportunity';

export type SectorCategory = 
  | 'IT & Cloud'
  | 'Aerospace & Defence'
  | 'Manufacturing'
  | 'Logistics'
  | 'Healthcare'
  | 'Education & Research'
  | 'EV & Mobility'
  | 'AgriTech'
  | 'Engineering';

export interface MapClusterNode {
  id: string;
  name: string;
  shortName: string;
  category: SectorCategory;
  type: ClusterType;
  x: number; // percentage in SVG coordinate space (0 - 100)
  y: number; // percentage in SVG coordinate space (0 - 100)
  size: 'large' | 'medium' | 'small';
  talentCount: number;
  openDemand: number;
  skillGapPercentage: number;
  description: string;
  corridor: string;
  anchors: string[];
  keySkills: string[];
  growthScore: number; // 1-100
  connectedNodeIds: string[];
}

export interface MapConnection {
  fromId: string;
  toId: string;
  label?: string;
  type: 'freight' | 'metro' | 'knowledge' | 'expressway';
}

export interface CityMetric {
  label: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  subtext: string;
  category: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  demandGrowth: string;
  supplyCount: number;
  demandCount: number;
  gapPercent: number;
  readinessLevel: 'High' | 'Moderate' | 'Critical Gap';
  topInstitutions: string[];
  topEmployers: string[];
  emergingSkills: string[];
}

export interface IndustryEcosystem {
  id: string;
  name: string;
  locationArea: string;
  tagline: string;
  category: SectorCategory;
  workforceSize: number;
  annualGrowth: string;
  primaryFocus: string[];
  keyAnchors: string[];
  infrastructureAssets: string[];
  talentDemandTrend: 'Accelerating' | 'Steady' | 'High Demand';
  description: string;
  mapNodeId?: string;
}

export interface TimelineMilestone {
  year: '2026' | '2028' | '2030';
  theme: string;
  headline: string;
  description: string;
  strategicProjection: string;
  keyIndicators: {
    metric: string;
    projected: string;
  }[];
}

export interface CareerStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  actionableInsights: string[];
  localExample: string;
}
