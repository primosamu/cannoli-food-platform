
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getTemplateIcon } from "@/components/dashboard/customer-behavior/utils";
import { CampaignTemplate } from "@/types/campaign";

interface PresetCampaignsProps {
  onSelect: (template: CampaignTemplate) => void;
}

// Define preset campaign categories
const presetCategories = [
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

const PresetCampaigns: React.FC<PresetCampaignsProps> = ({ onSelect }) => {
  // Import the campaign templates from our data file
  const { campaignTemplates, getTemplatesByCategory } = require("@/data/campaignTemplates");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Preset Campaigns</h2>
        <p className="text-muted-foreground">
          Choose from our ready-to-use campaign templates for common restaurant marketing needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {presetCategories.map((category) => {
          // Get templates for this category
          const templates = getTemplatesByCategory(category.id);
          
          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <Badge variant="outline" className={category.color}>
                  {category.name}
                </Badge>
                <CardDescription className="mt-2">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-64 px-6">
                  <div className="space-y-3 pb-6">
                    {templates.map((template: CampaignTemplate) => (
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
                            Use
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PresetCampaigns;
