
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { getTemplatesByCategory } from "@/data/campaignTemplates";
import { CampaignTemplate } from "@/types/campaign";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignCalendar } from "@/components/campaigns/CampaignCalendar";

import CampaignHeader from "./campaigns/CampaignHeader";
import CampaignContent from "./campaigns/CampaignContent";
import CampaignPresetView from "./campaigns/CampaignPresetView";
import CampaignSettingsView from "./campaigns/CampaignSettingsView";
import CampaignReportsView from "./campaigns/CampaignReportsView";
import CampaignListView from "./campaigns/CampaignListView";
import CampaignHelpDialog from "./campaigns/CampaignHelpDialog";

const CampaignsPage = () => {
  const [activeView, setActiveView] = useState("list");
  const [campaignType, setCampaignType] = useState<"messaging" | "paid">("messaging");
  const [showCreator, setShowCreator] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const [campaignSettings, setCampaignSettings] = useState<{
    selectedChannels: string[];
    audienceType: string;
    incentiveType: string;
    scheduledDate: string;
    scheduledTime: string;
    inactiveDays: string;
    selectedSegment: string;
  } | null>(null);
  
  const location = useLocation();
  const { toast } = useToast();
  const { translations } = useLanguage();

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

  const handleContinueFromSettings = (settings: {
    selectedChannels: string[];
    audienceType: string;
    incentiveType: string;
    scheduledDate: string;
    scheduledTime: string;
    inactiveDays: string;
    selectedSegment: string;
  }) => {
    setCampaignSettings(settings);
    setShowSettings(false);
    setShowCreator(true);
  };

  const renderContent = () => {
    if (showReports) {
      return (
        <CampaignReportsView
          selectedCampaignId={selectedCampaignId}
          handleBack={() => {
            setShowReports(false);
            setActiveView("list");
          }}
        />
      );
    }
    
    if (showPresets) {
      return (
        <CampaignPresetView
          campaignType={campaignType}
          setCampaignType={setCampaignType}
          onSelect={handlePresetSelect}
        />
      );
    }
    
    if (showSettings) {
      return (
        <CampaignSettingsView
          selectedTemplate={selectedTemplate}
          handleGoBack={() => {
            setShowSettings(false);
            setShowPresets(true);
          }}
          handleContinueFromSettings={handleContinueFromSettings}
        />
      );
    }
    
    if (showCreator) {
      return (
        <CampaignContent
          showCreator={showCreator}
          selectedTemplate={selectedTemplate}
          campaignType={campaignType}
          handleGoBack={() => {
            if (selectedTemplate) {
              setShowCreator(false);
              setShowSettings(true);
            } else {
              setShowCreator(false);
              setShowPresets(true);
            }
          }}
          campaignSettings={campaignSettings}
          segmentName={location.state?.segmentName}
          segmentType={location.state?.segmentType}
        />
      );
    }
    
    if (activeView === "calendar") {
      return (
        <CampaignCalendar
          onViewReport={handleViewReport}
          onViewCampaign={handleViewCampaign}
        />
      );
    }

    return (
      <CampaignListView
        handleViewReport={handleViewReport}
        handleViewCampaign={handleViewCampaign}
        setShowReports={setShowReports}
        setActiveView={setActiveView}
      />
    );
  };

  return (
    <div className="space-y-6">
      <CampaignHeader
        handleCreateCampaign={handleCreateCampaign}
        setShowPresets={setShowPresets}
        setShowCreator={setShowCreator}
        setShowSettings={setShowSettings}
        setShowReports={setShowReports}
        showPresets={showPresets}
        showReports={showReports}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {renderContent()}

      <CampaignHelpDialog />
    </div>
  );
};

export default CampaignsPage;
