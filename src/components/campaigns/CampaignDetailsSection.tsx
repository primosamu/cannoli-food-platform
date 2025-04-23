
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CampaignDetailsSectionProps {
  campaignName: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  settings?: {
    audienceType: string;
    scheduledDate: string;
    scheduledTime: string;
  };
}

const CampaignDetailsSection: React.FC<CampaignDetailsSectionProps> = ({
  campaignName,
  handleNameChange,
  settings
}) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="name">Nome da Campanha</Label>
      <Input 
        id="name"
        placeholder="Ex: Promoção de Verão" 
        value={campaignName}
        onChange={handleNameChange}
      />
    </div>

    <div className="space-y-2">
      <Label>Audiência</Label>
      <Select value={settings?.audienceType || "all"}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o tipo de audiência" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os clientes</SelectItem>
          <SelectItem value="segment">Segmento específico</SelectItem>
          <SelectItem value="custom">Critérios personalizados</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Tamanho estimado da audiência: <span className="font-medium">235</span> clientes
      </p>
    </div>

    <div className="space-y-2">
      <Label>Agendamento</Label>
      <div className="grid grid-cols-2 gap-2">
        <Input 
          type="date" 
          value={settings?.scheduledDate || new Date().toISOString().split('T')[0]}
          readOnly
        />
        <Input 
          type="time" 
          value={settings?.scheduledTime || "12:00"}
          readOnly
        />
      </div>
    </div>
  </div>
);

export default CampaignDetailsSection;
