
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, MessageSquare, Calendar, Image } from "lucide-react";

interface GmbCampaignSettingsProps {
  template: any;
  onContinue: () => void;
}

const GmbCampaignSettings: React.FC<GmbCampaignSettingsProps> = ({ template, onContinue }) => {
  const { translations } = useLanguage();
  const [location, setLocation] = useState("5km");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [postSchedule, setPostSchedule] = useState("now");
  const [postDuration, setPostDuration] = useState("7");
  const [includePhotos, setIncludePhotos] = useState(true);
  const [postType, setPostType] = useState("update");
  const [callToAction, setCallToAction] = useState("ORDER_ONLINE");
  
  // Sample images for GMB posts
  const sampleImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold">{template?.name}</h3>
        <p className="text-muted-foreground mt-1">{template?.description}</p>
        <div className="mt-2">
          <span className="inline-block rounded px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold">
            Google Meu Negócio
          </span>
        </div>
      </div>
      
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="basic">
            <MapPin className="h-4 w-4 mr-2" />
            Informações Básicas
          </TabsTrigger>
          <TabsTrigger value="content">
            <MessageSquare className="h-4 w-4 mr-2" />
            Conteúdo do Post
          </TabsTrigger>
          <TabsTrigger value="scheduling">
            <Calendar className="h-4 w-4 mr-2" />
            Programação
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Nome do Estabelecimento</Label>
                <Input 
                  id="businessName"
                  placeholder="Ex: Restaurante Sabor & Arte" 
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="businessAddress">Endereço</Label>
                <Input 
                  id="businessAddress"
                  placeholder="Ex: Av. Paulista, 1234, São Paulo, SP" 
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="businessPhone">Telefone</Label>
                <Input 
                  id="businessPhone"
                  placeholder="Ex: (11) 98765-4321" 
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="location">Raio de Alcance</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Selecione o raio de alcance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1km">1km ao redor</SelectItem>
                    <SelectItem value="3km">3km ao redor</SelectItem>
                    <SelectItem value="5km">5km ao redor</SelectItem>
                    <SelectItem value="10km">10km ao redor</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Define a área ao redor do seu negócio onde o anúncio será exibido
                </p>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>API do Google Business Profile</CardTitle>
                <CardDescription>Autenticação com sua conta Google</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-2 rounded-lg bg-green-50 border border-green-200">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700 text-sm">Conectado com Google Business Profile API</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Suas publicações serão enviadas diretamente para a API do Google Business Profile
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <p>ID da Conta: GB-XXX...789</p>
                    <p>Perfil conectado: Seu Restaurante</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="postType">Tipo de Post</Label>
                <Select value={postType} onValueChange={setPostType}>
                  <SelectTrigger id="postType">
                    <SelectValue placeholder="Tipo de post" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="update">Atualização (Post padrão)</SelectItem>
                    <SelectItem value="event">Evento</SelectItem>
                    <SelectItem value="offer">Oferta Especial</SelectItem>
                    <SelectItem value="product">Destaque de Produto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="callToAction">Botão de Ação</Label>
                <Select value={callToAction} onValueChange={setCallToAction}>
                  <SelectTrigger id="callToAction">
                    <SelectValue placeholder="Botão de ação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ORDER_ONLINE">Pedir Online</SelectItem>
                    <SelectItem value="BOOK">Reservar</SelectItem>
                    <SelectItem value="LEARN_MORE">Saiba Mais</SelectItem>
                    <SelectItem value="CALL">Ligar</SelectItem>
                    <SelectItem value="BUY">Comprar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="postContent">Conteúdo do Post</Label>
                <Textarea 
                  id="postContent" 
                  placeholder="Conteúdo do seu post no Google Meu Negócio"
                  defaultValue={template?.content}
                  className="h-32"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Máximo: 1500 caracteres (recomendado: menos de 150)
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="includePhotos" 
                  checked={includePhotos}
                  onCheckedChange={setIncludePhotos}
                />
                <Label htmlFor="includePhotos">Incluir fotos no post</Label>
              </div>
            </div>
            
            {includePhotos && (
              <div>
                <Label className="mb-2 block">Selecione uma imagem</Label>
                <div className="grid grid-cols-2 gap-3">
                  {sampleImages.map((img, index) => (
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
                    <Image className="mr-2 h-4 w-4" /> Enviar nova imagem
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="scheduling" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="postSchedule">Programação do Post</Label>
                <Select value={postSchedule} onValueChange={setPostSchedule}>
                  <SelectTrigger id="postSchedule">
                    <SelectValue placeholder="Quando publicar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Publicar imediatamente</SelectItem>
                    <SelectItem value="schedule">Agendar publicação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {postSchedule === "schedule" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postDate">Data</Label>
                    <Input 
                      id="postDate" 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postTime">Hora</Label>
                    <Input id="postTime" type="time" />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="postDuration">Duração da Exibição em Destaque</Label>
                <Select value={postDuration} onValueChange={setPostDuration}>
                  <SelectTrigger id="postDuration">
                    <SelectValue placeholder="Duração do post" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 dias (padrão)</SelectItem>
                    <SelectItem value="14">14 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="custom">Data específica</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  Tempo que o post ficará em destaque no seu perfil do GMB
                </p>
              </div>
              
              <div>
                <Label htmlFor="specialNote">Observações adicionais</Label>
                <Textarea 
                  id="specialNote" 
                  placeholder="Instruções especiais ou informações adicionais para o post"
                  className="h-24"
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance de Posts Anteriores</CardTitle>
                <CardDescription>Dados dos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Visualizações médias:</span>
                    <span className="font-medium">1,240</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interações:</span>
                    <span className="font-medium">82</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Cliques no botão de ação:</span>
                    <span className="font-medium">43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Melhores horários:</span>
                    <span className="font-medium">Ter-Sex, 11h-14h</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                  <p>Recomendação: Posts com imagens têm 2.3x mais engajamento</p>
                </div>
              </CardContent>
            </Card>
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

export default GmbCampaignSettings;
