
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { toast } from "sonner";
import { ArrowRight, Calendar, CreditCard, DollarSign, Download, Filter } from "lucide-react";

// Dados simulados para pagamentos
const paymentData = Array.from({ length: 15 }, (_, i) => {
  const status = Math.random() > 0.8 ? "pending" : Math.random() > 0.5 ? "completed" : "refunded";
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  
  const amount = parseFloat((Math.random() * 400 + 50).toFixed(2));
  const orderId = `ORD-${(100000 + i).toString()}`;
  const customer = [
    "João Silva", "Maria Oliveira", "Pedro Santos", "Ana Lima", 
    "Carlos Ferreira", "Juliana Costa", "Rafael Alves", "Fernanda Martins"
  ][Math.floor(Math.random() * 8)];
  
  const method = Math.random() > 0.6 ? "credit_card" : Math.random() > 0.3 ? "pix" : "money";
  
  return {
    id: `pay-${i+1}`,
    date,
    orderId,
    customer,
    amount,
    status,
    method
  };
});

// Dados para os gráficos
const paymentMethodData = [
  { name: "Cartão de Crédito", value: 65 },
  { name: "Pix", value: 25 },
  { name: "Dinheiro", value: 10 },
];

const revenueByDayData = [
  { name: "Seg", value: 1200 },
  { name: "Ter", value: 1400 },
  { name: "Qua", value: 1800 },
  { name: "Qui", value: 1500 },
  { name: "Sex", value: 2200 },
  { name: "Sáb", value: 2800 },
  { name: "Dom", value: 1900 },
];

// Cores para o gráfico de pizza
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// Interface para a tabela de pagamentos
interface PaymentItem {
  id: string;
  date: Date;
  orderId: string;
  customer: string;
  amount: number;
  status: string;
  method: string;
}

export const PaymentsPanel: React.FC = () => {
  // Colunas para a tabela de pagamentos
  const columns: ColumnDef<PaymentItem>[] = [
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => {
        const date = row.original.date;
        return (
          <div className="text-sm">
            {date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </div>
        );
      },
    },
    {
      accessorKey: "orderId",
      header: "ID do Pedido",
      cell: ({ row }) => (
        <div className="text-sm font-medium">{row.original.orderId}</div>
      ),
    },
    {
      accessorKey: "customer",
      header: "Cliente",
      cell: ({ row }) => <div className="text-sm">{row.original.customer}</div>,
    },
    {
      accessorKey: "method",
      header: "Método",
      cell: ({ row }) => {
        const method = row.original.method;
        let label = "Desconhecido";
        let className = "bg-gray-100 text-gray-800";
        
        if (method === "credit_card") {
          label = "Cartão";
          className = "bg-blue-100 text-blue-800 hover:bg-blue-200";
        } else if (method === "pix") {
          label = "Pix";
          className = "bg-green-100 text-green-800 hover:bg-green-200";
        } else if (method === "money") {
          label = "Dinheiro";
          className = "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
        }
        
        return (
          <Badge className={className}>{label}</Badge>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Valor (R$)",
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {row.original.amount.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        if (status === "completed") {
          return <Badge className="bg-green-100 text-green-800">Concluído</Badge>;
        } else if (status === "pending") {
          return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
        } else if (status === "refunded") {
          return <Badge className="bg-red-100 text-red-800">Estornado</Badge>;
        }
        return <Badge>{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <div className="text-right">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => toast.info(`Detalhes do pagamento ${payment.id}`)}
            >
              Detalhes <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
  
  // Calcular total de receita e pagamentos
  const totalRevenue = paymentData.reduce(
    (sum, payment) => sum + (payment.status !== "refunded" ? payment.amount : 0), 
    0
  );
  const totalPayments = paymentData.length;
  const completedPayments = paymentData.filter(p => p.status === "completed").length;
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              Últimos 30 dias
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Transações</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPayments}</div>
            <div className="text-xs text-muted-foreground">
              {completedPayments} concluídas, {totalPayments - completedPayments} pendentes/estornadas
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Período</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Select defaultValue="30d">
              <SelectTrigger>
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="custom">Período personalizado</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Receita por Dia da Semana</CardTitle>
            <CardDescription>Distribuição de receita nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueByDayData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, "Receita"]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Receita"
                  stroke="#7E69AB"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Métodos de Pagamento</CardTitle>
            <CardDescription>Distribuição por método de pagamento</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentual"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Histórico de Pagamentos</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os pagamentos
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info("Relatório de pagamentos gerado")}>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="completed">Concluídos</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="refunded">Estornados</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <DataTable
                columns={columns}
                data={paymentData.sort((a, b) => b.date.getTime() - a.date.getTime())}
              />
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
