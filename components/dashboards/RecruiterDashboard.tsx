import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Compass, 
  Sparkles, 
  Building2, 
  UserCheck, 
  ArrowRight, 
  Mail, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { RecruiterProfile, CandidateProfile } from '../../types/auth';
import { SectorCategory } from '../../types';
import { DEMO_CANDIDATES } from '../../data/authDemoData';

interface RecruiterDashboardProps {
  recruiter: RecruiterProfile;
  onNavigateToMap: (targetHotspotId?: string) => void;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({
  recruiter,
  onNavigateToMap
}) => {
  const [activeTab, setActiveTab] = useState<'discovery' | 'requirements' | 'pipeline'>('discovery');
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState<SectorCategory | 'All'>('All');
  const [collegeFilter, setCollegeFilter] = useState<string>('All');
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(['cand-01']);

  // Filtered Candidates
  const filteredCandidates = DEMO_CANDIDATES.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cand.verifiedSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      cand.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'All' || cand.targetSector === sectorFilter;
    const matchesCollege = collegeFilter === 'All' || cand.college.includes(collegeFilter);
    return matchesSearch && matchesSector && matchesCollege;
  });

  const toggleShortlist = (candId: string) => {
    setShortlistedIds(prev => 
      prev.includes(candId) ? prev.filter(id => id !== candId) : [...prev, candId]
    );
  };

  return (
    <div className="w-full bg-[#FBFBFA] min-h-[calc(100vh-60px)] pb-16">
      
      {/* Top Recruiter Header */}
      <div className="bg-white border-b border-[#E5E2DC] px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={recruiter.avatarUrl}
                alt={recruiter.name}
                className="w-14 h-14 rounded-xs object-cover border-2 border-[#0F172A] shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#059669] border-2 border-white rounded-full flex items-center justify-center">
                <ShieldCheck className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] font-sans tracking-tight">
                  {recruiter.name}
                </h1>
                <span className="text-[10px] font-bold uppercase font-data px-2 py-0.5 rounded-xs bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                  RECRUITER PERSPECTIVE
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B] font-data mt-1">
                <span className="font-medium text-[#0F172A]">{recruiter.organization}</span>
                <span>•</span>
                <span>{recruiter.designation}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#EA580C]" /> {recruiter.clusterLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Central Map Action */}
          <button
            onClick={() => onNavigateToMap('mihan')}
            className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider font-data transition-all shadow-2xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Find Capabilities & Talent Across Nagpur</span>
          </button>

        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-[#F2F1EE] border-b border-[#E5E2DC] px-4 sm:px-8 sticky top-15 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 text-xs font-bold font-data uppercase tracking-wider">
          
          <button
            onClick={() => setActiveTab('discovery')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'discovery'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>TALENT DISCOVERY ({filteredCandidates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'requirements'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#059669]" />
            <span>SKILL REQUIREMENTS ({recruiter.activeRequisitionsCount} REQS)</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2.5 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pipeline'
                ? 'bg-white text-[#0F172A] shadow-xs border border-[#E5E2DC]'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>CANDIDATE PIPELINE ({shortlistedIds.length})</span>
          </button>

        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        
        {/* ========================================================
            TAB 1: TALENT DISCOVERY
           ======================================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Search & Filter Bar */}
            <div className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search candidate by skill (e.g. Python, Avionics, BMS, VLSI, CNC), name or college..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs text-xs font-data text-[#0F172A] focus:outline-hidden focus:border-[#0F172A]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={sectorFilter}
                    onChange={(e) => setSectorFilter(e.target.value as any)}
                    className="px-3 py-2 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs text-xs font-data focus:outline-hidden"
                  >
                    <option value="All">All Sectors</option>
                    <option value="IT & Cloud">IT & Cloud</option>
                    <option value="Aerospace & Defence">Aerospace & Defence</option>
                    <option value="EV & Mobility">EV & Mobility</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>

                  <select
                    value={collegeFilter}
                    onChange={(e) => setCollegeFilter(e.target.value)}
                    className="px-3 py-2 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs text-xs font-data focus:outline-hidden"
                  >
                    <option value="All">All Institutions</option>
                    <option value="VNIT">VNIT Nagpur</option>
                    <option value="IIIT">IIIT Nagpur</option>
                    <option value="GCOEN">GCOEN</option>
                    <option value="Ramdeobaba">Ramdeobaba University</option>
                    <option value="YCCE">YCCE Nagpur</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCandidates.map((cand) => {
                const isShortlisted = shortlistedIds.includes(cand.id);
                return (
                  <div key={cand.id} className="bg-white border border-[#E5E2DC] p-5 rounded-xs shadow-2xs hover:border-[#0F172A] transition-all flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={cand.avatarUrl}
                            alt={cand.name}
                            className="w-12 h-12 rounded-xs object-cover border border-[#E5E2DC]"
                          />
                          <div>
                            <h3 className="text-sm font-bold text-[#0F172A] font-sans">
                              {cand.name}
                            </h3>
                            <span className="text-[11px] text-[#64748B] font-data block">
                              {cand.degree} • Class of {cand.graduationYear}
                            </span>
                            <span className="text-[10px] text-[#2563EB] font-data font-medium flex items-center gap-1">
                              <GraduationCap className="w-3 h-3" /> {cand.college}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded-xs border border-[#A7F3D0] font-data block">
                            {cand.matchScore}% Match
                          </span>
                          <span className="text-[9px] text-[#64748B] font-data mt-0.5 block">
                            Assessment: {cand.assessmentScore}/100
                          </span>
                        </div>
                      </div>

                      {/* Verified Skills */}
                      <div className="mt-3.5 space-y-1">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase font-data block">Verified Skills:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {cand.verifiedSkills.map((sk, sIdx) => (
                            <span key={sIdx} className="text-[10px] font-medium bg-[#F8FAFC] text-[#0F172A] px-2 py-0.5 rounded-xs border border-[#E5E2DC] font-data">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 text-[10px] text-[#64748B] font-data">
                        <span>Preferred Corridor: <strong>{cand.preferredCorridor}</strong></span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E5E2DC] flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs font-data border ${
                        cand.readinessStatus === 'Ready for Interview' ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]' : 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]'
                      }`}>
                        {cand.readinessStatus}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleShortlist(cand.id)}
                          className={`px-3 py-1.5 rounded-xs text-[10px] font-bold uppercase tracking-wider font-data cursor-pointer transition-all border ${
                            isShortlisted
                              ? 'bg-[#0F172A] text-white border-[#0F172A]'
                              : 'bg-white text-[#0F172A] border-[#E5E2DC] hover:border-[#0F172A]'
                          }`}
                        >
                          {isShortlisted ? 'Shortlisted ✓' : 'Shortlist'}
                        </button>
                        <button
                          onClick={() => alert(`Interview invite dispatched to ${cand.name} (${cand.college}).`)}
                          className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xs text-[10px] font-bold uppercase tracking-wider font-data cursor-pointer"
                        >
                          Invite
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: SKILL REQUIREMENTS
           ======================================================== */}
        {activeTab === 'requirements' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-4">
              <div>
                <h2 className="text-base font-bold text-[#0F172A] font-sans">
                  Active Requisitions & Nagpur Corridor Alignments
                </h2>
                <p className="text-xs text-[#64748B] font-data">
                  Requisitions linked directly to feeder institutions and capability clusters
                </p>
              </div>
              <button
                onClick={() => alert('New requisition creator (Demo Prototype)')}
                className="px-3.5 py-1.5 bg-[#0F172A] text-white text-xs font-bold font-data uppercase tracking-wider rounded-xs cursor-pointer"
              >
                + Post Requisition
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] font-sans">
                      Avionics MRO Systems Engineer (Associate)
                    </h3>
                    <span className="text-[10px] text-[#64748B] font-data">
                      MIHAN SEZ Aviation Corridor • 4 Open Headcounts • ₹9.5L – ₹14.0L
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-xs border border-[#A7F3D0] font-data">
                    18 Matched Candidates
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E5E2DC] text-[10px] font-data">
                  <span className="text-[#475569]">Required: AS9100, Avionics Telemetry, Embedded C/C++</span>
                  <button onClick={() => onNavigateToMap('mihan')} className="text-[#2563EB] hover:underline font-bold">
                    View MIHAN Cluster on Map →
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A] font-sans">
                      Cloud Native Platform & Kubernetes Specialist
                    </h3>
                    <span className="text-[10px] text-[#64748B] font-data">
                      MIHAN SEZ / IT Corridor • 6 Open Headcounts • ₹11.0L – ₹16.5L
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-xs border border-[#A7F3D0] font-data">
                    24 Matched Candidates
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E5E2DC] text-[10px] font-data">
                  <span className="text-[#475569]">Required: Kubernetes, Golang/Python, Docker, Distributed Tracing</span>
                  <button onClick={() => onNavigateToMap('it-park')} className="text-[#2563EB] hover:underline font-bold">
                    View Gayatri Nagar IT Park on Map →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: CANDIDATE PIPELINE
           ======================================================== */}
        {activeTab === 'pipeline' && (
          <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-2xs space-y-4 animate-in fade-in duration-200">
            <h2 className="text-base font-bold text-[#0F172A] font-sans">
              Shortlisted Candidates ({shortlistedIds.length})
            </h2>
            <div className="space-y-3">
              {DEMO_CANDIDATES.filter(c => shortlistedIds.includes(c.id)).map((cand) => (
                <div key={cand.id} className="p-4 bg-[#FBFBFA] border border-[#E5E2DC] rounded-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={cand.avatarUrl} alt={cand.name} className="w-10 h-10 rounded-xs object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] font-sans">{cand.name}</h4>
                      <span className="text-[10px] text-[#64748B] font-data">{cand.college} • {cand.degree}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Interview scheduled with ${cand.name}`)}
                    className="px-3 py-1.5 bg-[#0F172A] text-white text-[10px] font-bold uppercase tracking-wider rounded-xs font-data cursor-pointer"
                  >
                    Schedule Round 1
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
