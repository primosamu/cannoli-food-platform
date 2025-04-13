
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { CreditType, CreditCosts } from "./types";

interface CreditCostsInfoProps {
  selectedTab: CreditType;
  costs: CreditCosts;
}

export const CreditCostsInfo: React.FC<CreditCostsInfoProps> = ({ selectedTab, costs }) => {
  const { translations } = useLanguage();
  
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span>{translations.creditCosts || "Custo dos Créditos"}</span>
        <span className="font-medium">
          R${costs[selectedTab]} 
          {selectedTab === 'phone' && (translations.eachPhoneEnrichment || " por enriquecimento de telefone")}
          {selectedTab === 'message' && (translations.eachMessageSent || " por mensagem SMS enviada")}
          {selectedTab === 'campaign' && (translations.eachCampaignCreated || " por campanha criada")}
          {selectedTab === 'rcs' && (translations.eachRcsMessageSent || " por mensagem RCS enviada")}
        </span>
      </div>
    </div>
  );
};
