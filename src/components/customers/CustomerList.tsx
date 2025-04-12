
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
  DatabaseSearch,
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

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  lastOrderDate: Date;
  totalSpent: number;
  tags: string[];
  joinDate: Date;
  cpf: string; // Added CPF (Brazilian customer ID)
}

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isPhoneEnrichmentOpen, setIsPhoneEnrichmentOpen] = useState(false);
  const [selectedCustomersForEnrichment, setSelectedCustomersForEnrichment] = useState<Customer[]>([]);

  // Function to get initials from name
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
        title: "No enrichment needed",
        description: "All customers already have phone numbers."
      });
      return;
    }

    setSelectedCustomersForEnrichment(customersWithoutPhone);
    setIsPhoneEnrichmentOpen(true);
  };

  const confirmPhoneEnrichment = () => {
    if (selectedCustomersForEnrichment.length === 0) return;

    // This would be replaced with an actual API call
    toast({
      title: "Phone enrichment complete",
      description: `Successfully enriched ${selectedCustomersForEnrichment.length} customer phone numbers.`,
    });
    
    setIsPhoneEnrichmentOpen(false);
  };

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: "Customer",
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
      header: "Phone",
      cell: ({ row }) => {
        const customer = row.original;
        return customer.phone ? (
          customer.phone
        ) : (
          <span className="text-muted-foreground italic text-xs">No phone</span>
        );
      },
    },
    {
      accessorKey: "orderCount",
      header: "Orders",
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
      header: "Last Order",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(row.original.lastOrderDate, "MMM dd, yyyy")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "totalSpent",
      header: "Total Spent",
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="font-mono">
            ${row.original.totalSpent.toFixed(2)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
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
      header: "Actions",
      cell: ({ row }) => {
        const customer = row.original;
        
        return (
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => handleQuickMessage(customer, e)}
              title="Send message"
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => handleQuickEmail(customer, e)}
              title="Send email"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => openCustomerDetails(customer)}>
                  View customer details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" /> Edit customer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  handleQuickEmail(customer);
                }}>
                  <Mail className="mr-2 h-4 w-4" /> Send email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete customer
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
              `${customers.filter(c => !c.phone || c.phone === "").length} customers without phone numbers`
            }
          </p>
        </div>
        <Button variant="outline" onClick={handlePhoneEnrichment}>
          <DatabaseSearch className="mr-2 h-4 w-4" />
          Complete Missing Phone Numbers
        </Button>
      </div>

      <div className="rounded-md border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((column) => (
                <th key={column.id || String(column.accessorKey)} className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  {typeof column.header === 'function' ? column.header({}) : column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr 
                key={customer.id} 
                className="border-t hover:bg-muted/50 cursor-pointer"
                onClick={() => openCustomerDetails(customer)}
              >
                {columns.map((column) => (
                  <td key={column.id || String(column.accessorKey)} className="p-4 align-middle">
                    {column.cell ? column.cell({ row: { original: customer } }) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Customer Details Dialog */}
      <CustomerDetailDialog 
        customer={selectedCustomer}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
      />

      {/* Quick Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message to {selectedCustomer?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar>
                {selectedCustomer && <AvatarFallback>{getInitials(selectedCustomer.name)}</AvatarFallback>}
              </Avatar>
              <div>
                <div className="font-medium">{selectedCustomer?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedCustomer?.phone || "No phone number"}
                </div>
              </div>
            </div>
            
            {selectedCustomer?.phone ? (
              <div className="grid gap-4">
                <Input
                  placeholder="Type your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Button onClick={handleSendMessage}>Send Message</Button>
              </div>
            ) : (
              <div className="text-amber-500 text-sm flex items-center gap-2">
                <Phone className="h-4 w-4" />
                This customer doesn't have a phone number. Consider using phone enrichment.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Email to {selectedCustomer?.name}</DialogTitle>
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
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <Input
                placeholder="Email content"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[80px]"
              />
              <Button onClick={handleSendEmail}>Send Email</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Enrichment Dialog */}
      <Dialog open={isPhoneEnrichmentOpen} onOpenChange={setIsPhoneEnrichmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phone Number Enrichment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>
              Using our data enrichment service, we can retrieve phone numbers for {selectedCustomersForEnrichment.length} customer(s) based on their CPF.
            </p>
            <p className="font-medium">This service will cost:</p>
            <div className="bg-muted p-4 rounded-md">
              <p className="text-lg font-bold">R$ {(selectedCustomersForEnrichment.length * 0.50).toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">R$ 0.50 per customer × {selectedCustomersForEnrichment.length} customers</p>
            </div>
            <p className="text-sm text-muted-foreground">
              The API will use the customer CPF to fetch valid mobile phone numbers from our trusted data provider.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPhoneEnrichmentOpen(false)}>Cancel</Button>
            <Button onClick={confirmPhoneEnrichment}>Proceed with Enrichment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomerList;
