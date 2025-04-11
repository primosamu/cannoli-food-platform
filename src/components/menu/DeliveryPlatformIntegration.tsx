
import React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DeliveryPlatform } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Link2, RefreshCw } from "lucide-react";

interface PlatformCardProps {
  platform: {
    id: DeliveryPlatform;
    name: string; 
    connected: boolean;
    logo: string;
  };
}

const PlatformCard = ({ platform }: PlatformCardProps) => {
  return (
    <Card className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded">
          <img src={platform.logo} alt={platform.name} className="w-6 h-6" />
        </div>
        <div>
          <div className="font-medium">{platform.name}</div>
          <div className="text-sm text-muted-foreground">
            {platform.connected ? "Connected" : "Not connected"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {platform.connected ? (
          <>
            <Badge>Connected</Badge>
            <Button size="sm" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Sync Menu
            </Button>
            <Switch checked={platform.connected} />
          </>
        ) : (
          <Button size="sm">
            <Link2 className="mr-2 h-4 w-4" /> Connect
          </Button>
        )}
      </div>
    </Card>
  );
};

export const DeliveryPlatformIntegration = () => {
  const platforms = [
    { 
      id: "ifood" as DeliveryPlatform, 
      name: "iFood", 
      connected: false, 
      logo: "/placeholder.svg" 
    },
    { 
      id: "rappi" as DeliveryPlatform, 
      name: "Rappi", 
      connected: true, 
      logo: "/placeholder.svg" 
    },
    { 
      id: "anota_ai" as DeliveryPlatform, 
      name: "Anota Aí", 
      connected: false, 
      logo: "/placeholder.svg" 
    }
  ];

  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
  );
};
