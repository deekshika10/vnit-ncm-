import React, { useState } from 'react';
import { 
  Landmark, 
  Users, 
  Award, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Building2, 
  BarChart3, 
  Layers, 
  GraduationCap, 
  Info,
  ChevronRight,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { DeanProfile } from '../../types/auth';

interface DeanDashboardProps {
  dean: DeanProfile;
  onNavigateToMap: (targetHotspotId?: string) => void;
}

export const DeanDashboard: React.FC<DeanDashboardProps> = ({
  dean,
  onNavigateToMap
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gaps' | 'demand' | 'readiness'>('overview');

  return (
    <div className="w-full bg-[#FBFBFA] min-h-[calc(100vh-60px)] pb-16">
      
      {/* Top Dean Header */}
      <div className="bg-white border-b border-[#E5E2DC] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={dean.avatarUrl}
                alt={dean.name}
                className="w-14 h-14 rounded-xs object-cover border-2 border-[#0F172A] shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#4F46E5] border-2 border-white rounded-full flex items-center justify-center">
                <Landmark className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] font-sans tracking-tight">
                  {dean.name}
                </h1>
                <span className="text-[10px] font-bold uppercase font-data px-2 py-0.5 rounded-xs bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]">
                  DEAN / INSTITUTION PERSPECTIVE
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B] font-data mt-1">
                <span className="font-medium text-[#0F172A]">{dean.institution}</span>
                <span>•</span>
                <span>{dean.designation}</span>
                <span>•</span>
                <span className="text-[#4F46E5] font-medium">{dean.cohortYear}</span>
              </div>
            </div>
          </div>

          {/* Central Map Action */}
          <button
            onClick={() => onNavigateToMap('vnit')}
            className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider font-data transition-all shadow-2xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Understand Institutional Capability on Map</span>
          </button>

        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#F2F1EE] border-b border-[#E5E2DC] px-4 sm:px-8 sticky top-15 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 text-xs font-bold font-data uppercase tracking-wider">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>STUDENT CAPABILITY ({dean.totalStudentsAssessed} ASSESSED)</span>
          </button>

          <button
            onClick={() => setActiveTab('gaps')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'gaps'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>CURRICULUM SKILL GAPS</span>
          </button>

          <button
            onClick={() => setActiveTab('demand')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'demand'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#059669]" />
            <span>INDUSTRY HIRING DEMAND</span>
          </button>

          <button
            onClick={() => setActiveTab('readiness')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'readiness'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>PLACEMENT READINESS</span>
          </button>

        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-6">
        
        {/* Prototype Metric Notice */}
        <div className="p-3 bg-[#EEF2FF] border border-[#C7D2FE] rounded-xs text-xs text-[#4338CA] font-data flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Institutional Analytics Prototype: Metrics aggregate student assessment results across departments to assist deans in curriculum modernization and employer corridor matching.
          </span>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-data">
              STUDENTS ASSESSED
            </span>
            <div className="text-2xl font-bold text-[#0F172A] font-data mt-1">1,420</div>
            <span className="text-[11px] text-[#059669] font-data font-medium">84% Cohort Coverage</span>
          </div>

          <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-data">
              TIER-1 READINESS
            </span>
            <div className="text-2xl font-bold text-[#0F172A] font-data mt-1">78.4%</div>
            <span className="text-[11px] text-[#2563EB] font-data font-medium">+6.2% vs Previous Year</span>
          </div>

          <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-data">
              ACTIVE INDUSTRY HUBS
            </span>
            <div className="text-2xl font-bold text-[#0F172A] font-data mt-1">6 Hubs</div>
            <span className="text-[11px] text-[#64748B] font-data">MIHAN, Hingna, Butibori</span>
          </div>

          <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-data">
              CRITICAL GAPS IDENTIFIED
            </span>
            <div className="text-2xl font-bold text-[#EA580C] font-data mt-1">3 Areas</div>
            <span className="text-[11px] text-[#EA580C] font-data font-medium">Kubernetes, Avionics, BMS</span>
          </div>
        </div>

        {/* Main Tab Panels */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Department Capability Scores */}
            <div className="bg-white border border-[#E5E2DC] p-5 rounded-xs shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                Department Capability Breakdown
              </h3>

              <div className="space-y-3 font-data text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1 text-[#0F172A]">
                    <span>Computer Science & Engineering (420 Students)</span>
                    <span className="text-[#2563EB]">88% Tier-1 Ready</span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '88%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1 text-[#0F172A]">
                    <span>Electronics & Communication (340 Students)</span>
                    <span className="text-[#4F46E5]">82% Tier-1 Ready</span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4F46E5] rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1 text-[#0F172A]">
                    <span>Mechanical Engineering (380 Students)</span>
                    <span className="text-[#EA580C]">74% Tier-1 Ready</span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#EA580C] rounded-full" style={{ width: '74%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1 text-[#0F172A]">
                    <span>Electrical & Power Systems (280 Students)</span>
                    <span className="text-[#059669]">76% Tier-1 Ready</span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#059669] rounded-full" style={{ width: '76%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Corridor Placement Feeder */}
            <div className="bg-white border border-[#E5E2DC] p-5 rounded-xs shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                Corridor Placement Alignment
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs flex items-center justify-between text-xs font-data">
                  <div>
                    <span className="font-bold text-[#0F172A] block">MIHAN SEZ Tech & Aerospace Corridor</span>
                    <span className="text-[#64748B]">TCS, Boeing MRO, Infosys, Dassault Reliance</span>
                  </div>
                  <button onClick={() => onNavigateToMap('mihan')} className="text-[#2563EB] hover:underline font-bold">
                    Inspect Corridor →
                  </button>
                </div>

                <div className="p-3 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs flex items-center justify-between text-xs font-data">
                  <div>
                    <span className="font-bold text-[#0F172A] block">Butibori EV & Heavy Powertrain Hub</span>
                    <span className="text-[#64748B]">Mahindra EV, Heavy Fabricators, Gigafactory Cells</span>
                  </div>
                  <button onClick={() => onNavigateToMap('butibori')} className="text-[#2563EB] hover:underline font-bold">
                    Inspect Corridor →
                  </button>
                </div>

                <div className="p-3 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs flex items-center justify-between text-xs font-data">
                  <div>
                    <span className="font-bold text-[#0F172A] block">Gayatri Nagar IT Park SaaS Cluster</span>
                    <span className="text-[#64748B]">Persistent Systems, FinTech & Enterprise SaaS</span>
                  </div>
                  <button onClick={() => onNavigateToMap('it-park')} className="text-[#2563EB] hover:underline font-bold">
                    Inspect Corridor →
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'gaps' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] font-sans">
              Curriculum Modernization Recommendations
            </h3>
            <div className="space-y-3 text-xs font-data">
              <div className="p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-xs space-y-1">
                <span className="font-bold text-[#C2410C] block">1. Cloud-Native & Kubernetes Infrastructure</span>
                <p className="text-[#7C2D12]">
                  MIHAN IT employers report a 22% shortfall in production Helm chart and cluster orchestration skills. Recommend establishing an elective with TCS Cloud CoE.
                </p>
              </div>

              <div className="p-4 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xs space-y-1">
                <span className="font-bold text-[#1D4ED8] block">2. FAA/DGCA Avionics MRO Standards</span>
                <p className="text-[#1E40AF]">
                  Recommend adding hands-on DO-178C testing lab modules at VNIT Siemens Center of Excellence for Boeing/Air India pipelines.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'demand' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] font-sans">
              Real-Time Nagpur Employer Hiring Trends
            </h3>
            <p className="text-xs text-[#64748B] font-data">
              Demand forecasted across 68,000+ open technical requisitions in Nagpur over the next 24 months.
            </p>
            <div className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs text-xs font-data flex items-center justify-between">
              <span>Aerospace & Defense MRO Requisitions</span>
              <span className="font-bold text-[#059669]">+34% YoY Demand</span>
            </div>
            <div className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs text-xs font-data flex items-center justify-between">
              <span>EV Battery BMS & Power Electronics</span>
              <span className="font-bold text-[#059669]">+42% YoY Demand</span>
            </div>
          </div>
        )}

        {activeTab === 'readiness' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] font-sans">
              2026–2027 Cohort Placement Readiness Metrics
            </h3>
            <p className="text-xs text-[#64748B] font-data">
              Average starting salary target: ₹8.5L – ₹18.0L across MIHAN SEZ and Butibori industrial estates.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
