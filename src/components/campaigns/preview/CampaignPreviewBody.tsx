
import React from "react";
import WhatsAppPreview from "./WhatsAppPreview";
import EmailPreview from "./EmailPreview";
import SMSPreview from "./SMSPreview";
import GmbPreview from "./GmbPreview";
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
  isFull = false
}) => {
  let previewComponent;

  switch (type) {
    case "whatsapp":
      previewComponent = <WhatsAppPreview content={content} imageUrl={imageUrl} />;
      break;
    case "sms":
      previewComponent = <SMSPreview content={content} />;
      break;
    case "email":
      previewComponent = <EmailPreview content={content} subject={subject} imageUrl={imageUrl} />;
      break;
    case "paid":
      // For paid traffic campaigns, we need to check if it's a Google My Business campaign
      if (content.includes("GMB") || content.includes("Google Meu Negócio") || 
          (imageUrl && imageUrl.includes("gmb"))) {
        previewComponent = <GmbPreview content={content} imageUrl={imageUrl} />;
      } else {
        // Default to showing the content as text for other paid campaigns
        previewComponent = (
          <div className="max-w-md mx-auto p-5 border rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-3">Anúncio de Tráfego Pago</h3>
            {imageUrl && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Imagem do anúncio"
                  className="w-full object-cover"
                  style={{ maxHeight: 240 }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div className="whitespace-pre-line">{content}</div>
          </div>
        );
      }
      break;
    case "rcs":
      // For RCS messages (currently we're using WhatsApp preview as a placeholder)
      previewComponent = <WhatsAppPreview content={content} imageUrl={imageUrl} />;
      break;
    default:
      previewComponent = (
        <div className="p-5 border rounded-lg shadow-md">
          <h4 className="text-lg font-semibold mb-3">Conteúdo da Campanha</h4>
          <div className="whitespace-pre-line">{content}</div>
        </div>
      );
  }

  return (
    <div className={`${isFull ? '' : 'scale-90 md:scale-100'} transform origin-top`}>
      {previewComponent}
    </div>
  );
};

export default CampaignPreviewBody;
