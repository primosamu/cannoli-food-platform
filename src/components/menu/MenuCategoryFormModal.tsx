
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
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema for category validation
const categorySchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  description: z.string()
    .max(200, { message: "Description cannot exceed 200 characters" })
    .optional(),
  active: z.boolean(),
  order: z.number().int().positive().optional(),
});

export const MenuCategoryFormModal = () => {
  const {
    isCategoryModalOpen,
    setCategoryModalOpen,
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
    addCategory,
    updateCategory,
  } = useMenu();

  const selectedCategory = selectedCategoryId 
    ? categories.find(category => category.id === selectedCategoryId) 
    : null;

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: selectedCategory
      ? {
          name: selectedCategory.name,
          description: selectedCategory.description || "",
          active: selectedCategory.active,
          order: selectedCategory.order,
        }
      : {
          name: "",
          description: "",
          active: true,
          order: categories.length + 1,
        },
  });

  const handleClose = () => {
    setCategoryModalOpen(false);
    setSelectedCategoryId(null);
    form.reset();
  };

  const onSubmit = (values: z.infer<typeof categorySchema>) => {
    if (selectedCategory) {
      updateCategory({
        ...selectedCategory,
        ...values,
      });
    } else {
      // Ensure required fields are present
      addCategory({
        name: values.name,
        description: values.description || "",
        active: values.active,
        order: values.order || categories.length + 1,
      });
    }
    handleClose();
  };

  return (
    <Dialog open={isCategoryModalOpen} onOpenChange={setCategoryModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedCategory ? "Edit Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {selectedCategory
              ? "Update the details of this category"
              : "Create a new category for your menu"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
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
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this category"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div>
                    <FormLabel>Active</FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Show this category and its items in the menu
                    </p>
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

            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedCategory ? "Update Category" : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
