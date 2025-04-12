
import React from "react";
import { MenuCatalog } from "@/components/menu/MenuCatalog";
import { MenuSidePanel } from "@/components/menu/MenuSidePanel";
import { MenuHeader } from "@/components/menu/MenuHeader";
import { MenuProvider } from "@/components/menu/MenuProvider";
import { MenuImportModal } from "@/components/menu/MenuImportModal";
import { MenuExportModal } from "@/components/menu/MenuExportModal";
import { MenuItemFormModal } from "@/components/menu/MenuItemFormModal";
import { MenuCategoryFormModal } from "@/components/menu/MenuCategoryFormModal";

const MenuManagementPage = () => {
  return (
    <MenuProvider>
      <div className="flex flex-col h-full space-y-4">
        <MenuHeader />
        
        <div className="flex flex-1 gap-4 h-[calc(100vh-220px)]">
          <MenuSidePanel />
          <MenuCatalog />
        </div>
        
        <MenuImportModal />
        <MenuExportModal />
        <MenuItemFormModal />
        <MenuCategoryFormModal />
      </div>
    </MenuProvider>
  );
};

export default MenuManagementPage;
