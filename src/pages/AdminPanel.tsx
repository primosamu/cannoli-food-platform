
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowRightLeft, ChevronUp, ChevronDown, DollarSign, 
  Users, CreditCard, LineChart, ShoppingBag, Settings, Lock,
  FileText, UserCog, Wallet, AlertCircle
} from "lucide-react";
import { AdminMetricsPanel } from "@/components/admin/AdminMetricsPanel";
import { CustomerManagementPanel } from "@/components/admin/CustomerManagementPanel";
import { PaymentsPanel } from "@/components/admin/PaymentsPanel";
import { SystemSettingsPanel } from "@/components/admin/SystemSettingsPanel";
import { useLanguage } from "@/contexts/LanguageContext";
import { AdminAuthCheck } from "@/components/admin/AdminAuthCheck";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { translations } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <AdminAuthCheck>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Painel Administrativo</h2>
            <p className="text-muted-foreground">
              Gerencie clientes, pagamentos e configurações do sistema
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Pagamentos</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configurações</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <AdminMetricsPanel />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagementPanel />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentsPanel />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </AdminAuthCheck>
  );
};

export default AdminPanel;
