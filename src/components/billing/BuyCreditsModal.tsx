
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
  creditType: CreditType;
}

export const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ 
  open, 
  onClose,
  onPurchase,
  creditType
}) => {
  const { translations } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<CreditType>(creditType);
  const [selectedPackage, setSelectedPackage] = useState<string>("small");
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  
  useEffect(() => {
    if (creditType) {
      setSelectedTab(creditType);
    }
  }, [creditType]);
  
  const creditPackages: CreditPackagesData = {
    phone: [
      { id: "phone-small", name: "Pequeno", credits: 100, price: 9.99 },
      { id: "phone-medium", name: "Médio", credits: 500, price: 39.99 },
      { id: "phone-large", name: "Grande", credits: 1000, price: 69.99 },
    ],
    message: [
      { id: "message-small", name: "Pequeno", credits: 200, price: 19.99 },
      { id: "message-medium", name: "Médio", credits: 1000, price: 79.99 },
      { id: "message-large", name: "Grande", credits: 5000, price: 299.99 },
    ],
    campaign: [
      { id: "campaign-small", name: "Pequeno", credits: 5, price: 49.99 },
      { id: "campaign-medium", name: "Médio", credits: 15, price: 129.99 },
      { id: "campaign-large", name: "Grande", credits: 30, price: 199.99 },
    ],
    rcs: [
      { id: "rcs-small", name: "Pequeno", credits: 100, price: 29.99 },
      { id: "rcs-medium", name: "Médio", credits: 500, price: 119.99 },
      { id: "rcs-large", name: "Grande", credits: 1000, price: 199.99 },
    ],
  };

  const creditCosts: CreditCosts = {
    phone: 0.10,  // R$0,10 por enriquecimento de telefone
    message: 0.05, // R$0,05 por mensagem SMS
    campaign: 10.00, // R$10,00 por campanha
    rcs: 0.30 // R$0,30 por mensagem RCS
  };
  
  const currentPackages = creditPackages[selectedTab];
  const currentPackage = currentPackages.find(pkg => pkg.id === `${selectedTab}-${selectedPackage}`);
  
  useEffect(() => {
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
          <DialogTitle>{translations.buyCredits || "Comprar Créditos"}</DialogTitle>
          <DialogDescription>
            {translations.selectQuantity || "Selecione a quantidade de créditos que deseja comprar"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={(value) => handleTabChange(value as CreditType)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="phone">{translations.phoneEnrichment || "Enriquecimento"}</TabsTrigger>
              <TabsTrigger value="message">SMS</TabsTrigger>
              <TabsTrigger value="rcs">RCS</TabsTrigger>
              <TabsTrigger value="campaign">{translations.campaignsCreated || "Campanhas"}</TabsTrigger>
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
            {translations.cancel || "Cancelar"}
          </Button>
          <Button onClick={handlePurchase}>
            {translations.proceedToCheckout || "Prosseguir para Pagamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
