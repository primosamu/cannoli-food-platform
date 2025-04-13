
import React, { useState } from 'react';
import { BuyCreditsModal } from "@/components/billing/BuyCreditsModal";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { CreditType } from "@/components/billing/credits/types";
import { BillingHeader } from "@/components/billing/BillingHeader";
import { CreditCards } from "@/components/billing/CreditCards";
import { CreditHistory } from "@/components/billing/CreditHistory";
import { PlansSection } from "@/components/billing/PlansSection";
import { CreditTransaction } from "@/components/billing/CreditHistoryTable";

const BillingPage = () => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [buyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);
  const [creditType, setCreditType] = useState<CreditType>('phone');
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  // Sample data for store options
  const storeOptions = [
    { id: 'store-1', name: 'Downtown Store' },
    { id: 'store-2', name: 'Uptown Store' }
  ];

  // Sample data for credit usage chart
  const creditUsageData = [
    { type: translations.phoneEnrichmentCredits, value: 2500, color: '#9b87f5' },
    { type: translations.messagingCredits, value: 5000, color: '#7E69AB' },
    { type: translations.campaignCredits, value: 500, color: '#1EAEDB' },
    { type: 'RCS Credits', value: 1000, color: '#6A5ACD' },
  ];

  const totalCredits = creditUsageData.reduce((sum, item) => sum + item.value, 0);

  // Sample data for recent transactions
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

  // Sample data for plans
  const plans = [
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

  return (
    <div className="space-y-6">
      <BillingHeader 
        selectedStores={selectedStores} 
        onStoreChange={setSelectedStores} 
        storeOptions={storeOptions}
      />

      <CreditCards onBuyCredits={handleBuyCredits} />

      <CreditHistory 
        transactions={recentTransactions} 
        usageData={creditUsageData}
        totalCredits={totalCredits}
      />

      <PlansSection plans={plans} />

      <BuyCreditsModal
        open={buyCreditsModalOpen}
        onClose={() => setBuyCreditsModalOpen(false)}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

export default BillingPage;
