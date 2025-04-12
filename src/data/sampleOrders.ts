
import { Order, OrderChannel, OrderStatus, DeliveryType } from "@/types/order";
import { addMinutes, subMinutes } from "date-fns";

const now = new Date();

// Helper function to create orders
const createOrder = (
  id: string,
  orderNumber: string,
  customerName: string,
  channel: OrderChannel,
  status: OrderStatus,
  items: { name: string; quantity: number; price: number; notes?: string }[],
  deliveryType: DeliveryType,
  paymentMethod: string = "credit_card",
  timeOffset: number = 0
): Order => {
  const createdAt = subMinutes(now, timeOffset);
  const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  
  return {
    id,
    orderNumber,
    customer: {
      id: `cust_${id.substring(4)}`,
      name: customerName,
      phone: "+55 11 98765-4321",
      address: deliveryType !== "pickup" ? "Av. Paulista, 1000, São Paulo" : undefined,
    },
    items: items.map((item, index) => ({
      id: `item_${id}_${index}`,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      notes: item.notes,
    })),
    channel,
    status,
    createdAt,
    updatedAt: createdAt,
    estimatedDeliveryTime: deliveryType !== "pickup" ? addMinutes(createdAt, 30) : undefined,
    totalAmount,
    paymentMethod,
    paymentStatus: "paid",
    delivery: {
      type: deliveryType,
      courier: deliveryType === "own" ? "Carlos Silva" : undefined,
      trackingCode: deliveryType === "thirdparty" ? "TRK123456" : undefined,
      fee: deliveryType !== "pickup" ? 5 : 0,
    },
  };
};

// Sample orders data
export const sampleOrders: Order[] = [
  createOrder(
    "ord_001",
    "#1001",
    "João Silva",
    "ifood",
    "new",
    [
      { name: "X-Burger", quantity: 2, price: 20 },
      { name: "French Fries", quantity: 1, price: 12 },
      { name: "Soda", quantity: 2, price: 6 },
    ],
    "marketplace",
    "online",
    5
  ),
  createOrder(
    "ord_002",
    "#1002",
    "Maria Souza",
    "whatsapp",
    "preparing",
    [
      { name: "Veggie Pizza", quantity: 1, price: 45, notes: "No onions" },
      { name: "Garlic Bread", quantity: 1, price: 15 },
    ],
    "own",
    "cash",
    15
  ),
  createOrder(
    "ord_003",
    "#1003",
    "Carlos Oliveira",
    "mobile",
    "ready",
    [
      { name: "Salad Bowl", quantity: 1, price: 28 },
      { name: "Orange Juice", quantity: 1, price: 10 },
    ],
    "pickup",
    "credit_card",
    25
  ),
  createOrder(
    "ord_004",
    "#1004",
    "Ana Costa",
    "totem",
    "completed",
    [
      { name: "Chicken Sandwich", quantity: 1, price: 22 },
      { name: "Sweet Potato Fries", quantity: 1, price: 14 },
      { name: "Milkshake", quantity: 1, price: 12 },
    ],
    "pickup",
    "debit_card",
    40
  ),
  createOrder(
    "ord_005",
    "#1005",
    "Pedro Santos",
    "app",
    "delivering",
    [
      { name: "Double Cheeseburger", quantity: 2, price: 25 },
      { name: "Onion Rings", quantity: 1, price: 14 },
      { name: "Soda", quantity: 2, price: 6 },
    ],
    "own",
    "credit_card",
    10
  ),
  createOrder(
    "ord_006",
    "#1006",
    "Fernanda Lima",
    "rappi",
    "new",
    [
      { name: "Pasta Carbonara", quantity: 1, price: 35 },
      { name: "Caesar Salad", quantity: 1, price: 18 },
      { name: "Sparkling Water", quantity: 1, price: 7 },
    ],
    "marketplace",
    "online",
    3
  ),
  createOrder(
    "ord_007",
    "#1007",
    "Paulo Mendes",
    "ifood",
    "preparing",
    [
      { name: "Pepperoni Pizza", quantity: 1, price: 45 },
      { name: "Mozzarella Sticks", quantity: 1, price: 20 },
      { name: "Soda", quantity: 2, price: 6 },
    ],
    "marketplace",
    "online",
    12
  ),
  createOrder(
    "ord_008",
    "#1008",
    "Juliana Alves",
    "whatsapp",
    "cancelled",
    [
      { name: "Sushi Combo", quantity: 1, price: 75 },
      { name: "Miso Soup", quantity: 2, price: 10 },
    ],
    "thirdparty",
    "credit_card",
    18
  ),
];
