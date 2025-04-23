
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Mail } from "lucide-react";
import { CampaignType } from "@/types/campaign";

interface CampaignChannelsSectionProps {
  selectedChannels: CampaignType[];
  handleChannelToggle: (channelId: string) => void;
  campaignType: CampaignType;
  handleTypeChange: (type: string) => void;
}

const CampaignChannelsSection: React.FC<CampaignChannelsSectionProps> = ({
  selectedChannels,
  handleChannelToggle,
  campaignType,
  handleTypeChange
}) => (
  <div className="space-y-2">
    <label className="block font-medium">Canais de Envio</label>
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={selectedChannels.includes("whatsapp") ? "default" : "outline"}
        size="sm"
        onClick={() => handleChannelToggle("whatsapp")}
        className="flex items-center gap-2"
      >
        <MessageSquare className="h-4 w-4 text-green-600" />
        WhatsApp
      </Button>
      <Button 
        variant={selectedChannels.includes("sms") ? "default" : "outline"}
        size="sm"
        onClick={() => handleChannelToggle("sms")}
        className="flex items-center gap-2"
      >
        <MessageSquare className="h-4 w-4 text-blue-600" />
        SMS
      </Button>
      <Button 
        variant={selectedChannels.includes("email") ? "default" : "outline"}
        size="sm"
        onClick={() => handleChannelToggle("email")}
        className="flex items-center gap-2"
      >
        <Mail className="h-4 w-4 text-orange-600" />
        Email
      </Button>
    </div>
    {selectedChannels.length > 1 && (
      <div className="space-y-2">
        <label className="block font-medium">Canal Principal</label>
        <Select 
          value={campaignType} 
          onValueChange={handleTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o canal principal" />
          </SelectTrigger>
          <SelectContent>
            {selectedChannels.includes("email") && (
              <SelectItem value="email">Email</SelectItem>
            )}
            {selectedChannels.includes("sms") && (
              <SelectItem value="sms">SMS</SelectItem>
            )}
            {selectedChannels.includes("whatsapp") && (
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            )}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          O canal principal determina o formato de edição e pré-visualização
        </p>
      </div>
    )}
  </div>
);

export default CampaignChannelsSection;
