
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, PercentCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CampaignHeaderProps {
  handleCreateCampaign: (type: "messaging" | "paid") => void;
  setShowPresets: (show: boolean) => void;
  setShowCreator: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setShowReports: (show: boolean) => void;
  showPresets: boolean;
  showReports: boolean;
  showCreator: boolean;  // Added missing prop
  showSettings: boolean; // Added missing prop
  activeView: string;
  setActiveView: (view: string) => void;
  campaignType: "messaging" | "paid";
  setCampaignType: (type: "messaging" | "paid") => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  handleCreateCampaign,
  setShowPresets,
  setShowCreator,
  setShowSettings,
  setShowReports,
  showPresets,
  showReports,
  showCreator,  // Added missing prop
  showSettings,  // Added missing prop
  activeView,
  setActiveView,
  campaignType,
  setCampaignType
}) => {
  const { translations } = useLanguage();
  
  const handleCampaignTypeChange = (type: "messaging" | "paid") => {
    setCampaignType(type);
    if (!showReports && !showCreator && !showSettings) {
      setShowPresets(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {translations.marketingCampaigns || "Campanhas de Marketing"}
        </h1>
        <p className="text-muted-foreground">
          {translations.createManageCampaigns || "Crie e gerencie campanhas de marketing para seu restaurante."}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 w-full md:w-auto">
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setShowPresets(true);
              setShowCreator(false);
              setShowSettings(false);
              setShowReports(false);
            }}
            variant="outline"
            className="hidden md:flex"
          >
            {translations.presets || "Templates"}
          </Button>
          
          <Button 
            onClick={() => handleCreateCampaign(campaignType)}
            className="flex-1 md:flex-none"
          >
            {translations.createCampaign || "Criar Campanha"}
          </Button>
        </div>
        
        {!showPresets && !showReports && (
          <Tabs 
            value={activeView} 
            onValueChange={setActiveView as (value: string) => void}
            className="w-full md:w-auto"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">
                {translations.allCampaigns || "Todas as Campanhas"}
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="mr-2 h-4 w-4" />
                {translations.schedule || "Calendário"}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        
        <div className="flex gap-2 mt-1">
          <Button 
            variant={campaignType === "messaging" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleCampaignTypeChange("messaging")}
            className="text-xs"
          >
            <MessageSquare className="mr-1 h-3 w-3" />
            {translations.messaging || "Mensageria"}
          </Button>
          <Button 
            variant={campaignType === "paid" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleCampaignTypeChange("paid")}
            className="text-xs"
          >
            <PercentCircle className="mr-1 h-3 w-3" />
            {translations.paidTraffic || "Tráfego Pago"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampaignHeader;
