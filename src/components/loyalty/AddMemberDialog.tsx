
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  potentialMembers?: any[];
}

export const AddMemberDialog = ({ isOpen, onClose, potentialMembers = [] }: AddMemberDialogProps) => {
  const [addMethod, setAddMethod] = useState<'existing' | 'new'>('existing');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  
  const handleAddMember = () => {
    toast.success("Membro adicionado com sucesso!");
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Membro</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <RadioGroup 
            defaultValue="existing" 
            value={addMethod} 
            onValueChange={(value) => setAddMethod(value as 'existing' | 'new')}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="existing" />
              <Label htmlFor="existing">Cliente existente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">Novo cliente</Label>
            </div>
          </RadioGroup>
          
          {addMethod === 'existing' && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-2">
                Selecione um cliente da sua base de dados que ainda não é membro do programa de fidelidade
              </div>
              
              {potentialMembers && potentialMembers.length > 0 ? (
                <div className="border rounded-md p-2 max-h-60 overflow-y-auto space-y-2">
                  {potentialMembers.slice(0, 10).map((customer) => (
                    <div 
                      key={customer.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${selectedCustomer === customer.id ? 'bg-muted' : ''}`}
                      onClick={() => setSelectedCustomer(customer.id)}
                    >
                      <div className="flex items-center gap-2">
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
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initialPoints">Pontos iniciais</Label>
                  <Input id="initialPoints" type="number" defaultValue="100" />
                </div>
                
                <div>
                  <Label htmlFor="tier">Nível inicial</Label>
                  <Select defaultValue="bronze">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze</SelectItem>
                      <SelectItem value="silver">Prata</SelectItem>
                      <SelectItem value="gold">Ouro</SelectItem>
                      <SelectItem value="platinum">Platina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {addMethod === 'new' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" />
              </div>
              
              <div>
                <Label htmlFor="initialPoints">Pontos iniciais</Label>
                <Input id="initialPoints" type="number" defaultValue="100" />
              </div>
              
              <div>
                <Label htmlFor="tier">Nível inicial</Label>
                <Select defaultValue="bronze">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Prata</SelectItem>
                    <SelectItem value="gold">Ouro</SelectItem>
                    <SelectItem value="platinum">Platina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleAddMember}>Adicionar Membro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
