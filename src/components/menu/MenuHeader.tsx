
import React from "react";
import { useMenu } from "./MenuProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  FileDown,
  FileUp,
  RefreshCw,
  Search,
  QrCode,
  Store,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { MenuType } from "@/types/menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const MenuTypeButton = ({ 
  type, 
  label, 
  icon, 
  active, 
  onClick 
}: { 
  type: MenuType; 
  label: string; 
  icon: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={active ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={onClick}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label} menu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const MenuHeader = () => {
  const { 
    setItemModalOpen,
    setCategoryModalOpen, 
    setImportModalOpen, 
    setExportModalOpen,
    searchQuery,
    setSearchQuery,
    activeMenuType,
    setActiveMenuType
  } = useMenu();

  const { translations } = useLanguage();
  
  const menuTypes = [
    { type: "in_person" as MenuType, label: translations.inStore, icon: <Store size={18} /> },
    { type: "delivery" as MenuType, label: "Delivery", icon: <Truck size={18} /> },
    { type: "qr_table" as MenuType, label: "QR Mesa", icon: <QrCode size={18} /> },
    { type: "self_service" as MenuType, label: "Self-Service", icon: <UtensilsCrossed size={18} /> }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{translations.menuManagement}</h1>
          <p className="text-sm text-muted-foreground">
            {translations.createAndManageMenu}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setCategoryModalOpen(true)}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <PlusCircle size={16} />
            <span>{translations.category}</span>
          </Button>
          
          <Button
            onClick={() => setItemModalOpen(true)}
            size="sm"
            className="gap-1"
          >
            <PlusCircle size={16} />
            <span>{translations.menuItems}</span>
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          {menuTypes.map(menuType => (
            <MenuTypeButton
              key={menuType.type}
              type={menuType.type}
              label={menuType.label}
              icon={menuType.icon}
              active={activeMenuType === menuType.type}
              onClick={() => setActiveMenuType(menuType.type)}
            />
          ))}
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cardápio..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select onValueChange={(value) => console.log(value)}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Ações" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="import" onSelect={() => setImportModalOpen(true)}>
                <div className="flex items-center gap-2">
                  <FileUp size={16} />
                  <span>Importar Cardápio</span>
                </div>
              </SelectItem>
              <SelectItem value="export" onSelect={() => setExportModalOpen(true)}>
                <div className="flex items-center gap-2">
                  <FileDown size={16} />
                  <span>Exportar Cardápio</span>
                </div>
              </SelectItem>
              <SelectItem value="sync">
                <div className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  <span>Sincronizar com Plataformas</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
