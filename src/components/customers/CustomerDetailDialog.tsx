
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Customer } from "./CustomerList";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, MessageSquare, User, Package, Tag } from "lucide-react";

interface CustomerDetailDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock purchase history
const generatePurchaseHistory = (customer: Customer) => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `ord-${1000 + i}`,
    date: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)), // Each purchase is 1 week apart
    items: i === 0 
      ? "Penne alla Vodka, Garlic Bread" 
      : i === 1 
        ? "Margherita Pizza, Caesar Salad" 
        : i === 2 
          ? "Tiramisu, Espresso" 
          : i === 3 
            ? "Fettuccine Alfredo, Bruschetta" 
            : "Spaghetti Carbonara, Wine",
    amount: (customer.totalSpent / 5) * (1 - (i * 0.05))
  }));
};

// Mock campaign history
const generateCampaignHistory = (customer: Customer) => {
  return Array.from({ length: 3 }, (_, i) => ({
    id: `camp-${1000 + i}`,
    name: i === 0 
      ? "Summer Special" 
      : i === 1 
        ? "Weekend Promotion" 
        : "Loyalty Reward",
    date: new Date(Date.now() - (i * 15 * 24 * 60 * 60 * 1000)), // Each campaign is 15 days apart
    type: i === 0 ? "email" : i === 1 ? "sms" : "whatsapp",
    status: i === 0 ? "delivered" : i === 1 ? "opened" : "clicked"
  }));
};

const CustomerDetailDialog: React.FC<CustomerDetailDialogProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [messageText, setMessageText] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  
  if (!customer) return null;
  
  const purchaseHistory = generatePurchaseHistory(customer);
  const campaignHistory = generateCampaignHistory(customer);
  
  const handleSendMessage = () => {
    if (!messageText) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message sent",
      description: `Your message has been queued to be sent to ${customer.name}`,
    });
    setMessageText("");
  };
  
  const handleSendEmail = () => {
    if (!emailSubject || !emailBody) {
      toast({
        title: "Error",
        description: "Please enter both subject and body",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Email sent",
      description: `Your email has been queued to be sent to ${customer.name}`,
    });
    setEmailSubject("");
    setEmailBody("");
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-blue-100 text-blue-800">Delivered</Badge>;
      case "opened":
        return <Badge className="bg-green-100 text-green-800">Opened</Badge>;
      case "clicked":
        return <Badge className="bg-purple-100 text-purple-800">Clicked</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "email":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Email</Badge>;
      case "sms":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">SMS</Badge>;
      case "whatsapp":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">WhatsApp</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" />
            {customer.name}
          </DialogTitle>
          <DialogDescription>
            Customer since {format(customer.joinDate, "MMMM dd, yyyy")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customer.orderCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${customer.totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Last Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{format(customer.lastOrderDate, "MMM dd")}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Tags:</span>
          </div>
          {customer.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            <TabsTrigger value="campaigns">Campaign History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm col-span-2">{customer.email}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium">Phone:</span>
                    <span className="text-sm col-span-2">{customer.phone}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium">Join Date:</span>
                    <span className="text-sm col-span-2">{format(customer.joinDate, "MMMM dd, yyyy")}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Last order: </span>
                    <span>{format(customer.lastOrderDate, "MMMM dd, yyyy")}</span>
                  </div>
                  {purchaseHistory.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Recent purchase: </span>
                      <span>{purchaseHistory[0].items}</span>
                    </div>
                  )}
                  {campaignHistory.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">Last campaign: </span>
                      <span>{campaignHistory[0].name} ({format(campaignHistory[0].date, "MMM dd")})</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Send Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Textarea 
                    placeholder="Enter your message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    className="w-full"
                    onClick={handleSendMessage}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> Send WhatsApp/SMS
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Send Email</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input 
                    placeholder="Subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="mb-2"
                  />
                  <Textarea 
                    placeholder="Email body"
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    className="w-full"
                    onClick={handleSendEmail}
                  >
                    <Mail className="h-4 w-4 mr-2" /> Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Items</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((purchase) => (
                    <tr key={purchase.id} className="border-b">
                      <td className="px-4 py-2">{purchase.id}</td>
                      <td className="px-4 py-2">{format(purchase.date, "MMM dd, yyyy")}</td>
                      <td className="px-4 py-2">{purchase.items}</td>
                      <td className="px-4 py-2">${purchase.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Campaign</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignHistory.map((campaign) => (
                    <tr key={campaign.id} className="border-b">
                      <td className="px-4 py-2">{campaign.name}</td>
                      <td className="px-4 py-2">{format(campaign.date, "MMM dd, yyyy")}</td>
                      <td className="px-4 py-2">{getTypeBadge(campaign.type)}</td>
                      <td className="px-4 py-2">{getStatusBadge(campaign.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
