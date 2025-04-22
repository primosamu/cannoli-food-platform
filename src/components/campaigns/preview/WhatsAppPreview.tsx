
import React from "react";
import { Send } from "lucide-react";

interface WhatsAppPreviewProps {
  content: string;
  imageUrl?: string;
}

const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({ content, imageUrl }) => (
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
          <div className="text-sm whitespace-pre-line">{content}</div>
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

export default WhatsAppPreview;
