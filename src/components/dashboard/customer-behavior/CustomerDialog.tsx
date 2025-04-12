
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface CustomerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedChart: string | null;
  selectedSegment: any;
  onRedirectToCampaign: (segmentName?: string, segmentType?: string) => void;
}

export const CustomerDialog: React.FC<CustomerDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedChart,
  selectedSegment,
  onRedirectToCampaign
}) => {
  // Generate segment-based tags for each customer
  const generateTags = (customerIndex: number) => {
    const tags = [];
    
    // Add segment-based tag
    if (selectedSegment?.name) {
      tags.push(selectedSegment.name);
    } else if (selectedSegment?.group) {
      tags.push(selectedSegment.group);
    }
    
    // Add additional tags based on segment type
    if (selectedChart === 'recency') {
      tags.push('Recent Customer');
    } else if (selectedChart === 'frequency') {
      tags.push(customerIndex % 3 === 0 ? 'High Frequency' : 'Regular');
    } else if (selectedChart === 'monetary') {
      tags.push(customerIndex % 2 === 0 ? 'Big Spender' : 'Value Conscious');
    } else if (selectedChart === 'rfm-segments') {
      tags.push('RFM Tagged');
    } else if (selectedChart?.includes('preference')) {
      tags.push('Preference Tracked');
    }
    
    return tags;
  };
  
  const generateCampaignHistory = (customerIndex: number) => {
    const campaigns = [
      { name: "Easter Special", date: "2025-03-30", status: "Delivered" },
      { name: "Monthly Newsletter", date: "2025-03-15", status: "Opened" },
      { name: "Loyalty Rewards", date: "2025-02-20", status: "Clicked" }
    ];
    
    // Add a different status for some customers to show variety
    if (customerIndex % 3 === 0) {
      campaigns[0].status = "Failed";
    } else if (customerIndex % 2 === 0) {
      campaigns[1].status = "Clicked";
    }
    
    return campaigns;
  };
  
  const generatePurchaseHistory = (customerIndex: number) => {
    return [
      { 
        id: `ord-${1000 + customerIndex * 3}`, 
        date: `2025-04-${Math.min(10 - customerIndex, 1)}`, 
        amount: (45.50 + customerIndex * 5.75).toFixed(2),
        items: "Pizza Margherita, Tiramisu" 
      },
      { 
        id: `ord-${1001 + customerIndex * 3}`, 
        date: `2025-03-${20 - customerIndex * 2}`, 
        amount: (32.75 + customerIndex * 3.25).toFixed(2),
        items: "Spaghetti Carbonara, Garlic Bread" 
      },
      { 
        id: `ord-${1002 + customerIndex * 3}`, 
        date: `2025-03-${5 - customerIndex}`, 
        amount: (28.90 + customerIndex * 2.10).toFixed(2),
        items: "Caesar Salad, Lasagna" 
      }
    ];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
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
                  <th className="px-4 py-2 text-left">Tags</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => {
                  const tags = generateTags(i);
                  return (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-2">Customer {i + 1}</td>
                      <td className="px-4 py-2">customer{i+1}@example.com</td>
                      <td className="px-4 py-2">{Math.floor(Math.random() * 20) + 1}</td>
                      <td className="px-4 py-2">2025-04-{Math.floor(Math.random() * 12) + 1}</td>
                      <td className="px-4 py-2">${((Math.random() * 500) + 50).toFixed(2)}</td>
                      <td className="px-4 py-2">
                        <div className="flex flex-wrap gap-1">
                          {tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="space-y-1">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="w-full"
                            onClick={() => onRedirectToCampaign(
                              `Customer ${i + 1}`, 
                              selectedSegment?.name || selectedSegment?.group || selectedChart
                            )}
                          >
                            Add to Campaign
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => {
                              const detailsRow = document.getElementById(`details-${i}`);
                              if (detailsRow) {
                                detailsRow.classList.toggle('hidden');
                              }
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Customer Details Expandable Sections */}
          {Array.from({ length: 5 }).map((_, i) => {
            const purchaseHistory = generatePurchaseHistory(i);
            const campaignHistory = generateCampaignHistory(i);
            
            return (
              <div key={`details-${i}`} id={`details-${i}`} className="hidden border rounded-md p-4 bg-muted/20">
                <h3 className="font-medium mb-3">Customer {i + 1} Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Purchase History</h4>
                    <div className="border rounded-md">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="px-3 py-1 text-left">Order ID</th>
                            <th className="px-3 py-1 text-left">Date</th>
                            <th className="px-3 py-1 text-left">Amount</th>
                            <th className="px-3 py-1 text-left">Items</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchaseHistory.map((purchase, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="px-3 py-1">{purchase.id}</td>
                              <td className="px-3 py-1">{purchase.date}</td>
                              <td className="px-3 py-1">${purchase.amount}</td>
                              <td className="px-3 py-1 truncate max-w-[150px]" title={purchase.items}>
                                {purchase.items}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Campaign History</h4>
                    <div className="border rounded-md">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="px-3 py-1 text-left">Campaign</th>
                            <th className="px-3 py-1 text-left">Date</th>
                            <th className="px-3 py-1 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaignHistory.map((campaign, idx) => (
                            <tr key={idx} className="border-b">
                              <td className="px-3 py-1">{campaign.name}</td>
                              <td className="px-3 py-1">{campaign.date}</td>
                              <td className="px-3 py-1">
                                <Badge className={
                                  campaign.status === "Delivered" ? "bg-blue-100 text-blue-800" :
                                  campaign.status === "Opened" ? "bg-green-100 text-green-800" :
                                  campaign.status === "Clicked" ? "bg-purple-100 text-purple-800" :
                                  "bg-red-100 text-red-800"
                                }>
                                  {campaign.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing 5 of {selectedSegment?.value || 100} customers
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">View All</Button>
              <Button 
                onClick={() => onRedirectToCampaign(
                  selectedSegment?.name || selectedSegment?.group, 
                  selectedChart
                )}
              >
                Create Campaign for This Group
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
