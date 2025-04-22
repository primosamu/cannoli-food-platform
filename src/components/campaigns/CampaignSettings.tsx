import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Users, 
  Target, 
  Calendar, 
  Clock, 
  Tags, 
  BadgePercent, 
  MessageSquareDashed,
  MailOpen,
  ArrowRightCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CampaignTemplate } from "@/types/campaign";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CouponForm } from "@/components/coupons/CouponForm";
import { CouponFormValues } from "@/components/coupons/CouponSchema";
import { useLanguage } from "@/contexts/LanguageContext";
import PaidCampaignSettings from "./settings/PaidCampaignSettings";
import AudienceSettings from "./settings/AudienceSettings";
import ChannelSettings from "./settings/ChannelSettings";
import IncentiveSettings from "./settings/IncentiveSettings";
import ScheduleSettings from "./settings/ScheduleSettings";

interface CampaignSettingsProps {
  template: CampaignTemplate | null;
  onContinue: () => void;
}

const CampaignSettings: React.FC<CampaignSettingsProps> = ({ template, onContinue }) => {
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
  const { translations } = useLanguage();
  
  const { toast } = useToast();
  
  const isPaidCampaign = template?.type === "paid";

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

  const handleCreateNewCoupon = (data: CouponFormValues) => {
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
      {template && (
        <div className="bg-muted/50 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold">{template.name}</h3>
          <p className="text-muted-foreground mt-1">{template.description}</p>
          {template.category && (
            <Badge variant="outline" className="mt-2">
              {template.category === 'customer-recovery' && translations['customer-recovery']}
              {template.category === 'loyalty' && translations['loyalty']}
              {template.category === 'consumption-pattern' && translations['consumption-pattern']}
              {template.category === 'channel-migration' && translations['channel-migration']}
            </Badge>
          )}
        </div>
      )}

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

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleContinue} className="flex items-center gap-2">
          {translations.continueToCampaign || "Continue to Campaign Editor"}
          <ArrowRightCircle className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={newCouponDialogOpen} onOpenChange={setNewCouponDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{translations.createNewCouponInstead || "Create New Coupon"}</DialogTitle>
            <DialogDescription>
              {translations.fillOutCouponForm || "Fill out the form to create a new promotional coupon."}
            </DialogDescription>
          </DialogHeader>
          <CouponForm onSubmit={handleCreateNewCoupon} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignSettings;
