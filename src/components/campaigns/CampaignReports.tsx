
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye, MousePointerClick, Ban, Clock } from "lucide-react";

interface CampaignReportsProps {
  campaignId?: string;
  campaignName?: string;
  campaignType?: string;
}

export const CampaignReports: React.FC<CampaignReportsProps> = ({
  campaignId,
  campaignName = "Weekend Special",
  campaignType = "whatsapp"
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data - in a real app, this would come from your API
  const messageStatusData = [
    { name: "Delivered", value: 245, color: "#4ade80" },
    { name: "Opened", value: 187, color: "#60a5fa" },
    { name: "Clicked", value: 94, color: "#a78bfa" },
    { name: "Failed", value: 8, color: "#f87171" },
    { name: "Pending", value: 12, color: "#fbbf24" }
  ];
  
  const deliveryRateByDayData = [
    { name: "Mon", delivered: 45, failed: 2 },
    { name: "Tue", delivered: 52, failed: 1 },
    { name: "Wed", delivered: 49, failed: 3 },
    { name: "Thu", delivered: 53, failed: 0 },
    { name: "Fri", delivered: 58, failed: 2 },
    { name: "Sat", delivered: 62, failed: 0 },
    { name: "Sun", delivered: 48, failed: 0 },
  ];
  
  const responseRateData = [
    { name: "Within 1h", value: 86 },
    { name: "Within 1 day", value: 127 },
    { name: "Within 3 days", value: 45 },
    { name: "No response", value: 94 },
  ];
  
  const failureReasons = [
    { reason: "Invalid number", count: 3 },
    { reason: "Number not on WhatsApp", count: 2 },
    { reason: "Rate limiting", count: 1 },
    { reason: "Other errors", count: 2 },
  ];
  
  const customerList = [
    { name: "John Doe", email: "john@example.com", status: "Clicked", time: "12:45 PM", action: "Placed Order" },
    { name: "Jane Smith", email: "jane@example.com", status: "Opened", time: "1:23 PM", action: "" },
    { name: "Robert Brown", email: "robert@example.com", status: "Delivered", time: "11:15 AM", action: "" },
    { name: "Emily Williams", email: "emily@example.com", status: "Clicked", time: "2:05 PM", action: "Added to Cart" },
    { name: "Michael Johnson", email: "michael@example.com", status: "Failed", time: "10:30 AM", action: "Error: Invalid Number" },
  ];
  
  const getTotalRecipients = () => {
    return messageStatusData.reduce((total, item) => total + item.value, 0);
  };
  
  const getDeliveryRate = () => {
    const delivered = messageStatusData.find(item => item.name === "Delivered")?.value || 0;
    return ((delivered / getTotalRecipients()) * 100).toFixed(1);
  };
  
  const getOpenRate = () => {
    const opened = messageStatusData.find(item => item.name === "Opened")?.value || 0;
    const delivered = messageStatusData.find(item => item.name === "Delivered")?.value || 0;
    return ((opened / delivered) * 100).toFixed(1);
  };
  
  const getClickRate = () => {
    const clicked = messageStatusData.find(item => item.name === "Clicked")?.value || 0;
    const opened = messageStatusData.find(item => item.name === "Opened")?.value || 0;
    return ((clicked / opened) * 100).toFixed(1);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Check className="h-4 w-4 text-green-500" />;
      case "Opened":
        return <Eye className="h-4 w-4 text-blue-500" />;
      case "Clicked":
        return <MousePointerClick className="h-4 w-4 text-purple-500" />;
      case "Failed":
        return <X className="h-4 w-4 text-red-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Ban className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Report: {campaignName}</CardTitle>
        <CardDescription>
          Performance metrics for your {campaignType} campaign
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Metrics</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="customers">Customer List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Recipients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getTotalRecipients()}</div>
                  <p className="text-sm text-muted-foreground">Message recipients</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Delivery Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getDeliveryRate()}%</div>
                  <p className="text-sm text-muted-foreground">Successfully delivered</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getClickRate()}%</div>
                  <p className="text-sm text-muted-foreground">Click-through rate</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Message Status</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={messageStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {messageStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Delivery by Day</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={deliveryRateByDayData}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="delivered" fill="#4ade80" />
                      <Bar dataKey="failed" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Delivered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {messageStatusData.find(item => item.name === "Delivered")?.value || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Successfully sent messages</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Failed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {messageStatusData.find(item => item.name === "Failed")?.value || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Failed to deliver</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">
                    {messageStatusData.find(item => item.name === "Pending")?.value || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">Awaiting delivery</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Failure Reasons</CardTitle>
                <CardDescription>Breakdown of message delivery failures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {failureReasons.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <X className="h-4 w-4 text-red-500" />
                        <span>{item.reason}</span>
                      </div>
                      <Badge variant="outline" className="text-red-600">{item.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Open Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getOpenRate()}%</div>
                  <p className="text-sm text-muted-foreground">
                    {messageStatusData.find(item => item.name === "Opened")?.value || 0} opened
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Click Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{getClickRate()}%</div>
                  <p className="text-sm text-muted-foreground">
                    {messageStatusData.find(item => item.name === "Clicked")?.value || 0} clicked
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1.8h</div>
                  <p className="text-sm text-muted-foreground">Average response time</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Response Times</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={responseRateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#4ade80" />
                      <Cell fill="#60a5fa" />
                      <Cell fill="#a78bfa" />
                      <Cell fill="#9ca3af" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Engagement</CardTitle>
                <CardDescription>Individual customer interactions with this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Customer</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Time</th>
                        <th className="px-4 py-2 text-left">Response/Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerList.map((customer, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="px-4 py-2">
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">{customer.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(customer.status)}
                              <span>{customer.status}</span>
                            </div>
                          </td>
                          <td className="px-4 py-2">{customer.time}</td>
                          <td className="px-4 py-2">
                            {customer.action && (
                              <Badge variant="outline" className="bg-green-50">
                                {customer.action}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Showing 5 of {getTotalRecipients()} customers
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
