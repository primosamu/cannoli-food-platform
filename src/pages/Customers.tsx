import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchIcon, PlusCircle, Download, Upload } from "lucide-react";
import CustomerList from "@/components/customers/CustomerList";
import { useToast } from "@/hooks/use-toast";
import CustomerDetailDialog from "@/components/customers/CustomerDetailDialog";
import CustomerEditDialog from "@/components/customers/CustomerEditDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Customer } from "@/components/customers/CustomerList";
import { CustomerSearchFilters } from "@/components/customers/CustomerSearchFilters";
import { InsufficientCreditsDialog } from "@/components/customers/InsufficientCreditsDialog";
import { CustomerEnrichmentDialog } from "@/components/customers/CustomerEnrichmentDialog";

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

  const availablePhoneCredits = 150;
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
      title: translations.customerUpdated || "Cliente atualizado",
      description: `${updatedCustomer.name} ${translations.wasUpdated || "foi atualizado com sucesso"}`,
    });
  };

  const handleDelete = (customer: Customer) => {
    setCustomers(customers.filter(c => c.id !== customer.id));
    toast({
      title: translations.customerDeleted || "Cliente excluído",
      description: `${customer.name} ${translations.wasRemoved || "foi removido"}`,
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
    
    setIsEnrichmentDialogOpen(true);
  };
  
  const handleNavigateToBilling = () => {
    navigate('/billing');
    setShowInsufficientCreditsDialog(false);
  };

  const handleProceedWithEnrichment = () => {
    toast({
      title: translations.phoneEnrichment || "Enriquecimento de Telefone",
      description: translations.phoneEnrichmentComplete || "O processo de enriquecimento foi iniciado e você será notificado quando estiver concluído.",
    });
    setIsEnrichmentDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {translations.customerManagement || "Gerenciamento de Clientes"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {translations.manageCustomerInfo || "Gerencie informações e detalhes de contato dos seus clientes"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            {translations.importCustomers || "Importar"}
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {translations.exportCustomers || "Exportar"}
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-800">
            <PlusCircle className="h-4 w-4" />
            {translations.addCustomer || "Adicionar Cliente"}
          </Button>
        </div>
      </div>

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle>{translations.connectedCustomers || "Clientes Conectados"}</CardTitle>
          <CardDescription>{translations.viewAndManageCustomer || "Visualize e gerencie sua base de clientes."}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <CustomerSearchFilters searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </CardContent>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">{translations.allCustomers || "Todos os Clientes"}</TabsTrigger>
              <TabsTrigger value="new">{translations.newCustomer || "Novos"}</TabsTrigger>
              <TabsTrigger value="vip">{translations.vipCustomer || "VIP"}</TabsTrigger>
              <TabsTrigger value="regular">{translations.regularCustomer || "Regulares"}</TabsTrigger>
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
                <div className="text-center py-12 border border-dashed rounded-lg bg-muted/20">
                  <SearchIcon className="mx-auto h-12 w-12 text-muted stroke-[1.25]" />
                  <p className="mt-4 text-lg font-medium">{translations.noCustomersFound || "Nenhum cliente encontrado."}</p>
                  <p className="text-muted-foreground">{translations.adjustSearchFilter || "Tente ajustar seus critérios de busca ou filtro."}</p>
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

      <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{translations.phoneEnrichment || "Enriquecimento de Telefone"}</CardTitle>
          <CardDescription>
            {customers.length} {translations.customersWithoutPhone || "clientes sem números de telefone"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleEnrichment}
            className="bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-800 gap-2"
          >
            <SearchIcon className="h-4 w-4" />
            {translations.completeMissingPhoneNumbers || "Completar Números de Telefone Faltantes"}
          </Button>
        </CardContent>
      </Card>
      
      <InsufficientCreditsDialog
        isOpen={showInsufficientCreditsDialog}
        onClose={() => setShowInsufficientCreditsDialog(false)}
        onBuyCredits={handleNavigateToBilling}
        availableCredits={availablePhoneCredits}
        requiredCredits={minimumCreditsRequired}
      />
      
      <CustomerDetailDialog
        isOpen={isDetailDialogOpen}
        onClose={handleDetailClose}
        customer={selectedCustomer}
        onEdit={handleEditOpen}
      />
      
      <CustomerEditDialog
        isOpen={isEditDialogOpen}
        onClose={handleEditClose}
        customer={selectedCustomer}
        onUpdate={handleCustomerUpdate}
      />
      
      <CustomerEnrichmentDialog
        isOpen={isEnrichmentDialogOpen}
        onClose={() => setIsEnrichmentDialogOpen(false)}
        onProceed={handleProceedWithEnrichment}
      />
    </div>
  );
};

export default CustomersPage;
