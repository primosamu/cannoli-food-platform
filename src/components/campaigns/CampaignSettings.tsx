
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
  
  // Set default audience type and segment based on template category
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
      
      // Set incentive type based on template
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
        {/* Audience Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {translations.audienceTargeting || "Audience Targeting"}
            </CardTitle>
            <CardDescription>
              {translations.chooseAudience || "Choose which customers will receive this campaign"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={audienceType}
              onValueChange={setAudienceType}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer">{translations.allCustomers || "All customers"}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="segment" id="segment" />
                <Label htmlFor="segment" className="cursor-pointer">{translations.customerSegment || "Customer segment"}</Label>
              </div>
              
              {audienceType === "segment" && (
                <div className="pl-6 space-y-3">
                  <Select 
                    value={selectedSegment} 
                    onValueChange={setSelectedSegment}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={translations.selectSegment || "Select a customer segment"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="inactive">{translations.inactiveCustomers || "Inactive Customers"} ({inactiveDays} {translations.inactiveDays ? translations.inactiveDays.split(':')[0].toLowerCase() : "days"})</SelectItem>
                        <SelectItem value="loyal">{translations.loyalCustomers || "Loyal Customers (5+ orders)"}</SelectItem>
                        <SelectItem value="new">{translations.newCustomers || "New Customers (1-2 orders)"}</SelectItem>
                        <SelectItem value="high-value">{translations.highValueCustomers || "High-Value Customers ($100+)"}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  {(selectedSegment === "inactive" || template?.category === 'customer-recovery') && (
                    <div className="flex items-center gap-2 mt-2">
                      <Label htmlFor="inactive-days">{translations.inactiveDays || "Inactive for at least:"}</Label>
                      <Input 
                        id="inactive-days" 
                        type="number" 
                        className="w-20" 
                        value={inactiveDays}
                        onChange={(e) => setInactiveDays(e.target.value)}
                      />
                      <span className="text-sm">{translations.inactiveDays ? translations.inactiveDays.split(':')[0].toLowerCase() : "days"}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="cursor-pointer">{translations.customCriteria || "Custom criteria"}</Label>
              </div>
              
              {audienceType === "custom" && (
                <div className="pl-6 space-y-3">
                  <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={translations.selectSegment || "Select criteria type"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="order-count">{translations.orderCount || "Order Count"}</SelectItem>
                        <SelectItem value="last-order">{translations.lastOrder || "Last Order Date"}</SelectItem>
                        <SelectItem value="total-spent">{translations.totalSpent || "Total Amount Spent"}</SelectItem>
                        <SelectItem value="food-preference">{translations.foodPreference || "Food Preference"}</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </RadioGroup>
            
            <div className="mt-4">
              <Badge variant="secondary" className="bg-muted/60 hover:bg-muted text-muted-foreground">
                {translations.estimatedAudience || "Estimated audience"}: {getEstimatedAudience()} {translations.customers || "customers"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Channel Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {translations.channelSelection || "Channel Selection"}
            </CardTitle>
            <CardDescription>
              {translations.chooseChannels || "Choose which channels to use for this campaign"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="channel-whatsapp" 
                  checked={selectedChannels.includes("whatsapp")}
                  onCheckedChange={() => handleChannelToggle("whatsapp")}
                  className="mt-1"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="channel-whatsapp" className="font-medium flex items-center">
                    <MessageSquareDashed className="h-4 w-4 mr-2 text-green-600" />
                    WhatsApp
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {translations.directMessaging || "Direct messaging with 98% open rates"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="channel-sms" 
                  checked={selectedChannels.includes("sms")}
                  onCheckedChange={() => handleChannelToggle("sms")}
                  className="mt-1"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="channel-sms" className="font-medium flex items-center">
                    <MessageSquareDashed className="h-4 w-4 mr-2 text-blue-600" />
                    SMS
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {translations.textMessaging || "Text messaging for important updates"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="channel-email" 
                  checked={selectedChannels.includes("email")}
                  onCheckedChange={() => handleChannelToggle("email")}
                  className="mt-1"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="channel-email" className="font-medium flex items-center">
                    <MailOpen className="h-4 w-4 mr-2 text-orange-600" />
                    Email
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {translations.detailedMessaging || "Detailed messaging with images and formatting"}
                  </p>
                </div>
              </div>
              
              {/* Removed the Paid Traffic option as per requirements */}
            </div>
          </CardContent>
        </Card>
        
        {/* Incentives Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags className="h-5 w-5" />
              {translations.incentivesOffers || "Incentives & Offers"}
            </CardTitle>
            <CardDescription>
              {translations.addIncentives || "Add promotional incentives to your campaign"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={incentiveType} 
              onValueChange={setIncentiveType}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="no-incentive" />
                <Label htmlFor="no-incentive">{translations.noIncentive || "No incentive"}</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="coupon" id="coupon" />
                <Label htmlFor="coupon">{translations.addCoupon || "Add coupon"}</Label>
              </div>
              
              {incentiveType === "coupon" && (
                <div className="pl-6 space-y-3">
                  <Select defaultValue={template?.category === 'customer-recovery' ? "welcome-back-10" : undefined}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={translations.selectCoupon || "Select existing coupon"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="welcome-back-10">Welcome Back 10% OFF</SelectItem>
                        <SelectItem value="free-delivery">Free Delivery</SelectItem>
                        <SelectItem value="bogo">Buy One Get One Free</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center">
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => setNewCouponDialogOpen(true)}
                    >
                      <BadgePercent className="h-3 w-3 mr-1" />
                      {translations.createNewCouponInstead || "Create new coupon instead"}
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="loyalty" id="loyalty" />
                <Label htmlFor="loyalty">{translations.addLoyaltyPoints || "Add loyalty points"}</Label>
              </div>
              
              {incentiveType === "loyalty" && (
                <div className="pl-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="points-amount">{translations.pointsToAward || "Points to award:"}</Label>
                    <Input 
                      type="number" 
                      id="points-amount"
                      className="w-24"
                      placeholder="100" 
                    />
                  </div>
                </div>
              )}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Scheduling Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {translations.scheduling || "Scheduling"}
            </CardTitle>
            <CardDescription>
              {translations.setDeliveryTime || "Set when your campaign should be delivered"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RadioGroup defaultValue="now" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="send-now" />
                  <Label htmlFor="send-now">{translations.sendImmediately || "Send immediately"}</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled">{translations.scheduleForLater || "Schedule for later"}</Label>
                </div>
                
                <div className="pl-6 grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="date">{translations.date || "Date"}</Label>
                    <Input 
                      type="date" 
                      id="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">{translations.time || "Time"}</Label>
                    <Input 
                      type="time" 
                      id="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                </div>
              </RadioGroup>
              
              <div className="mt-4">
                <div className="flex items-start space-x-3">
                  <Checkbox id="optimize-time" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="optimize-time" className="font-medium">
                      {translations.optimizeDelivery || "Optimize delivery time"}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {translations.optimizeDescription || "Send at best time for each customer based on their past engagement"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button onClick={handleContinue} className="flex items-center gap-2">
          {translations.continueToCampaign || "Continue to Campaign Editor"}
          <ArrowRightCircle className="h-4 w-4" />
        </Button>
      </div>

      {/* New Coupon Dialog */}
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
