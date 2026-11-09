import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { PartnerPortalHub } from "./pages/partner/PartnerPortalHub";
import { ApplyPathway } from "./pages/partner/ApplyPathway";
import { PartnerDashboard } from "./pages/partner/PartnerDashboard";
import { ManagementDashboard } from "./pages/partner/ManagementDashboard";
import { PortalLogin } from "./pages/partner/PortalLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Partner & Investor Portal Root & Direct Paths */}
            <Route path="/" element={<PartnerPortalHub />} />
            <Route path="/partner-portal" element={<PartnerPortalHub />} />
            
            {/* Three Application Pathways & Multi-Step Application Forms */}
            <Route path="/apply" element={<ApplyPathway />} />
            <Route path="/apply/:pathway" element={<ApplyPathway />} />
            
            {/* Sign In Portals (Partner / Applicant & Scrutiny Board Admin) */}
            <Route path="/portal/login" element={<PortalLogin />} />
            <Route path="/login" element={<PortalLogin />} />
            
            {/* Dedicated Dashboards */}
            <Route path="/portal/partner-dashboard" element={<PartnerDashboard />} />
            <Route path="/portal/admin" element={<ManagementDashboard />} />
            
            {/* Catch-all */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

