
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Courier } from '@/types/order';
import { Phone, Check, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface CourierManagementProps {
  couriers: Courier[];
  onAddCourier: (courier: Omit<Courier, 'id' | 'deliveryCount'>) => void;
  onToggleAvailability: (courierId: string) => void;
}

export const CourierManagement: React.FC<CourierManagementProps> = ({
  couriers,
  onAddCourier,
  onToggleAvailability
}) => {
  const [isAddingCourier, setIsAddingCourier] = useState(false);
  const [newCourierName, setNewCourierName] = useState('');
  const [newCourierPhone, setNewCourierPhone] = useState('');
  const { toast } = useToast();
  const { translations } = useLanguage();

  const handleAddCourier = () => {
    if (!newCourierName.trim() || !newCourierPhone.trim()) {
      toast({
        title: translations.error,
        description: translations.pleaseCompleteAllFields,
        variant: "destructive"
      });
      return;
    }

    onAddCourier({
      name: newCourierName.trim(),
      phone: newCourierPhone.trim(),
      isAvailable: true
    });

    // Reset form
    setNewCourierName('');
    setNewCourierPhone('');
    setIsAddingCourier(false);

    toast({
      title: translations.courierAdded,
      description: translations.courierAddedSuccessfully
    });
  };

  const availableCouriers = couriers.filter(c => c.isAvailable);
  const unavailableCouriers = couriers.filter(c => !c.isAvailable);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.courierManagement}</CardTitle>
        <CardDescription>{translations.manageDeliveryTeam}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Available couriers */}
          <div>
            <h3 className="text-sm font-medium mb-2">{translations.availableCouriers} ({availableCouriers.length})</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translations.name}</TableHead>
                  <TableHead>{translations.phone}</TableHead>
                  <TableHead>{translations.deliveries}</TableHead>
                  <TableHead>{translations.status}</TableHead>
                  <TableHead>{translations.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableCouriers.length > 0 ? (
                  availableCouriers.map(courier => (
                    <TableRow key={courier.id}>
                      <TableCell className="font-medium">{courier.name}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {courier.phone}
                      </TableCell>
                      <TableCell>{courier.deliveryCount}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">{translations.available}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onToggleAvailability(courier.id)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      {translations.noAvailableCouriers}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Unavailable couriers */}
          <div>
            <h3 className="text-sm font-medium mb-2">{translations.unavailableCouriers} ({unavailableCouriers.length})</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{translations.name}</TableHead>
                  <TableHead>{translations.phone}</TableHead>
                  <TableHead>{translations.deliveries}</TableHead>
                  <TableHead>{translations.status}</TableHead>
                  <TableHead>{translations.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unavailableCouriers.length > 0 ? (
                  unavailableCouriers.map(courier => (
                    <TableRow key={courier.id}>
                      <TableCell className="font-medium">{courier.name}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {courier.phone}
                      </TableCell>
                      <TableCell>{courier.deliveryCount}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{translations.unavailable}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onToggleAvailability(courier.id)}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      {translations.noUnavailableCouriers}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Add new courier form */}
          {isAddingCourier ? (
            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">{translations.addNewCourier}</h3>
              
              <div className="space-y-2">
                <Label htmlFor="courierName">{translations.name}</Label>
                <Input 
                  id="courierName" 
                  value={newCourierName}
                  onChange={e => setNewCourierName(e.target.value)}
                  placeholder={translations.enterCourierName}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="courierPhone">{translations.phone}</Label>
                <Input 
                  id="courierPhone" 
                  value={newCourierPhone}
                  onChange={e => setNewCourierPhone(e.target.value)}
                  placeholder={translations.enterCourierPhone}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingCourier(false)}>
                  {translations.cancel}
                </Button>
                <Button onClick={handleAddCourier}>
                  {translations.addCourier}
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsAddingCourier(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> {translations.addNewCourier}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

