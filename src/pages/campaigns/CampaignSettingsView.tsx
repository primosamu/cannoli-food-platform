
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CampaignSettings from "@/components/campaigns/CampaignSettings";
import { CampaignTemplate } from "@/types/campaign";

interface CampaignSettingsViewProps {
  selectedTemplate: CampaignTemplate | null;
  handleGoBack: () => void;
  handleContinueFromSettings: (settings: {
    selectedChannels: string[];
    audienceType: string;
    incentiveType: string;
    scheduledDate: string;
    scheduledTime: string;
    inactiveDays: string;
    selectedSegment: string;
  }) => void;
}

const CampaignSettingsView: React.FC<CampaignSettingsViewProps> = ({
  selectedTemplate,
  handleGoBack,
  handleContinueFromSettings,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{selectedTemplate ? `Configurações de Campanha: ${selectedTemplate.name}` : 'Configurações de Campanha'}</CardTitle>
            <CardDescription>
              Configure a audiência, canais e opções de entrega da sua campanha
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleGoBack}>
            Voltar para Templates
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CampaignSettings 
          template={selectedTemplate}
          onContinue={handleContinueFromSettings}
        />
      </CardContent>
    </Card>
  );
};

export default CampaignSettingsView;
