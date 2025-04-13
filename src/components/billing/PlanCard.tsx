
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface PlanDetails {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PlanFeature[];
  phoneEnrichmentCredits: number;
  messagingCredits: number;
  campaignCredits: number;
  isCurrent?: boolean;
}

interface PlanCardProps {
  plan: PlanDetails;
  isAnnual: boolean;
  onSelect: (plan: PlanDetails) => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isAnnual, onSelect }) => {
  const { translations } = useLanguage();
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const periodText = isAnnual ? translations.perYear : translations.perMonth;
  
  return (
    <Card className={`flex flex-col ${plan.isCurrent ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader>
        {plan.isCurrent && (
          <div className="px-3 py-1 text-xs bg-primary text-white w-fit rounded-full mb-2">
            {translations.currentPlan}
          </div>
        )}
        <CardTitle>{plan.name}</CardTitle>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-sm text-muted-foreground mb-1">{periodText}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">{translations.creditsIncluded}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>{translations.phoneEnrichment}:</span>
                <span className="font-medium">{plan.phoneEnrichmentCredits}</span>
              </li>
              <li className="flex justify-between">
                <span>{translations.messagesSent}:</span>
                <span className="font-medium">{plan.messagingCredits}</span>
              </li>
              <li className="flex justify-between">
                <span>{translations.campaignsCreated}:</span>
                <span className="font-medium">{plan.campaignCredits}</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">{translations.planFeatures}</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className={`flex items-start text-sm ${!feature.included ? 'text-muted-foreground' : ''}`}>
                  <CheckCircle2 className={`h-4 w-4 mr-2 mt-0.5 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          className="w-full" 
          variant={plan.isCurrent ? "outline" : "default"}
          onClick={() => onSelect(plan)}
        >
          {plan.isCurrent ? translations.currentPlanDetails : translations.changePlan}
        </Button>
      </CardFooter>
    </Card>
  );
};
