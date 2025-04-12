import { sampleCustomers, getVipCustomers, getRegularCustomers, getNewCustomers } from "@/data/sampleCustomers";
import { sampleOrders, getOrdersByCustomer, getOrdersByStatus } from "@/data/sampleOrders";
import { sampleMenuItems, sampleCategories } from "@/data/sampleMenuData";
import { sampleCampaigns } from "@/data/sampleCampaigns";
import { sampleCouponData, getActiveCoupons } from "@/components/coupons/CouponSchema";
import { MenuItem, MenuCategory } from "@/types/menu";
import { Order } from "@/types/order";
import { Customer } from "@/components/customers/CustomerList";
import { CampaignData } from "@/types/campaign";
import { Coupon } from "@/components/coupons/CouponSchema";

/**
 * DataConnector - A central utility for accessing connected data across the application
 * This simulates what would be handled by API calls to a backend database in a production app
 */
export const DataConnector = {
  // Customer data access
  customers: {
    getAll: (): Customer[] => sampleCustomers,
    getById: (id: string): Customer | undefined => sampleCustomers.find(c => c.id === id),
    getVip: (): Customer[] => getVipCustomers(),
    getRegular: (): Customer[] => getRegularCustomers(),
    getNew: (): Customer[] => getNewCustomers(),
    getOrderHistory: (customerId: string): Order[] => getOrdersByCustomer(customerId),
    getSpendingAnalytics: (customerId: string) => {
      const orders = getOrdersByCustomer(customerId);
      const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      const averageOrderValue = totalSpent / (orders.length || 1);
      
      // Calculate spending by category
      const spendingByCategory: Record<string, number> = {};
      orders.forEach(order => {
        order.items.forEach(item => {
          const menuItem = sampleMenuItems.find(mi => mi.name === item.name);
          if (menuItem) {
            const categoryId = menuItem.category;
            const category = sampleCategories.find(c => c.id === categoryId);
            if (category) {
              const categoryName = category.name;
              if (!spendingByCategory[categoryName]) {
                spendingByCategory[categoryName] = 0;
              }
              spendingByCategory[categoryName] += item.price * item.quantity;
            }
          }
        });
      });
      
      return {
        totalSpent,
        averageOrderValue,
        orderCount: orders.length,
        lastOrderDate: orders.length > 0 ? 
          orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt : 
          undefined,
        spendingByCategory
      };
    },
    getUsedCoupons: (customerId: string) => {
      // This would come from a real database - here we're generating sample data
      const customer = sampleCustomers.find(c => c.id === customerId);
      if (!customer) return [];
      
      // Get a subset of coupons based on customer's order count
      const potentialCoupons = getActiveCoupons();
      const usedCouponCount = Math.min(customer.orderCount / 3, potentialCoupons.length);
      
      return potentialCoupons.slice(0, usedCouponCount);
    },
    getAppliedCampaigns: (customerId: string) => {
      // This would come from a real database - here we're generating sample data
      return sampleCampaigns
        .filter(campaign => campaign.status === "completed" || campaign.status === "active")
        .filter(() => Math.random() > 0.7); // Randomly select campaigns
    }
  },
  
  // Menu data access
  menu: {
    getItems: (): MenuItem[] => sampleMenuItems,
    getCategories: (): MenuCategory[] => sampleCategories,
    getItemById: (id: string): MenuItem | undefined => sampleMenuItems.find(item => item.id === id),
    getCategoryById: (id: string): MenuCategory | undefined => sampleCategories.find(cat => cat.id === id),
    getItemsByCategory: (categoryId: string): MenuItem[] => {
      return sampleMenuItems.filter(item => item.category === categoryId);
    },
    getMostOrderedItems: (limit: number = 10): {item: MenuItem, orderCount: number}[] => {
      // Create a map to track order counts
      const orderCounts: Record<string, number> = {};
      
      // Count occurrences of each menu item in orders
      sampleOrders.forEach(order => {
        order.items.forEach(orderItem => {
          if (!orderCounts[orderItem.name]) {
            orderCounts[orderItem.name] = 0;
          }
          orderCounts[orderItem.name] += orderItem.quantity;
        });
      });
      
      // Map to menu items with counts
      const itemsWithCounts = sampleMenuItems
        .filter(item => orderCounts[item.name])
        .map(item => ({
          item,
          orderCount: orderCounts[item.name] || 0
        }))
        .sort((a, b) => b.orderCount - a.orderCount)
        .slice(0, limit);
      
      return itemsWithCounts;
    },
    getItemsInCampaigns: (): MenuItem[] => {
      // Get all menu IDs referenced in campaigns
      const campaignMenuIds = new Set<string>();
      sampleCampaigns.forEach(campaign => {
        campaign.menuIds?.forEach(id => campaignMenuIds.add(id));
      });
      
      // Return all items referenced in campaigns
      return sampleMenuItems.filter(item => campaignMenuIds.has(item.id));
    }
  },
  
  // Order data access
  orders: {
    getAll: (): Order[] => sampleOrders,
    getById: (id: string): Order | undefined => sampleOrders.find(o => o.id === id),
    getByStatus: (status: string): Order[] => getOrdersByStatus(status as any),
    getByCustomer: (customerId: string): Order[] => getOrdersByCustomer(customerId),
    getOrderItems: (orderId: string) => {
      const order = sampleOrders.find(o => o.id === orderId);
      return order?.items || [];
    },
    getOrderWithMenuDetails: (orderId: string) => {
      const order = sampleOrders.find(o => o.id === orderId);
      if (!order) return null;
      
      // Enrich order items with full menu item details
      const enrichedItems = order.items.map(orderItem => {
        const menuItem = sampleMenuItems.find(mi => mi.name === orderItem.name);
        return {
          ...orderItem,
          menuItem
        };
      });
      
      return {
        ...order,
        enrichedItems
      };
    },
    getPopularTimeSlots: () => {
      // Analyze orders by hour of day
      const ordersByHour: Record<number, number> = {};
      
      sampleOrders.forEach(order => {
        const hour = order.createdAt.getHours();
        if (!ordersByHour[hour]) {
          ordersByHour[hour] = 0;
        }
        ordersByHour[hour]++;
      });
      
      // Format for display
      const hourlyData = Object.entries(ordersByHour)
        .map(([hour, count]) => ({
          hour: parseInt(hour),
          count,
          timeDisplay: `${hour}:00 - ${parseInt(hour) + 1}:00`
        }))
        .sort((a, b) => a.hour - b.hour);
      
      return hourlyData;
    }
  },
  
  // Campaign data access
  campaigns: {
    getAll: (): CampaignData[] => sampleCampaigns,
    getById: (id: string): CampaignData | undefined => sampleCampaigns.find(c => c.id === id),
    getByStatus: (status: string): CampaignData[] => {
      return sampleCampaigns.filter(c => c.status === status);
    },
    getCampaignImpact: (campaignId: string) => {
      const campaign = sampleCampaigns.find(c => c.id === campaignId);
      if (!campaign) return null;
      
      // This would come from actual tracking data in a real app
      // Here we're generating plausible metrics
      const clickCount = campaign.clickedCount || 0;
      const estimatedConversions = Math.floor(clickCount * 0.2); // 20% conversion rate
      const estimatedRevenue = estimatedConversions * 35; // Average order value $35
      
      return {
        campaign,
        metrics: {
          audienceSize: campaign.audienceSize || 0,
          deliveredCount: campaign.deliveredCount || 0,
          openedCount: campaign.openedCount || 0,
          clickedCount: clickCount,
          estimatedConversions,
          estimatedRevenue,
          roi: campaign.reportData ? 
            ((estimatedRevenue / 100) - 1).toFixed(2) : 
            undefined
        }
      };
    },
    getRelatedCoupons: (campaignId: string): Coupon[] => {
      const campaign = sampleCampaigns.find(c => c.id === campaignId);
      if (!campaign || !campaign.couponId) return [];
      
      const coupon = sampleCouponData.find(c => c.id === campaign.couponId);
      return coupon ? [coupon] : [];
    },
    getTargetCustomers: (campaignId: string): Customer[] => {
      // In a real app, we'd get the actual target customers
      // Here we're returning a plausible subset
      const campaign = sampleCampaigns.find(c => c.id === campaignId);
      if (!campaign) return [];
      
      // Different logic based on audience type
      switch (campaign.audienceType) {
        case "segment":
          if (campaign.audienceSegmentId === "vip_customers") {
            return getVipCustomers();
          } else if (campaign.audienceSegmentId === "new_customers") {
            return getNewCustomers();
          }
          return sampleCustomers.slice(0, 50);
        
        case "custom":
          // Random subset
          return sampleCustomers
            .sort(() => Math.random() - 0.5)
            .slice(0, 30);
            
        case "all":
        default:
          // Just return first N customers
          const count = Math.min(sampleCustomers.length, 100);
          return sampleCustomers.slice(0, count);
      }
    }
  },
  
  // Coupon data access
  coupons: {
    getAll: (): Coupon[] => sampleCouponData,
    getById: (id: string): Coupon | undefined => sampleCouponData.find(c => c.id === id),
    getActive: (): Coupon[] => getActiveCoupons(),
    getInactive: (): Coupon[] => sampleCouponData.filter(c => !c.active),
    getRelatedCampaigns: (couponId: string): CampaignData[] => {
      return sampleCampaigns.filter(campaign => campaign.couponId === couponId);
    },
    getCouponUsageAnalytics: (couponId: string) => {
      const coupon = sampleCouponData.find(c => c.id === couponId);
      if (!coupon) return null;
      
      // Generate realistic usage data
      const usageCount = coupon.usageCount;
      
      // Simulate different acquisition channels
      const channelDistribution = {
        whatsapp: Math.floor(usageCount * 0.35),
        email: Math.floor(usageCount * 0.25),
        direct: Math.floor(usageCount * 0.20),
        sms: Math.floor(usageCount * 0.15),
        other: Math.floor(usageCount * 0.05)
      };
      
      return {
        coupon,
        totalUsage: usageCount,
        uniqueCustomers: Math.floor(usageCount * 0.8),
        averageOrderValue: 32 + Math.random() * 20,
        channelDistribution
      };
    }
  },
  
  // Analytics across multiple data types
  analytics: {
    getDashboardMetrics: () => {
      const totalCustomers = sampleCustomers.length;
      const totalOrders = sampleOrders.length;
      const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const averageOrderValue = totalRevenue / totalOrders;
      
      // Calculate month-over-month growth
      const thisMonth = new Date().getMonth();
      const lastMonth = thisMonth - 1 >= 0 ? thisMonth - 1 : 11;
      
      const thisMonthOrders = sampleOrders.filter(o => o.createdAt.getMonth() === thisMonth);
      const lastMonthOrders = sampleOrders.filter(o => o.createdAt.getMonth() === lastMonth);
      
      const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      const revenueGrowth = lastMonthRevenue === 0 ? 100 : 
        ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
      
      // Popular categories
      const salesByCategory: Record<string, number> = {};
      sampleOrders.forEach(order => {
        order.items.forEach(item => {
          const menuItem = sampleMenuItems.find(mi => mi.name === item.name);
          if (menuItem) {
            const categoryId = menuItem.category;
            const category = sampleCategories.find(c => c.id === categoryId);
            if (category) {
              if (!salesByCategory[category.name]) {
                salesByCategory[category.name] = 0;
              }
              salesByCategory[category.name] += item.quantity;
            }
          }
        });
      });
      
      const categoryData = Object.entries(salesByCategory)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      
      // Delivery vs dine-in
      const deliveryOrders = sampleOrders.filter(o => o.delivery.type !== "pickup");
      const pickupOrders = sampleOrders.filter(o => o.delivery.type === "pickup");
      
      return {
        totalCustomers,
        totalOrders,
        totalRevenue,
        averageOrderValue,
        revenueGrowth,
        popularCategories: categoryData,
        orderDistribution: {
          delivery: deliveryOrders.length,
          pickup: pickupOrders.length
        },
        activeCampaigns: sampleCampaigns.filter(c => c.status === "active").length
      };
    },
    
    getCustomerRetentionMetrics: () => {
      // In a real app this would be calculated from actual customer behavior
      // Here we're creating plausible metrics
      
      // Calculate number of repeat customers
      const customerOrderCounts: Record<string, number> = {};
      sampleOrders.forEach(order => {
        const customerId = order.customer.id;
        if (!customerOrderCounts[customerId]) {
          customerOrderCounts[customerId] = 0;
        }
        customerOrderCounts[customerId]++;
      });
      
      const repeatCustomers = Object.values(customerOrderCounts).filter(count => count > 1).length;
      const oneTimeCustomers = Object.values(customerOrderCounts).filter(count => count === 1).length;
      
      const retentionRate = Math.round((repeatCustomers / (repeatCustomers + oneTimeCustomers)) * 100);
      
      return {
        totalCustomers: sampleCustomers.length,
        repeatCustomers,
        oneTimeCustomers,
        retentionRate,
        customerLifetimeValue: 180 + Math.random() * 50 // Simulated LTV
      };
    },
    
    getCampaignEffectiveness: () => {
      const campaigns = sampleCampaigns.filter(c => c.status === "completed" && c.reportData);
      
      if (campaigns.length === 0) {
        return {
          averageOpenRate: 0,
          averageClickRate: 0,
          mostEffectiveChannel: "unknown",
          campaigns: []
        };
      }
      
      // Calculate averages across campaigns
      let totalOpenRate = 0;
      let totalClickRate = 0;
      let channelCounts: Record<string, { count: number, openRate: number }> = {};
      
      campaigns.forEach(campaign => {
        if (campaign.reportData) {
          totalOpenRate += campaign.reportData.openRate;
          totalClickRate += campaign.reportData.clickRate;
          
          // Track channel effectiveness
          const channel = campaign.channels[0]; 
          if (!channelCounts[channel]) {
            channelCounts[channel] = { count: 0, openRate: 0 };
          }
          channelCounts[channel].count++;
          channelCounts[channel].openRate += campaign.reportData.openRate;
        }
      });
      
      // Find most effective channel
      let mostEffectiveChannel = "";
      let highestAvgOpenRate = 0;
      
      Object.entries(channelCounts).forEach(([channel, data]) => {
        const avgOpenRate = data.openRate / data.count;
        if (avgOpenRate > highestAvgOpenRate) {
          highestAvgOpenRate = avgOpenRate;
          mostEffectiveChannel = channel;
        }
      });
      
      return {
        averageOpenRate: totalOpenRate / campaigns.length,
        averageClickRate: totalClickRate / campaigns.length,
        mostEffectiveChannel,
        campaigns: campaigns.map(c => ({
          id: c.id,
          name: c.name,
          type: c.type,
          openRate: c.reportData?.openRate || 0,
          clickRate: c.reportData?.clickRate || 0
        }))
      };
    }
  }
};

// Export default instance
export default DataConnector;
