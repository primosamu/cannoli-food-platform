
import { useState } from "react";
import { PlusCircle, TrashIcon, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// Define the coupon form schema with zod
const couponFormSchema = z.object({
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

type CouponFormValues = z.infer<typeof couponFormSchema>;

// Sample data for coupons
const couponData = [
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

// Define table columns
const columns = [
  {
    accessorKey: "name",
    header: "Coupon Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type");
      return (
        <span className="capitalize">
          {type === "fixed"
            ? "Fixed Amount"
            : type === "percentage"
            ? "Percentage"
            : type === "shipping"
            ? "Free Shipping"
            : "Freebie"}
        </span>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const type = row.getValue("type");
      const value = row.getValue("value");
      const freebie = row.original.freebie;

      return type === "fixed"
        ? `$${value}`
        : type === "percentage"
        ? `${value}%`
        : type === "shipping"
        ? "Free Shipping"
        : `Free ${freebie}`;
    },
  },
  {
    accessorKey: "minimumPurchase",
    header: "Min. Purchase",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("minimumPurchase"));
      return `$${amount.toFixed(2)}`;
    },
  },
  {
    accessorKey: "active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("active");
      return (
        <div className="flex items-center">
          {isActive ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              <span>Active</span>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <span>Inactive</span>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "usageCount",
    header: "Usage",
  },
  {
    accessorKey: "expiresAt",
    header: "Expires",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit Coupon</DropdownMenuItem>
            <DropdownMenuItem>View Usage History</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete Coupon
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable({ columns, data }) {
  return (
    <div className="rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessorKey || column.id}
                className="px-4 py-3 text-left"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((column) => (
                <td key={column.accessorKey || column.id} className="px-4 py-3">
                  {column.cell ? column.cell({ row: { getValue: (key) => row[key], original: row } }) : row[column.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const CouponsPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      name: "",
      code: "",
      type: "fixed",
      minimumPurchase: 0,
      value: 0,
      forDelivery: true,
      forDineIn: true,
      forQrTable: true,
      hasExpiration: false,
      firstPurchaseOnly: false,
      birthdayOnly: false,
    },
  });

  function onSubmit(data: CouponFormValues) {
    toast({
      title: "Coupon created successfully",
      description: `Coupon ${data.name} (${data.code}) has been created.`,
    });
    setIsDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupon Management</h2>
          <p className="text-muted-foreground">
            Create and manage discount coupons for your customers.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>
                Fill out the form to create a new promotional coupon.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="limits">Usage Limits</TabsTrigger>
                    <TabsTrigger value="rules">Rules & Sponsors</TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Coupon Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Summer Special" {...field} />
                            </FormControl>
                            <FormDescription>
                              A descriptive name for internal reference.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Coupon Code</FormLabel>
                            <FormControl>
                              <Input placeholder="SUMMER25" {...field} />
                            </FormControl>
                            <FormDescription>
                              The code customers will enter to redeem the coupon.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Coupon Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="fixed" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Fixed Amount
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="percentage" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Percentage
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="shipping" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Free Shipping
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="freebie" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Free Item
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minimumPurchase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Purchase</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="25.00"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum order value required to use this coupon.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {form.watch("type") === "fixed" && (
                        <FormField
                          control={form.control}
                          name="value"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Discount Amount ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="10.00"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      {form.watch("type") === "percentage" && (
                        <FormField
                          control={form.control}
                          name="percentageDiscount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Discount Percentage (%)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="15"
                                  min={1}
                                  max={100}
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      {form.watch("type") === "freebie" && (
                        <FormField
                          control={form.control}
                          name="freebie"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Free Item</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Cannoli"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                The free item included with the purchase.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="hasExpiration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Set Expiration Date
                            </FormLabel>
                            <FormDescription>
                              Set a date when this coupon will expire.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="limits" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="maxUsage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Total Uses</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="500"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                              />
                            </FormControl>
                            <FormDescription>
                              The maximum number of times this coupon can be used.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="userLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Uses Per Customer</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                              />
                            </FormControl>
                            <FormDescription>
                              How many times each customer can use this coupon.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="usagePerDay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Daily Usage Limit</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="50"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum number of times this coupon can be used per day.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="rules" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="firstPurchaseOnly"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                First Purchase Only
                              </FormLabel>
                              <FormDescription>
                                This coupon can only be used by new customers on their first order.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="birthdayOnly"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Birthday Special
                              </FormLabel>
                              <FormDescription>
                                This coupon can only be used during a customer's birthday month.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Applicable Order Types</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="forDelivery"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <FormLabel className="text-base">Delivery</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="forDineIn"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <FormLabel className="text-base">Dine-in</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="forQrTable"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <FormLabel className="text-base">QR Table</FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Sponsor Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="sponsorId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sponsor</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a sponsor" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="supplier1">Food Supplier 1</SelectItem>
                                  <SelectItem value="supplier2">Beverage Supplier 2</SelectItem>
                                  <SelectItem value="supplier3">Packaging Supplier 3</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The sponsor contributing to this coupon.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sponsorAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sponsor Contribution ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="100.00"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                />
                              </FormControl>
                              <FormDescription>
                                Fixed amount the sponsor is contributing.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button type="submit">Create Coupon</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Coupons</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Coupons</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Coupons</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Coupons</CardTitle>
              <CardDescription>
                Currently active coupons that customers can use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={couponData.filter(coupon => coupon.active)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Coupons</CardTitle>
              <CardDescription>
                Coupons that are currently disabled.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={couponData.filter(coupon => !coupon.active)} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Coupons</CardTitle>
              <CardDescription>
                Coupons scheduled for future activation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">No scheduled coupons found.</p>
                <Button className="mt-4" variant="outline" onClick={() => setIsDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Schedule New Coupon
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CouponsPage;
