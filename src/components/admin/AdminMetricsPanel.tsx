
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ArrowUp, ArrowDown, Users, CreditCard, ShoppingBag, DollarSign, Percent } from "lucide-react";
import { sampleCustomers } from "@/data/sampleCustomers";
import { sampleOrders } from "@/data/sampleOrders";
import { sampleLoyaltyMembers } from "@/data/sampleLoyaltyData";

// Dados para os gráficos
const revenueData = [
  { name: "Jan", value: 12400 },
  { name: "Fev", value: 14800 },
  { name: "Mar", value: 17200 },
  { name: "Abr", value: 16300 },
  { name: "Mai", value: 19800 },
  { name: "Jun", value: 23400 },
];

const customerGrowthData = [
  { name: "Jan", novos: 45, ativos: 320 },
  { name: "Fev", novos: 52, ativos: 368 },
  { name: "Mar", novos: 61, ativos: 423 },
  { name: "Abr", novos: 48, ativos: 465 },
  { name: "Mai", novos: 55, ativos: 512 },
  { name: "Jun", novos: 67, ativos: 578 },
];

const customerSourceData = [
  { name: "Aplicativo", value: 35 },
  { name: "Site", value: 25 },
  { name: "Indicações", value: 20 },
  { name: "Redes Sociais", value: 15 },
  { name: "Outros", value: 5 },
];

const COLORS = ["#26A69A", "#5C6BC0", "#EC407A", "#AB47BC", "#FFA726"];

export const AdminMetricsPanel: React.FC = () => {
  // Calcular métricas do sistema usando os dados de amostra
  const totalCustomers = sampleCustomers.length;
  const activeCustomers = sampleCustomers.filter(c => c.orderCount > 0).length;
  const loyaltyMembers = sampleLoyaltyMembers.length;
  const totalOrders = sampleOrders.length;
  const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const loyaltyPercentage = totalCustomers > 0 ? (loyaltyMembers / totalCustomers) * 100 : 0;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+{Math.round(totalCustomers * 0.12)}</span> últimos 30 dias
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Membros Fidelidade</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loyaltyMembers}</div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <Percent className="mr-1 h-4 w-4" />
                <span>{loyaltyPercentage.toFixed(1)}% dos clientes</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+{Math.round(totalOrders * 0.18)}</span> últimos 30 dias
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Média de R$ {averageOrderValue.toFixed(2)} por pedido</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Crescimento de Receita</CardTitle>
            <CardDescription>Receita mensal dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
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
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Origem dos Clientes</CardTitle>
            <CardDescription>Distribuição por canal de aquisição</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerSourceData.map((entry, index) => (
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
          <CardTitle>Crescimento de Clientes</CardTitle>
          <CardDescription>Novos clientes e clientes ativos por mês</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={customerGrowthData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="novos" name="Novos Clientes" stackId="a" fill="#33C3F0" />
              <Bar dataKey="ativos" name="Clientes Ativos" fill="#9b87f5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
