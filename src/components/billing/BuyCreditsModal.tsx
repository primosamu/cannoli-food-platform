
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
import { CreditQuantitySelector } from "./credits/CreditQuantitySelector";
import { CreditCostsInfo } from "./credits/CreditCostsInfo";
import { CreditSummary } from "./credits/CreditSummary";
import { CreditType, CreditPackagesData, CreditCosts } from "./credits/types";
import { CreditCards } from "./CreditCards";

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
  const [selectedTab, setSelectedTab] = useState<string>("packages");
  const [selectedType, setSelectedType] = useState<CreditType>(creditType);
  const [selectedPackage, setSelectedPackage] = useState<number>(500);
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  
  useEffect(() => {
    if (creditType) {
      setSelectedType(creditType);
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
  
  const getCreditsForPackage = (packageValue: number) => {
    switch(packageValue) {
      case 100: return 1000;
      case 500: return 6000;  // 5500 + 500 bonus
      case 1000: return 14000; // 12000 + 2000 bonus
      default: return 6000;
    }
  };
  
  useEffect(() => {
    if (selectedTab === "packages") {
      setTotal(selectedPackage * quantity);
    } else {
      const currentPackages = creditPackages[selectedType];
      const currentPackage = currentPackages.find(pkg => pkg.id === `${selectedType}-medium`);
      if (currentPackage) {
        setTotal(currentPackage.price * quantity);
      }
    }
  }, [selectedType, selectedTab, selectedPackage, quantity, creditPackages]);
  
  const handlePurchase = () => {
    if (selectedTab === "packages") {
      onPurchase(`package-${selectedPackage}`, quantity);
    } else {
      const packageId = `${selectedType}-medium`;
      onPurchase(packageId, quantity);
    }
  };

  const handleSelectType = (type: CreditType) => {
    setSelectedType(type);
  };

  const handleSelectPackage = (packageValue: number) => {
    setSelectedPackage(packageValue);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{translations.buyCredits || "Comprar Créditos"}</DialogTitle>
          <DialogDescription>
            {translations.selectPackageOrCredits || "Selecione um pacote ou tipo específico de créditos para comprar"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <Tabs defaultValue="packages" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="packages">{translations.creditPackages || "Pacotes de Créditos"}</TabsTrigger>
              <TabsTrigger value="specific">{translations.specificCredits || "Créditos Específicos"}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="packages" className="space-y-4 pt-4">
              <CreditCards 
                onBuyCredits={() => {}}
                showPackages={true}
                selectedPackage={selectedPackage}
                onSelectPackage={handleSelectPackage}
              />
              
              <CreditQuantitySelector 
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </TabsContent>
            
            <TabsContent value="specific" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["phone", "message", "campaign", "rcs"].map((type) => (
                  <Card 
                    key={type}
                    className={`cursor-pointer ${selectedType === type ? 'border-primary ring-1 ring-primary' : ''}`}
                    onClick={() => handleSelectType(type as CreditType)}
                  >
                    <CardHeader className="p-4">
                      <CardTitle className="text-sm">
                        {type === "phone" && (translations.phoneEnrichment || "Enriquecimento")}
                        {type === "message" && "SMS"}
                        {type === "campaign" && (translations.campaignsCreated || "Campanhas")}
                        {type === "rcs" && "RCS"}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              
              <CreditCostsInfo selectedTab={selectedType} costs={creditCosts} />
              
              <CreditQuantitySelector 
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </TabsContent>
          </Tabs>
          
          <CreditSummary 
            total={total} 
            totalCredits={
              selectedTab === "packages" 
                ? getCreditsForPackage(selectedPackage) * quantity
                : Math.floor(total / creditCosts[selectedType]) * 10
            } 
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

// Card component to avoid import issues if not already imported
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
