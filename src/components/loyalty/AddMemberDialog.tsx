
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, MessageSquare, Phone, SmartphoneIcon } from "lucide-react";

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  potentialMembers?: any[];
}

const welcomeCampaigns = [
  { id: 'welcome-email', name: 'Email de Boas-vindas', icon: <Mail className="h-4 w-4 mr-2" /> },
  { id: 'welcome-whatsapp', name: 'Mensagem de WhatsApp', icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  { id: 'welcome-sms', name: 'SMS de Boas-vindas', icon: <Phone className="h-4 w-4 mr-2" /> },
  { id: 'welcome-rcs', name: 'RCS de Boas-vindas', icon: <SmartphoneIcon className="h-4 w-4 mr-2" /> },
];

const newMemberSchema = z.object({
  name: z.string().min(3, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone celular é obrigatório" }),
  initialPoints: z.number().min(0),
  tier: z.string()
});

export const AddMemberDialog = ({ isOpen, onClose, potentialMembers = [] }: AddMemberDialogProps) => {
  const [addMethod, setAddMethod] = useState<'existing' | 'new'>('existing');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedWelcomeCampaigns, setSelectedWelcomeCampaigns] = useState<string[]>([]);
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      initialPoints: 100,
      tier: "bronze"
    },
  });
  
  const toggleWelcomeCampaign = (campaignId: string) => {
    setSelectedWelcomeCampaigns(prev => {
      if (prev.includes(campaignId)) {
        return prev.filter(id => id !== campaignId);
      } else {
        return [...prev, campaignId];
      }
    });
  };
  
  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomer(customer.id);
    form.setValue("name", customer.name);
    form.setValue("email", customer.email);
    form.setValue("phone", customer.phone || "");
  };
  
  const handleAddMember = () => {
    let isValid = true;
    let errorMessage = "";

    if (addMethod === 'existing') {
      if (!selectedCustomer) {
        isValid = false;
        errorMessage = "Selecione um cliente existente";
      } else {
        const customer = potentialMembers.find(c => c.id === selectedCustomer);
        if (!customer.phone) {
          isValid = false;
          errorMessage = "Cliente selecionado não possui telefone celular. É necessário adicionar um telefone.";
        }
      }
    } else {
      // For new members, validation will be handled by react-hook-form
      if (!form.formState.isValid) {
        return; // The form will display the validation errors
      }
    }

    if (!isValid) {
      toast.error(errorMessage);
      return;
    }

    if (selectedWelcomeCampaigns.length > 0) {
      const campaignNames = selectedWelcomeCampaigns.map(id => 
        welcomeCampaigns.find(c => c.id === id)?.name
      ).join(", ");
      
      toast.success(`Membro adicionado com sucesso! Campanhas de boas-vindas enviadas: ${campaignNames}`);
    } else {
      toast.success("Membro adicionado com sucesso!");
    }
    onClose();
  };
  
  const onSubmit = (data: any) => {
    handleAddMember();
  };
  
  const customerHasValidPhone = (customer: any) => {
    return customer.phone && customer.phone.length >= 10;
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
                      onClick={() => handleSelectCustomer(customer)}
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
                          {customer.phone ? (
                            <p className="text-xs text-green-600">{customer.phone}</p>
                          ) : (
                            <p className="text-xs text-red-600">Sem telefone celular</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="text-xs">
                          {customer.orderCount} pedidos
                        </Badge>
                        {!customerHasValidPhone(customer) && (
                          <Badge variant="destructive" className="text-xs">
                            Telefone obrigatório
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  Todos os seus clientes já são membros do programa de fidelidade!
                </div>
              )}
              
              {selectedCustomer && !customerHasValidPhone(potentialMembers.find(c => c.id === selectedCustomer)) && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-red-600 font-medium">Adicionar Telefone Celular (obrigatório)</Label>
                  <Input 
                    id="phone" 
                    placeholder="(XX) XXXXX-XXXX" 
                    onChange={(e) => {
                      const customer = potentialMembers.find(c => c.id === selectedCustomer);
                      if (customer) {
                        customer.phone = e.target.value;
                      }
                    }}
                  />
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Telefone Celular
                        <Badge variant="default" className="ml-2 bg-red-500">Obrigatório</Badge>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="(XX) XXXXX-XXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="initialPoints"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pontos iniciais</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível inicial</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bronze">Bronze</SelectItem>
                          <SelectItem value="silver">Prata</SelectItem>
                          <SelectItem value="gold">Ouro</SelectItem>
                          <SelectItem value="platinum">Platina</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
          
          <div className="space-y-2 pt-2">
            <Label className="font-medium">Campanhas de boas-vindas</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Selecione quais campanhas serão enviadas automaticamente
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {welcomeCampaigns.map(campaign => (
                <div 
                  key={campaign.id}
                  className="flex items-center space-x-2"
                >
                  <Checkbox 
                    id={campaign.id} 
                    checked={selectedWelcomeCampaigns.includes(campaign.id)}
                    onCheckedChange={() => toggleWelcomeCampaign(campaign.id)}
                  />
                  <Label 
                    htmlFor={campaign.id} 
                    className="flex items-center cursor-pointer text-sm"
                  >
                    {campaign.icon}
                    {campaign.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button 
            onClick={handleAddMember}
            disabled={(addMethod === 'existing' && !selectedCustomer) || 
                     (addMethod === 'existing' && selectedCustomer && 
                      !customerHasValidPhone(potentialMembers.find(c => c.id === selectedCustomer)))}
          >
            Adicionar Membro
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
