
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Order } from '@/types/order';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  MonitorSmartphone,
  Store,
  ShoppingBag,
  Truck,
  Timer,
  Check,
  X,
  ChefHat,
  ShoppingCart,
  UserCog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onAssignDelivery: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onStatusChange,
  onAssignDelivery,
}) => {
  const { translations } = useLanguage();
  
  // Helper function to determine the next status
  const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
    switch (currentStatus) {
      case 'new': return 'preparing';
      case 'preparing': return 'ready';
      case 'ready': 
        return order.delivery.type === 'pickup' ? 'completed' : 'delivering';
      case 'delivering': return 'completed';
      default: return null;
    }
  };

  // Get channel icon
  const getChannelIcon = () => {
    switch (order.channel) {
      case 'mobile': return <Phone className="h-4 w-4" />;
      case 'totem': return <MonitorSmartphone className="h-4 w-4" />;
      case 'whatsapp': return <Phone className="h-4 w-4" />;
      case 'app': return <ShoppingBag className="h-4 w-4" />;
      case 'ifood':
      case 'rappi':
      case 'other': return <Store className="h-4 w-4" />;
      default: return null;
    }
  };

  // Get status badge
  const getStatusBadge = () => {
    switch (order.status) {
      case 'new': 
        return <Badge className="bg-blue-500 text-white">{translations.newOrders}</Badge>;
      case 'preparing': 
        return <Badge className="bg-amber-500 text-white">{translations.preparing}</Badge>;
      case 'ready': 
        return <Badge className="bg-green-500 text-white">{translations.ready}</Badge>;
      case 'delivering': 
        return <Badge className="bg-purple-500 text-white">{translations.delivering}</Badge>;
      case 'completed': 
        return <Badge className="bg-gray-500 text-white">{translations.completed}</Badge>;
      case 'cancelled': 
        return <Badge variant="destructive">{translations.cancel}</Badge>;
      default: 
        return null;
    }
  };

  // Next action button based on status
  const getActionButton = () => {
    const nextStatus = getNextStatus(order.status);
    if (!nextStatus) return null;

    switch (nextStatus) {
      case 'preparing':
        return (
          <Button 
            onClick={() => onStatusChange(order.id, nextStatus)} 
            size="sm" 
            className="gap-1"
          >
            <ChefHat className="h-4 w-4" />
            {translations.preparing}
          </Button>
        );
      case 'ready':
        return (
          <Button 
            onClick={() => onStatusChange(order.id, nextStatus)} 
            size="sm" 
            className="gap-1"
          >
            <Check className="h-4 w-4" />
            {translations.ready}
          </Button>
        );
      case 'delivering':
        return order.delivery.courier ? (
          <Button 
            onClick={() => onStatusChange(order.id, nextStatus)} 
            size="sm" 
            className="gap-1"
          >
            <Truck className="h-4 w-4" />
            {translations.delivering}
          </Button>
        ) : (
          <Button 
            onClick={() => onAssignDelivery(order)} 
            size="sm" 
            className="gap-1"
          >
            <Truck className="h-4 w-4" />
            {translations.assignDelivery}
          </Button>
        );
      case 'completed':
        return (
          <Button 
            onClick={() => onStatusChange(order.id, nextStatus)} 
            size="sm" 
            className="gap-1"
          >
            <Check className="h-4 w-4" />
            {translations.completed}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={order.status === 'cancelled' ? 'opacity-70' : ''}>
      <CardHeader className="pb-2 space-y-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 p-1 rounded-md">
              {getChannelIcon()}
            </div>
            <div>
              <p className="font-medium">{order.orderNumber}</p>
              <p className="text-xs text-muted-foreground">{order.channel.toUpperCase()}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="py-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">{order.customer.name}</p>
            <p className="text-sm font-bold">R$ {order.totalAmount.toFixed(2)}</p>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between">
                <p>{item.quantity}x {item.name}</p>
                <p>R$ {(item.quantity * item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
            <Timer className="h-3 w-3" />
            <span>{formatDistanceToNow(order.createdAt, { addSuffix: true })}</span>
            
            {order.delivery.type !== 'pickup' && (
              <div className="flex items-center gap-1 ml-3">
                <Truck className="h-3 w-3" />
                <span>
                  {order.delivery.type === 'own' 
                    ? (order.delivery.courier || translations.selectACourier) 
                    : order.delivery.type.charAt(0).toUpperCase() + order.delivery.type.slice(1)}
                </span>
              </div>
            )}
          </div>
          
          {/* Add Change Courier button if courier is assigned */}
          {(order.status === 'ready' || order.status === 'delivering') && 
           order.delivery.courier && (
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs" 
                onClick={() => onAssignDelivery(order)}
              >
                <UserCog className="h-3 w-3 mr-1" />
                {translations.changeCourier}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex justify-between w-full">
          {order.status !== 'completed' && order.status !== 'cancelled' && getActionButton()}
          
          {order.status !== 'cancelled' && order.status !== 'completed' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => onStatusChange(order.id, 'cancelled')}
            >
              <X className="h-4 w-4 mr-1" />
              {translations.cancel}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
