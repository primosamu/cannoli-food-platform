
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CouponsPage from "./pages/Coupons";
import MenuManagementPage from "./pages/MenuManagement";
import CustomersPage from "./pages/Customers";
import CampaignsPage from "./pages/Campaigns";
import CalendarPage from "./pages/Calendar";
import LoyaltyPage from "./pages/Loyalty";
import IntegrationsPage from "./pages/Integrations";
import SettingsPage from "./pages/Settings";
import OrderManagement from "./pages/OrderManagement";
import NotFound from "./pages/NotFound";
import React from "react";
import { LanguageProvider } from "./contexts/LanguageContext";

function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/coupons" element={<Layout><CouponsPage /></Layout>} />
              <Route path="/menus" element={<Layout><MenuManagementPage /></Layout>} />
              <Route path="/customers" element={<Layout><CustomersPage /></Layout>} />
              <Route path="/campaigns" element={<Layout><CampaignsPage /></Layout>} />
              <Route path="/calendar" element={<Layout><CalendarPage /></Layout>} />
              <Route path="/loyalty" element={<Layout><LoyaltyPage /></Layout>} />
              <Route path="/orders" element={<Layout><OrderManagement /></Layout>} />
              <Route path="/integrations" element={<Layout><IntegrationsPage /></Layout>} />
              <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HashRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
