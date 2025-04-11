
import * as z from "zod";

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

export const sampleCouponData: Coupon[] = [
  {
    id: "1",
    name: "Welcome Discount",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minimumPurchase: 15,
    active: true,
    usageCount: 245,
    expiresAt: "2023-12-31",
  },
  {
    id: "2",
    name: "Free Shipping",
    code: "FREESHIP",
    type: "shipping",
    minimumPurchase: 25,
    active: true,
    usageCount: 187,
    expiresAt: "2023-10-15",
  },
  {
    id: "3",
    name: "Seasonal Special",
    code: "SUMMER20",
    type: "percentage",
    value: 20,
    minimumPurchase: 30,
    active: false,
    usageCount: 352,
    expiresAt: "2023-08-31",
  },
  {
    id: "4",
    name: "Free Dessert",
    code: "DESSERT",
    type: "freebie",
    freebie: "Cannoli",
    minimumPurchase: 40,
    active: true,
    usageCount: 98,
    expiresAt: "2023-12-31",
  },
  {
    id: "5",
    name: "Lunch Special",
    code: "LUNCH15",
    type: "fixed",
    value: 15,
    minimumPurchase: 50,
    active: true,
    usageCount: 124,
    expiresAt: "2023-11-30",
  },
];
