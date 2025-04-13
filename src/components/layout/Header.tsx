
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  
  const { translations } = useLanguage();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container flex items-center justify-between px-4">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden md:flex">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <form className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder={translations.search}
              className="w-64 pl-8 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-cannoli-500"
            />
          </form>
          <Button variant="outline" size="icon" className="relative border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-cannoli-200">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback className="bg-cannoli-500 text-white">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    admin@cannoli.tech
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">{translations.profile}</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">{translations.settings}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">{translations.logout}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
