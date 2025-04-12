
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  ShoppingBag,
  Sun,
  Thermometer,
  Users,
  Tag,
  Utensils,
  Store
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Area } from "recharts";

// Sample data for the charts
const salesByStoreData = [
  { name: "Store 1", value: 4000 },
  { name: "Store 2", value: 3000 },
  { name: "Store 3", value: 2000 },
  { name: "Store 4", value: 2780 },
  { name: "Store 5", value: 1890 }
];

const uniqueCustomersData = [
  { date: "04/01", customers: 120, orders: 150 },
  { date: "04/02", customers: 132, orders: 170 },
  { date: "04/03", customers: 101, orders: 130 },
  { date: "04/04", customers: 134, orders: 170 },
  { date: "04/05", customers: 90, orders: 110 },
  { date: "04/06", customers: 230, orders: 260 },
  { date: "04/07", customers: 210, orders: 240 }
];

const customersPerHourData = [
  { hour: "6-8", customers: 30 },
  { hour: "8-10", customers: 80 },
  { hour: "10-12", customers: 120 },
  { hour: "12-14", customers: 200 },
  { hour: "14-16", customers: 90 },
  { hour: "16-18", customers: 110 },
  { hour: "18-20", customers: 180 },
  { hour: "20-22", customers: 140 },
  { hour: "22-24", customers: 70 },
  { hour: "0-2", customers: 30 },
  { hour: "2-4", customers: 10 },
  { hour: "4-6", customers: 5 }
];

const weekdayData = [
  { day: "Monday", customers: 340, orders: 380 },
  { day: "Tuesday", customers: 320, orders: 350 },
  { day: "Wednesday", customers: 350, orders: 390 },
  { day: "Thursday", customers: 410, orders: 450 },
  { day: "Friday", customers: 480, orders: 550 },
  { day: "Saturday", customers: 590, orders: 650 },
  { day: "Sunday", customers: 520, orders: 570 }
];

const channelData = [
  { channel: "Mobile App", customers: 1200, orders: 1500 },
  { channel: "Website", customers: 800, orders: 900 },
  { channel: "In-Store", customers: 600, orders: 650 },
  { channel: "Phone", customers: 300, orders: 320 },
  { channel: "Third Party", customers: 500, orders: 550 }
];

const forecastData = [
  // Past data
  { date: "04/01", orders: 150, forecast: null },
  { date: "04/02", orders: 170, forecast: null },
  { date: "04/03", orders: 130, forecast: null },
  { date: "04/04", orders: 170, forecast: null },
  { date: "04/05", orders: 110, forecast: null },
  { date: "04/06", orders: 260, forecast: null },
  { date: "04/07", orders: 240, forecast: null },
  { date: "04/08", orders: 200, forecast: null },
  { date: "04/09", orders: 180, forecast: null },
  { date: "04/10", orders: 190, forecast: null },
  { date: "04/11", orders: 205, forecast: null },
  { date: "04/12", orders: 220, forecast: null },
  // Forecast data
  { date: "04/13", orders: null, forecast: 210 },
  { date: "04/14", orders: null, forecast: 225 },
  { date: "04/15", orders: null, forecast: 230 },
  { date: "04/16", orders: null, forecast: 215 },
  { date: "04/17", orders: null, forecast: 240 },
  { date: "04/18", orders: null, forecast: 270 },
  { date: "04/19", orders: null, forecast: 280 },
  { date: "04/20", orders: null, forecast: 260 },
  { date: "04/21", orders: null, forecast: 250 },
  { date: "04/22", orders: null, forecast: 230 },
  { date: "04/23", orders: null, forecast: 220 },
  { date: "04/24", orders: null, forecast: 240 },
  { date: "04/25", orders: null, forecast: 230 },
  { date: "04/26", orders: null, forecast: 245 },
  { date: "04/27", orders: null, forecast: 260 }
];

const tempData = [
  { temp: "Cold (<15°C)", orders: 280 },
  { temp: "Mild (15-22°C)", orders: 450 },
  { temp: "Warm (22-28°C)", orders: 520 },
  { temp: "Hot (>28°C)", orders: 390 }
];

const categoryData = [
  { category: "Main Dishes", orders: 2500 },
  { category: "Sides", orders: 1800 },
  { category: "Desserts", orders: 1200 },
  { category: "Drinks", orders: 2000 },
  { category: "Appetizers", orders: 900 }
];

const attributeData = [
  { attribute: "Vegetarian", orders: 1200 },
  { attribute: "Cold", orders: 800 },
  { attribute: "Low Carb", orders: 600 },
  { attribute: "Fit", orders: 900 },
  { attribute: "Spicy", orders: 700 }
];

// Calendar data for daily orders
const generateCalendarData = () => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return days.map(day => {
    // Generate a random number of orders between 50 and 300
    const orders = Math.floor(Math.random() * 250) + 50;
    return {
      day,
      orders,
      // Color grade based on orders
      grade: orders < 100 ? 0 : orders < 150 ? 1 : orders < 200 ? 2 : orders < 250 ? 3 : 4
    };
  });
};

const calendarData = generateCalendarData();

// Color scales for heat map
const colorScale = ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"];

const COLORS = ["#FFA726", "#FB8C00", "#F57C00", "#EF6C00", "#E65100", "#FFB74D", "#FFCC80", "#4CAF50", "#2196F3", "#9C27B0", "#F44336"];

export const OrderSummarySection = () => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);

  const handleChartClick = (chartId: string, data?: any) => {
    setSelectedChart(chartId);
    setSelectedSegment(data);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales by Store */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Sales by Store
            </CardTitle>
            <CardDescription>
              Revenue breakdown by store location
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={() => handleChartClick('sales-by-store')}>
                <Pie
                  data={salesByStoreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesByStoreData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      onClick={() => handleChartClick('sales-by-store', entry)}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customers and Orders per Day */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customers & Orders per Day
            </CardTitle>
            <CardDescription>
              Daily customer visits and order counts
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={uniqueCustomersData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => handleChartClick('customers-per-day')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="customers" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customers per Hour */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Customers per Hour
            </CardTitle>
            <CardDescription>
              Customer traffic by hour of day
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={customersPerHourData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => handleChartClick('customers-per-hour')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="customers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customers/Orders by Day of Week */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Customers/Orders by Weekday
            </CardTitle>
            <CardDescription>
              Traffic pattern across days of the week
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weekdayData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => handleChartClick('orders-by-weekday')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="customers" fill="#8884d8" />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customers per Location */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Customers/Orders per Location
            </CardTitle>
            <CardDescription>
              Geographical distribution of orders
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="text-center p-6">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Map visualization available with location data</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleChartClick('customers-by-location')}
              >
                View Location Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Customers/Orders per Sales Channel */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Orders by Sales Channel
            </CardTitle>
            <CardDescription>
              Distribution across ordering platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={channelData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => handleChartClick('orders-by-channel')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="customers" fill="#8884d8" />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders per Date (Calendar) */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Orders per Date (April 2025)
            </CardTitle>
            <CardDescription>
              Daily order volume with color grading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              <div className="text-center text-xs font-medium text-muted-foreground">Mon</div>
              <div className="text-center text-xs font-medium text-muted-foreground">Tue</div>
              <div className="text-center text-xs font-medium text-muted-foreground">Wed</div>
              <div className="text-center text-xs font-medium text-muted-foreground">Thu</div>
              <div className="text-center text-xs font-medium text-muted-foreground">Fri</div>
              <div className="text-center text-xs font-medium text-muted-foreground">Sat</div>
              <div className="text-center text-xs font-medium text-muted-foreground">Sun</div>
              
              {/* Empty cells for day alignment (assuming April 1, 2025 is a Tuesday) */}
              <div></div>
              
              {calendarData.map((day) => (
                <div
                  key={day.day}
                  className="aspect-square p-1 cursor-pointer"
                  style={{ backgroundColor: colorScale[day.grade] }}
                  onClick={() => handleChartClick('orders-by-date', day)}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="text-xs font-medium">{day.day}</div>
                    <div className="text-xs">{day.orders}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-1 mt-2">
              <div className="text-xs text-muted-foreground">Less</div>
              {colorScale.map((color, i) => (
                <div
                  key={i}
                  className="w-4 h-4"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
              <div className="text-xs text-muted-foreground">More</div>
            </div>
          </CardContent>
        </Card>

        {/* Order Forecast */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Order Forecast (Next 15 Days)
            </CardTitle>
            <CardDescription>
              Historical data and future predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={forecastData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => handleChartClick('order-forecast')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="forecast" fill="#8884d8" stroke="#8884d8" />
                <Line type="monotone" dataKey="orders" stroke="#ff7300" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders per Temperature */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Orders by Temperature
            </CardTitle>
            <CardDescription>
              Order patterns by weather temperature
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tempData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => handleChartClick('orders-by-temperature')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="temp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#FF9800" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders per Category */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Orders by Category
            </CardTitle>
            <CardDescription>
              Distribution across menu categories
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                onClick={() => handleChartClick('orders-by-category')}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders by Food Attributes */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Orders by Food Attributes
            </CardTitle>
            <CardDescription>
              Distribution by dietary preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onClick={() => handleChartClick('orders-by-attributes')}>
                <Pie
                  data={attributeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="orders"
                >
                  {attributeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      onClick={() => handleChartClick('orders-by-attributes', entry)}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer List Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Customer List - {selectedChart}</DialogTitle>
            <DialogDescription>
              {selectedSegment ? 
                `Customers from ${selectedSegment.name || selectedSegment.day || selectedSegment.channel || selectedSegment.category || selectedSegment.attribute || selectedSegment.temp}` : 
                'All customers in this segment'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Orders</th>
                    <th className="px-4 py-2 text-left">Last Order</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-2">Customer {i + 1}</td>
                      <td className="px-4 py-2">customer{i+1}@example.com</td>
                      <td className="px-4 py-2">{Math.floor(Math.random() * 20) + 1}</td>
                      <td className="px-4 py-2">2025-04-{Math.floor(Math.random() * 12) + 1}</td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm">Add to Campaign</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing 5 of 124 customers
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline">View All</Button>
                <Button>Create Campaign for This Group</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
