import React, { useState, useEffect } from "react";
import { campaignTemplates } from "@/data/campaignTemplates";
import { CampaignTemplate, CampaignType } from "@/types/campaign";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, PercentCircle, MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCategories } from "@/data/campaignTemplates";

interface TemplateSelectorProps {
  campaignType: CampaignType;
  categoryFilter?: string;
  onSelect: (content: string, subject?: string, imageUrl?: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  campaignType, 
  categoryFilter = "", 
  onSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredTemplates, setFilteredTemplates] = useState<CampaignTemplate[]>([]);
  
  useEffect(() => {
    let templates = campaignTemplates.filter(template => template.type === campaignType);
    
    if (categoryFilter) {
      templates = templates.filter(template => template.category === categoryFilter);
    }
    else if (selectedCategory) {
      templates = templates.filter(template => template.category === selectedCategory);
    }
    
    setFilteredTemplates(templates);
  }, [campaignType, selectedCategory, categoryFilter]);

  const allCategories = getAllCategories();

  const getTemplateIcon = (type: CampaignType) => {
    switch (type) {
      case "whatsapp":
        return <MessageSquare className="h-5 w-5 text-green-600" />;
      case "sms":
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case "rcs":
        return <MessageCircle className="h-5 w-5 text-indigo-600" />;
      case "email":
        return <Mail className="h-5 w-5 text-orange-600" />;
      case "paid":
        return <PercentCircle className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const getTemplateTypeName = (type: CampaignType) => {
    switch (type) {
      case "whatsapp":
        return "WhatsApp";
      case "sms":
        return "SMS";
      case "rcs":
        return "RCS";
      case "email":
        return "Email";
      case "paid":
        return "Tráfego Pago";
      default:
        return "Desconhecido";
    }
  };

  const handleSelectTemplate = (template: CampaignTemplate) => {
    onSelect(template.content, template.subject, template.imageUrl);
  };

  const getCategoryDisplayName = (category: string): string => {
    switch(category) {
      case 'customer-recovery': return 'Recuperação de Clientes';
      case 'loyalty': return 'Fidelização de Clientes';
      case 'channel-migration': return 'Migração de Canal';
      case 'consumption-pattern': return 'Padrão de Consumo';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <div>
      {!categoryFilter && (
        <Tabs
          defaultValue=""
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-4"
        >
          <TabsList className="mb-2 flex flex-wrap h-auto">
            <TabsTrigger value="" className="mb-1">Todos</TabsTrigger>
            {allCategories.map(category => (
              <TabsTrigger value={category} key={category} className="mb-1">
                {getCategoryDisplayName(category)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <ScrollArea className="h-80 rounded-md border">
        <div className="p-4">
          <h3 className="mb-4 text-sm font-medium">
            Templates de {getTemplateTypeName(campaignType)}
            {selectedCategory && ` - ${getCategoryDisplayName(selectedCategory)}`}
            {categoryFilter && ` - ${getCategoryDisplayName(categoryFilter)}`}
          </h3>
          <div className="space-y-4">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:bg-gray-50">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTemplateIcon(template.type)}
                        <CardTitle className="text-base">{template.name}</CardTitle>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSelectTemplate(template)}
                      >
                        Usar
                      </Button>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                      {template.content.substring(0, 100)}
                      {template.content.length > 100 && "..."}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-6 text-muted-foreground">
                <p>Nenhum template disponível para este tipo de campanha.</p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TemplateSelector;
