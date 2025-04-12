
import React from 'react';
import { Order, OrderStatus } from '@/types/order';
import { OrderCard } from './OrderCard';

interface OrderKanbanProps {
  orders: Order[];
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onAssignDelivery: (order: Order) => void;
  showCompleted?: boolean;
}

export const OrderKanban: React.FC<OrderKanbanProps> = ({ 
  orders, 
  onStatusChange,
  onAssignDelivery,
  showCompleted = false,
}) => {
  // Define the columns for the kanban board
  const columns: { title: string; status: OrderStatus; color: string }[] = [
    { title: 'New', status: 'new', color: 'bg-blue-50 border-blue-200' },
    { title: 'Preparing', status: 'preparing', color: 'bg-amber-50 border-amber-200' },
    { title: 'Ready', status: 'ready', color: 'bg-green-50 border-green-200' },
    { title: 'Delivering', status: 'delivering', color: 'bg-purple-50 border-purple-200' },
  ];
  
  // Add completed/cancelled columns if needed
  if (showCompleted) {
    columns.push(
      { title: 'Completed', status: 'completed', color: 'bg-gray-50 border-gray-200' },
      { title: 'Cancelled', status: 'cancelled', color: 'bg-red-50 border-red-200' }
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 px-1 min-h-[70vh]">
      {columns.map(column => {
        const columnOrders = orders.filter(order => order.status === column.status);
        
        return (
          <div 
            key={column.status} 
            className={`flex-shrink-0 w-[300px] rounded-lg border ${column.color} p-2`}
          >
            <div className="flex items-center justify-between p-2 border-b mb-2">
              <h3 className="font-medium">{column.title}</h3>
              <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
                {columnOrders.length}
              </span>
            </div>
            
            <div className="space-y-3 max-h-[calc(70vh-70px)] overflow-y-auto pr-1">
              {columnOrders.length > 0 ? (
                columnOrders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    onStatusChange={onStatusChange}
                    onAssignDelivery={onAssignDelivery}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-2 text-center border border-dashed rounded-lg bg-white/50">
                  <p className="text-sm text-muted-foreground">No orders</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
