
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Calendar } from "lucide-react";
import CampaignList from "@/components/campaigns/CampaignList";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getActiveCampaigns,
  getCompletedCampaigns,
  getScheduledCampaigns,
  getDraftCampaigns
} from "@/data/sampleCampaigns";

interface CampaignListViewProps {
  handleViewReport: (campaignId: string) => void;
  handleViewCampaign: (campaignId: string) => void;
  setShowReports: (show: boolean) => void;
  setActiveView: (view: string) => void;
}

const CampaignListView: React.FC<CampaignListViewProps> = ({
  handleViewReport,
  handleViewCampaign,
  setShowReports,
  setActiveView
}) => {
  const [activeTab, setActiveTab] = useState("active");
  const { translations } = useLanguage();

  const activeCampaigns = getActiveCampaigns();
  const scheduledCampaigns = getScheduledCampaigns();
  const completedCampaigns = getCompletedCampaigns();
  const draftCampaigns = getDraftCampaigns();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{translations.allCampaigns || "Todas as Campanhas"}</CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex items-center gap-2"
              onClick={() => setActiveView("calendar")}
            >
              <Calendar className="h-4 w-4" />
              {translations.schedule || "Agenda"}
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
              {translations.analytics || "Análises"}
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
              {translations.active || "Ativas"}
            </TabsTrigger>
            <TabsTrigger 
              value="scheduled" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {translations.scheduled || "Agendadas"}
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {translations.completed || "Concluídas"}
            </TabsTrigger>
            <TabsTrigger 
              value="drafts" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              {translations.drafts || "Rascunhos"}
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

export default CampaignListView;
