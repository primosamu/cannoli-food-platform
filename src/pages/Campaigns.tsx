
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import CampaignHeader from "./campaigns/CampaignHeader";
import CampaignHelpDialog from "./campaigns/CampaignHelpDialog";
import CampaignContentRenderer from "@/components/campaigns/CampaignContentRenderer";
import { useCampaignsState } from "@/hooks/useCampaignsState";

const CampaignsPage = () => {
  const { translations } = useLanguage();
  const {
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
    selectedTemplate,
    campaignSettings,
    location,
    handlePresetSelect,
    handleCreateCampaign,
    handleViewReport,
    handleViewCampaign,
    handleContinueFromSettings
  } = useCampaignsState();

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

      <CampaignContentRenderer
        activeView={activeView}
        showReports={showReports}
        showPresets={showPresets}
        showSettings={showSettings}
        showCreator={showCreator}
        selectedCampaignId={selectedCampaignId}
        selectedTemplate={selectedTemplate}
        campaignType={campaignType}
        campaignSettings={campaignSettings}
        location={location}
        setActiveView={setActiveView}
        handlePresetSelect={handlePresetSelect}
        setShowReports={setShowReports}
        setShowSettings={setShowSettings}
        setShowPresets={setShowPresets}
        setShowCreator={setShowCreator}
        handleViewReport={handleViewReport}
        handleViewCampaign={handleViewCampaign}
        handleContinueFromSettings={handleContinueFromSettings}
      />

      <CampaignHelpDialog />
    </div>
  );
};

export default CampaignsPage;
