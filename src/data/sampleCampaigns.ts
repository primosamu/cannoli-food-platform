
import { CampaignData } from "@/types/campaign";

// Generate some sample campaign data
export const sampleCampaigns: CampaignData[] = [
  {
    id: "camp-1",
    name: "Summer Special Promotion",
    type: "whatsapp",
    content: "Hello {{name}}! 🌞 Enjoy our summer specials with 20% off on all menu items this weekend. Use code SUMMER20!",
    status: "active",
    audienceSize: 3250,
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
    scheduledDate: new Date("2025-04-15"),
    menuIds: ["menu-1", "menu-2"],
    deliveryPlatforms: ["ifood", "rappi"],
    channels: ["whatsapp"]  // Added the required channels property
  },
  {
    id: "camp-2",
    name: "Weekly Newsletter",
    type: "email",
    subject: "This Week's Special Menu Items",
    content: "<h1>Weekly Specials</h1><p>Check out our chef's recommendations for this week!</p>",
    status: "scheduled",
    audienceSize: 5800,
    createdAt: new Date("2025-03-10"),
    updatedAt: new Date("2025-03-10"),
    scheduledDate: new Date("2025-04-20"),
    menuIds: ["menu-1"],
    channels: ["email"]  // Added the required channels property
  },
  {
    id: "camp-3",
    name: "Weekend Flash Sale",
    type: "sms",
    content: "Flash sale! 15% off all desserts this weekend at Restaurant Name. Show this SMS to redeem.",
    status: "scheduled",
    audienceSize: 2100,
    createdAt: new Date("2025-03-15"),
    updatedAt: new Date("2025-03-15"),
    scheduledDate: new Date("2025-04-22"),
    channels: ["sms"]  // Added the required channels property
  },
  {
    id: "camp-4",
    name: "New Menu Launch",
    type: "paid",
    content: "Try our exciting new menu items! Available from April 25th.",
    status: "draft",
    imageUrl: "https://example.com/ad-image.jpg",
    audienceSize: 10000,
    createdAt: new Date("2025-03-20"),
    updatedAt: new Date("2025-03-20"),
    platform: "facebook",
    channels: ["paid"]  // Added the required channels property
  },
  {
    id: "camp-5",
    name: "Valentine's Day Special",
    type: "email",
    subject: "Valentine's Day Romantic Dinner",
    content: "<h1>Valentine's Day Special</h1><p>Reserve a table for our special romantic dinner package</p>",
    status: "completed",
    audienceSize: 4200,
    createdAt: new Date("2025-01-25"),
    updatedAt: new Date("2025-02-15"),
    scheduledDate: new Date("2025-02-14"),
    channels: ["email"]  // Added the required channels property
  }
];

// Filter functions for convenience
export const getActiveCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "active");

export const getScheduledCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "scheduled");

export const getCompletedCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "completed");

export const getDraftCampaigns = () => 
  sampleCampaigns.filter(campaign => campaign.status === "draft");
