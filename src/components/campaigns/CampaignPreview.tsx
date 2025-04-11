
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { MessageSquare, Mail, PercentCircle, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignPreviewProps {
  content: string;
  type: CampaignType;
  subject?: string;
  imageUrl?: string;
}

const CampaignPreview: React.FC<CampaignPreviewProps> = ({
  content,
  type,
  subject,
  imageUrl,
}) => {
  // Default replaces for variables in preview
  const previewContent = content
    .replace(/\{\{name\}\}/g, "Cliente")
    .replace(/\{\{restaurant\}\}/g, "Seu Restaurante")
    .replace(/\{\{discount\}\}/g, "15")
    .replace(/\{\{code\}\}/g, "PROMO15")
    .replace(/\{\{date\}\}/g, "30/04/2025")
    .replace(/\{\{time\}\}/g, "19h")
    .replace(/\{\{phone\}\}/g, "(11) 99999-9999")
    .replace(/\{\{month\}\}/g, "Abril")
    .replace(/\{\{event\}\}/g, "JAZZ");

  const renderWhatsAppPreview = () => (
    <div className="bg-[#DCF8C6] rounded-lg p-4 max-w-[80%] ml-auto mb-4 relative">
      <div className="font-medium text-[#075E54] text-sm mb-1">Seu Restaurante</div>
      <div className="whitespace-pre-line">{previewContent}</div>
      <div className="text-[#667781] text-xs text-right mt-1">15:30</div>
    </div>
  );

  const renderSMSPreview = () => (
    <div className="bg-gray-200 rounded-lg p-4 max-w-[80%] mb-4">
      <div className="whitespace-pre-line text-sm">{previewContent}</div>
      <div className="text-gray-500 text-xs text-right mt-1">Mensagem SMS</div>
    </div>
  );

  const renderEmailPreview = () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 border-b">
        <div className="font-medium">De: Seu Restaurante &lt;contato@seurestaurante.com&gt;</div>
        <div className="font-medium">Assunto: {subject || "Mensagem do Seu Restaurante"}</div>
      </div>
      <div className="p-4 bg-white">
        {imageUrl && (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4 rounded">
            <Image className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Imagem da campanha</span>
          </div>
        )}
        <div 
          className="email-content" 
          dangerouslySetInnerHTML={{ __html: previewContent }}
        />
      </div>
    </div>
  );

  const renderPaidTrafficPreview = () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-2 text-xs">Anúncio</div>
      {imageUrl && (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center border-b">
          <Image className="h-8 w-8 text-gray-400" />
          <span className="ml-2 text-gray-500">Imagem do anúncio</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">Seu Restaurante</h3>
        <div className="whitespace-pre-line">{previewContent}</div>
        <button className="mt-3 bg-blue-600 text-white rounded px-4 py-1 text-sm">
          Saiba Mais
        </button>
      </div>
    </div>
  );

  const getPreviewContent = () => {
    switch (type) {
      case "whatsapp":
        return renderWhatsAppPreview();
      case "sms":
        return renderSMSPreview();
      case "email":
        return renderEmailPreview();
      case "paid":
        return renderPaidTrafficPreview();
      default:
        return <div>Selecione um tipo de campanha para visualizar o preview</div>;
    }
  };

  const getPreviewIcon = () => {
    switch (type) {
      case "whatsapp":
        return <MessageSquare className="h-5 w-5 text-green-600" />;
      case "sms":
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case "email":
        return <Mail className="h-5 w-5 text-orange-600" />;
      case "paid":
        return <PercentCircle className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const getPreviewTitle = () => {
    switch (type) {
      case "whatsapp":
        return "Preview do WhatsApp";
      case "sms":
        return "Preview do SMS";
      case "email":
        return "Preview do Email";
      case "paid":
        return "Preview do Anúncio";
      default:
        return "Preview";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "whatsapp":
        return "bg-[#E5DDD5]";
      default:
        return "bg-white";
    }
  };

  return (
    <Card className="shadow-md">
      <div className="flex items-center gap-2 p-3 border-b">
        {getPreviewIcon()}
        <h3 className="font-medium">{getPreviewTitle()}</h3>
      </div>
      <CardContent className={cn("p-4", getBgColor())}>
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
