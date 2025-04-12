
import React, { useRef } from "react";
import { useMenu } from "./MenuProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeliveryPlatform } from "@/types/menu";
import { 
  Download, 
  FileSpreadsheet, 
  Upload,
  AlertCircle
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const platformConfig = [
  { 
    id: "ifood" as DeliveryPlatform, 
    name: "iFood", 
    logo: "https://logopng.com.br/logos/ifood-43.svg", 
    description: "Import your menu from iFood's catalog" 
  },
  { 
    id: "rappi" as DeliveryPlatform, 
    name: "Rappi", 
    logo: "https://logodownload.org/wp-content/uploads/2019/11/rappi-logo-1.png",
    description: "Import your menu from Rappi's catalog" 
  },
  { 
    id: "uber_eats" as DeliveryPlatform, 
    name: "Uber Eats", 
    logo: "https://logodownload.org/wp-content/uploads/2019/08/uber-eats-logo-4.png",
    description: "Import your menu from Uber Eats catalog" 
  },
  { 
    id: "anota_ai" as DeliveryPlatform, 
    name: "Anota Aí", 
    logo: "https://play-lh.googleusercontent.com/quOQocvIbJE6u4PzBOqIQ-d8yLrpJNKEZRUE1s2mzD7p4VCJdO9Rlj-DWf0X8Z_zNw",
    description: "Import your menu from Anota Aí catalog" 
  }
];

export const MenuImportModal = () => {
  const { 
    isImportModalOpen, 
    setImportModalOpen,
    importFromPlatform,
    importFromExcel
  } = useMenu();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importFromExcel(file);
      setImportModalOpen(false);
    }
  };
  
  return (
    <Dialog open={isImportModalOpen} onOpenChange={setImportModalOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import Menu</DialogTitle>
          <DialogDescription>
            Choose how you want to import your menu items
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="platform">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="platform" className="flex gap-2">
              <Download className="h-4 w-4" />
              <span>From Platform</span>
            </TabsTrigger>
            <TabsTrigger value="excel" className="flex gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span>From Excel</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="platform" className="mt-4">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Connect your delivery platforms</AlertTitle>
              <AlertDescription>
                Import your existing menu from a delivery platform. You need to have an active account and be connected to the platform.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platformConfig.map((platform) => (
                <Button
                  key={platform.id}
                  variant="outline"
                  className="h-auto flex items-center justify-start gap-3 p-3"
                  onClick={() => {
                    importFromPlatform(platform.id);
                    setImportModalOpen(false);
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
          
          <TabsContent value="excel" className="mt-4">
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Use our Excel template</AlertTitle>
              <AlertDescription>
                Download our template file, fill in your menu data, and upload it back. Make sure to follow the format.
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col space-y-4">
              <Button
                variant="outline"
                className="justify-start"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Excel Template
              </Button>
              
              <Separator />
              
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 bg-muted/30">
                <Upload className="h-8 w-8 text-muted-foreground mb-3" />
                <p className="mb-1 font-medium">Drop your file here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">Supports .xls, .xlsx files</p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Excel File
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".xls,.xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={() => setImportModalOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
