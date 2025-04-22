
import { useState, useEffect } from "react";
import { CampaignTemplate } from "@/types/campaign";
import { useToast } from "@/components/ui/use-toast";

export const useCampaignSettingsState = (template: CampaignTemplate | null) => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(
    template?.type ? [template.type] : ["whatsapp"]
  );
  const [audienceType, setAudienceType] = useState<string>("all");
  const [incentiveType, setIncentiveType] = useState<string>("none");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [inactiveDays, setInactiveDays] = useState<string>(template?.inactiveDays || "60");
  const [selectedSegment, setSelectedSegment] = useState<string>("");
  const [newCouponDialogOpen, setNewCouponDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (template?.category) {
      if (template.category === 'customer-recovery') {
        setAudienceType('segment');
        setSelectedSegment("inactive");
        setInactiveDays(template.inactiveDays || "60");
      } else if (template.category === 'loyalty') {
        setAudienceType('custom');
        setSelectedSegment("order-count");
      } else if (template.category === 'consumption-pattern') {
        setAudienceType('custom');
        setSelectedSegment("food-preference");
      } else if (template.category === 'channel-migration') {
        setAudienceType('all');
      }
      if (template.category === 'customer-recovery') {
        setIncentiveType('coupon');
      } else if (template.category === 'loyalty') {
        setIncentiveType('loyalty');
      }
    }
  }, [template]);

  return {
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
  };
};
