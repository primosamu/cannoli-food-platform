
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, PercentCircle } from "lucide-react";
import PresetCampaigns from "@/components/campaigns/PresetCampaigns";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignTemplate } from "@/types/campaign";

interface CampaignPresetViewProps {
  campaignType: "messaging" | "paid";
  setCampaignType: (type: "messaging" | "paid") => void;
  onSelect: (template: CampaignTemplate) => void;
}

const CampaignPresetView: React.FC<CampaignPresetViewProps> = ({
  campaignType,
  setCampaignType,
  onSelect,
}) => {
  const { translations } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={campaignType === "paid" ? "text-primary" : ""}>
              {campaignType === "messaging" ? 
                (translations.messaging || "Mensageria") : 
                (translations.paidTraffic || "Tráfego Pago")}
            </CardTitle>
            <CardDescription>
              {campaignType === "messaging" ? 
                (translations.messagingDescription || "Envie mensagens por WhatsApp, SMS ou Email para seus clientes") : 
                (translations.paidTrafficDescription || "Crie anúncios para Meta, Google e outras plataformas")}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={campaignType === "messaging" ? "default" : "outline"} 
              onClick={() => setCampaignType("messaging")}
              className={campaignType === "messaging" ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {translations.messaging || "Mensageria"}
            </Button>
            <Button 
              variant={campaignType === "paid" ? "default" : "outline"} 
              onClick={() => setCampaignType("paid")}
              className={campaignType === "paid" ? "bg-violet-600 hover:bg-violet-700" : ""}
            >
              <PercentCircle className="mr-2 h-4 w-4" />
              {translations.paidTraffic || "Tráfego Pago"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={campaignType === "paid" ? "bg-gradient-to-b from-violet-50 to-transparent" : ""}>
        <PresetCampaigns onSelect={onSelect} campaignType={campaignType} />
      </CardContent>
    </Card>
  );
};

export default CampaignPresetView;
