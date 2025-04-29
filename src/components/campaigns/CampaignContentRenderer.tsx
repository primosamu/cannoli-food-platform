
import React from "react";
import { CampaignTemplate } from "@/types/campaign";
import { CampaignCalendar } from "@/components/campaigns/CampaignCalendar";
import CampaignPresetView from "@/pages/campaigns/CampaignPresetView";
import CampaignSettingsView from "@/pages/campaigns/CampaignSettingsView";
import CampaignReportsView from "@/pages/campaigns/CampaignReportsView";
import CampaignContent from "@/pages/campaigns/CampaignContent";
import CampaignListView from "@/pages/campaigns/CampaignListView";

interface CampaignContentRendererProps {
  activeView: string;
  showReports: boolean;
  showPresets: boolean;
  showSettings: boolean;
  showCreator: boolean;
  selectedCampaignId: string | null;
  selectedTemplate: CampaignTemplate | null;
  campaignType: "messaging" | "paid";
  campaignSettings: {
    selectedChannels: string[];
    audienceType: string;
    incentiveType: string;
    scheduledDate: string;
    scheduledTime: string;
    inactiveDays: string;
    selectedSegment: string;
  } | null;
  location: any;
  setActiveView: (view: string) => void;
  handlePresetSelect: (template: CampaignTemplate) => void;
  setShowReports: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setShowPresets: (show: boolean) => void;
  setShowCreator: (show: boolean) => void;
  handleViewReport: (campaignId: string) => void;
  handleViewCampaign: (campaignId: string) => void;
  handleContinueFromSettings: (settings: {
    selectedChannels: string[];
    audienceType: string;
    incentiveType: string;
    scheduledDate: string;
    scheduledTime: string;
    inactiveDays: string;
    selectedSegment: string;
  }) => void;
}

const CampaignContentRenderer: React.FC<CampaignContentRendererProps> = ({
  activeView,
  showReports,
  showPresets,
  showSettings,
  showCreator,
  selectedCampaignId,
  selectedTemplate,
  campaignType,
  campaignSettings,
  location,
  setActiveView,
  handlePresetSelect,
  setShowReports,
  setShowSettings,
  setShowPresets,
  setShowCreator,
  handleViewReport,
  handleViewCampaign,
  handleContinueFromSettings
}) => {
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
        setCampaignType={() => {}} // This is handled in useCampaignsState now
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

export default CampaignContentRenderer;
