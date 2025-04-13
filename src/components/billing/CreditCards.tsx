
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlusCircle, CircleDollarSign, Wallet, Store, MessageCircle } from "lucide-react";
import { CreditType } from "../billing/credits/types";

interface CreditCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  creditType: CreditType;
  onBuyCredits: (type: CreditType) => void;
}

const CreditCard: React.FC<CreditCardProps> = ({ 
  title, 
  amount, 
  icon, 
  creditType, 
  onBuyCredits 
}) => {
  const { translations } = useLanguage();
  
  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{amount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{translations.credits}</p>
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

interface CreditCardsProps {
  onBuyCredits: (type: CreditType) => void;
}

export const CreditCards: React.FC<CreditCardsProps> = ({ onBuyCredits }) => {
  const { translations } = useLanguage();
  
  const creditCards = [
    {
      title: translations.phoneEnrichmentCredits,
      amount: 2500,
      icon: <CircleDollarSign className="h-5 w-5 text-primary" />,
      creditType: 'phone' as CreditType
    },
    {
      title: translations.messagingCredits,
      amount: 5000,
      icon: <Wallet className="h-5 w-5 text-primary" />,
      creditType: 'message' as CreditType
    },
    {
      title: translations.campaignCredits,
      amount: 500,
      icon: <Store className="h-5 w-5 text-primary" />,
      creditType: 'campaign' as CreditType
    },
    {
      title: "RCS Credits",
      amount: 1000,
      icon: <MessageCircle className="h-5 w-5 text-primary" />,
      creditType: 'rcs' as CreditType
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
      {creditCards.map((card, index) => (
        <CreditCard
          key={index}
          title={card.title}
          amount={card.amount}
          icon={card.icon}
          creditType={card.creditType}
          onBuyCredits={onBuyCredits}
        />
      ))}
    </div>
  );
};
