
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
import { Order, Courier, DeliveryType, DeliveryCompany } from '@/types/order';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Truck, Building, Store } from 'lucide-react';

interface AssignCourierDialogProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
  onAssign: (orderId: string, deliveryDetails: {
    type: DeliveryType,
    courier?: string,
    courierId?: string,
    company?: DeliveryCompany
  }) => void;
  couriers: Courier[];
}

export const AssignCourierDialog: React.FC<AssignCourierDialogProps> = ({
  open,
  order,
  onClose,
  onAssign,
  couriers,
}) => {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('own');
  const [selectedCourierId, setSelectedCourierId] = useState<string>('');
  const [customCourierName, setCustomCourierName] = useState('');
  const [deliveryCompany, setDeliveryCompany] = useState<DeliveryCompany>('loggi');
  const { translations } = useLanguage();

  // Reset form when order changes
  React.useEffect(() => {
    if (order) {
      setDeliveryType(order.delivery.type);
      setSelectedCourierId('');
      setCustomCourierName('');
      setDeliveryCompany('loggi');
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      const deliveryDetails: {
        type: DeliveryType,
        courier?: string,
        courierId?: string,
        company?: DeliveryCompany
      } = {
        type: deliveryType
      };
      
      // Handle different delivery types
      if (deliveryType === 'own') {
        const selectedCourier = couriers.find(c => c.id === selectedCourierId);
        if (selectedCourier) {
          deliveryDetails.courier = selectedCourier.name;
          deliveryDetails.courierId = selectedCourier.id;
        }
      } else if (deliveryType === 'self') {
        deliveryDetails.courier = customCourierName;
      } else if (deliveryType === 'thirdparty') {
        deliveryDetails.company = deliveryCompany;
      }
      
      onAssign(order.id, deliveryDetails);
      
      // Reset form
      setCustomCourierName('');
    }
  };

  if (!order) return null;

  const availableCouriers = couriers.filter(c => c.isAvailable);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{translations.assignDelivery}</DialogTitle>
            <DialogDescription>
              {translations.assignDelivery} {order.orderNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label>{translations.deliveryMethod}</Label>
              <RadioGroup
                value={deliveryType}
                onValueChange={(value) => setDeliveryType(value as DeliveryType)}
                className="grid grid-cols-3 gap-2"
              >
                <div>
                  <RadioGroupItem
                    value="own"
                    id="own"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="own"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Truck className="mb-3 h-6 w-6" />
                    {translations.ownDelivery}
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem
                    value="self"
                    id="self"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="self"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Building className="mb-3 h-6 w-6" />
                    {translations.selfDelivery}
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem
                    value="thirdparty"
                    id="thirdparty"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="thirdparty"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Store className="mb-3 h-6 w-6" />
                    {translations.thirdPartyDelivery}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Select courier for own delivery */}
            {deliveryType === 'own' && (
              <div className="grid gap-2">
                <Label>{translations.selectCourier}</Label>
                {availableCouriers.length > 0 ? (
                  <Select value={selectedCourierId} onValueChange={setSelectedCourierId}>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.selectACourier} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCouriers.map(courier => (
                        <SelectItem key={courier.id} value={courier.id}>
                          {courier.name} ({courier.deliveryCount} {translations.deliveries})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded-md text-center">
                    {translations.noAvailableCouriers}
                  </div>
                )}
              </div>
            )}

            {/* Enter custom courier for self delivery */}
            {deliveryType === 'self' && (
              <div className="grid gap-2">
                <Label htmlFor="courierName">{translations.courierName}</Label>
                <Input
                  id="courierName"
                  value={customCourierName}
                  onChange={(e) => setCustomCourierName(e.target.value)}
                  placeholder={translations.enterCourierName}
                  required={deliveryType === 'self'}
                />
              </div>
            )}

            {/* Select delivery company for third-party */}
            {deliveryType === 'thirdparty' && (
              <div className="grid gap-2">
                <Label>{translations.deliveryCompany}</Label>
                <Select value={deliveryCompany} onValueChange={value => setDeliveryCompany(value as DeliveryCompany)}>
                  <SelectTrigger>
                    <SelectValue placeholder={translations.selectACompany} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loggi">Loggi</SelectItem>
                    <SelectItem value="rapiddo">Rapiddo</SelectItem>
                    <SelectItem value="uber">Uber</SelectItem>
                    <SelectItem value="other">{translations.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

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
            <Button 
              type="submit" 
              disabled={(deliveryType === 'own' && !selectedCourierId) || 
                      (deliveryType === 'self' && !customCourierName.trim())}
            >
              {translations.assign}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

