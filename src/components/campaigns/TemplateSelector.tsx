
import React, { useState, useEffect } from "react";
import { campaignTemplates, getTemplatesByType, getMessagingTemplates, getPaidTrafficTemplates } from "@/data/campaignTemplates";
import { CampaignTemplate, CampaignType } from "@/types/campaign";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, PercentCircle, MessageCircle, Users, Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCategories } from "@/data/campaignTemplates";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

interface TemplateSelectorProps {
  campaignType: CampaignType;
  categoryFilter?: string;
  onSelect: (template: CampaignTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  campaignType, 
  categoryFilter = "", 
  onSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredTemplates, setFilteredTemplates] = useState<CampaignTemplate[]>([]);
  const { translations } = useLanguage();
  
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
        return translations.whatsappTemplates || "Templates de WhatsApp";
      case "sms":
        return translations.smsTemplates || "Templates de SMS";
      case "rcs":
        return translations.rcsTemplates || "Templates de RCS";
      case "email":
        return translations.emailTemplates || "Templates de Email";
      case "paid":
        return translations.paidTemplates || "Templates de Tráfego Pago";
      default:
        return "Desconhecidos";
    }
  };

  const handleSelectTemplate = (template: CampaignTemplate) => {
    onSelect(template);
  };

  const getCategoryDisplayName = (category: string): string => {
    const categoryKey = category as keyof typeof translations;
    return translations[categoryKey] || 
           category.charAt(0).toUpperCase() + category.slice(1);
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
            {getTemplateTypeName(campaignType)}
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
                        {translations.use || "Usar"}
                      </Button>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {template.audienceSize && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          {template.audienceSize} {translations.contacts || "contatos"}
                        </Badge>
                      )}
                      
                      {template.audienceSegmentId && (
                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                          <Tag className="h-3 w-3" />
                          {template.audienceSegmentId}
                        </Badge>
                      )}
                      
                      {template.platform && (
                        <Badge variant="outline" className="text-xs">
                          {template.platform}
                        </Badge>
                      )}
                    </div>
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
