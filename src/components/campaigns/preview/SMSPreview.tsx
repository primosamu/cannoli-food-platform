
import React from "react";

interface SMSPreviewProps {
  content: string;
}

const SMSPreview: React.FC<SMSPreviewProps> = ({ content }) => (
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
          <div className="text-sm whitespace-pre-line">{content}</div>
          <div className="text-[10px] text-gray-700 text-right mt-2">Agora</div>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground bg-gray-50 py-2">
        Prévia do SMS
      </div>
    </div>
  </div>
);

export default SMSPreview;
