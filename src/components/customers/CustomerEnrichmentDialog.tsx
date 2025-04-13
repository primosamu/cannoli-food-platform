
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
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerEnrichmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  customersWithoutPhone?: any[];
}

export const CustomerEnrichmentDialog: React.FC<CustomerEnrichmentDialogProps> = ({
  isOpen,
  onClose,
  onProceed,
  customersWithoutPhone,
}) => {
  const { translations } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.phoneEnrichment}</DialogTitle>
          <DialogDescription>
            {translations.completeMissingPhoneNumbers}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            {translations.apiWillUse}
            {customersWithoutPhone && (
              <span className="block mt-2">
                {customersWithoutPhone.length} {translations.customersWithoutPhone}.
              </span>
            )}
          </p>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            {translations.cancel}
          </Button>
          <Button onClick={onProceed}>
            {translations.proceedWithEnrichment}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
