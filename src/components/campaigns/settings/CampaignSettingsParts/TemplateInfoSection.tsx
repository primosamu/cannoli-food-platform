
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CampaignTemplate } from "@/types/campaign";

interface TemplateInfoSectionProps {
  template: CampaignTemplate | null;
  translations: any;
}

const TemplateInfoSection: React.FC<TemplateInfoSectionProps> = ({ template, translations }) => {
  if (!template) return null;
  return (
    <div className="bg-muted/50 p-4 rounded-lg mb-6">
      <h3 className="text-xl font-semibold">{template.name}</h3>
      <p className="text-muted-foreground mt-1">{template.description}</p>
      {template.category && (
        <Badge variant="outline" className="mt-2">
          {template.category === 'customer-recovery' && translations['customer-recovery']}
          {template.category === 'loyalty' && translations['loyalty']}
          {template.category === 'consumption-pattern' && translations['consumption-pattern']}
          {template.category === 'channel-migration' && translations['channel-migration']}
        </Badge>
      )}
    </div>
  );
};

export default TemplateInfoSection;
