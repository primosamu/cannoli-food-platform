
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

interface CustomerEditDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

const CustomerEditDialog: React.FC<CustomerEditDialogProps> = ({
  customer,
  isOpen,
  onClose,
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
    if (!customer) return;

    toast({
      title: translations.customerUpdated || "Cliente atualizado",
      description: `${editedCustomer.name} ${translations.wasUpdated || "foi atualizado com sucesso"}.`,
    });
    onClose();
  };

  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{translations.editCustomer || "Editar Cliente"}: {customer.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{translations.name || "Nome"}</label>
            <Input
              name="name"
              value={editedCustomer.name || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{translations.email || "Email"}</label>
            <Input
              name="email"
              type="email"
              value={editedCustomer.email || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{translations.phoneNumber || "Telefone"}</label>
            <Input
              name="phone"
              value={editedCustomer.phone || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">CPF</label>
            <Input
              name="cpf"
              value={editedCustomer.cpf || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{translations.address || "Endereço"}</label>
            <Input
              name="address"
              value={editedCustomer.address || ""}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{translations.notes || "Observações"}</label>
            <Textarea
              name="notes"
              value={editedCustomer.notes || ""}
              onChange={handleChange}
              className="min-h-[80px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
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
