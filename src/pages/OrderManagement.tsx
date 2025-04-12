
import React, { useState, useEffect } from 'react';
import { sampleOrders } from '@/data/sampleOrders';
import { Order } from '@/types/order';
import { Button } from '@/components/ui/button';
import { OrderKanban } from '@/components/orders/OrderKanban';
import { OrderList } from '@/components/orders/OrderList';
import { AssignCourierDialog } from '@/components/orders/AssignCourierDialog';
import {
  LayoutGrid,
  List,
  Filter,
  SortAsc,
  Phone,
  MonitorSmartphone,
  Store,
  ShoppingBag,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<Record<string, boolean>>({
    mobile: true,
    totem: true,
    whatsapp: true,
    app: true,
    ifood: true,
    rappi: true,
    other: true,
  });
  const { toast } = useToast();

  // Filter orders based on selected channels and completed/cancelled status
  const filteredOrders = orders.filter(order => {
    const channelMatch = selectedChannels[order.channel];
    const statusMatch = showCompleted || (order.status !== 'completed' && order.status !== 'cancelled');
    return channelMatch && statusMatch;
  });

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = {
          ...order,
          status: newStatus,
          updatedAt: new Date(),
        };
        
        // Show toast notification based on status change
        const statusMessages = {
          'preparing': '🧑‍🍳 Order is now being prepared',
          'ready': '✅ Order is ready for pickup/delivery',
          'delivering': '🚚 Order is out for delivery',
          'completed': '🎉 Order completed successfully',
          'cancelled': '❌ Order has been cancelled'
        };
        
        if (statusMessages[newStatus]) {
          toast({
            title: `Order ${order.orderNumber} Updated`,
            description: statusMessages[newStatus],
          });
        }
        
        return updatedOrder;
      }
      return order;
    }));
  };

  // Handle delivery assignment
  const handleAssignDelivery = (order: Order) => {
    setSelectedOrder(order);
    setIsAssignDialogOpen(true);
  };

  // Assign courier to order
  const assignCourier = (orderId: string, courierName: string) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        toast({
          title: `Courier Assigned`,
          description: `${courierName} has been assigned to order ${order.orderNumber}`,
        });
        
        return {
          ...order,
          delivery: {
            ...order.delivery,
            courier: courierName,
          },
          updatedAt: new Date(),
        };
      }
      return order;
    }));
    
    setIsAssignDialogOpen(false);
    setSelectedOrder(null);
  };

  // Handle closing the assignment dialog
  const handleCloseAssignDialog = () => {
    setIsAssignDialogOpen(false);
    setSelectedOrder(null);
  };

  // Toggle channel filter
  const toggleChannel = (channel: string) => {
    setSelectedChannels(prev => ({
      ...prev,
      [channel]: !prev[channel],
    }));
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Order Management</h1>
          
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex border rounded-md overflow-hidden">
              <Button 
                variant={view === 'kanban' ? 'default' : 'ghost'} 
                size="sm"
                className={`rounded-none ${view === 'kanban' ? '' : 'text-gray-500'}`}
                onClick={() => setView('kanban')}
              >
                <LayoutGrid className="h-4 w-4 mr-1" />
                Kanban
              </Button>
              <Button 
                variant={view === 'list' ? 'default' : 'ghost'} 
                size="sm"
                className={`rounded-none ${view === 'list' ? '' : 'text-gray-500'}`}
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>
            
            {/* Show completed/cancelled toggle */}
            <Button 
              variant={showCompleted ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {showCompleted ? 'Hide' : 'Show'} Completed
            </Button>
            
            {/* Channel filter dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Channels
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={selectedChannels.mobile}
                  onCheckedChange={() => toggleChannel('mobile')}
                >
                  <Phone className="h-4 w-4 mr-2 text-blue-500" />
                  Mobile
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedChannels.totem}
                  onCheckedChange={() => toggleChannel('totem')}
                >
                  <MonitorSmartphone className="h-4 w-4 mr-2 text-amber-500" />
                  Totem
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedChannels.whatsapp}
                  onCheckedChange={() => toggleChannel('whatsapp')}
                >
                  <Phone className="h-4 w-4 mr-2 text-green-500" />
                  WhatsApp
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedChannels.app}
                  onCheckedChange={() => toggleChannel('app')}
                >
                  <ShoppingBag className="h-4 w-4 mr-2 text-purple-500" />
                  App
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedChannels.ifood}
                  onCheckedChange={() => toggleChannel('ifood')}
                >
                  <Store className="h-4 w-4 mr-2 text-red-500" />
                  iFood
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedChannels.rappi}
                  onCheckedChange={() => toggleChannel('rappi')}
                >
                  <Store className="h-4 w-4 mr-2 text-orange-500" />
                  Rappi
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedChannels.other}
                  onCheckedChange={() => toggleChannel('other')}
                >
                  <Store className="h-4 w-4 mr-2 text-gray-500" />
                  Other
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Order statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'new').length}
              </div>
            </CardContent>
            <CardFooter className="py-3 text-xs text-muted-foreground">
              Waiting to be prepared
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Preparing</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'preparing').length}
              </div>
            </CardContent>
            <CardFooter className="py-3 text-xs text-muted-foreground">
              Currently in preparation
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'ready').length}
              </div>
            </CardContent>
            <CardFooter className="py-3 text-xs text-muted-foreground">
              Ready for pickup/delivery
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Delivering</CardTitle>
            </CardHeader>
            <CardContent className="py-0">
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'delivering').length}
              </div>
            </CardContent>
            <CardFooter className="py-3 text-xs text-muted-foreground">
              Out for delivery
            </CardFooter>
          </Card>
        </div>
        
        {/* Orders view (kanban or list) */}
        {view === 'kanban' ? (
          <OrderKanban 
            orders={filteredOrders} 
            onStatusChange={handleStatusChange}
            onAssignDelivery={handleAssignDelivery}
            showCompleted={showCompleted}
          />
        ) : (
          <OrderList 
            orders={filteredOrders} 
            onStatusChange={handleStatusChange}
            onAssignDelivery={handleAssignDelivery}
          />
        )}
      </div>
      
      {/* Courier assignment dialog */}
      <AssignCourierDialog
        open={isAssignDialogOpen}
        order={selectedOrder}
        onClose={handleCloseAssignDialog}
        onAssign={assignCourier}
      />
    </div>
  );
};

export default OrderManagement;
