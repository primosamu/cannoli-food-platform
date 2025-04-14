
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  BookOpen,
  Calendar,
  ChefHat,
  CreditCard,
  Menu,
  MessageSquare,
  PercentCircle,
  Settings,
  Store,
  Users,
  X,
  ShoppingBag,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { translations } = useLanguage();

  const menuItems = [
    { path: '/', label: translations.dashboard, icon: <BarChart3 className="h-5 w-5" /> },
    { path: '/menus', label: translations.menus, icon: <BookOpen className="h-5 w-5" /> },
    { 
      path: '/customers', 
      label: translations.customers.charAt(0).toUpperCase() + translations.customers.slice(1), 
      icon: <Users className="h-5 w-5" /> 
    },
    { path: '/campaigns', label: translations.campaigns, icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/orders', label: translations.orders, icon: <ShoppingBag className="h-5 w-5" /> },
    { path: '/calendar', label: translations.calendar, icon: <Calendar className="h-5 w-5" /> },
    { path: '/coupons', label: translations.coupons, icon: <PercentCircle className="h-5 w-5" /> },
    { path: '/loyalty', label: translations.loyalty, icon: <CreditCard className="h-5 w-5" /> },
    { path: '/integrations', label: translations.integrations, icon: <Store className="h-5 w-5" /> },
    { path: '/settings', label: translations.settings, icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar shadow-medium transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-cannoli-400 to-cannoli-600 p-2 rounded-lg">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-display font-semibold text-cannoli-800 dark:text-white">Cannoli</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-0.5">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "sidebar-item group relative",
                      location.pathname === item.path
                        ? "sidebar-item-active shadow-soft"
                        : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <span className={cn(
                      "sidebar-item-icon",
                      location.pathname === item.path
                        ? "bg-cannoli-300 text-cannoli-800"
                        : "bg-secondary text-foreground/60"
                    )}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 ml-auto opacity-0 transition-opacity", 
                        location.pathname === item.path ? "opacity-70" : "group-hover:opacity-50"
                      )} 
                    />
                  </Link>
                </li>
              ))}
              
              <Separator className="my-3 opacity-70" />
              
              <li>
                <Link
                  to="/admin"
                  className={cn(
                    "sidebar-item group relative",
                    location.pathname === "/admin"
                      ? "sidebar-item-active shadow-soft"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <span className={cn(
                    "sidebar-item-icon",
                    location.pathname === "/admin"
                      ? "bg-cannoli-300 text-cannoli-800"
                      : "bg-secondary text-foreground/60"
                  )}>
                    <Shield className="h-5 w-5" />
                  </span>
                  <span>Painel Administrativo</span>
                  <ChevronRight 
                    className={cn(
                      "h-4 w-4 ml-auto opacity-0 transition-opacity", 
                      location.pathname === "/admin" ? "opacity-70" : "group-hover:opacity-50"
                    )} 
                  />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-cannoli-100 p-1.5 dark:bg-gray-800">
                <ChefHat className="h-5 w-5 text-cannoli-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Cannoli Food Tech</p>
                <p className="text-xs text-foreground/70">{translations.system}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
