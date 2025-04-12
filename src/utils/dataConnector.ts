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

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  active: boolean;
}

const sampleStores: Store[] = [
  {
    id: 'store-1',
    name: 'Downtown Location',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
    active: true
  },
  {
    id: 'store-2',
    name: 'Uptown Location',
    address: '456 High St, Uptown',
    phone: '(555) 987-6543',
    active: true
  },
  {
    id: 'store-3',
    name: 'Westside Branch',
    address: '789 West Ave, Westside',
    phone: '(555) 567-8901',
    active: true
  }
];

sampleOrders.forEach(order => {
  const storeIndex = Math.floor(Math.random() * sampleStores.length);
  (order as any).storeId = sampleStores[storeIndex].id;
});

export const DataConnector = {
  stores: {
    getAll: (): Store[] => sampleStores,
    getById: (id: string): Store | undefined => sampleStores.find(s => s.id === id),
    getActive: (): Store[] => sampleStores.filter(s => s.active)
  },
  
  customers: {
    getAll: (storeIds?: string[]): Customer[] => {
      if (!storeIds || storeIds.length === 0) {
        return sampleCustomers;
      }
      
      return sampleCustomers.filter(customer => {
        const customerIdNum = parseInt(customer.id.replace(/\D/g, '') || '0', 10);
        const assignedStoreId = sampleStores[customerIdNum % sampleStores.length].id;
        return storeIds.includes(assignedStoreId);
      });
    },
    getById: (id: string): Customer | undefined => sampleCustomers.find(c => c.id === id),
    getVip: (storeIds?: string[]) => {
      const customers = DataConnector.customers.getAll(storeIds);
      return customers.filter(c => c.totalSpent > 1000);
    },
    getRegular: (storeIds?: string[]) => {
      const customers = DataConnector.customers.getAll(storeIds);
      return customers.filter(c => c.totalSpent >= 500 && c.totalSpent <= 1000);
    },
    getNew: (storeIds?: string[]) => {
      const customers = DataConnector.customers.getAll(storeIds);
      return customers.filter(c => c.orderCount <= 3);
    },
    getOrderHistory: (customerId: string, storeIds?: string[]) => {
      let orders = sampleOrders.filter(order => order.customer.id === customerId);
      
      if (storeIds && storeIds.length > 0) {
        orders = orders.filter(order => storeIds.includes((order as any).storeId));
      }
      
      return orders;
    },
    getSpendingAnalytics: (customerId: string, storeIds?: string[]) => {
      let customerOrders = sampleOrders.filter(order => order.customer.id === customerId);
      
      if (storeIds && storeIds.length > 0) {
        customerOrders = customerOrders.filter(order => storeIds.includes((order as any).storeId));
      }
      
      const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      const averageOrderValue = customerOrders.length > 0 
        ? totalSpent / customerOrders.length 
        : 0;
      
      const spendingByCategory: Record<string, number> = {};
      
      customerOrders.forEach(order => {
        order.items.forEach(item => {
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
      const customer = sampleCustomers.find(c => c.id === customerId);
      if (!customer) return [];
      
      const potentialCoupons = getActiveCoupons();
      const usedCouponCount = Math.min(customer.orderCount / 3, potentialCoupons.length);
      
      return potentialCoupons.slice(0, usedCouponCount);
    },
    getAppliedCampaigns: (customerId: string) => {
      return sampleCampaigns
        .filter(campaign => campaign.status === "completed" || campaign.status === "active")
        .filter(() => Math.random() > 0.7);
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
  
  menu: {
    getItems: (storeIds?: string[]): MenuItem[] => {
      if (!storeIds || storeIds.length === 0) {
        return sampleMenuItems;
      }
      
      return sampleMenuItems.filter(item => {
        const itemIdNum = parseInt(item.id.replace(/\D/g, '') || '0', 10);
        return itemIdNum % 5 !== storeIds.length % 3;
      });
    },
    getItemById: (id: string): MenuItem | undefined => 
      sampleMenuItems.find(item => item.id === id),
    getCategories: (): MenuCategory[] => sampleCategories,
    getCategoryById: (id: string): MenuCategory | undefined =>
      sampleCategories.find(cat => cat.id === id),
    getItemsByCategory: (categoryId: string, storeIds?: string[]): MenuItem[] => {
      let items = sampleMenuItems.filter(item => item.category === categoryId);
      
      if (storeIds && storeIds.length > 0) {
        items = items.filter(item => {
          const itemIdNum = parseInt(item.id.replace(/\D/g, '') || '0', 10);
          return itemIdNum % 5 !== storeIds.length % 3;
        });
      }
      
      return items;
    },
    getPopularItems: (limit: number = 5, storeIds?: string[]): MenuItem[] => {
      let items = DataConnector.menu.getItems(storeIds);
      
      return [...items]
        .sort((a, b) => {
          const priceA = a.prices.delivery || 0;
          const priceB = b.prices.delivery || 0;
          return priceB - priceA;
        })
        .slice(0, limit);
    },
    getMostOrderedItems: (limit: number = 5, storeIds?: string[]) => {
      const itemCounts = new Map<string, { item: MenuItem; orderCount: number }>();
      
      let filteredOrders = sampleOrders;
      if (storeIds && storeIds.length > 0) {
        filteredOrders = filteredOrders.filter(order => storeIds.includes((order as any).storeId));
      }
      
      filteredOrders.forEach(order => {
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
      
      return Array.from(itemCounts.values())
        .sort((a, b) => b.orderCount - a.orderCount)
        .slice(0, limit);
    }
  },
  
  orders: {
    getAll: (storeIds?: string[]): Order[] => {
      if (!storeIds || storeIds.length === 0) {
        return sampleOrders;
      }
      
      return sampleOrders.filter(order => storeIds.includes((order as any).storeId));
    },
    getById: (id: string): Order | undefined => sampleOrders.find(order => order.id === id),
    getByStatus: (status: OrderStatus, storeIds?: string[]) => {
      let orders = getOrdersByStatus(status);
      
      if (storeIds && storeIds.length > 0) {
        orders = orders.filter(order => storeIds.includes((order as any).storeId));
      }
      
      return orders;
    },
    getByCustomer: (customerId: string, storeIds?: string[]) => {
      let orders = getOrdersByCustomer(customerId);
      
      if (storeIds && storeIds.length > 0) {
        orders = orders.filter(order => storeIds.includes((order as any).storeId));
      }
      
      return orders;
    },
    getOrderWithMenuDetails: (orderId: string) => {
      const order = sampleOrders.find(o => o.id === orderId);
      if (!order) return null;
      
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
    getPopularTimeSlots: (storeIds?: string[]) => {
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
      
      let filteredOrders = sampleOrders;
      if (storeIds && storeIds.length > 0) {
        filteredOrders = filteredOrders.filter(order => storeIds.includes((order as any).storeId));
      }
      
      filteredOrders.forEach(order => {
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
  
  campaigns: {
    getAll: (storeIds?: string[]): CampaignData[] => {
      if (!storeIds || storeIds.length === 0) {
        return sampleCampaigns;
      }
      
      return sampleCampaigns.filter(campaign => {
        const campaignIdNum = parseInt(campaign.id.replace(/\D/g, '') || '0', 10);
        return campaignIdNum % sampleStores.length === storeIds.length % sampleStores.length;
      });
    },
    getById: (id: string): CampaignData | undefined => 
      sampleCampaigns.find(campaign => campaign.id === id),
    getByType: (type: string, storeIds?: string[]): CampaignData[] => {
      let campaigns = sampleCampaigns.filter(campaign => campaign.type === type);
      
      if (storeIds && storeIds.length > 0) {
        campaigns = campaigns.filter(campaign => {
          const campaignIdNum = parseInt(campaign.id.replace(/\D/g, '') || '0', 10);
          return campaignIdNum % sampleStores.length === storeIds.length % sampleStores.length;
        });
      }
      
      return campaigns;
    },
    getByStatus: (status: string, storeIds?: string[]): CampaignData[] => {
      let campaigns = sampleCampaigns.filter(campaign => campaign.status === status);
      
      if (storeIds && storeIds.length > 0) {
        campaigns = campaigns.filter(campaign => {
          const campaignIdNum = parseInt(campaign.id.replace(/\D/g, '') || '0', 10);
          return campaignIdNum % sampleStores.length === storeIds.length % sampleStores.length;
        });
      }
      
      return campaigns;
    },
    getRelatedCoupons: (campaignId: string): Coupon[] => {
      const campaign = sampleCampaigns.find(c => c.id === campaignId);
      if (!campaign) return [];
      
      return sampleCouponData
        .filter(() => Math.random() > 0.7)
        .slice(0, 3);
    },
    getTargetCustomers: (campaignId: string): Customer[] => {
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
  
  coupons: {
    getAll: (storeIds?: string[]): Coupon[] => {
      if (!storeIds || storeIds.length === 0) {
        return sampleCouponData;
      }
      
      return sampleCouponData.filter((coupon, index) => index % sampleStores.length < storeIds.length);
    },
    getById: (id: string): Coupon | undefined => 
      sampleCouponData.find(coupon => coupon.id === id),
    getActive: (storeIds?: string[]) => {
      let coupons = getActiveCoupons();
      
      if (storeIds && storeIds.length > 0) {
        coupons = coupons.filter((coupon, index) => index % sampleStores.length < storeIds.length);
      }
      
      return coupons;
    },
    getByCode: (code: string): Coupon | undefined =>
      sampleCouponData.find(coupon => coupon.code === code),
    getRelatedCampaigns: (couponId: string): CampaignData[] => {
      const coupon = sampleCouponData.find(c => c.id === couponId);
      if (!coupon) return [];
      
      return sampleCampaigns
        .filter(() => Math.random() > 0.7)
        .slice(0, 2);
    },
    getCouponUsageAnalytics: (couponId: string, storeIds?: string[]) => {
      const coupon = sampleCouponData.find(c => c.id === couponId);
      if (!coupon) return null;
      
      let totalUsage = Math.floor(Math.random() * 100) + 10;
      
      if (storeIds && storeIds.length > 0) {
        totalUsage = Math.floor(totalUsage * (storeIds.length / sampleStores.length));
      }
      
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
  
  loyalty: {
    getAllMembers: (storeIds?: string[]): LoyaltyMember[] => {
      if (!storeIds || storeIds.length === 0) {
        return sampleLoyaltyMembers;
      }
      
      return sampleLoyaltyMembers.filter(member => {
        const memberIdNum = parseInt(member.id.replace(/\D/g, '') || '0', 10);
        return memberIdNum % sampleStores.length < storeIds.length;
      });
    },
    getMemberById: (id: string): LoyaltyMember | undefined => 
      sampleLoyaltyMembers.find(member => member.id === id),
    getMemberByCustomerId: (customerId: string): LoyaltyMember | undefined =>
      sampleLoyaltyMembers.find(member => member.customerId === customerId),
    getRewards: (): LoyaltyReward[] => sampleLoyaltyRewards,
    getActiveRewards: (storeIds?: string[]): LoyaltyReward[] => {
      let rewards = sampleLoyaltyRewards.filter(reward => reward.active);
      
      if (storeIds && storeIds.length > 0) {
        rewards = rewards.filter((reward, index) => index % sampleStores.length < storeIds.length);
      }
      
      return rewards;
    },
    getTransactions: (storeIds?: string[]): PointTransaction[] => {
      if (!storeIds || storeIds.length === 0) {
        return samplePointTransactions;
      }
      
      return samplePointTransactions.filter(tx => {
        const txNum = parseInt(tx.id.replace(/\D/g, '') || '0', 10);
        return txNum % sampleStores.length < storeIds.length;
      });
    },
    getTransactionsByCustomer: (customerId: string): PointTransaction[] =>
      samplePointTransactions.filter(tx => tx.customerId === customerId),
    getMemberTransactions: (memberId: string): PointTransaction[] => {
      const member = sampleLoyaltyMembers.find(m => m.id === memberId);
      if (!member) return [];
      return samplePointTransactions.filter(tx => tx.customerId === member.customerId);
    },
    getRewardById: (id: string): LoyaltyReward | undefined =>
      sampleLoyaltyRewards.find(reward => reward.id === id),
    getMembersByTier: (tier: "bronze" | "silver" | "gold" | "platinum", storeIds?: string[]): LoyaltyMember[] => {
      let members = sampleLoyaltyMembers.filter(member => member.tier === tier);
      
      if (storeIds && storeIds.length > 0) {
        members = members.filter(member => {
          const memberIdNum = parseInt(member.id.replace(/\D/g, '') || '0', 10);
          return memberIdNum % sampleStores.length < storeIds.length;
        });
      }
      
      return members;
    },
    getActiveMembersLastMonth: (storeIds?: string[]): LoyaltyMember[] => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      let members = sampleLoyaltyMembers.filter(
        member => member.lastActivityDate >= thirtyDaysAgo
      );
      
      if (storeIds && storeIds.length > 0) {
        members = members.filter(member => {
          const memberIdNum = parseInt(member.id.replace(/\D/g, '') || '0', 10);
          return memberIdNum % sampleStores.length < storeIds.length;
        });
      }
      
      return members;
    },
    calculatePotentialTierForCustomer: (customerId: string): "bronze" | "silver" | "gold" | "platinum" | null => {
      const customer = sampleCustomers.find(c => c.id === customerId);
      if (!customer) return null;
      
      const customerOrders = sampleOrders.filter(order => order.customer.id === customerId);
      const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      const potentialPoints = Math.floor(totalSpent);
      
      if (potentialPoints > 2000) return "platinum";
      if (potentialPoints > 1000) return "gold";
      if (potentialPoints > 500) return "silver";
      return "bronze";
    }
  },
  
  analytics: {
    getDashboardMetrics: (storeIds?: string[]) => {
      let filteredOrders = sampleOrders;
      let filteredCustomers = sampleCustomers;
      
      if (storeIds && storeIds.length > 0) {
        filteredOrders = filteredOrders.filter(order => storeIds.includes((order as any).storeId));
        
        filteredCustomers = filteredCustomers.filter(customer => {
          const customerIdNum = parseInt(customer.id.replace(/\D/g, '') || '0', 10);
          const assignedStoreId = sampleStores[customerIdNum % sampleStores.length].id;
          return storeIds.includes(assignedStoreId);
        });
      }
      
      const totalCustomers = filteredCustomers.length;
      const totalOrders = filteredOrders.length;
      const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const avgOrderValue = totalRevenue / totalOrders;
      
      return {
        totalCustomers,
        totalOrders,
        totalRevenue,
        avgOrderValue
      };
    },
    getCustomerRetentionMetrics: (storeIds?: string[]) => {
      let filteredCustomers = sampleCustomers;
      
      if (storeIds && storeIds.length > 0) {
        filteredCustomers = filteredCustomers.filter(customer => {
          const customerIdNum = parseInt(customer.id.replace(/\D/g, '') || '0', 10);
          const assignedStoreId = sampleStores[customerIdNum % sampleStores.length].id;
          return storeIds.includes(assignedStoreId);
        });
      }
      
      const oneTimeCustomers = filteredCustomers.filter(c => c.orderCount === 1).length;
      const repeatCustomers = filteredCustomers.filter(c => c.orderCount > 1).length;
      
      return {
        oneTimeCustomers,
        repeatCustomers,
        retentionRate: repeatCustomers / (oneTimeCustomers + repeatCustomers)
      };
    },
    getCampaignEffectiveness: (storeIds?: string[]) => {
      let filteredCampaigns = sampleCampaigns;
      
      if (storeIds && storeIds.length > 0) {
        filteredCampaigns = filteredCampaigns.filter(campaign => {
          const campaignIdNum = parseInt(campaign.id.replace(/\D/g, '') || '0', 10);
          return campaignIdNum % sampleStores.length === storeIds.length % sampleStores.length;
        });
      }
      
      let totalDelivered = 0;
      let totalOpened = 0;
      
      filteredCampaigns.forEach(campaign => {
        if (campaign.reportData) {
          totalDelivered += campaign.reportData.deliveredCount;
          totalOpened += campaign.reportData.openedCount;
        }
      });
      
      return {
        totalCampaigns: filteredCampaigns.length,
        averageOpenRate: totalOpened / totalDelivered,
        campaignsByType: {
          email: filteredCampaigns.filter(c => c.type === 'email').length,
          sms: filteredCampaigns.filter(c => c.type === 'sms').length,
          whatsapp: filteredCampaigns.filter(c => c.type === 'whatsapp').length,
          paid: filteredCampaigns.filter(c => c.type === 'paid').length
        }
      };
    },
    getLoyaltyAnalytics: (storeIds?: string[]) => {
      let filteredMembers = sampleLoyaltyMembers;
      let filteredRewards = sampleLoyaltyRewards;
      
      if (storeIds && storeIds.length > 0) {
        filteredMembers = filteredMembers.filter(member => {
          const memberIdNum = parseInt(member.id.replace(/\D/g, '') || '0', 10);
          return memberIdNum % sampleStores.length < storeIds.length;
        });
        
        filteredRewards = filteredRewards.filter((reward, index) => 
          index % sampleStores.length < storeIds.length);
      }
      
      const memberCount = filteredMembers.length;
      const totalIssuedPoints = filteredMembers.reduce((sum, member) => sum + member.totalEarnedPoints, 0);
      const totalRedeemedPoints = filteredMembers.reduce((sum, member) => sum + member.totalRedeemedPoints, 0);
      
      const redemptionRate = totalRedeemedPoints / totalIssuedPoints;
      
      const averagePointsPerMember = totalIssuedPoints / memberCount;
      
      const topRewards = [...filteredRewards]
        .sort((a, b) => b.redemptionCount - a.redemptionCount)
        .slice(0, 5);
      
      const monthlyEnrollments = Array.from({ length: 6 }, (_, i) => {
        const month = new Date();
        month.setMonth(month.getMonth() - i);
        const monthName = month.toLocaleString('default', { month: 'short' });
        
        const enrollmentCount = Math.floor(memberCount * (0.1 + Math.random() * 0.05) / (i + 1));
        
        return {
          month: monthName,
          enrollments: enrollmentCount
        };
      }).reverse();
      
      const loyaltyImpactOnSales = {
        averageOrderValueLoyalty: 45.6,
        averageOrderValueNonLoyalty: 32.2,
        purchaseFrequencyLoyalty: 2.3,
        purchaseFrequencyNonLoyalty: 1.2
      };
      
      return {
        memberCount,
        totalIssuedPoints,
        totalRedeemedPoints,
        redemptionRate,
        averagePointsPerMember,
        membersByTier: {
          bronze: filteredMembers.filter(m => m.tier === "bronze").length,
          silver: filteredMembers.filter(m => m.tier === "silver").length,
          gold: filteredMembers.filter(m => m.tier === "gold").length,
          platinum: filteredMembers.filter(m => m.tier === "platinum").length,
        },
        topRewards,
        monthlyEnrollments,
        loyaltyImpactOnSales,
        rewardRedemptionsByCategory: {
          discount: filteredRewards
            .filter(r => r.category === "discount")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
          freebie: filteredRewards
            .filter(r => r.category === "freebie")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
          exclusive: filteredRewards
            .filter(r => r.category === "exclusive")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
          experience: filteredRewards
            .filter(r => r.category === "experience")
            .reduce((sum, r) => sum + r.redemptionCount, 0),
        }
      };
    },
    
    getStoreComparison: () => {
      return sampleStores.map(store => {
        const storeIdNum = parseInt(store.id.replace(/\D/g, '') || '0', 10);
        const baseRevenue = 10000 + (storeIdNum * 2500);
        const baseOrders = 500 + (storeIdNum * 120);
        
        return {
          storeId: store.id,
          storeName: store.name,
          metrics: {
            revenue: baseRevenue + Math.floor(Math.random() * 1000),
            orders: baseOrders + Math.floor(Math.random() * 50),
            averageOrderValue: (baseRevenue / baseOrders) + Math.random() * 5,
            topSellingItems: sampleMenuItems
              .slice(storeIdNum, storeIdNum + 3)
              .map(item => ({ 
                name: item.name, 
                sales: Math.floor(Math.random() * 100) + 50 
              })),
            customerRetentionRate: 0.65 + (Math.random() * 0.2)
          }
        };
      });
    }
  }
};

export default DataConnector;
