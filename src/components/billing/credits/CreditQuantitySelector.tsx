
import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const CreditQuantitySelector: React.FC<CreditQuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 10,
  step = 1
}) => {
  const { translations } = useLanguage();
  
  return (
    <div className="space-y-3">
      <Label htmlFor="quantity">{translations.selectQuantity}: {quantity}</Label>
      <Slider 
        id="quantity"
        value={[quantity]} 
        min={min} 
        max={max} 
        step={step} 
        onValueChange={(values) => onQuantityChange(values[0])} 
      />
      <div className="flex justify-between text-sm">
        <span>{min}</span>
        <span>{Math.floor((min + max) / 2)}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
