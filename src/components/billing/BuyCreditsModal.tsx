
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { CreditPackageSelector } from "./credits/CreditPackageSelector";
import { CreditPackageDetails } from "./credits/CreditPackageDetails";
import { CreditQuantitySelector } from "./credits/CreditQuantitySelector";
import { CreditCostsInfo } from "./credits/CreditCostsInfo";
import { CreditSummary } from "./credits/CreditSummary";
import { CreditType, CreditPackage, CreditPackagesData, CreditCosts } from "./credits/types";

interface BuyCreditsModalProps {
  open: boolean;
  onClose: () => void;
  onPurchase: (packageId: string, quantity: number) => void;
}

export const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ 
  open, 
  onClose,
  onPurchase
}) => {
  const { translations } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<CreditType>("phone");
  const [selectedPackage, setSelectedPackage] = useState<string>("small");
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  
  const creditPackages: CreditPackagesData = {
    phone: [
      { id: "phone-small", name: "Small", credits: 100, price: 9.99 },
      { id: "phone-medium", name: "Medium", credits: 500, price: 39.99 },
      { id: "phone-large", name: "Large", credits: 1000, price: 69.99 },
    ],
    message: [
      { id: "message-small", name: "Small", credits: 200, price: 19.99 },
      { id: "message-medium", name: "Medium", credits: 1000, price: 79.99 },
      { id: "message-large", name: "Large", credits: 5000, price: 299.99 },
    ],
    campaign: [
      { id: "campaign-small", name: "Small", credits: 5, price: 49.99 },
      { id: "campaign-medium", name: "Medium", credits: 15, price: 129.99 },
      { id: "campaign-large", name: "Large", credits: 30, price: 199.99 },
    ],
  };

  const creditCosts: CreditCosts = {
    phone: 0.10,  // $0.10 per phone enrichment
    message: 0.05, // $0.05 per message
    campaign: 10.00 // $10.00 per campaign
  };
  
  const currentPackages = creditPackages[selectedTab];
  const currentPackage = currentPackages.find(pkg => pkg.id === `${selectedTab}-${selectedPackage}`);
  
  useEffect(() => {
    // Reset to first package and quantity of 1 when changing tabs
    setSelectedPackage("small");
    setQuantity(1);
  }, [selectedTab]);
  
  useEffect(() => {
    if (currentPackage) {
      setTotal(currentPackage.price * quantity);
    }
  }, [currentPackage, quantity]);
  
  const handleTabChange = (value: CreditType) => {
    setSelectedTab(value);
  };
  
  const handlePackageChange = (packageSize: string) => {
    setSelectedPackage(packageSize);
  };
  
  const handlePurchase = () => {
    if (currentPackage) {
      onPurchase(currentPackage.id, quantity);
      onClose();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{translations.buyCredits}</DialogTitle>
          <DialogDescription>
            {translations.selectQuantity}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <Tabs defaultValue="phone" value={selectedTab} onValueChange={(value) => handleTabChange(value as CreditType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phone">{translations.phoneEnrichment}</TabsTrigger>
              <TabsTrigger value="message">{translations.messagesSent}</TabsTrigger>
              <TabsTrigger value="campaign">{translations.campaignsCreated}</TabsTrigger>
            </TabsList>
            
            <CreditCostsInfo selectedTab={selectedTab} costs={creditCosts} />
            
            <CreditPackageSelector 
              packageSizes={["small", "medium", "large"]}
              selectedPackage={selectedPackage}
              onPackageChange={handlePackageChange}
            />
            
            {currentPackage && (
              <>
                <CreditPackageDetails currentPackage={currentPackage} />
                
                <CreditQuantitySelector 
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
              </>
            )}
          </Tabs>
          
          <CreditSummary 
            total={total} 
            totalCredits={currentPackage ? quantity * currentPackage.credits : 0} 
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translations.cancel}
          </Button>
          <Button onClick={handlePurchase}>
            {translations.proceedToCheckout}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
