
import React from "react";
import WhatsAppPreview from "./WhatsAppPreview";
import SMSPreview from "./SMSPreview";
import EmailPreview from "./EmailPreview";
import { CampaignType } from "@/types/campaign";

interface CampaignPreviewBodyProps {
  content: string;
  type: CampaignType;
  subject?: string;
  imageUrl?: string;
  isFull?: boolean;
}

const CampaignPreviewBody: React.FC<CampaignPreviewBodyProps> = ({
  content,
  type,
  subject,
  imageUrl,
  isFull
}) => {
  switch (type) {
    case "whatsapp":
      return <WhatsAppPreview content={content} imageUrl={imageUrl} />;
    case "sms":
      return <SMSPreview content={content} />;
    case "email":
      return <EmailPreview content={content} subject={subject} imageUrl={imageUrl} />;
    default:
      return (
        <div className="bg-muted-foreground/10 p-6 rounded text-center text-muted-foreground">
          Visualização não disponível para este tipo de campanha.
        </div>
      );
  }
};

export default CampaignPreviewBody;
