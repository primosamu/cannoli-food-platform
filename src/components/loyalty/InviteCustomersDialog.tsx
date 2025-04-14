
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckSquare, UserPlus } from "lucide-react";
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
  
  const toggleSelection = (customerId: string) => {
    setSelectedCustomers(prev => {
      if (prev.includes(customerId)) {
        return prev.filter(id => id !== customerId);
      } else {
        return [...prev, customerId];
      }
    });
  };
  
  const handleInvite = () => {
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
          </p>
          
          {potentialMembers && potentialMembers.length > 0 ? (
            <div className="border rounded-md p-2 max-h-60 overflow-y-auto space-y-2">
              {potentialMembers.slice(0, 10).map((customer) => (
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
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {customer.orderCount} pedidos
                  </Badge>
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
