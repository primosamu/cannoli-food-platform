
import React from "react";
import { useMenu } from "./MenuProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileDown,
  FileSpreadsheet,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeliveryPlatform } from "@/types/menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const platformConfig = [
  { 
    id: "ifood" as DeliveryPlatform, 
    name: "iFood", 
    logo: "https://logopng.com.br/logos/ifood-43.svg", 
    description: "Sync your menu with iFood's catalog" 
  },
  { 
    id: "rappi" as DeliveryPlatform, 
    name: "Rappi", 
    logo: "https://logodownload.org/wp-content/uploads/2019/11/rappi-logo-1.png",
    description: "Sync your menu with Rappi's catalog" 
  },
  { 
    id: "uber_eats" as DeliveryPlatform, 
    name: "Uber Eats", 
    logo: "https://logodownload.org/wp-content/uploads/2019/08/uber-eats-logo-4.png",
    description: "Sync your menu with Uber Eats catalog" 
  },
  { 
    id: "anota_ai" as DeliveryPlatform, 
    name: "Anota Aí", 
    logo: "https://play-lh.googleusercontent.com/quOQocvIbJE6u4PzBOqIQ-d8yLrpJNKEZRUE1s2mzD7p4VCJdO9Rlj-DWf0X8Z_zNw",
    description: "Sync your menu with Anota Aí catalog" 
  }
];

export const MenuExportModal = () => {
  const { 
    isExportModalOpen, 
    setExportModalOpen,
    exportToExcel,
    syncWithPlatform
  } = useMenu();
  
  return (
    <Dialog open={isExportModalOpen} onOpenChange={setExportModalOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Export & Sync Menu</DialogTitle>
          <DialogDescription>
            Export your menu to Excel or sync it with delivery platforms
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="export">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export" className="flex gap-2">
              <FileDown className="h-4 w-4" />
              <span>Export to Excel</span>
            </TabsTrigger>
            <TabsTrigger value="sync" className="flex gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Sync with Platforms</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="export" className="mt-4">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Export your menu</AlertTitle>
              <AlertDescription>
                Download your entire menu as an Excel file. This includes all items, categories, prices, and availability settings.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {
                  exportToExcel();
                  setExportModalOpen(false);
                }}
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Export Full Menu
              </Button>
              
              <Separator />
              
              <h3 className="text-sm font-medium">Export Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start w-full">
                  Export Menu Items Only
                </Button>
                <Button variant="outline" className="justify-start w-full">
                  Export Categories Only
                </Button>
                <Button variant="outline" className="justify-start w-full">
                  Export Active Items Only
                </Button>
                <Button variant="outline" className="justify-start w-full">
                  Export with Images (ZIP)
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sync" className="mt-4">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Sync with delivery platforms</AlertTitle>
              <AlertDescription>
                Push your menu changes to delivery platforms or pull their latest versions. This keeps everything in sync.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformConfig.map((platform) => (
                <Button
                  key={platform.id}
                  variant="outline"
                  className="h-auto flex items-center justify-start gap-3 p-3"
                  onClick={() => {
                    syncWithPlatform(platform.id);
                    setExportModalOpen(false);
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-muted rounded">
                    <img src={platform.logo} alt={platform.name} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">{platform.name}</h4>
                    <p className="text-xs text-muted-foreground">{platform.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={() => setExportModalOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
