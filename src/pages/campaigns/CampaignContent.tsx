
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Mail, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignCreator from "@/components/campaigns/CampaignCreator";
import ImageOptimizer from "@/components/campaigns/ImageOptimizer";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignTemplate } from "@/types/campaign";

interface CampaignContentProps {
  showCreator: boolean;
  selectedTemplate: CampaignTemplate | null;
  campaignType: "messaging" | "paid";
  handleGoBack: () => void;
  campaignSettings: {
    selectedChannels: string[];
    audienceType: string;
    incentiveType: string;
    scheduledDate: string;
    scheduledTime: string;
    inactiveDays: string;
    selectedSegment: string;
  } | null;
  segmentName?: string;
  segmentType?: string;
}

const CampaignContent: React.FC<CampaignContentProps> = ({
  showCreator,
  selectedTemplate,
  campaignType,
  handleGoBack,
  campaignSettings,
  segmentName,
  segmentType,
}) => {
  const { translations } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              {selectedTemplate ? `Criar Campanha: ${selectedTemplate.name}` : 'Criar Nova Campanha'}
            </CardTitle>
            <CardDescription>
              {campaignType === "messaging" ? 
                "Crie sua campanha de marketing por WhatsApp, SMS ou Email" : 
                "Crie sua campanha de anúncios pagos para Meta, Google ou outras plataformas"}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={handleGoBack}>
            {selectedTemplate ? 'Voltar para Configurações' : 'Voltar para Templates'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">
              <MessageSquare className="mr-2 h-4 w-4" /> 
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="images">
              <Image className="mr-2 h-4 w-4" /> 
              Imagens
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="pt-6">
            <CampaignCreator 
              initialTemplate={selectedTemplate}
              segmentName={segmentName}
              segmentType={segmentType}
              settings={campaignSettings || undefined}
            />
          </TabsContent>
          <TabsContent value="images" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageOptimizer />
              <Card>
                <CardHeader>
                  <CardTitle>Galeria de Imagens</CardTitle>
                  <CardDescription>
                    Selecione imagens anteriores ou faça upload de novas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div 
                        key={item} 
                        className="aspect-video bg-gray-100 rounded flex items-center justify-center"
                      >
                        <span className="text-muted-foreground">Imagem {item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CampaignContent;
