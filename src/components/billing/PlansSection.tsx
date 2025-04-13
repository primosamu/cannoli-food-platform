
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlanCard, PlanDetails } from "@/components/billing/PlanCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

interface PlansSectionProps {
  plans: PlanDetails[];
}

export const PlansSection: React.FC<PlansSectionProps> = ({ plans }) => {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isAnnual, setIsAnnual] = useState(false);
  
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
  
  return (
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
  );
};
