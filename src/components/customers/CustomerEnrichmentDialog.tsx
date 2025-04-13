
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
}

export const CustomerEnrichmentDialog: React.FC<CustomerEnrichmentDialogProps> = ({
  isOpen,
  onClose,
  onProceed,
}) => {
  const { translations } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations.phoneEnrichment || "Enriquecimento de Telefone"}</DialogTitle>
          <DialogDescription>
            {translations.completeMissingPhoneNumbers || "Completar números de telefone faltantes"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            {translations.apiWillUse || "A API utilizará o CPF do cliente para obter números de telefone válidos de nosso provedor de dados confiável."}
          </p>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            {translations.cancel || "Cancelar"}
          </Button>
          <Button onClick={onProceed}>
            {translations.proceedWithEnrichment || "Prosseguir com o Enriquecimento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
