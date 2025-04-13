
import React from "react";
import { useMenu } from "./MenuProvider";
import { MenuItem, MenuType } from "@/types/menu";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Copy,
  Trash2,
  MoreHorizontal,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  activeMenuType: MenuType;
}

const StatusIndicator = ({ status }: { status: MenuItem["status"] }) => {
  const statusConfig = {
    available: {
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
      label: "Disponível",
      class: "text-green-500 bg-green-50"
    },
    out_of_stock: {
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
      label: "Fora de estoque",
      class: "text-amber-500 bg-amber-50"
    },
    coming_soon: {
      icon: <Clock className="h-4 w-4 text-blue-500" />,
      label: "Em breve",
      class: "text-blue-500 bg-blue-50"
    }
  };
  
  const config = statusConfig[status];
  
  return (
    <div className={cn("px-2 py-0.5 rounded-full text-xs flex items-center gap-1", config.class)}>
      {config.icon}
      {config.label}
    </div>
  );
};

export const MenuCard = ({ item, activeMenuType }: MenuCardProps) => {
  const { 
    updateMenuItem,
    deleteMenuItem,
    duplicateMenuItem,
    setItemModalOpen,
    setSelectedItemId,
    categories 
  } = useMenu();
  
  const handleEdit = () => {
    setSelectedItemId(item.id);
    setItemModalOpen(true);
  };
  
  const toggleActive = () => {
    updateMenuItem({
      ...item,
      active: !item.active
    });
  };
  
  const getCategoryName = () => {
    const category = categories.find(c => c.id === item.category);
    return category ? category.name : "Sem Categoria";
  };
  
  const getActivePrice = () => {
    return item.prices[activeMenuType] || 0;
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };
  
  const getPlatformLabels = () => {
    const platforms = [];
    if (item.platforms.ifood) platforms.push("iFood");
    if (item.platforms.rappi) platforms.push("Rappi");
    if (item.platforms.uber_eats) platforms.push("Uber Eats");
    if (item.platforms.anota_ai) platforms.push("Anota Aí");
    if (item.platforms.internal) platforms.push("Website");
    return platforms;
  };
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all border",
      item.active ? "" : "opacity-60 bg-muted/30",
      item.featured ? "ring-1 ring-primary" : ""
    )}>
      <div className="aspect-[4/3] overflow-hidden relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Sem imagem</p>
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex gap-1">
          {item.featured && (
            <Badge className="bg-primary">Destaque</Badge>
          )}
        </div>
        
        <div className="absolute bottom-2 left-2">
          <StatusIndicator status={item.status} />
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-medium line-clamp-1">{item.name}</h3>
            <p className="text-xs text-muted-foreground">{getCategoryName()}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatPrice(getActivePrice())}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {activeMenuType === 'in_person' ? 'Presencial' : 
               activeMenuType === 'delivery' ? 'Delivery' :
               activeMenuType === 'qr_table' ? 'QR Mesa' : 'Self-Service'}
            </p>
          </div>
        </div>
        
        <p className="mt-2 text-sm line-clamp-2 text-muted-foreground">
          {item.description}
        </p>
        
        <div className="mt-3 flex gap-1 flex-wrap">
          {getPlatformLabels().map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <Button
            size="sm"
            variant={item.active ? "outline" : "default"}
            className="text-xs"
            onClick={toggleActive}
          >
            {item.active ? "Desativar" : "Ativar"}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Ações</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => duplicateMenuItem(item.id)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => deleteMenuItem(item.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
