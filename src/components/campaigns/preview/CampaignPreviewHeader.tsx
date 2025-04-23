
import React from "react";
import { MessageSquare, Mail, MessageCircle, Image } from "lucide-react";
import { CampaignType } from "@/types/campaign";
import { cn } from "@/lib/utils";

interface CampaignPreviewHeaderProps {
  type: CampaignType;
  platform?: string;
}

const CampaignPreviewHeader: React.FC<CampaignPreviewHeaderProps> = ({ type, platform }) => {
  const getChannelIcon = () => {
    switch (type) {
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "sms":
        return <MessageCircle className="w-4 h-4" />;
      case "paid":
        return <Image className="w-4 h-4" />;
      case "rcs":
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getChannelName = () => {
    switch (type) {
      case "whatsapp":
        return "WhatsApp";
      case "email":
        return "E-mail";
      case "sms":
        return "SMS";
      case "paid":
        if (platform === "gmb") return "Google Meu Negócio";
        if (platform === "google") return "Google Ads";
        if (platform === "meta") return "Meta Ads";
        if (platform === "facebook") return "Facebook Ads";
        if (platform === "instagram") return "Instagram Ads";
        return "Tráfego Pago";
      case "rcs":
        return "RCS";
      default:
        return "Mensagem";
    }
  };

  const getChannelColor = () => {
    switch (type) {
      case "whatsapp":
        return "bg-green-100 text-green-800";
      case "email":
        return "bg-blue-100 text-blue-800";
      case "sms":
        return "bg-purple-100 text-purple-800";
      case "paid":
        if (platform === "gmb") return "bg-blue-100 text-blue-800";
        if (platform === "google") return "bg-blue-100 text-blue-800";
        return "bg-yellow-100 text-yellow-800";
      case "rcs":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-center p-2 border-b">
      <div
        className={cn(
          "flex items-center px-2 py-1 rounded text-xs font-medium",
          getChannelColor()
        )}
      >
        {getChannelIcon()}
        <span className="ml-1">{getChannelName()}</span>
      </div>
      <div className="ml-auto text-xs text-gray-500">
        Pré-visualização
      </div>
    </div>
  );
};

export default CampaignPreviewHeader;
