import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  DollarSign,
  Package,
  RefreshCcw,
  ShoppingCart,
  Users,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Activity,
  Store,
} from "lucide-react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { sampleOrders } from "@/data/sampleOrders";
import { sampleCustomers } from "@/data/sampleCustomers";
import { OrderSummarySection } from "@/components/dashboard/OrderSummarySection";
import { CustomerBehaviorSection } from "@/components/dashboard/customer-behavior/CustomerBehaviorSection";
import { StoreSelector, Store as StoreType } from "@/components/dashboard/StoreSelector";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample store data
const stores: StoreType[] = [
  { id: "store-1", name: "Localização Centro" },
  { id: "store-2", name: "Localização Norte" },
  { id: "store-3", name: "Filial Oeste" },
];

// Customer segment data - Translated to Portuguese
const customerSegmentData = [
  { name: "Campeões", value: 200 },
  { name: "Fiéis", value: 350 },
  { name: "Promissores", value: 125 },
  { name: "Necessitam Atenção", value: 180 },
  { name: "Em Risco", value: 95 },
];

// Sales data by store
const salesDataByStore = {
  "store-1": [
    { name: "Jan", delivery: 4000, dineIn: 2400 },
    { name: "Fev", delivery: 3000, dineIn: 1398 },
    { name: "Mar", delivery: 2000, dineIn: 9800 },
    { name: "Abr", delivery: 2780, dineIn: 3908 },
    { name: "Mai", delivery: 1890, dineIn: 4800 },
    { name: "Jun", delivery: 2390, dineIn: 3800 },
  ],
  "store-2": [
    { name: "Jan", delivery: 3200, dineIn: 1800 },
    { name: "Fev", delivery: 2500, dineIn: 1200 },
    { name: "Mar", delivery: 3100, dineIn: 7500 },
    { name: "Abr", delivery: 1900, dineIn: 2800 },
    { name: "Mai", delivery: 2300, dineIn: 3900 },
    { name: "Jun", delivery: 2800, dineIn: 3100 },
  ],
  "store-3": [
    { name: "Jan", delivery: 2800, dineIn: 1600 },
    { name: "Fev", delivery: 2200, dineIn: 1100 },
    { name: "Mar", delivery: 2700, dineIn: 6500 },
    { name: "Abr", delivery: 1700, dineIn: 2500 },
    { name: "Mai", delivery: 2000, dineIn: 3500 },
    { name: "Jun", delivery: 2500, dineIn: 2800 },
  ],
};

// Weekly menu popularity
const weeklyMenuPopularityByStore = {
  "store-1": [
    { name: "Cannoli Clássico", value: 245 },
    { name: "Tiramisu", value: 190 },
    { name: "Delícia de Morango", value: 175 },
    { name: "Fusão de Chocolate", value: 140 },
    { name: "Baunilha Pura", value: 120 },
  ],
  "store-2": [
    { name: "Tiramisu", value: 210 },
    { name: "Cannoli Clássico", value: 180 },
    { name: "Fusão de Chocolate", value: 170 },
    { name: "Baunilha Pura", value: 150 },
    { name: "Delícia de Morango", value: 130 },
  ],
  "store-3": [
    { name: "Fusão de Chocolate", value: 220 },
    { name: "Cannoli Clássico", value: 195 },
    { name: "Tiramisu", value: 175 },
    { name: "Delícia de Morango", value: 155 },
    { name: "Baunilha Pura", value: 125 },
  ],
};

// For combined data (when multiple stores are selected)
const combineData = (selectedStoreIds: string[], dataByStore: any) => {
  if (selectedStoreIds.length === 0) return [];
  
  if (selectedStoreIds.length === 1) {
    return dataByStore[selectedStoreIds[0]];
  }
  
  // Example: combine sales data from multiple stores
  const firstStore = dataByStore[selectedStoreIds[0]];
  
  return firstStore.map((item: any, index: number) => {
    const result = { ...item };
    
    // Sum values from all selected stores
    selectedStoreIds.forEach(storeId => {
      if (storeId !== selectedStoreIds[0]) { // Skip the first store (already added)
        const storeData = dataByStore[storeId][index];
        Object.keys(storeData).forEach(key => {
          if (key !== 'name') {
            result[key] = (result[key] || 0) + storeData[key];
          }
        });
      }
    });
    
    return result;
  });
};

// Chart colors
const COLORS = ["#26A69A", "#5C6BC0", "#EC407A", "#AB47BC", "#FFA726", "#42A5F5", "#66BB6A"];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeDetailedTab, setActiveDetailedTab] = useState<string>("orders-summary");
  const [selectedStores, setSelectedStores] = useState<string[]>(stores.map(store => store.id));
  const [salesPeriod, setSalesPeriod] = useState("monthly");
  const { translations } = useLanguage();

  // Get combined data based on selected stores
  const salesData = combineData(selectedStores, salesDataByStore);
  const menuPopularityData = combineData(selectedStores, weeklyMenuPopularityByStore);

  // Prepare sales data for the chart
  const preparedSalesData = salesPeriod === "monthly" 
    ? salesData 
    : salesData.map((item: any) => ({
        name: item.name,
        total: item.delivery + item.dineIn,
      }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.dashboard}</h2>
          <p className="text-muted-foreground">
            Visão geral do desempenho do seu restaurante e dados de clientes.
          </p>
        </div>
        <StoreSelector 
          stores={stores} 
          selectedStores={selectedStores} 
          onStoreChange={setSelectedStores} 
        />
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="detailed">Análise Detalhada</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45.231,89</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+20,1%</span> em relação ao mês passado
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2.350</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+180</span> novos este mês
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{translations.orders}</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.234</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+19%</span> em relação ao mês passado
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 campanhas</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Próxima campanha em 3 dias</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Visão Geral de Vendas</CardTitle>
                    <CardDescription>
                      {selectedStores.length === 1 
                        ? `Desempenho de vendas para ${stores.find(s => s.id === selectedStores[0])?.name}`
                        : `Vendas combinadas de ${selectedStores.length} lojas`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Store className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {selectedStores.length === stores.length 
                        ? "Todas as Lojas" 
                        : `${selectedStores.length} de ${stores.length} Lojas`}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <Tabs defaultValue="monthly" onValueChange={setSalesPeriod}>
                  <div className="flex justify-between items-center">
                    <TabsList>
                      <TabsTrigger value="monthly">Mensal</TabsTrigger>
                      <TabsTrigger value="total">Total</TabsTrigger>
                    </TabsList>
                    <RefreshCcw className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                  <TabsContent value="monthly" className="pt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salesData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend 
                            formatter={(value) => 
                              value === "delivery" ? "Entrega" : "No Local"
                            }
                          />
                          <Bar dataKey="delivery" name="Entrega" fill="#26A69A" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="dineIn" name="No Local" fill="#5C6BC0" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  <TabsContent value="total" className="pt-4">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={preparedSalesData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="total" 
                            name="Total"
                            stroke="#EC407A" 
                            strokeWidth={2} 
                            dot={{ r: 4 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Segmentação de Clientes</CardTitle>
                <CardDescription>
                  Distribuição entre segmentos de clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="20%" 
                      outerRadius="70%" 
                      barSize={20} 
                      data={customerSegmentData}
                    >
                      <RadialBar
                        label={{ position: 'insideStart', fill: '#fff', fontWeight: 600, fontSize: 12 }}
                        background
                        dataKey="value"
                      >
                        {customerSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </RadialBar>
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        wrapperStyle={{ right: -10, top: '45%', transform: 'translate(0, -45%)' }} 
                        align="right"
                        iconSize={10}
                        iconType="circle"
                      />
                      <Tooltip 
                        formatter={(value, name) => [`${value} clientes`, `${name}`]}
                        labelFormatter={() => 'Segmento de Cliente'} 
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Itens de Menu Populares</CardTitle>
                <CardDescription>Vendas semanais por item de menu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={menuPopularityData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 80,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#AB47BC" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Desempenho de Campanhas</CardTitle>
                <CardDescription>Métricas de campanhas recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Oferta Especial de Fim de Semana</p>
                      <p className="text-xs text-muted-foreground">Enviado para 1.204 clientes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">38% taxa de abertura</p>
                      <p className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        12% conversão
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Lançamento de Novo Menu</p>
                      <p className="text-xs text-muted-foreground">Enviado para 2.530 clientes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">42% taxa de abertura</p>
                      <p className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        18% conversão
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Recompensa de Fidelidade</p>
                      <p className="text-xs text-muted-foreground">Enviado para 845 clientes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">62% taxa de abertura</p>
                      <p className="text-xs text-green-500 flex items-center justify-end">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        24% conversão
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Recuperação de Clientes Inativos</p>
                      <p className="text-xs text-muted-foreground">Enviado para 578 clientes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">28% taxa de abertura</p>
                      <p className="text-xs text-amber-500 flex items-center justify-end">
                        <ArrowDown className="h-4 w-4 mr-1" />
                        8% conversão
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="flex justify-between items-center">
            <Tabs defaultValue="orders-summary" value={activeDetailedTab} onValueChange={setActiveDetailedTab} className="w-full">
              <div className="flex justify-between items-center border-b mb-6 pb-2">
                <TabsList>
                  <TabsTrigger value="orders-summary" className="flex items-center gap-2">
                    <BarChartIcon className="h-4 w-4" />
                    Resumo de Pedidos
                  </TabsTrigger>
                  <TabsTrigger value="customer-behavior" className="flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4" />
                    Comportamento do Cliente
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <StoreSelector 
                    stores={stores} 
                    selectedStores={selectedStores} 
                    onStoreChange={setSelectedStores}
                    showAll={true} 
                  />
                  <Button variant="outline" size="sm">
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Atualizar Dados
                  </Button>
                </div>
              </div>
              
              <TabsContent value="orders-summary">
                <OrderSummarySection />
              </TabsContent>
              
              <TabsContent value="customer-behavior">
                <CustomerBehaviorSection />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
