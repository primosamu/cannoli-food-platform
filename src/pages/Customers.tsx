import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CustomerList from "@/components/customers/CustomerList";
import CustomerDetailDialog from "@/components/customers/CustomerDetailDialog";
import CustomerEditDialog from "@/components/customers/CustomerEditDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CustomerEnrichmentDialog } from "@/components/customers/CustomerEnrichmentDialog";
import { InsufficientCreditsDialog } from "@/components/customers/InsufficientCreditsDialog";

import { Plus, FileUp, Users, TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const sampleCustomers = [
  {
    id: "c1",
    name: "João Silva",
    phone: "+5511987654321",
    email: "joao@example.com",
    lastOrderDate: new Date("2023-03-15"),
    totalSpent: 1250.75,
    tags: ["Vegetarian", "Frequent"],
    orderCount: 15,
    joinDate: new Date("2022-06-15"),
    address: "Rua Augusta, 1245, São Paulo, SP",
    cpf: "123.456.789-00",
    notes: "Prefers delivery in the evening. Always tips well."
  },
  {
    id: "c2",
    name: "Maria Oliveira",
    phone: "",
    email: "maria@example.com",
    lastOrderDate: new Date("2023-03-20"),
    totalSpent: 890.50,
    tags: ["New Customer", "Office Order"],
    orderCount: 5,
    joinDate: new Date("2022-12-10"),
    address: "Av. Paulista, 1000, São Paulo, SP",
    cpf: "987.654.321-00",
    notes: ""
  },
  {
    id: "c3",
    name: "Pedro Costa",
    phone: "+5511976543210",
    email: "pedro@example.com",
    lastOrderDate: new Date("2023-02-28"),
    totalSpent: 2300.25,
    tags: ["VIP", "Frequent", "Weekend"],
    orderCount: 25,
    joinDate: new Date("2021-10-05"),
    address: "",
    cpf: "456.789.123-00",
    notes: "Prefers table by the window. Allergic to nuts."
  },
  {
    id: "c4",
    name: "Ana Souza",
    phone: "",
    email: "ana@example.com",
    lastOrderDate: new Date("2023-01-15"),
    totalSpent: 450.00,
    tags: ["Occasional"],
    orderCount: 3,
    joinDate: new Date("2022-09-20"),
    address: "Rua Consolação, 250, São Paulo, SP",
    cpf: "789.123.456-00",
    notes: ""
  }
];

const customerTags = ["Vegetarian", "Frequent", "New Customer", "Office Order", "VIP", "Weekend", "Occasional"];

export const Customers = () => {
  const [customers, setCustomers] = useState(sampleCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEnrichmentDialogOpen, setIsEnrichmentDialogOpen] = useState(false);
  const [isInsufficientCreditsOpen, setIsInsufficientCreditsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const availablePhoneCredits = 150;
  const minimumCreditsRequired = 200;

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  ).filter(customer => {
    if (filterTab === "all") return true;
    if (filterTab === "new") return customer.orderCount < 3;
    if (filterTab === "vip") return customer.totalSpent > 2000;
    if (filterTab === "phone-missing") return !customer.phone;
    return true;
  });

  const customersWithoutPhone = customers.filter(customer => !customer.phone);
  
  const handleOpenCustomerDetail = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const handleOpenCustomerEdit = (customer: any) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleCustomerDelete = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
    setIsDeleteConfirmOpen(false);
    toast(translations.wasRemoved);
  };

  const handleCustomerUpdate = (updatedCustomer: any) => {
    setCustomers(customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    ));
    setIsEditOpen(false);
    toast(translations.customerUpdated);
  };

  const handleEnrichmentClick = () => {
    if (availablePhoneCredits < minimumCreditsRequired) {
      setIsInsufficientCreditsOpen(true);
    } else {
      setIsEnrichmentDialogOpen(true);
    }
  };

  const handleProceedWithEnrichment = () => {
    toast(translations.enrichmentProcessStarted);
    setIsEnrichmentDialogOpen(false);
  };

  return (
    <div className="space-y-4 p-8 pt-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.customerManagement}</h2>
          <p className="text-muted-foreground">
            {translations.manageCustomerInfo}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 gap-1"
            onClick={handleEnrichmentClick}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:block">{translations.completeMissingPhoneNumbers}</span>
            <span className="block sm:hidden">{translations.phone}</span>
            <Badge variant="secondary" className="ml-1">
              {customersWithoutPhone.length}
            </Badge>
          </Button>
          
          <Button className="h-8 gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>{translations.addCustomer}</span>
          </Button>
          
          <Button variant="outline" size="icon" className="h-8 w-8">
            <FileUp className="h-3.5 w-3.5" />
          </Button>
          
          <Button variant="outline" size="icon" className="h-8 w-8">
            <FileUp className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.allCustomers}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.vipCustomer}</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.totalSpent > 2000).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.newCustomer}</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.filter(c => c.orderCount < 3).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{translations.popularTags}</CardTitle>
            <TagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {customerTags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder={translations.searchCustomers}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Tabs
            defaultValue="all"
            className="w-auto"
            value={filterTab}
            onValueChange={setFilterTab}
          >
            <TabsList>
              <TabsTrigger value="all" className="text-xs">
                {translations.allCustomers}
              </TabsTrigger>
              <TabsTrigger value="new" className="text-xs">
                {translations.newCustomer}
              </TabsTrigger>
              <TabsTrigger value="vip" className="text-xs">
                {translations.vipCustomer}
              </TabsTrigger>
              <TabsTrigger value="phone-missing" className="text-xs">
                {translations.noPhone}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="rounded-md border">
          <CustomerList
            customers={filteredCustomers}
            onDetailOpen={handleOpenCustomerDetail}
            onEditOpen={handleOpenCustomerEdit}
            onDelete={handleCustomerDelete}
          />
        </div>
      </div>

      <CustomerDetailDialog 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)} 
        customer={selectedCustomer} 
      />
      
      <CustomerEditDialog 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        customer={selectedCustomer} 
        onUpdate={handleCustomerUpdate} 
      />

      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{translations.confirmDeletion}</AlertDialogTitle>
            <AlertDialogDescription>
              {translations.deleteCustomerConfirmation} {selectedCustomer?.name}? {translations.actionCannotBeUndone}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{translations.cancel}</AlertDialogCancel>
            <Button variant="destructive" onClick={confirmDelete}>
              {translations.delete}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CustomerEnrichmentDialog
        isOpen={isEnrichmentDialogOpen}
        onClose={() => setIsEnrichmentDialogOpen(false)}
        onProceed={handleProceedWithEnrichment}
        customersWithoutPhone={customersWithoutPhone}
      />

      <InsufficientCreditsDialog
        isOpen={isInsufficientCreditsOpen}
        onClose={() => setIsInsufficientCreditsOpen(false)}
        availableCredits={availablePhoneCredits}
        requiredCredits={minimumCreditsRequired}
        onBuyCredits={() => navigate("/billing")}
      />
    </div>
  );
};

export default Customers;
