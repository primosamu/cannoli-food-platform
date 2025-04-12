
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Store {
  id: string;
  name: string;
}

interface StoreSelectorProps {
  stores: Store[];
  selectedStores: string[];
  onStoreChange: (stores: string[]) => void;
  showAll?: boolean;
}

export const StoreSelector = ({ 
  stores, 
  selectedStores, 
  onStoreChange,
  showAll = true 
}: StoreSelectorProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSelectAll = () => {
    if (selectedStores.length === stores.length) {
      onStoreChange([]);
    } else {
      onStoreChange(stores.map(store => store.id));
    }
  };

  const handleToggleStore = (storeId: string) => {
    if (selectedStores.includes(storeId)) {
      onStoreChange(selectedStores.filter(id => id !== storeId));
    } else {
      onStoreChange([...selectedStores, storeId]);
    }
  };

  const getButtonText = () => {
    if (selectedStores.length === 0) {
      return "Select stores...";
    }
    
    if (selectedStores.length === stores.length) {
      return "All stores";
    }
    
    if (selectedStores.length === 1) {
      const selectedStore = stores.find(store => store.id === selectedStores[0]);
      return selectedStore ? selectedStore.name : "1 store selected";
    }
    
    return `${selectedStores.length} stores selected`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {getButtonText()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandList>
            <CommandEmpty>No stores found.</CommandEmpty>
            <CommandGroup>
              {showAll && (
                <CommandItem
                  onSelect={handleSelectAll}
                  className="cursor-pointer"
                >
                  <div className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedStores.length === stores.length ? "bg-primary text-primary-foreground" : "opacity-50"
                  )}>
                    {selectedStores.length === stores.length && <Check className="h-3 w-3" />}
                  </div>
                  All Stores
                </CommandItem>
              )}
              {stores.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => handleToggleStore(store.id)}
                  className="cursor-pointer"
                >
                  <div className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedStores.includes(store.id) ? "bg-primary text-primary-foreground" : "opacity-50"
                  )}>
                    {selectedStores.includes(store.id) && <Check className="h-3 w-3" />}
                  </div>
                  {store.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
