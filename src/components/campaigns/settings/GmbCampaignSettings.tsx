
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
  
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold">{template?.name}</h3>
        <p className="text-muted-foreground mt-1">{template?.description}</p>
        <div className="mt-2">
          <span className="inline-block rounded px-3 py-1 bg-yellow-100 text-yellow-900 text-xs font-bold">
            Google Meu Negócio
          </span>
        </div>
      </div>
      
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
            <Label htmlFor="postDuration">Duração do Post</Label>
            <Select value={postDuration} onValueChange={setPostDuration}>
              <SelectTrigger id="postDuration">
                <SelectValue placeholder="Duração do post" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="14">14 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Tempo que o post ficará em destaque no seu perfil do Google Meu Negócio
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="includePhotos" 
              checked={includePhotos}
              onCheckedChange={setIncludePhotos}
            />
            <Label htmlFor="includePhotos">Incluir fotos do estabelecimento</Label>
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
      </div>
      
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
