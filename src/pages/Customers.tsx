
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PlusCircle, 
  Download, 
  Upload, 
  Filter, 
  Search,
  UserPlus,
  Mail,
  Tag,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerList from "@/components/customers/CustomerList";
import { sampleCustomers } from "@/data/sampleCustomers";
import { Badge } from "@/components/ui/badge";

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter customers based on search term
  const filteredCustomers = sampleCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by tag based on active tab
  const displayedCustomers = activeTab === "all" 
    ? filteredCustomers 
    : filteredCustomers.filter(customer => 
        customer.tags.includes(activeTab === "regular" ? "regular" : 
                              activeTab === "vip" ? "vip" : 
                              activeTab === "new" ? "new" : "")
      );

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
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Manage your customer information and contact details.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search customers..." 
                className="pl-8 w-[250px]" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="p-0"
          >
            <TabsList className="grid w-full grid-cols-5 rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                All Customers
              </TabsTrigger>
              <TabsTrigger
                value="vip"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <span className="flex items-center gap-1">
                  <UserCheck className="h-4 w-4" />
                  VIP
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="regular"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <span className="flex items-center gap-1">
                  <UserCheck className="h-4 w-4" />
                  Regular
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <span className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" />
                  New
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="tags"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Tags
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="p-0 pt-6">
              {displayedCustomers.length > 0 ? (
                <CustomerList customers={displayedCustomers} />
              ) : (
                <div className="text-center p-16 text-muted-foreground">
                  <p className="text-lg">No customers found.</p>
                  <p className="mt-2">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="vip" className="p-0 pt-6">
              {displayedCustomers.length > 0 ? (
                <CustomerList customers={displayedCustomers} />
              ) : (
                <div className="text-center p-16 text-muted-foreground">
                  <p className="text-lg">No VIP customers found.</p>
                  <Button className="mt-4">
                    <UserPlus className="mr-2 h-4 w-4" /> Add VIP Customer
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="regular" className="p-0 pt-6">
              {displayedCustomers.length > 0 ? (
                <CustomerList customers={displayedCustomers} />
              ) : (
                <div className="text-center p-16 text-muted-foreground">
                  <p className="text-lg">No regular customers found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="new" className="p-0 pt-6">
              {displayedCustomers.length > 0 ? (
                <CustomerList customers={displayedCustomers} />
              ) : (
                <div className="text-center p-16 text-muted-foreground">
                  <p className="text-lg">No new customers found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tags" className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Delivery</div>
                    <Badge variant="secondary" className="mt-1">3 customers</Badge>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Dine-in</div>
                    <Badge variant="secondary" className="mt-1">2 customers</Badge>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Pickup</div>
                    <Badge variant="secondary" className="mt-1">1 customer</Badge>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Catering</div>
                    <Badge variant="secondary" className="mt-1">1 customer</Badge>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4 border-dashed">
                  <div className="text-left flex items-center">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    <span>Add Tag</span>
                  </div>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
