import React, { useState, useEffect, useMemo } from 'react';
import { User } from 'lucide-react';
import { LoginPage } from './components/LoginPage';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HeroMap } from './components/HeroMap';
import { CityIntelligencePanel } from './components/CityIntelligencePanel';
import { MapLegend } from './components/MapLegend';
import { CityChangingIntro } from './components/CityChangingIntro';
import { SkillsSection } from './components/SkillsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { Nagpur2030 } from './components/Nagpur2030';
import { CareerPath } from './components/CareerPath';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { RecruiterDashboard } from './components/dashboards/RecruiterDashboard';
import { DeanDashboard } from './components/dashboards/DeanDashboard';
import { IndustryDashboard } from './components/dashboards/IndustryDashboard';
import { MAP_NODES } from './data/nagpurData';
import { ClusterType, SectorCategory } from './types';
import { UserProfile, UserRole, StudentProfile, RecruiterProfile, DeanProfile, IndustryProfile } from './types/auth';
import { 
  DEMO_STUDENT_PROFILE, 
  DEMO_RECRUITER_PROFILE, 
  DEMO_DEAN_PROFILE, 
  DEMO_INDUSTRY_PROFILE 
} from './data/authDemoData';
import { 
  getActiveSession, 
  setActiveSession, 
  clearActiveSession, 
  saveUserProfile 
} from './services/authStorageService';

export default function App() {
  // Navigation & View State
  const [activeSection, setActiveSection] = useState<string>('explore');
  const [activeView, setActiveView] = useState<'map' | 'dashboard'>('dashboard');
  const [selectedSector, setSelectedSector] = useState<SectorCategory | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ClusterType | 'All'>('All');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Authentication & Ecosystem State — restore active session if available
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getActiveSession());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!getActiveSession());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register'>('signin');
  const [authModalRole, setAuthModalRole] = useState<UserRole>('student');

  // Handle Login from LoginPage
  const handleLogin = (user: UserProfile) => {
    setActiveSession(user);
    setCurrentUser(user);
    setIsLoggedIn(true);
    setActiveView('dashboard');
  };

  // Handle Guest explore mode
  const handleExploreAsGuest = () => {
    setCurrentUser(null);
    setIsLoggedIn(true);
    setActiveView('map');
  };

  // Handle Sign Out (returns to full LoginPage)
  const handleSignOut = () => {
    clearActiveSession();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveView('dashboard');
  };

  // Active cluster counts per type
  const clusterCounts = useMemo(() => {
    const counts: Record<string, number> = {
      talent_hub: 0,
      industry_cluster: 0,
      academic_anchor: 0,
      skill_gap: 0,
      growth_opportunity: 0,
    };
    MAP_NODES.forEach((node) => {
      if (selectedSector === 'All' || node.category === selectedSector) {
        if (counts[node.type] !== undefined) {
          counts[node.type]++;
        }
      }
    });
    return counts;
  }, [selectedSector]);

  // Track active section on scroll with intersection / scroll detection
  useEffect(() => {
    if (activeView !== 'map') return;

    const sectionIds = ['explore', 'skills', 'industries', 'nagpur-2030', 'career-path'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const handleNavigate = (sectionId: string) => {
    setActiveView('map');
    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  const handleInspectNodeOnMap = (nodeId?: string) => {
    setActiveView('map');
    if (nodeId) {
      setSelectedNodeId(nodeId);
    }
    handleNavigate('explore');
    setTimeout(() => {
      const mapElem = document.getElementById('map-container');
      if (mapElem) {
        mapElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenAuth = (mode: 'signin' | 'register', role?: UserRole) => {
    setAuthModalMode(mode);
    if (role) setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const handleSwitchPerspective = (role: UserRole) => {
    let targetUser: UserProfile = DEMO_STUDENT_PROFILE;
    switch (role) {
      case 'student':
        targetUser = DEMO_STUDENT_PROFILE;
        break;
      case 'recruiter':
        targetUser = DEMO_RECRUITER_PROFILE;
        break;
      case 'dean':
        targetUser = DEMO_DEAN_PROFILE;
        break;
      case 'industry':
        targetUser = DEMO_INDUSTRY_PROFILE;
        break;
    }
    setActiveSession(targetUser);
    setCurrentUser(targetUser);
    setActiveView('dashboard');
  };

  const filteredClustersCount = MAP_NODES.filter((node) => {
    if (selectedSector !== 'All' && node.category !== selectedSector) return false;
    if (selectedType !== 'All' && node.type !== selectedType) return false;
    return true;
  }).length;

  // 1. Initial State: Render Split-Screen Login Page if not logged in
  if (!isLoggedIn) {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onExploreAsGuest={handleExploreAsGuest}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#17212B] flex flex-col font-sans">
      
      {/* 1. Header Navigation */}
      <Header
        activeSection={activeSection}
        activeView={activeView}
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onViewChange={setActiveView}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        onSwitchPerspective={handleSwitchPerspective}
      />

      {/* 2. Main Content Body: Switch between Map & Role Dashboards */}
      <main className="flex-1">
        
        {/* ========================================================
            VIEW A: MAP & CIVIC INTELLIGENCE PLATFORM (DEFAULT)
           ======================================================== */}
        {activeView === 'map' && (
          <div>
            {/* Hero & Spatial Map Explorer Section */}
            <section id="explore" className="scroll-mt-20">
              <Hero
                selectedSector={selectedSector}
                onSelectSector={(sector) => {
                  setSelectedSector(sector);
                  if (selectedNodeId) {
                    const node = MAP_NODES.find(n => n.id === selectedNodeId);
                    if (node && sector !== 'All' && node.category !== sector) {
                      setSelectedNodeId(null);
                    }
                  }
                }}
                onExploreClick={() => {
                  const mapElement = document.getElementById('map-container');
                  if (mapElement) {
                    mapElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />

              {/* Map & City Intelligence Layout */}
              <div id="map-container" className="max-w-7xl mx-auto px-4 sm:px-8 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                  {/* Leaflet Map Canvas */}
                  <div className="lg:col-span-8 space-y-3">
                    <HeroMap
                      selectedSector={selectedSector}
                      selectedType={selectedType}
                      selectedNodeId={selectedNodeId}
                      onSelectNode={setSelectedNodeId}
                    />

                    {/* Map Legend */}
                    <MapLegend
                      selectedType={selectedType}
                      onSelectType={setSelectedType}
                      clusterCounts={clusterCounts}
                    />
                  </div>

                  {/* City Intelligence Panel */}
                  <div className="lg:col-span-4">
                    <CityIntelligencePanel
                      selectedSector={selectedSector}
                      highlightedCount={filteredClustersCount}
                      totalClustersCount={MAP_NODES.length}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Editorial Sections */}
            <CityChangingIntro onNavigateToSection={handleNavigate} />

            <div id="skills" className="scroll-mt-20">
              <SkillsSection />
            </div>

            <div id="industries" className="scroll-mt-20">
              <IndustriesSection onInspectNodeOnMap={handleInspectNodeOnMap} />
            </div>

            <div id="nagpur-2030" className="scroll-mt-20">
              <Nagpur2030 />
            </div>

            <div id="career-path" className="scroll-mt-20">
              <CareerPath />
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW B: MULTI-PERSPECTIVE ECOSYSTEM DASHBOARD
           ======================================================== */}
        {activeView === 'dashboard' && currentUser && (
          <div>
            {currentUser.role === 'student' && (
              <StudentDashboard
                student={currentUser as StudentProfile}
                onUpdateProfile={(updated) => {
                  setCurrentUser(updated);
                  saveUserProfile(updated);
                }}
                onNavigateToMap={handleInspectNodeOnMap}
              />
            )}

            {currentUser.role === 'recruiter' && (
              <RecruiterDashboard
                recruiter={currentUser as RecruiterProfile}
                onNavigateToMap={handleInspectNodeOnMap}
              />
            )}

            {currentUser.role === 'dean' && (
              <DeanDashboard
                dean={currentUser as DeanProfile}
                onNavigateToMap={handleInspectNodeOnMap}
              />
            )}

            {currentUser.role === 'industry' && (
              <IndustryDashboard
                industry={currentUser as IndustryProfile}
                onNavigateToMap={handleInspectNodeOnMap}
              />
            )}
          </div>
        )}

        {activeView === 'dashboard' && !currentUser && (
          <div className="max-w-xl mx-auto my-16 p-8 bg-[#FAF8F5] border border-[#E8E4D9] rounded-xs text-center space-y-4 shadow-xs font-sans">
            <div className="w-12 h-12 rounded-full bg-[#EBF3F8] text-[#2878A8] flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-display text-[#17212B]">
              Sign In to Access Dashboard
            </h2>
            <p className="text-xs text-[#5C6773] max-w-md mx-auto">
              Access role-specific intelligence, capability maps, and verified opportunity pipelines by signing in.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleOpenAuth('signin')}
                className="px-5 py-2.5 bg-[#17212B] hover:bg-[#253342] text-[#F5F1E8] text-xs font-bold uppercase rounded-xs tracking-wider cursor-pointer"
              >
                Sign In Now →
              </button>
              <button
                onClick={() => handleNavigate('explore')}
                className="px-4 py-2.5 bg-white border border-[#E8E4D9] text-[#5C6773] hover:text-[#17212B] text-xs font-semibold rounded-xs cursor-pointer"
              >
                Browse Map
              </button>
            </div>
          </div>
        )}

      </main>

      {/* 3. Civic Intelligence Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. Auth & Ecosystem Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        initialRole={authModalRole}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={(authenticatedUser) => {
          setActiveSession(authenticatedUser);
          setCurrentUser(authenticatedUser);
          setIsLoggedIn(true);
          setActiveView('dashboard');
        }}
      />

    </div>
  );
}
