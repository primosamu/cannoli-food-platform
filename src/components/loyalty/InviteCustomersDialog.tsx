
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckSquare, Phone, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InviteCustomersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  potentialMembers?: any[];
}

export const InviteCustomersDialog = ({ isOpen, onClose, potentialMembers = [] }: InviteCustomersDialogProps) => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [phoneInputs, setPhoneInputs] = useState<{[key: string]: string}>({});
  
  // Filter out customers without phone numbers
  const customersWithPhone = potentialMembers.filter(customer => customer.phone && customer.phone.length >= 10);
  const customersWithoutPhone = potentialMembers.filter(customer => !customer.phone || customer.phone.length < 10);
  
  const toggleSelection = (customerId: string) => {
    setSelectedCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId);
      } else {
        const customer = potentialMembers.find(c => c.id === customerId);
        if (!customer.phone || customer.phone.length < 10) {
          if (!phoneInputs[customerId] || phoneInputs[customerId].length < 10) {
            toast.error("É necessário adicionar um telefone celular válido para este cliente");
            return prev;
          }
        }
        return [...prev, customerId];
      }
    });
  };
  
  const handlePhoneChange = (customerId: string, phone: string) => {
    setPhoneInputs(prev => ({
      ...prev,
      [customerId]: phone
    }));
  };
  
  const canInvite = (customerId: string) => {
    const customer = potentialMembers.find(c => c.id === customerId);
    if (customer.phone && customer.phone.length >= 10) return true;
    return phoneInputs[customerId] && phoneInputs[customerId].length >= 10;
  };
  
  const handleInvite = () => {
    // Check if all selected customers have valid phone numbers
    const allValid = selectedCustomers.every(id => {
      const customer = potentialMembers.find(c => c.id === id);
      return (customer.phone && customer.phone.length >= 10) || 
             (phoneInputs[id] && phoneInputs[id].length >= 10);
    });
    
    if (!allValid) {
      toast.error("Todos os clientes selecionados devem ter um número de telefone celular válido");
      return;
    }
    
    toast.success(`Convites enviados para ${selectedCustomers.length} clientes`);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Convidar Clientes</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground">
            Selecione os clientes que você deseja convidar para seu programa de fidelidade.
            <span className="block mt-1 font-medium text-primary">
              Cada cliente precisa ter um número de telefone celular válido.
            </span>
          </p>
          
          {potentialMembers && potentialMembers.length > 0 ? (
            <div className="border rounded-md p-2 max-h-60 overflow-y-auto space-y-2">
              {customersWithPhone.map((customer) => (
                <div 
                  key={customer.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id={customer.id}
                      checked={selectedCustomers.includes(customer.id)} 
                      onCheckedChange={() => toggleSelection(customer.id)}
                    />
                    <Avatar>
                      <AvatarFallback>
                        {customer.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                      <p className="text-xs text-green-600"><Phone className="h-3 w-3 inline mr-1" />{customer.phone}</p>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {customer.orderCount} pedidos
                  </Badge>
                </div>
              ))}
              
              {customersWithoutPhone.map((customer) => (
                <div 
                  key={customer.id}
                  className="flex flex-col p-2 rounded-md hover:bg-muted"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={customer.id}
                        checked={selectedCustomers.includes(customer.id)} 
                        onCheckedChange={() => toggleSelection(customer.id)}
                        disabled={!canInvite(customer.id)}
                      />
                      <Avatar>
                        <AvatarFallback>
                          {customer.name.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                        <Badge variant="destructive" className="text-xs mt-1">Sem telefone celular</Badge>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="text-xs">
                      {customer.orderCount} pedidos
                    </Badge>
                  </div>
                  
                  <div className="mt-2 pl-8">
                    <Label htmlFor={`phone-${customer.id}`} className="text-xs font-medium text-primary">
                      Adicionar telefone celular
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input 
                        id={`phone-${customer.id}`}
                        placeholder="(XX) XXXXX-XXXX" 
                        className="h-8 text-sm"
                        value={phoneInputs[customer.id] || ''}
                        onChange={(e) => handlePhoneChange(customer.id, e.target.value)}
                      />
                      {canInvite(customer.id) && (
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="h-8"
                          onClick={() => toggleSelection(customer.id)}
                        >
                          <CheckSquare className="h-3 w-3 mr-1" /> Selecionar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              Todos os seus clientes já são membros do programa de fidelidade!
            </div>
          )}
          
          <div className="pt-2">
            <Label htmlFor="customMessage">Mensagem personalizada (opcional)</Label>
            <div className="mt-1">
              <Input
                id="customMessage"
                placeholder="Escreva uma mensagem personalizada para o convite..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm">
            {selectedCustomers.length} clientes selecionados
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button 
              onClick={handleInvite}
              disabled={selectedCustomers.length === 0}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Enviar Convites
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
