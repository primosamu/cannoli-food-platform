
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
  Filter,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import CampaignCreator from "@/components/campaigns/CampaignCreator";
import CampaignList from "@/components/campaigns/CampaignList";
import ImageOptimizer from "@/components/campaigns/ImageOptimizer";
import PresetCampaigns from "@/components/campaigns/PresetCampaigns";
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
import { CampaignTemplate, CampaignEvent } from "@/types/campaign";
import { useToast } from "@/components/ui/use-toast";
import CampaignSettings from "@/components/campaigns/CampaignSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignCalendar } from "@/components/campaigns/CampaignCalendar";
import { CampaignReports } from "@/components/campaigns/CampaignReports";

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeView, setActiveView] = useState("list");
  const [showCreator, setShowCreator] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const location = useLocation();
  const { toast } = useToast();
  const { translations } = useLanguage();

  const activeCampaigns = getActiveCampaigns();
  const scheduledCampaigns = getScheduledCampaigns();
  const completedCampaigns = getCompletedCampaigns();
  const draftCampaigns = getDraftCampaigns();

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
      title: "Template selected",
      description: `${template.name} template loaded successfully.`,
    });
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

  const renderContent = () => {
    // Show campaign reports
    if (showReports) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Campaign Reports</CardTitle>
                <CardDescription>
                  View detailed analytics and performance for your campaigns
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => {
                setShowReports(false);
                setActiveView("list");
              }}>
                Back to Campaigns
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CampaignReports campaignId={selectedCampaignId || undefined} />
          </CardContent>
        </Card>
      );
    }
    
    // Show preset campaigns selection
    if (showPresets) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{translations.presetCampaigns || "Preset Campaigns"}</CardTitle>
                <CardDescription>
                  {translations.chooseTemplates || "Choose from ready-to-use campaign templates"}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => {
                setShowPresets(false);
                setShowCreator(false);
                setShowSettings(false);
                setShowReports(false);
              }}>
                {translations.viewAllCampaigns || "View All Campaigns"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PresetCampaigns onSelect={handlePresetSelect} />
          </CardContent>
        </Card>
      );
    }
    
    // Show campaign settings
    if (showSettings) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedTemplate ? `Campaign Settings: ${selectedTemplate.name}` : 'Campaign Settings'}</CardTitle>
                <CardDescription>
                  Configure your campaign audience, channels and delivery options
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => {
                setShowSettings(false);
                setShowPresets(true);
              }}>
                Back to Templates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CampaignSettings 
              template={selectedTemplate}
              onContinue={() => {
                setShowSettings(false);
                setShowCreator(true);
              }}
            />
          </CardContent>
        </Card>
      );
    }
    
    // Show campaign creator
    if (showCreator) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {selectedTemplate ? `Create Campaign: ${selectedTemplate.name}` : 'Create New Campaign'}
                </CardTitle>
                <CardDescription>
                  Design your marketing campaign for WhatsApp, SMS, Email or Paid Traffic
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => {
                if (selectedTemplate) {
                  setShowCreator(false);
                  setShowSettings(true);
                } else {
                  setShowCreator(false);
                  setShowPresets(true);
                }
              }}>
                {selectedTemplate ? 'Back to Settings' : 'Back to Templates'}
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
      );
    }
    
    // Show campaign list or calendar view
    if (activeView === "calendar") {
      return (
        <CampaignCalendar
          onViewReport={handleViewReport}
          onViewCampaign={handleViewCampaign}
        />
      );
    }

    // Default view - campaign list
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>{translations.allCampaigns || "All Campaigns"}</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex items-center gap-2"
                onClick={() => setActiveView("calendar")}
              >
                <Calendar className="h-4 w-4" />
                {translations.schedule || "Schedule"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex items-center gap-2"
                onClick={() => {
                  setShowReports(true);
                  setActiveView("reports");
                }}
              >
                <BarChart className="h-4 w-4" />
                {translations.analytics || "Analytics"}
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
                {translations.active || "Active"}
              </TabsTrigger>
              <TabsTrigger 
                value="scheduled" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {translations.scheduled || "Scheduled"}
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {translations.completed || "Completed"}
              </TabsTrigger>
              <TabsTrigger 
                value="drafts" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {translations.drafts || "Drafts"}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="p-6">
              <CampaignList 
                campaigns={activeCampaigns} 
                type="active" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
            <TabsContent value="scheduled" className="p-6">
              <CampaignList 
                campaigns={scheduledCampaigns} 
                type="scheduled" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
            <TabsContent value="completed" className="p-6">
              <CampaignList 
                campaigns={completedCampaigns} 
                type="completed" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
            <TabsContent value="drafts" className="p-6">
              <CampaignList 
                campaigns={draftCampaigns} 
                type="draft" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.marketingCampaigns || "Marketing Campaigns"}</h2>
          <p className="text-muted-foreground">
            {translations.createManageCampaigns || "Create and manage marketing campaigns for your restaurant."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!showPresets && !showReports && activeView !== "calendar" && (
            <Button 
              variant="outline" 
              className="items-center gap-2"
              onClick={() => {
                setShowPresets(true);
                setShowCreator(false);
                setShowSettings(false);
                setShowReports(false);
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">{translations.presetCampaigns || "Preset Campaigns"}</span>
              <span className="inline md:hidden">{translations.presets || "Presets"}</span>
            </Button>
          )}
          {!showReports && activeView !== "calendar" && (
            <Button 
              variant="outline" 
              className="items-center gap-2"
              onClick={() => {
                setActiveView(activeView === "list" ? "calendar" : "list");
                setShowReports(false);
                setShowPresets(false);
                setShowCreator(false);
                setShowSettings(false);
              }}
            >
              {activeView === "list" ? (
                <Calendar className="h-4 w-4 mr-2" />
              ) : (
                <BarChart className="h-4 w-4 mr-2" />
              )}
              {activeView === "list" ? "Calendar" : "List View"}
            </Button>
          )}
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {translations.filter || "Filter"}
          </Button>
          <Button onClick={() => {
            setShowCreator(true);
            setShowPresets(false);
            setShowSettings(false);
            setShowReports(false);
            setActiveView("list");
          }}>
            <PlusCircle className="mr-2 h-4 w-4" /> {translations.createCampaign || "Create Campaign"}
          </Button>
        </div>
      </div>

      {renderContent()}

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
              Click on "Preset Campaigns" to quickly select a pre-configured campaign for common marketing needs.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
