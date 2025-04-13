
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
    { id: 'store-1', name: 'Loja Centro' },
    { id: 'store-2', name: 'Loja Zona Norte' }
  ];

  // Sample data for credit usage chart
  const creditUsageData = [
    { type: translations.phoneEnrichmentCredits, value: 2500, color: '#9b87f5' },
    { type: translations.messagingCredits, value: 5000, color: '#7E69AB' },
    { type: translations.campaignCredits, value: 500, color: '#1EAEDB' },
    { type: translations.rcsCredits, value: 1000, color: '#6A5ACD' },
  ];

  const totalCredits = creditUsageData.reduce((sum, item) => sum + item.value, 0);

  // Sample data for recent transactions
  const recentTransactions: CreditTransaction[] = [
    {
      id: '1',
      date: '2025-04-12',
      description: 'Enriquecimento de telefone lote #1234',
      amount: 100,
      type: 'phone',
      status: 'completed',
    },
    {
      id: '2',
      date: '2025-04-10',
      description: 'Campanha SMS para clientes VIP',
      amount: 250,
      type: 'message',
      status: 'completed',
    },
    {
      id: '3',
      date: '2025-04-07',
      description: 'Campanha de marketing - Promoção de Páscoa',
      amount: 1,
      type: 'campaign',
      status: 'completed',
    },
    {
      id: '4',
      date: '2025-04-01',
      description: 'Compra de pacote de créditos',
      amount: 1000,
      type: 'purchase',
      status: 'completed',
    },
    {
      id: '5',
      date: '2025-04-13',
      description: 'Campanha RCS para clientes fidelizados',
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
        { name: 'Gerenciamento de clientes', included: true },
        { name: 'Relatórios básicos', included: true },
        { name: 'Suporte por e-mail', included: true },
        { name: 'Acesso à API', included: false },
        { name: 'Suporte prioritário', included: false },
        { name: 'Análises avançadas', included: false },
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
        { name: 'Gerenciamento de clientes', included: true },
        { name: 'Relatórios básicos', included: true },
        { name: 'Suporte por e-mail', included: true },
        { name: 'Acesso à API', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'Análises avançadas', included: false },
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
        { name: 'Gerenciamento de clientes', included: true },
        { name: 'Relatórios básicos', included: true },
        { name: 'Suporte por e-mail', included: true },
        { name: 'Acesso à API', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'Análises avançadas', included: true },
      ],
    },
  ];

  const handleBuyCredits = (type: CreditType) => {
    setCreditType(type);
    setBuyCreditsModalOpen(true);
  };

  const handlePurchase = (packageId: string, quantity: number) => {
    toast({
      title: "Compra Realizada",
      description: `Você comprou ${quantity} pacote(s) de créditos.`,
    });
    setBuyCreditsModalOpen(false);
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
        creditType={creditType}
      />
    </div>
  );
};

export default BillingPage;
