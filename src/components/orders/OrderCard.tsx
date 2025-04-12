
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        return <Badge className="bg-blue-500 text-white">New</Badge>;
      case 'preparing': 
        return <Badge className="bg-amber-500 text-white">Preparing</Badge>;
      case 'ready': 
        return <Badge className="bg-green-500 text-white">Ready</Badge>;
      case 'delivering': 
        return <Badge className="bg-purple-500 text-white">Delivering</Badge>;
      case 'completed': 
        return <Badge className="bg-gray-500 text-white">Completed</Badge>;
      case 'cancelled': 
        return <Badge variant="destructive">Cancelled</Badge>;
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
            Start Preparing
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
            Mark Ready
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
            Start Delivery
          </Button>
        ) : (
          <Button 
            onClick={() => onAssignDelivery(order)} 
            size="sm" 
            className="gap-1"
          >
            <Truck className="h-4 w-4" />
            Assign Courier
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
            Complete Order
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
                    ? (order.delivery.courier || 'Unassigned') 
                    : order.delivery.type.charAt(0).toUpperCase() + order.delivery.type.slice(1)}
                </span>
              </div>
            )}
          </div>
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
              Cancel
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
