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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MenuType, DeliveryPlatform, MenuItemStatus } from "@/types/menu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Basic form schema for demonstration
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  status: z.enum(["available", "out_of_stock", "coming_soon"]),
  active: z.boolean(),
  featured: z.boolean().optional(),
  prices: z.record(z.number().min(0)),
  platforms: z.record(z.boolean()),
});

export const MenuItemFormModal = () => {
  const {
    isItemModalOpen,
    setItemModalOpen,
    selectedItemId,
    setSelectedItemId,
    addMenuItem,
    updateMenuItem,
    menuItems,
    categories,
  } = useMenu();

  const selectedItem = selectedItemId
    ? menuItems.find(item => item.id === selectedItemId)
    : null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: selectedItem
      ? {
          name: selectedItem.name,
          description: selectedItem.description,
          category: selectedItem.category,
          status: selectedItem.status,
          active: selectedItem.active,
          featured: selectedItem.featured || false,
          prices: selectedItem.prices,
          platforms: selectedItem.platforms,
        }
      : {
          name: "",
          description: "",
          category: "",
          status: "available",
          active: true,
          featured: false,
          prices: {
            delivery: 0,
            qr_table: 0,
            self_service: 0,
            in_person: 0,
          },
          platforms: {
            ifood: false,
            rappi: false,
            uber_eats: false,
            anota_ai: false,
            internal: true,
          },
        },
  });

  const handleClose = () => {
    setItemModalOpen(false);
    setSelectedItemId(null);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (selectedItem) {
      updateMenuItem({
        ...selectedItem,
        ...values,
      });
    } else {
      addMenuItem({
        name: values.name,
        description: values.description,
        category: values.category,
        status: values.status,
        active: values.active,
        featured: values.featured || false,
        prices: values.prices,
        platforms: values.platforms,
        allergens: [],
        tags: [],
      });
    }
    handleClose();
  };

  const menuTypes: { id: MenuType; label: string }[] = [
    { id: "delivery", label: "Delivery" },
    { id: "qr_table", label: "QR Table" },
    { id: "self_service", label: "Self-Service" },
    { id: "in_person", label: "In-Person" },
  ];

  const platforms: { id: DeliveryPlatform; label: string }[] = [
    { id: "ifood", label: "iFood" },
    { id: "rappi", label: "Rappi" },
    { id: "uber_eats", label: "Uber Eats" },
    { id: "anota_ai", label: "Anota Aí" },
    { id: "internal", label: "Website/App" },
  ];

  const statusOptions: { value: MenuItemStatus; label: string }[] = [
    { value: "available", label: "Available" },
    { value: "out_of_stock", label: "Out of Stock" },
    { value: "coming_soon", label: "Coming Soon" },
  ];

  return (
    <Dialog open={isItemModalOpen} onOpenChange={setItemModalOpen}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{selectedItem ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
          <DialogDescription>
            {selectedItem
              ? "Update the details of this menu item"
              : "Create a new item for your menu"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="details">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter menu item name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the menu item" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 w-1/2">
                        <div>
                          <FormLabel>Active</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 w-1/2">
                        <div>
                          <FormLabel>Featured</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {menuTypes.map((menuType) => (
                    <FormField
                      key={menuType.id}
                      control={form.control}
                      name={`prices.${menuType.id}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{menuType.label} Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5">R$</span>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="pl-9"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <h3 className="text-sm font-medium mb-3">Available on Platforms</h3>
                  <div className="space-y-3">
                    {platforms.map((platform) => (
                      <FormField
                        key={platform.id}
                        control={form.control}
                        name={`platforms.${platform.id}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                            <div>
                              <FormLabel className="cursor-pointer">{platform.label}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedItem ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
