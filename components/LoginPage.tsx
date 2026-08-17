import React, { useState } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Check, 
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  Building2,
  Building,
  Compass,
  Layers,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import { UserProfile, UserRole } from '../types/auth';
import { 
  DEMO_STUDENT_PROFILE, 
  DEMO_RECRUITER_PROFILE, 
  DEMO_DEAN_PROFILE, 
  DEMO_INDUSTRY_PROFILE 
} from '../data/authDemoData';
import { 
  getUserByEmail, 
  registerNewUser, 
  setActiveSession 
} from '../services/authStorageService';

interface LoginPageProps {
  onLogin: (user: UserProfile) => void;
  onExploreAsGuest?: () => void;
  initialMode?: 'signin' | 'register';
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLogin, 
  onExploreAsGuest,
  initialMode = 'signin'
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'register'>(initialMode);
  
  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('aarav.deshmukh@vnit.ac.in');
  const [signInPassword, setSignInPassword] = useState('••••••••••••');
  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [signInError, setSignInError] = useState<string | null>(null);

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState<UserRole>('student');
  const [regOrg, setRegOrg] = useState('Visvesvaraya National Institute of Technology (VNIT)');
  const [regBranch, setRegBranch] = useState('Computer Science & Engineering');
  const [regYear, setRegYear] = useState('3rd Year');
  const [regSector, setRegSector] = useState('IT & Cloud');
  const [regError, setRegError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // Handle Sign In submission
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Look up user in local persistent DB or default demo user
      const existingUser = getUserByEmail(signInEmail);
      if (existingUser) {
        setActiveSession(existingUser);
        onLogin(existingUser);
      } else {
        // Create an active session on the fly for any entered email
        const fallbackUser: UserProfile = {
          ...DEMO_STUDENT_PROFILE,
          id: `user_${Date.now()}`,
          name: signInEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          email: signInEmail
        };
        setActiveSession(fallbackUser);
        onLogin(fallbackUser);
      }
      setIsLoading(false);
    }, 250);
  };

  // Handle Quick Demo Login
  const handleQuickDemo = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      let targetUser: UserProfile = DEMO_STUDENT_PROFILE;
      if (role === 'recruiter') targetUser = DEMO_RECRUITER_PROFILE;
      else if (role === 'dean') targetUser = DEMO_DEAN_PROFILE;
      else if (role === 'industry') targetUser = DEMO_INDUSTRY_PROFILE;

      setActiveSession(targetUser);
      onLogin(targetUser);
      setIsLoading(false);
    }, 200);
  };

  // Handle Registration submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim()) {
      setRegError('Please provide your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError('Please provide a valid email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        const newUser = registerNewUser({
          name: regName,
          email: regEmail,
          password: regPassword,
          role: regRole,
          collegeOrOrg: regOrg,
          degreeOrDept: regRole === 'student' ? 'B.Tech' : 'Department of Engineering',
          branch: regBranch,
          year: regYear,
          sector: regSector,
          locationArea: 'Nagpur, Maharashtra'
        });

        onLogin(newUser);
      } catch (err) {
        setRegError('Failed to create account. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F1E8] text-[#17212B] flex flex-col justify-between font-sans selection:bg-[#D9A441]/20 selection:text-[#17212B] relative overflow-hidden">
      
      {/* Decorative Subtle Geographic Map Vector Lines & Grid in the background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="nagpur-geo-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#17212B" strokeWidth="1" />
              <circle cx="24" cy="24" r="1.5" fill="#D9A441" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nagpur-geo-grid)" />
          
          {/* Subtle Route Lines connecting Nagpur nodes */}
          <path d="M 100 200 Q 300 150, 600 350 T 1200 450" fill="none" stroke="#D9A441" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M 250 800 Q 650 500, 950 650 T 1400 200" fill="none" stroke="#2878A8" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="600" cy="350" r="40" fill="none" stroke="#D9A441" strokeWidth="1" />
          <circle cx="600" cy="350" r="80" fill="none" stroke="#D9A441" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 border-b border-[#E8E4D9] bg-[#FAF8F5]/80 backdrop-blur-xs px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs bg-[#17212B] text-[#F5F1E8] flex items-center justify-center font-bold text-sm tracking-tight font-display shadow-2xs">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-[#17212B] leading-none">
              NAGPUR CAPABILITY MAP
            </span>
            <span className="text-[11px] font-normal text-[#5C6773] mt-0.5 font-sans">
              Connect your skills to the opportunities around you
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onExploreAsGuest && (
            <button
              onClick={onExploreAsGuest}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-semibold text-[#17212B] hover:bg-[#E8E4D9] transition-colors cursor-pointer border border-[#E8E4D9]"
            >
              <Compass className="w-3.5 h-3.5 text-[#2878A8]" />
              <span className="hidden sm:inline">Explore Public Map</span>
              <ArrowRight className="w-3 h-3 text-[#5C6773]" />
            </button>
          )}
        </div>
      </header>

      {/* Center Container: Minimal, Editorial & Geographic Authentication Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 my-auto">
        
        <div className="w-full max-w-xl bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs shadow-xs p-6 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-300">
          
          {/* Subtle Top Golden Accent Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2878A8] via-[#D9A441] to-[#3C9270]" />

          {/* Mode Switcher Tabs (Sign In vs Register) */}
          <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setAuthMode('signin'); setSignInError(null); }}
                className={`pb-2 text-sm sm:text-base font-display tracking-tight transition-all cursor-pointer relative ${
                  authMode === 'signin'
                    ? 'font-bold text-[#17212B]'
                    : 'font-medium text-[#78889B] hover:text-[#17212B]'
                }`}
              >
                Sign In
                {authMode === 'signin' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#17212B] -mb-4" />
                )}
              </button>

              <span className="text-[#D8D3C5] font-light pb-2">/</span>

              <button
                type="button"
                onClick={() => { setAuthMode('register'); setRegError(null); }}
                className={`pb-2 text-sm sm:text-base font-display tracking-tight transition-all cursor-pointer relative ${
                  authMode === 'register'
                    ? 'font-bold text-[#17212B]'
                    : 'font-medium text-[#78889B] hover:text-[#17212B]'
                }`}
              >
                Register Profile
                {authMode === 'register' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#17212B] -mb-4" />
                )}
              </button>
            </div>

            {/* Zero Mile Coordinates Tag */}
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-sans text-[#5C6773] bg-[#E8E4D9]/60 px-2 py-1 rounded-xs border border-[#E8E4D9]">
              <MapPin className="w-3 h-3 text-[#E58A32]" />
              <span>Zero Mile • Nagpur</span>
            </div>
          </div>

          {/* ==========================================================
              TAB 1: SIGN IN VIEW
             ========================================================== */}
          {authMode === 'signin' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Header Title */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans block mb-1">
                  Existing Member
                </span>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#17212B] tracking-tight">
                  WELCOME BACK
                </h1>
                <p className="text-xs sm:text-sm text-[#3E4A56] mt-1 font-sans">
                  Sign in to continue exploring Nagpur's capability ecosystem.
                </p>
              </div>

              {/* Error Message */}
              {signInError && (
                <div className="p-3 bg-[#FBEEEC] border border-[#F2B8B2] text-[#D65F52] text-xs font-sans rounded-xs flex items-center gap-2">
                  <span className="font-bold">Error:</span> {signInError}
                </div>
              )}

              {/* Sign In Form */}
              <form onSubmit={handleSignInSubmit} className="space-y-4 font-sans">
                
                {/* Email Field */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#17212B] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78889B]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-9.5 pr-3.5 py-2.5 bg-white border border-[#D8D3C5] focus:border-[#17212B] focus:ring-1 focus:ring-[#17212B] rounded-xs text-xs sm:text-sm text-[#17212B] placeholder-[#9BA8B7] outline-hidden transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#17212B]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('For this prototype, you can sign in directly or use the one-click demo profiles below.')}
                      className="text-xs text-[#2878A8] hover:text-[#17212B] font-medium cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78889B]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showSignInPassword ? 'text' : 'password'}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-9.5 pr-10 py-2.5 bg-white border border-[#D8D3C5] focus:border-[#17212B] focus:ring-1 focus:ring-[#17212B] rounded-xs text-xs sm:text-sm text-[#17212B] placeholder-[#9BA8B7] outline-hidden transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignInPassword(!showSignInPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#78889B] hover:text-[#17212B] cursor-pointer"
                    >
                      {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Primary SIGN IN Button (Matches existing primary button style) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-5 rounded-xs bg-[#17212B] hover:bg-[#253342] active:bg-[#0E151C] text-[#F5F1E8] font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 text-[#D9A441]" />
                    </>
                  )}
                </button>
              </form>

              {/* Don't have an account? REGISTER */}
              <div className="text-center pt-1">
                <span className="text-xs text-[#5C6773]">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => { setAuthMode('register'); setRegError(null); }}
                  className="text-xs font-semibold text-[#2878A8] hover:text-[#17212B] hover:underline cursor-pointer ml-1 uppercase tracking-wider"
                >
                  REGISTER →
                </button>
              </div>

              {/* OR One-Click Perspective Testing Matrix */}
              <div className="pt-4 border-t border-[#E8E4D9]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-semibold text-[#5C6773] uppercase tracking-wider">
                    Instant Demo Perspectives
                  </span>
                  <span className="text-[10px] text-[#78889B]">1-Click Login</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('student')}
                    className="p-2.5 bg-white hover:bg-[#EBF3F8] border border-[#D8D3C5] hover:border-[#2878A8] rounded-xs text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17212B] group-hover:text-[#2878A8]">🎓 Student</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#EBF3F8] text-[#2878A8] rounded-2xs">VNIT</span>
                    </div>
                    <p className="text-[10px] text-[#5C6773] truncate mt-0.5">Aarav Deshmukh · CS</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('recruiter')}
                    className="p-2.5 bg-white hover:bg-[#FCF3EA] border border-[#D8D3C5] hover:border-[#E58A32] rounded-xs text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17212B] group-hover:text-[#E58A32]">💼 Recruiter</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#FCF3EA] text-[#E58A32] rounded-2xs">TCS</span>
                    </div>
                    <p className="text-[10px] text-[#5C6773] truncate mt-0.5">Priya Sharma · MIHAN</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('dean')}
                    className="p-2.5 bg-white hover:bg-[#F3EEF9] border border-[#D8D3C5] hover:border-[#7467A8] rounded-xs text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17212B] group-hover:text-[#7467A8]">🏫 Dean</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#F3EEF9] text-[#7467A8] rounded-2xs">VNIT</span>
                    </div>
                    <p className="text-[10px] text-[#5C6773] truncate mt-0.5">Dr. Vijay Kulkarni</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('industry')}
                    className="p-2.5 bg-white hover:bg-[#EEF7F2] border border-[#D8D3C5] hover:border-[#3C9270] rounded-xs text-left transition-all cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#17212B] group-hover:text-[#3C9270]">🏢 Industry</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#EEF7F2] text-[#3C9270] rounded-2xs">Boeing</span>
                    </div>
                    <p className="text-[10px] text-[#5C6773] truncate mt-0.5">Dir. Rajesh Singhania</p>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ==========================================================
              TAB 2: REGISTER VIEW
             ========================================================== */}
          {authMode === 'register' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Header Title */}
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5C6773] font-sans block mb-1">
                  New Capability Profile
                </span>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#17212B] tracking-tight">
                  CREATE YOUR CAPABILITY PROFILE
                </h1>
                <p className="text-xs sm:text-sm text-[#3E4A56] mt-1 font-sans">
                  Tell us how you want to explore the Nagpur capability ecosystem.
                </p>
              </div>

              {/* Error Message */}
              {regError && (
                <div className="p-3 bg-[#FBEEEC] border border-[#F2B8B2] text-[#D65F52] text-xs font-sans rounded-xs flex items-center gap-2">
                  <span className="font-bold">Error:</span> {regError}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleRegisterSubmit} className="space-y-4 font-sans">
                
                {/* 1. Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#17212B] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Ananya Joshi"
                      required
                      className="w-full px-3 py-2 bg-white border border-[#D8D3C5] focus:border-[#17212B] focus:ring-1 focus:ring-[#17212B] rounded-xs text-xs sm:text-sm text-[#17212B] placeholder-[#9BA8B7] outline-hidden transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#17212B] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="ananya.joshi@vnit.ac.in"
                      required
                      className="w-full px-3 py-2 bg-white border border-[#D8D3C5] focus:border-[#17212B] focus:ring-1 focus:ring-[#17212B] rounded-xs text-xs sm:text-sm text-[#17212B] placeholder-[#9BA8B7] outline-hidden transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* 2. Password */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#17212B] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create secure password"
                      required
                      className="w-full pl-3 pr-10 py-2 bg-white border border-[#D8D3C5] focus:border-[#17212B] focus:ring-1 focus:ring-[#17212B] rounded-xs text-xs sm:text-sm text-[#17212B] placeholder-[#9BA8B7] outline-hidden transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#78889B] hover:text-[#17212B] cursor-pointer"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 3. HOW WILL YOU USE THE PLATFORM? (Subtle Category Accents) */}
                <div className="pt-2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#17212B] mb-2">
                    HOW WILL YOU USE THE PLATFORM?
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {/* Student (Blue Talent Accent) */}
                    <button
                      type="button"
                      onClick={() => {
                        setRegRole('student');
                        setRegOrg('Visvesvaraya National Institute of Technology (VNIT)');
                      }}
                      className={`p-2.5 rounded-xs border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        regRole === 'student'
                          ? 'bg-[#EBF3F8] border-[#2878A8] text-[#2878A8] font-semibold shadow-2xs ring-1 ring-[#2878A8]'
                          : 'bg-white border-[#D8D3C5] text-[#5C6773] hover:border-[#2878A8]'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-[#2878A8]" />
                      <span className="text-xs">🎓 Student</span>
                    </button>

                    {/* Recruiter (Orange Industry Accent) */}
                    <button
                      type="button"
                      onClick={() => {
                        setRegRole('recruiter');
                        setRegOrg('TCS MIHAN SEZ Delivery Center');
                      }}
                      className={`p-2.5 rounded-xs border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        regRole === 'recruiter'
                          ? 'bg-[#FCF3EA] border-[#E58A32] text-[#E58A32] font-semibold shadow-2xs ring-1 ring-[#E58A32]'
                          : 'bg-white border-[#D8D3C5] text-[#5C6773] hover:border-[#E58A32]'
                      }`}
                    >
                      <Briefcase className="w-4 h-4 text-[#E58A32]" />
                      <span className="text-xs">💼 Recruiter</span>
                    </button>

                    {/* Dean / Institution (Violet Academic Accent) */}
                    <button
                      type="button"
                      onClick={() => {
                        setRegRole('dean');
                        setRegOrg('VNIT Nagpur');
                      }}
                      className={`p-2.5 rounded-xs border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        regRole === 'dean'
                          ? 'bg-[#F3EEF9] border-[#7467A8] text-[#7467A8] font-semibold shadow-2xs ring-1 ring-[#7467A8]'
                          : 'bg-white border-[#D8D3C5] text-[#5C6773] hover:border-[#7467A8]'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-[#7467A8]" />
                      <span className="text-xs">🏫 Dean / Inst.</span>
                    </button>

                    {/* Industry (Green Opportunity Accent) */}
                    <button
                      type="button"
                      onClick={() => {
                        setRegRole('industry');
                        setRegOrg('Air India / Boeing MRO Facility');
                      }}
                      className={`p-2.5 rounded-xs border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        regRole === 'industry'
                          ? 'bg-[#EEF7F2] border-[#3C9270] text-[#3C9270] font-semibold shadow-2xs ring-1 ring-[#3C9270]'
                          : 'bg-white border-[#D8D3C5] text-[#5C6773] hover:border-[#3C9270]'
                      }`}
                    >
                      <Building className="w-4 h-4 text-[#3C9270]" />
                      <span className="text-xs">🏢 Industry</span>
                    </button>
                  </div>
                </div>

                {/* 4. Contextual Fields based on selected role */}
                <div className="p-3.5 bg-[#E8E4D9]/40 border border-[#E8E4D9] rounded-xs space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6773] mb-1">
                      {regRole === 'student' ? 'College / University' : regRole === 'recruiter' ? 'Company / Hiring Agency' : regRole === 'dean' ? 'Academic Institution' : 'Enterprise / Factory Facility'}
                    </label>
                    <input
                      type="text"
                      value={regOrg}
                      onChange={(e) => setRegOrg(e.target.value)}
                      placeholder={regRole === 'student' ? 'e.g. VNIT, RCOEM, YCCE' : 'e.g. Tech Mahindra MIHAN'}
                      className="w-full px-3 py-1.5 bg-white border border-[#D8D3C5] rounded-xs text-xs text-[#17212B] focus:border-[#17212B]"
                    />
                  </div>

                  {regRole === 'student' && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6773] mb-1">
                          Branch / Discipline
                        </label>
                        <select
                          value={regBranch}
                          onChange={(e) => setRegBranch(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-[#D8D3C5] rounded-xs text-xs text-[#17212B]"
                        >
                          <option value="Computer Science & Engineering">Computer Science & Engg</option>
                          <option value="Electronics & Communication">Electronics & Comm.</option>
                          <option value="Mechanical & Mechatronics">Mechanical & Mechatronics</option>
                          <option value="Aerospace & Avionics">Aerospace & Avionics</option>
                          <option value="Electrical & Power Systems">Electrical & Power Systems</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6773] mb-1">
                          Cohort Year
                        </label>
                        <select
                          value={regYear}
                          onChange={(e) => setRegYear(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-[#D8D3C5] rounded-xs text-xs text-[#17212B]"
                        >
                          <option value="1st Year">1st Year (2029)</option>
                          <option value="2nd Year">2nd Year (2028)</option>
                          <option value="3rd Year">3rd Year (2027)</option>
                          <option value="4th Year">4th Year (2026)</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {regRole === 'industry' && (
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5C6773] mb-1">
                        Primary Sector Focus
                      </label>
                      <select
                        value={regSector}
                        onChange={(e) => setRegSector(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#D8D3C5] rounded-xs text-xs text-[#17212B]"
                      >
                        <option value="Aerospace & Defence">Aerospace & Defence (MIHAN)</option>
                        <option value="IT & Cloud">IT & Cloud Software (Gayatri Nagar)</option>
                        <option value="EV & Mobility">EV & Mobility (Butibori)</option>
                        <option value="Manufacturing">Precision Manufacturing (Hingna)</option>
                        <option value="Healthcare">Healthcare & Biotech (AIIMS Corridor)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Primary CREATE PROFILE Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-5 rounded-xs bg-[#17212B] hover:bg-[#253342] active:bg-[#0E151C] text-[#F5F1E8] font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <span>Creating Profile...</span>
                  ) : (
                    <>
                      <span>Create Account & Enter Ecosystem</span>
                      <ArrowRight className="w-4 h-4 text-[#D9A441]" />
                    </>
                  )}
                </button>
              </form>

              {/* Already have an account? SIGN IN */}
              <div className="text-center pt-1">
                <span className="text-xs text-[#5C6773]">Already have a capability profile? </span>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setSignInError(null); }}
                  className="text-xs font-semibold text-[#2878A8] hover:text-[#17212B] hover:underline cursor-pointer ml-1 uppercase tracking-wider"
                >
                  SIGN IN →
                </button>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 border-t border-[#E8E4D9] bg-[#FAF8F5]/80 py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans text-[#78889B]">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
          <span>Nagpur, Maharashtra • 21.1458° N, 79.0882° E</span>
        </div>
        <div>
          Nagpur Capability Map · Civic Open Intelligence Platform
        </div>
      </footer>

    </div>
  );
};
