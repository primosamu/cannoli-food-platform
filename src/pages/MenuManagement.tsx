import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlusCircle, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  Utensils, 
  Coffee, 
  Award, 
  Tag, 
  Calendar, 
  RefreshCw, 
  FileUp, 
  Settings,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuTypeSelector } from "@/components/menu/MenuTypeSelector";
import { toast } from "sonner";

const MenuManagementPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeDayFilter, setActiveDayFilter] = useState("all");
  const [menuItems, setMenuItems] = useState([]);

  const handleImportFromPlatform = (platform: string) => {
    toast(`Preparing to import menu from ${platform}...`, {
      description: "This will connect to your account and import your menu items.",
    });
    // Implementation would connect to the platform's API
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, we would parse the Excel file
      toast(`Uploading file: ${file.name}`, {
        description: "Your menu items will be imported from this file.",
      });
    }
  };

  const handleSyncWithPlatform = (platform: string) => {
    toast(`Syncing with ${platform}...`, {
      description: "Changes will be synchronized between your local menu and the platform.",
    });
    // Implementation would handle bidirectional sync
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
          <p className="text-muted-foreground">
            Create, import, and manage your restaurant menu items across different sales channels.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Menu Item
          </Button>
        </div>
      </div>

      {/* Menu Import & Sync Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Menu Source</CardTitle>
          <CardDescription>
            Import your menu from external platforms or create it from scratch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Import from platforms */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Import from Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Import your existing menu from a connected delivery platform.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleImportFromPlatform("iFood")}>
                    <Download className="mr-2 h-4 w-4" /> Import from iFood
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleImportFromPlatform("Rappi")}>
                    <Download className="mr-2 h-4 w-4" /> Import from Rappi
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upload spreadsheet */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upload Spreadsheet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a spreadsheet (.xls, .xlsx) with your menu items.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => document.getElementById('fileUpload')?.click()}>
                    <FileUp className="mr-2 h-4 w-4" /> Upload XLS File
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet className="mr-2 h-4 w-4" /> Download Template
                  </Button>
                  <input
                    type="file"
                    id="fileUpload"
                    accept=".xls,.xlsx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sync with platforms */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sync with Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Keep your menu synchronized with connected delivery platforms.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleSyncWithPlatform("iFood")}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Sync with iFood
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleSyncWithPlatform("Rappi")}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Sync with Rappi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Menu Type & Sales Channel Settings */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Menu Settings</CardTitle>
              <CardDescription>
                Configure your menus for different sales channels and days of the week.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" /> Configure Pricing
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <MenuTypeSelector />
        </CardContent>
      </Card>

      {/* Day of Week Filter */}
      <div className="flex overflow-auto pb-2">
        <Button 
          variant={activeDayFilter === "all" ? "default" : "outline"} 
          className="mr-2"
          onClick={() => setActiveDayFilter("all")}
        >
          All Days
        </Button>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <Button 
            key={day} 
            variant={activeDayFilter === day ? "default" : "outline"} 
            className="mr-2 whitespace-nowrap"
            onClick={() => setActiveDayFilter(day)}
          >
            {day}
          </Button>
        ))}
      </div>

      {/* Menu Items Section */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            <Tag className="mr-2 h-4 w-4" /> All Items
          </TabsTrigger>
          <TabsTrigger value="food">
            <Utensils className="mr-2 h-4 w-4" /> Food
          </TabsTrigger>
          <TabsTrigger value="drinks">
            <Coffee className="mr-2 h-4 w-4" /> Drinks
          </TabsTrigger>
          <TabsTrigger value="specials">
            <Award className="mr-2 h-4 w-4" /> Specials
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Tag className="mr-2 h-4 w-4" /> Categories
          </TabsTrigger>
        </TabsList>

        {/* All Items Tab */}
        <TabsContent value="all" className="space-y-4 pt-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Example menu items - these would be dynamic in a real implementation */}
            <MenuItemCard 
              name="Margherita Pizza" 
              description="Classic pizza with tomato sauce, mozzarella, and basil" 
              category="Pizza"
              platforms={["iFood", "Rappi"]}
              prices={{
                delivery: 25.90,
                qr_table: 22.90,
                in_person: 22.90
              }}
            />
            <MenuItemCard 
              name="Pepperoni Pizza" 
              description="Pizza with tomato sauce, mozzarella, and pepperoni" 
              category="Pizza"
              platforms={["iFood"]}
              prices={{
                delivery: 28.90,
                qr_table: 25.90,
                in_person: 25.90
              }}
            />
            <MenuItemCard 
              name="Classic Cheeseburger" 
              description="Beef patty with cheese, lettuce, tomato, and special sauce" 
              category="Burgers"
              platforms={["iFood", "Rappi", "internal"]}
              prices={{
                delivery: 32.90,
                qr_table: 29.90,
                in_person: 29.90,
                self_service: 27.90
              }}
            />
            <MenuItemCard 
              name="Caesar Salad" 
              description="Romaine lettuce with croutons, parmesan, and caesar dressing" 
              category="Salads"
              platforms={["iFood", "internal"]}
              prices={{
                delivery: 22.90,
                qr_table: 19.90,
                in_person: 19.90
              }}
            />
            <MenuItemCard 
              name="Chocolate Milkshake" 
              description="Creamy chocolate milkshake with whipped cream" 
              category="Drinks"
              platforms={["iFood", "Rappi"]}
              prices={{
                delivery: 15.90,
                qr_table: 13.90,
                in_person: 13.90
              }}
            />
            <MenuItemCard 
              name="Tiramisu" 
              description="Classic Italian dessert with coffee and mascarpone" 
              category="Desserts"
              platforms={["iFood"]}
              prices={{
                delivery: 18.90,
                qr_table: 16.90,
                in_person: 16.90
              }}
            />
          </div>
        </TabsContent>

        {/* Other tabs would have similar content, filtered accordingly */}
        <TabsContent value="food" className="space-y-4 pt-4">
          <div className="text-center p-8 text-muted-foreground">
            <p>Filter set to Food items{activeDayFilter !== "all" ? ` on ${activeDayFilter}` : ""}.</p>
          </div>
        </TabsContent>
        <TabsContent value="drinks" className="space-y-4 pt-4">
          <div className="text-center p-8 text-muted-foreground">
            <p>Filter set to Drinks{activeDayFilter !== "all" ? ` on ${activeDayFilter}` : ""}.</p>
          </div>
        </TabsContent>
        <TabsContent value="specials" className="space-y-4 pt-4">
          <div className="text-center p-8 text-muted-foreground">
            <p>Filter set to Specials{activeDayFilter !== "all" ? ` on ${activeDayFilter}` : ""}.</p>
          </div>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4 pt-4">
          <div className="text-center p-8 text-muted-foreground">
            <p>Filter set to Categories{activeDayFilter !== "all" ? ` on ${activeDayFilter}` : ""}.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Menu Item Card Component
interface MenuItemCardProps {
  name: string;
  description: string;
  category: string;
  platforms: string[];
  prices: {
    delivery?: number;
    qr_table?: number;
    in_person?: number;
    self_service?: number;
  };
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ name, description, category, platforms, prices }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Item</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start pb-4">
        <div className="flex gap-1 flex-wrap mb-2">
          {platforms.map(platform => (
            <Badge key={platform} variant="outline" className="text-xs">
              {platform}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 w-full text-sm">
          {Object.entries(prices).map(([type, price]) => (
            <div key={type} className="flex justify-between">
              <span className="text-muted-foreground capitalize">{type.replace('_', ' ')}:</span>
              <span>R$ {price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuManagementPage;
