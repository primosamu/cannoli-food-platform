
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { StoreSelector } from "@/components/dashboard/StoreSelector";

interface BillingHeaderProps {
  selectedStores: string[];
  onStoreChange: (stores: string[]) => void;
  storeOptions: { id: string; name: string }[];
}

export const BillingHeader: React.FC<BillingHeaderProps> = ({ 
  selectedStores, 
  onStoreChange,
  storeOptions
}) => {
  const { translations } = useLanguage();
  
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{translations.billing}</h2>
        <p className="text-muted-foreground">
          {translations.billingAndCredits}
        </p>
      </div>
      <div className="flex items-center">
        <StoreSelector
          stores={storeOptions}
          selectedStores={selectedStores}
          onStoreChange={onStoreChange}
        />
      </div>
    </div>
  );
};
