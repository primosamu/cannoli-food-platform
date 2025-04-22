
import React from "react";
import PaidCampaignSettings from "./settings/PaidCampaignSettings";
import AudienceSettings from "./settings/AudienceSettings";
import ChannelSettings from "./settings/ChannelSettings";
import IncentiveSettings from "./settings/IncentiveSettings";
import ScheduleSettings from "./settings/ScheduleSettings";
import { CampaignTemplate } from "@/types/campaign";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCampaignSettingsState } from "./settings/CampaignSettingsParts/useCampaignSettingsState";
import TemplateInfoSection from "./settings/CampaignSettingsParts/TemplateInfoSection";
import ContinueButton from "./settings/CampaignSettingsParts/ContinueButton";
import { NewCouponDialogSection } from "./settings/CampaignSettingsParts/NewCouponDialogSection";

interface CampaignSettingsProps {
  template: CampaignTemplate | null;
  onContinue: () => void;
}

const CampaignSettings: React.FC<CampaignSettingsProps> = ({ template, onContinue }) => {
  const { translations } = useLanguage();
  const isPaidCampaign = template?.type === "paid";

  const {
    selectedChannels,
    setSelectedChannels,
    audienceType,
    setAudienceType,
    incentiveType,
    setIncentiveType,
    scheduledDate,
    setScheduledDate,
    scheduledTime,
    setScheduledTime,
    inactiveDays,
    setInactiveDays,
    selectedSegment,
    setSelectedSegment,
    newCouponDialogOpen,
    setNewCouponDialogOpen,
    toast,
  } = useCampaignSettingsState(template);

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prevChannels => {
      if (prevChannels.includes(channelId)) {
        return prevChannels.filter(ch => ch !== channelId);
      } else {
        return [...prevChannels, channelId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedChannels.length === 0) {
      toast({
        title: "No channel selected",
        description: "Please select at least one channel for your campaign",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Campaign settings saved",
      description: "You can now customize your campaign content"
    });
    onContinue();
  };

  const getEstimatedAudience = () => {
    if (audienceType === 'all') return '235';
    if (audienceType === 'segment' && template?.category === 'customer-recovery') return '45';
    if (audienceType === 'custom' && template?.category === 'loyalty') return '78';
    if (audienceType === 'custom' && template?.category === 'consumption-pattern') return '112';
    return '120';
  };

  const handleCreateNewCoupon = (data: any) => {
    toast({
      title: "New coupon created",
      description: `Coupon "${data.name}" (${data.code}) has been created and added to this campaign.`
    });
    setNewCouponDialogOpen(false);
  };

  if (isPaidCampaign) {
    return (
      <PaidCampaignSettings template={template} onContinue={onContinue} />
    );
  }

  return (
    <div className="space-y-6">
      <TemplateInfoSection template={template} translations={translations} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AudienceSettings
          audienceType={audienceType}
          setAudienceType={setAudienceType}
          selectedSegment={selectedSegment}
          setSelectedSegment={setSelectedSegment}
          inactiveDays={inactiveDays}
          setInactiveDays={setInactiveDays}
          template={template}
          translations={translations}
          getEstimatedAudience={getEstimatedAudience}
        />

        <ChannelSettings
          selectedChannels={selectedChannels}
          handleChannelToggle={handleChannelToggle}
          translations={translations}
        />

        <IncentiveSettings
          incentiveType={incentiveType}
          setIncentiveType={setIncentiveType}
          setNewCouponDialogOpen={setNewCouponDialogOpen}
          template={template}
          translations={translations}
        />

        <ScheduleSettings
          scheduledDate={scheduledDate}
          setScheduledDate={setScheduledDate}
          scheduledTime={scheduledTime}
          setScheduledTime={setScheduledTime}
          translations={translations}
        />
      </div>

      <hr className="my-2 border-border" />

      <ContinueButton onClick={handleContinue} translations={translations} />

      <NewCouponDialogSection
        open={newCouponDialogOpen}
        onOpenChange={setNewCouponDialogOpen}
        onCreate={handleCreateNewCoupon}
        translations={translations}
      />
    </div>
  );
};

export default CampaignSettings;
