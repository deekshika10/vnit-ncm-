import React, { useState } from 'react';
import { 
  User, 
  Award, 
  FileText, 
  Briefcase, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  UploadCloud, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Filter, 
  MapPin, 
  GraduationCap, 
  Building2, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  Zap,
  Info,
  X,
  Target,
  BookOpen
} from 'lucide-react';
import { StudentProfile, VaultDocument, VaultDocumentCategory, Opportunity } from '../../types/auth';
import { SectorCategory } from '../../types';
import { SKILL_ASSESSMENT_QUESTIONS, DEMO_OPPORTUNITIES } from '../../data/authDemoData';
import { 
  submitApplication, 
  getStudentApplications, 
  hasStudentApplied, 
  ApplicationRecord 
} from '../../services/authStorageService';

interface StudentDashboardProps {
  student: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onNavigateToMap: (targetHotspotId?: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  onUpdateProfile,
  onNavigateToMap
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'skills' | 'assessment' | 'vault' | 'opportunities' | 'applications'>('overview');

  // Applications State
  const [studentApplications, setStudentApplications] = useState<ApplicationRecord[]>(() => getStudentApplications(student.id));
  const [applicationToast, setApplicationToast] = useState<string | null>(null);

  // Skill Assessment State
  const [assessmentStep, setAssessmentStep] = useState<number>(0); // 0 = start screen, 1..10 = questions, 11 = results
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [assessmentResult, setAssessmentResult] = useState(student.assessmentResult);

  // Document Vault State
  const [vaultFilter, setVaultFilter] = useState<VaultDocumentCategory | 'All'>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocCategory, setNewDocCategory] = useState<VaultDocumentCategory>('Resume');
  const [newDocType, setNewDocType] = useState('PDF Document');

  // Opportunities State
  const [oppSectorFilter, setOppSectorFilter] = useState<SectorCategory | 'All'>('All');
  const [oppSkillFilter, setOppSkillFilter] = useState<string>('All');
  const [savedOppIds, setSavedOppIds] = useState<string[]>(student.savedOpportunities || []);

  // Refresh student applications
  const refreshApplications = () => {
    setStudentApplications(getStudentApplications(student.id));
  };

  // Handle Apply for an Opportunity / Course
  const handleApplyOpportunity = (opp: Opportunity) => {
    const result = submitApplication(student, {
      id: opp.id,
      title: opp.title,
      organization: opp.organization,
      orgType: opp.orgType,
      location: opp.location,
      stipendOrSalary: opp.stipendOrSalary
    });

    if (result.success) {
      setApplicationToast(`APPLICATION SUBMITTED ✓ (${opp.title} at ${opp.organization})`);
      refreshApplications();
      setTimeout(() => setApplicationToast(null), 4000);
    } else {
      setApplicationToast(result.message);
      setTimeout(() => setApplicationToast(null), 3000);
    }
  };

  // Handle Assessment Answer Selection
  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  // Complete Assessment
  const handleCompleteAssessment = () => {
    const calculatedScores = [
      { category: 'Technical Skills', score: 84, maxScore: 100, level: 'Proficient' as const, description: 'Solid systems programming, backend architectures, and API design.' },
      { category: 'Problem Solving', score: 88, maxScore: 100, level: 'Advanced' as const, description: 'High algorithmic deduction and structured root-cause debugging.' },
      { category: 'Communication', score: 72, maxScore: 100, level: 'Developing' as const, description: 'Effective technical briefs; ready to expand cross-functional presentation skills.' },
      { category: 'Design & UX', score: 65, maxScore: 100, level: 'Developing' as const, description: 'Understands spatial information hierarchy and component states.' },
      { category: 'Leadership & Teamwork', score: 62, maxScore: 100, level: 'Developing' as const, description: 'Collaborative contributor with emerging architecture ownership.' },
      { category: 'Nagpur Industry Alignment', score: 80, maxScore: 100, level: 'Proficient' as const, description: 'High capability fit for MIHAN SEZ aerospace and IT Park SaaS clusters.' },
    ];

    const newResult = {
      completedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      overallReadiness: 81,
      categoryScores: calculatedScores,
      strengths: [
        'Backend & Cloud Microservice Architecture',
        'Algorithmic Telemetry Optimization',
        'Containerized Deployment (Docker/K8s)'
      ],
      skillGaps: [
        {
          skill: 'Enterprise Kubernetes Governance',
          userLevel: 'Needs Development' as const,
          industryDemandLevel: 'Critical Shortage' as const,
          localCluster: 'MIHAN SEZ & Tech Corridor',
          gapDescription: 'High demand across Tier-1 IT delivery centers in MIHAN for multi-tenant cluster management.'
        },
        {
          skill: 'Avionics MRO Testing & Quality AS9100',
          userLevel: 'Needs Development' as const,
          industryDemandLevel: 'High Demand' as const,
          localCluster: 'MIHAN SEZ Aerospace Hub',
          gapDescription: 'Specialized testing protocols required for Boeing & Air India MRO hangars.'
        },
        {
          skill: 'High-Voltage EV BMS Telemetry',
          userLevel: 'Developing' as const,
          industryDemandLevel: 'High Demand' as const,
          localCluster: 'Butibori Heavy Industrial Hub',
          gapDescription: 'Lithium battery thermal modeling for heavy electric trucks.'
        },
        {
          skill: 'Full-Stack Data Engineering / Kafka',
          userLevel: 'Strong' as const,
          industryDemandLevel: 'High Demand' as const,
          localCluster: 'Gayatri Nagar IT Park',
          gapDescription: 'Real-time event streams for high-concurrency SaaS platforms.'
        }
      ],
      recommendedNextSkills: [
        {
          skill: 'Production Kubernetes & Helm Charts',
          category: 'Cloud Infrastructure',
          impact: 'Unlocks ₹12L+ Senior Cloud Engineer roles at MIHAN SEZ tech companies',
          relatedHotspotId: 'mihan',
          localTrainingAnchor: 'VNIT Siemens Center of Excellence + TCS Cloud Lab',
          estimatedTime: '4–6 Weeks'
        },
        {
          skill: 'High-Voltage EV BMS Telemetry',
          category: 'EV & Mobility',
          impact: 'High hiring demand at Butibori Industrial Gigafactory corridor',
          relatedHotspotId: 'butibori',
          localTrainingAnchor: 'VNIT Center of Excellence for E-Mobility',
          estimatedTime: '6 Weeks'
        },
        {
          skill: 'FastAPI Microservices with Kafka',
          category: 'Backend Architecture',
          impact: 'Direct alignment with Gayatri Nagar SaaS companies and Persistent Systems',
          relatedHotspotId: 'it-park',
          localTrainingAnchor: 'Persistent Systems Innovation Hub',
          estimatedTime: '3 Weeks'
        }
      ]
    };

    setAssessmentResult(newResult);
    setAssessmentStep(11);

    onUpdateProfile({
      ...student,
      assessmentStatus: 'completed',
      assessmentResult: newResult,
      profileCompletion: Math.min(100, student.profileCompletion + 15)
    });
  };

  // Add Document to Vault
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName) return;

    const newDoc: VaultDocument = {
      id: `doc-${Date.now()}`,
      name: newDocName.endsWith('.pdf') || newDocName.endsWith('.zip') ? newDocName : `${newDocName}.pdf`,
      category: newDocCategory,
      fileType: newDocType,
      fileSize: '1.2 MB',
      uploadDate: 'Today',
      isVerified: false,
      tags: [newDocCategory, 'Verified Student Upload']
    };

    const updatedDocs = [newDoc, ...student.documents];
    onUpdateProfile({
      ...student,
      documents: updatedDocs,
      profileCompletion: Math.min(100, student.profileCompletion + 5)
    });

    setNewDocName('');
    setIsUploadModalOpen(false);
  };

  // Remove Document
  const handleDeleteDocument = (docId: string) => {
    const updatedDocs = student.documents.filter(d => d.id !== docId);
    onUpdateProfile({
      ...student,
      documents: updatedDocs
    });
  };

  // Toggle Save Opportunity
  const handleToggleSaveOpp = (oppId: string) => {
    const nextSaved = savedOppIds.includes(oppId)
      ? savedOppIds.filter(id => id !== oppId)
      : [...savedOppIds, oppId];
    setSavedOppIds(nextSaved);
    onUpdateProfile({
      ...student,
      savedOpportunities: nextSaved
    });
  };

  // Filtered Documents
  const filteredDocuments = student.documents.filter(doc => 
    vaultFilter === 'All' || doc.category === vaultFilter
  );

  // Filtered Opportunities
  const filteredOpportunities = DEMO_OPPORTUNITIES.filter(opp => {
    const matchSector = oppSectorFilter === 'All' || opp.sector === oppSectorFilter;
    const matchSkill = oppSkillFilter === 'All' || opp.requiredSkills.some(s => s.toLowerCase().includes(oppSkillFilter.toLowerCase()));
    return matchSector && matchSkill;
  });

  return (
    <div className="w-full bg-[#F5F1E8] min-h-[calc(100vh-68px)] pb-20">
      
      {/* Top Banner / Student Hero Bar */}
      <div className="bg-[#FAF8F5] border-b border-[#E8E4D9] px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-14 h-14 rounded-xs object-cover border-2 border-[#17212B] shadow-2xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#3C9270] border-2 border-white rounded-full flex items-center justify-center" title="Active Student Profile">
                <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-bold text-[#17212B] font-sans tracking-tight">
                  {student.name}
                </h1>
                <span className="text-[10px] font-bold uppercase font-data px-2.5 py-0.5 rounded-xs bg-[#EBF3F8] text-[#2878A8] border border-[#BFDBFE]">
                  STUDENT PERSPECTIVE
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5C6773] font-data mt-1.5">
                <span className="flex items-center gap-1 text-[#17212B] font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#2878A8]" />
                  {student.college}
                </span>
                <span>•</span>
                <span>{student.degree} ({student.year})</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#5C6773]">
                  <MapPin className="w-3 h-3 text-[#E58A32]" /> {student.location}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion Meter & Map Anchor */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Completion Meter */}
            <div className="bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs px-4 py-2.5 flex items-center gap-3">
              <div>
                <div className="flex items-center justify-between gap-4 text-[10px] font-bold font-data text-[#5C6773] uppercase">
                  <span>Profile Completion</span>
                  <span className="text-[#17212B] font-bold">{student.profileCompletion}%</span>
                </div>
                <div className="w-36 h-2 bg-[#E8E4D9] rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-[#3C9270] transition-all duration-500 rounded-full"
                    style={{ width: `${student.profileCompletion}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Central Map Action */}
            <button
              onClick={() => onNavigateToMap('mihan')}
              className="inline-flex items-center gap-2 bg-[#17212B] hover:bg-[#253342] text-[#F5F1E8] px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider font-data transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
            >
              <Compass className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>See Where Your Skills Fit in Nagpur</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D9A441] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Tab Bar with Motivational Labels */}
      <div className="bg-[#E8E4D9] border-b border-[#D8D3C5] px-4 sm:px-8 sticky top-17 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none text-xs font-bold font-data uppercase tracking-wider">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-[#FAF8F5] text-[#17212B] shadow-2xs border border-[#D8D3C5]'
                : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#FAF8F5]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E58A32]" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-[#FAF8F5] text-[#17212B] shadow-2xs border border-[#D8D3C5]'
                : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#FAF8F5]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#2878A8]" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3.5 py-2 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'skills'
                ? 'bg-[#FAF8F5] text-[#17212B] shadow-2xs border border-[#D8D3C5]'
                : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#FAF8F5]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#3C9270]" />
            <span>Your Next Skill</span>
          </button>

          <button
            onClick={() => { setActiveTab('assessment'); if (!assessmentResult) setAssessmentStep(1); }}
            className={`px-3.5 py-2 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 relative ${
              activeTab === 'assessment'
                ? 'bg-[#FAF8F5] text-[#17212B] shadow-2xs border border-[#D8D3C5]'
                : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#FAF8F5]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#D9A441]" />
            <span>Discover Your Capability</span>
            {student.assessmentStatus !== 'completed' && (
              <span className="w-2 h-2 rounded-full bg-[#E58A32] animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3.5 py-2 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'vault'
                ? 'bg-[#FAF8F5] text-[#17212B] shadow-2xs border border-[#D8D3C5]'
                : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#FAF8F5]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#7467A8]" />
            <span>Document Vault ({student.documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`px-3.5 py-2 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'opportunities'
                ? 'bg-[#FAF8F5] text-[#17212B] shadow-2xs border border-[#D8D3C5]'
                : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#FAF8F5]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#3C9270]" />
            <span>Where You Fit</span>
          </button>

          <button
            onClick={() => { setActiveTab('applications'); refreshApplications(); }}
            className={`px-3.5 py-2 rounded-xs transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-[#FAF8F5] text-[#17212B] shadow-2xs border border-[#D8D3C5]'
                : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#FAF8F5]'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-[#2878A8]" />
            <span>My Applications ({studentApplications.length})</span>
          </button>

        </div>
      </div>

      {/* Floating Application Toast */}
      {applicationToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17212B] text-[#F5F1E8] px-5 py-3 rounded-xs border border-[#D9A441] shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 font-sans">
          <div className="w-6 h-6 rounded-full bg-[#3C9270] flex items-center justify-center text-white shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-[#D9A441] tracking-wide uppercase font-display">Status Update</div>
            <div>{applicationToast}</div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* ========================================================
            TAB 1: COMMAND CENTER / OVERVIEW
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Top 3 Metric Cards with Large Typographic Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              <div className="bg-white border border-[#E8E4DC] p-5 rounded-xs shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] font-data flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    Assessment Readiness
                  </span>
                  <Award className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl font-bold text-[#18181B] font-data">
                    {assessmentResult ? `${assessmentResult.overallReadiness}%` : 'Pending'}
                  </span>
                  <span className="text-xs font-semibold text-[#059669] font-data">
                    Tier-1 High Match
                  </span>
                </div>
                <p className="text-xs text-[#78716C] font-data pt-1">
                  Top readiness for MIHAN Cloud Native & Gayatri Nagar SaaS.
                </p>
              </div>

              <div className="bg-white border border-[#E8E4DC] p-5 rounded-xs shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] font-data flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                    Document Vault
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl font-bold text-[#18181B] font-data">
                    {student.documents.length} Files
                  </span>
                  <span className="text-xs font-semibold text-[#2563EB] font-data">
                    3 Verified
                  </span>
                </div>
                <p className="text-xs text-[#78716C] font-data pt-1">
                  Resume, AWS Cert & VNIT Gradecard ready for recruiters.
                </p>
              </div>

              <div className="bg-white border border-[#E8E4DC] p-5 rounded-xs shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] font-data flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                    Matched Opportunities
                  </span>
                  <Briefcase className="w-4 h-4 text-[#EA580C]" />
                </div>
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl font-bold text-[#18181B] font-data">
                    6 Active
                  </span>
                  <span className="text-xs font-semibold text-[#EA580C] font-data">
                    2 High Fit (&gt;90%)
                  </span>
                </div>
                <p className="text-xs text-[#78716C] font-data pt-1">
                  Persistent Systems & Tata Boeing MRO actively seeking candidates.
                </p>
              </div>

            </div>

            {/* Quick Action Hub & Regional Map Banner */}
            <div className="bg-[#18181B] text-[#FAF8F5] p-6 sm:p-7 rounded-xs border border-[#18181B] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#38BDF8] font-data">
                    Nagpur Spatial Alignment Engine
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight font-sans text-white">
                  Your CS & Cloud capabilities map directly to 3 economic corridors in Nagpur.
                </h3>
                <p className="text-xs text-[#A8A29E] font-data leading-relaxed">
                  Based on your skill profile and VNIT anchor, you have an 88% alignment with <strong>MIHAN SEZ Cloud Delivery</strong> and a 92% fit with <strong>Gayatri Nagar IT Park SaaS cluster</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <button
                  onClick={() => onNavigateToMap('it-park')}
                  className="px-4 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold font-data uppercase tracking-wider rounded-xs cursor-pointer transition-all shadow-2xs flex items-center gap-2 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span>Inspect IT Park (Gayatri Nagar)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigateToMap('mihan')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-data uppercase tracking-wider rounded-xs cursor-pointer transition-all border border-white/20 flex items-center gap-2 group"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Inspect MIHAN SEZ</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Two Column Grid: Recommended Next Skills + Saved Opportunities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recommended Next Skills */}
              <div className="bg-white border border-[#E8E4DC] p-6 rounded-xs shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#18181B] font-sans">
                      Targeted Up-skilling Pathways
                    </h3>
                    <p className="text-[11px] text-[#78716C] font-data">
                      High-leverage skills to bridge your current gap to Tier-1 roles
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className="text-[10px] font-bold text-[#2563EB] hover:underline font-data uppercase"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {assessmentResult?.recommendedNextSkills.map((rec, idx) => (
                    <div key={idx} className="p-4 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-[#18181B] font-sans">
                            {rec.skill}
                          </span>
                          <span className="text-[9px] font-medium text-[#2563EB] bg-[#EFF6FF] px-1.5 py-0.5 rounded-xs border border-[#BFDBFE] ml-2 font-data">
                            {rec.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#78716C] font-data">
                          {rec.estimatedTime}
                        </span>
                      </div>
                      
                      <p className="text-xs text-[#57534E] font-data leading-relaxed">
                        {rec.impact}
                      </p>

                      <div className="flex items-center justify-between pt-2 text-[10px] text-[#78716C] font-data border-t border-[#E8E4DC]">
                        <span>Anchor: <strong>{rec.localTrainingAnchor}</strong></span>
                        <button
                          onClick={() => onNavigateToMap(rec.relatedHotspotId)}
                          className="text-[#2563EB] hover:underline font-bold"
                        >
                          Locate Hotspot →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched Opportunities Preview */}
              <div className="bg-white border border-[#E8E4DC] p-6 rounded-xs shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#18181B] font-sans">
                      Top Matched Opportunities
                    </h3>
                    <p className="text-[11px] text-[#78716C] font-data">
                      Directly connected to your verified skills and target clusters
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('opportunities')}
                    className="text-[10px] font-bold text-[#2563EB] hover:underline font-data uppercase"
                  >
                    Explore ({DEMO_OPPORTUNITIES.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {DEMO_OPPORTUNITIES.slice(0, 3).map((opp) => (
                    <div key={opp.id} className="p-4 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xs font-bold text-[#18181B] font-sans">
                            {opp.title}
                          </h4>
                          <span className="text-[10px] text-[#78716C] font-data">
                            {opp.organization} • {opp.location}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-xs border border-[#A7F3D0] font-data shrink-0">
                          {opp.matchScore}% Match
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {opp.requiredSkills.map((sk, sIdx) => (
                          <span key={sIdx} className="text-[9px] font-medium bg-white text-[#57534E] px-1.5 py-0.5 border border-[#E8E4DC] rounded-xs font-data">
                            {sk}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 text-[10px] font-data border-t border-[#E8E4DC]">
                        <span className="text-[#059669] font-medium">{opp.stipendOrSalary}</span>
                        <button
                          onClick={() => onNavigateToMap(opp.capabilityHotspotId)}
                          className="text-[#2563EB] hover:underline font-bold"
                        >
                          View {opp.capabilityHotspotName} on Map →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: STUDENT PROFILE
           ======================================================== */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-xs shadow-2xs space-y-8 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#18181B] font-sans">
                  Student Capability Profile
                </h2>
                <p className="text-xs text-[#78716C] font-data mt-0.5">
                  Official academic credentials, technical skills, and target career interests
                </p>
              </div>
              <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-3.5 py-1 rounded-xs border border-[#A7F3D0] font-data self-start sm:self-auto">
                Profile Completion: {student.profileCompletion}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Academic Credentials */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#18181B] font-data border-b border-[#E8E4DC] pb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Academic Credentials</span>
                </h3>

                <div className="space-y-3.5 text-xs font-data">
                  <div>
                    <span className="text-[10px] font-bold text-[#78716C] uppercase block">College / University</span>
                    <span className="font-bold text-[#18181B] text-sm">{student.college}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#78716C] uppercase block">Degree & Branch</span>
                      <span className="font-medium text-[#18181B]">{student.degree}</span>
                      <span className="text-[#78716C] block text-[11px]">{student.branch}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#78716C] uppercase block">Year & Graduating Cohort</span>
                      <span className="font-medium text-[#18181B]">{student.year}</span>
                      <span className="text-[#78716C] block text-[11px]">Class of {student.graduationYear}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#78716C] uppercase block">Primary Campus Location</span>
                    <span className="font-medium text-[#18181B]">{student.location}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Career & Sector Interests */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#18181B] font-data border-b border-[#E8E4DC] pb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Strategic Career Interests</span>
                </h3>

                <div className="space-y-3.5">
                  <div>
                    <span className="text-[10px] font-bold text-[#78716C] uppercase block mb-1 font-data">Target Roles</span>
                    <div className="flex flex-wrap gap-1.5">
                      {student.careerInterests.map((role, idx) => (
                        <span key={idx} className="text-xs font-bold bg-[#EFF6FF] text-[#2563EB] px-2.5 py-1 rounded-xs border border-[#BFDBFE] font-data">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#78716C] uppercase block mb-1 font-data">Target Nagpur Sectors</span>
                    <div className="flex flex-wrap gap-1.5">
                      {student.targetSectors.map((sector, idx) => (
                        <span key={idx} className="text-xs font-medium bg-[#FAF8F5] text-[#18181B] px-2.5 py-1 rounded-xs border border-[#E8E4DC] font-data">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#78716C] uppercase block mb-1 font-data">Preferred Economic Corridors</span>
                    <div className="flex flex-wrap gap-1.5">
                      {student.targetLocations.map((loc, idx) => (
                        <span key={idx} className="text-xs font-medium bg-[#FFF7ED] text-[#EA580C] px-2.5 py-1 rounded-xs border border-[#FED7AA] font-data flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Skill Inventory Breakdown */}
            <div className="pt-6 border-t border-[#E8E4DC]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#18181B] font-data mb-4">
                Verified Skill Inventory ({student.skills.length} Capabilities)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {student.skills.map((skill, idx) => (
                  <div key={idx} className="p-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#18181B] font-sans block">{skill.name}</span>
                      <span className="text-[10px] text-[#78716C] font-data">{skill.category}</span>
                    </div>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-xs font-data border ${
                      skill.level === 'Advanced' ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]' :
                      skill.level === 'Intermediate' ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]' :
                      'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: YOUR NEXT SKILL ("Here's what could strengthen your profile")
           ======================================================== */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header & Gap Analysis intro */}
            <div className="bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-xs shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#18181B] font-sans">
                    Your Next Skill
                  </h2>
                  <p className="text-xs text-[#78716C] font-data mt-0.5">
                    Here's what could strengthen your profile against real-time demand in Nagpur economic corridors.
                  </p>
                </div>
                <button
                  onClick={() => { setActiveTab('assessment'); setAssessmentStep(1); }}
                  className="inline-flex items-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider font-data cursor-pointer self-start sm:self-auto group"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Discover Your Capability →</span>
                </button>
              </div>

              {/* Potential Skill Gaps Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-data">
                  <thead>
                    <tr className="border-b border-[#E8E4DC] bg-[#F5F3EF] text-[#57534E] uppercase font-bold text-[10px]">
                      <th className="py-3 px-3.5">Capability / Skill</th>
                      <th className="py-3 px-3.5">Your Current Status</th>
                      <th className="py-3 px-3.5">Nagpur Industry Demand</th>
                      <th className="py-3 px-3.5">Primary Hotspot</th>
                      <th className="py-3 px-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E4DC]">
                    {assessmentResult?.skillGaps.map((gap, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF8F5]">
                        <td className="py-3.5 px-3.5">
                          <span className="font-bold text-[#18181B] block">{gap.skill}</span>
                          <span className="text-[10px] text-[#78716C]">{gap.gapDescription}</span>
                        </td>
                        <td className="py-3.5 px-3.5">
                          <span className={`inline-block px-2 py-0.5 rounded-xs font-bold text-[10px] border ${
                            gap.userLevel === 'Strong' ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]' :
                            gap.userLevel === 'Developing' ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]' :
                            'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]'
                          }`}>
                            {gap.userLevel}
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5">
                          <span className="font-medium text-[#18181B]">{gap.industryDemandLevel}</span>
                        </td>
                        <td className="py-3.5 px-3.5">
                          <span className="text-[#78716C]">{gap.localCluster}</span>
                        </td>
                        <td className="py-3.5 px-3.5 text-right">
                          <button
                            onClick={() => onNavigateToMap('mihan')}
                            className="text-[#2563EB] hover:underline font-bold text-[11px] cursor-pointer"
                          >
                            Explore Map →
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Recommended Next Skills Grid */}
            <div className="bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-xs shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-[#18181B] font-sans">
                Recommended Next Skills & Local Feeder Anchors
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {assessmentResult?.recommendedNextSkills.map((rec, idx) => (
                  <div key={idx} className="p-4.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#18181B] font-sans">{rec.skill}</span>
                        <span className="text-[9px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-xs border border-[#BFDBFE] font-data">
                          {rec.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#57534E] font-data mt-2 leading-relaxed">
                        {rec.impact}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E8E4DC] space-y-1.5 text-[11px] font-data">
                      <div>
                        <span className="text-[#78716C] block text-[10px] uppercase font-bold">Local Training Anchor:</span>
                        <span className="font-medium text-[#18181B]">{rec.localTrainingAnchor}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[#78716C]">Duration: {rec.estimatedTime}</span>
                        <button
                          onClick={() => onNavigateToMap(rec.relatedHotspotId)}
                          className="text-[#2563EB] hover:underline font-bold"
                        >
                          View Hotspot →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 4: DISCOVER YOUR CAPABILITY ("See where your current skills could take you")
           ======================================================== */}
        {activeTab === 'assessment' && (
          <div className="bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6 animate-in fade-in duration-200">
            
            {/* Assessment Intro */}
            {assessmentStep === 0 && (
              <div className="max-w-2xl mx-auto text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-xs bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2563EB] font-data">
                    Interactive Evaluation
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] font-sans mt-1">
                    Discover Your Capability
                  </h2>
                  <p className="text-xs text-[#78716C] font-data mt-1.5 max-w-md mx-auto leading-relaxed">
                    See where your current skills could take you across technical, problem solving, and regional industry domains.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs text-[11px] text-[#57534E] font-data text-left max-w-md mx-auto flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>
                    10 scenario-based questions mapped to Nagpur’s high-growth clusters (MIHAN Aerospace, Butibori EV, and Gayatri Nagar SaaS).
                  </span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setAssessmentStep(1)}
                    className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white px-6 py-3 rounded-xs text-xs font-bold uppercase tracking-wider font-data cursor-pointer shadow-2xs group"
                  >
                    <span>Start Capability Assessment</span>
                    <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Questions Step (1..10) */}
            {assessmentStep >= 1 && assessmentStep <= 10 && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Progress Header */}
                <div className="space-y-2 border-b border-[#E8E4DC] pb-4">
                  <div className="flex items-center justify-between text-xs font-bold font-data">
                    <span className="text-[#18181B]">
                      Question {assessmentStep} of 10
                    </span>
                    <span className="text-[#2563EB] uppercase">
                      Category: {SKILL_ASSESSMENT_QUESTIONS[assessmentStep - 1].category}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E2DDD5] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#2563EB] transition-all duration-300 rounded-full"
                      style={{ width: `${(assessmentStep / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Body */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] font-sans leading-snug">
                      {SKILL_ASSESSMENT_QUESTIONS[assessmentStep - 1].question}
                    </h3>
                    <p className="text-xs text-[#78716C] font-data mt-1 italic">
                      Context: {SKILL_ASSESSMENT_QUESTIONS[assessmentStep - 1].context}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 pt-2">
                    {SKILL_ASSESSMENT_QUESTIONS[assessmentStep - 1].options.map((opt, optIdx) => {
                      const isSelected = userAnswers[assessmentStep] === optIdx;
                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(assessmentStep, optIdx)}
                          className={`p-4 rounded-xs border-2 transition-all cursor-pointer text-xs font-data flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-[#EFF6FF] border-[#2563EB] text-[#18181B] font-medium shadow-xs'
                              : 'bg-white hover:bg-[#FAF8F5] border-[#E8E4DC] text-[#57534E]'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-[#CBD5E1]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div className="flex-1">
                            <span className="leading-relaxed block">{opt.text}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DC]">
                  <button
                    disabled={assessmentStep === 1}
                    onClick={() => setAssessmentStep(prev => prev - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E8E4DC] rounded-xs text-xs font-bold text-[#78716C] hover:text-[#18181B] font-data disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  {assessmentStep < 10 ? (
                    <button
                      onClick={() => setAssessmentStep(prev => prev + 1)}
                      className="inline-flex items-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white px-5 py-2 rounded-xs text-xs font-bold uppercase tracking-wider font-data cursor-pointer group"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ) : (
                    <button
                      onClick={handleCompleteAssessment}
                      className="inline-flex items-center gap-1.5 bg-[#059669] hover:bg-[#047857] text-white px-6 py-2 rounded-xs text-xs font-bold uppercase tracking-wider font-data cursor-pointer shadow-xs"
                    >
                      <span>View Capability Summary</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* Results Step (11) */}
            {assessmentStep === 11 && assessmentResult && (
              <div className="space-y-6">
                
                <div className="border-b border-[#E8E4DC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#059669] font-data">
                      Assessment Completed • {assessmentResult.completedAt}
                    </span>
                    <h2 className="text-lg font-bold text-[#18181B] font-sans mt-0.5">
                      Your Capability Profile Summary
                    </h2>
                    <p className="text-xs text-[#78716C] font-data">
                      Illustrative prototype assessment benchmarking your competencies against Nagpur industrial requirements.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAssessmentStep(1)}
                      className="text-xs font-bold text-[#78716C] hover:text-[#18181B] font-data uppercase px-3.5 py-1.5 border border-[#E8E4DC] rounded-xs cursor-pointer hover:bg-[#FAF8F5]"
                    >
                      Retake
                    </button>
                    <button
                      onClick={() => onNavigateToMap('mihan')}
                      className="inline-flex items-center gap-1.5 bg-[#18181B] text-white text-xs font-bold font-data px-4 py-1.5 rounded-xs uppercase cursor-pointer"
                    >
                      <Compass className="w-3 h-3 text-[#38BDF8]" />
                      Explore on Map →
                    </button>
                  </div>
                </div>

                {/* Capability Visual Bar Meters */}
                <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-6 rounded-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#18181B] font-data">
                      YOUR CAPABILITY PROFILE (ILLUSTRATIVE BENCHMARK)
                    </h3>
                    <span className="text-[10px] text-[#78716C] font-data">
                      Overall Readiness: <strong className="text-[#059669]">{assessmentResult.overallReadiness}%</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assessmentResult.categoryScores.map((cat, idx) => {
                      const fillUnits = Math.round(cat.score / 10);
                      const emptyUnits = 10 - fillUnits;
                      const visualBar = '█'.repeat(fillUnits) + '░'.repeat(emptyUnits);
                      
                      const catColor = 
                        cat.category === 'Technical Skills' ? '#2563EB' :
                        cat.category === 'Design & UX' ? '#7C3AED' :
                        cat.category === 'Problem Solving' ? '#059669' :
                        cat.category === 'Leadership & Teamwork' ? '#EA580C' :
                        '#E11D48';

                      return (
                        <div key={idx} className="p-4 bg-white border border-[#E8E4DC] rounded-xs space-y-2">
                          <div className="flex items-center justify-between text-xs font-data">
                            <span className="font-bold text-[#18181B] flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
                              {cat.category}
                            </span>
                            <span className="font-bold font-data" style={{ color: catColor }}>
                              {cat.score} / 100
                            </span>
                          </div>
                          
                          <div className="font-mono text-xs tracking-wider select-none font-bold" style={{ color: catColor }}>
                            {visualBar}
                          </div>

                          <p className="text-[11px] text-[#78716C] font-data">
                            {cat.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notice Tag */}
                <div className="p-3.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-xs text-[11px] text-[#B45309] font-data flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Prototype Assessment Notice:</strong> Self-paced demo score. These metrics showcase capability matching within Nagpur’s ecosystem and are mapped to real institutions and industrial hubs.
                  </span>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================
            TAB 5: DOCUMENT VAULT
           ======================================================== */}
        {activeTab === 'vault' && (
          <div className="bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#18181B] font-sans">
                  Document Vault
                </h2>
                <p className="text-xs text-[#78716C] font-data mt-0.5">
                  Secure local repository for verified credentials, project artifacts, transcripts, and portfolios
                </p>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white px-4 py-2 rounded-xs text-xs font-bold uppercase tracking-wider font-data cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-data">
              {(['All', 'Resume', 'Certificates', 'Projects', 'Portfolio', 'Academic Documents'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVaultFilter(cat)}
                  className={`px-3 py-1.5 rounded-xs uppercase font-bold tracking-wider transition-all cursor-pointer border ${
                    vaultFilter === cat
                      ? 'bg-[#18181B] text-white border-[#18181B]'
                      : 'bg-[#FAF8F5] text-[#78716C] hover:text-[#18181B] border-[#E8E4DC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Document Cards Grid */}
            {filteredDocuments.length === 0 ? (
              <div className="p-12 text-center border-2 border-dashed border-[#E8E4DC] rounded-xs bg-[#FAF8F5]">
                <FileText className="w-8 h-8 text-[#A8A29E] mx-auto mb-2" />
                <h3 className="text-sm font-bold text-[#18181B] font-sans">
                  Your documents will appear here.
                </h3>
                <p className="text-xs text-[#78716C] font-data mt-1">
                  Upload your resumes, certifications, and project files for Nagpur recruiters.
                </p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="mt-4 inline-flex items-center gap-1.5 bg-[#18181B] text-white px-4 py-2 rounded-xs text-xs font-bold font-data uppercase cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload First Document</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="p-4.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs flex flex-col justify-between hover:border-[#18181B] transition-all group shadow-2xs">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-8 h-8 rounded-xs bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 border border-[#BFDBFE]">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-xs bg-white border border-[#E8E4DC] text-[#78716C] font-data">
                          {doc.category}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-[#18181B] font-sans mt-3 break-all group-hover:text-[#2563EB] transition-colors">
                        {doc.name}
                      </h4>

                      <div className="flex items-center gap-2 text-[10px] text-[#78716C] font-data mt-1.5">
                        <span>{doc.fileType}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>{doc.uploadDate}</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {doc.tags.map((t, tIdx) => (
                          <span key={tIdx} className="text-[9px] bg-white text-[#57534E] px-1.5 py-0.2 rounded-xs border border-[#E8E4DC] font-data">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E8E4DC]">
                      {doc.isVerified ? (
                        <span className="text-[9px] font-bold text-[#059669] flex items-center gap-1 font-data">
                          <CheckCircle2 className="w-3 h-3" /> Verified Document
                        </span>
                      ) : (
                        <span className="text-[9px] text-[#78716C] font-data">
                          Local Prototype
                        </span>
                      )}

                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="text-[#A8A29E] hover:text-[#E11D48] transition-colors p-1 cursor-pointer"
                        title="Remove Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Modal */}
            {isUploadModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/70 backdrop-blur-xs animate-in fade-in">
                <div className="bg-white border border-[#E8E4DC] rounded-xs max-w-md w-full p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-3">
                    <h3 className="text-sm font-bold text-[#18181B] font-sans">
                      Upload Document to Vault
                    </h3>
                    <button onClick={() => setIsUploadModalOpen(false)} className="text-[#78716C] hover:text-[#18181B] cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddDocument} className="space-y-3 font-data text-xs">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#57534E] mb-1">
                        Document Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newDocName}
                        onChange={(e) => setNewDocName(e.target.value)}
                        placeholder="e.g. Avionics_MRO_Certification_2026.pdf"
                        className="w-full px-3 py-2 border border-[#E8E4DC] rounded-xs text-xs focus:outline-hidden focus:border-[#18181B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-[#57534E] mb-1">
                        Category
                      </label>
                      <select
                        value={newDocCategory}
                        onChange={(e) => setNewDocCategory(e.target.value as VaultDocumentCategory)}
                        className="w-full px-3 py-2 border border-[#E8E4DC] rounded-xs text-xs focus:outline-hidden"
                      >
                        <option value="Resume">Resume</option>
                        <option value="Certificates">Certificates</option>
                        <option value="Projects">Projects</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Academic Documents">Academic Documents</option>
                      </select>
                    </div>

                    <div className="p-4 border-2 border-dashed border-[#E8E4DC] rounded-xs bg-[#FAF8F5] text-center">
                      <UploadCloud className="w-6 h-6 text-[#2563EB] mx-auto mb-1" />
                      <span className="text-[11px] font-bold text-[#18181B] block">Simulated Local Upload</span>
                      <span className="text-[10px] text-[#78716C]">Files stored in reactive frontend state</span>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsUploadModalOpen(false)}
                        className="px-3.5 py-1.5 border border-[#E8E4DC] rounded-xs text-xs font-bold text-[#78716C] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#18181B] text-white rounded-xs text-xs font-bold uppercase font-data cursor-pointer"
                      >
                        Upload Document
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================
            TAB 6: WHERE YOU FIT ("Explore opportunities connected to your capabilities")
           ======================================================== */}
        {activeTab === 'opportunities' && (
          <div className="bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DC] pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#18181B] font-sans">
                  Where You Fit
                </h2>
                <p className="text-xs text-[#78716C] font-data mt-0.5">
                  Explore opportunities connected to your capabilities across Nagpur’s economic corridors.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#78716C] font-data">
                  Showing {filteredOpportunities.length} of {DEMO_OPPORTUNITIES.length} positions
                </span>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3 p-3.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs font-data text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#57534E] flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filters:
              </span>

              {/* Sector Filter */}
              <select
                value={oppSectorFilter}
                onChange={(e) => setOppSectorFilter(e.target.value as any)}
                className="px-2.5 py-1 bg-white border border-[#E8E4DC] rounded-xs text-xs focus:outline-hidden"
              >
                <option value="All">All Sectors</option>
                <option value="IT & Cloud">IT & Cloud</option>
                <option value="Aerospace & Defence">Aerospace & Defence</option>
                <option value="EV & Mobility">EV & Mobility</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="AgriTech">AgriTech</option>
              </select>

              {/* Skill Filter */}
              <select
                value={oppSkillFilter}
                onChange={(e) => setOppSkillFilter(e.target.value)}
                className="px-2.5 py-1 bg-white border border-[#E8E4DC] rounded-xs text-xs focus:outline-hidden"
              >
                <option value="All">All Skills</option>
                <option value="Python">Python & Cloud</option>
                <option value="Avionics">Avionics MRO</option>
                <option value="BMS">EV & BMS Safety</option>
                <option value="CNC">Precision CNC</option>
                <option value="Drone">Drone & AgriTech</option>
              </select>
            </div>

            {/* Opportunities List */}
            <div className="space-y-4">
              {filteredOpportunities.map((opp) => {
                const isSaved = savedOppIds.includes(opp.id);
                return (
                  <div 
                    key={opp.id} 
                    className="p-5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xs hover:border-[#18181B] transition-all space-y-3.5 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xs bg-[#18181B] text-white font-bold font-data text-xs flex items-center justify-center shrink-0 shadow-2xs">
                          {opp.logoText}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-bold text-[#18181B] font-sans">
                              {opp.title}
                            </h3>
                            {opp.featured && (
                              <span className="text-[9px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-xs border border-[#BFDBFE] font-data">
                                FEATURED CLUSTER
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-[#78716C] font-data mt-1">
                            <span className="font-medium text-[#18181B]">{opp.organization}</span>
                            <span>•</span>
                            <span>{opp.orgType}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#EA580C]" /> {opp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-xs border border-[#A7F3D0] font-data">
                          {opp.matchScore}% Match
                        </span>
                        <button
                          onClick={() => handleToggleSaveOpp(opp.id)}
                          className={`p-1.5 rounded-xs border transition-colors cursor-pointer ${
                            isSaved ? 'bg-[#18181B] text-white border-[#18181B]' : 'bg-white text-[#78716C] border-[#E8E4DC]'
                          }`}
                          title={isSaved ? 'Saved' : 'Save Opportunity'}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#57534E] font-data leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Required Skills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {opp.requiredSkills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-medium bg-white text-[#18181B] px-2 py-0.5 border border-[#E8E4DC] rounded-xs font-data">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Bottom Metadata & Map CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E8E4DC] text-xs font-data">
                      <div className="flex items-center gap-3 text-[#78716C]">
                        <span className="text-[#059669] font-bold">{opp.stipendOrSalary}</span>
                        <span>•</span>
                        <span>Deadline: {opp.deadline}</span>
                        <span>•</span>
                        <span>{opp.applicantsCount} Applicants</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigateToMap(opp.capabilityHotspotId)}
                          className="text-[#2878A8] hover:underline font-semibold text-xs flex items-center gap-1 cursor-pointer font-sans"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Locate on Map ({opp.capabilityHotspotName}) →</span>
                        </button>
                        
                        {hasStudentApplied(student.id, opp.id) ? (
                          <button
                            disabled
                            className="px-3.5 py-1.5 bg-[#EEF7F2] text-[#3C9270] border border-[#A7F3D0] rounded-xs font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 cursor-default font-sans"
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Applied ✓</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApplyOpportunity(opp)}
                            className="px-3.5 py-1.5 bg-[#17212B] text-[#F5F1E8] hover:bg-[#253342] rounded-xs font-bold uppercase tracking-wider text-[10px] cursor-pointer transition-colors shadow-2xs font-sans"
                          >
                            Apply Now →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 7: MY APPLICATIONS
           ======================================================== */}
        {activeTab === 'applications' && (
          <div className="bg-[#FAF8F5] border border-[#E8E4D9] p-6 sm:p-8 rounded-xs shadow-2xs space-y-6 animate-in fade-in duration-200 font-sans">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4D9] pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] block mb-1">
                  Candidate Pipeline Registry
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] font-display tracking-tight">
                  My Applications
                </h2>
                <p className="text-xs sm:text-sm text-[#3E4A56] mt-0.5">
                  Track your active requisitions submitted to enterprises, aerospace hangars, and labs across Nagpur.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#5C6773] bg-[#E8E4D9] px-3 py-1.5 rounded-xs">
                  Total Applications: <strong className="text-[#17212B]">{studentApplications.length}</strong>
                </span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white border border-[#E8E4D9] rounded-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#5C6773] block">Submitted</span>
                <span className="text-xl font-bold font-display text-[#17212B]">{studentApplications.length}</span>
              </div>
              <div className="p-3.5 bg-white border border-[#E8E4D9] rounded-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#E58A32] block">Under Review</span>
                <span className="text-xl font-bold font-display text-[#E58A32]">
                  {studentApplications.filter(a => a.status === 'Under Review').length}
                </span>
              </div>
              <div className="p-3.5 bg-white border border-[#E8E4D9] rounded-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase text-[#3C9270] block">Shortlisted / Active</span>
                <span className="text-xl font-bold font-display text-[#3C9270]">
                  {studentApplications.filter(a => a.status === 'Shortlisted' || a.status === 'Applied').length}
                </span>
              </div>
            </div>

            {/* Applications List */}
            {studentApplications.length === 0 ? (
              <div className="p-8 text-center bg-white border border-[#E8E4D9] rounded-xs space-y-3">
                <Briefcase className="w-8 h-8 text-[#9BA8B7] mx-auto" />
                <h3 className="text-sm font-bold text-[#17212B]">No applications submitted yet</h3>
                <p className="text-xs text-[#5C6773] max-w-sm mx-auto">
                  Explore positions connected to your skills in the "Where You Fit" section and submit your first application.
                </p>
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className="px-4 py-2 bg-[#17212B] text-[#F5F1E8] text-xs font-semibold rounded-xs uppercase tracking-wider cursor-pointer"
                >
                  Explore Opportunities →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {studentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 sm:p-5 bg-white border border-[#E8E4D9] rounded-xs hover:border-[#17212B] transition-all space-y-2 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-[#17212B] font-display">
                            {app.opportunityTitle}
                          </h4>
                          {app.orgType && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-xs bg-[#EBF3F8] text-[#2878A8]">
                              {app.orgType}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#5C6773] flex flex-wrap items-center gap-2 mt-1">
                          <span className="font-semibold text-[#17212B]">{app.organization}</span>
                          {app.location && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-[#E58A32]">
                                <MapPin className="w-3 h-3" /> {app.location}
                              </span>
                            </>
                          )}
                          {app.stipendOrSalary && (
                            <>
                              <span>•</span>
                              <span className="text-[#3C9270] font-semibold">{app.stipendOrSalary}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xs border ${
                          app.status === 'Under Review' ? 'bg-[#FCF3EA] text-[#E58A32] border-[#FED7AA]' :
                          app.status === 'Shortlisted' ? 'bg-[#EEF7F2] text-[#3C9270] border-[#A7F3D0]' :
                          'bg-[#EBF3F8] text-[#2878A8] border-[#BFDBFE]'
                        }`}>
                          ● {app.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8E4D9] text-[11px] text-[#78889B]">
                      <span>Applied on: <strong className="text-[#17212B]">{app.appliedAt}</strong></span>
                      <span className="font-mono text-[10px]">ID: {app.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
