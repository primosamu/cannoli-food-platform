
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
  isFull?: boolean; // This flag controls whether to show full preview or compact preview
}

const CampaignPreviewBody: React.FC<CampaignPreviewBodyProps> = ({
  content,
  type,
  subject,
  imageUrl,
  isFull = false
}) => {
  // Add specific CSS classes or wrappers based on the isFull flag
  const containerClassName = isFull ? "max-w-full" : "";
  
  switch (type) {
    case "whatsapp":
      return (
        <div className={containerClassName}>
          <WhatsAppPreview content={content} imageUrl={imageUrl} />
        </div>
      );
    case "sms":
      return (
        <div className={containerClassName}>
          <SMSPreview content={content} />
        </div>
      );
    case "email":
      return (
        <div className={containerClassName}>
          <EmailPreview content={content} subject={subject} imageUrl={imageUrl} />
        </div>
      );
    default:
      return (
        <div className="bg-muted-foreground/10 p-6 rounded text-center text-muted-foreground">
          Visualização não disponível para este tipo de campanha.
        </div>
      );
  }
};

export default CampaignPreviewBody;
