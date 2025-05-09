import React from 'react';
import { Order } from '@/types/order';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Phone, 
  ShoppingBag, 
  Store, 
  MoreHorizontal,
  Truck,
  User,
  ReceiptText,
  MonitorSmartphone,
  UserCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderListProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onAssignDelivery: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  onStatusChange,
  onAssignDelivery,
}) => {
  const { translations } = useLanguage();
  
  // Helper function to get channel icon
  const getChannelIcon = (channel: Order['channel']) => {
    switch (channel) {
      case 'mobile':
        return <Phone className="h-4 w-4 text-blue-500" />;
      case 'totem':
        return <MonitorSmartphone className="h-4 w-4 text-amber-500" />;
      case 'whatsapp':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'app':
        return <ShoppingBag className="h-4 w-4 text-purple-500" />;
      case 'ifood':
        return <Store className="h-4 w-4 text-red-500" />;
      case 'rappi':
        return <Store className="h-4 w-4 text-orange-500" />;
      case 'other':
        return <Store className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  // Helper function to get status badge
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
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
  
  // Next possible status for dropdown
  const getNextPossibleStatuses = (currentStatus: Order['status']) => {
    switch (currentStatus) {
      case 'new': 
        return ['preparing', 'cancelled'];
      case 'preparing': 
        return ['ready', 'cancelled'];
      case 'ready': 
        return ['delivering', 'completed', 'cancelled'];
      case 'delivering': 
        return ['completed', 'cancelled'];
      case 'completed':
      case 'cancelled':
      default:
        return [];
    }
  };

  const columns: ColumnDef<Order>[] = [
    // Order number and channel
    {
      accessorKey: 'orderNumber',
      header: translations.orderNumber,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 p-1 rounded-md">
              {getChannelIcon(order.channel)}
            </div>
            <div>
              <p className="font-medium">{order.orderNumber}</p>
              <p className="text-xs text-muted-foreground">{order.channel.toUpperCase()}</p>
            </div>
          </div>
        );
      },
    },
    // Customer
    {
      accessorKey: 'customer.name',
      header: translations.name,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
            </div>
          </div>
        );
      },
    },
    // Items
    {
      accessorKey: 'items',
      header: translations.orders,
      cell: ({ row }) => {
        const order = row.original;
        const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
        
        return (
          <div className="flex items-center space-x-2">
            <ReceiptText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{totalItems} {translations.orders.toLowerCase()}</p>
              <p className="text-xs text-muted-foreground">
                {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ').substring(0, 20)}
                {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ').length > 20 ? '...' : ''}
              </p>
            </div>
          </div>
        );
      },
    },
    // Amount
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            R$ {row.original.totalAmount.toFixed(2)}
          </div>
        );
      },
    },
    // Time
    {
      accessorKey: 'createdAt',
      header: 'Time',
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="text-sm">
            <p>{format(order.createdAt, 'HH:mm')}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(order.createdAt, { addSuffix: true })}
            </p>
          </div>
        );
      },
    },
    // Delivery
    {
      accessorKey: 'delivery',
      header: 'Delivery',
      cell: ({ row }) => {
        const order = row.original;
        if (order.delivery.type === 'pickup') {
          return <Badge variant="outline">Pickup</Badge>;
        }
        
        return (
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <div>
                {order.delivery.type === 'own' ? (
                  order.delivery.courier ? (
                    <p className="text-sm">{order.delivery.courier}</p>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => onAssignDelivery(order)}
                    >
                      {translations.assignDelivery}
                    </Button>
                  )
                ) : (
                  <p className="text-sm capitalize">{order.delivery.type}</p>
                )}
              </div>
            </div>
            
            {(order.status === 'ready' || order.status === 'delivering') && 
             order.delivery.courier && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 px-2 text-xs flex items-center"
                onClick={() => onAssignDelivery(order)}
              >
                <UserCog className="h-3 w-3 mr-1" />
                {translations.changeCourier}
              </Button>
            )}
          </div>
        );
      },
    },
    // Status
    {
      accessorKey: 'status',
      header: translations.status,
      cell: ({ row }) => {
        return getStatusBadge(row.original.status);
      },
    },
    // Actions
    {
      id: 'actions',
      cell: ({ row }) => {
        const order = row.original;
        const nextStatuses = getNextPossibleStatuses(order.status);
        
        if (nextStatuses.length === 0) {
          return null;
        }
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{translations.actions}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {nextStatuses.includes('preparing') && (
                <DropdownMenuItem onClick={() => onStatusChange(order.id, 'preparing')}>
                  {translations.preparing}
                </DropdownMenuItem>
              )}
              {nextStatuses.includes('ready') && (
                <DropdownMenuItem onClick={() => onStatusChange(order.id, 'ready')}>
                  {translations.ready}
                </DropdownMenuItem>
              )}
              {nextStatuses.includes('delivering') && order.delivery.type !== 'pickup' && (
                order.delivery.courier ? (
                  <DropdownMenuItem onClick={() => onStatusChange(order.id, 'delivering')}>
                    {translations.delivering}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => onAssignDelivery(order)}>
                    {translations.assignDelivery}
                  </DropdownMenuItem>
                )
              )}
              {nextStatuses.includes('completed') && (
                <DropdownMenuItem onClick={() => onStatusChange(order.id, 'completed')}>
                  {translations.completed}
                </DropdownMenuItem>
              )}
              
              {(order.status === 'ready' || order.status === 'delivering') && 
                order.delivery.courier && (
                <DropdownMenuItem onClick={() => onAssignDelivery(order)}>
                  {translations.changeCourier}
                </DropdownMenuItem>
              )}
              
              {nextStatuses.includes('cancelled') && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onStatusChange(order.id, 'cancelled')}
                  >
                    {translations.cancel}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  
  return <DataTable columns={columns} data={orders} />;
};
