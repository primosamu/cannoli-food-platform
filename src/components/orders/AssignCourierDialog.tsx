
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
            <DialogTitle>Assign Courier</DialogTitle>
            <DialogDescription>
              Assign a courier for order {order.orderNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="courierName">Courier Name</Label>
              <Input
                id="courierName"
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
                placeholder="Enter courier name"
                autoFocus
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Delivery Address</Label>
              <p className="text-sm text-gray-500">
                {order.customer.address || 'No address provided (Pickup)'}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!courierName.trim()}>
              Assign Courier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
