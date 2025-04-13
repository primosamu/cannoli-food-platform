
import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  MoreHorizontal,
  Trash2,
  MessageSquare,
  Mail,
  Calendar,
  Phone,
  Database,
  Users,
  Check,
  Tags,
  PieChart,
  DollarSign,
  ShoppingCart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import CustomerDetailDialog from "./CustomerDetailDialog";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomerEditDialog from "./CustomerEditDialog";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  lastOrderDate?: Date;
  totalSpent: number;
  tags: string[];
  joinDate: Date;
  cpf: string; // Brazilian personal ID
  address?: string;
  birthDate?: Date;
  notes?: string;
}

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isPhoneEnrichmentOpen, setIsPhoneEnrichmentOpen] = useState(false);
  const [selectedCustomersForEnrichment, setSelectedCustomersForEnrichment] = useState<Customer[]>([]);
  
  const [enrichmentCount, setEnrichmentCount] = useState(10);
  const [enrichmentTab, setEnrichmentTab] = useState("count");
  const [minOrderCount, setMinOrderCount] = useState(0);
  const [minTotalSpent, setMinTotalSpent] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxEnrichmentCount, setMaxEnrichmentCount] = useState(0);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const openCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailDialogOpen(true);
  };

  const openCustomerEdit = (customer: Customer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const openCustomerDelete = (customer: Customer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleQuickMessage = (customer: Customer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCustomer(customer);
    setIsMessageDialogOpen(true);
  };

  const handleQuickEmail = (customer: Customer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCustomer(customer);
    setIsEmailDialogOpen(true);
  };

  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return;

    toast({
      title: translations.customerDeleted || "Cliente excluído",
      description: `${selectedCustomer.name} ${translations.wasRemoved || "foi removido"}.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleSendMessage = () => {
    if (!messageText || !selectedCustomer) return;

    toast({
      title: "Message sent",
      description: `Message sent to ${selectedCustomer.name}: "${messageText}"`,
    });
    setMessageText("");
    setIsMessageDialogOpen(false);
  };

  const handleSendEmail = () => {
    if (!emailSubject || !emailBody || !selectedCustomer) return;

    toast({
      title: "Email sent",
      description: `Email sent to ${selectedCustomer.name} with subject: "${emailSubject}"`,
    });
    setEmailSubject("");
    setEmailBody("");
    setIsEmailDialogOpen(false);
  };

  const handlePhoneEnrichment = () => {
    const customersWithoutPhone = customers.filter(c => !c.phone || c.phone === "");

    if (customersWithoutPhone.length === 0) {
      toast({
        title: translations.noEnrichmentNeeded || "Sem necessidade de enriquecimento",
        description: translations.allCustomersHavePhones || "Todos os clientes já possuem números de telefone."
      });
      return;
    }

    setMaxEnrichmentCount(customersWithoutPhone.length);
    
    setEnrichmentCount(Math.min(10, customersWithoutPhone.length));
    
    setMinOrderCount(0);
    setMinTotalSpent(0);
    setSelectedTags([]);
    
    setSelectedCustomersForEnrichment(customersWithoutPhone.slice(0, enrichmentCount));
    
    setIsPhoneEnrichmentOpen(true);
  };

  const handleEnrichmentCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const validValue = Math.max(1, value);
    setEnrichmentCount(validValue);
  };

  const confirmPhoneEnrichment = () => {
    if (selectedCustomersForEnrichment.length === 0) return;

    toast({
      title: translations.phoneEnrichmentComplete || "Enriquecimento de telefone concluído",
      description: `${translations.successfullyEnriched || "Enriquecido com sucesso"} ${selectedCustomersForEnrichment.length} ${translations.customerPhones || "números de telefone de clientes"}.`,
    });
    
    setIsPhoneEnrichmentOpen(false);
  };

  const updateSelectedCustomersForEnrichment = () => {
    let filteredCustomers = customers.filter(c => !c.phone || c.phone === "");
    
    if (enrichmentTab === "filter") {
      if (minOrderCount > 0) {
        filteredCustomers = filteredCustomers.filter(c => c.orderCount >= minOrderCount);
      }
      
      if (minTotalSpent > 0) {
        filteredCustomers = filteredCustomers.filter(c => c.totalSpent >= minTotalSpent);
      }
      
      if (selectedTags.length > 0) {
        filteredCustomers = filteredCustomers.filter(c => 
          selectedTags.some(tag => c.tags.includes(tag))
        );
      }
      
      setSelectedCustomersForEnrichment(filteredCustomers);
    } else {
      setSelectedCustomersForEnrichment(filteredCustomers.slice(0, enrichmentCount));
    }
  };

  React.useEffect(() => {
    if (isPhoneEnrichmentOpen) {
      updateSelectedCustomersForEnrichment();
    }
  }, [enrichmentCount, minOrderCount, minTotalSpent, selectedTags, enrichmentTab, isPhoneEnrichmentOpen]);

  const allTags = React.useMemo(() => {
    const tagsSet = new Set<string>();
    customers.forEach(customer => {
      customer.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [customers]);

  const toggleTagSelection = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const customerStatistics = React.useMemo(() => {
    if (!selectedCustomersForEnrichment.length) return null;
    
    const totalOrders = selectedCustomersForEnrichment.reduce((sum, customer) => sum + customer.orderCount, 0);
    const totalSpent = selectedCustomersForEnrichment.reduce((sum, customer) => sum + customer.totalSpent, 0);
    
    const tagCounts = selectedCustomersForEnrichment.reduce((acc, customer) => {
      customer.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([tag, count]) => ({ tag, count }));
      
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
    
    return {
      totalOrders,
      totalSpent,
      topTags,
      averageOrderValue,
      averageOrdersPerCustomer: totalOrders / selectedCustomersForEnrichment.length
    };
  }, [selectedCustomersForEnrichment]);

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: translations.customer || "Cliente",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-muted-foreground">
                {customer.email} · CPF: {customer.cpf}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: translations.phoneNumber || "Telefone",
      cell: ({ row }) => {
        const customer = row.original;
        return customer.phone ? (
          customer.phone
        ) : (
          <span className="text-muted-foreground italic text-xs">{translations.noPhone || "Sem telefone"}</span>
        );
      },
    },
    {
      accessorKey: "orderCount",
      header: translations.orders || "Pedidos",
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="font-mono">
            {row.original.orderCount}
          </Badge>
        );
      },
    },
    {
      accessorKey: "lastOrderDate",
      header: translations.lastOrder || "Último Pedido",
      cell: ({ row }) => {
        const lastOrderDate = row.original.lastOrderDate;
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              {lastOrderDate instanceof Date && !isNaN(lastOrderDate.getTime())
                ? format(lastOrderDate, "dd/MM/yyyy")
                : translations.noOrdersYet || "Sem pedidos"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "totalSpent",
      header: translations.totalSpent || "Total Gasto",
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="font-mono">
            R$ {row.original.totalSpent.toFixed(2)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "tags",
      header: translations.tags || "Etiquetas",
      cell: ({ row }) => {
        const tags = row.original.tags;
        return (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: translations.actions || "Ações",
      cell: ({ row }) => {
        const customer = row.original;
        
        return (
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => handleQuickMessage(customer, e)}
              title={translations.sendMessage || "Enviar mensagem"}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => handleQuickEmail(customer, e)}
              title={translations.sendEmail || "Enviar email"}
            >
              <Mail className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">{translations.openMenu || "Abrir menu"}</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuLabel>{translations.actions || "Ações"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => openCustomerDetails(customer)}>
                  {translations.viewCustomerDetails || "Ver detalhes do cliente"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => openCustomerEdit(customer, e)}>
                  <Edit className="mr-2 h-4 w-4" /> {translations.editCustomer || "Editar cliente"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleQuickEmail(customer);
                }}>
                  <Mail className="mr-2 h-4 w-4" /> {translations.sendEmail || "Enviar email"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={(e) => openCustomerDelete(customer, e)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> {translations.deleteCustomer || "Excluir cliente"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {customers.filter(c => !c.phone || c.phone === "").length > 0 && 
              `${customers.filter(c => !c.phone || c.phone === "").length} ${translations.customersWithoutPhone || "clientes sem números de telefone"}`
            }
          </p>
        </div>
        <Button variant="outline" onClick={handlePhoneEnrichment}>
          <Database className="mr-2 h-4 w-4" />
          {translations.completeMissingPhoneNumbers || "Completar Números de Telefone"}
        </Button>
      </div>

      <DataTable columns={columns} data={customers} />
      
      <CustomerDetailDialog 
        customer={selectedCustomer}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      {isEditDialogOpen && (
        <CustomerEditDialog 
          customer={selectedCustomer}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{translations.confirmDeletion || "Confirmar exclusão"}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{translations.deleteCustomerConfirmation || "Você tem certeza que deseja excluir"} {selectedCustomer?.name}?</p>
            <p className="text-sm text-muted-foreground mt-2">{translations.actionCannotBeUndone || "Esta ação não pode ser desfeita."}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {translations.cancel || "Cancelar"}
            </Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              {translations.delete || "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{translations.sendMessageTo || "Enviar mensagem para"} {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                {selectedCustomer && <AvatarFallback>{getInitials(selectedCustomer.name)}</AvatarFallback>}
              </Avatar>
              <div>
                <div className="font-medium">{selectedCustomer?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedCustomer?.phone || translations.noPhoneNumber || "Sem número de telefone"}
                </div>
              </div>
            </div>
            
            {selectedCustomer?.phone ? (
              <div className="grid gap-4">
                <Input
                  placeholder={translations.typeYourMessage || "Digite sua mensagem aqui..."}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Button onClick={handleSendMessage}>{translations.sendMessage || "Enviar Mensagem"}</Button>
              </div>
            ) : (
              <div className="text-amber-500 text-sm flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {translations.customerNoPhoneEnrichment || "Este cliente não possui número de telefone. Considere usar o enriquecimento de telefone."}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{translations.sendEmailTo || "Enviar email para"} {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                {selectedCustomer && <AvatarFallback>{getInitials(selectedCustomer.name)}</AvatarFallback>}
              </Avatar>
              <div>
                <div className="font-medium">{selectedCustomer?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedCustomer?.email}</div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Input
                placeholder={translations.subject || "Assunto"}
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <Input
                placeholder={translations.emailContent || "Conteúdo do email"}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[80px]"
              />
              <Button onClick={handleSendEmail}>{translations.sendEmail || "Enviar Email"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPhoneEnrichmentOpen} onOpenChange={setIsPhoneEnrichmentOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{translations.phoneEnrichment || "Enriquecimento de Números de Telefone"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Tabs value={enrichmentTab} onValueChange={setEnrichmentTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="count">
                  <Users className="mr-2 h-4 w-4" />
                  {translations.byQuantity || "Por Quantidade"}
                </TabsTrigger>
                <TabsTrigger value="filter">
                  <Tags className="mr-2 h-4 w-4" />
                  {translations.byFilters || "Por Filtros"}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="count" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{translations.numberOfContactsToEnrich || "Número de contatos para enriquecer"}:</span>
                    <span className="font-semibold">{enrichmentCount}</span>
                  </div>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      value={enrichmentCount}
                      onChange={handleEnrichmentCountChange}
                      min={1}
                      className="w-32"
                    />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {translations.maximumAvailable || "Disponível"}: {maxEnrichmentCount}
                    </span>
                  </div>
                </div>
                
                {customerStatistics && (
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm font-medium mb-3">
                      {translations.selectedContacts || "Contatos selecionados"}: {selectedCustomersForEnrichment.length}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{translations.totalOrders || "Total de Pedidos"}</p>
                          <p className="text-lg font-semibold">{customerStatistics.totalOrders}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">{translations.totalSpent || "Total Gasto"}</p>
                          <p className="text-lg font-semibold">R$ {customerStatistics.totalSpent.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="filter" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {translations.minimumOrderCount || "Número Mínimo de Pedidos"}
                      </label>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">≥ {minOrderCount}</span>
                      </div>
                      <Slider 
                        value={[minOrderCount]} 
                        min={0}
                        max={50}
                        step={1}
                        onValueChange={([value]) => setMinOrderCount(value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {translations.minimumTotalSpent || "Valor Mínimo Gasto"}
                      </label>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">≥ R$ {minTotalSpent}</span>
                      </div>
                      <Slider 
                        value={[minTotalSpent]} 
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={([value]) => setMinTotalSpent(value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium block">
                      {translations.customerTags || "Etiquetas de Cliente"}
                    </label>
                    <div className="max-h-48 overflow-y-auto p-2 border rounded-md">
                      {allTags.map(tag => (
                        <div key={tag} className="flex items-center space-x-2 mb-2">
                          <Checkbox 
                            id={`tag-${tag}`} 
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => toggleTagSelection(tag)}
                          />
                          <label 
                            htmlFor={`tag-${tag}`}
                            className="text-sm cursor-pointer"
                          >
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {customerStatistics && (
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm font-medium mb-3">
                      {translations.selectedContacts || "Contatos selecionados"}: {selectedCustomersForEnrichment.length}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">{translations.popularTags || "Etiquetas Populares"}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {customerStatistics.topTags.map(({ tag, count }) => (
                            <Badge key={tag} variant="secondary">
                              {tag} ({count})
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{translations.averageOrderValue || "Valor Médio do Pedido"}</p>
                        <p className="text-lg font-semibold">R$ {customerStatistics.averageOrderValue.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium">{translations.serviceCost || "Este serviço custará"}:</p>
              <p className="text-lg font-bold">R$ {(selectedCustomersForEnrichment.length * 0.50).toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">R$ 0.50 {translations.perCustomer || "por cliente"} × {selectedCustomersForEnrichment.length} {translations.customers || "clientes"}</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {translations.apiWillUse || "A API usará o CPF do cliente para buscar números de celulares válidos de nosso provedor de dados confiável."}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPhoneEnrichmentOpen(false)}>
              {translations.cancel || "Cancelar"}
            </Button>
            <Button onClick={confirmPhoneEnrichment}>
              {translations.proceedWithEnrichment || "Prosseguir com Enriquecimento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerList;
