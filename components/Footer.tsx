import React from 'react';
import { ArrowUp, MapPin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#17212B] text-[#F5F1E8] py-12 border-t border-[#253342]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#253342]">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-3 font-sans">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xs bg-[#D9A441] text-[#17212B] flex items-center justify-center font-bold text-sm tracking-tight font-display">
                N
              </div>
              <span className="font-bold text-base text-[#F5F1E8] tracking-tight font-display">
                NAGPUR CAPABILITY MAP
              </span>
            </div>

            <p className="text-xs text-[#9BA8B7] leading-relaxed max-w-sm font-sans">
              Civic visual intelligence platform connecting talent, emerging skills, industrial clusters, and economic corridors across Nagpur and the broader Vidarbha region.
            </p>

            <div className="flex items-center gap-2 text-xs font-sans text-[#78889B]">
              <MapPin className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>Zero Mile Marker, 21.1458° N, 79.0882° E • Nagpur, India</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-2.5 font-sans">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78889B] font-sans">
              Platform Navigation
            </div>
            <ul className="space-y-1.5 text-xs text-[#9BA8B7]">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-white transition-colors cursor-pointer font-sans">
                  Explore Spatial Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('skills')} className="hover:text-white transition-colors cursor-pointer font-sans">
                  Capability & Skill Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industries')} className="hover:text-white transition-colors cursor-pointer font-sans">
                  Industrial & SEZ Ecosystems
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nagpur-2030')} className="hover:text-white transition-colors cursor-pointer font-sans">
                  Nagpur 2030 Scenarios
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('career-path')} className="hover:text-white transition-colors cursor-pointer font-sans">
                  Career Pathways
                </button>
              </li>
            </ul>
          </div>

          {/* Economic Corridors */}
          <div className="md:col-span-4 space-y-2.5 font-sans">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78889B] font-sans">
              Featured Economic Corridors
            </div>
            <div className="space-y-1.5 text-xs font-sans text-[#9BA8B7]">
              <div className="flex items-center justify-between">
                <span>MIHAN Multi-Modal SEZ & Aerospace Hub</span>
                <span className="text-[#2878A8] text-xs font-medium">South Corridor</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Butibori Heavy & EV Industrial Area</span>
                <span className="text-[#E58A32] text-xs font-medium">Industrial Base</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Hingna MIDC & Engineering Cluster</span>
                <span className="text-[#3C9270] text-xs font-medium">West Corridor</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Gayatri Nagar IT Park & Tech Campus</span>
                <span className="text-[#7467A8] text-xs font-medium">Central Core</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#78889B]">
          <div>
            © 2026 Nagpur Capability Map. Civic Open Intelligence Initiative.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#F5F1E8] hover:text-[#D9A441] transition-colors cursor-pointer font-sans font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
