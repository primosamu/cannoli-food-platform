import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Clock,
  Calendar,
  Users,
  Timer,
  Coffee,
  Utensils,
  Cloud,
  Sun,
} from "lucide-react";
import { DollarSign } from "./DollarSign";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

// RFM Data
const recencyData = [
  { group: "1 (>60 days)", value: 120, description: "Lost" },
  { group: "2 (45-60 days)", value: 95, description: "At Risk" },
  { group: "3 (30-45 days)", value: 150, description: "Needs Attention" },
  { group: "4 (15-30 days)", value: 230, description: "Active" },
  { group: "5 (0-15 days)", value: 300, description: "Recent" }
];

const frequencyData = [
  { group: "1 (1 order)", value: 250, description: "One-time" },
  { group: "2 (2 orders)", value: 180, description: "New" },
  { group: "3 (3-5 orders)", value: 210, description: "Regular" },
  { group: "4 (6-10 orders)", value: 140, description: "Frequent" },
  { group: "5 (>10 orders)", value: 120, description: "Loyal" }
];

const monetaryData = [
  { group: "1 (<$50)", value: 230, description: "Low Value" },
  { group: "2 ($50-100)", value: 250, description: "Medium-Low" },
  { group: "3 ($100-250)", value: 180, description: "Medium" },
  { group: "4 ($250-500)", value: 130, description: "Medium-High" },
  { group: "5 (>$500)", value: 110, description: "High Value" }
];

// RFM Segments
const rfmSegmentsData = [
  { name: "Champions", value: 95, description: "Best customers, highly engaged" },
  { name: "Loyal", value: 120, description: "Consistent spenders, frequent" },
  { name: "Potential Loyalist", value: 140, description: "Recent and promising" },
  { name: "New Customers", value: 180, description: "Spent well, first-timers" },
  { name: "Promising", value: 110, description: "Recent, not frequent yet" },
  { name: "Needs Attention", value: 90, description: "Above average, declining" },
  { name: "At Risk", value: 80, description: "Once valuable, slipping away" },
  { name: "Can't Lose", value: 30, description: "Past high value, inactive" },
  { name: "Hibernating", value: 60, description: "Past customers, low value" },
  { name: "Lost", value: 85, description: "Lowest value, not engaged" },
  { name: "Others", value: 50, description: "Miscellaneous patterns" }
];

// Meal Preference
const mealPreferenceData = [
  { name: "Breakfast", value: 180 },
  { name: "Lunch", value: 420 },
  { name: "Dinner", value: 350 },
  { name: "Late night", value: 90 },
  { name: "Afternoon snack", value: 150 }
];

// Day Preference
const dayPreferenceData = [
  { name: "Weekday", value: 650 },
  { name: "Weekend", value: 420 }
];

// Repurchase Category
const repurchaseCategoryData = [
  { name: "Sporadic (>30d)", value: 150 },
  { name: "Very Slow (15-30d)", value: 120 },
  { name: "Slow (8-14d)", value: 180 },
  { name: "Medium (4-7d)", value: 250 },
  { name: "Fast (0-3d)", value: 190 }
];

// Beverage Included
const beverageData = [
  { name: "Never", value: 150 },
  { name: "Rarely", value: 220 },
  { name: "Frequently", value: 180 },
  { name: "Always", value: 210 },
  { name: "N/A", value: 30 }
];

// Dessert Preference
const dessertData = [
  { name: "Never", value: 180 },
  { name: "Rarely", value: 250 },
  { name: "Frequently", value: 160 },
  { name: "Always", value: 120 },
  { name: "N/A", value: 40 }
];

// Weather Preference
const weatherData = [
  { name: "Sunny", value: 320 },
  { name: "Cloudy", value: 280 },
  { name: "Rainy", value: 190 },
  { name: "Cold", value: 150 },
  { name: "Hot", value: 210 }
];

const COLORS = ["#FFA726", "#FB8C00", "#F57C00", "#EF6C00", "#E65100", "#FFB74D", "#FFCC80", "#4CAF50", "#2196F3", "#9C27B0", "#F44336"];

export const CustomerBehaviorSection = () => {
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
      {/* RFM Analysis */}
      <div>
        <h3 className="text-lg font-medium mb-4">RFM Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Recency (Last Purchase)
              </CardTitle>
              <CardDescription>
                How recently a customer made a purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recencyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  onClick={() => handleChartClick('recency')}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border p-2 shadow-md">
                          <p className="font-medium">{payload[0].payload.group}</p>
                          <p>{payload[0].payload.description}</p>
                          <p>Customers: {payload[0].payload.value}</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Bar 
                    dataKey="value" 
                    fill="#EF6C00"
                    onClick={(data) => handleChartClick('recency', data)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5" />
                Frequency (Number of Orders)
              </CardTitle>
              <CardDescription>
                How often a customer makes purchases
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={frequencyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border p-2 shadow-md">
                          <p className="font-medium">{payload[0].payload.group}</p>
                          <p>{payload[0].payload.description}</p>
                          <p>Customers: {payload[0].payload.value}</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Bar 
                    dataKey="value" 
                    fill="#2196F3"
                    onClick={(data) => handleChartClick('frequency', data)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Monetary Value (Spending)
              </CardTitle>
              <CardDescription>
                How much a customer spends
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monetaryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border p-2 shadow-md">
                          <p className="font-medium">{payload[0].payload.group}</p>
                          <p>{payload[0].payload.description}</p>
                          <p>Customers: {payload[0].payload.value}</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Bar 
                    dataKey="value" 
                    fill="#4CAF50"
                    onClick={(data) => handleChartClick('monetary', data)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              RFM Customer Segments
            </CardTitle>
            <CardDescription>
              Combined analysis of all RFM factors (11 groups)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rfmSegmentsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border p-2 shadow-md">
                        <p className="font-medium">{payload[0].payload.name}</p>
                        <p>{payload[0].payload.description}</p>
                        <p>Customers: {payload[0].payload.value}</p>
                        <p>Percentage: {(payload[0].payload.value / rfmSegmentsData.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill="#8884d8"
                  onClick={(data) => handleChartClick('rfm-segments', data)}
                >
                  {rfmSegmentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Behavior Patterns */}
      <div>
        <h3 className="text-lg font-medium mb-4">Customer Behavior Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Preferred Meal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Orders per Preferred Meal
              </CardTitle>
              <CardDescription>
                Customer meal time preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={() => handleChartClick('meal-preference')}>
                  <Pie
                    data={mealPreferenceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mealPreferenceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        onClick={() => handleChartClick('meal-preference', entry)}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Day Preference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Customers per Day Preference
              </CardTitle>
              <CardDescription>
                Weekday vs. weekend ordering patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dayPreferenceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  onClick={() => handleChartClick('day-preference')}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#4CAF50"
                    onClick={(data) => handleChartClick('day-preference', data)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Repurchase Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Customers per Repurchase Category
              </CardTitle>
              <CardDescription>
                Time between consecutive purchases
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={repurchaseCategoryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  onClick={() => handleChartClick('repurchase-category')}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="#2196F3"
                    onClick={(data) => handleChartClick('repurchase-category', data)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Beverage Included */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coffee className="h-5 w-5" />
                Customers per Beverage Included
              </CardTitle>
              <CardDescription>
                Beverage ordering patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={() => handleChartClick('beverage-preference')}>
                  <Pie
                    data={beverageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {beverageData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        onClick={() => handleChartClick('beverage-preference', entry)}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Dessert Preference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Customers per Dessert
              </CardTitle>
              <CardDescription>
                Dessert ordering patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={() => handleChartClick('dessert-preference')}>
                  <Pie
                    data={dessertData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dessertData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        onClick={() => handleChartClick('dessert-preference', entry)}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weather Preference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Customers per Weather Preference
              </CardTitle>
              <CardDescription>
                Weather patterns and order behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart onClick={() => handleChartClick('weather-preference')}>
                  <Pie
                    data={weatherData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {weatherData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        onClick={() => handleChartClick('weather-preference', entry)}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Customer List Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Customer List - {selectedChart}</DialogTitle>
            <DialogDescription>
              {selectedSegment ? 
                `Customers from ${selectedSegment.name || selectedSegment.group || 'this segment'}` : 
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
                    <th className="px-4 py-2 text-left">Total Spent</th>
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
                      <td className="px-4 py-2">${((Math.random() * 500) + 50).toFixed(2)}</td>
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
                  Showing 5 of {selectedSegment?.value || 100} customers
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
