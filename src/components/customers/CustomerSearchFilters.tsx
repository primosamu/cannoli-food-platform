
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CustomerSearchFilters: React.FC<CustomerSearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { translations } = useLanguage();
  
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={translations.searchCustomers || "Buscar clientes..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div>
        <Button variant="outline" className="w-full">
          <Tag className="mr-2 h-4 w-4" />
          {translations.tags || "Tags"}
        </Button>
      </div>
    </div>
  );
};
