
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditUsageChart } from "@/components/billing/CreditUsageChart";
import { CreditHistoryTable, CreditTransaction } from "@/components/billing/CreditHistoryTable";
import { BuyCreditsModal } from "@/components/billing/BuyCreditsModal";
import { PlanCard, PlanDetails } from "@/components/billing/PlanCard";
import { useToast } from "@/components/ui/use-toast";
import { CircleDollarSign, Wallet, Store, CreditCard, Receipt, PlusCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { StoreSelector } from "@/components/dashboard/StoreSelector";
import { CreditType } from "@/components/billing/credits/types";

const BillingPage = () => {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const [isAnnual, setIsAnnual] = useState(false);
  const [buyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);
  const [creditType, setCreditType] = useState<CreditType>('phone');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  // Sample data - in a real application, this would come from an API
  const creditUsageData = [
    { type: translations.phoneEnrichmentCredits, value: 2500, color: '#9b87f5' },
    { type: translations.messagingCredits, value: 5000, color: '#7E69AB' },
    { type: translations.campaignCredits, value: 500, color: '#1EAEDB' },
    { type: 'RCS Credits', value: 1000, color: '#6A5ACD' },
  ];

  const totalCredits = creditUsageData.reduce((sum, item) => sum + item.value, 0);

  const recentTransactions: CreditTransaction[] = [
    {
      id: '1',
      date: '2025-04-12',
      description: 'Phone enrichment batch #1234',
      amount: 100,
      type: 'phone',
      status: 'completed',
    },
    {
      id: '2',
      date: '2025-04-10',
      description: 'SMS campaign to VIP customers',
      amount: 250,
      type: 'message',
      status: 'completed',
    },
    {
      id: '3',
      date: '2025-04-07',
      description: 'Marketing campaign - Easter promotion',
      amount: 1,
      type: 'campaign',
      status: 'completed',
    },
    {
      id: '4',
      date: '2025-04-01',
      description: 'Credit package purchase',
      amount: 1000,
      type: 'purchase',
      status: 'completed',
    },
    {
      id: '5',
      date: '2025-04-13',
      description: 'RCS campaign to loyalty customers',
      amount: 50,
      type: 'rcs',
      status: 'completed',
    },
  ];

  const plans: PlanDetails[] = [
    {
      id: 'basic',
      name: translations.basicPlan,
      monthlyPrice: 29,
      annualPrice: 279,
      phoneEnrichmentCredits: 500,
      messagingCredits: 1000,
      campaignCredits: 2,
      features: [
        { name: 'Customer management', included: true },
        { name: 'Basic reporting', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced analytics', included: false },
      ],
    },
    {
      id: 'pro',
      name: translations.proPlan,
      monthlyPrice: 79,
      annualPrice: 759,
      phoneEnrichmentCredits: 2000,
      messagingCredits: 5000,
      campaignCredits: 10,
      features: [
        { name: 'Customer management', included: true },
        { name: 'Basic reporting', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced analytics', included: false },
      ],
      isCurrent: true,
    },
    {
      id: 'enterprise',
      name: translations.enterprisePlan,
      monthlyPrice: 199,
      annualPrice: 1919,
      phoneEnrichmentCredits: 10000,
      messagingCredits: 50000,
      campaignCredits: 50,
      features: [
        { name: 'Customer management', included: true },
        { name: 'Basic reporting', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced analytics', included: true },
      ],
    },
  ];

  const handlePlanSelect = (plan: PlanDetails) => {
    if (plan.isCurrent) {
      toast({
        title: translations.currentPlan,
        description: `You are already on the ${plan.name} plan.`,
      });
    } else {
      toast({
        title: "Plan Change",
        description: `You have successfully changed to the ${plan.name}.`,
      });
    }
  };

  const handleBuyCredits = (type: CreditType) => {
    setCreditType(type);
    setBuyCreditsModalOpen(true);
  };

  const handlePurchase = (packageId: string, quantity: number) => {
    toast({
      title: "Purchase Successful",
      description: `You have purchased ${quantity} credit package(s).`,
    });
  };

  const storeOptions = [
    { id: 'store-1', name: 'Downtown Store' },
    { id: 'store-2', name: 'Uptown Store' }
  ];

  return (
    <div className="space-y-6">
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
            onStoreChange={setSelectedStores}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
        {/* Credit Summary Cards */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="h-5 w-5 text-primary" />
              <CardTitle>{translations.phoneEnrichmentCredits}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,500</div>
            <p className="text-xs text-muted-foreground">{translations.credits}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleBuyCredits('phone')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              {translations.buyMore}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-primary" />
              <CardTitle>{translations.messagingCredits}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5,000</div>
            <p className="text-xs text-muted-foreground">{translations.credits}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleBuyCredits('message')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              {translations.buyMore}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <Store className="h-5 w-5 text-primary" />
              <CardTitle>{translations.campaignCredits}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">500</div>
            <p className="text-xs text-muted-foreground">{translations.credits}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleBuyCredits('campaign')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              {translations.buyMore}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <CardTitle>RCS Credits</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,000</div>
            <p className="text-xs text-muted-foreground">{translations.credits}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleBuyCredits('rcs')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              {translations.buyMore}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CreditHistoryTable transactions={recentTransactions} />
        </div>
        <div>
          <CreditUsageChart data={creditUsageData} total={totalCredits} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{translations.plans}</CardTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Button
              variant={isAnnual ? "outline" : "default"}
              size="sm"
              onClick={() => setIsAnnual(false)}
            >
              {translations.monthlySubscription}
            </Button>
            <Button
              variant={isAnnual ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAnnual(true)}
            >
              {translations.annualSubscription}
            </Button>
            {isAnnual && (
              <span className="text-xs text-primary font-medium">
                {translations.saveWithAnnual}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isAnnual={isAnnual}
                onSelect={handlePlanSelect}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <BuyCreditsModal
        open={buyCreditsModalOpen}
        onClose={() => setBuyCreditsModalOpen(false)}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

export default BillingPage;
