
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Check,
  ChevronRight,
  Clock,
  Edit,
  ExternalLink,
  ThumbsUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type CampaignTrigger = {
  id: string;
  name: string;
  description: string;
  segment: string;
  template: string;
  isActive: boolean;
  cooldownDays: number;
  lastTriggered?: string;
  totalSent: number;
};

export const AutomaticCampaigns = () => {
  const [campaignTriggers, setCampaignTriggers] = useState<CampaignTrigger[]>([
    {
      id: "trigger-1",
      name: "New Customer Welcome",
      description: "Send welcome message to new customers",
      segment: "New Customers",
      template: "Welcome Template",
      isActive: true,
      cooldownDays: 0,
      lastTriggered: "2025-04-11",
      totalSent: 156,
    },
    {
      id: "trigger-2",
      name: "Loyal Customer Reward",
      description: "Special offer for loyal customers",
      segment: "Loyal Customers",
      template: "Loyalty Rewards",
      isActive: true,
      cooldownDays: 30,
      lastTriggered: "2025-04-05",
      totalSent: 87,
    },
    {
      id: "trigger-3",
      name: "Win-back Campaign",
      description: "Re-engage customers at risk",
      segment: "At Risk",
      template: "Win-back Offer",
      isActive: false,
      cooldownDays: 45,
      lastTriggered: "2025-03-22",
      totalSent: 34,
    },
    {
      id: "trigger-4",
      name: "First-time Buyer Follow-up",
      description: "Survey and second purchase incentive",
      segment: "New Customers",
      template: "Follow-up Survey",
      isActive: true,
      cooldownDays: 7,
      totalSent: 112,
    },
    {
      id: "trigger-5",
      name: "RFM Champions Exclusive",
      description: "Exclusive offers for top customers",
      segment: "Champions",
      template: "VIP Exclusive",
      isActive: true,
      cooldownDays: 14,
      lastTriggered: "2025-04-08",
      totalSent: 45,
    },
  ]);

  const toggleTriggerStatus = (triggerId: string) => {
    setCampaignTriggers((prev) =>
      prev.map((trigger) =>
        trigger.id === triggerId
          ? { ...trigger, isActive: !trigger.isActive }
          : trigger
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Automatic Campaigns</h2>
          <p className="text-muted-foreground">
            Campaigns automatically triggered when customers enter specific segments
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          New Trigger
        </Button>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Contact Frequency Protection Active</AlertTitle>
        <AlertDescription>
          Customers who have received too many messages recently will be automatically excluded from campaigns.
          <Button variant="link" className="pl-0 h-auto">View frequency settings</Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Triggers</TabsTrigger>
          <TabsTrigger value="all">All Triggers</TabsTrigger>
          <TabsTrigger value="segment">By Segment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          <div className="space-y-4">
            {campaignTriggers
              .filter((trigger) => trigger.isActive)
              .map((trigger) => (
                <Card key={trigger.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          {trigger.name}
                          {trigger.isActive && (
                            <Badge className="bg-green-500">Active</Badge>
                          )}
                        </h3>
                        <p className="text-muted-foreground">
                          {trigger.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTriggerStatus(trigger.id)}
                        >
                          {trigger.isActive ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          TARGET SEGMENT
                        </Label>
                        <div className="flex items-center mt-1">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{trigger.segment}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          TEMPLATE
                        </Label>
                        <div className="flex items-center mt-1">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          <span>{trigger.template}</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          COOLDOWN PERIOD
                        </Label>
                        <div className="flex items-center mt-1">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            {trigger.cooldownDays} days
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t mt-4 pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            TOTAL SENT
                          </Label>
                          <p className="font-medium">{trigger.totalSent}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            LAST TRIGGERED
                          </Label>
                          <p className="font-medium">
                            {trigger.lastTriggered || "Never"}
                          </p>
                        </div>
                      </div>
                      <Button variant="link" className="flex items-center gap-1">
                        View Stats
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
            {campaignTriggers.filter((t) => t.isActive).length === 0 && (
              <div className="text-center py-8 border rounded-md bg-muted/20">
                <p className="text-muted-foreground">No active triggers found</p>
                <Button className="mt-4">Create Trigger</Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="mt-6">
          <div className="space-y-4">
            {campaignTriggers.map((trigger) => (
              <Card key={trigger.id} className={!trigger.isActive ? "opacity-70" : ""}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg flex items-center gap-2">
                        {trigger.name}
                        {trigger.isActive ? (
                          <Badge className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="outline">Inactive</Badge>
                        )}
                      </h3>
                      <p className="text-muted-foreground">
                        {trigger.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTriggerStatus(trigger.id)}
                      >
                        {trigger.isActive ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        TARGET SEGMENT
                      </Label>
                      <div className="flex items-center mt-1">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{trigger.segment}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        TEMPLATE
                      </Label>
                      <div className="flex items-center mt-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <span>{trigger.template}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">
                        COOLDOWN PERIOD
                      </Label>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>
                          {trigger.cooldownDays} days
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t mt-4 pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          TOTAL SENT
                        </Label>
                        <p className="font-medium">{trigger.totalSent}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">
                          LAST TRIGGERED
                        </Label>
                        <p className="font-medium">
                          {trigger.lastTriggered || "Never"}
                        </p>
                      </div>
                    </div>
                    <Button variant="link" className="flex items-center gap-1">
                      View Stats
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="segment" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                RFM Segments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Champions</CardTitle>
                    <CardDescription>
                      Best customers, highly engaged
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Active trigger:</span>
                      <Badge className="bg-green-500">RFM Champions Exclusive</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <span className="text-xs text-muted-foreground">95 customers</span>
                    <Button variant="link" size="sm" className="h-auto p-0">Manage</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Loyal Customers</CardTitle>
                    <CardDescription>
                      Consistent spenders, frequent
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Active trigger:</span>
                      <Badge className="bg-green-500">Loyal Customer Reward</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <span className="text-xs text-muted-foreground">120 customers</span>
                    <Button variant="link" size="sm" className="h-auto p-0">Manage</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customer Lifecycle
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">New Customers</CardTitle>
                    <CardDescription>
                      First-time customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Active trigger:</span>
                      <Badge className="bg-green-500">New Customer Welcome</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <span className="text-xs text-muted-foreground">180 customers</span>
                    <Button variant="link" size="sm" className="h-auto p-0">Manage</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">At Risk</CardTitle>
                    <CardDescription>
                      Once valuable, slipping away
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Active trigger:</span>
                      <Badge variant="outline">Not configured</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <span className="text-xs text-muted-foreground">80 customers</span>
                    <Button variant="link" size="sm" className="h-auto p-0">Create Trigger</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
