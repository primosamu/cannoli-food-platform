
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getTemplatesByCategory } from "@/data/campaignTemplates";
import { CampaignTemplate } from "@/types/campaign";

type CampaignSettings = {
  selectedChannels: string[];
  audienceType: string;
  incentiveType: string;
  scheduledDate: string;
  scheduledTime: string;
  inactiveDays: string;
  selectedSegment: string;
};

export const useCampaignsState = () => {
  const [activeView, setActiveView] = useState("list");
  const [campaignType, setCampaignType] = useState<"messaging" | "paid">("messaging");
  const [showCreator, setShowCreator] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const [campaignSettings, setCampaignSettings] = useState<CampaignSettings | null>(null);
  
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.state && location.state.createCampaign) {
      console.log("Creating campaign with state:", location.state);
      setShowCreator(false);
      setShowPresets(true);
      setShowSettings(false);
      setShowReports(false);

      if (location.state.category) {
        const templates = getTemplatesByCategory(location.state.category);
        if (templates && templates.length > 0) {
          setSelectedTemplate(templates[0]);
          handlePresetSelect(templates[0]);
        }
      }
    }
  }, [location]);

  const handlePresetSelect = (template: CampaignTemplate) => {
    setSelectedTemplate(template);
    setShowCreator(false);
    setShowPresets(false);
    setShowSettings(true);
    setShowReports(false);
    
    toast({
      title: "Template selecionado",
      description: `Template ${template.name} carregado com sucesso.`,
    });
  };

  const handleCreateCampaign = (type: "messaging" | "paid" = "messaging") => {
    setCampaignType(type);
    setShowCreator(true);
    setShowPresets(false);
    setShowSettings(false);
    setShowReports(false);
    setActiveView("list");
  };

  const handleViewReport = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setShowReports(true);
    setShowCreator(false);
    setShowPresets(false);
    setShowSettings(false);
    setActiveView("reports");
  };

  const handleViewCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setShowCreator(true);
    setShowPresets(false);
    setShowSettings(false);
    setShowReports(false);
  };

  const handleContinueFromSettings = (settings: CampaignSettings) => {
    setCampaignSettings(settings);
    setShowSettings(false);
    setShowCreator(true);
  };

  return {
    activeView,
    setActiveView,
    campaignType,
    setCampaignType,
    showCreator,
    setShowCreator,
    showPresets,
    setShowPresets,
    showSettings,
    setShowSettings,
    showReports,
    setShowReports,
    selectedCampaignId,
    setSelectedCampaignId,
    selectedTemplate,
    setSelectedTemplate,
    campaignSettings,
    setCampaignSettings,
    location,
    handlePresetSelect,
    handleCreateCampaign,
    handleViewReport,
    handleViewCampaign,
    handleContinueFromSettings
  };
};
