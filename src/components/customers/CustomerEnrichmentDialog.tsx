
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CustomerEnrichmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  // This prop is used in Customers.tsx but was missing in the interface
  customersWithoutPhone?: any[];
}

export const CustomerEnrichmentDialog: React.FC<CustomerEnrichmentDialogProps> = ({
  isOpen,
  onClose,
  onProceed,
  customersWithoutPhone,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Phone Enrichment</DialogTitle>
          <DialogDescription>
            Complete missing phone numbers
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            The API will use the customer's CPF to obtain valid phone numbers from our trusted data provider.
            {customersWithoutPhone && (
              <span className="block mt-2">
                {customersWithoutPhone.length} customers will be processed.
              </span>
            )}
          </p>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onProceed}>
            Proceed with Enrichment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

