import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, ShieldCheck, Database, Award, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs">
      <div className="container mx-auto px-4 sm:px-6 py-14 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Organization & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/genquantis-logo.png"
                alt="GenQuantis"
                className="h-8 w-auto object-contain bg-white/95 px-2 py-1 rounded-lg shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Official Partner & Investor Portal provided by <strong>GenQuantis</strong>. Enabling next-generation AI preventive healthcare networks across India.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <Database className="w-3.5 h-3.5 text-orange-400" />
              <span>MongoDB Atlas Enterprise Core</span>
            </div>
          </div>

          {/* Column 2: Application Gateways */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Application Pathways
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/apply/pan-india" className="hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>Pan-India Channel Partner</span>
                  <span className="text-[10px] text-orange-400/80 font-mono font-medium">Tier 1</span>
                </Link>
              </li>
              <li>
                <Link to="/apply/regional" className="hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>Regional Channel Partner</span>
                  <span className="text-[10px] text-amber-400/80 font-mono font-medium">Tier 2</span>
                </Link>
              </li>
              <li>
                <Link to="/apply/franchise" className="hover:text-orange-400 transition-colors flex items-center justify-between">
                  <span>Franchise Diagnostic Center</span>
                  <span className="text-[10px] text-orange-500 font-mono font-medium">Tier 3</span>
                </Link>
              </li>
              <li>
                <Link to="/apply" className="hover:text-orange-400 transition-colors">
                  Multi-Pathway Comparison Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Governance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Governance & Portals
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/portal/login" className="hover:text-orange-400 transition-colors">
                  Applicant Docket Login
                </Link>
              </li>
              <li>
                <Link to="/portal/login?tab=admin" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>Executive Scrutiny Board</span>
                </Link>
              </li>
              <li>
                <Link to="/portal/partner-dashboard" className="hover:text-orange-400 transition-colors">
                  Partner Live Dashboard
                </Link>
              </li>
              <li>
                <a href="/#pathways" className="hover:text-orange-400 transition-colors">
                  Status Tracking by Ref ID
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Compliance & Contact
            </h4>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <a href="mailto:support@genquantis.com" className="hover:text-white transition-colors">
                support@genquantis.com
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <a href="tel:+917036905151" className="hover:text-white transition-colors">
                +91 7036905151
              </a>
            </div>
            <div className="flex items-start gap-2.5 text-slate-400 text-[11px] leading-relaxed">
              <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <span>Hyderabad / Bengaluru, India</span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-500 leading-relaxed mb-8">
          <strong className="text-slate-400">Statutory Notice:</strong> GenQuantis™ applications are subjected to rigorous scrutiny by the Corporate Screening Board. Submission of an application or payment of the onboarding fee does not guarantee territorial exclusivity until a formal agreement is executed directly by the authorized signatories of GenQuantis.
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} GenQuantis. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
