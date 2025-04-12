
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Order } from '@/types/order';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface AssignCourierDialogProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onAssign: (orderId: string, courierName: string) => void;
}

export const AssignCourierDialog: React.FC<AssignCourierDialogProps> = ({
  open,
  order,
  onClose,
  onAssign,
}) => {
  const [courierName, setCourierName] = useState('');
  const { translations } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (order && courierName.trim()) {
      onAssign(order.id, courierName);
      setCourierName('');
    }
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{translations.assignCourier}</DialogTitle>
            <DialogDescription>
              {translations.assignCourier} {order.orderNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="courierName">{translations.courierName}</Label>
              <Input
                id="courierName"
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                placeholder={translations.enterCourierName}
                autoFocus
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>{translations.deliveryAddress}</Label>
              <p className="text-sm text-gray-500">
                {order.customer.address || translations.noAddress}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {translations.cancel}
            </Button>
            <Button type="submit" disabled={!courierName.trim()}>
              {translations.assign}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
