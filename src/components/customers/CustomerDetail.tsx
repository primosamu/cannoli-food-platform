
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Customer } from "./CustomerList";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface CustomerDetailProps {
  customer: Customer;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {customer.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone Number</p>
              <p className="text-sm">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">CPF</p>
              <p className="text-sm">{customer.cpf}</p>
            </div>
            {customer.address && (
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm">{customer.address}</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Purchase History</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-sm font-medium">Total Orders</p>
              <p className="text-sm">{customer.orderCount}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Last Order</p>
              <p className="text-sm">{customer.lastOrderDate ? formatDate(customer.lastOrderDate) : "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Spent</p>
              <p className="text-sm">{formatCurrency(customer.totalSpent || 0)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Customer Since</p>
              <p className="text-sm">{formatDate(customer.joinDate)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {customer.notes && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
          <p className="text-sm mt-2">{customer.notes}</p>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
