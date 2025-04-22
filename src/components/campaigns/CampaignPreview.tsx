
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { 
  MessageSquare, 
  Mail, 
  Image, 
  Camera, 
  Send 
} from "lucide-react";
import { cn } from "@/lib/utils";

// ATENÇÃO: arquivo longo, considere refatoração depois.

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

  // WhatsApp Preview
  const renderWhatsAppPreview = () => (
    <div className="max-w-[350px] mx-auto font-sans">
      <div className="rounded-[2rem] border-8 border-gray-900 bg-gray-100 shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="bg-gray-900 text-white text-xs px-4 py-2 flex justify-between">
          <div>09:33</div>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>
        </div>
        {/* Header */}
        <div className="bg-[#128C7E] text-white px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#128C7E] font-bold text-base">SR</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Seu Restaurante</div>
            <div className="text-xs">online</div>
          </div>
        </div>
        {/* Mensagens */}
        <div className="bg-[#e5ddd5] px-3 py-4 h-[420px] overflow-y-auto flex flex-col justify-end">
          {/* Mensagem automática */}
          <div className="bg-white rounded-lg p-3 mb-2 shadow max-w-[80%]">
            <div className="font-medium text-[#128C7E] text-xs mb-1">Seu Restaurante</div>
            <div className="text-sm">Olá! Como posso ajudar você?</div>
            <div className="text-[#777] text-[10px] text-right mt-1">15:21</div>
          </div>
          {/* Mensagem do cliente */}
          <div className="bg-[#DCF8C6] rounded-lg p-3 ml-auto mb-2 shadow max-w-[80%]">
            <div className="text-sm">Oi, queria saber sobre promoções</div>
            <div className="text-[#777] text-[10px] text-right mt-1">15:22</div>
          </div>
          {/* Mensagem da campanha */}
          <div className="bg-[#DCF8C6] rounded-lg p-3 ml-auto mt-6 mb-2 shadow max-w-[85%]">
            <div className="font-medium text-[#128C7E] text-xs mb-1">Seu Restaurante</div>
            <div className="text-sm whitespace-pre-line">{previewContent}</div>
            {imageUrl && (
              <div className="mt-3 rounded-lg overflow-hidden relative w-full aspect-square bg-gray-200 flex items-center justify-center border border-gray-300">
                <img 
                  src={imageUrl} 
                  alt="Imagem da campanha" 
                  className="w-full h-full object-cover"
                  style={{ minHeight: 120, background: '#f5f6f7' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div className="text-[#777] text-[10px] text-right mt-1">15:30</div>
          </div>
        </div>
        {/* Campo de digitação */}
        <div className="bg-[#F0F0F0] p-3 flex items-center gap-2">
          <div className="rounded-full bg-white flex-grow flex items-center px-3 py-1 text-xs text-gray-500">
            Digite uma mensagem...
          </div>
          <Send className="h-5 w-5 text-[#128C7E]" />
        </div>
      </div>
    </div>
  );

  // SMS Preview
  const renderSMSPreview = () => (
    <div className="max-w-[350px] mx-auto font-sans">
      <div className="rounded-[2rem] border-8 border-gray-900 bg-white shadow-2xl overflow-hidden">
        {/* Barra de status */}
        <div className="bg-gray-900 text-white text-xs px-4 py-2 flex justify-between">
          <div>09:33</div>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>
        </div>
        {/* Header SMS */}
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between">
          <div className="font-semibold text-gray-700 text-sm">Mensagens</div>
          <div className="text-blue-600 text-xs">Editar</div>
        </div>
        {/* Mensagem de SMS */}
        <div className="bg-white h-[425px] px-4 py-6 overflow-y-auto flex flex-col justify-end">
          <div className="bg-gray-100 rounded-lg p-4 mb-4 max-w-[80%]">
            <div className="text-sm whitespace-pre-line">{previewContent}</div>
            <div className="text-[10px] text-gray-700 text-right mt-2">Agora</div>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground bg-gray-50 py-2">
          Prévia do SMS
        </div>
      </div>
    </div>
  );

  // Email Preview
  const renderEmailPreview = () => (
    <div className="border rounded-lg overflow-hidden shadow-md max-w-[600px] mx-auto font-sans bg-white">
      {/* Header do Email */}
      <div className="bg-gray-100 p-4 border-b">
        <div className="font-medium mb-1">De: Seu Restaurante {"<contato@seurestaurante.com>"}</div>
        <div className="font-medium">Para: cliente@email.com</div>
        <div className="font-medium mt-2">Assunto: {subject || "Promoção especial para você!"}</div>
      </div>
      {/* Corpo do Email */}
      <div className="p-6">
        {imageUrl && (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center mb-6 rounded">
            <img 
              src={imageUrl}
              alt="Imagem da campanha"
              className="h-full object-contain rounded"
              style={{ maxHeight: 180, maxWidth: "100%" }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        )}
        <div className="text-base whitespace-pre-line">{previewContent}</div>
        <div className="mt-8 pt-4 border-t text-xs text-gray-500">
          <p>Seu Restaurante</p>
          <p>Av. Exemplo, 123 - São Paulo, SP</p>
          <p>
            Para cancelar o recebimento desses emails,{" "}
            <a href="#" className="text-blue-500 underline">clique aqui</a>.
          </p>
        </div>
      </div>
    </div>
  );

  // Caso não implementado
  const renderDefaultPreview = () => (
    <div className="bg-muted-foreground/10 p-6 rounded text-center text-muted-foreground">
      Visualização não disponível para este tipo de campanha.
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
      default:
        return renderDefaultPreview();
    }
  };

  // Ícone
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

// O arquivo está ficando longo (238+ linhas). Após confirmar esta melhoria, considere pedir refatoração deste componente para facilitar manutenção!
