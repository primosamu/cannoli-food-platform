
import React, { useState, useEffect } from 'react';
import { sampleOrders } from '@/data/sampleOrders';
import { sampleCouriers } from '@/data/sampleCouriers';
import { Order, Courier, DeliveryType, DeliveryCompany } from '@/types/order';
import { Button } from '@/components/ui/button';
import { OrderKanban } from '@/components/orders/OrderKanban';
import { OrderList } from '@/components/orders/OrderList';
import { AssignCourierDialog } from '@/components/orders/AssignCourierDialog';
import { CourierManagement } from '@/components/orders/CourierManagement';
import { DeliveryReport } from '@/components/orders/DeliveryReport';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  LayoutGrid,
  List,
  Filter,
  SortAsc,
  Phone,
  MonitorSmartphone,
  Store,
  ShoppingBag,
  UserCheck,
  ClipboardList,
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
import { useLanguage } from '@/contexts/LanguageContext';

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [couriers, setCouriers] = useState<Courier[]>(sampleCouriers);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'couriers' | 'reports'>('orders');
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
  const { translations } = useLanguage();

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
          'preparing': '🧑‍🍳 ' + translations.orderPreparingToast,
          'ready': '✅ ' + translations.orderReadyToast,
          'delivering': '🚚 ' + translations.orderDeliveringToast,
          'completed': '🎉 ' + translations.orderCompletedToast,
          'cancelled': '❌ ' + translations.orderCancelledToast
        };
        
        if (statusMessages[newStatus]) {
          toast({
            title: `${translations.orderNumber} ${order.orderNumber} ${translations.updated}`,
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

  // Assign delivery details to order
  const handleAssignDeliveryDetails = (orderId: string, deliveryDetails: {
    type: DeliveryType,
    courier?: string,
    courierId?: string,
    company?: DeliveryCompany
  }) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        toast({
          title: translations.deliveryAssigned,
          description: deliveryDetails.courier 
            ? `${deliveryDetails.courier} ${translations.hasBeenAssignedToOrder} ${order.orderNumber}`
            : `${translations.deliveryTypeChanged}`,
        });
        
        return {
          ...order,
          delivery: {
            ...order.delivery,
            ...deliveryDetails,
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
  
  // Handle adding a new courier
  const handleAddCourier = (courier: Omit<Courier, 'id' | 'deliveryCount'>) => {
    const newCourier: Courier = {
      ...courier,
      id: `cour_${couriers.length + 1}`.padStart(8, '0'),
      deliveryCount: 0
    };
    
    setCouriers(prev => [...prev, newCourier]);
  };
  
  // Handle toggling courier availability
  const handleToggleCourierAvailability = (courierId: string) => {
    setCouriers(prev => prev.map(courier => {
      if (courier.id === courierId) {
        return {
          ...courier,
          isAvailable: !courier.isAvailable
        };
      }
      return courier;
    }));
    
    toast({
      title: translations.courierUpdated,
      description: translations.courierStatusUpdated,
    });
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{translations.orderManagement}</h1>
          
          <div className="flex items-center gap-2">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList>
                <TabsTrigger value="orders">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {translations.orders}
                </TabsTrigger>
                <TabsTrigger value="couriers">
                  <UserCheck className="h-4 w-4 mr-2" />
                  {translations.couriers}
                </TabsTrigger>
                <TabsTrigger value="reports">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  {translations.reports}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Wrap all content in a single Tabs component */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mt-0">
          <TabsContent value="orders" className="mt-0">
            <div className="flex justify-end items-center gap-2 mb-4">
              {/* View toggle */}
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={view === 'kanban' ? 'default' : 'ghost'} 
                  size="sm"
                  className={`rounded-none ${view === 'kanban' ? '' : 'text-gray-500'}`}
                  onClick={() => setView('kanban')}
                >
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  {translations.kanban}
                </Button>
                <Button 
                  variant={view === 'list' ? 'default' : 'ghost'} 
                  size="sm"
                  className={`rounded-none ${view === 'list' ? '' : 'text-gray-500'}`}
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4 mr-1" />
                  {translations.list}
                </Button>
              </div>
              
              {/* Show completed/cancelled toggle */}
              <Button 
                variant={showCompleted ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? translations.hide : translations.show} {translations.completed}
              </Button>
              
              {/* Channel filter dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    {translations.channels}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuCheckboxItem
                    checked={selectedChannels.mobile}
                    onCheckedChange={() => toggleChannel('mobile')}
                  >
                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                    {translations.mobile}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedChannels.totem}
                    onCheckedChange={() => toggleChannel('totem')}
                  >
                    <MonitorSmartphone className="h-4 w-4 mr-2 text-amber-500" />
                    {translations.totem}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedChannels.whatsapp}
                    onCheckedChange={() => toggleChannel('whatsapp')}
                  >
                    <Phone className="h-4 w-4 mr-2 text-green-500" />
                    {translations.whatsapp}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedChannels.app}
                    onCheckedChange={() => toggleChannel('app')}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2 text-purple-500" />
                    {translations.app}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedChannels.ifood}
                    onCheckedChange={() => toggleChannel('ifood')}
                  >
                    <Store className="h-4 w-4 mr-2 text-red-500" />
                    {translations.ifood}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedChannels.rappi}
                    onCheckedChange={() => toggleChannel('rappi')}
                  >
                    <Store className="h-4 w-4 mr-2 text-orange-500" />
                    {translations.rappi}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedChannels.other}
                    onCheckedChange={() => toggleChannel('other')}
                  >
                    <Store className="h-4 w-4 mr-2 text-gray-500" />
                    {translations.other}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Order statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">{translations.newOrders}</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'new').length}
                  </div>
                </CardContent>
                <CardFooter className="py-3 text-xs text-muted-foreground">
                  {translations.waitingToBePrepared}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">{translations.preparing}</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'preparing').length}
                  </div>
                </CardContent>
                <CardFooter className="py-3 text-xs text-muted-foreground">
                  {translations.currentlyInPreparation}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">{translations.ready}</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'ready').length}
                  </div>
                </CardContent>
                <CardFooter className="py-3 text-xs text-muted-foreground">
                  {translations.readyForPickupDelivery}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">{translations.delivering}</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="text-2xl font-bold">
                    {orders.filter(o => o.status === 'delivering').length}
                  </div>
                </CardContent>
                <CardFooter className="py-3 text-xs text-muted-foreground">
                  {translations.outForDelivery}
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
          </TabsContent>
          
          {/* Couriers tab */}
          <TabsContent value="couriers" className="mt-0">
            <CourierManagement 
              couriers={couriers} 
              onAddCourier={handleAddCourier}
              onToggleAvailability={handleToggleCourierAvailability}
            />
          </TabsContent>
          
          {/* Reports tab */}
          <TabsContent value="reports" className="mt-0">
            <DeliveryReport orders={orders} couriers={couriers} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Courier assignment dialog */}
      <AssignCourierDialog
        open={isAssignDialogOpen}
        order={selectedOrder}
        onClose={handleCloseAssignDialog}
        onAssign={handleAssignDeliveryDetails}
        couriers={couriers}
      />
    </div>
  );
};

export default OrderManagement;
