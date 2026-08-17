import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  Compass, 
  User, 
  LogOut, 
  ChevronDown, 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  Building2, 
  LayoutDashboard,
  Map as MapIcon,
  FileText,
  Settings,
  ArrowRight
} from 'lucide-react';
import { UserProfile, UserRole } from '../types/auth';

interface HeaderProps {
  activeSection: string;
  activeView: 'map' | 'dashboard';
  currentUser: UserProfile | null;
  onNavigate: (sectionId: string) => void;
  onViewChange: (view: 'map' | 'dashboard') => void;
  onOpenAuth: (mode: 'signin' | 'register', role?: UserRole) => void;
  onSignOut: () => void;
  onSwitchPerspective: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  activeView,
  currentUser,
  onNavigate, 
  onViewChange,
  onOpenAuth,
  onSignOut,
  onSwitchPerspective
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'explore', label: 'Explore Map' },
    { id: 'skills', label: 'Skills Matrix' },
    { id: 'industries', label: 'Industries' },
    { id: 'nagpur-2030', label: 'Nagpur 2030' },
    { id: 'career-path', label: 'Career Pathways' },
  ];

  const handleNavClick = (id: string) => {
    onViewChange('map');
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'bg-[#EBF3F8] text-[#2878A8] border-[#BBD5E6]';
      case 'recruiter':
        return 'bg-[#EEF7F2] text-[#3C9270] border-[#B2DEC9]';
      case 'dean':
        return 'bg-[#F3F1F8] text-[#7467A8] border-[#CFCAE4]';
      case 'industry':
        return 'bg-[#FCF3EA] text-[#E58A32] border-[#F7D5B0]';
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 border-b border-[#E8E4D9] ${
      isScrolled 
        ? 'bg-[#F5F1E8]/95 backdrop-blur-md shadow-2xs' 
        : 'bg-[#F5F1E8]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-17 flex items-center justify-between">
        
        {/* Left: Brand Identity with Editorial Flair */}
        <div className="flex items-center gap-8 lg:gap-10">
          <button 
            onClick={() => handleNavClick('explore')}
            className="flex items-center gap-3 text-left group focus:outline-hidden cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xs bg-[#17212B] text-[#F5F1E8] flex items-center justify-center font-bold text-sm tracking-tight shadow-2xs group-hover:bg-[#253342] transition-colors font-display">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-tight text-sm sm:text-base text-[#17212B] leading-tight">
                NAGPUR CAPABILITY MAP
              </span>
              <span className="text-[11px] font-normal text-[#5C6773] font-sans tracking-normal">
                Connect your skills to the opportunities around you
              </span>
            </div>
          </button>

          {/* Desktop Navigation: Generous Spacing, Understated 500-weight Inter Typography */}
          <nav className="hidden lg:flex items-center gap-2 text-[13px] font-medium font-sans">
            {navLinks.map((link) => {
              const isActive = activeView === 'map' && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-xs transition-all duration-150 cursor-pointer relative ${
                    isActive
                      ? 'text-[#17212B] font-semibold bg-[#E8E4D9] shadow-2xs after:content-[""] after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-[2px] after:bg-[#2878A8]'
                      : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#E8E4D9]/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Dashboard Link if Authenticated */}
            {currentUser && (
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-3.5 py-1.5 rounded-xs transition-all duration-150 cursor-pointer flex items-center gap-1.5 relative ${
                  activeView === 'dashboard'
                    ? 'text-[#2878A8] font-semibold bg-[#EBF3F8] border border-[#BBD5E6] after:content-[""] after:absolute after:bottom-0.5 after:left-3.5 after:right-3.5 after:h-[2px] after:bg-[#2878A8]'
                    : 'text-[#5C6773] hover:text-[#17212B] hover:bg-[#E8E4D9]/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#2878A8]" />
                <span>My Dashboard</span>
              </button>
            )}
          </nav>
        </div>

        {/* Right Section: Prominent Sign In / Register OR Profile Menu */}
        <div className="flex items-center gap-3">
          
          {/* Map vs Dashboard View Switcher (when authenticated) */}
          {currentUser && (
            <div className="hidden md:flex items-center bg-[#E8E4D9] p-0.5 rounded-xs border border-[#D8D3C5] text-[11px] font-medium font-sans mr-2">
              <button
                onClick={() => onViewChange('map')}
                className={`px-3 py-1 rounded-xs flex items-center gap-1.5 cursor-pointer transition-all duration-150 ${
                  activeView === 'map'
                    ? 'bg-[#F5F1E8] text-[#17212B] shadow-2xs font-semibold border border-[#D8D3C5]'
                    : 'text-[#5C6773] hover:text-[#17212B]'
                }`}
              >
                <MapIcon className="w-3 h-3 text-[#2878A8]" />
                <span>Map View</span>
              </button>
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-3 py-1 rounded-xs flex items-center gap-1.5 cursor-pointer transition-all duration-150 ${
                  activeView === 'dashboard'
                    ? 'bg-[#F5F1E8] text-[#17212B] shadow-2xs font-semibold border border-[#D8D3C5]'
                    : 'text-[#5C6773] hover:text-[#17212B]'
                }`}
              >
                <LayoutDashboard className="w-3 h-3 text-[#7467A8]" />
                <span>Dashboard</span>
              </button>
            </div>
          )}

          {/* User Account Controls */}
          {currentUser ? (
            /* Logged In User Avatar & Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 py-1 px-2 rounded-xs hover:bg-[#E8E4D9] border border-transparent hover:border-[#D8D3C5] transition-all cursor-pointer select-none group"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-xs object-cover border border-[#17212B] shadow-2xs"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#3C9270] border border-white" />
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-[#17212B] leading-tight font-sans group-hover:text-[#2878A8] transition-colors">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-medium text-[#5C6773] font-sans">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5C6773] transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu with Complete Requested Destinations */}
              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-[#F5F1E8] border border-[#D8D3C5] rounded-xs shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  {/* User Profile Header */}
                  <div className="px-4 py-3 border-b border-[#E8E4D9] bg-[#FAF8F5]/80">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <img
                        src={currentUser.avatarUrl}
                        alt={currentUser.name}
                        className="w-9 h-9 rounded-xs object-cover border border-[#17212B]"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold text-[#17212B] block truncate font-sans">{currentUser.name}</span>
                        <span className="text-[11px] text-[#5C6773] font-sans block truncate">{currentUser.email}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-xs border inline-block font-sans ${getRoleBadgeStyle(currentUser.role)}`}>
                      {currentUser.role} perspective
                    </span>
                  </div>

                  {/* Core Navigation Items */}
                  <div className="py-1 text-xs font-sans">
                    <button
                      onClick={() => onViewChange('dashboard')}
                      className="w-full px-4 py-2 text-left text-[#17212B] hover:bg-[#E8E4D9] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5 font-medium">
                        <User className="w-3.5 h-3.5 text-[#2878A8]" />
                        <span>My Profile</span>
                      </div>
                      <span className="text-[11px] text-[#5C6773]">View</span>
                    </button>

                    <button
                      onClick={() => onViewChange('dashboard')}
                      className="w-full px-4 py-2 text-left text-[#17212B] hover:bg-[#E8E4D9] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5 font-medium">
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#7467A8]" />
                        <span>Dashboard</span>
                      </div>
                      <span className="text-[11px] text-[#5C6773]">Active</span>
                    </button>

                    <button
                      onClick={() => onViewChange('dashboard')}
                      className="w-full px-4 py-2 text-left text-[#17212B] hover:bg-[#E8E4D9] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5 font-medium">
                        <FileText className="w-3.5 h-3.5 text-[#3C9270]" />
                        <span>Documents</span>
                      </div>
                      <span className="text-[11px] text-[#3C9270] font-semibold">Vault</span>
                    </button>

                    <button
                      onClick={() => onViewChange('dashboard')}
                      className="w-full px-4 py-2 text-left text-[#17212B] hover:bg-[#E8E4D9] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2.5 font-medium">
                        <Settings className="w-3.5 h-3.5 text-[#5C6773]" />
                        <span>Settings</span>
                      </div>
                      <span className="text-[11px] text-[#5C6773]">Prefs</span>
                    </button>
                  </div>

                  {/* Quick Switch Demo Perspective */}
                  <div className="border-t border-[#E8E4D9] pt-2 pb-1.5 bg-[#E8E4D9]/40">
                    <span className="px-4 text-[10px] font-semibold text-[#5C6773] font-sans block mb-1">
                      Switch Demo Perspective
                    </span>
                    {(['student', 'recruiter', 'dean', 'industry'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => onSwitchPerspective(r)}
                        className={`w-full px-4 py-1.5 text-left text-xs hover:bg-[#E8E4D9] flex items-center justify-between font-sans cursor-pointer transition-colors ${
                          currentUser.role === r ? 'text-[#2878A8] font-semibold bg-[#EBF3F8]' : 'text-[#3E4A56]'
                        }`}
                      >
                        <span className="capitalize font-medium">{r === 'dean' ? 'Dean / Institution' : r}</span>
                        {currentUser.role === r && <span className="text-[10px] text-[#2878A8] font-semibold">Current</span>}
                      </button>
                    ))}
                  </div>

                  {/* Sign Out */}
                  <div className="border-t border-[#E8E4D9] pt-1">
                    <button
                      onClick={onSignOut}
                      className="w-full px-4 py-2.5 text-left text-xs text-[#D65F52] hover:bg-[#FBEEEC] flex items-center gap-2 font-sans font-semibold cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated View: Clean, Understated Inter Typography */
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => onOpenAuth('signin')}
                className="text-xs font-medium text-[#17212B] hover:text-[#2878A8] px-3.5 py-1.5 rounded-xs hover:bg-[#E8E4D9] transition-all cursor-pointer font-sans"
              >
                Sign In
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center gap-1.5 bg-[#17212B] hover:bg-[#253342] text-[#F5F1E8] text-xs font-medium px-3.5 py-1.5 rounded-xs transition-all shadow-2xs hover:shadow-xs group cursor-pointer font-sans"
              >
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9A441] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5C6773] hover:text-[#17212B] hover:bg-[#E8E4D9] rounded-xs focus:outline-hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E4D9] bg-[#F5F1E8] px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeView === 'map' && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xs text-sm font-medium text-left transition-colors cursor-pointer font-sans ${
                    isActive
                      ? 'bg-[#E8E4D9] text-[#17212B] font-semibold border-l-2 border-[#2878A8]'
                      : 'text-[#5C6773] hover:bg-[#E8E4D9]/60 hover:text-[#17212B]'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {currentUser ? (
            <div className="pt-3 border-t border-[#E8E4D9] space-y-2 font-sans">
              <button
                onClick={() => { onViewChange('dashboard'); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-semibold bg-[#17212B] text-[#F5F1E8] font-sans"
              >
                <span>My Dashboard ({currentUser.role})</span>
                <LayoutDashboard className="w-3.5 h-3.5 text-[#D9A441]" />
              </button>
              <button
                onClick={() => { onSignOut(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3.5 py-2 text-xs text-[#D65F52] font-sans font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-[#E8E4D9] flex items-center gap-2 font-sans">
              <button
                onClick={() => { onOpenAuth('signin'); setMobileMenuOpen(false); }}
                className="flex-1 text-center py-2 text-xs font-medium border border-[#D8D3C5] bg-[#FAF8F5] rounded-xs font-sans"
              >
                Sign In
              </button>
              <button
                onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                className="flex-1 text-center py-2 text-xs font-medium bg-[#17212B] text-white rounded-xs font-sans flex items-center justify-center gap-1"
              >
                <span>Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
