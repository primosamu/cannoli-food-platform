
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlusCircle, CircleDollarSign, Wallet, Store, MessageCircle, CreditCard as CreditCardIcon } from "lucide-react";
import { CreditType } from "../billing/credits/types";
import { useNavigate } from "react-router-dom";

interface CreditCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  creditType: CreditType;
  onBuyCredits: (type: CreditType) => void;
  lowCredit?: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({ 
  title, 
  amount, 
  icon, 
  creditType, 
  onBuyCredits,
  lowCredit = false
}) => {
  const { translations } = useLanguage();
  
  return (
    <Card className={`md:col-span-2 ${lowCredit ? 'border-orange-300' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{amount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{translations.credits}</p>
        {lowCredit && (
          <p className="text-xs text-orange-500 mt-1">
            {translations.lowCreditWarning || "Créditos baixos"}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => onBuyCredits(creditType)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          {translations.buyMore}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CreditPackageProps {
  value: number;
  credits: number;
  bonus: number;
  onSelect: () => void;
  isSelected: boolean;
}

const CreditPackage: React.FC<CreditPackageProps> = ({
  value,
  credits,
  bonus,
  onSelect,
  isSelected
}) => {
  const { translations } = useLanguage();
  
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>R$ {value.toLocaleString()}</span>
          {isSelected && <CircleDollarSign className="h-5 w-5 text-primary" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{translations.credits || "Créditos"}</span>
            <span className="font-medium">{credits.toLocaleString()}</span>
          </div>
          {bonus > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600">{translations.bonusCredits || "Bônus"}</span>
              <span className="font-medium text-green-600">+{bonus.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm font-medium">{translations.total || "Total"}</span>
            <span className="font-bold">{(credits + bonus).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCardIcon className="h-4 w-4 text-primary" />
              <span className="font-medium">{translations.creditConversionInfo || "Informação sobre conversão de créditos"}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {translations.creditConversionText || "O valor dos créditos varia conforme sua utilização: cada enriquecimento de telefone custa 10 créditos, cada SMS enviado custa 5 créditos, cada campanha criada custa 100 créditos e cada mensagem RCS custa 15 créditos."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
