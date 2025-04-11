
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ListChecks, Utensils, Clipboard, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DeliveryPlatformIntegration } from "@/components/menu/DeliveryPlatformIntegration";
import { MenuTypeSwitcher } from "@/components/menu/MenuTypeSwitcher";

const MenuManagementPage = () => {
  const [activeTab, setActiveTab] = useState("food");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
          <p className="text-muted-foreground">
            Create and manage your restaurant menu items and categories.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Menu Item
        </Button>
      </div>

      {/* Delivery Platform Integration Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Delivery Platform Integrations</CardTitle>
          <CardDescription>
            Connect with delivery platforms to sync your menus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeliveryPlatformIntegration />
        </CardContent>
      </Card>

      {/* Menu Type Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Menu Types</CardTitle>
          <CardDescription>
            Configure different menu types with specific pricing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MenuTypeSwitcher />
        </CardContent>
      </Card>

      <Tabs defaultValue="food" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="food">
            <Utensils className="mr-2 h-4 w-4" /> Food Items
          </TabsTrigger>
          <TabsTrigger value="drinks">
            <ListChecks className="mr-2 h-4 w-4" /> Drinks
          </TabsTrigger>
          <TabsTrigger value="specials">
            <Clipboard className="mr-2 h-4 w-4" /> Specials
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Layers className="mr-2 h-4 w-4" /> Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="food" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Food Menu Items</CardTitle>
              <CardDescription>
                Manage your restaurant's food menu items here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                <p>No food items have been created yet.</p>
                <p className="mt-2">Click "Add Menu Item" to create your first food item.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="drinks" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Drinks Menu</CardTitle>
              <CardDescription>
                Manage your restaurant's beverages menu here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                <p>No drink items have been created yet.</p>
                <p className="mt-2">Click "Add Menu Item" to create your first drink item.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specials" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Special Menu Items</CardTitle>
              <CardDescription>
                Manage your restaurant's daily specials and limited-time offers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                <p>No specials have been created yet.</p>
                <p className="mt-2">Click "Add Menu Item" to create your first special.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Categories</CardTitle>
              <CardDescription>
                Organize your menu with categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                <p>No categories have been created yet.</p>
                <p className="mt-2">Click "Add Menu Item" to create your first category.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagementPage;
