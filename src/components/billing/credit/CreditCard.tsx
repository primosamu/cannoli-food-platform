
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlusCircle } from "lucide-react";
import { CreditType } from "../credits/types";

interface CreditCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  creditType: CreditType;
  onBuyCredits: (type: CreditType) => void;
  lowCredit?: boolean;
}

export const CreditCard: React.FC<CreditCardProps> = ({ 
  title, 
  amount, 
  icon, 
  creditType, 
  onBuyCredits,
  lowCredit = false
}) => {
  const { translations } = useLanguage();
  
  return (
    <Card className={`md:col-span-2 transition-all hover:shadow-md ${lowCredit ? 'border-orange-300' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <span className="rounded-full bg-primary/10 p-1.5 flex items-center justify-center">
            {icon}
          </span>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{amount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{translations.credits}</p>
        {lowCredit && (
          <p className="text-xs text-orange-500 mt-1 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></span>
            {translations.lowCreditWarning || "Créditos baixos"}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full hover:bg-primary/5" 
          onClick={() => onBuyCredits(creditType)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {translations.buyMore}
        </Button>
      </CardFooter>
    </Card>
  );
};
