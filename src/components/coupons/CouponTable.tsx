
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

interface CouponTableProps {
  data: Coupon[];
  filter?: "active" | "inactive" | "scheduled";
}

export const CouponTable: React.FC<CouponTableProps> = ({ 
  data, 
  filter = "active"
}) => {
  const filteredData = filter === "active" 
    ? data.filter(coupon => coupon.active)
    : filter === "inactive" 
      ? data.filter(coupon => !coupon.active)
      : [];

  const columns = [
    {
      accessorKey: "name",
      header: "Coupon Name",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type");
        return (
          <span className="capitalize">
            {type === "fixed"
              ? "Fixed Amount"
              : type === "percentage"
              ? "Percentage"
              : type === "shipping"
              ? "Free Shipping"
              : "Freebie"}
          </span>
        );
      },
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => {
        const type = row.getValue("type");
        const value = row.getValue("value");
        const freebie = row.original.freebie;

        return type === "fixed"
          ? `$${value}`
          : type === "percentage"
          ? `${value}%`
          : type === "shipping"
          ? "Free Shipping"
          : `Free ${freebie}`;
      },
    },
    {
      accessorKey: "minimumPurchase",
      header: "Min. Purchase",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("minimumPurchase"));
        return `$${amount.toFixed(2)}`;
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
                <span>Active</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <span>Inactive</span>
              </>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "usageCount",
      header: "Usage",
    },
    {
      accessorKey: "expiresAt",
      header: "Expires",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit Coupon</DropdownMenuItem>
              <DropdownMenuItem>View Usage History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete Coupon
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
};
