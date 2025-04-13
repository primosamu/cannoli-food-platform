
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Customer } from "./CustomerList";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerDetailProps {
  customer: Customer;
}

export const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer }) => {
  const { translations } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">{translations.tags || "Tags"}</h3>
        <div className="flex flex-wrap gap-2">
          {customer.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{translations.contactInfo || "Informações de Contato"}</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-sm font-medium">{translations.email || "Email"}</p>
              <p className="text-sm">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{translations.phoneNumber || "Telefone"}</p>
              <p className="text-sm">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">CPF</p>
              <p className="text-sm">{customer.cpf}</p>
            </div>
            {customer.address && (
              <div>
                <p className="text-sm font-medium">{translations.address || "Endereço"}</p>
                <p className="text-sm">{customer.address}</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{translations.orderHistory || "Histórico de Pedidos"}</h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-sm font-medium">{translations.totalOrders || "Total de Pedidos"}</p>
              <p className="text-sm">{customer.orderCount}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{translations.lastOrder || "Último Pedido"}</p>
              <p className="text-sm">{customer.lastOrderDate ? formatDate(customer.lastOrderDate) : "-"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{translations.totalSpent || "Total Gasto"}</p>
              <p className="text-sm">{formatCurrency(customer.totalSpent || 0)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">{translations.customerSince || "Cliente Desde"}</p>
              <p className="text-sm">{formatDate(customer.joinDate)}</p>
            </div>
          </div>
        </div>
      </div>
      
      {customer.notes && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{translations.notes || "Observações"}</h3>
          <p className="text-sm mt-2">{customer.notes}</p>
        </div>
      )}
    </div>
  );
};
