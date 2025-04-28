
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Sparkles, Calendar, BarChart, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CampaignHeaderProps {
  handleCreateCampaign: (type: "messaging" | "paid") => void;
  setShowPresets: (show: boolean) => void;
  setShowCreator: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setShowReports: (show: boolean) => void;
  showPresets: boolean;
  showReports: boolean;
  activeView: string;
  setActiveView: (view: string) => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  handleCreateCampaign,
  setShowPresets,
  setShowCreator,
  setShowSettings,
  setShowReports,
  showPresets,
  showReports,
  activeView,
  setActiveView
}) => {
  const { translations } = useLanguage();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{translations.marketingCampaigns || "Campanhas de Marketing"}</h2>
        <p className="text-muted-foreground">
          {translations.createManageCampaigns || "Crie e gerencie campanhas de marketing para seu restaurante."}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {!showPresets && !showReports && activeView !== "calendar" && (
          <Button 
            variant="outline" 
            className="items-center gap-2"
            onClick={() => {
              setShowPresets(true);
              setShowCreator(false);
              setShowSettings(false);
              setShowReports(false);
            }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden md:inline">{translations.presetCampaigns || "Campanhas Predefinidas"}</span>
            <span className="inline md:hidden">{translations.presets || "Predefinidas"}</span>
          </Button>
        )}
        {!showReports && activeView !== "calendar" && (
          <Button 
            variant="outline" 
            className="items-center gap-2"
            onClick={() => {
              setActiveView(activeView === "list" ? "calendar" : "list");
              setShowReports(false);
              setShowPresets(false);
              setShowCreator(false);
              setShowSettings(false);
            }}
          >
            {activeView === "list" ? (
              <Calendar className="h-4 w-4 mr-2" />
            ) : (
              <BarChart className="h-4 w-4 mr-2" />
            )}
            {activeView === "list" ? "Calendário" : "Lista"}
          </Button>
        )}
        <Button 
          variant="outline" 
          className="hidden md:flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {translations.filter || "Filtrar"}
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => handleCreateCampaign("messaging")}
          className="flex items-center gap-2"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> 
          {translations.createCampaign || "Criar Campanha"}
        </Button>
      </div>
    </div>
  );
};

export default CampaignHeader;
