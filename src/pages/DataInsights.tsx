
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataConnectionsOverview } from "@/components/data/DataConnectionsOverview";
import DataConnector from '@/utils/dataConnector';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const COLORS = ["#FFA726", "#FB8C00", "#F57C00", "#EF6C00", "#E65100", "#FFB74D", "#FFCC80"];

const DataInsightsPage = () => {
  const dashboardMetrics = DataConnector.analytics.getDashboardMetrics();
  const retentionMetrics = DataConnector.analytics.getCustomerRetentionMetrics();
  const campaignMetrics = DataConnector.analytics.getCampaignEffectiveness();
  const popularItems = DataConnector.menu.getMostOrderedItems(5);
  const orderTimeslots = DataConnector.orders.getPopularTimeSlots();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Data Insights</h2>
        <p className="text-muted-foreground">
          Explore connections and relationships between different data entities in your restaurant
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {retentionMetrics.repeatCustomers} repeat customers
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardMetrics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              ${dashboardMetrics.totalRevenue.toFixed(2)} total revenue
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{DataConnector.menu.getItems().length}</div>
            <p className="text-xs text-muted-foreground">
              Across {DataConnector.menu.getCategories().length} categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaigns & Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {DataConnector.campaigns.getAll().length} / {DataConnector.coupons.getAll().length}
            </div>
            <p className="text-xs text-muted-foreground">
              {campaignMetrics.averageOpenRate * 100}% average open rate
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Popular Menu Items</CardTitle>
            <CardDescription>Top ordered items across all channels</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={popularItems.map(({item, orderCount}) => ({
                  name: item.name,
                  orders: orderCount
                }))}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 70, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={65} />
                <Tooltip />
                <Bar dataKey="orders" fill="#FFA726" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Retention</CardTitle>
            <CardDescription>First-time vs. returning customers</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Repeat Customers", value: retentionMetrics.repeatCustomers },
                    { name: "One-time Customers", value: retentionMetrics.oneTimeCustomers }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#FFA726" />
                  <Cell fill="#F57C00" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <DataConnectionsOverview />
    </div>
  );
};

export default DataInsightsPage;
