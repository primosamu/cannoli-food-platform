
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { sampleCustomers } from "@/data/sampleCustomers";
import { Search, Download, UserCog, ChevronDown, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Tipo da tabela de clientes admin
interface AdminCustomerTableItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  isLoyaltyMember: boolean;
  status: string;
}

export const CustomerManagementPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Converter dados de amostra para o formato da tabela
  const customerTableData: AdminCustomerTableItem[] = sampleCustomers.map(customer => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone || "N/A",
    orders: customer.orderCount,
    spent: customer.totalSpent,
    isLoyaltyMember: Math.random() > 0.5, // Simulação para demo
    status: customer.orderCount > 5 ? "active" : "new"
  }));
  
  // Filtrar clientes com base na busca
  const filteredCustomers = customerTableData.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
  
  // Definir colunas da tabela
  const columns: ColumnDef<AdminCustomerTableItem>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="text-sm">{row.original.email}</div>,
    },
    {
      accessorKey: "phone",
      header: "Telefone",
      cell: ({ row }) => <div className="text-sm">{row.original.phone}</div>,
    },
    {
      accessorKey: "orders",
      header: "Pedidos",
      cell: ({ row }) => <div className="text-center">{row.original.orders}</div>,
    },
    {
      accessorKey: "spent",
      header: "Total Gasto (R$)",
      cell: ({ row }) => <div className="text-right">{row.original.spent.toFixed(2)}</div>,
    },
    {
      accessorKey: "isLoyaltyMember",
      header: "Programa Fidelidade",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.isLoyaltyMember ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Membro</Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">Não inscrito</Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="text-center">
            {status === "active" ? (
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Ativo</Badge>
            ) : (
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Novo</Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <span className="sr-only">Open menu</span>
                  <UserCog className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => toast.info(`Visualizando ${customer.name}`)}>
                  Visualizar detalhes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info(`Editando ${customer.name}`)}>
                  Editar cliente
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info(`Enviando mensagem para ${customer.name}`)}>
                  Enviar mensagem
                </DropdownMenuItem>
                {!customer.isLoyaltyMember && (
                  <DropdownMenuItem onClick={() => toast.info(`Convidando ${customer.name} para o programa de fidelidade`)}>
                    Adicionar ao programa de fidelidade
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600 focus:text-red-600" 
                  onClick={() => toast.error(`Esta ação desativaria ${customer.name}`)}
                >
                  Desativar cliente
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Gerenciamento de Clientes</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os clientes do sistema
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info("Exportação de clientes iniciada")}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Todos os clientes</DropdownMenuItem>
                <DropdownMenuItem>Membros do programa de fidelidade</DropdownMenuItem>
                <DropdownMenuItem>Clientes ativos (>5 pedidos)</DropdownMenuItem>
                <DropdownMenuItem>Novos clientes</DropdownMenuItem>
                <DropdownMenuItem>Sem pedidos recentes</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="rounded-md border">
            <DataTable columns={columns} data={filteredCustomers} />
          </div>
          
          <div className="text-xs text-muted-foreground mt-4">
            Mostrando {filteredCustomers.length} de {customerTableData.length} clientes
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
