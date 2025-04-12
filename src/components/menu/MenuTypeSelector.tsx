
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  PlusCircle, 
  Calendar, 
  Clock, 
  ShoppingBag
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

interface MenuTypeConfigProps {
  type: MenuType;
  label: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const MenuTypeConfig = ({ type, label, description, icon, enabled, onToggle }: MenuTypeConfigProps) => {
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
    <Card className={`border ${enabled ? "border-primary/50" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle>{label}</CardTitle>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onToggle}
          />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className={enabled ? "" : "opacity-50"}>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Base pricing</span>
            <span>Same as in-store</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Availability</span>
            <span>Always available</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePriceRuleAdd}
          disabled={!enabled}
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Price Rules
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleScheduleAdd}
          disabled={!enabled}
        >
          <Calendar className="h-4 w-4 mr-1" /> Schedule
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MenuTypeConfig
          type="delivery"
          label="Delivery"
          description="For online delivery platforms"
          icon={<ShoppingBag className="h-5 w-5" />}
          enabled={enabledTypes.delivery}
          onToggle={(enabled) => handleToggle("delivery", enabled)}
        />
        
        <MenuTypeConfig
          type="qr_table"
          label="QR Table"
          description="For table QR code ordering"
          icon={<ShoppingBag className="h-5 w-5" />}
          enabled={enabledTypes.qr_table}
          onToggle={(enabled) => handleToggle("qr_table", enabled)}
        />
        
        <MenuTypeConfig
          type="self_service"
          label="Self Service"
          description="For self-service kiosks"
          icon={<ShoppingBag className="h-5 w-5" />}
          enabled={enabledTypes.self_service}
          onToggle={(enabled) => handleToggle("self_service", enabled)}
        />
        
        <MenuTypeConfig
          type="in_person"
          label="In-Person"
          description="For in-store orders"
          icon={<ShoppingBag className="h-5 w-5" />}
          enabled={enabledTypes.in_person}
          onToggle={(enabled) => handleToggle("in_person", enabled)}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div>
        <h3 className="font-medium mb-2">Advanced Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start h-auto py-2">
            <Clock className="h-4 w-4 mr-2" /> 
            <div className="flex flex-col items-start">
              <span>Day-specific Menus</span>
              <span className="text-xs text-muted-foreground">Configure different menus for specific days</span>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto py-2">
            <Calendar className="h-4 w-4 mr-2" /> 
            <div className="flex flex-col items-start">
              <span>Seasonal Menus</span>
              <span className="text-xs text-muted-foreground">Create special menus for holidays and seasons</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
