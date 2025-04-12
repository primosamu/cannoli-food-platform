
import React, { useState } from "react";
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
  
  const { toast } = useToast();

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audience Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Audience Targeting
            </CardTitle>
            <CardDescription>
              Choose which customers will receive this campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={audienceType}
              onValueChange={setAudienceType}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="cursor-pointer">All customers</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="segment" id="segment" />
                <Label htmlFor="segment" className="cursor-pointer">Customer segment</Label>
              </div>
              
              {audienceType === "segment" && (
                <div className="pl-6 space-y-3">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a customer segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="inactive">Inactive Customers (60+ days)</SelectItem>
                        <SelectItem value="loyal">Loyal Customers (5+ orders)</SelectItem>
                        <SelectItem value="new">New Customers (1-2 orders)</SelectItem>
                        <SelectItem value="high-value">High-Value Customers ($100+)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="cursor-pointer">Custom criteria</Label>
              </div>
              
              {audienceType === "custom" && (
                <div className="pl-6 space-y-3">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select criteria type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="order-count">Order Count</SelectItem>
                        <SelectItem value="last-order">Last Order Date</SelectItem>
                        <SelectItem value="total-spent">Total Amount Spent</SelectItem>
                        <SelectItem value="food-preference">Food Preference</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </RadioGroup>
            
            <div className="mt-4">
              <Badge variant="secondary" className="bg-muted/60 hover:bg-muted text-muted-foreground">
                Estimated audience: 235 customers
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Channel Selection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Channel Selection
            </CardTitle>
            <CardDescription>
              Choose which channels to use for this campaign
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
                    Direct messaging with 98% open rates
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
                    Text messaging for important updates
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
                    Detailed messaging with images and formatting
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="channel-paid" 
                  checked={selectedChannels.includes("paid")}
                  onCheckedChange={() => handleChannelToggle("paid")}
                  className="mt-1"
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="channel-paid" className="font-medium flex items-center">
                    <Target className="h-4 w-4 mr-2 text-purple-600" />
                    Paid Advertising
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Paid ads on social media platforms
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Incentives Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tags className="h-5 w-5" />
              Incentives & Offers
            </CardTitle>
            <CardDescription>
              Add promotional incentives to your campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue={incentiveType} 
              onValueChange={setIncentiveType}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="no-incentive" />
                <Label htmlFor="no-incentive">No incentive</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="coupon" id="coupon" />
                <Label htmlFor="coupon">Add coupon</Label>
              </div>
              
              {incentiveType === "coupon" && (
                <div className="pl-6 space-y-3">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select existing coupon" />
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
                    <Button variant="link" size="sm" className="h-auto p-0">
                      <BadgePercent className="h-3 w-3 mr-1" />
                      Create new coupon instead
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="loyalty" id="loyalty" />
                <Label htmlFor="loyalty">Add loyalty points</Label>
              </div>
              
              {incentiveType === "loyalty" && (
                <div className="pl-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="points-amount">Points to award:</Label>
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
              Scheduling
            </CardTitle>
            <CardDescription>
              Set when your campaign should be delivered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <RadioGroup defaultValue="now" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="send-now" />
                  <Label htmlFor="send-now">Send immediately</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled">Schedule for later</Label>
                </div>
                
                <div className="pl-6 grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      type="date" 
                      id="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
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
                      Optimize delivery time
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send at best time for each customer based on their past engagement
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
          Continue to Campaign Editor
          <ArrowRightCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CampaignSettings;
