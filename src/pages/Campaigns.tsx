
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  MessageSquare, 
  Mail, 
  Image, 
  BarChart, 
  Calendar, 
  Filter,
  Sparkles,
  PercentCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import CampaignCreator from "@/components/campaigns/CampaignCreator";
import CampaignList from "@/components/campaigns/CampaignList";
import ImageOptimizer from "@/components/campaigns/ImageOptimizer";
import PresetCampaigns from "@/components/campaigns/PresetCampaigns";
import {
  getActiveCampaigns,
  getCompletedCampaigns,
  getScheduledCampaigns,
  getDraftCampaigns
} from "@/data/sampleCampaigns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { getTemplatesByCategory, getMessagingTemplates, getPaidTrafficTemplates } from "@/data/campaignTemplates";
import { CampaignTemplate, CampaignEvent } from "@/types/campaign";
import { useToast } from "@/components/ui/use-toast";
import CampaignSettings from "@/components/campaigns/CampaignSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import { CampaignCalendar } from "@/components/campaigns/CampaignCalendar";
import { CampaignReports } from "@/components/campaigns/CampaignReports";

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [activeView, setActiveView] = useState("list");
  const [campaignType, setCampaignType] = useState<"messaging" | "paid">("messaging");
  const [showCreator, setShowCreator] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CampaignTemplate | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { translations } = useLanguage();

  const activeCampaigns = getActiveCampaigns();
  const scheduledCampaigns = getScheduledCampaigns();
  const completedCampaigns = getCompletedCampaigns();
  const draftCampaigns = getDraftCampaigns();

  useEffect(() => {
    if (location.state && location.state.createCampaign) {
      console.log("Creating campaign with state:", location.state);
      setShowCreator(false);
      setShowPresets(true);
      setShowSettings(false);
      setShowReports(false);

      if (location.state.category) {
        const templates = getTemplatesByCategory(location.state.category);
        if (templates && templates.length > 0) {
          setSelectedTemplate(templates[0]);
          handlePresetSelect(templates[0]);
        }
      }
    }
  }, [location]);

  const handlePresetSelect = (template: CampaignTemplate) => {
    setSelectedTemplate(template);
    setShowCreator(false);
    setShowPresets(false);
    setShowSettings(true);
    setShowReports(false);
    
    toast({
      title: "Template selecionado",
      description: `Template ${template.name} carregado com sucesso.`,
    });
  };

  const handleCreateCampaign = (type: "messaging" | "paid" = "messaging") => {
    setCampaignType(type);
    setShowCreator(true);
    setShowPresets(false);
    setShowSettings(false);
    setShowReports(false);
    setActiveView("list");
  };

  const handleViewReport = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setShowReports(true);
    setShowCreator(false);
    setShowPresets(false);
    setShowSettings(false);
    setActiveView("reports");
  };

  const handleViewCampaign = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setShowCreator(true);
    setShowPresets(false);
    setShowSettings(false);
    setShowReports(false);
  };

  const renderContent = () => {
    if (showReports) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Relatórios de Campanha</CardTitle>
                <CardDescription>
                  Visualize análises detalhadas e desempenho de suas campanhas
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => {
                setShowReports(false);
                setActiveView("list");
              }}>
                Voltar para Campanhas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CampaignReports campaignId={selectedCampaignId || undefined} />
          </CardContent>
        </Card>
      );
    }
    
    if (showPresets) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{campaignType === "messaging" ? 
                  (translations.messaging || "Mensageria") : 
                  (translations.paidTraffic || "Tráfego Pago")}
                </CardTitle>
                <CardDescription>
                  {campaignType === "messaging" ? 
                    (translations.messagingDescription || "Envie mensagens por WhatsApp, SMS ou Email para seus clientes") : 
                    (translations.paidTrafficDescription || "Crie anúncios para Meta, Google e outras plataformas")}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={campaignType === "messaging" ? "default" : "outline"} 
                  onClick={() => setCampaignType("messaging")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mensageria
                </Button>
                <Button 
                  variant={campaignType === "paid" ? "default" : "outline"} 
                  onClick={() => setCampaignType("paid")}
                >
                  <PercentCircle className="mr-2 h-4 w-4" />
                  Tráfego Pago
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PresetCampaigns onSelect={handlePresetSelect} campaignType={campaignType} />
          </CardContent>
        </Card>
      );
    }
    
    if (showSettings) {
      return (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedTemplate ? `Configurações de Campanha: ${selectedTemplate.name}` : 'Configurações de Campanha'}</CardTitle>
                <CardDescription>
                  Configure a audiência, canais e opções de entrega da sua campanha
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => {
                setShowSettings(false);
                setShowPresets(true);
              }}>
                Voltar para Templates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CampaignSettings 
              template={selectedTemplate}
              onContinue={() => {
                setShowSettings(false);
                setShowCreator(true);
              }}
            />
          </CardContent>
        </Card>
      );
    }
    
    if (showCreator) {
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
              <Button variant="outline" onClick={() => {
                if (selectedTemplate) {
                  setShowCreator(false);
                  setShowSettings(true);
                } else {
                  setShowCreator(false);
                  setShowPresets(true);
                }
              }}>
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
                  segmentName={location.state?.segmentName}
                  segmentType={location.state?.segmentType}
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
    }
    
    if (activeView === "calendar") {
      return (
        <CampaignCalendar
          onViewReport={handleViewReport}
          onViewCampaign={handleViewCampaign}
        />
      );
    }

    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>{translations.allCampaigns || "Todas as Campanhas"}</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex items-center gap-2"
                onClick={() => setActiveView("calendar")}
              >
                <Calendar className="h-4 w-4" />
                {translations.schedule || "Agenda"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex items-center gap-2"
                onClick={() => {
                  setShowReports(true);
                  setActiveView("reports");
                }}
              >
                <BarChart className="h-4 w-4" />
                {translations.analytics || "Análises"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-0">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-transparent p-0">
              <TabsTrigger 
                value="active" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {translations.active || "Ativas"}
              </TabsTrigger>
              <TabsTrigger 
                value="scheduled" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {translations.scheduled || "Agendadas"}
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {translations.completed || "Concluídas"}
              </TabsTrigger>
              <TabsTrigger 
                value="drafts" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                {translations.drafts || "Rascunhos"}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="p-6">
              <CampaignList 
                campaigns={activeCampaigns} 
                type="active" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
            <TabsContent value="scheduled" className="p-6">
              <CampaignList 
                campaigns={scheduledCampaigns} 
                type="scheduled" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
            <TabsContent value="completed" className="p-6">
              <CampaignList 
                campaigns={completedCampaigns} 
                type="completed" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
            <TabsContent value="drafts" className="p-6">
              <CampaignList 
                campaigns={draftCampaigns} 
                type="draft" 
                onViewReport={handleViewReport}
                onViewCampaign={handleViewCampaign}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.marketingCampaigns || "Campanhas de Marketing"}</h2>
          <p className="text-muted-foreground">
            {translations.createManageCampaigns || "Crie e gerencie campanhas de marketing para seu restaurante."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!showPresets && !showReports && activeView !== "calendar" && (
            <Button 
              variant="outline" 
              className="items-center gap-2"
              onClick={() => {
                setShowPresets(true);
                setShowCreator(false);
                setShowSettings(false);
                setShowReports(false);
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">{translations.presetCampaigns || "Campanhas Predefinidas"}</span>
              <span className="inline md:hidden">{translations.presets || "Predefinidas"}</span>
            </Button>
          )}
          {!showReports && activeView !== "calendar" && (
            <Button 
              variant="outline" 
              className="items-center gap-2"
              onClick={() => {
                setActiveView(activeView === "list" ? "calendar" : "list");
                setShowReports(false);
                setShowPresets(false);
                setShowCreator(false);
                setShowSettings(false);
              }}
            >
              {activeView === "list" ? (
                <Calendar className="h-4 w-4 mr-2" />
              ) : (
                <BarChart className="h-4 w-4 mr-2" />
              )}
              {activeView === "list" ? "Calendário" : "Lista"}
            </Button>
          )}
          <Button 
            variant="outline" 
            className="hidden md:flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {translations.filter || "Filtrar"}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => handleCreateCampaign("messaging")}
            className="flex items-center gap-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> 
            {translations.createCampaign || "Criar Campanha"}
          </Button>
        </div>
      </div>

      {renderContent()}

      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="fixed bottom-6 right-6 rounded-full h-12 w-12 shadow-lg p-0"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Templates de Campanha</DialogTitle>
            <DialogDescription>
              Use nossos templates prontos para criar campanhas de marketing eficazes.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Tipos de Templates Disponíveis:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-green-600 mr-2" />
                  Templates de WhatsApp
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                  Templates de SMS
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-orange-600 mr-2" />
                  Templates de Email
                </li>
                <li className="flex items-center">
                  <Image className="h-4 w-4 text-purple-600 mr-2" />
                  Templates de Tráfego Pago
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Clique em "Campanhas Predefinidas" para selecionar rapidamente uma campanha pré-configurada para necessidades comuns de marketing.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
