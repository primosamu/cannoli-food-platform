
import React from "react";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InsufficientCreditsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyCredits: () => void;
  availableCredits: number;
  requiredCredits: number;
}

export const InsufficientCreditsDialog: React.FC<InsufficientCreditsDialogProps> = ({
  isOpen,
  onClose,
  onBuyCredits,
  availableCredits,
  requiredCredits,
}) => {
  const { translations } = useLanguage();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            {translations.insufficientCredits || "Créditos insuficientes"}
          </DialogTitle>
          <DialogDescription>
            {translations.buyCreditsToUseFeature || "Compre créditos para utilizar esta funcionalidade"}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            {`${translations.phoneEnrichmentCredits || "Créditos de enriquecimento de telefone"}: `}
            <span className="font-semibold text-orange-500">{availableCredits}</span>
            {` / ${requiredCredits} ${translations.credits || "créditos"}`}
          </p>
          <div className="h-2 bg-muted mt-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-500 ease-out" 
              style={{ width: `${Math.min((availableCredits / requiredCredits) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            {translations.cancel}
          </Button>
          <Button onClick={onBuyCredits} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
            {translations.buyCredits || "Comprar Créditos"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
