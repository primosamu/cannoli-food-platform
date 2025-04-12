
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { RFMAnalysisSection } from "./RFMAnalysisSection";
import { BehaviorPatternsSection } from "./BehaviorPatternsSection";
import { CustomerDialog } from "./CustomerDialog";
import { getCategoryFromSegment } from "./utils";

export const CustomerBehaviorSection = () => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChartClick = (chartId: string, data?: any) => {
    setSelectedChart(chartId);
    setSelectedSegment(data);
    setIsDialogOpen(true);
  };

  const redirectToCampaign = useCallback((segmentName?: string, segmentType?: string) => {
    toast({
      title: "Redirecting to Campaigns",
      description: `Creating campaign for ${segmentName || "this segment"}`,
    });
    
    // Navigate to campaigns page and set state to indicate we should create a campaign
    navigate("/campaigns", { 
      state: { 
        createCampaign: true, 
        segmentName: segmentName || (selectedSegment?.name || selectedSegment?.group),
        segmentType: segmentType || selectedChart,
        category: getCategoryFromSegment(segmentType || selectedChart, segmentName)
      } 
    });
    
    setIsDialogOpen(false);
  }, [navigate, selectedSegment, selectedChart, toast]);

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
