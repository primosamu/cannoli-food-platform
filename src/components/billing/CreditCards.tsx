
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CircleDollarSign, Wallet, Store, MessageCircle, CreditCard as CreditCardIcon } from "lucide-react";
import { CreditType } from "../billing/credits/types";
import { useNavigate } from "react-router-dom";
import { CreditCard } from './credit/CreditCard';
import { CreditPackage } from './credit/CreditPackage';

interface CreditCardsProps {
  onBuyCredits: (type: CreditType) => void;
  showPackages?: boolean;
  selectedType?: CreditType;
  onSelectType?: (type: CreditType) => void;
  onSelectPackage?: (packageValue: number) => void;
  selectedPackage?: number;
}

export const CreditCards: React.FC<CreditCardsProps> = ({ 
  onBuyCredits,
  showPackages = false,
  selectedType,
  onSelectType,
  onSelectPackage,
  selectedPackage
}) => {
  const { translations } = useLanguage();
  const navigate = useNavigate();
  
  const creditCards = [
    {
      title: translations.phoneEnrichmentCredits,
      amount: 2500,
      icon: <CircleDollarSign className="h-5 w-5 text-primary" />,
      creditType: 'phone' as CreditType,
      lowCredit: false
    },
    {
      title: translations.messagingCredits,
      amount: 5000,
      icon: <Wallet className="h-5 w-5 text-primary" />,
      creditType: 'message' as CreditType,
      lowCredit: false
    },
    {
      title: translations.campaignCredits,
      amount: 500,
      icon: <Store className="h-5 w-5 text-primary" />,
      creditType: 'campaign' as CreditType,
      lowCredit: true
    },
    {
      title: translations.rcsCredits,
      amount: 1000,
      icon: <MessageCircle className="h-5 w-5 text-primary" />,
      creditType: 'rcs' as CreditType,
      lowCredit: false
    }
  ];

  const creditPackages = [
    { value: 100, credits: 1000, bonus: 0 },
    { value: 500, credits: 5500, bonus: 500 },
    { value: 1000, credits: 12000, bonus: 2000 },
  ];

  const handlePackageClick = (value: number) => {
    if (onSelectPackage) {
      onSelectPackage(value);
    }
  };

  const handleTypeClick = (type: CreditType) => {
    if (onSelectType) {
      onSelectType(type);
    }
  };

  const handleCreditButtonClick = (type: CreditType) => {
    if (showPackages) {
      handleTypeClick(type);
    } else {
      onBuyCredits(type);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
        {creditCards.map((card, index) => (
          <CreditCard
            key={index}
            title={card.title}
            amount={card.amount}
            icon={card.icon}
            creditType={card.creditType}
            onBuyCredits={handleCreditButtonClick}
            lowCredit={card.lowCredit}
          />
        ))}
      </div>

      {showPackages && (
        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-4">{translations.selectPackage || "Selecione um pacote"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPackages.map((pkg) => (
              <CreditPackage
                key={pkg.value}
                value={pkg.value}
                credits={pkg.credits}
                bonus={pkg.bonus}
                onSelect={() => handlePackageClick(pkg.value)}
                isSelected={selectedPackage === pkg.value}
              />
            ))}
          </div>

          <div className="mt-6 p-5 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <CreditCardIcon className="h-4 w-4 text-primary" />
              <span className="font-medium">{translations.creditConversionInfo || "Informação sobre conversão de créditos"}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {translations.creditConversionText || "O valor dos créditos varia conforme sua utilização: cada enriquecimento de telefone custa 10 créditos, cada SMS enviado custa 5 créditos, cada campanha criada custa 100 créditos e cada mensagem RCS custa 15 créditos."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
