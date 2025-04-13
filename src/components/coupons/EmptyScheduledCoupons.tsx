
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface EmptyScheduledCouponsProps {
  onCreateClick: () => void;
}

export const EmptyScheduledCoupons: React.FC<EmptyScheduledCouponsProps> = ({ 
  onCreateClick 
}) => {
  const { translations } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-muted-foreground">
        {translations.noScheduledCoupons}
      </p>
      <Button className="mt-4" onClick={onCreateClick}>
        <PlusCircle className="mr-2 h-4 w-4" /> 
        {translations.scheduleNewCoupon}
      </Button>
    </div>
  );
};
