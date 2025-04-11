
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const MenuManagementPage = () => {
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

      <Tabs defaultValue="food">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="food">Food Items</TabsTrigger>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
          <TabsTrigger value="specials">Specials</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
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
