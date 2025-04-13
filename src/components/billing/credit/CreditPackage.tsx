
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { CircleDollarSign } from "lucide-react";

interface CreditPackageProps {
  value: number;
  credits: number;
  bonus: number;
  onSelect: () => void;
  isSelected: boolean;
}

export const CreditPackage: React.FC<CreditPackageProps> = ({
  value,
  credits,
  bonus,
  onSelect,
  isSelected
}) => {
  const { translations } = useLanguage();
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-primary/50'
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          <span>R$ {value.toLocaleString()}</span>
          {isSelected && <CircleDollarSign className="h-5 w-5 text-primary" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
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
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-sm font-medium">{translations.total || "Total"}</span>
            <span className="font-bold">{(credits + bonus).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
