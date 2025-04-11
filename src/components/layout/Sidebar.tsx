
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
          "fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-800 shadow-sm transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 pt-8">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-cannoli-800 dark:text-white px-3">Cannoli Food Tech</h1>
            </div>
            <ul className="space-y-1.5">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                      location.pathname === item.path
                        ? "bg-cannoli-200 text-cannoli-800 font-medium shadow-sm"
                        : "text-gray-600 hover:bg-cannoli-100 hover:text-cannoli-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    )}
                  >
                    <span className={cn(
                      "p-1.5 rounded-md",
                      location.pathname === item.path
                        ? "bg-cannoli-300 text-cannoli-800"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    )}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-cannoli-100 p-1.5 dark:bg-gray-800">
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
