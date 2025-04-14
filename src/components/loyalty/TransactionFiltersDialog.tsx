
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Check, Filter } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

interface TransactionFiltersDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: TransactionFilters) => void;
}

export interface TransactionFilters {
  dateRange?: DateRange;
  transactionType?: string;
}

export const TransactionFiltersDialog: React.FC<TransactionFiltersDialogProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [transactionType, setTransactionType] = useState<string | undefined>(undefined);
  
  const handleApplyFilters = () => {
    onApplyFilters({
      dateRange,
      transactionType,
    });
    
    toast.success("Filtros aplicados com sucesso");
    onClose();
  };
  
  const handleReset = () => {
    setDateRange(undefined);
    setTransactionType(undefined);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtrar Transações de Pontos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block">Período</Label>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
          
          <div>
            <Label htmlFor="transaction-type">Tipo de Transação</Label>
            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger id="transaction-type">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="earn">Ganho</SelectItem>
                <SelectItem value="redeem">Resgate</SelectItem>
                <SelectItem value="expire">Expirado</SelectItem>
                <SelectItem value="adjustment">Ajuste</SelectItem>
                <SelectItem value="referral">Indicação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} type="button">
              Limpar
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleApplyFilters}>
              <Check className="h-4 w-4 mr-2" />
              Aplicar Filtros
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
