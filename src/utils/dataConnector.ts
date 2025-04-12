import { sampleCustomers, getVipCustomers, getRegularCustomers, getNewCustomers } from "@/data/sampleCustomers";
import { sampleOrders, getOrdersByCustomer, getOrdersByStatus } from "@/data/sampleOrders";
import { sampleMenuItems, sampleCategories } from "@/data/sampleMenuData";
import { sampleCampaigns } from "@/data/sampleCampaigns";
import { sampleCouponData, getActiveCoupons } from "@/components/coupons/CouponSchema";
import { sampleLoyaltyMembers, sampleLoyaltyRewards, samplePointTransactions, getTransactionsByCustomer } from "@/data/sampleLoyaltyData";
import { MenuItem, MenuCategory, MenuType } from "@/types/menu";
import { Order, OrderStatus } from "@/types/order";
import { Customer } from "@/components/customers/CustomerList";
import { CampaignData } from "@/types/campaign";
import { Coupon } from "@/components/coupons/CouponSchema";
import { LoyaltyMember, LoyaltyReward, PointTransaction } from "@/data/sampleLoyaltyData";

/**
 * DataConnector - A central utility for accessing connected data across the application
 * This simulates what would be handled by API calls to a backend database in a production app
 */
export const DataConnector = {
  // Customer data access
  customers: {
    getAll: (): Customer[] => sampleCustomers,
    getById: (id: string): Customer | undefined => sampleCustomers.find(c => c.id === id),
    getVip: () => getVipCustomers(),
    getRegular: () => getRegularCustomers(),
    getNew: () => getNewCustomers(),
    getOrderHistory: (customerId: string) => {
      return sampleOrders.filter(order => order.customer.id === customerId);
    },
    getSpendingAnalytics: (customerId: string) => {
      const customerOrders = sampleOrders.filter(order => order.customer.id === customerId);
      
      // Calculate total spent
      const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      // Calculate average order value
      const averageOrderValue = customerOrders.length > 0 
        ? totalSpent / customerOrders.length 
        : 0;
      
      // Calculate spending by category
      const spendingByCategory: Record<string, number> = {};
      
      customerOrders.forEach(order => {
        order.items.forEach(item => {
          // Find the menu item to get its category
          const menuItem = sampleMenuItems.find(mi => mi.name === item.name);
          if (menuItem) {
            const category = sampleCategories.find(c => c.id === menuItem.category);
            if (category) {
              const categoryName = category.name;
              spendingByCategory[categoryName] = (spendingByCategory[categoryName] || 0) + (item.price * item.quantity);
            }
          }
        });
      });
      
      return {
        totalSpent,
        averageOrderValue,
        orderCount: customerOrders.length,
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
    },
    getLoyaltyInfo: (customerId: string) => {
      const member = sampleLoyaltyMembers.find(m => m.customerId === customerId);
      if (!member) return null;
      
      const transactions = getTransactionsByCustomer(customerId);
      
      return {
        member,
        transactions,
        rewardsRedeemed: transactions
          .filter(tx => tx.transactionType === "redeem" && tx.rewardId)
          .map(tx => {
            const reward = sampleLoyaltyRewards.find(r => r.id === tx.rewardId);
            return {
              transaction: tx,
              reward
            };
          })
      };
    }
  },
  
  // Menu data access
  menu: {
    getItems: (): MenuItem[] => sampleMenuItems,
    getItemById: (id: string): MenuItem | undefined => 
      sampleMenuItems.find(item => item.id === id),
    getCategories: (): MenuCategory[] => sampleCategories,
    getCategoryById: (id: string): MenuCategory | undefined =>
      sampleCategories.find(cat => cat.id === id),
    getItemsByCategory: (categoryId: string): MenuItem[] =>
      sampleMenuItems.filter(item => item.category === categoryId),
    getPopularItems: (limit: number = 5): MenuItem[] => {
      // Sort by a popularity score (in a real app, this would be based on order data)
      return [...sampleMenuItems]
        .sort((a, b) => {
          // Fix: Use 'delivery' price as the default for sorting instead of 'regular'
          const priceA = a.prices.delivery || 0;
          const priceB = b.prices.delivery || 0;
          return priceB - priceA;
        })
        .slice(0, limit);
    },
    getMostOrderedItems: (limit: number = 5) => {
      const itemCounts = new Map<string, { item: MenuItem; orderCount: number }>();
      
      // Count occurrences of each menu item in orders
      sampleOrders.forEach(order => {
        order.items.forEach(orderItem => {
          const menuItem = sampleMenuItems.find(mi => mi.name === orderItem.name);
          if (menuItem) {
            const current = itemCounts.get(menuItem.id) || { item: menuItem, orderCount: 0 };
            itemCounts.set(menuItem.id, {
              item: menuItem,
              orderCount: current.orderCount + orderItem.quantity
            });
          }
        });
      });
      
      // Convert to array and sort by count
      return Array.from(itemCounts.values())
        .sort((a, b) => b.orderCount - a.orderCount)
        .slice(0, limit);
    }
  },
  
  // Order data access
  orders: {
    getAll: (): Order[] => sampleOrders,
    getById: (id: string): Order | undefined => sampleOrders.find(order => order.id === id),
    getByStatus: (status: OrderStatus) => getOrdersByStatus(status),
    getByCustomer: (customerId: string) => getOrdersByCustomer(customerId),
    getOrderWithMenuDetails: (orderId: string) => {
      const order = sampleOrders.find(o => o.id === orderId);
      if (!order) return null;
      
      // Enrich order with menu item details
      const enrichedItems = order.items.map(item => {
        const menuItem = sampleMenuItems.find(mi => mi.name === item.name);
        return {
          ...item,
          menuItem
        };
      });
      
      return {
        ...order,
        enrichedItems
      };
    },
    getPopularTimeSlots: () => {
      const timeSlots = [
        { hour: "11-12", count: 0 },
        { hour: "12-13", count: 0 },
        { hour: "13-14", count: 0 },
        { hour: "14-15", count: 0 },
        { hour: "18-19", count: 0 },
        { hour: "19-20", count: 0 },
        { hour: "20-21", count: 0 },
        { hour: "21-22", count: 0 }
      ];
      
      // Count orders in each time slot
      sampleOrders.forEach(order => {
        const hour = order.createdAt.getHours();
        
        if (hour >= 11 && hour < 12) timeSlots[0].count++;
        else if (hour >= 12 && hour < 13) timeSlots[1].count++;
        else if (hour >= 13 && hour < 14) timeSlots[2].count++;
        else if (hour >= 14 && hour < 15) timeSlots[3].count++;
        else if (hour >= 18 && hour < 19) timeSlots[4].count++;
        else if (hour >= 19 && hour < 20) timeSlots[5].count++;
        else if (hour >= 20 && hour < 21) timeSlots[6].count++;
        else if (hour >= 21 && hour < 22) timeSlots[7].count++;
      });
      
      return timeSlots;
    }
  },
  
  // Campaign data access
  campaigns: {
    getAll: (): CampaignData[] => sampleCampaigns,
    getById: (id: string): CampaignData | undefined => 
      sampleCampaigns.find(campaign => campaign.id === id),
    getByType: (type: string): CampaignData[] =>
      sampleCampaigns.filter(campaign => campaign.type === type),
    getByStatus: (status: string): CampaignData[] =>
      sampleCampaigns.filter(campaign => campaign.status === status),
    getRelatedCoupons: (campaignId: string): Coupon[] => {
      // In a real app, this would come from a database relationship
      // Here we're just returning some sample coupons
      const campaign = sampleCampaigns.find(c => c.id === campaignId);
      if (!campaign) return [];
      
      return sampleCouponData
        .filter(() => Math.random() > 0.7) // Randomly select some coupons
        .slice(0, 3);
    },
    getTargetCustomers: (campaignId: string): Customer[] => {
      // In a real app, this would be based on campaign settings
      // Here we're just returning a random subset of customers
      return sampleCustomers
        .filter(() => Math.random() > 0.7)
        .slice(0, 10);
    },
    getCampaignImpact: (campaignId: string) => {
      const campaign = sampleCampaigns.find(c => c.id === campaignId);
      if (!campaign || !campaign.reportData) return null;
      
      return {
        metrics: {
          deliveredCount: campaign.reportData.deliveredCount || 0,
          openedCount: campaign.reportData.openedCount || 0,
          clickedCount: campaign.reportData.clickedCount || 0,
          estimatedRevenue: Math.floor(Math.random() * 1000) + 500
        }
      };
    }
  },
  
  // Coupon data access
  coupons: {
    getAll: (): Coupon[] => sampleCouponData,
    getById: (id: string): Coupon | undefined => 
      sampleCouponData.find(coupon => coupon.id === id),
    getActive: () => getActiveCoupons(),
    getByCode: (code: string): Coupon | undefined =>
      sampleCouponData.find(coupon => coupon.code === code),
    getRelatedCampaigns: (couponId: string): CampaignData[] => {
      // This would come from a database in a real app
      const coupon = sampleCouponData.find(c => c.id === couponId);
      if (!coupon) return [];
      
      return sampleCampaigns
        .filter(() => Math.random() > 0.7)
        .slice(0, 2);
    },
    getCouponUsageAnalytics: (couponId: string) => {
      // In a real app, this would come from actual usage data
      // Here we're generating placeholder data
      const coupon = sampleCouponData.find(c => c.id === couponId);
      if (!coupon) return null;
      
      const totalUsage = Math.floor(Math.random() * 100) + 10;
      
      return {
        totalUsage,
        uniqueCustomers: Math.floor(totalUsage * 0.7),
        averageOrderValue: 35 + Math.random() * 15,
        channelDistribution: {
          website: Math.floor(totalUsage * 0.4),
          mobile_app: Math.floor(totalUsage * 0.3),
          in_store: Math.floor(totalUsage * 0.2),
          phone: Math.floor(totalUsage * 0.1)
        }
      };
    }
  },
  
  // Loyalty data access
  loyalty: {
    getAllMembers: (): LoyaltyMember[] => sampleLoyaltyMembers,
    getMemberById: (id: string): LoyaltyMember | undefined => 
      sampleLoyaltyMembers.find(member => member.id === id),
    getMemberByCustomerId: (customerId: string): LoyaltyMember | undefined =>
      sampleLoyaltyMembers.find(member => member.customerId === customerId),
    getRewards: (): LoyaltyReward[] => sampleLoyaltyRewards,
    getActiveRewards: (): LoyaltyReward[] => 
      sampleLoyaltyRewards.filter(reward => reward.active),
    getTransactions: (): PointTransaction[] => samplePointTransactions,
    getTransactionsByCustomer: (customerId: string): PointTransaction[] =>
      samplePointTransactions.filter(tx => tx.customerId === customerId),
    getMemberTransactions: (memberId: string): PointTransaction[] => {
      const member = sampleLoyaltyMembers.find(m => m.id === memberId);
      if (!member) return [];
      return samplePointTransactions.filter(tx => tx.customerId === member.customerId);
    },
    getRewardById: (id: string): LoyaltyReward | undefined =>
      sampleLoyaltyRewards.find(reward => reward.id === id),
    getMembersByTier: (tier: "bronze" | "silver" | "gold" | "platinum"): LoyaltyMember[] =>
      sampleLoyaltyMembers.filter(member => member.tier === tier),
    getActiveMembersLastMonth: (): LoyaltyMember[] => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      return sampleLoyaltyMembers.filter(
        member => member.lastActivityDate >= thirtyDaysAgo
      );
    },
    // Calculate a customer's potential tier if they joined the loyalty program
    calculatePotentialTierForCustomer: (customerId: string): "bronze" | "silver" | "gold" | "platinum" | null => {
      const customer = sampleCustomers.find(c => c.id === customerId);
      if (!customer) return null;
      
      const customerOrders = sampleOrders.filter(order => order.customer.id === customerId);
      const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      // Earn 1 point per dollar spent
      const potentialPoints = Math.floor(totalSpent);
      
      if (potentialPoints > 2000) return "platinum";
      if (potentialPoints > 1000) return "gold";
      if (potentialPoints > 500) return "silver";
      return "bronze";
    }
  },
  
  // Analytics across multiple data types
  analytics: {
    getDashboardMetrics: () => {
      const totalCustomers = sampleCustomers.length;
      const totalOrders = sampleOrders.length;
      const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const avgOrderValue = totalRevenue / totalOrders;
      
      return {
        totalCustomers,
        totalOrders,
        totalRevenue,
        avgOrderValue
      };
    },
    getCustomerRetentionMetrics: () => {
      // Group customers by order count
      const oneTimeCustomers = sampleCustomers.filter(c => c.orderCount === 1).length;
      const repeatCustomers = sampleCustomers.filter(c => c.orderCount > 1).length;
      
      return {
        oneTimeCustomers,
        repeatCustomers,
        retentionRate: repeatCustomers / (oneTimeCustomers + repeatCustomers)
      };
    },
    getCampaignEffectiveness: () => {
      // Calculate overall campaign metrics
      let totalDelivered = 0;
      let totalOpened = 0;
      
      sampleCampaigns.forEach(campaign => {
        if (campaign.reportData) {
          totalDelivered += campaign.reportData.deliveredCount;
          totalOpened += campaign.reportData.openedCount;
        }
      });
      
      return {
        totalCampaigns: sampleCampaigns.length,
        averageOpenRate: totalOpened / totalDelivered,
        campaignsByType: {
          email: sampleCampaigns.filter(c => c.type === 'email').length,
          sms: sampleCampaigns.filter(c => c.type === 'sms').length,
          whatsapp: sampleCampaigns.filter(c => c.type === 'whatsapp').length,
          paid: sampleCampaigns.filter(c => c.type === 'paid').length
        }
      };
    },
    // Add new method for loyalty analytics
    getLoyaltyAnalytics: () => {
      const memberCount = sampleLoyaltyMembers.length;
      const totalIssuedPoints = sampleLoyaltyMembers.reduce((sum, member) => sum + member.totalEarnedPoints, 0);
      const totalRedeemedPoints = sampleLoyaltyMembers.reduce((sum, member) => sum + member.totalRedeemedPoints, 0);
      
      // Calculate redemption rate
      const redemptionRate = totalRedeemedPoints / totalIssuedPoints;
      
      // Calculate average points per member
      const averagePointsPerMember = totalIssuedPoints / memberCount;
      
      // Find top rewards by redemption count
      const topRewards = [...sampleLoyaltyRewards]
        .sort((a, b) => b.redemptionCount - a.redemptionCount)
        .slice(0, 5);
      
      // Monthly new enrollments (simulated)
      const monthlyEnrollments = Array.from({ length: 6 }, (_, i) => {
        const month = new Date();
        month.setMonth(month.getMonth() - i);
        const monthName = month.toLocaleString('default', { month: 'short' });
        
        // Calculate enrollments for this month (simulated)
        const enrollmentCount = Math.floor(memberCount * (0.1 + Math.random() * 0.05) / (i + 1));
        
        return {
          month: monthName,
          enrollments: enrollmentCount
        };
      }).reverse();
      
      // Connect loyalty with sales data
      const loyaltyImpactOnSales = {
        averageOrderValueLoyalty: 45.6, // simulated
        averageOrderValueNonLoyalty: 32.2, // simulated
        purchaseFrequencyLoyalty: 2.3, // times per month
        purchaseFrequencyNonLoyalty: 1.2 // times per month
      };
      
      return {
        memberCount,
        totalIssuedPoints,
        totalRedeemedPoints,
        redemptionRate,
        averagePointsPerMember,
        membersByTier: {
          bronze: sampleLoyaltyMembers.filter(m => m.tier === "bronze").length,
          silver: sampleLoyaltyMembers.filter(m => m.tier === "silver").length,
          gold: sampleLoyaltyMembers.filter(m => m.tier === "gold").length,
          platinum: sampleLoyaltyMembers.filter(m => m.tier === "platinum").length,
        },
        topRewards,
        monthlyEnrollments,
        loyaltyImpactOnSales,
        rewardRedemptionsByCategory: {
          discount: sampleLoyaltyRewards
            .filter(r => r.category === "discount")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
          freebie: sampleLoyaltyRewards
            .filter(r => r.category === "freebie")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
          exclusive: sampleLoyaltyRewards
            .filter(r => r.category === "exclusive")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
          experience: sampleLoyaltyRewards
            .filter(r => r.category === "experience")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
        }
      };
    }
  }
};

// Export default instance
export default DataConnector;
