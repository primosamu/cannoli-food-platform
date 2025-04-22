import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { 
  MessageSquare, 
  Mail 
} from "lucide-react";
import { cn } from "@/lib/utils";
import WhatsAppPreview from "./preview/WhatsAppPreview";
import SMSPreview from "./preview/SMSPreview";
import EmailPreview from "./preview/EmailPreview";

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
  // Substituição de variáveis de preview
  const previewContent = content
    .replace(/\{\{name\}\}/g, "Cliente")
    .replace(/\{\{restaurant\}\}/g, "Seu Restaurante")
    .replace(/\{\{discount\}\}/g, "10%")
    .replace(/\{\{code\}\}/g, "PROMO10")
    .replace(/\{\{date\}\}/g, "30/04/2025")
    .replace(/\{\{time\}\}/g, "19h");

  // Função para retornar preview correto
  const getPreviewContent = () => {
    switch (type) {
      case "whatsapp":
        return <WhatsAppPreview content={previewContent} imageUrl={imageUrl} />;
      case "sms":
        return <SMSPreview content={previewContent} />;
      case "email":
        return <EmailPreview content={previewContent} subject={subject} imageUrl={imageUrl} />;
      default:
        return (
          <div className="bg-muted-foreground/10 p-6 rounded text-center text-muted-foreground">
            Visualização não disponível para este tipo de campanha.
          </div>
        );
    }
  };

  // Ícone e título
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
    <Card>
      <div className="flex items-center gap-2 p-3 border-b">
        {getPreviewIcon()}
        <h3 className="font-medium">{getPreviewTitle()}</h3>
      </div>
      <CardContent className={cn("p-4 overflow-auto max-h-[600px] bg-white")}>
        {content ? getPreviewContent() : (
          <div className="text-center p-8 text-muted-foreground">
            Crie sua campanha para ver o preview aqui
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignPreview;

// O arquivo está ficando longo. Após confirmar esta melhoria, considere pedir refatoração deste componente para facilitar manutenção!
