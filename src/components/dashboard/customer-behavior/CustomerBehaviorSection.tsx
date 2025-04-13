
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { RFMAnalysisSection } from "./RFMAnalysisSection";
import { BehaviorPatternsSection } from "./BehaviorPatternsSection";
import { CustomerDialog } from "./CustomerDialog";
import { getCategoryFromSegment } from "./utils";
import { useLanguage } from "@/contexts/LanguageContext";

export const CustomerBehaviorSection = () => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translations } = useLanguage();

  const handleChartClick = (chartId: string, data?: any) => {
    console.log("Chart clicked:", chartId, data);
    setSelectedChart(chartId);
    setSelectedSegment(data);
    setIsDialogOpen(true);
  };

  const redirectToCampaign = useCallback((segmentName?: string, segmentType?: string) => {
    const segmentToUse = segmentName || (selectedSegment?.name || selectedSegment?.group);
    const segmentTypeToUse = segmentType || selectedChart;
    const category = getCategoryFromSegment(segmentTypeToUse, segmentToUse);
    
    console.log("Redirecting to campaign with:", {
      segmentName: segmentToUse,
      segmentType: segmentTypeToUse,
      category
    });
    
    toast({
      title: translations.redirectingToCampaigns || "Redirecting to Campaigns",
      description: `${translations.creatingCampaignFor || "Creating campaign for"} ${segmentToUse || translations.thisSegment || "this segment"}`,
    });
    
    // Navigate to campaigns page and set state to indicate we should create a campaign
    navigate("/campaigns", { 
      state: { 
        createCampaign: true, 
        segmentName: segmentToUse,
        segmentType: segmentTypeToUse,
        category
      } 
    });
    
    setIsDialogOpen(false);
  }, [navigate, selectedSegment, selectedChart, toast, translations]);

  return (
    <div className="space-y-6">
      {/* RFM Analysis Section */}
      <RFMAnalysisSection onChartClick={handleChartClick} />
      
      {/* Customer Behavior Patterns Section */}
      <BehaviorPatternsSection onChartClick={handleChartClick} />

      {/* Customer Dialog */}
      <CustomerDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedChart={selectedChart}
        selectedSegment={selectedSegment}
        onRedirectToCampaign={redirectToCampaign}
      />
    </div>
  );
};
