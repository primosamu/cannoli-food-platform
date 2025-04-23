
import React from "react";
import { MapPin, Star, Clock, Phone, Calendar, Info } from "lucide-react";

interface GmbPreviewProps {
  content: string;
  imageUrl?: string;
}

const GmbPreview: React.FC<GmbPreviewProps> = ({ content, imageUrl }) => (
  <div className="max-w-md mx-auto font-sans">
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      {/* Google Search Result Header */}
      <div className="p-4">
        <div className="flex items-start">
          <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4 flex-shrink-0">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Perfil do restaurante" 
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 font-bold text-xl">
                R
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h3 className="font-medium text-lg text-blue-800">Seu Restaurante</h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.8 (356 avaliações)</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" /> 
              <span>Restaurante · São Paulo, SP</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Clock className="w-4 h-4 mr-1" /> 
              <span>Aberto · Fecha às 23h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="border-t">
        <div className="p-4">
          <h4 className="font-medium text-sm text-gray-500 mb-2">PUBLICAÇÃO</h4>
          <div className="text-base whitespace-pre-line">{content}</div>
          
          {/* Image */}
          {imageUrl && (
            <div className="mt-4 rounded-lg overflow-hidden border">
              <img 
                src={imageUrl} 
                alt="Imagem da campanha" 
                className="w-full object-cover"
                style={{ maxHeight: 250 }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          )}
          
          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm">
              <Phone className="w-4 h-4 mr-2" /> Ligar
            </button>
            <button className="flex items-center justify-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">
              <MapPin className="w-4 h-4 mr-2" /> Como chegar
            </button>
            <button className="flex items-center justify-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">
              <Info className="w-4 h-4 mr-2" /> Detalhes
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-3 border-t">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>Publicado hoje</span>
          </div>
          <span>via Google Meu Negócio</span>
        </div>
      </div>
    </div>
  </div>
);

export default GmbPreview;
