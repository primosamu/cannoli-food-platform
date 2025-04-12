
export type OrderChannel = 'mobile' | 'totem' | 'whatsapp' | 'app' | 'ifood' | 'rappi' | 'other';
export type OrderStatus = 'new' | 'preparing' | 'ready' | 'delivering' | 'completed' | 'cancelled';
export type DeliveryType = 'self' | 'own' | 'marketplace' | 'thirdparty' | 'pickup';
export type DeliveryCompany = 'loggi' | 'rapiddo' | 'uber' | 'other';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
  options?: {
    name: string;
    price: number;
  }[];
}

export interface Courier {
  id: string;
  name: string;
  phone: string;
  isAvailable: boolean;
  deliveryCount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    phone?: string;
    address?: string;
  };
  items: OrderItem[];
  channel: OrderChannel;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: Date;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  delivery: {
    type: DeliveryType;
    courier?: string;
    courierId?: string;
    company?: DeliveryCompany;
    trackingCode?: string;
    notes?: string;
    fee?: number;
  };
  notes?: string;
}

