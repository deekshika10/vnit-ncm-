import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Landmark, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  MapPin,
  Building
} from 'lucide-react';
import { UserRole, UserProfile, StudentProfile, RecruiterProfile, DeanProfile, IndustryProfile } from '../types/auth';
import { SectorCategory } from '../types';
import { 
  DEMO_STUDENT_PROFILE, 
  DEMO_RECRUITER_PROFILE, 
  DEMO_DEAN_PROFILE, 
  DEMO_INDUSTRY_PROFILE 
} from '../data/authDemoData';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'register';
  initialRole?: UserRole;
  onClose: () => void;
  onAuthenticate: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signin',
  initialRole = 'student',
  onClose,
  onAuthenticate
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);

  // Form states for custom sign-in/register
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [institutionInput, setInstitutionInput] = useState('');
  const [degreeInput, setDegreeInput] = useState('B.Tech Computer Science');
  const [yearInput, setYearInput] = useState<'1st Year' | '2nd Year' | '3rd Year' | '4th Year'>('3rd Year');
  const [orgInput, setOrgInput] = useState('');
  const [sectorInput, setSectorInput] = useState<SectorCategory>('IT & Cloud');
  const [locationInput, setLocationInput] = useState('MIHAN SEZ, Nagpur');

  if (!isOpen) return null;

  // Handle Quick Demo Sign In
  const handleQuickDemoSignIn = (role: UserRole) => {
    switch (role) {
      case 'student':
        onAuthenticate(DEMO_STUDENT_PROFILE);
        break;
      case 'recruiter':
        onAuthenticate(DEMO_RECRUITER_PROFILE);
        break;
      case 'dean':
        onAuthenticate(DEMO_DEAN_PROFILE);
        break;
      case 'industry':
        onAuthenticate(DEMO_INDUSTRY_PROFILE);
        break;
    }
    onClose();
  };

  // Handle Custom Sign In Submission
  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to corresponding demo profile based on selected role
    handleQuickDemoSignIn(selectedRole);
  };

  // Handle Custom Registration Submission
  const handleCustomRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRole === 'student') {
      const newStudent: StudentProfile = {
        ...DEMO_STUDENT_PROFILE,
        id: `usr-student-${Date.now()}`,
        name: nameInput || 'New Student',
        email: emailInput || 'student@nagpur.edu.in',
        college: institutionInput || 'VNIT Nagpur',
        degree: degreeInput,
        year: yearInput,
        profileCompletion: 65,
        assessmentStatus: 'not_started',
        documents: []
      };
      onAuthenticate(newStudent);
    } else if (selectedRole === 'recruiter') {
      const newRecruiter: RecruiterProfile = {
        ...DEMO_RECRUITER_PROFILE,
        id: `usr-recruiter-${Date.now()}`,
        name: nameInput || 'Talent Lead',
        email: emailInput || 'recruiter@company.com',
        organization: orgInput || 'Aerospace MRO Hub',
        clusterLocation: locationInput
      };
      onAuthenticate(newRecruiter);
    } else if (selectedRole === 'dean') {
      const newDean: DeanProfile = {
        ...DEMO_DEAN_PROFILE,
        id: `usr-dean-${Date.now()}`,
        name: nameInput || 'Dean of Academics',
        email: emailInput || 'dean@institution.ac.in',
        institution: institutionInput || 'VNIT Nagpur'
      };
      onAuthenticate(newDean);
    } else {
      const newIndustry: IndustryProfile = {
        ...DEMO_INDUSTRY_PROFILE,
        id: `usr-industry-${Date.now()}`,
        name: nameInput || 'Operations Director',
        email: emailInput || 'operations@industry.com',
        companyName: orgInput || 'Mahindra Heavy Systems',
        sector: sectorInput,
        facilityLocation: locationInput
      };
      onAuthenticate(newIndustry);
    }
    onClose();
  };

  const PERSPECTIVES: Array<{
    role: UserRole;
    title: string;
    badge: string;
    icon: React.ElementType;
    description: string;
    color: string;
    accentBg: string;
  }> = [
    {
      role: 'student',
      title: 'STUDENT',
      badge: 'Talent & Skills',
      icon: GraduationCap,
      description: 'Discover your capabilities, evaluate skill gaps against Nagpur industry demand, build your document vault, and unlock curated local opportunities.',
      color: '#2878A8',
      accentBg: '#EBF3F8'
    },
    {
      role: 'recruiter',
      title: 'RECRUITER',
      badge: 'Talent Acquisition',
      icon: Briefcase,
      description: 'Scout verified student capabilities across VNIT, IIIT, RTMNU and post requisitions mapped directly to Nagpur economic corridors.',
      color: '#3C9270',
      accentBg: '#EEF7F2'
    },
    {
      role: 'dean',
      title: 'DEAN / INSTITUTION',
      badge: 'Academic Leadership',
      icon: Landmark,
      description: 'Analyze cohort skill profiles, identify curriculum-to-industry gaps, benchmark placement readiness, and monitor corridor alignments.',
      color: '#7467A8',
      accentBg: '#F3F1F8'
    },
    {
      role: 'industry',
      title: 'INDUSTRY',
      badge: 'Ecosystem Partner',
      icon: Building2,
      description: 'Benchmark regional skill pipelines, forecast talent demand across MIHAN and Butibori, and launch joint academic R&D initiatives.',
      color: '#E58A32',
      accentBg: '#FCF3EA'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17212B]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[#F5F1E8] border-b border-[#E8E4D9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#17212B] text-[#F5F1E8] flex items-center justify-center font-bold text-xs tracking-tight shadow-2xs font-data">
              N
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#17212B] tracking-tight font-sans">
                {authMode === 'signin' ? 'Sign In to Capability Platform' : 'Join Nagpur Capability Ecosystem'}
              </h2>
              <p className="text-[11px] text-[#5C6773] font-data">
                {authMode === 'signin' 
                  ? 'Access your personalized capability workspace & corridor intelligence' 
                  : 'Select your ecosystem perspective to begin'}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-[#5C6773] hover:text-[#17212B] hover:bg-[#E8E4D9] rounded-xs transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle (Sign In vs Register) */}
        <div className="flex border-b border-[#E8E4D9] bg-[#E8E4D9] text-xs font-bold font-data uppercase tracking-wider">
          <button
            onClick={() => { setAuthMode('signin'); setRegisterStep(1); }}
            className={`flex-1 py-3 text-center transition-all cursor-pointer border-b-2 ${
              authMode === 'signin'
                ? 'bg-[#FAF8F5] text-[#17212B] border-[#17212B]'
                : 'text-[#5C6773] hover:text-[#17212B] border-transparent'
            }`}
          >
            SIGN IN
          </button>
          <button
            onClick={() => { setAuthMode('register'); setRegisterStep(1); }}
            className={`flex-1 py-3 text-center transition-all cursor-pointer border-b-2 ${
              authMode === 'register'
                ? 'bg-[#FAF8F5] text-[#17212B] border-[#17212B]'
                : 'text-[#5C6773] hover:text-[#17212B] border-transparent'
            }`}
          >
            REGISTER NEW ACCOUNT
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* ========================================================
              MODE 1: SIGN IN VIEW
             ======================================================== */}
          {authMode === 'signin' && (
            <div className="space-y-6">
              {/* Quick 1-Click Demo Profiles */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#5C6773] font-data">
                    Instant Demo Sign-In (Select Perspective)
                  </span>
                  <span className="text-[10px] font-medium text-[#3C9270] bg-[#EEF7F2] px-2 py-0.5 rounded-xs border border-[#B2DEC9] font-data flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> One-Click Ready
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PERSPECTIVES.map((p) => {
                    const IconComp = p.icon;
                    return (
                      <button
                        key={p.role}
                        onClick={() => handleQuickDemoSignIn(p.role)}
                        className="p-3.5 bg-[#FAF8F5] hover:bg-[#E8E4D9]/60 border border-[#E8E4D9] hover:border-[#17212B] rounded-xs text-left transition-all group cursor-pointer shadow-2xs hover:shadow-xs flex items-start gap-3"
                      >
                        <div 
                          className="w-9 h-9 rounded-xs flex items-center justify-center shrink-0 border"
                          style={{ backgroundColor: p.accentBg, borderColor: p.color + '40', color: p.color }}
                        >
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#17212B] group-hover:text-[#2878A8] font-sans">
                              {p.title}
                            </span>
                            <span className="text-[9px] font-medium font-data px-1.5 py-0.2 rounded-xs border" style={{ backgroundColor: p.accentBg, color: p.color }}>
                              {p.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#5C6773] mt-0.5 truncate font-data">
                            {p.role === 'student' && 'Aarav Deshmukh (VNIT)'}
                            {p.role === 'recruiter' && 'Priya Sharma (Tata Advanced/Boeing)'}
                            {p.role === 'dean' && 'Dr. Suresh V. Kulkarni (VNIT)'}
                            {p.role === 'industry' && 'Rajesh Mandlekar (Mahindra EV)'}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-[#E8E4D9] w-full" />
                <span className="bg-[#FAF8F5] px-3 text-[10px] uppercase font-bold text-[#8A95A1] font-data absolute">
                  OR SIGN IN WITH CREDENTIALS
                </span>
              </div>

              {/* Standard Sign-In Form */}
              <form onSubmit={handleCustomSignIn} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1.5">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8A95A1] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="e.g. aarav.deshmukh@vnit.ac.in"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden focus:border-[#17212B] font-data"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8A95A1] absolute left-3 top-3" />
                    <input
                      type="password"
                      defaultValue="••••••••••••"
                      className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden focus:border-[#17212B] font-data"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="remember" defaultChecked className="rounded-xs text-[#17212B]" />
                    <label htmlFor="remember" className="text-[11px] text-[#5C6773] font-data">Remember session</label>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 bg-[#17212B] hover:bg-[#253342] text-[#F5F1E8] px-5 py-2 rounded-xs text-xs font-bold uppercase tracking-wider transition-all font-data cursor-pointer shadow-2xs"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================
              MODE 2: REGISTER FLOW
             ======================================================== */}
          {authMode === 'register' && (
            <div className="space-y-6">
              {/* Step 1: Perspective Selection */}
              {registerStep === 1 && (
                <div className="space-y-4">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2878A8] font-data">
                      STEP 1 OF 2
                    </span>
                    <h3 className="text-base font-bold text-[#17212B] font-sans mt-0.5">
                      How will you use the Capability Map?
                    </h3>
                    <p className="text-xs text-[#5C6773] mt-1 font-data">
                      Select your role to unlock customized capability metrics, dashboards, and ecosystem tools.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {PERSPECTIVES.map((p) => {
                      const IconComp = p.icon;
                      const isSelected = selectedRole === p.role;
                      return (
                        <div
                          key={p.role}
                          onClick={() => setSelectedRole(p.role)}
                          className={`p-4 rounded-xs border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#FAF8F5] border-[#17212B] shadow-md ring-1 ring-[#17212B]'
                              : 'bg-[#FAF8F5] hover:bg-[#E8E4D9]/60 border-[#E8E4D9] hover:border-[#CBD5E1]'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3 text-[#17212B]">
                              <CheckCircle2 className="w-5 h-5 fill-[#17212B] text-white" />
                            </div>
                          )}

                          <div className="flex items-center gap-3 mb-2.5">
                            <div 
                              className="w-10 h-10 rounded-xs flex items-center justify-center shrink-0 border"
                              style={{ backgroundColor: p.accentBg, borderColor: p.color + '40', color: p.color }}
                            >
                              <IconComp className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[#17212B] uppercase tracking-wide font-sans">
                                {p.title}
                              </h4>
                              <span className="text-[9px] font-data font-medium px-1.5 py-0.2 rounded-xs border" style={{ backgroundColor: p.accentBg, color: p.color }}>
                                {p.badge}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#5C6773] leading-relaxed font-data">
                            {p.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setRegisterStep(2)}
                      className="inline-flex items-center gap-2 bg-[#17212B] hover:bg-[#253342] text-[#F5F1E8] px-5 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all font-data cursor-pointer shadow-2xs"
                    >
                      <span>Continue as {selectedRole.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Role-Specific Registration Form */}
              {registerStep === 2 && (
                <form onSubmit={handleCustomRegister} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#2878A8] font-data">
                        STEP 2 OF 2
                      </span>
                      <h3 className="text-base font-bold text-[#17212B] font-sans mt-0.5">
                        {selectedRole === 'student' && 'Student Profile Details'}
                        {selectedRole === 'recruiter' && 'Recruiter & Organization Info'}
                        {selectedRole === 'dean' && 'Institution & Academic Leadership'}
                        {selectedRole === 'industry' && 'Industry Enterprise Details'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setRegisterStep(1)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#5C6773] hover:text-[#17212B] font-data cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  {/* Common fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8A95A1] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder={selectedRole === 'student' ? 'e.g. Aarav Deshmukh' : 'e.g. Priya Sharma'}
                          className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden focus:border-[#17212B] font-data"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                        Official Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8A95A1] absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder={selectedRole === 'student' ? 'e.g. name@vnit.ac.in' : 'e.g. name@organization.com'}
                          className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden focus:border-[#17212B] font-data"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role Specific Fields */}
                  {selectedRole === 'student' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                          College / Institution (Nagpur)
                        </label>
                        <select
                          value={institutionInput}
                          onChange={(e) => setInstitutionInput(e.target.value)}
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden focus:border-[#17212B] font-data"
                        >
                          <option value="VNIT Nagpur">Visvesvaraya National Institute of Technology (VNIT)</option>
                          <option value="IIIT Nagpur">Indian Institute of Information Technology (IIIT) Nagpur</option>
                          <option value="RTMNU Campus">Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU)</option>
                          <option value="GCOEN Nagpur">Government College of Engineering Nagpur (GCOEN)</option>
                          <option value="Ramdeobaba University">Shri Ramdeobaba University (RCOEM)</option>
                          <option value="YCCE Nagpur">Yeshwantrao Chavan College of Engineering (YCCE)</option>
                          <option value="AIIMS Nagpur">AIIMS Nagpur</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                            Degree & Branch
                          </label>
                          <input
                            type="text"
                            value={degreeInput}
                            onChange={(e) => setDegreeInput(e.target.value)}
                            placeholder="e.g. B.Tech Computer Science"
                            className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden font-data"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                            Year of Study
                          </label>
                          <select
                            value={yearInput}
                            onChange={(e) => setYearInput(e.target.value as any)}
                            className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden font-data"
                          >
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year / Final</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {(selectedRole === 'recruiter' || selectedRole === 'industry') && (
                    <div className="space-y-3 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            value={orgInput}
                            onChange={(e) => setOrgInput(e.target.value)}
                            placeholder="e.g. Tata Advanced Systems / Mahindra EV"
                            className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden font-data"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                            Industry Sector
                          </label>
                          <select
                            value={sectorInput}
                            onChange={(e) => setSectorInput(e.target.value as SectorCategory)}
                            className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden font-data"
                          >
                            <option value="IT & Cloud">IT & Cloud</option>
                            <option value="Aerospace & Defence">Aerospace & Defence</option>
                            <option value="EV & Mobility">EV & Mobility</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Logistics">Logistics</option>
                            <option value="AgriTech">AgriTech</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                          Nagpur Corridor / Facility
                        </label>
                        <input
                          type="text"
                          value={locationInput}
                          onChange={(e) => setLocationInput(e.target.value)}
                          placeholder="e.g. MIHAN SEZ Tech Zone / Butibori MIDC"
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden font-data"
                        />
                      </div>
                    </div>
                  )}

                  {selectedRole === 'dean' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                          Academic Institution
                        </label>
                        <input
                          type="text"
                          value={institutionInput}
                          onChange={(e) => setInstitutionInput(e.target.value)}
                          placeholder="e.g. Visvesvaraya National Institute of Technology (VNIT)"
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden font-data"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#3E4A56] font-data mb-1">
                          Academic Role & Designation
                        </label>
                        <input
                          type="text"
                          defaultValue="Dean of Academic Programmes / Head of TPO"
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-xs text-[#17212B] focus:outline-hidden font-data"
                        />
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center justify-between border-t border-[#E8E4D9]">
                    <span className="text-[10px] text-[#5C6773] font-data">
                      Prototype local state (No backend credentials required)
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#17212B] hover:bg-[#253342] text-[#F5F1E8] px-6 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all font-data cursor-pointer shadow-2xs"
                    >
                      <span>Create Account & Open Dashboard</span>
                      <CheckCircle2 className="w-4 h-4 text-[#3C9270]" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
