
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "./CustomerList";
import { CustomerDetail } from "./CustomerDetail";

interface CustomerDetailDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (customer: Customer) => void;
}

const CustomerDetailDialog: React.FC<CustomerDetailDialogProps> = ({
  customer,
  isOpen,
  onClose,
  onEdit,
}) => {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{customer.name}</DialogTitle>
        </DialogHeader>
        
        <CustomerDetail customer={customer} />
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onEdit && (
            <Button onClick={() => onEdit(customer)}>
              Edit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
