
import React from "react";
import { MessageSquare, Mail } from "lucide-react";
import { CampaignType } from "@/types/campaign";

interface CampaignPreviewHeaderProps {
  type: CampaignType;
}

const CampaignPreviewHeader: React.FC<CampaignPreviewHeaderProps> = ({ type }) => {
  const getPreviewIcon = () => {
    switch (type) {
      case "whatsapp":
        return <MessageSquare className="h-5 w-5 text-green-600" />;
      case "sms":
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case "email":
        return <Mail className="h-5 w-5 text-orange-600" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getPreviewTitle = () => {
    switch (type) {
      case "whatsapp":
        return "Prévia WhatsApp";
      case "sms":
        return "Prévia SMS";
      case "email":
        return "Prévia Email";
      default:
        return "Prévia";
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 border-b">
      {getPreviewIcon()}
      <h3 className="font-medium">{getPreviewTitle()}</h3>
    </div>
  );
};

export default CampaignPreviewHeader;
