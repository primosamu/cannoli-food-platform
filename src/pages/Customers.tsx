
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CustomersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
          <p className="text-muted-foreground">
            View and manage your customer database.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Manage your customer information and contact details.
            </CardDescription>
          </div>
          <div className="w-1/3">
            <Input placeholder="Search customers..." />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center p-16 text-muted-foreground">
            <p className="text-lg">No customer records found.</p>
            <p className="mt-2">Add customers manually or import from a CSV file.</p>
            <Button className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Customer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
