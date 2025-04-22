
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MessageSquareDashed, MailOpen } from "lucide-react";

interface ChannelSettingsProps {
  selectedChannels: string[];
  handleChannelToggle: (channelId: string) => void;
  translations: any;
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({ selectedChannels, handleChannelToggle, translations }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {/* channel icon */}
        Seleção de Canais
      </CardTitle>
      <CardDescription>
        {translations.chooseChannels || "Choose which channels to use for this campaign"}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="channel-whatsapp"
            checked={selectedChannels.includes("whatsapp")}
            onCheckedChange={() => handleChannelToggle("whatsapp")}
            className="mt-1"
          />
          <div className="grid gap-1.5">
            <Label htmlFor="channel-whatsapp" className="font-medium flex items-center">
              <MessageSquareDashed className="h-4 w-4 mr-2 text-green-600" />
              WhatsApp
            </Label>
            <p className="text-sm text-muted-foreground">
              {translations.directMessaging || "Direct messaging with 98% open rates"}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="channel-sms"
            checked={selectedChannels.includes("sms")}
            onCheckedChange={() => handleChannelToggle("sms")}
            className="mt-1"
          />
          <div className="grid gap-1.5">
            <Label htmlFor="channel-sms" className="font-medium flex items-center">
              <MessageSquareDashed className="h-4 w-4 mr-2 text-blue-600" />
              SMS
            </Label>
            <p className="text-sm text-muted-foreground">
              {translations.textMessaging || "Text messaging for important updates"}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="channel-email"
            checked={selectedChannels.includes("email")}
            onCheckedChange={() => handleChannelToggle("email")}
            className="mt-1"
          />
          <div className="grid gap-1.5">
            <Label htmlFor="channel-email" className="font-medium flex items-center">
              <MailOpen className="h-4 w-4 mr-2 text-orange-600" />
              Email
            </Label>
            <p className="text-sm text-muted-foreground">
              {translations.detailedMessaging || "Detailed messaging with images and formatting"}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
export default ChannelSettings;
