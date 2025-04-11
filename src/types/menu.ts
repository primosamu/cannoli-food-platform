
export type DeliveryPlatform = 'ifood' | 'rappi' | 'anota_ai' | 'internal';

export type MenuType = 'delivery' | 'qr_table' | 'self_service' | 'in_person';

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
  available: boolean;
  platforms: {
    [key in DeliveryPlatform]?: boolean;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  active: boolean;
}
