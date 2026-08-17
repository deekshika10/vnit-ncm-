import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  TrendingUp, 
  Users, 
  Compass, 
  MapPin, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Info,
  BarChart2,
  Briefcase
} from 'lucide-react';
import { IndustryProfile } from '../../types/auth';

interface IndustryDashboardProps {
  industry: IndustryProfile;
  onNavigateToMap: (targetHotspotId?: string) => void;
}

export const IndustryDashboard: React.FC<IndustryDashboardProps> = ({
  industry,
  onNavigateToMap
}) => {
  const [activeTab, setActiveTab] = useState<'supply' | 'gaps' | 'collaborations'>('supply');

  return (
    <div className="w-full bg-[#FBFBFA] min-h-[calc(100vh-60px)] pb-16">
      
      {/* Top Industry Header */}
      <div className="bg-white border-b border-[#E5E2DC] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={industry.avatarUrl}
                alt={industry.name}
                className="w-14 h-14 rounded-xs object-cover border-2 border-[#0F172A] shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#EA580C] border-2 border-white rounded-full flex items-center justify-center">
                <Building2 className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] font-sans tracking-tight">
                  {industry.companyName}
                </h1>
                <span className="text-[10px] font-bold uppercase font-data px-2 py-0.5 rounded-xs bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                  INDUSTRY PERSPECTIVE
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B] font-data mt-1">
                <span className="font-medium text-[#0F172A]">{industry.name} (VP Operations)</span>
                <span>•</span>
                <span>Sector: {industry.sector}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#EA580C]" /> {industry.facilityLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Central Map Action */}
          <button
            onClick={() => onNavigateToMap('butibori')}
            className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider font-data transition-all shadow-2xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Discover Talent & Skill Ecosystems on Map</span>
          </button>

        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#F2F1EE] border-b border-[#E5E2DC] px-4 sm:px-8 sticky top-15 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 text-xs font-bold font-data uppercase tracking-wider">
          
          <button
            onClick={() => setActiveTab('supply')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'supply'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>REGIONAL TALENT SUPPLY</span>
          </button>

          <button
            onClick={() => setActiveTab('gaps')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gaps'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>SECTOR SKILL DEMAND & GAPS</span>
          </button>

          <button
            onClick={() => setActiveTab('collaborations')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'collaborations'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#059669]" />
            <span>ACADEMIA R&D COLLABORATIONS ({industry.rndCollaborationsCount})</span>
          </button>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-data">
              ANNUAL GRADUATING TALENT (NAGPUR)
            </span>
            <div className="text-2xl font-bold text-[#0F172A] font-data mt-1">28,400+</div>
            <span className="text-[11px] text-[#059669] font-data font-medium">Engineering & Tech Graduates</span>
          </div>

          <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-data">
              ACTIVE MANUFACTURING WORKFORCE
            </span>
            <div className="text-2xl font-bold text-[#0F172A] font-data mt-1">72,000+</div>
            <span className="text-[11px] text-[#64748B] font-data">Across Butibori & Hingna MIDC</span>
          </div>

          <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-data">
              ECOSYSTEM SYNERGY
            </span>
            <div className="text-2xl font-bold text-[#2563EB] font-data mt-1">4 Academic Labs</div>
            <span className="text-[11px] text-[#2563EB] font-data font-medium">VNIT, IIIT, IGTR, CICR</span>
          </div>
        </div>

        {/* Tab 1: Regional Supply */}
        {activeTab === 'supply' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] font-sans">
                  Vidarbha Regional Talent Supply by Specialization
                </h3>
                <p className="text-xs text-[#64748B] font-data">
                  Direct pipeline projections for 2026–2028 across engineering colleges and polytechnics
                </p>
              </div>
              <button onClick={() => onNavigateToMap('butibori')} className="text-xs font-bold text-[#2563EB] hover:underline font-data">
                View Butibori Hotspot on Map →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-data">
              <div className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs space-y-2">
                <span className="font-bold text-[#0F172A] block">1. EV Powertrain & Battery Cell Assembly</span>
                <span className="text-[#64748B] block">Feeder: VNIT CoE for E-Mobility + GCOEN Mechanical</span>
                <div className="flex items-center justify-between pt-1 border-t border-[#E5E2DC] text-[11px]">
                  <span className="text-[#059669] font-bold">1,850 Ready Candidates/Year</span>
                  <button onClick={() => onNavigateToMap('butibori')} className="text-[#2563EB] font-bold">Inspect Hotspot →</button>
                </div>
              </div>

              <div className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs space-y-2">
                <span className="font-bold text-[#0F172A] block">2. Precision CNC Tooling & Defence Casting</span>
                <span className="text-[#64748B] block">Feeder: Indo-German Tool Room (IGTR) Hingna + YCCE</span>
                <div className="flex items-center justify-between pt-1 border-t border-[#E5E2DC] text-[11px]">
                  <span className="text-[#059669] font-bold">2,400 Ready Technicians/Year</span>
                  <button onClick={() => onNavigateToMap('hingna')} className="text-[#2563EB] font-bold">Inspect Hotspot →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Sector Demand & Gaps */}
        {activeTab === 'gaps' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-[#0F172A] font-sans">
              Industry Modernization Benchmarks
            </h3>
            <p className="text-xs text-[#64748B] font-data">
              High-voltage EV telemetry and 5-axis CNC programming represent the primary skill bottlenecks for Butibori industrial expansion.
            </p>
          </div>
        )}

        {/* Tab 3: Collaborations */}
        {activeTab === 'collaborations' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-[#0F172A] font-sans">
              Joint Academic & Industry R&D Projects
            </h3>
            <div className="space-y-3 text-xs font-data">
              <div className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs space-y-1">
                <span className="font-bold text-[#0F172A] block">High-Voltage Thermal Simulation Lab</span>
                <span className="text-[#64748B]">Joint initiative between Mahindra EV Hub & VNIT Department of Mechanical Engineering</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
