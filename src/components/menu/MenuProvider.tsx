import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { MenuItem, MenuCategory, MenuType, DeliveryPlatform } from "@/types/menu";
import { toast } from "sonner";
import { sampleCategories, sampleMenuItems } from "@/data/sampleMenuData";
import { useLanguage } from "@/contexts/LanguageContext";

interface MenuContextType {
  // Menu data
  categories: MenuCategory[];
  menuItems: MenuItem[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Menu type/filter control
  activeMenuType: MenuType;
  setActiveMenuType: (type: MenuType) => void;
  activePlatformFilter: DeliveryPlatform | 'all';
  setActivePlatformFilter: (platform: DeliveryPlatform | 'all') => void;
  
  // Item management
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  duplicateMenuItem: (id: string) => void;
  
  // Category management
  addCategory: (category: Omit<MenuCategory, "id">) => void;
  updateCategory: (category: MenuCategory) => void;
  deleteCategory: (id: string) => void;
  reorderCategory: (id: string, newOrder: number) => void;
  
  // Modal controls
  isImportModalOpen: boolean;
  setImportModalOpen: (isOpen: boolean) => void;
  isExportModalOpen: boolean;
  setExportModalOpen: (isOpen: boolean) => void;
  isItemModalOpen: boolean;
  setItemModalOpen: (isOpen: boolean) => void;
  isCategoryModalOpen: boolean;
  setCategoryModalOpen: (isOpen: boolean) => void;
  selectedItemId: string | null;
  setSelectedItemId: (id: string | null) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  
  // Import/Export
  importFromPlatform: (platform: DeliveryPlatform) => void;
  importFromExcel: (file: File) => void;
  exportToExcel: () => void;
  syncWithPlatform: (platform: DeliveryPlatform) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { translations, language } = useLanguage();
  // Menu data state
  const [categories, setCategories] = useState<MenuCategory[]>(sampleCategories);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenuItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Menu type/filter control
  const [activeMenuType, setActiveMenuType] = useState<MenuType>('in_person');
  const [activePlatformFilter, setActivePlatformFilter] = useState<DeliveryPlatform | 'all'>('all');
  
  // Modal controls
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [isExportModalOpen, setExportModalOpen] = useState(false);
  const [isItemModalOpen, setItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Translate toast messages based on current language
  const getToastMessages = useCallback(() => {
    if (language === 'pt') {
      return {
        itemAdded: "Item adicionado",
        itemAddedDesc: (name: string) => `${name} foi adicionado ao seu cardápio.`,
        itemUpdated: "Item atualizado",
        itemUpdatedDesc: (name: string) => `${name} foi atualizado.`,
        itemDeleted: "Item removido",
        itemDeletedDesc: (name: string) => `${name} foi removido do seu cardápio.`,
        itemDuplicated: "Item duplicado",
        itemDuplicatedDesc: (name: string) => `${name} foi duplicado.`,
        categoryAdded: "Categoria adicionada",
        categoryAddedDesc: (name: string) => `A categoria ${name} foi adicionada.`,
        categoryUpdated: "Categoria atualizada",
        categoryUpdatedDesc: (name: string) => `A categoria ${name} foi atualizada.`,
        categoryDeleted: "Categoria removida",
        categoryDeletedDesc: (name: string) => `${name} foi removida.`,
        cannotDeleteCategory: "Não é possível excluir a categoria",
        cannotDeleteCategoryDesc: (count: number) => `Esta categoria contém ${count} itens de menu. Por favor, mova ou exclua esses itens primeiro.`,
        importingFrom: (platform: string) => `Importando de ${platform}`,
        importingFromDesc: "Conectando à API da plataforma. Isso pode levar algum tempo...",
        importCompleted: (platform: string) => `Importação de ${platform} concluída`,
        importCompletedDesc: "5 novos itens de menu e 2 categorias foram importados.",
        processingFile: (name: string) => `Processando arquivo: ${name}`,
        processingFileDesc: "Analisando dados da planilha...",
        excelImportCompleted: "Importação do Excel concluída",
        excelImportCompletedDesc: "8 itens de menu foram importados com sucesso.",
        preparingExport: "Preparando exportação",
        preparingExportDesc: "Gerando arquivo Excel com os dados do seu menu...",
        exportReady: "Exportação pronta",
        exportReadyDesc: "Seu menu foi exportado para Excel.",
        syncingWith: (platform: string) => `Sincronizando com ${platform}`,
        syncingWithDesc: "Comparando menus locais e da plataforma...",
        syncCompleted: (platform: string) => `Sincronização com ${platform} concluída`,
        syncCompletedDesc: "Seu menu agora está sincronizado com a plataforma."
      };
    } else {
      // Default English messages
      return {
        itemAdded: "Menu item added",
        itemAddedDesc: (name: string) => `${name} has been added to your menu.`,
        itemUpdated: "Menu item updated",
        itemUpdatedDesc: (name: string) => `${name} has been updated.`,
        itemDeleted: "Menu item deleted",
        itemDeletedDesc: (name: string) => `${name} has been removed from your menu.`,
        itemDuplicated: "Menu item duplicated",
        itemDuplicatedDesc: (name: string) => `${name} has been duplicated.`,
        categoryAdded: "Category added",
        categoryAddedDesc: (name: string) => `${name} category has been added.`,
        categoryUpdated: "Category updated",
        categoryUpdatedDesc: (name: string) => `${name} category has been updated.`,
        categoryDeleted: "Category deleted",
        categoryDeletedDesc: (name: string) => `${name} has been removed.`,
        cannotDeleteCategory: "Cannot delete category",
        cannotDeleteCategoryDesc: (count: number) => `This category contains ${count} menu items. Please move or delete these items first.`,
        importingFrom: (platform: string) => `Importing from ${platform}`,
        importingFromDesc: "Connecting to platform API. This may take a moment...",
        importCompleted: (platform: string) => `Import from ${platform} completed`,
        importCompletedDesc: "5 new menu items and 2 categories were imported.",
        processingFile: (name: string) => `Processing file: ${name}`,
        processingFileDesc: "Analyzing spreadsheet data...",
        excelImportCompleted: "Excel import completed",
        excelImportCompletedDesc: "8 menu items were imported successfully.",
        preparingExport: "Preparing export",
        preparingExportDesc: "Generating Excel file with your menu data...",
        exportReady: "Export ready",
        exportReadyDesc: "Your menu has been exported to Excel.",
        syncingWith: (platform: string) => `Syncing with ${platform}`,
        syncingWithDesc: "Comparing local and platform menus...",
        syncCompleted: (platform: string) => `Sync with ${platform} completed`,
        syncCompletedDesc: "Your menu is now synchronized with the platform."
      };
    }
  }, [language]);

  const toastMessages = getToastMessages();

  // Item management functions
  const addMenuItem = useCallback((item: Omit<MenuItem, "id">) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
    toast.success(toastMessages.itemAdded, {
      description: toastMessages.itemAddedDesc(newItem.name),
    });
  }, [toastMessages]);

  const updateMenuItem = useCallback((updatedItem: MenuItem) => {
    setMenuItems(prev => 
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    toast.success(toastMessages.itemUpdated, {
      description: toastMessages.itemUpdatedDesc(updatedItem.name),
    });
  }, [toastMessages]);

  const deleteMenuItem = useCallback((id: string) => {
    const itemToDelete = menuItems.find(item => item.id === id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    if (itemToDelete) {
      toast.success(toastMessages.itemDeleted, {
        description: toastMessages.itemDeletedDesc(itemToDelete.name),
      });
    }
  }, [menuItems, toastMessages]);

  const duplicateMenuItem = useCallback((id: string) => {
    const itemToDuplicate = menuItems.find(item => item.id === id);
    if (itemToDuplicate) {
      const newItem = {
        ...itemToDuplicate,
        id: Date.now().toString(),
        name: language === 'pt' 
          ? `${itemToDuplicate.name} (Cópia)`
          : language === 'es'
          ? `${itemToDuplicate.name} (Copia)`
          : `${itemToDuplicate.name} (Copy)`,
      };
      setMenuItems(prev => [...prev, newItem]);
      toast.success(toastMessages.itemDuplicated, {
        description: toastMessages.itemDuplicatedDesc(itemToDuplicate.name),
      });
    }
  }, [menuItems, toastMessages, language]);

  // Category management functions
  const addCategory = useCallback((category: Omit<MenuCategory, "id">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
    toast.success(toastMessages.categoryAdded, {
      description: toastMessages.categoryAddedDesc(newCategory.name),
    });
  }, [toastMessages]);

  const updateCategory = useCallback((updatedCategory: MenuCategory) => {
    setCategories(prev => 
      prev.map(category => category.id === updatedCategory.id ? updatedCategory : category)
    );
    toast.success(toastMessages.categoryUpdated, {
      description: toastMessages.categoryUpdatedDesc(updatedCategory.name),
    });
  }, [toastMessages]);

  const deleteCategory = useCallback((id: string) => {
    const categoryToDelete = categories.find(category => category.id === id);
    
    // Check if there are menu items in this category
    const itemsInCategory = menuItems.filter(item => item.category === id);
    if (itemsInCategory.length > 0) {
      toast.error(toastMessages.cannotDeleteCategory, {
        description: toastMessages.cannotDeleteCategoryDesc(itemsInCategory.length),
      });
      return;
    }
    
    setCategories(prev => prev.filter(category => category.id !== id));
    if (categoryToDelete) {
      toast.success(toastMessages.categoryDeleted, {
        description: toastMessages.categoryDeletedDesc(categoryToDelete.name),
      });
    }
  }, [categories, menuItems, toastMessages]);

  const reorderCategory = useCallback((id: string, newOrder: number) => {
    setCategories(prev => {
      const updated = [...prev];
      const categoryIndex = updated.findIndex(c => c.id === id);
      if (categoryIndex !== -1) {
        const [movedCategory] = updated.splice(categoryIndex, 1);
        movedCategory.order = newOrder;
        
        // Update order of affected categories
        updated.forEach(c => {
          if (c.order >= newOrder) {
            c.order++;
          }
        });
        
        updated.splice(newOrder - 1, 0, movedCategory);
        
        // Normalize order numbers
        updated.sort((a, b) => a.order - b.order);
        updated.forEach((c, i) => {
          c.order = i + 1;
        });
      }
      return updated;
    });
  }, []);

  // Import/Export functions
  const importFromPlatform = useCallback((platform: DeliveryPlatform) => {
    toast.info(toastMessages.importingFrom(platform), {
      description: toastMessages.importingFromDesc,
    });
    
    // Simulating API call delay
    setTimeout(() => {
      toast.success(toastMessages.importCompleted(platform), {
        description: toastMessages.importCompletedDesc,
      });
    }, 1500);
  }, [toastMessages]);

  const importFromExcel = useCallback((file: File) => {
    toast.info(toastMessages.processingFile(file.name), {
      description: toastMessages.processingFileDesc,
    });
    
    // Simulating file processing delay
    setTimeout(() => {
      toast.success(toastMessages.excelImportCompleted, {
        description: toastMessages.excelImportCompletedDesc,
      });
    }, 2000);
  }, [toastMessages]);

  const exportToExcel = useCallback(() => {
    toast.info(toastMessages.preparingExport, {
      description: toastMessages.preparingExportDesc,
    });
    
    // Simulating export delay
    setTimeout(() => {
      toast.success(toastMessages.exportReady, {
        description: toastMessages.exportReadyDesc,
      });
    }, 1500);
  }, [toastMessages]);

  const syncWithPlatform = useCallback((platform: DeliveryPlatform) => {
    toast.info(toastMessages.syncingWith(platform), {
      description: toastMessages.syncingWithDesc,
    });
    
    // Simulating sync delay
    setTimeout(() => {
      toast.success(toastMessages.syncCompleted(platform), {
        description: toastMessages.syncCompletedDesc,
      });
    }, 2000);
  }, [toastMessages]);

  // Listen for language changes and update category and menu item translations
  useEffect(() => {
    // Listen for language change events to update translations in the menu data
    const handleLanguageEvent = () => {
      console.log("Updating menu translations for language:", language);
    };
    
    document.addEventListener('language-changed', handleLanguageEvent);
    
    return () => {
      document.removeEventListener('language-changed', handleLanguageEvent);
    };
  }, [language]);

  const value = {
    categories,
    menuItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeMenuType,
    setActiveMenuType,
    activePlatformFilter,
    setActivePlatformFilter,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    duplicateMenuItem,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategory,
    isImportModalOpen,
    setImportModalOpen,
    isExportModalOpen,
    setExportModalOpen,
    isItemModalOpen,
    setItemModalOpen,
    isCategoryModalOpen,
    setCategoryModalOpen,
    selectedItemId,
    setSelectedItemId,
    selectedCategoryId,
    setSelectedCategoryId,
    importFromPlatform,
    importFromExcel,
    exportToExcel,
    syncWithPlatform
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
