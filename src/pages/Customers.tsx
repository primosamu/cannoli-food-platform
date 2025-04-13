import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, PlusCircle, AlertCircle, Download, Upload, Tag } from "lucide-react";
import CustomerList from "@/components/customers/CustomerList";
import { useToast } from "@/components/ui/use-toast";
import CustomerDetailDialog from "@/components/customers/CustomerDetailDialog";
import CustomerEditDialog from "@/components/customers/CustomerEditDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Customer } from "@/components/customers/CustomerList";

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      orderCount: 5,
      lastOrderDate: new Date('2024-07-20'),
      totalSpent: 150.00,
      tags: ['VIP', 'New'],
      joinDate: new Date('2023-01-15'),
      cpf: '123.456.789-00'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1987654321',
      orderCount: 3,
      lastOrderDate: new Date('2024-07-15'),
      totalSpent: 75.50,
      tags: ['Regular'],
      joinDate: new Date('2023-02-20'),
      cpf: '987.654.321-00'
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+1555123456',
      orderCount: 8,
      lastOrderDate: new Date('2024-07-10'),
      totalSpent: 200.00,
      tags: ['VIP', 'Loyal'],
      joinDate: new Date('2022-11-05'),
      cpf: '111.222.333-44'
    },
    {
      id: '4',
      name: 'Bob Williams',
      email: 'bob.williams@example.com',
      phone: '+1123555789',
      orderCount: 2,
      lastOrderDate: new Date('2024-07-05'),
      totalSpent: 50.00,
      tags: ['New'],
      joinDate: new Date('2024-01-10'),
      cpf: '444.555.666-77'
    },
    {
      id: '5',
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      phone: '+1987123555',
      orderCount: 6,
      lastOrderDate: new Date('2024-06-30'),
      totalSpent: 120.75,
      tags: ['Regular', 'Loyal'],
      joinDate: new Date('2023-06-15'),
      cpf: '777.888.999-00'
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEnrichmentDialogOpen, setIsEnrichmentDialogOpen] = useState(false);
  const { toast } = useToast();
  const [showInsufficientCreditsDialog, setShowInsufficientCreditsDialog] = useState(false);
  const navigate = useNavigate();
  const { translations } = useLanguage();

  // Simulating available phone enrichment credits
  const availablePhoneCredits = 150; // Simulando como baixo para demonstração
  const minimumCreditsRequired = 200;
  
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const handleDetailOpen = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailDialogOpen(true);
  };

  const handleDetailClose = () => {
    setIsDetailDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleEditOpen = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleCustomerUpdate = (updatedCustomer: Customer) => {
    setCustomers(customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
    setIsEditDialogOpen(false);
    setSelectedCustomer(null);
    toast({
      title: translations.customerUpdated || "Customer updated",
      description: `${updatedCustomer.name} ${translations.wasUpdated || "was updated successfully"}`,
    });
  };

  const handleDelete = (customer: Customer) => {
    setCustomers(customers.filter(c => c.id !== customer.id));
    toast({
      title: translations.customerDeleted || "Customer deleted",
      description: `${customer.name} ${translations.wasRemoved || "was removed"}`,
    });
  };
  
  const checkSufficientCredits = () => {
    return availablePhoneCredits >= minimumCreditsRequired;
  };
  
  const handleEnrichment = () => {
    if (!checkSufficientCredits()) {
      setShowInsufficientCreditsDialog(true);
      return;
    }
    
    // Original enrichment code
    setIsEnrichmentDialogOpen(true);
  };
  
  const handleNavigateToBilling = () => {
    navigate('/billing');
    setShowInsufficientCreditsDialog(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.customerManagement || "Customer Management"}</h2>
          <p className="text-muted-foreground">
            {translations.manageCustomerInfo || "Manage your customer information and contact details"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            {translations.importCustomers || "Import"}
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {translations.exportCustomers || "Export"}
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {translations.addCustomer || "Add Customer"}
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{translations.connectedCustomers || "Connected Customers"}</CardTitle>
          <CardDescription>{translations.viewAndManageCustomer || "View and manage your customer database."}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="col-span-2">
              <Input
                type="search"
                placeholder={translations.searchCustomers || "Search customers..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Button variant="outline" className="w-full">
                <Tag className="mr-2 h-4 w-4" />
                {translations.tags || "Tags"}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">{translations.allCustomers || "All Customers"}</TabsTrigger>
              <TabsTrigger value="new">{translations.newCustomer || "New"}</TabsTrigger>
              <TabsTrigger value="vip">{translations.vipCustomer || "VIP"}</TabsTrigger>
              <TabsTrigger value="regular">{translations.regularCustomer || "Regular"}</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              {filteredCustomers.length > 0 ? (
                <CustomerList
                  customers={filteredCustomers}
                  onDetailOpen={handleDetailOpen}
                  onEditOpen={handleEditOpen}
                  onDelete={handleDelete}
                />
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">{translations.noCustomersFound || "No customers found."}</p>
                  <p className="text-muted-foreground">{translations.adjustSearchFilter || "Try adjusting your search or filter criteria."}</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="new" className="pt-4">
              {/* Content for New Customers tab */}
            </TabsContent>
            <TabsContent value="vip" className="pt-4">
              {/* Content for VIP Customers tab */}
            </TabsContent>
            <TabsContent value="regular" className="pt-4">
              {/* Content for Regular Customers tab */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{translations.phoneEnrichment || "Phone Number Enrichment"}</CardTitle>
          <CardDescription>
            {customers.length} {translations.customersWithoutPhone || "customers without phone numbers"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleEnrichment}>
            <SearchIcon className="mr-2 h-4 w-4" />
            {translations.completeMissingPhoneNumbers || "Complete Missing Phone Numbers"}
          </Button>
        </CardContent>
      </Card>
      
      {/* Insufficient Credits Dialog */}
      <Dialog open={showInsufficientCreditsDialog} onOpenChange={setShowInsufficientCreditsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              {translations.insufficientCredits || "Créditos insuficientes"}
            </DialogTitle>
            <DialogDescription>
              {translations.buyCreditsToUseFeature || "Compre créditos para utilizar esta funcionalidade"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              {`${translations.phoneEnrichmentCredits || "Créditos de enriquecimento de telefone"}: `}
              <span className="font-semibold text-orange-500">{availablePhoneCredits}</span>
              {` / ${minimumCreditsRequired} ${translations.credits || "créditos"}`}
            </p>
            <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500" 
                style={{ width: `${(availablePhoneCredits / minimumCreditsRequired) * 100}%` }}
              ></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInsufficientCreditsDialog(false)}>
              {translations.cancel || "Cancelar"}
            </Button>
            <Button onClick={handleNavigateToBilling}>
              {translations.buyCredits || "Comprar Créditos"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <CustomerDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleDetailClose}
        customer={selectedCustomer}
      />
      <CustomerEditDialog
        isOpen={isEditDialogOpen}
        onClose={handleEditClose}
        customer={selectedCustomer}
      />
      <Dialog open={isEnrichmentDialogOpen} onOpenChange={setIsEnrichmentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{translations.phoneEnrichment || "Phone Number Enrichment"}</DialogTitle>
            <DialogDescription>
              {translations.completeMissingPhoneNumbers || "Complete Missing Phone Numbers"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              {translations.apiWillUse || "The API will use the customer CPF to fetch valid mobile phone numbers from our trusted data provider."}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEnrichmentDialogOpen(false)}>
              {translations.cancel || "Cancel"}
            </Button>
            <Button>
              {translations.proceedWithEnrichment || "Proceed with Enrichment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
