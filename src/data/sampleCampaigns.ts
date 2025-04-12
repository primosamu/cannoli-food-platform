
import { CampaignData, CampaignType, CampaignReportData } from "@/types/campaign";
import { sampleCustomers } from "./sampleCustomers";
import { sampleMenuItems } from "./sampleMenuData";
import { sampleCouponData } from "@/components/coupons/CouponSchema";
import { randomInt, randomItem, randomBool, randomPastDate, randomFutureDate } from "@/utils/dataGenerationUtils";

// Campaign templates for different types
const campaignTemplates = {
  whatsapp: [
    "Hello {{name}}! 🌞 Enjoy our summer specials with 20% off on all menu items this weekend. Use code {{code}}!",
    "Hi {{name}}! 🍕 Missing your favorite dishes? Come back and get {{discount}}% off your next order with code {{code}}",
    "{{name}}, we have a special offer just for you! Use code {{code}} for a free dessert with any main course purchase.",
    "Weekend special alert! {{name}}, order today with code {{code}} and get free delivery on orders over $30."
  ],
  email: [
    "<h1>Weekly Specials</h1><p>Dear {{name}}, Check out our chef's recommendations for this week!</p>",
    "<h1>We Miss You!</h1><p>Dear {{name}}, It's been a while! Here's {{discount}}% off your next visit with code {{code}}.</p>",
    "<h1>{{name}}, A Special Birthday Gift!</h1><p>Celebrate with us and enjoy a complimentary dessert with code {{code}}.</p>",
    "<h1>New Menu Alert</h1><p>{{name}}, be the first to try our seasonal menu. Use code {{code}} for 15% off.</p>"
  ],
  sms: [
    "{{name}}, Flash sale! {{discount}}% off all desserts this weekend at Restaurant Name. Use code {{code}} to redeem.",
    "We miss you {{name}}! Come back & enjoy 15% off with code {{code}} valid until tomorrow. Restaurant Name",
    "{{name}}, Happy Hour alert! 2 for 1 drinks today 4-7pm. Show this SMS to redeem. Restaurant Name",
    "{{name}}, Your loyalty points are about to expire! Use them by {{expiryDate}} or redeem code {{code}} for extension."
  ],
  paid: [
    "Try our exciting new menu items! Available from {{startDate}}. Use promo {{code}} for 10% off your first order.",
    "Craving something delicious? Order now and get {{discount}}% off with code {{code}}!",
    "The perfect meal for your weekend! Order now with code {{code}} for special pricing.",
    "New in town? Try our local favorites with {{discount}}% off using code {{code}}!"
  ]
};

// Generate campaign performance metrics
const generateCampaignReportData = (recipientCount: number): CampaignReportData => {
  // Calculate reasonable metrics
  const deliveredCount = Math.floor(recipientCount * (0.9 + Math.random() * 0.1)); // 90-100% delivered
  const openedCount = Math.floor(deliveredCount * (0.2 + Math.random() * 0.5)); // 20-70% open rate
  const clickedCount = Math.floor(openedCount * (0.1 + Math.random() * 0.3)); // 10-40% click rate of opens
  const failedCount = recipientCount - deliveredCount;
  const pendingCount = 0; // All already processed in this sample
  
  // Calculate rates
  const deliveryRate = Number((deliveredCount / recipientCount).toFixed(2));
  const openRate = Number((openedCount / deliveredCount).toFixed(2));
  const clickRate = Number((clickedCount / openedCount).toFixed(2));
  
  // Generate failure reasons if any
  const failureReasons = failedCount > 0 ? [
    { reason: "Invalid phone number", count: Math.floor(failedCount * 0.4) },
    { reason: "Unsubscribed", count: Math.floor(failedCount * 0.3) },
    { reason: "Network error", count: Math.floor(failedCount * 0.2) },
    { reason: "Other", count: Math.floor(failedCount * 0.1) }
  ] : [];
  
  // Generate sample customer engagements
  const customerEngagements = sampleCustomers
    .slice(0, openedCount)
    .map((customer, index) => {
      // First few customers clicked, others just opened or were delivered to
      const status = index < clickedCount ? 'clicked' : 
                    index < openedCount ? 'opened' : 'delivered';
      
      return {
        customerId: customer.id,
        customerName: customer.name,
        customerEmail: customer.email,
        status,
        timestamp: new Date(),
        action: status === 'clicked' ? randomItem(['viewed_menu', 'placed_order', 'redeemed_coupon', 'visited_page']) : undefined
      };
    });
  
  // Generate daily delivery data for the past week
  const deliveryByDay = Array.from({ length: 7 }, (_, i) => {
    const dayDelivered = Math.floor(deliveredCount / 7) + (i === 6 ? deliveredCount % 7 : 0);
    const dayFailed = Math.floor(failedCount / 7) + (i === 6 ? failedCount % 7 : 0);
    
    return {
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
      delivered: dayDelivered,
      failed: dayFailed
    };
  });
  
  return {
    totalRecipients: recipientCount,
    deliveredCount,
    openedCount,
    clickedCount,
    failedCount,
    pendingCount,
    deliveryRate,
    openRate,
    clickRate,
    failureReasons,
    customerEngagements,
    deliveryByDay
  };
};

// Generate many campaigns
export const generateCampaigns = (count: number): CampaignData[] => {
  const campaigns: CampaignData[] = [];
  
  // Define segments
  const segments = [
    "all_customers",
    "vip_customers",
    "new_customers",
    "inactive_customers",
    "birthday_month"
  ];
  
  for (let i = 0; i < count; i++) {
    // Select random campaign type
    const type: CampaignType = randomItem(["whatsapp", "sms", "email", "paid"]);
    
    // Create a unique discount percentage and code
    const discount = randomInt(5, 30);
    const coupon = randomItem(sampleCouponData);
    const code = coupon ? coupon.code : `PROMO${randomInt(10, 99)}`;
    
    // Select template and replace placeholders
    const templateText = randomItem(campaignTemplates[type]);
    const content = templateText
      .replace("{{name}}", "{name}") // Keep dynamic
      .replace("{{discount}}", discount.toString())
      .replace("{{code}}", code)
      .replace("{{expiryDate}}", "next week")
      .replace("{{startDate}}", "next Monday");
    
    // Generate realistic dates - some past, some scheduled
    const isPast = randomBool(0.6);
    const createdAt = isPast ? 
      randomPastDate(60) : 
      randomPastDate(10);
    
    const scheduledDate = isPast ? 
      new Date(createdAt.getTime() + randomInt(1, 10) * 24 * 60 * 60 * 1000) : 
      randomFutureDate(30);
    
    const updatedAt = new Date(createdAt.getTime() + randomInt(0, 3) * 24 * 60 * 60 * 1000);
    
    // Determine status based on dates
    const now = new Date();
    let status: "draft" | "scheduled" | "active" | "completed";
    
    if (isPast && scheduledDate < now) {
      status = "completed";
    } else if (scheduledDate > now) {
      status = randomBool(0.3) ? "draft" : "scheduled";
    } else {
      status = "active";
    }
    
    // Connect to menu items
    const menuIds = sampleMenuItems
      .filter(() => randomBool(0.15))
      .map(item => item.id);
    
    // Select audience size
    const audienceSize = randomInt(500, 5000);
    
    // Create the campaign
    campaigns.push({
      id: `camp-${i+1}`,
      name: randomItem([
        "Summer Special Promotion",
        "Weekly Newsletter",
        "Weekend Flash Sale",
        "New Menu Launch",
        "Customer Recovery Campaign",
        "Valentine's Day Special",
        "Loyalty Rewards Program",
        "Birthday Celebrations",
        "Happy Hour Announcement",
        "End of Month Sale"
      ]) + (i > 10 ? ` ${i-9}` : ""),
      type,
      subject: type === "email" ? randomItem([
        "This Week's Special Menu Items",
        "We Miss You - Special Offer Inside",
        "Your Exclusive Birthday Gift!",
        "New Menu Alert - Try It First!"
      ]) : undefined,
      content,
      status,
      scheduledDate: status !== "draft" ? scheduledDate : undefined,
      audienceSize,
      createdAt,
      updatedAt,
      menuIds: menuIds.length > 0 ? menuIds : undefined,
      deliveryPlatforms: randomBool(0.5) ? 
        randomItem([["ifood", "rappi"], ["ifood"], ["rappi", "uber_eats"], []]) : 
        undefined,
      platform: type === "paid" ? randomItem(["facebook", "instagram", "google", "twitter"]) : undefined,
      incentiveType: randomBool(0.7) ? randomItem(["coupon", "loyalty", "none"]) : "none",
      couponId: randomBool(0.5) && sampleCouponData.length > 0 ? 
        randomItem(sampleCouponData).id : 
        undefined,
      loyaltyPoints: randomBool(0.3) ? randomInt(50, 500) : undefined,
      audienceType: randomItem(["all", "segment", "custom"]),
      audienceSegmentId: randomBool(0.6) ? randomItem(segments) : undefined,
      channels: [type],
      inactiveDays: randomBool(0.3) ? randomItem(["30", "60", "90"]) : undefined,
      // Generate report data for completed campaigns
      reportData: status === "completed" ? generateCampaignReportData(audienceSize) : undefined,
      // For active campaigns, generate partial reports
      deliveredCount: status === "active" ? Math.floor(audienceSize * randomInt(30, 90) / 100) : undefined,
      openedCount: status === "active" ? Math.floor(audienceSize * randomInt(10, 40) / 100) : undefined,
      clickedCount: status === "active" ? Math.floor(audienceSize * randomInt(5, 15) / 100) : undefined,
      failedCount: status === "active" ? Math.floor(audienceSize * randomInt(1, 10) / 100) : undefined
    });
  }
  
  return campaigns;
};

// Export a reasonable set of campaigns (30 for demo purposes)
export const sampleCampaigns: CampaignData[] = generateCampaigns(30);

// Filter functions for convenience
export const getActiveCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "active");

export const getScheduledCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "scheduled");

export const getCompletedCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "completed");

export const getDraftCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "draft");
