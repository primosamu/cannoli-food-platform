
import React, { useState } from "react";
import GmbCampaignSettings from "./GmbCampaignSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Target, DollarSign, Tags, MapPin } from "lucide-react";

interface PaidCampaignSettingsProps {
  template: any;
  onContinue: () => void;
}

const PaidCampaignSettings: React.FC<PaidCampaignSettingsProps> = ({ template, onContinue }) => {
  const [budget, setBudget] = useState("200");
  const [duration, setDuration] = useState("7");
  const [keywords, setKeywords] = useState("");
  const [region, setRegion] = useState("");
  const [objective, setObjective] = useState("REACH");
  const [ageRange, setAgeRange] = useState("25-54");
  const [gender, setGender] = useState("all");
  
  // Check if this is a Google My Business template
  const isGmbTemplate = template?.platform === "gmb";
  
  if (isGmbTemplate) {
    return <GmbCampaignSettings template={template} onContinue={onContinue} />;
  }
  
  // Identify if it's a Google or Meta campaign
  const isGoogleAds = template?.platform === "google";
  const platformUpper = isGoogleAds ? "GOOGLE ADS" : "META ADS";
  const platformColor = isGoogleAds ? "bg-blue-100 text-blue-900" : "bg-blue-100 text-blue-900";
  
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold">{template?.name}</h3>
        <p className="text-muted-foreground mt-1">{template?.description}</p>
        <div className="mt-2">
          <span className={`inline-block rounded px-3 py-1 ${platformColor} text-xs font-bold`}>
            {platformUpper}
          </span>
        </div>
      </div>

      <Tabs defaultValue="targeting" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="targeting">
            <Target className="h-4 w-4 mr-2" />
            Segmentação
          </TabsTrigger>
          <TabsTrigger value="budget">
            <DollarSign className="h-4 w-4 mr-2" />
            Orçamento e Duração
          </TabsTrigger>
          <TabsTrigger value="creative">
            <Tags className="h-4 w-4 mr-2" />
            Criativo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="targeting" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="objective">Objetivo da Campanha</Label>
                <Select value={objective} onValueChange={setObjective}>
                  <SelectTrigger id="objective">
                    <SelectValue placeholder="Selecione um objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REACH">Alcance</SelectItem>
                    <SelectItem value="TRAFFIC">Tráfego</SelectItem>
                    <SelectItem value="ENGAGEMENT">Engajamento</SelectItem>
                    <SelectItem value="CONVERSIONS">Conversões</SelectItem>
                    <SelectItem value="STORE_VISITS">Visitas ao Estabelecimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="region">Região de Exibição</Label>
                <Input
                  id="region"
                  placeholder="Ex: São Paulo, SP"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Defina a localização onde seu anúncio será exibido
                </p>
              </div>
              
              <div>
                <Label htmlFor="radius">Raio de Alcance</Label>
                <Select defaultValue="5">
                  <SelectTrigger id="radius">
                    <SelectValue placeholder="Raio de alcance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1km ao redor</SelectItem>
                    <SelectItem value="5">5km ao redor</SelectItem>
                    <SelectItem value="10">10km ao redor</SelectItem>
                    <SelectItem value="20">20km ao redor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="ageRange">Faixa Etária</Label>
                <Select value={ageRange} onValueChange={setAgeRange}>
                  <SelectTrigger id="ageRange">
                    <SelectValue placeholder="Selecione a faixa etária" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-24">18-24 anos</SelectItem>
                    <SelectItem value="25-34">25-34 anos</SelectItem>
                    <SelectItem value="25-54">25-54 anos</SelectItem>
                    <SelectItem value="35-44">35-44 anos</SelectItem>
                    <SelectItem value="45-65">45-65 anos</SelectItem>
                    <SelectItem value="all">Todas as idades</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="gender">Gênero</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="male">Homens</SelectItem>
                    <SelectItem value="female">Mulheres</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="keywords">Interesses/Palavras-chave</Label>
                <Textarea
                  id="keywords"
                  placeholder="Ex: gastronomia, delivery, comida italiana, refeições"
                  value={keywords}
                  onChange={e => setKeywords(e.target.value)}
                  className="h-[100px]"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Digite uma palavra-chave por linha ou separadas por vírgula
                </p>
              </div>
            </div>
          </div>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Audiência Estimada</CardTitle>
              <CardDescription>Com base nos critérios selecionados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Tamanho potencial da audiência:</span>
                <span className="font-medium">85,000 - 112,000 pessoas</span>
              </div>
              {isGoogleAds && (
                <div className="flex justify-between items-center">
                  <span>Volume de buscas mensal estimado:</span>
                  <span className="font-medium">4,700 - 7,100 buscas</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span>Impressões estimadas:</span>
                <span className="font-medium">9,500 - 12,700 por dia</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="budget">Orçamento diário estimado (R$)</Label>
                <Input
                  id="budget"
                  type="number"
                  min={10}
                  step={1}
                  placeholder="200"
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Valor mínimo recomendado: R$ 50/dia
                </p>
              </div>
              
              <div>
                <Label htmlFor="duration">Duração da campanha (dias)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  max={365}
                  placeholder="7"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="budgetType">Tipo de Orçamento</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="budgetType">
                    <SelectValue placeholder="Tipo de orçamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Orçamento diário</SelectItem>
                    <SelectItem value="lifetime">Orçamento total da campanha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="bidStrategy">Estratégia de Lance</Label>
                <Select defaultValue="auto">
                  <SelectTrigger id="bidStrategy">
                    <SelectValue placeholder="Estratégia de lance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Lance automático (recomendado)</SelectItem>
                    <SelectItem value="manual">Lance manual</SelectItem>
                    <SelectItem value="target_cpa">Custo por aquisição alvo</SelectItem>
                    <SelectItem value="target_roas">Retorno sobre investimento alvo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Previsão de Resultados</CardTitle>
                <CardDescription>Com orçamento de R${budget}/dia por {duration} dias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Orçamento total:</span>
                  <span className="font-medium">R$ {(Number(budget) * Number(duration)).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Impressões estimadas:</span>
                  <span className="font-medium">{(Number(budget) * 50 * Number(duration)).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cliques estimados:</span>
                  <span className="font-medium">{(Number(budget) * 2.5 * Number(duration)).toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>CPC médio estimado:</span>
                  <span className="font-medium">R$ 2,00 - R$ 3,50</span>
                </div>
                
                <div className="pt-3 mt-3 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span>Taxa de conversão média do setor:</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-green-600">
                    <span>Conversões estimadas:</span>
                    <span>{Math.round(Number(budget) * 2.5 * Number(duration) * 0.032).toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="creative" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="headline">Título Principal</Label>
                <Input
                  id="headline"
                  placeholder="Ex: Sabores incríveis com 20% OFF"
                  defaultValue={template?.subject || ""}
                />
                {isGoogleAds && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Máximo: 30 caracteres
                  </p>
                )}
              </div>
              
              {isGoogleAds && (
                <>
                  <div>
                    <Label htmlFor="headline2">Título 2</Label>
                    <Input
                      id="headline2"
                      placeholder="Ex: Peça online agora"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Máximo: 30 caracteres
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="headline3">Título 3</Label>
                    <Input
                      id="headline3"
                      placeholder="Ex: Entrega em 30 minutos"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Máximo: 30 caracteres
                    </p>
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva seu anúncio"
                  defaultValue={template?.content}
                  className="h-20"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {isGoogleAds 
                    ? "Máximo: 90 caracteres por linha, 2 linhas"
                    : "Máximo: 125 caracteres para melhores resultados"}
                </p>
              </div>
              
              <div>
                <Label htmlFor="cta">Botão de Chamada para Ação</Label>
                <Select defaultValue="ORDER_NOW">
                  <SelectTrigger id="cta">
                    <SelectValue placeholder="Botão de CTA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ORDER_NOW">Peça Agora</SelectItem>
                    <SelectItem value="LEARN_MORE">Saiba Mais</SelectItem>
                    <SelectItem value="SIGN_UP">Cadastre-se</SelectItem>
                    <SelectItem value="CONTACT_US">Contate-nos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <Label className="mb-2 block">Imagens para o Anúncio</Label>
              <div className="grid grid-cols-2 gap-3">
                {["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
                  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
                  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80"].map((img, index) => (
                  <div key={index} className="border rounded-md overflow-hidden cursor-pointer hover:border-primary">
                    <img 
                      src={img}
                      alt={`Imagem de exemplo ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Button variant="outline" className="w-full">
                  Enviar nova imagem
                </Button>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="finalUrl">URL de Destino</Label>
                <Input
                  id="finalUrl"
                  placeholder="https://www.seurestaurante.com.br/promocao"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Página para onde os usuários serão direcionados após clicar no anúncio
                </p>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Switch id="trackingParams" defaultChecked />
                <Label htmlFor="trackingParams">
                  Adicionar parâmetros de UTM para rastreamento
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button
          onClick={onContinue}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Continuar para criação do anúncio
        </Button>
      </div>
    </div>
  );
};

export default PaidCampaignSettings;
