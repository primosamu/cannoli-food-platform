
import React from "react";

interface EmailPreviewProps {
  content: string;
  subject?: string;
  imageUrl?: string;
}

const EmailPreview: React.FC<EmailPreviewProps> = ({ content, subject, imageUrl }) => (
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
        <div className="w-full mb-6 rounded overflow-hidden">
          <img 
            src={imageUrl}
            alt="Imagem da campanha"
            className="w-full object-contain"
            style={{ maxHeight: 200 }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}
      <div className="text-base whitespace-pre-line">{content}</div>
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

export default EmailPreview;
