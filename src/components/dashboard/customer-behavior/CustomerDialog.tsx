
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle
} from "@/components/ui/dialog";

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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onRedirectToCampaign(
                          `Customer ${i + 1}`, 
                          selectedSegment?.name || selectedSegment?.group || selectedChart
                        )}
                      >
                        Add to Campaign
                      </Button>
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
