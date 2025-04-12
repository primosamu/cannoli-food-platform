
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  MessageSquare, 
  Mail, 
  Image, 
  BarChart, 
  Calendar, 
  Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import CampaignCreator from "@/components/campaigns/CampaignCreator";
import CampaignList from "@/components/campaigns/CampaignList";
import ImageOptimizer from "@/components/campaigns/ImageOptimizer";
import {
  getActiveCampaigns,
  getCompletedCampaigns,
  getScheduledCampaigns,
  getDraftCampaigns
} from "@/data/sampleCampaigns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getTemplatesByCategory } from "@/data/campaignTemplates";
import { CampaignTemplate } from "@/types/campaign";

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showCreator, setShowCreator] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const location = useLocation();

  // Get the campaigns for each tab
  const activeCampaigns = getActiveCampaigns();
  const scheduledCampaigns = getScheduledCampaigns();
  const completedCampaigns = getCompletedCampaigns();
  const draftCampaigns = getDraftCampaigns();

  // Handle navigation from other parts of the app
  useEffect(() => {
    if (location.state && location.state.createCampaign) {
      setShowCreator(true);

      // Check if we have a category to select a template
      if (location.state.category) {
        // Find a template that matches the category
        const templates = getTemplatesByCategory(location.state.category);
        if (templates && templates.length > 0) {
          setSelectedTemplate(templates[0]);
        }
      }
    }
  }, [location]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h2>
          <p className="text-muted-foreground">
            Create and manage marketing campaigns for your restaurant.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setShowCreator(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
        </div>
      </div>

      {showCreator ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>
                  Design your marketing campaign for WhatsApp, SMS, Email or Paid Traffic
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setShowCreator(false)}>
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">
                  <MessageSquare className="mr-2 h-4 w-4" /> 
                  Content
                </TabsTrigger>
                <TabsTrigger value="images">
                  <Image className="mr-2 h-4 w-4" /> 
                  Images
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="pt-6">
                <CampaignCreator 
                  initialTemplate={selectedTemplate}
                  segmentName={location.state?.segmentName}
                  segmentType={location.state?.segmentType}
                />
              </TabsContent>
              <TabsContent value="images" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageOptimizer />
                  <Card>
                    <CardHeader>
                      <CardTitle>Image Gallery</CardTitle>
                      <CardDescription>
                        Select from your previous images or upload new ones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div 
                            key={item} 
                            className="aspect-video bg-gray-100 rounded flex items-center justify-center"
                          >
                            <span className="text-muted-foreground">Image {item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>All Campaigns</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Button>
                <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="p-0">
              <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-transparent p-0">
                <TabsTrigger 
                  value="active" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger 
                  value="scheduled" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Scheduled
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger 
                  value="drafts" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  Drafts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="p-6">
                <CampaignList campaigns={activeCampaigns} type="active" />
              </TabsContent>
              <TabsContent value="scheduled" className="p-6">
                <CampaignList campaigns={scheduledCampaigns} type="scheduled" />
              </TabsContent>
              <TabsContent value="completed" className="p-6">
                <CampaignList campaigns={completedCampaigns} type="completed" />
              </TabsContent>
              <TabsContent value="drafts" className="p-6">
                <CampaignList campaigns={draftCampaigns} type="draft" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Floating help button with templates info */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="fixed bottom-6 right-6 rounded-full h-12 w-12 shadow-lg p-0"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Campaign Templates</DialogTitle>
            <DialogDescription>
              Use our ready-made templates to create effective marketing campaigns.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Available Template Types:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-green-600 mr-2" />
                  WhatsApp Templates
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                  SMS Templates
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-orange-600 mr-2" />
                  Email Templates
                </li>
                <li className="flex items-center">
                  <Image className="h-4 w-4 text-purple-600 mr-2" />
                  Paid Traffic Templates
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Click on "Create Campaign" and select a template to get started quickly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
