
import React, { useState } from "react";
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
import { Image, ImagePlus, Wand2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

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
  imageUrl: z.string().optional(),
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

  const { translations } = useLanguage();
  
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

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
          imageUrl: selectedItem.imageUrl || "",
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
          imageUrl: "",
        },
  });

  const handleClose = () => {
    setItemModalOpen(false);
    setSelectedItemId(null);
    setImagePreview(null);
    setImage(null);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // For demo purposes, we'll simulate uploading the image and getting back a URL
    const finalImageUrl = imagePreview || values.imageUrl;
    
    if (selectedItem) {
      updateMenuItem({
        ...selectedItem,
        ...values,
        imageUrl: finalImageUrl,
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
        imageUrl: finalImageUrl,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleOptimizeWithAI = () => {
    if (!imagePreview) return;
    
    setIsOptimizing(true);
    
    // Simulate AI optimization with a timeout
    setTimeout(() => {
      // In a real application, we would send the image to an AI service
      // and get back an optimized version. For now, we'll just pretend.
      setIsOptimizing(false);
      toast.success(translations.imageOptimizer.imageOptimized, {
        description: translations.imageOptimizer.imageOptimizedDesc,
      });
    }, 2000);
  };

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
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="image">
                  <Image className="mr-2 h-4 w-4" />
                  {translations.menu.image}
                </TabsTrigger>
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

              <TabsContent value="image" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{translations.menu.image}</h3>
                    {imagePreview && !isOptimizing && (
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={handleOptimizeWithAI}
                        variant="outline"
                      >
                        <Wand2 className="h-4 w-4 mr-2" />
                        {translations.imageOptimizer.optimizeWithAI}
                      </Button>
                    )}
                    {isOptimizing && (
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline" 
                        disabled
                      >
                        <span className="animate-spin mr-2">⏳</span>
                        {translations.imageOptimizer.optimizing}
                      </Button>
                    )}
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-md">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setImagePreview(null);
                            setImage(null);
                          }}
                          className="w-full"
                        >
                          {translations.imageOptimizer.upload}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col items-center">
                          <ImagePlus className="h-10 w-10 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            {translations.imageOptimizer.uploadImage}
                          </p>
                        </div>
                        <div>
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <Button type="button" variant="outline" className="w-full">
                              {translations.imageOptimizer.upload}
                            </Button>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {(selectedItem?.imageUrl && !imagePreview) && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">{translations.menu.currentImage}:</h4>
                      <div className="aspect-[4/3] relative overflow-hidden rounded-md">
                        <img 
                          src={selectedItem.imageUrl} 
                          alt="Current" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  )}
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

