
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
}

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
  const [selectedTab, setSelectedTab] = useState("phone");
  const [selectedPackage, setSelectedPackage] = useState<string>("small");
  const [quantity, setQuantity] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  
  const creditPackages: Record<string, CreditPackage[]> = {
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

  const creditCosts = {
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
  
  const handleTabChange = (value: string) => {
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
          <DialogTitle>{translations.settings.buyCredits}</DialogTitle>
          <DialogDescription>
            {translations.settings.selectQuantity}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <Tabs defaultValue="phone" value={selectedTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="phone">{translations.settings.phoneEnrichment}</TabsTrigger>
              <TabsTrigger value="message">{translations.settings.messagesSent}</TabsTrigger>
              <TabsTrigger value="campaign">{translations.settings.campaignsCreated}</TabsTrigger>
            </TabsList>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{translations.settings.creditCosts}</span>
                <span className="font-medium">
                  ${creditCosts[selectedTab as keyof typeof creditCosts]} 
                  {selectedTab === 'phone' && translations.settings.eachPhoneEnrichment}
                  {selectedTab === 'message' && translations.settings.eachMessageSent}
                  {selectedTab === 'campaign' && translations.settings.eachCampaignCreated}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 my-4">
              {["small", "medium", "large"].map((size) => (
                <Button
                  key={size}
                  variant={selectedPackage === size ? "default" : "outline"}
                  onClick={() => handlePackageChange(size)}
                  className="w-full"
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Button>
              ))}
            </div>
            
            {currentPackage && (
              <>
                <div className="bg-muted/50 p-3 rounded-md my-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{translations.settings.creditPackage}</span>
                    <span className="font-medium">{currentPackage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{translations.settings.credits}</span>
                    <span className="font-medium">{currentPackage.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{translations.settings.pricePerCredit}</span>
                    <span className="font-medium">
                      ${(currentPackage.price / currentPackage.credits).toFixed(3)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="quantity">{translations.settings.selectQuantity}: {quantity}</Label>
                  <Slider 
                    id="quantity"
                    value={[quantity]} 
                    min={1} 
                    max={10} 
                    step={1} 
                    onValueChange={(values) => setQuantity(values[0])} 
                  />
                  <div className="flex justify-between text-sm">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>
              </>
            )}
          </Tabs>
          
          <div className="bg-primary/10 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{translations.settings.total}</h3>
              <div className="text-2xl font-bold">${total.toFixed(2)}</div>
            </div>
            
            {currentPackage && (
              <div className="text-sm text-muted-foreground mt-1">
                {quantity * currentPackage.credits} {translations.settings.credits}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translations.settings.cancel}
          </Button>
          <Button onClick={handlePurchase}>
            {translations.settings.proceedToCheckout}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
