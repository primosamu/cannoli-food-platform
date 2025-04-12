import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { MenuItem, MenuCategory, MenuType, DeliveryPlatform } from "@/types/menu";
import { toast } from "sonner";
import { sampleCategories, sampleMenuItems } from "@/data/sampleMenuData";

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

  // Item management functions
  const addMenuItem = useCallback((item: Omit<MenuItem, "id">) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
    toast.success("Menu item added", {
      description: `${newItem.name} has been added to your menu.`,
    });
  }, []);

  const updateMenuItem = useCallback((updatedItem: MenuItem) => {
    setMenuItems(prev => 
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    toast.success("Menu item updated", {
      description: `${updatedItem.name} has been updated.`,
    });
  }, []);

  const deleteMenuItem = useCallback((id: string) => {
    const itemToDelete = menuItems.find(item => item.id === id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    if (itemToDelete) {
      toast.success("Menu item deleted", {
        description: `${itemToDelete.name} has been removed from your menu.`,
      });
    }
  }, [menuItems]);

  const duplicateMenuItem = useCallback((id: string) => {
    const itemToDuplicate = menuItems.find(item => item.id === id);
    if (itemToDuplicate) {
      const newItem = {
        ...itemToDuplicate,
        id: Date.now().toString(),
        name: `${itemToDuplicate.name} (Copy)`,
      };
      setMenuItems(prev => [...prev, newItem]);
      toast.success("Menu item duplicated", {
        description: `${itemToDuplicate.name} has been duplicated.`,
      });
    }
  }, [menuItems]);

  // Category management functions
  const addCategory = useCallback((category: Omit<MenuCategory, "id">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
    toast.success("Category added", {
      description: `${newCategory.name} category has been added.`,
    });
  }, []);

  const updateCategory = useCallback((updatedCategory: MenuCategory) => {
    setCategories(prev => 
      prev.map(category => category.id === updatedCategory.id ? updatedCategory : category)
    );
    toast.success("Category updated", {
      description: `${updatedCategory.name} category has been updated.`,
    });
  }, []);

  const deleteCategory = useCallback((id: string) => {
    const categoryToDelete = categories.find(category => category.id === id);
    
    // Check if there are menu items in this category
    const itemsInCategory = menuItems.filter(item => item.category === id);
    if (itemsInCategory.length > 0) {
      toast.error("Cannot delete category", {
        description: `This category contains ${itemsInCategory.length} menu items. Please move or delete these items first.`,
      });
      return;
    }
    
    setCategories(prev => prev.filter(category => category.id !== id));
    if (categoryToDelete) {
      toast.success("Category deleted", {
        description: `${categoryToDelete.name} has been removed.`,
      });
    }
  }, [categories, menuItems]);

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
    toast.info(`Importing from ${platform}`, {
      description: "Connecting to platform API. This may take a moment...",
    });
    
    // Simulating API call delay
    setTimeout(() => {
      toast.success(`Import from ${platform} completed`, {
        description: "5 new menu items and 2 categories were imported.",
      });
    }, 1500);
  }, []);

  const importFromExcel = useCallback((file: File) => {
    toast.info(`Processing file: ${file.name}`, {
      description: "Analyzing spreadsheet data...",
    });
    
    // Simulating file processing delay
    setTimeout(() => {
      toast.success("Excel import completed", {
        description: "8 menu items were imported successfully.",
      });
    }, 2000);
  }, []);

  const exportToExcel = useCallback(() => {
    toast.info("Preparing export", {
      description: "Generating Excel file with your menu data...",
    });
    
    // Simulating export delay
    setTimeout(() => {
      toast.success("Export ready", {
        description: "Your menu has been exported to Excel.",
      });
    }, 1500);
  }, []);

  const syncWithPlatform = useCallback((platform: DeliveryPlatform) => {
    toast.info(`Syncing with ${platform}`, {
      description: "Comparing local and platform menus...",
    });
    
    // Simulating sync delay
    setTimeout(() => {
      toast.success(`Sync with ${platform} completed`, {
        description: "Your menu is now synchronized with the platform.",
      });
    }, 2000);
  }, []);

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
