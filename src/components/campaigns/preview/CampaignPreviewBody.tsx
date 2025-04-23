
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
  platform?: string;
}

const CampaignPreviewBody: React.FC<CampaignPreviewBodyProps> = ({
  content,
  type,
  subject,
  imageUrl,
  isFull = false,
  platform = "facebook"
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
      // Determine which paid traffic preview to show based on the platform
      if (platform === "gmb" || content.includes("GMB") || content.includes("Google Meu Negócio") || 
          (imageUrl && imageUrl.includes("gmb"))) {
        previewComponent = <GmbPreview content={content} imageUrl={imageUrl} />;
      } else if (platform === "google" || platform === "google-ads") {
        // Google Ads preview
        previewComponent = (
          <div className="max-w-md mx-auto p-5 border rounded-lg shadow-md bg-white">
            <div className="mb-2 text-xs text-blue-600">Ad · www.yourrestaurant.com/special-offer</div>
            <h3 className="text-lg font-medium text-blue-800 mb-1">
              {subject || "Restaurant Special Offer | Limited Time"}
            </h3>
            <div className="text-sm text-gray-700 whitespace-pre-line">
              {content.length > 150 ? content.substring(0, 147) + "..." : content}
            </div>
            <div className="mt-3 flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Order Now</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Call</span>
            </div>
          </div>
        );
      } else if (platform === "meta" || platform === "facebook" || platform === "instagram") {
        // Facebook/Instagram Ads preview
        previewComponent = (
          <div className="max-w-md mx-auto border rounded-lg shadow-md overflow-hidden bg-white">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                  R
                </div>
                <div>
                  <div className="font-medium">Seu Restaurante</div>
                  <div className="text-xs text-gray-500">Sponsored · <span className="text-xs">⚙️</span></div>
                </div>
              </div>
              <div className="text-gray-500">•••</div>
            </div>
            
            <div className="p-3 text-sm">{content}</div>
            
            {imageUrl && (
              <div className="w-full">
                <img
                  src={imageUrl}
                  alt="Imagem do anúncio"
                  className="w-full object-cover"
                  style={{ maxHeight: 300 }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            
            <div className="p-3 border-t">
              <div className="flex justify-between items-center text-sm text-blue-600">
                <span className="font-medium">Learn More</span>
                <button className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm font-medium">
                  {platform === "instagram" ? "Shop Now" : "Order Now"}
                </button>
              </div>
            </div>
          </div>
        );
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
