
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DeliveryPlatform } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { Link2, RefreshCw, Check, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface PlatformCardProps {
  platform: {
    id: DeliveryPlatform;
    name: string; 
    connected: boolean;
    logo: string;
  };
  onToggleConnect: (platformId: DeliveryPlatform, connected: boolean) => void;
  onSyncMenu: (platformId: DeliveryPlatform) => void;
}

const PlatformCard = ({ platform, onToggleConnect, onSyncMenu }: PlatformCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleConnect = () => {
    if (platform.connected) {
      // If already connected, just toggle the status
      onToggleConnect(platform.id, false);
      toast({
        title: "Platform Disconnected",
        description: `${platform.name} has been disconnected.`
      });
    } else {
      // If not connected, open dialog
      setIsDialogOpen(true);
    }
  };

  const handleSubmitConnection = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please provide a valid API key",
        variant: "destructive",
      });
      return;
    }

    onToggleConnect(platform.id, true);
    setIsDialogOpen(false);
    setApiKey("");
    
    toast({
      title: "Success",
      description: `${platform.name} has been connected successfully!`,
    });
  };

  const handleSyncMenu = () => {
    onSyncMenu(platform.id);
    
    toast({
      title: "Menu Synced",
      description: `Your menu has been synchronized with ${platform.name}.`
    });
  };

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
            <Button size="sm" variant="outline" onClick={handleSyncMenu}>
              <RefreshCw className="mr-2 h-4 w-4" /> Sync Menu
            </Button>
            <Switch checked={platform.connected} onCheckedChange={() => handleConnect()} />
          </>
        ) : (
          <Button size="sm" onClick={handleConnect}>
            <Link2 className="mr-2 h-4 w-4" /> Connect
          </Button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to {platform.name}</DialogTitle>
            <DialogDescription>
              Enter your API key to connect with {platform.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span>Your API key is stored securely and never shared.</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitConnection}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export const DeliveryPlatformIntegration = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState([
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
  ]);

  const handleToggleConnect = (platformId: DeliveryPlatform, connected: boolean) => {
    setPlatforms(platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, connected } 
        : platform
    ));
  };

  const handleSyncMenu = (platformId: DeliveryPlatform) => {
    const platform = platforms.find(p => p.id === platformId);
    if (platform) {
      toast({
        title: "Syncing Menu",
        description: `Your menu is being synchronized with ${platform.name}.`,
      });
      
      // In a real app, this would trigger an API call
      setTimeout(() => {
        toast({
          title: "Menu Synced",
          description: `Your menu has been synchronized with ${platform.name}.`,
        });
      }, 1500);
    }
  };

  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <PlatformCard 
          key={platform.id} 
          platform={platform} 
          onToggleConnect={handleToggleConnect}
          onSyncMenu={handleSyncMenu}
        />
      ))}
    </div>
  );
};
