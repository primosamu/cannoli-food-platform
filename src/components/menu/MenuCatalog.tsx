
import React from "react";
import { useMenu } from "./MenuProvider";
import { MenuCard } from "./MenuCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DeliveryPlatform } from "@/types/menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingBasket,
  Filter,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const MenuCatalog = () => {
  const { 
    categories, 
    menuItems, 
    selectedCategory,
    searchQuery,
    activeMenuType,
    activePlatformFilter,
    setActivePlatformFilter,
    setItemModalOpen
  } = useMenu();

  const { translations } = useLanguage();
  
  // Filter logic
  const filteredItems = menuItems.filter(item => {
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Platform filter
    if (activePlatformFilter !== 'all' && !item.platforms[activePlatformFilter]) {
      return false;
    }
    
    return true;
  });
  
  const platforms: {id: DeliveryPlatform; name: string}[] = [
    { id: "ifood", name: "iFood" },
    { id: "rappi", name: "Rappi" },
    { id: "uber_eats", name: "Uber Eats" },
    { id: "anota_ai", name: "Anota Aí" },
    { id: "internal", name: "Website/App" },
  ];
  
  const getCurrentCategoryName = () => {
    if (selectedCategory === 'all') return translations.allItems;
    const category = categories.find(c => c.id === selectedCategory);
    return category ? category.name : "Categoria Desconhecida";
  };
  
  return (
    <div className="flex-1 flex flex-col border rounded-lg overflow-hidden bg-card">
      <div className="p-3 border-b bg-muted/40 flex justify-between items-center">
        <h3 className="font-medium flex items-center gap-2">
          {getCurrentCategoryName()}
          <span className="text-muted-foreground text-sm font-normal">
            ({filteredItems.length} itens)
          </span>
        </h3>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Filtrar</span>
                {activePlatformFilter !== 'all' && (
                  <span className="ml-1 h-2 w-2 rounded-full bg-primary"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Plataforma</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActivePlatformFilter('all')}>
                Todas as Plataformas
                {activePlatformFilter === 'all' && (
                  <span className="ml-auto">✓</span>
                )}
              </DropdownMenuItem>
              {platforms.map(platform => (
                <DropdownMenuItem 
                  key={platform.id}
                  onClick={() => setActivePlatformFilter(platform.id)}
                >
                  {platform.name}
                  {activePlatformFilter === platform.id && (
                    <span className="ml-auto">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {filteredItems.length > 0 ? (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map(item => (
              <MenuCard 
                key={item.id} 
                item={item} 
                activeMenuType={activeMenuType}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-8 text-center">
            <div className="max-w-md space-y-2">
              <ShoppingBasket className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold">Nenhum item encontrado</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `Nenhum resultado para "${searchQuery}". Tente uma busca diferente.` 
                  : selectedCategory !== 'all'
                    ? "Esta categoria não possui itens ainda. Adicione seu primeiro item!"
                    : "Seu cardápio está vazio. Adicione seu primeiro item para começar."}
              </p>
              <Button 
                onClick={() => setItemModalOpen(true)}
                className="mt-4"
              >
                Adicionar Item ao Cardápio
              </Button>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
