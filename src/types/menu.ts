
export type DeliveryPlatform = 'ifood' | 'rappi' | 'anota_ai' | 'uber_eats' | 'internal';

export type MenuType = 'delivery' | 'qr_table' | 'self_service' | 'in_person';

export type MenuItemStatus = 'available' | 'out_of_stock' | 'coming_soon';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string;
  prices: {
    [key in MenuType]?: number;
  };
  active: boolean;
  status: MenuItemStatus;
  variants?: MenuItemVariant[];
  additionalOptions?: MenuItemOption[];
  allergens?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  prepTime?: number; // in minutes
  featured?: boolean;
  platforms: {
    [key in DeliveryPlatform]?: boolean;
  };
  tags?: string[];
}

export interface MenuItemVariant {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface MenuItemOption {
  id: string;
  name: string;
  price: number;
  maxSelections?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  order: number;
  imageUrl?: string;
}
