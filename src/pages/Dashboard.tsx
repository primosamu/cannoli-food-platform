import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DollarSign,
  Package,
  RefreshCcw,
  ShoppingCart,
  Users,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Clock,
  Activity,
  MapPin,
  ThermometerSun,
  Tag,
  Coffee,
  Info,
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { sampleOrders } from "@/data/sampleOrders";
import { sampleCustomers } from "@/data/sampleCustomers";
import { OrderSummarySection } from "@/components/dashboard/OrderSummarySection";
import { CustomerBehaviorSection } from "@/components/dashboard/customer-behavior/CustomerBehaviorSection";

const customerSegmentData = [
  { name: "Champions", value: 200 },
  { name: "Loyal", value: 350 },
  { name: "Promising", value: 125 },
  { name: "Needs Attention", value: 180 },
  { name: "At Risk", value: 95 },
  { name: "Hibernating", value: 110 },
  { name: "New", value: 80 },
];

const salesData = [
  { name: "Jan", delivery: 4000, dineIn: 2400 },
  { name: "Feb", delivery: 3000, dineIn: 1398 },
  { name: "Mar", delivery: 2000, dineIn: 9800 },
  { name: "Apr", delivery: 2780, dineIn: 3908 },
  { name: "May", delivery: 1890, dineIn: 4800 },
  { name: "Jun", delivery: 2390, dineIn: 3800 },
  { name: "Jul", delivery: 3490, dineIn: 4300 },
];

const weeklyMenuPopularity = [
  { name: "Cannoli Classic", value: 245 },
  { name: "Tiramisu", value: 190 },
  { name: "Strawberry Delight", value: 175 },
  { name: "Chocolate Fusion", value: 140 },
  { name: "Vanilla Bean", value: 120 },
];

const COLORS = ["#FFA726", "#FB8C00", "#F57C00", "#EF6C00", "#E65100", "#FFB74D", "#FFCC80"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeDetailedTab, setActiveDetailedTab] = useState<string>("orders-summary");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your restaurant's performance and customer data.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+20.1%</span> from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+180</span> new this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+19%</span> from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 campaigns</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Next campaign in 3 days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Compare delivery vs. dine-in sales performance
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Tabs defaultValue="daily">
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>
                    <RefreshCcw className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                  <TabsContent value="daily" className="space-y-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={salesData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="delivery" stroke="#FFA726" strokeWidth={2} />
                          <Line type="monotone" dataKey="dineIn" stroke="#F57C00" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="weekly" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={salesData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="delivery" fill="#FFA726" />
                        <Bar dataKey="dineIn" fill="#F57C00" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="monthly" className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="delivery" stroke="#FFA726" strokeWidth={2} />
                        <Line type="monotone" dataKey="dineIn" stroke="#F57C00" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Customer Segmentation</CardTitle>
                <CardDescription>
                  Distribution across customer segments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {customerSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Menu Items</CardTitle>
                <CardDescription>Weekly sales by menu item</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={weeklyMenuPopularity}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#FFA726" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Recent campaign metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Weekend Special Offer</p>
                      <p className="text-xs text-muted-foreground">Sent to 1,204 customers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">38% open rate</p>
                      <p className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        12% conversion
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">New Menu Launch</p>
                      <p className="text-xs text-muted-foreground">Sent to 2,530 customers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">42% open rate</p>
                      <p className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        18% conversion
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Customer Loyalty Reward</p>
                      <p className="text-xs text-muted-foreground">Sent to 845 customers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">62% open rate</p>
                      <p className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        24% conversion
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Lapsed Customer Recovery</p>
                      <p className="text-xs text-muted-foreground">Sent to 578 customers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">28% open rate</p>
                      <p className="text-xs text-amber-500 flex items-center justify-end">
                        <ArrowDown className="h-4 w-4 mr-1" />
                        8% conversion
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <Tabs defaultValue="orders-summary" value={activeDetailedTab} onValueChange={setActiveDetailedTab}>
            <div className="flex justify-between items-center border-b mb-6 pb-2">
              <TabsList>
                <TabsTrigger value="orders-summary" className="flex items-center gap-2">
                  <BarChartIcon className="h-4 w-4" />
                  Order Summary
                </TabsTrigger>
                <TabsTrigger value="customer-behavior" className="flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4" />
                  Customer Behavior
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" size="sm">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
            
            <TabsContent value="orders-summary">
              <OrderSummarySection />
            </TabsContent>
            
            <TabsContent value="customer-behavior">
              <CustomerBehaviorSection />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
