
import React from "react";
import { useMenu } from "./MenuProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  GripVertical,
  ChevronRight,
  PlusCircle,
  Edit,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const MenuSidePanel = () => {
  const { 
    categories, 
    menuItems, 
    selectedCategory, 
    setSelectedCategory,
    setSelectedCategoryId,
    setCategoryModalOpen,
    deleteCategory,
    reorderCategory
  } = useMenu();
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const categoryId = result.draggableId;
    const newOrder = result.destination.index + 1;
    reorderCategory(categoryId, newOrder);
  };
  
  const getCategoryItemCount = (categoryId: string) => {
    return menuItems.filter(item => item.category === categoryId).length;
  };
  
  const handleEditCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCategoryModalOpen(true);
  };
  
  return (
    <div className="w-64 flex-shrink-0 border rounded-xl overflow-hidden flex flex-col bg-background shadow-soft">
      <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
        <h3 className="font-medium">Categories</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 rounded-full hover:bg-muted" 
          onClick={() => {
            setSelectedCategoryId(null);
            setCategoryModalOpen(true);
          }}
        >
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Add Category</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3">
          <Button
            variant={selectedCategory === 'all' ? "default" : "ghost"}
            className={cn(
              "w-full justify-start font-normal mb-1 rounded-lg",
              selectedCategory === 'all' ? "bg-cannoli-100 text-cannoli-800 hover:bg-cannoli-200 hover:text-cannoli-800" : ""
            )}
            onClick={() => setSelectedCategory('all')}
          >
            All Items
            <Badge variant={selectedCategory === 'all' ? "default" : "outline"} className="ml-auto">
              {menuItems.length}
            </Badge>
          </Button>
          
          <Separator className="my-3 opacity-70" />
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-1"
                >
                  {categories
                    .sort((a, b) => a.order - b.order)
                    .map((category, index) => (
                      <Draggable
                        key={category.id}
                        draggableId={category.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`flex items-center group ${
                              !category.active ? "opacity-60" : ""
                            }`}
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="p-1 opacity-20 group-hover:opacity-100"
                            >
                              <GripVertical className="h-4 w-4" />
                            </div>
                            
                            <Button
                              variant={selectedCategory === category.id ? "default" : "ghost"}
                              className={cn(
                                "w-full justify-start font-normal text-sm h-9 rounded-lg",
                                selectedCategory === category.id ? "bg-cannoli-100 text-cannoli-800 hover:bg-cannoli-200 hover:text-cannoli-800" : ""
                              )}
                              onClick={() => setSelectedCategory(category.id)}
                            >
                              <span className="truncate">{category.name}</span>
                              <Badge 
                                variant={selectedCategory === category.id ? "default" : "outline"} 
                                className="ml-auto"
                              >
                                {getCategoryItemCount(category.id)}
                              </Badge>
                              <ChevronRight className="h-4 w-4 ml-1 opacity-50" />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="p-0 h-8 w-8 opacity-0 group-hover:opacity-100 rounded-full"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                <DropdownMenuItem onClick={() => handleEditCategory(category.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => deleteCategory(category.id)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </ScrollArea>
    </div>
  );
}

// Import cn helper at the top of the file
import { cn } from "@/lib/utils";
