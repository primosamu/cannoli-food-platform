
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CampaignType } from "@/types/campaign";
import { 
  MessageSquare, 
  Mail, 
  PercentCircle, 
  Image, 
  Facebook, 
  Instagram, 
  Camera, 
  Smile, 
  Star, 
  ThumbsUp, 
  Send 
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="max-w-[320px] mx-auto">
      {/* Phone frame */}
      <div className="border-8 border-gray-800 rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
        {/* Status bar */}
        <div className="bg-gray-800 text-white text-xs px-4 py-2 flex justify-between">
          <div>9:41</div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
        </div>
        
        {/* WhatsApp header */}
        <div className="bg-[#128C7E] text-white p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="text-[#128C7E] font-bold text-xs">SR</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Seu Restaurante</div>
            <div className="text-xs">online</div>
          </div>
        </div>
        
        {/* Chat background */}
        <div className="bg-[#E5DDD5] p-3 h-[380px] overflow-y-auto">
          {/* Message bubbles */}
          <div className="bg-white rounded-lg p-3 max-w-[80%] mb-3 shadow-sm">
            <div className="font-medium text-[#075E54] text-xs mb-1">Seu Restaurante</div>
            <div className="text-sm">Olá! Como posso ajudar você hoje?</div>
            <div className="text-[#667781] text-[10px] text-right mt-1">15:20</div>
          </div>
          
          <div className="bg-[#DCF8C6] rounded-lg p-3 max-w-[80%] ml-auto mb-3 shadow-sm">
            <div className="text-sm">Oi! Queria saber sobre promoções</div>
            <div className="text-[#667781] text-[10px] text-right mt-1">15:25</div>
          </div>
          
          <div className="bg-[#DCF8C6] rounded-lg p-3 max-w-[80%] ml-auto mb-3 shadow-sm">
            <div className="font-medium text-[#075E54] text-xs mb-1">Seu Restaurante</div>
            <div className="whitespace-pre-line text-sm">{previewContent}</div>
            {imageUrl && (
              <div className="mt-2 rounded-lg overflow-hidden">
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            )}
            <div className="text-[#667781] text-[10px] text-right mt-1">15:30</div>
          </div>
        </div>
        
        {/* Message input */}
        <div className="bg-[#F0F0F0] p-2 flex items-center gap-2">
          <div className="rounded-full bg-white flex-grow flex items-center p-2 text-xs text-gray-500">
            Digite uma mensagem...
          </div>
          <Send className="h-5 w-5 text-[#128C7E]" />
        </div>
      </div>
    </div>
  );

  const renderSMSPreview = () => (
    <div className="max-w-[320px] mx-auto">
      {/* Phone frame */}
      <div className="border-8 border-gray-800 rounded-3xl overflow-hidden bg-white shadow-xl">
        {/* Status bar */}
        <div className="bg-gray-800 text-white text-xs px-4 py-2 flex justify-between">
          <div>9:41</div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-white"></div>
          </div>
        </div>
        
        {/* SMS header */}
        <div className="bg-gray-100 p-3 flex items-center justify-between">
          <div className="text-sm font-medium">Mensagens</div>
          <div className="text-blue-500 text-sm">Editar</div>
        </div>
        
        {/* Message thread */}
        <div className="p-3 h-[400px] overflow-y-auto">
          <div className="rounded-lg p-3 bg-gray-100 mb-2 max-w-[80%]">
            <div className="text-sm whitespace-pre-line">{previewContent}</div>
            <div className="text-[10px] text-gray-500 mt-1">Agora</div>
          </div>
          <div className="text-[10px] text-gray-500 text-center mt-4">Mensagem SMS</div>
        </div>
      </div>
    </div>
  );

  const renderEmailPreview = () => (
    <div className="border rounded-lg overflow-hidden shadow-md max-w-[600px] mx-auto">
      <div className="bg-gray-100 p-4 border-b">
        <div className="font-medium mb-1">De: Seu Restaurante &lt;contato@seurestaurante.com&gt;</div>
        <div className="font-medium">Para: cliente@email.com</div>
        <div className="font-medium mt-2">Assunto: {subject || "Mensagem do Seu Restaurante"}</div>
      </div>
      <div className="p-6 bg-white">
        {imageUrl && (
          <div className="w-full h-40 bg-gray-100 flex items-center justify-center mb-6 rounded">
            <Image className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Imagem da campanha</span>
          </div>
        )}
        <div 
          className="email-content" 
          dangerouslySetInnerHTML={{ __html: previewContent }}
        />
        <div className="mt-6 pt-4 border-t text-sm text-gray-500">
          <p>Seu Restaurante</p>
          <p>Av. Exemplo, 123 - São Paulo, SP</p>
          <p>Para cancelar o recebimento desses emails, <a href="#" className="text-blue-500">clique aqui</a>.</p>
        </div>
      </div>
    </div>
  );

  const renderMetaAdPreview = () => (
    <div className="max-w-[400px] mx-auto">
      {/* Facebook ad preview */}
      <div className="border rounded-lg overflow-hidden shadow-md bg-white">
        <div className="p-3 flex items-center gap-2 border-b">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <div className="text-blue-600 font-bold text-sm">SR</div>
          </div>
          <div>
            <div className="font-medium text-sm">Seu Restaurante</div>
            <div className="text-xs text-gray-500">Patrocinado · <Facebook className="inline h-3 w-3" /></div>
          </div>
        </div>
        
        {imageUrl ? (
          <div className="aspect-video bg-gray-100 flex items-center justify-center border-b relative">
            <Image className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Imagem do anúncio</span>
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center border-b relative">
            <span className="text-gray-500">Sem imagem</span>
          </div>
        )}
        
        <div className="p-4">
          <h3 className="font-bold text-base mb-2">Seu Restaurante</h3>
          <div className="text-sm whitespace-pre-line mb-3">{previewContent}</div>
          <button className="w-full bg-blue-600 text-white rounded py-2 text-sm font-medium">
            Saiba Mais
          </button>
        </div>
      </div>
      
      {/* Instagram ad preview */}
      {platform === 'instagram' && (
        <div className="border rounded-lg overflow-hidden shadow-md bg-white mt-6">
          <div className="p-3 flex items-center gap-2 border-b">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 flex items-center justify-center p-[2px]">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <div className="text-[8px] font-bold">SR</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">seurestaurante</div>
              <div className="text-xs text-gray-500">Patrocinado</div>
            </div>
            <Instagram className="h-5 w-5" />
          </div>
          
          {imageUrl ? (
            <div className="aspect-square bg-gray-100 flex items-center justify-center border-b">
              <Image className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Imagem do anúncio</span>
            </div>
          ) : (
            <div className="aspect-square bg-gray-100 flex items-center justify-center border-b">
              <span className="text-gray-500">Sem imagem</span>
            </div>
          )}
          
          <div className="p-3 flex items-center gap-3">
            <ThumbsUp className="h-5 w-5" />
            <MessageSquare className="h-5 w-5" />
            <Send className="h-5 w-5" />
            <div className="flex-1"></div>
            <Star className="h-5 w-5" />
          </div>
          
          <div className="px-3 pb-3">
            <div className="text-sm font-medium mb-1">seurestaurante</div>
            <div className="text-sm whitespace-pre-line mb-2">{previewContent}</div>
            <button className="w-full bg-blue-600 text-white rounded py-1.5 text-sm font-medium">
              Saiba Mais
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderGoogleAdPreview = () => (
    <div className="max-w-[500px] mx-auto">
      <div className="border rounded-lg overflow-hidden shadow-md bg-white p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">A</div>
          <div className="text-xs text-green-700">Anúncio</div>
          <div className="text-xs text-gray-600">www.seurestaurante.com.br</div>
        </div>
        
        <h3 className="text-blue-600 text-xl mb-1 font-normal">Seu Restaurante | Promoções Especiais</h3>
        
        <div className="text-sm text-gray-800 whitespace-pre-line mb-3">{previewContent}</div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {imageUrl && (
            <div className="w-32 h-24 bg-gray-100 flex items-center justify-center rounded">
              <Image className="h-6 w-6 text-gray-400" />
            </div>
          )}
          
          <div className="flex-1 min-w-[200px]">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 text-xs border rounded">
                <div className="font-medium mb-1">Promoções</div>
                <div className="text-[10px] text-gray-500">Desconto em pratos</div>
              </div>
              <div className="p-2 text-xs border rounded">
                <div className="font-medium mb-1">Delivery</div>
                <div className="text-[10px] text-gray-500">Entrega rápida</div>
              </div>
              <div className="p-2 text-xs border rounded">
                <div className="font-medium mb-1">Reservas</div>
                <div className="text-[10px] text-gray-500">Online</div>
              </div>
            </div>
          </div>
        </div>
        
        <button className="bg-blue-600 text-white rounded px-4 py-1.5 text-sm">
          Ver oferta
        </button>
      </div>
    </div>
  );

  const getPaidTrafficPreview = () => {
    if (platform === 'google') {
      return renderGoogleAdPreview();
    }
    
    // Default to Meta (Facebook/Instagram)
    return renderMetaAdPreview();
  };

  const getPreviewContent = () => {
    switch (type) {
      case "whatsapp":
        return renderWhatsAppPreview();
      case "sms":
        return renderSMSPreview();
      case "email":
        return renderEmailPreview();
      case "paid":
        return getPaidTrafficPreview();
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
        if (platform === 'instagram') {
          return <Instagram className="h-5 w-5 text-purple-600" />;
        } else if (platform === 'google') {
          return <PercentCircle className="h-5 w-5 text-red-600" />;
        } else {
          return <Facebook className="h-5 w-5 text-blue-600" />;
        }
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
        if (platform === 'instagram') {
          return "Preview do Instagram Ads";
        } else if (platform === 'google') {
          return "Preview do Google Ads";
        } else {
          return "Preview do Facebook Ads";
        }
      default:
        return "Preview";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "whatsapp":
        return "bg-white";
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
      <CardContent className={cn("p-4 overflow-auto max-h-[600px]", getBgColor())}>
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
