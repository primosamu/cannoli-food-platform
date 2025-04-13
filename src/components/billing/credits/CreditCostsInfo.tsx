
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditCostsInfoProps {
  selectedTab: 'phone' | 'message' | 'campaign' | 'rcs';
  costs: {
    phone: number;
    message: number;
    campaign: number;
    rcs: number;
  };
}

export const CreditCostsInfo: React.FC<CreditCostsInfoProps> = ({ selectedTab, costs }) => {
  const { translations } = useLanguage();
  
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span>Custo dos Créditos</span>
        <span className="font-medium">
          R${costs[selectedTab]} 
          {selectedTab === 'phone' && " por enriquecimento de telefone"}
          {selectedTab === 'message' && " por mensagem SMS enviada"}
          {selectedTab === 'campaign' && " por campanha criada"}
          {selectedTab === 'rcs' && " por mensagem RCS enviada"}
        </span>
      </div>
    </div>
  );
};
