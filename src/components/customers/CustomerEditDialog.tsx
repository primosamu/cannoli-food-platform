
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "./CustomerList";
import { useLanguage } from "@/contexts/LanguageContext";
import { Label } from "@/components/ui/label";

interface CustomerEditDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (customer: Customer) => void;
}

const CustomerEditDialog: React.FC<CustomerEditDialogProps> = ({
  customer,
  isOpen,
  onClose,
  onUpdate
}) => {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const [editedCustomer, setEditedCustomer] = useState<Partial<Customer>>(
    customer || {}
  );

  useEffect(() => {
    if (customer) {
      setEditedCustomer({ ...customer });
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!customer || !editedCustomer.id) return;

    const updatedCustomer = { ...customer, ...editedCustomer } as Customer;
    
    if (onUpdate) {
      onUpdate(updatedCustomer);
    } else {
      toast({
        title: translations.customerUpdated || "Cliente atualizado",
        description: `${editedCustomer.name} ${translations.wasUpdated || "foi atualizado com sucesso"}.`,
      });
    }
    
    onClose();
  };

  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {translations.editCustomer || "Editar Cliente"}: {customer.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name">{translations.name || "Nome"}</Label>
            <Input
              id="name"
              name="name"
              value={editedCustomer.name || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="email">{translations.email || "Email"}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={editedCustomer.email || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="phone">{translations.phoneNumber || "Telefone"}</Label>
            <Input
              id="phone"
              name="phone"
              value={editedCustomer.phone || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              name="cpf"
              value={editedCustomer.cpf || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="address">{translations.address || "Endereço"}</Label>
            <Input
              id="address"
              name="address"
              value={editedCustomer.address || ""}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="notes">{translations.notes || "Observações"}</Label>
            <Textarea
              id="notes"
              name="notes"
              value={editedCustomer.notes || ""}
              onChange={handleChange}
              className="min-h-[80px] w-full"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="mr-2">
            {translations.cancel || "Cancelar"}
          </Button>
          <Button onClick={handleSave}>
            {translations.save || "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerEditDialog;
