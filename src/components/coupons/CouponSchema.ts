import * as z from "zod";
import { randomInt, randomItem, randomBool, randomPastDate, randomFutureDate } from "@/utils/dataGenerationUtils";

export const couponFormSchema = z.object({
  name: z.string().min(2, {
    message: "Coupon name must be at least 2 characters.",
  }),
  code: z.string().min(3, {
    message: "Coupon code must be at least 3 characters.",
  }),
  type: z.enum(["fixed", "percentage", "shipping", "freebie"]),
  minimumPurchase: z.number().min(0),
  value: z.number().min(0),
  percentageDiscount: z.number().min(1).max(100).optional(),
  freebie: z.string().optional(),
  maxUsage: z.number().min(1).optional(),
  userLimit: z.number().min(1).optional(),
  hasExpiration: z.boolean().default(false),
  expirationDate: z.date().optional(),
  firstPurchaseOnly: z.boolean().default(false),
  birthdayOnly: z.boolean().default(false),
  usagePerDay: z.number().min(1).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  forDelivery: z.boolean().default(true),
  forDineIn: z.boolean().default(true),
  forQrTable: z.boolean().default(true),
  sponsorId: z.string().optional(),
  sponsorAmount: z.number().min(0).optional(),
  sponsorPercentage: z.number().min(0).max(100).optional(),
});

export type CouponFormValues = z.infer<typeof couponFormSchema>;

export interface Coupon {
  id: string;
  name: string;
  code: string;
  type: "fixed" | "percentage" | "shipping" | "freebie";
  value?: number;
  minimumPurchase: number;
  freebie?: string;
  active: boolean;
  usageCount: number;
  expiresAt: string;
}

const generateCoupons = (count: number): Coupon[] => {
  const couponTypes: Array<"fixed" | "percentage" | "shipping" | "freebie"> = ["fixed", "percentage", "shipping", "freebie"];
  const dessertItems = ["Tiramisu", "Chocolate Lava Cake", "Cheesecake", "Ice Cream", "Apple Pie", "Crème Brûlée", "Cannoli"];
  
  return Array.from({ length: count }, (_, i) => {
    const id = (i + 1).toString();
    const type = randomItem(couponTypes);
    const isActive = randomBool(0.7);
    const expirationDate = randomBool(0.8) ? 
      randomFutureDate(90).toISOString().split('T')[0] : 
      randomPastDate(30).toISOString().split('T')[0];
    
    let value: number | undefined;
    let freebie: string | undefined;
    
    switch (type) {
      case "fixed":
        value = randomInt(5, 30);
        break;
      case "percentage":
        value = randomInt(5, 40);
        break;
      case "shipping":
        // No value needed
        break;
      case "freebie":
        freebie = randomItem(dessertItems);
        break;
    }
    
    return {
      id,
      name: randomItem([
        "Welcome Discount",
        "Seasonal Special",
        "Lunch Special",
        "Customer Appreciation",
        "Weekend Deal",
        "First Order",
        "Birthday Gift",
        "Loyalty Reward",
        "Anniversary Special",
        "Holiday Offer"
      ]) + (i > 10 ? ` ${i-9}` : ""),
      code: randomItem([
        "WELCOME",
        "SUMMER",
        "WINTER",
        "SPRING",
        "FALL",
        "LUNCH",
        "DINNER",
        "SPECIAL",
        "FIRST",
        "BDAY",
        "LOYAL",
        "HOLIDAY",
        "THANKS"
      ]) + randomInt(10, 99),
      type,
      value,
      minimumPurchase: randomInt(10, 50),
      freebie,
      active: isActive,
      usageCount: randomInt(0, 500),
      expiresAt: expirationDate
    };
  });
};

export const sampleCouponData: Coupon[] = generateCoupons(40);

export const getActiveCoupons = () => sampleCouponData.filter(c => c.active);
export const getInactiveCoupons = () => sampleCouponData.filter(c => !c.active);
export const getExpiredCoupons = () => {
  const now = new Date();
  return sampleCouponData.filter(c => {
    const expiryDate = new Date(c.expiresAt);
    return expiryDate < now;
  });
};
export const getUpcomingExpirations = (days: number = 7) => {
  const now = new Date();
  const cutoff = new Date();
  cutoff.setDate(now.getDate() + days);
  
  return sampleCouponData.filter(c => {
    const expiryDate = new Date(c.expiresAt);
    return expiryDate >= now && expiryDate <= cutoff;
  });
};
