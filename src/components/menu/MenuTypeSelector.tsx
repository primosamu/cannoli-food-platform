
import React, { useState } from "react";
import { 
  PlusCircle, 
  Calendar, 
  Clock, 
  ShoppingBag,
  UtensilsCrossed,
  QrCode,
  Store,
  MonitorSmartphone,
  Percent,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuType } from "@/types/menu";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MenuTypeConfigProps {
  type: MenuType;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  availableOn?: string[];
  priceDifference?: string;
}

const MenuTypeConfig = ({ 
  type, 
  label, 
  description, 
  icon, 
  enabled, 
  onToggle,
  availableOn = [],
  priceDifference
}: MenuTypeConfigProps) => {
  const handlePriceRuleAdd = () => {
    toast("Add price rule", {
      description: `Add a new pricing rule for ${label} menu`,
    });
  };

  const handleScheduleAdd = () => {
    toast("Add schedule", {
      description: `Configure when this ${label} menu is available`,
    });
  };

  return (
    <Card className={`border ${enabled ? "border-primary/50 shadow-sm" : "bg-muted/30"} transition-all`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {icon}
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {label}
                {priceDifference && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant={priceDifference.includes("+") ? "destructive" : "secondary"} className="text-xs font-normal">
                        {priceDifference}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Price difference compared to in-store menu</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </CardHeader>
      
      <CardContent className={`pt-0 ${enabled ? "" : "opacity-50"}`}>
        <div className="space-y-2 text-sm">
          {availableOn.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Available on</span>
              <div className="flex gap-1 flex-wrap justify-end">
                {availableOn.map((platform) => (
                  <Badge key={platform} variant="outline" className="text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Special pricing</span>
            <span>{priceDifference ? "Yes" : "No"}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Schedule</span>
            <span>Always available</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2 flex-wrap">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePriceRuleAdd}
          disabled={!enabled}
          className="gap-1"
        >
          <Percent className="h-3.5 w-3.5" /> Price Rules
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleScheduleAdd}
          disabled={!enabled}
          className="gap-1"
        >
          <Clock className="h-3.5 w-3.5" /> Schedule
        </Button>
      </CardFooter>
    </Card>
  );
};

export const MenuTypeSelector = () => {
  const [enabledTypes, setEnabledTypes] = useState<Record<MenuType, boolean>>({
    delivery: true,
    qr_table: true,
    self_service: false,
    in_person: true
  });

  const handleToggle = (type: MenuType, enabled: boolean) => {
    setEnabledTypes((prev) => ({
      ...prev,
      [type]: enabled
    }));
    
    toast(enabled ? "Menu type enabled" : "Menu type disabled", {
      description: `${type.replace('_', ' ')} menu has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MenuTypeConfig
          type="delivery"
          label="Delivery"
          description="For delivery services and apps"
          icon={<ShoppingBag className="h-5 w-5" />}
          enabled={enabledTypes.delivery}
          onToggle={(enabled) => handleToggle("delivery", enabled)}
          availableOn={["iFood", "Rappi"]}
          priceDifference="+10%"
        />
        
        <MenuTypeConfig
          type="qr_table"
          label="QR Table"
          description="For tableside QR ordering"
          icon={<QrCode className="h-5 w-5" />}
          enabled={enabledTypes.qr_table}
          onToggle={(enabled) => handleToggle("qr_table", enabled)}
          priceDifference="Same"
        />
        
        <MenuTypeConfig
          type="self_service"
          label="Self Service"
          description="For self-service kiosks"
          icon={<MonitorSmartphone className="h-5 w-5" />}
          enabled={enabledTypes.self_service}
          onToggle={(enabled) => handleToggle("self_service", enabled)}
          priceDifference="-5%"
        />
        
        <MenuTypeConfig
          type="in_person"
          label="In-Person"
          description="For physical in-store menu"
          icon={<Store className="h-5 w-5" />}
          enabled={enabledTypes.in_person}
          onToggle={(enabled) => handleToggle("in_person", enabled)}
        />
      </div>
      
      <Separator className="my-6" />
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Seasonal & Special Menus</h3>
          <Button size="sm" variant="outline">
            <PlusCircle className="h-4 w-4 mr-2" /> Add Special Menu
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-dashed border-muted">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-muted">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-base">Weekend Menu</CardTitle>
              </div>
              <CardDescription>Active Friday to Sunday</CardDescription>
            </CardHeader>
            
            <CardFooter className="pt-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                <PlusCircle className="h-3.5 w-3.5 mr-1" /> Configure
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-dashed border-muted">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-muted">
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-base">Happy Hour</CardTitle>
              </div>
              <CardDescription>Active 4pm to 7pm daily</CardDescription>
            </CardHeader>
            
            <CardFooter className="pt-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                <PlusCircle className="h-3.5 w-3.5 mr-1" /> Configure
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center h-20">
                <PlusCircle className="h-8 w-8 text-primary/70" />
              </div>
            </CardHeader>
            
            <CardFooter className="pt-2 text-center">
              <span className="text-sm font-medium text-primary">Add Seasonal Menu</span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
