
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getTemplateIcon } from "@/components/dashboard/customer-behavior/utils";
import { CampaignTemplate } from "@/types/campaign";
import { 
  campaignTemplates, 
  getMessagingTemplates, 
  getPaidTrafficTemplates 
} from "@/data/campaignTemplates";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users } from "lucide-react";

interface PresetCampaignsProps {
  onSelect: (template: CampaignTemplate) => void;
  campaignType?: "messaging" | "paid";
}

// Define preset campaign categories
const messagingCategories = [
  {
    id: "customer-recovery",
    name: "Customer Recovery",
    description: "Win back customers who haven't ordered in a while",
    color: "bg-red-100 text-red-700 border-red-200"
  },
  {
    id: "loyalty",
    name: "Customer Loyalty",
    description: "Reward and engage your loyal customers",
    color: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    id: "consumption-pattern",
    name: "Consumption Patterns",
    description: "Encourage new consumption behaviors",
    color: "bg-green-100 text-green-700 border-green-200"
  },
  {
    id: "channel-migration",
    name: "Channel Migration",
    description: "Move customers from marketplaces to direct ordering",
    color: "bg-purple-100 text-purple-700 border-purple-200"
  }
];

const paidCategories = [
  {
    id: "meta",
    name: "Meta Ads",
    description: "Facebook and Instagram ad campaigns",
    color: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    id: "google",
    name: "Google Ads",
    description: "Search and display ads on Google",
    color: "bg-green-100 text-green-700 border-green-200"
  }
];

const PresetCampaigns: React.FC<PresetCampaignsProps> = ({ onSelect, campaignType = "messaging" }) => {
  const { translations } = useLanguage();
  
  // Selecionar as categorias e templates com base no tipo de campanha
  const categories = campaignType === "messaging" ? messagingCategories : paidCategories;
  const templates = campaignType === "messaging" ? 
    getMessagingTemplates() : 
    getPaidTrafficTemplates();
  
  // Helper function para filtrar templates conforme categoria
  const filterTemplates = (category: string): CampaignTemplate[] => {
    if (campaignType === "messaging") {
      return templates.filter(t => t.category === category);
    } else {
      // Para campanhas de tráfego pago, filtramos por plataforma
      return templates.filter(t => t.platform === category || 
        (category === "meta" && (t.platform === "facebook" || t.platform === "instagram")));
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => {
        // Obter templates para esta categoria
        const categoryTemplates = filterTemplates(category.id);
        
        // Pular categorias sem templates
        if (categoryTemplates.length === 0) return null;
        
        return (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <Badge variant="outline" className={category.color}>
                {translations[category.id as keyof typeof translations] || category.name}
              </Badge>
              <CardDescription className="mt-2">
                {translations[`${category.id}Description` as keyof typeof translations] || category.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-64 px-6">
                <div className="space-y-3 pb-6">
                  {categoryTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className="border rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                      onClick={() => onSelect(template)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getTemplateIcon(template.type)}
                          <span className="font-medium">{template.name}</span>
                        </div>
                        <Button size="sm" variant="ghost" onClick={(e) => {
                          e.stopPropagation();
                          onSelect(template);
                        }}>
                          {translations.use || "Usar"}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      {template.audienceSize && (
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {template.audienceSize} {translations.contacts || "contatos"}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PresetCampaigns;
