
import React, { useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Order, Courier } from '@/types/order';
import { useLanguage } from '@/contexts/LanguageContext';

interface DeliveryReportProps {
  orders: Order[];
  couriers: Courier[];
}

export const DeliveryReport: React.FC<DeliveryReportProps> = ({ orders, couriers }) => {
  const { translations } = useLanguage();
  
  const deliveredOrders = useMemo(() => 
    orders.filter(o => o.delivery.courier && (o.status === 'delivering' || o.status === 'completed')), 
    [orders]
  );
  
  // Group orders by courier
  const courierDeliveries = useMemo(() => {
    const result: Record<string, { courier: Courier, orders: Order[] }> = {};
    
    couriers.forEach(courier => {
      result[courier.id] = { courier, orders: [] };
    });
    
    deliveredOrders.forEach(order => {
      if (order.delivery.courierId) {
        if (result[order.delivery.courierId]) {
          result[order.delivery.courierId].orders.push(order);
        }
      }
    });
    
    return Object.values(result).filter(item => item.orders.length > 0);
  }, [deliveredOrders, couriers]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{translations.deliveryReport}</CardTitle>
        <CardDescription>{translations.viewDeliveryPerformance}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{translations.courier}</TableHead>
              <TableHead>{translations.deliveredOrders}</TableHead>
              <TableHead>{translations.totalAmount}</TableHead>
              <TableHead>{translations.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courierDeliveries.length > 0 ? (
              courierDeliveries.map(({ courier, orders }) => {
                const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
                const activeDeliveries = orders.filter(o => o.status === 'delivering').length;
                
                return (
                  <TableRow key={courier.id}>
                    <TableCell className="font-medium">{courier.name}</TableCell>
                    <TableCell>{orders.length} {translations.orders}</TableCell>
                    <TableCell>R$ {totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      {activeDeliveries > 0 ? (
                        <Badge className="bg-purple-500">
                          {activeDeliveries} {translations.active}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500">{translations.available}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  {translations.noDeliveriesYet}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

