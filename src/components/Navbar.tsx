import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1776912593295_25043f45.png';
type SubItem = {
  label: string;
  path: string;
};
type NavItem = {
  label: string;
  path: string;
  subItems?: SubItem[];
};
const navItems: NavItem[] = [{
  label: 'Zo werkt het',
  path: '/zo-werkt-het',
  subItems: [{
    label: 'Producten',
    path: '/producten'
  }, {
    label: 'Diensten',
    path: '/diensten'
  }]
}, {
  label: 'Platform',
  path: '/platform'
}, {
  label: 'Projecten',
  path: '/projecten'
}, {
  label: 'Over ons',
  path: '/over-ons',
  subItems: [{
    label: 'Onze visie',
    path: '/onze-visie'
  }]
}];
const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHomePage = location.pathname === '/';
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);
  const isTransparent = isHomePage && !scrolled;
  const isActive = (item: NavItem) => {
    if (location.pathname === item.path) return true;
    if (item.subItems?.some(s => location.pathname === s.path)) return true;
    return false;
  };
  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };
  const toggleMobileSub = (label: string) => {
    setMobileSubOpen(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/50' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — always links to homepage. Swaps to white version when transparent (homepage at top). */}
          <Link to="/" className="flex-shrink-0" aria-label="NursiTree homepage">
            <img
              src={isTransparent
                ? 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1778245620967_d568e05e.png'
                : 'https://d64gsuwffb70l.cloudfront.net/682e0896b7c1872af32988f8_1775054327617_3e9d5fc0.png'}
              alt="NursiTree"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>




          {/* Desktop Nav — only visible on true desktop (>=1280px). Tablet landscape & below use hamburger. */}
          <div className="hidden xl:flex items-center gap-2">
            {navItems.map(item => {
            const active = isActive(item);
            const hasSub = !!item.subItems?.length;
            const isOpen = openDropdown === item.label;
            if (!hasSub) {
              return <Link key={item.path} to={item.path} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isTransparent ? active ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10' : active ? 'text-[#E8854A] bg-[#E8854A]/8' : 'text-gray-700 hover:text-[#E8854A] hover:bg-gray-50'}`}>
                    {item.label}
                  </Link>;
            }
            return <div key={item.label} className="relative" onMouseEnter={() => handleEnter(item.label)} onMouseLeave={handleLeave}>
                  <Link to={item.path} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${isTransparent ? active ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10' : active ? 'text-[#E8854A] bg-[#E8854A]/8' : 'text-gray-700 hover:text-[#E8854A] hover:bg-gray-50'}`} aria-haspopup="true" aria-expanded={isOpen}>
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </Link>

                  {/* Dropdown */}
                  <div className={`absolute left-0 top-full pt-3 min-w-[220px] transition-all duration-200 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}`}>
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                      {item.subItems!.map(sub => <Link key={sub.path} to={sub.path} className={`block px-5 py-3 text-sm font-medium transition-colors ${location.pathname === sub.path ? 'text-[#E8854A] bg-[#E8854A]/5' : 'text-gray-700 hover:text-[#E8854A] hover:bg-gray-50'}`}>
                          {sub.label}
                        </Link>)}
                    </div>
                  </div>
                </div>;
          })}
          </div>

          {/* Desktop CTA — only visible on true desktop (>=1280px). */}
          <div className="hidden xl:flex items-center gap-3">
            <Link to="/#contact-section" className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-1.5 ${isTransparent ? 'text-white bg-white/15 border border-white/25 hover:bg-white/25' : 'text-white bg-[#E8854A] hover:bg-[#D27337]'}`}>
              Neem contact op
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hamburger Toggle — visible on mobile, tablet portrait, and tablet landscape (<1280px). */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`xl:hidden p-2 rounded-lg transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`} aria-label="Toggle menu">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu — visible up to and including tablet landscape (<1280px). */}
      <div className={`xl:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}>

        <div className={`border-t px-4 py-4 space-y-1 ${isTransparent ? 'bg-[#182418]/95 backdrop-blur-md border-white/10' : 'bg-white border-gray-100'}`}>
          {navItems.map(item => {
          const active = isActive(item);
          const hasSub = !!item.subItems?.length;
          const subOpen = !!mobileSubOpen[item.label];
          if (!hasSub) {
            return <Link key={item.path} to={item.path} className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isTransparent ? active ? 'text-[#E8854A] bg-white/10' : 'text-white/80 hover:bg-white/5' : active ? 'text-[#E8854A] bg-[#E8854A]/8' : 'text-gray-700 hover:bg-gray-50'}`}>
                  {item.label}
                </Link>;
          }
          return <div key={item.label}>
                <div className="flex items-stretch gap-1">
                  <Link to={item.path} className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isTransparent ? active ? 'text-[#E8854A] bg-white/10' : 'text-white/80 hover:bg-white/5' : active ? 'text-[#E8854A] bg-[#E8854A]/8' : 'text-gray-700 hover:bg-gray-50'}`}>
                    {item.label}
                  </Link>
                  <button type="button" onClick={() => toggleMobileSub(item.label)} className={`px-3 rounded-lg transition-colors ${isTransparent ? 'text-white/70 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-50'}`} aria-expanded={subOpen} aria-label={`Toggle ${item.label} submenu`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${subOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className={`overflow-hidden transition-all duration-200 ${subOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="pl-4 mt-1 space-y-1 border-l-2 border-[#E8854A]/30 ml-4">
                    {item.subItems!.map(sub => <Link key={sub.path} to={sub.path} className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isTransparent ? location.pathname === sub.path ? 'text-[#E8854A] bg-white/10' : 'text-white/70 hover:bg-white/5' : location.pathname === sub.path ? 'text-[#E8854A] bg-[#E8854A]/8' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {sub.label}
                      </Link>)}
                  </div>
                </div>
              </div>;
        })}

          <div className={`pt-3 border-t ${isTransparent ? 'border-white/10' : 'border-gray-100'}`}>
            <Link to="/#contact-section" className="block w-full text-center px-5 py-3 text-sm font-semibold text-white bg-[#E8854A] rounded-lg hover:bg-[#D27337] transition-colors">
              Neem contact op
            </Link>

          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;