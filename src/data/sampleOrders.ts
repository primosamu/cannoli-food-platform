
import { Order, OrderChannel, OrderStatus, DeliveryType, OrderItem } from "@/types/order";
import { addMinutes, subMinutes, subDays, subHours } from "date-fns";
import { sampleCustomers } from "./sampleCustomers";
import { sampleMenuItems } from "./sampleMenuData";
import { randomItem, randomInt, randomBool } from "@/utils/dataGenerationUtils";

const now = new Date();

// Available order channels
const orderChannels: OrderChannel[] = ["mobile", "totem", "whatsapp", "app", "ifood", "rappi", "other"];

// Available payment methods
const paymentMethods = ["credit_card", "debit_card", "cash", "pix", "online", "store_credit"];

// Create an order item based on a menu item
const createOrderItem = (menuItemId: string, quantity = 1): OrderItem => {
  const menuItem = sampleMenuItems.find(item => item.id === menuItemId);
  
  if (!menuItem) {
    // Fallback in case menu item isn't found
    return {
      id: `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: "Unknown Item",
      quantity,
      price: randomInt(10, 40),
    };
  }
  
  // Use actual menu item data
  const optionsArray = menuItem.additionalOptions || [];
  const selectedOptions = randomBool(0.3) ? optionsArray.filter(() => randomBool(0.5)) : [];
  
  const notes = randomBool(0.2) 
    ? randomItem([
        "No onions please",
        "Extra spicy",
        "Light on sauce",
        "Well done",
        "Gluten-free if possible"
      ])
    : undefined;
  
  return {
    id: `item_${menuItem.id}_${Date.now().toString().slice(-5)}`,
    name: menuItem.name,
    quantity,
    price: menuItem.prices.delivery || 20, // Default to delivery price
    notes,
    options: selectedOptions.length > 0 
      ? selectedOptions.map(opt => ({
          name: opt.name,
          price: opt.price
        })) 
      : undefined
  };
};

// Generate a single order
const generateOrder = (
  id: string,
  orderNumber: string,
  timeOffset: number = 0,
  customer = randomItem(sampleCustomers),
  status: OrderStatus = randomItem(["new", "preparing", "ready", "delivering", "completed", "cancelled"]),
  channel: OrderChannel = randomItem(orderChannels)
): Order => {
  // Generate between 1 and 5 items per order
  const itemCount = randomInt(1, 5);
  const menuItemIds = sampleMenuItems
    .filter(item => item.active && item.status === "available")
    .map(item => item.id);
  
  // Create unique selected items for this order
  const selectedItems = Array.from({ length: itemCount }, () => {
    const selectedItemId = randomItem(menuItemIds);
    const quantity = randomInt(1, 3);
    return createOrderItem(selectedItemId, quantity);
  });
  
  // Calculate creation time based on offset
  const createdAt = subMinutes(now, timeOffset);
  
  // Determine delivery type based on channel
  let deliveryType: DeliveryType = "pickup";
  if (channel === "ifood" || channel === "rappi") {
    deliveryType = "marketplace";
  } else if (randomBool(0.6)) {
    deliveryType = randomItem(["own", "thirdparty"]);
  }
  
  // Calculate total amount
  const itemsTotal = selectedItems.reduce((sum, item) => {
    const optionsTotal = item.options?.reduce((optSum, opt) => optSum + (opt.price * item.quantity), 0) || 0;
    return sum + ((item.price + optionsTotal) * item.quantity);
  }, 0);
  
  const deliveryFee = deliveryType !== "pickup" ? randomInt(5, 15) : 0;
  const totalAmount = Number((itemsTotal + deliveryFee).toFixed(2));
  
  // Determine courier information if applicable
  let courier: string | undefined;
  let courierId: string | undefined;
  
  if (deliveryType === "own") {
    // Names for couriers
    const courierNames = ["Carlos Silva", "Pedro Oliveira", "Ana Santos", "José Pereira", "Marcos Lima"];
    courier = randomItem(courierNames);
    courierId = `courier_${courier.split(" ")[0].toLowerCase()}`;
  }
  
  const deliveryAddress = deliveryType !== "pickup" ? customer.address || "Av. Paulista, 1000, São Paulo" : undefined;
  
  return {
    id,
    orderNumber,
    customer: {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: deliveryAddress,
    },
    items: selectedItems,
    channel,
    status,
    createdAt,
    updatedAt: createdAt,
    estimatedDeliveryTime: deliveryType !== "pickup" ? addMinutes(createdAt, randomInt(20, 60)) : undefined,
    totalAmount,
    paymentMethod: randomItem(paymentMethods),
    paymentStatus: randomBool(0.9) ? "paid" : randomBool(0.8) ? "pending" : "failed",
    delivery: {
      type: deliveryType,
      courier,
      courierId,
      company: deliveryType === "thirdparty" ? randomItem(["loggi", "rapiddo", "uber", "other"]) : undefined,
      trackingCode: deliveryType === "thirdparty" ? `TRK${randomInt(100000, 999999)}` : undefined,
      fee: deliveryFee,
      notes: randomBool(0.2) ? "Please call upon arrival" : undefined,
    },
    notes: randomBool(0.1) ? "Customer is a regular. Give extra attention." : undefined,
  };
};

// Generate many orders for the past 90 days
export const generateOrders = (count: number): Order[] => {
  // Create a distribution of orders that looks realistic
  // More orders in recent days, fewer as we go back in time
  const orders: Order[] = [];
  const maxDaysAgo = 90;
  
  // Most active customers who order more frequently
  const activeCustomers = sampleCustomers.filter(c => c.orderCount > 10);
  
  for (let i = 0; i < count; i++) {
    // Calculate a realistic time offset - more orders in recent days
    // Use an exponential distribution to cluster more orders in recent days
    const daysAgo = Math.floor(Math.random() * Math.random() * maxDaysAgo);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    // Total minutes ago
    const totalMinutesAgo = (daysAgo * 24 * 60) + (hoursAgo * 60) + minutesAgo;
    
    // Choose customer - active customers appear more frequently
    const customer = randomBool(0.7) ? randomItem(activeCustomers) : randomItem(sampleCustomers);
    
    // Generate order with computed time offset
    const newOrder = generateOrder(
      `ord_${i+1000}`,
      `#${1000 + i}`,
      totalMinutesAgo,
      customer
    );
    
    orders.push(newOrder);
  }
  
  return orders;
};

// Export a reasonable number of sample orders (200 for demo purposes)
export const sampleOrders: Order[] = generateOrders(200);

// Filtering functions for convenience
export const getRecentOrders = (days: number = 7) => {
  const cutoff = subDays(new Date(), days);
  return sampleOrders.filter(order => order.createdAt > cutoff);
};

export const getActiveOrders = () => 
  sampleOrders.filter(order => ["new", "preparing", "ready", "delivering"].includes(order.status));

export const getCompletedOrders = () => 
  sampleOrders.filter(order => order.status === "completed");

export const getCancelledOrders = () => 
  sampleOrders.filter(order => order.status === "cancelled");

export const getOrdersByCustomer = (customerId: string) => 
  sampleOrders.filter(order => order.customer.id === customerId);

export const getOrdersByStatus = (status: OrderStatus) => 
  sampleOrders.filter(order => order.status === status);
