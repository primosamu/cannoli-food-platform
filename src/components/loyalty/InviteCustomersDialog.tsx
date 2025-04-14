
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Mail, UserPlus, X } from "lucide-react";
import { sampleCustomers } from "@/data/sampleCustomers";
import { toast } from "sonner";

interface InviteCustomersDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InviteCustomersDialog: React.FC<InviteCustomersDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>("existing");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState<string>("");
  const [manualEmails, setManualEmails] = useState<string[]>([]);

  const filteredCustomers = sampleCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCustomer = (customerId: string) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleAddEmail = () => {
    if (emailInput && !manualEmails.includes(emailInput) && /\S+@\S+\.\S+/.test(emailInput)) {
      setManualEmails([...manualEmails, emailInput]);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (email: string) => {
    setManualEmails(manualEmails.filter(e => e !== email));
  };

  const handleSendInvites = () => {
    const totalInvites = selectedCustomers.length + manualEmails.length;
    
    if (totalInvites > 0) {
      toast.success(`${totalInvites} convites enviados com sucesso!`);
      onClose();
    } else {
      toast.error("Selecione pelo menos um cliente ou adicione um e-mail para enviar convites.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Convidar Clientes para o Programa de Fidelidade</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="existing" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Clientes Existentes</TabsTrigger>
            <TabsTrigger value="manual">Adicionar E-mails</TabsTrigger>
          </TabsList>
          
          <TabsContent value="existing" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar clientes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <ScrollArea className="h-[300px] pr-4">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center space-x-4 py-2 border-b">
                    <Checkbox 
                      checked={selectedCustomers.includes(customer.id)} 
                      onCheckedChange={() => handleToggleCustomer(customer.id)}
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar>
                        <AvatarFallback>
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  Nenhum cliente encontrado.
                </div>
              )}
            </ScrollArea>
            
            <div className="text-sm text-muted-foreground">
              {selectedCustomers.length} clientes selecionados
            </div>
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="email-input">E-mail</Label>
                <Input
                  id="email-input"
                  type="email"
                  placeholder="Digite um e-mail..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddEmail();
                    }
                  }}
                />
              </div>
              <Button type="button" onClick={handleAddEmail}>Adicionar</Button>
            </div>
            
            <ScrollArea className="h-[300px] pr-4">
              {manualEmails.length > 0 ? (
                <div className="space-y-2">
                  {manualEmails.map((email, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-muted/40">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{email}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveEmail(email)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  Nenhum e-mail adicionado.
                </div>
              )}
            </ScrollArea>
            
            <div className="text-sm text-muted-foreground">
              {manualEmails.length} e-mails adicionados
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSendInvites}>
            <UserPlus className="h-4 w-4 mr-2" />
            Enviar Convites
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
