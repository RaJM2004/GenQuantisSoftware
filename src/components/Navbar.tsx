import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShieldCheck, User, LogOut, Search, ArrowRight, Sparkles, Building2, Layers } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthStore, AuthUser } from '@/lib/authStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pathwaysDropdown, setPathwaysDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(AuthStore.getCurrentUser());

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setPathwaysDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(AuthStore.getCurrentUser());
    };
    window.addEventListener('genquantis_auth_changed', handleAuthChange);
    return () => window.removeEventListener('genquantis_auth_changed', handleAuthChange);
  }, []);

  const handleLogout = () => {
    AuthStore.setCurrentUser(null);
    navigate('/portal/login');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-orange-100/70'
          : 'bg-white/90 backdrop-blur-sm border-b border-orange-50'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 max-w-7xl mx-auto">
          {/* Logo & Portal Identity */}
          <div className="flex items-center flex-shrink-0 gap-3">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group py-1">
              <img
                src="/genquantis-logo.png"
                alt="GenQuantis"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.png';
                }}
              />
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-orange-500/10 text-orange-600 border border-orange-500/20">
                Partner & Investor Portal
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-700">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 ${
                location.pathname === '/' || location.pathname === '/partner-portal'
                  ? 'text-orange-600 font-semibold bg-orange-50/90'
                  : ''
              }`}
            >
              Portal Hub
            </Link>

            {/* Pathways Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setPathwaysDropdown(true)}
              onMouseLeave={() => setPathwaysDropdown(false)}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60"
                onClick={() => setPathwaysDropdown(!pathwaysDropdown)}
              >
                <span>Application Forms</span>
                <ChevronDown className="w-4 h-4 text-orange-400" />
              </button>

              {pathwaysDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-orange-100 p-2.5 mt-1 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="p-2 border-b border-orange-50 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 block">
                      Select Pathway Form
                    </span>
                  </div>
                  <Link
                    to="/apply/pan-india"
                    className="flex flex-col p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-orange-600 flex items-center justify-between">
                      Pan-India Channel Partner
                      <span className="text-[9px] px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-mono font-semibold">₹5-15 Cr</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal mt-0.5">
                      National Master Distribution Network
                    </span>
                  </Link>

                  <Link
                    to="/apply/regional"
                    className="flex flex-col p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-orange-600 flex items-center justify-between">
                      Regional Channel Partner
                      <span className="text-[9px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-semibold">₹50L - ₹3Cr</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal mt-0.5">
                      State & Zonal Healthcare Expansion
                    </span>
                  </Link>

                  <Link
                    to="/apply/franchise"
                    className="flex flex-col p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
                  >
                    <span className="text-xs font-semibold text-slate-900 group-hover:text-orange-600 flex items-center justify-between">
                      Franchise Smart Clinic
                      <span className="text-[9px] px-2 py-0.5 rounded bg-orange-500 text-white font-mono font-semibold">₹1.5 - ₹3Cr</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-normal mt-0.5">
                      AI Diagnostic & Smart Health Center
                    </span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/apply"
              className={`px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60 ${
                location.pathname === '/apply' ? 'text-orange-600 font-semibold bg-orange-50/90' : ''
              }`}
            >
              Compare Pathways
            </Link>

            <a
              href="/#pathways"
              onClick={(e) => {
                if (location.pathname !== '/' && location.pathname !== '/partner-portal') {
                  e.preventDefault();
                  navigate('/#pathways');
                }
              }}
              className="px-3 py-2 rounded-lg transition-colors hover:text-orange-600 hover:bg-orange-50/60"
            >
              Track Docket
            </a>
          </div>

          {/* Action / Auth CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' ? (
                  <Link
                    to="/portal/admin"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-orange-600 font-semibold text-xs shadow-sm transition-all"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                    <span>Scrutiny Board</span>
                  </Link>
                ) : (
                  <Link
                    to={`/portal/partner-dashboard${currentUser.associatedAppId ? `?appId=${currentUser.associatedAppId}` : ''}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs shadow-md shadow-orange-500/20 transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/portal/login?tab=admin"
                  className="px-3 py-2 rounded-xl text-slate-600 hover:text-orange-600 text-xs font-semibold hover:bg-orange-50/60 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>Scrutiny Board</span>
                </Link>

                <Link
                  to="/portal/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Portal Sign In</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/portal/login"
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-semibold shadow-sm"
            >
              Sign In
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-orange-50 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-orange-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-orange-100 py-4 px-2 space-y-2 bg-white rounded-b-2xl shadow-xl">
            <Link
              to="/"
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-orange-50 hover:text-orange-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portal Hub
            </Link>

            <div className="pt-2 pb-1 px-3 border-t border-orange-50">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500">
                Application Forms
              </span>
            </div>
            <Link
              to="/apply/pan-india"
              className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              1. Pan-India Channel Partner Form
            </Link>
            <Link
              to="/apply/regional"
              className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              2. Regional Channel Partner Form
            </Link>
            <Link
              to="/apply/franchise"
              className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              3. GenQuantis™ Franchise Investor Form
            </Link>

            <div className="pt-3 border-t border-orange-100 space-y-2">
              <Link
                to="/portal/login"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span>Partner Portal Sign In</span>
              </Link>
              <Link
                to="/portal/login?tab=admin"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Scrutiny Board Login</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
