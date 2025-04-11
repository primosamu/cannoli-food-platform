
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/cannoli-logo.png';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
  { path: '/menus', label: 'Menu Management', icon: <BookOpen className="h-5 w-5" /> },
  { path: '/customers', label: 'Customers', icon: <Users className="h-5 w-5" /> },
  { path: '/campaigns', label: 'Campaigns', icon: <MessageSquare className="h-5 w-5" /> },
  { path: '/calendar', label: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
  { path: '/coupons', label: 'Coupons', icon: <PercentCircle className="h-5 w-5" /> },
  { path: '/loyalty', label: 'Loyalty & Points', icon: <CreditCard className="h-5 w-5" /> },
  { path: '/integrations', label: 'Integrations', icon: <Store className="h-5 w-5" /> },
  { path: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

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
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <img src={logoImage} alt="Cannoli Food Tech" className="h-10" />
              <span className="text-lg font-semibold">Cannoli Food Tech</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      location.pathname === item.path
                        ? "bg-cannoli-200 text-cannoli-800 font-medium"
                        : "text-gray-600 hover:bg-cannoli-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-cannoli-100 p-1">
                <ChefHat className="h-5 w-5 text-cannoli-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Cannoli Food Tech</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">CRM System</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}
