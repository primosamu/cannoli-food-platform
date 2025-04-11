
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MenuType } from "@/types/menu";

interface MenuTypeOptionProps {
  type: MenuType;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: (type: MenuType, enabled: boolean) => void;
}

const MenuTypeOption = ({ type, label, description, enabled, onToggle }: MenuTypeOptionProps) => {
  return (
    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
      <div className="space-y-0.5">
        <Label htmlFor={`switch-${type}`}>{label}</Label>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <Switch
        id={`switch-${type}`}
        checked={enabled}
        onCheckedChange={(checked) => onToggle(type, checked)}
      />
    </div>
  );
};

export const MenuTypeSwitcher = () => {
  const [enabledTypes, setEnabledTypes] = React.useState<Record<MenuType, boolean>>({
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
  };

  const menuTypes = [
    {
      type: "delivery" as MenuType,
      label: "Delivery",
      description: "Menu for online delivery platforms"
    },
    {
      type: "qr_table" as MenuType,
      label: "QR Table",
      description: "Digital menu accessible via QR code at tables"
    },
    {
      type: "self_service" as MenuType,
      label: "Self-Service Kiosk",
      description: "Menu for self-service ordering kiosks"
    },
    {
      type: "in_person" as MenuType,
      label: "In-Person",
      description: "Physical menu for in-restaurant dining"
    }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {menuTypes.map((menuType) => (
        <MenuTypeOption
          key={menuType.type}
          type={menuType.type}
          label={menuType.label}
          description={menuType.description}
          enabled={enabledTypes[menuType.type]}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
