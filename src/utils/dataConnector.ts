import { sampleCustomers, getVipCustomers, getRegularCustomers, getNewCustomers } from "@/data/sampleCustomers";
import { sampleOrders, getOrdersByCustomer, getOrdersByStatus } from "@/data/sampleOrders";
import { sampleMenuItems, sampleCategories } from "@/data/sampleMenuData";
import { sampleCampaigns } from "@/data/sampleCampaigns";
import { sampleCouponData, getActiveCoupons } from "@/components/coupons/CouponSchema";
import { sampleLoyaltyMembers, sampleLoyaltyRewards, samplePointTransactions, getTransactionsByCustomer } from "@/data/sampleLoyaltyData";
import { MenuItem, MenuCategory } from "@/types/menu";
import { Order } from "@/types/order";
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
    // ... keep existing code (getAll, getById, getVip, getRegular, getNew, getOrderHistory, getSpendingAnalytics)
    
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
    // ... keep existing code
  },
  
  // Order data access
  orders: {
    // ... keep existing code
  },
  
  // Campaign data access
  campaigns: {
    // ... keep existing code
  },
  
  // Coupon data access
  coupons: {
    // ... keep existing code
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
    // ... keep existing code (getDashboardMetrics, getCustomerRetentionMetrics, getCampaignEffectiveness)
    
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
