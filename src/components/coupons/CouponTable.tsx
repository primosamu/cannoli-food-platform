
import React from "react";
import { CheckCircle, AlertCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coupon } from "./CouponSchema";
import { ColumnDef } from "@tanstack/react-table";
import { useLanguage } from "@/contexts/LanguageContext";

interface CouponTableProps {
  data: Coupon[];
  filter?: "active" | "inactive" | "scheduled";
}

export const CouponTable: React.FC<CouponTableProps> = ({ 
  data, 
  filter = "active"
}) => {
  const { translations } = useLanguage();
  
  const filteredData = filter === "active" 
    ? data.filter(coupon => coupon.active)
    : filter === "inactive" 
      ? data.filter(coupon => !coupon.active)
      : [];

  const columns: ColumnDef<Coupon>[] = [
    {
      accessorKey: "name",
      header: "Nome do Cupom",
    },
    {
      accessorKey: "code",
      header: "Código",
    },
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <span className="capitalize">
            {type === "fixed"
              ? "Valor Fixo"
              : type === "percentage"
              ? "Porcentagem"
              : type === "shipping"
              ? "Frete Grátis"
              : "Item Grátis"}
          </span>
        );
      },
    },
    {
      accessorKey: "value",
      header: "Valor",
      cell: ({ row }) => {
        const type = row.getValue("type");
        const value = row.getValue("value");
        const freebie = row.original.freebie;

        return type === "fixed"
          ? `R$${value}`
          : type === "percentage"
          ? `${value}%`
          : type === "shipping"
          ? "Frete Grátis"
          : `${freebie} Grátis`;
      },
    },
    {
      accessorKey: "minimumPurchase",
      header: "Compra Mínima",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("minimumPurchase"));
        return `R$${amount.toFixed(2)}`;
      },
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("active");
        return (
          <div className="flex items-center">
            {isActive ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Ativo</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <span>Inativo</span>
              </>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "usageCount",
      header: "Usos",
    },
    {
      accessorKey: "expiresAt",
      header: "Expira em",
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem>Editar Cupom</DropdownMenuItem>
              <DropdownMenuItem>Ver Histórico de Uso</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Excluir Cupom
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable columns={columns} data={filteredData} />
  );
}
