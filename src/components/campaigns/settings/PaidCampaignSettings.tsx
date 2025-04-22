
import React, { useState } from "react";
interface PaidCampaignSettingsProps {
  template: any;
  onContinue: () => void;
}
const PaidCampaignSettings: React.FC<PaidCampaignSettingsProps> = ({ template, onContinue }) => {
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [keywords, setKeywords] = useState("");
  const [region, setRegion] = useState("");
  const platformUpper = template?.platform?.toUpperCase() || "META";
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold">{template?.name}</h3>
        <p className="text-muted-foreground mt-1">{template?.description}</p>
        <div className="mt-2">
          <span className="inline-block rounded px-3 py-1 bg-yellow-100 text-yellow-900 text-xs font-bold">
            Tráfego Pago
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Plataforma</label>
            <div className="flex gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-gray-200 rounded">
                {platformUpper}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Orçamento estimado (R$)</label>
            <input
              type="number"
              min={10}
              step={1}
              placeholder="200"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Duração da campanha (dias)</label>
            <input
              type="number"
              min={1}
              max={365}
              placeholder="7"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Interesses/Palavras-chave</label>
            <input
              type="text"
              placeholder="Ex: pizza, delivery, comida saudável"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Região de exibição</label>
            <input
              type="text"
              placeholder="Ex: São Paulo, SP"
              value={region}
              onChange={e => setRegion(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onContinue}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Continuar para criação do anúncio
        </button>
      </div>
    </div>
  );
};
export default PaidCampaignSettings;
