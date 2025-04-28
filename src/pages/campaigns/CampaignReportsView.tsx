
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CampaignReports } from "@/components/campaigns/CampaignReports";

interface CampaignReportsViewProps {
  selectedCampaignId: string | null;
  handleBack: () => void;
}

const CampaignReportsView: React.FC<CampaignReportsViewProps> = ({
  selectedCampaignId,
  handleBack,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Relatórios de Campanha</CardTitle>
            <CardDescription>
              Visualize análises detalhadas e desempenho de suas campanhas
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleBack}>
            Voltar para Campanhas
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CampaignReports campaignId={selectedCampaignId || undefined} />
      </CardContent>
    </Card>
  );
};

export default CampaignReportsView;
