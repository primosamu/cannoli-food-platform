
import { sampleCustomers } from "./sampleCustomers";
import { sampleOrders } from "./sampleOrders";
import { randomInt, randomItem, randomBool, randomPastDate } from "@/utils/dataGenerationUtils";

export interface LoyaltyMember {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  enrollmentDate: Date;
  currentPoints: number;
  totalEarnedPoints: number;
  totalRedeemedPoints: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  lastActivityDate: Date;
  pointsToNextTier: number;
  pointExpiryDate: Date;
  referralCount: number;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointCost: number;
  active: boolean;
  category: "discount" | "freebie" | "exclusive" | "experience";
  limitedTime: boolean;
  expiryDate?: Date;
  redemptionCount: number;
  availableQuantity?: number;
  imageUrl?: string;
}

export interface PointTransaction {
  id: string;
  customerId: string;
  customerName: string;
  transactionType: "earn" | "redeem" | "expire" | "adjustment" | "referral";
  points: number;
  orderId?: string;
  rewardId?: string;
  createdAt: Date;
  description: string;
}

// Generate loyalty members based on existing customers
const generateLoyaltyMembers = (): LoyaltyMember[] => {
  // Only select a subset of customers for the loyalty program (about 60%)
  return sampleCustomers
    .filter(() => randomBool(0.6))
    .map((customer) => {
      // Calculate points based on customer's order history
      const customerOrders = sampleOrders.filter(order => order.customer.id === customer.id);
      const totalSpent = customerOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      // Earn 1 point per dollar spent, with some adjustments for randomness
      const totalEarnedPoints = Math.floor(totalSpent * (0.9 + Math.random() * 0.4));
      const redeemedPoints = Math.floor(totalEarnedPoints * (Math.random() * 0.7)); // They've used up to 70% of points
      const currentPoints = totalEarnedPoints - redeemedPoints;
      
      // Determine tier based on total earned points
      let tier: "bronze" | "silver" | "gold" | "platinum";
      if (totalEarnedPoints > 2000) tier = "platinum";
      else if (totalEarnedPoints > 1000) tier = "gold";
      else if (totalEarnedPoints > 500) tier = "silver";
      else tier = "bronze";
      
      // Calculate points needed for next tier
      let pointsToNextTier: number;
      switch (tier) {
        case "platinum": pointsToNextTier = 0; break; // Already at highest tier
        case "gold": pointsToNextTier = 2000 - totalEarnedPoints; break;
        case "silver": pointsToNextTier = 1000 - totalEarnedPoints; break;
        default: pointsToNextTier = 500 - totalEarnedPoints; break;
      }
      
      // Find enrollment date (between customer join date and now)
      const enrollmentDate = new Date(
        customer.joinDate.getTime() + 
        Math.random() * (Date.now() - customer.joinDate.getTime())
      );
      
      // Set last activity date to the most recent order or a random date if no orders
      const lastOrderDate = customerOrders.length > 0 
        ? customerOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt
        : randomPastDate(60); 
      
      const pointExpiryDate = new Date();
      pointExpiryDate.setFullYear(pointExpiryDate.getFullYear() + 1); // Points expire in 1 year
      
      return {
        id: `loyalty_${customer.id}`,
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        enrollmentDate,
        currentPoints,
        totalEarnedPoints,
        totalRedeemedPoints: redeemedPoints,
        tier,
        lastActivityDate: lastOrderDate,
        pointsToNextTier,
        pointExpiryDate,
        referralCount: Math.floor(Math.random() * 5) // 0-4 referrals
      };
    });
};

// Generate loyalty rewards
const generateLoyaltyRewards = (): LoyaltyReward[] => {
  const rewards: LoyaltyReward[] = [
    {
      id: "reward_1",
      name: "Sobremesa Grátis",
      description: "Resgate para qualquer sobremesa à sua escolha",
      pointCost: 250,
      active: true,
      category: "freebie",
      limitedTime: false,
      redemptionCount: 87,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "reward_2",
      name: "10% de Desconto",
      description: "10% de desconto no seu próximo pedido",
      pointCost: 350,
      active: true,
      category: "discount",
      limitedTime: false,
      redemptionCount: 142,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "reward_3",
      name: "Entrega Grátis",
      description: "Resgate para entrega gratuita no seu próximo pedido",
      pointCost: 200,
      active: true,
      category: "discount",
      limitedTime: false,
      redemptionCount: 215,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "reward_4",
      name: "Experiência Mesa do Chef",
      description: "Jantar exclusivo com nosso chef para você e um convidado",
      pointCost: 2000,
      active: true,
      category: "experience",
      limitedTime: true,
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      redemptionCount: 5,
      availableQuantity: 3,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "reward_5",
      name: "Compre Um Leve Dois",
      description: "Prato principal grátis de valor igual ou menor",
      pointCost: 500,
      active: true,
      category: "freebie",
      limitedTime: false,
      redemptionCount: 63,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "reward_6",
      name: "Reserva Prioritária",
      description: "Pule a lista de espera para reservas",
      pointCost: 300,
      active: true,
      category: "exclusive",
      limitedTime: false,
      redemptionCount: 29,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "reward_7",
      name: "Especial de Aniversário",
      description: "Garrafa de vinho cortesia no seu aniversário",
      pointCost: 400,
      active: true,
      category: "exclusive",
      limitedTime: false,
      redemptionCount: 18,
      imageUrl: "/placeholder.svg"
    },
    {
      id: "reward_8",
      name: "Final de Semana de Pontos Duplos",
      description: "Ganhe 2x pontos em todas as compras neste final de semana",
      pointCost: 600,
      active: false, // Currently inactive
      category: "exclusive",
      limitedTime: true,
      expiryDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // Expired 15 days ago
      redemptionCount: 42,
      imageUrl: "/placeholder.svg"
    }
  ];
  
  return rewards;
};

// Generate point transactions based on loyalty members and rewards
const generatePointTransactions = (members: LoyaltyMember[], rewards: LoyaltyReward[]): PointTransaction[] => {
  const transactions: PointTransaction[] = [];
  
  // Generate earn transactions based on orders
  sampleOrders.forEach(order => {
    // Find if the customer is a loyalty member
    const member = members.find(m => m.customerId === order.customer.id);
    if (!member) return;
    
    // Only generate points for completed orders
    if (order.status === "completed") {
      // Points earned are roughly 1 per dollar spent with some variance
      const points = Math.floor(order.totalAmount * (0.9 + Math.random() * 0.3));
      
      transactions.push({
        id: `tx_earn_${order.id}`,
        customerId: member.customerId,
        customerName: member.customerName,
        transactionType: "earn",
        points,
        orderId: order.id,
        createdAt: new Date(order.createdAt.getTime() + 5 * 60 * 1000), // 5 minutes after order
        description: `Pontos ganhos pelo Pedido #${order.orderNumber}`
      });
    }
  });
  
  // Generate redeem transactions for random rewards
  members.forEach(member => {
    // Skip members with few points
    if (member.totalEarnedPoints < 300) return;
    
    // Determine how many reward redemptions this member has made
    const redeemCount = Math.floor(Math.random() * Math.min(5, member.totalRedeemedPoints / 200));
    
    for (let i = 0; i < redeemCount; i++) {
      const reward = randomItem(rewards);
      
      // Skip if the reward costs more than what the member has redeemed in total
      if (reward.pointCost > member.totalRedeemedPoints) continue;
      
      transactions.push({
        id: `tx_redeem_${member.id}_${i}`,
        customerId: member.customerId,
        customerName: member.customerName,
        transactionType: "redeem",
        points: -reward.pointCost, // Negative points for redemption
        rewardId: reward.id,
        createdAt: randomPastDate(180), // Within the last 6 months
        description: `Resgatou ${reward.name}`
      });
    }
  });
  
  // Generate some expiry transactions
  members.forEach(member => {
    // Only some members have had points expire
    if (randomBool(0.2)) {
      const expiredPoints = randomInt(50, 200);
      
      transactions.push({
        id: `tx_expire_${member.id}`,
        customerId: member.customerId,
        customerName: member.customerName,
        transactionType: "expire",
        points: -expiredPoints, // Negative points for expiry
        createdAt: randomPastDate(150),
        description: "Pontos expirados"
      });
    }
  });
  
  // Generate referral bonuses
  members.forEach(member => {
    for (let i = 0; i < member.referralCount; i++) {
      transactions.push({
        id: `tx_ref_${member.id}_${i}`,
        customerId: member.customerId,
        customerName: member.customerName,
        transactionType: "referral",
        points: 100, // 100 points per referral
        createdAt: randomPastDate(200),
        description: "Bônus de indicação"
      });
    }
  });
  
  // Sort transactions by date, newest first
  return transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Generate all loyalty data
export const sampleLoyaltyMembers = generateLoyaltyMembers();
export const sampleLoyaltyRewards = generateLoyaltyRewards();
export const samplePointTransactions = generatePointTransactions(sampleLoyaltyMembers, sampleLoyaltyRewards);

// Calculate program statistics
export const loyaltyProgramStats = {
  totalMembers: sampleLoyaltyMembers.length,
  activeMembers: sampleLoyaltyMembers.filter(m => 
    m.lastActivityDate.getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000 // Active in last 30 days
  ).length,
  totalPointsIssued: sampleLoyaltyMembers.reduce((sum, member) => sum + member.totalEarnedPoints, 0),
  totalPointsRedeemed: sampleLoyaltyMembers.reduce((sum, member) => sum + member.totalRedeemedPoints, 0),
  averagePointsPerMember: Math.floor(
    sampleLoyaltyMembers.reduce((sum, member) => sum + member.currentPoints, 0) / 
    sampleLoyaltyMembers.length
  ),
  membersByTier: {
    bronze: sampleLoyaltyMembers.filter(m => m.tier === "bronze").length,
    silver: sampleLoyaltyMembers.filter(m => m.tier === "silver").length,
    gold: sampleLoyaltyMembers.filter(m => m.tier === "gold").length,
    platinum: sampleLoyaltyMembers.filter(m => m.tier === "platinum").length
  },
  mostRedeemedReward: sampleLoyaltyRewards.reduce((prev, current) => 
    prev.redemptionCount > current.redemptionCount ? prev : current
  ),
  rewardsClaimedThisMonth: samplePointTransactions
    .filter(tx => 
      tx.transactionType === "redeem" && 
      tx.createdAt.getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    ).length
};

// Helper functions
export const getMembersByTier = (tier: "bronze" | "silver" | "gold" | "platinum") => 
  sampleLoyaltyMembers.filter(m => m.tier === tier);

export const getTransactionsByCustomer = (customerId: string) => 
  samplePointTransactions.filter(tx => tx.customerId === customerId);

export const getActiveLoyaltyRewards = () => 
  sampleLoyaltyRewards.filter(r => r.active);

export const getTopLoyaltyMembers = (limit: number = 10) =>
  [...sampleLoyaltyMembers]
    .sort((a, b) => b.totalEarnedPoints - a.totalEarnedPoints)
    .slice(0, limit);
