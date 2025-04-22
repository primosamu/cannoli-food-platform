
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CampaignType } from "@/types/campaign";
import CampaignPreviewHeader from "./preview/CampaignPreviewHeader";
import CampaignPreviewBody from "./preview/CampaignPreviewBody";

interface CampaignPreviewProps {
  content: string;
  type: CampaignType;
  subject?: string;
  imageUrl?: string;
  platform?: string;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({
  content,
  type,
  subject,
  imageUrl,
  platform = "facebook",
}) => {
  // Substituição para prévia
  const previewContent = content
    .replace(/\{\{name\}\}/g, "Cliente")
    .replace(/\{\{restaurant\}\}/g, "Seu Restaurante")
    .replace(/\{\{discount\}\}/g, "10%")
    .replace(/\{\{code\}\}/g, "PROMO10")
    .replace(/\{\{date\}\}/g, "30/04/2025")
    .replace(/\{\{time\}\}/g, "19h");

  return (
    <Card>
      <CampaignPreviewHeader type={type} />
      <CardContent className={cn("p-4 overflow-auto max-h-[600px] bg-white")}>
        {content ? (
          <CampaignPreviewBody
            content={previewContent}
            type={type}
            subject={subject}
            imageUrl={imageUrl}
          />
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            Crie sua campanha para ver o preview aqui
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignPreview;
