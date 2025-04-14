import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, Award, Users, Plus, Gift, Calendar, ArrowUpDown, UserPlus, Crown, Clock, Filter, PlusCircle, MinusCircle, ChevronUp, ChevronDown, Eye, MoreVertical, Edit, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  sampleLoyaltyMembers,
  sampleLoyaltyRewards,
  samplePointTransactions,
  loyaltyProgramStats
} from "@/data/sampleLoyaltyData";
import { sampleCustomers } from "@/data/sampleCustomers";
import { formatDistanceToNow } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { InviteCustomersDialog } from "@/components/loyalty/InviteCustomersDialog";
import { AddMemberDialog } from "@/components/loyalty/AddMemberDialog";
import { CreateRewardDialog } from "@/components/loyalty/CreateRewardDialog";
import { TransactionFiltersDialog, TransactionFilters } from "@/components/loyalty/TransactionFiltersDialog";
import { ManualAdjustmentDialog } from "@/components/loyalty/ManualAdjustmentDialog";
import { MemberDetailDialog } from "@/components/loyalty/MemberDetailDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'platinum':
      return 'bg-purple-100 text-purple-800';
    case 'gold':
      return 'bg-amber-100 text-amber-800';
    case 'silver':
      return 'bg-slate-100 text-slate-800';
    case 'bronze':
    default:
      return 'bg-stone-100 text-stone-800';
  }
};

const translateTierName = (tier: string) => {
  switch (tier) {
    case 'platinum':
      return 'Platina';
    case 'gold':
      return 'Ouro';
    case 'silver':
      return 'Prata';
    case 'bronze':
    default:
      return 'Bronze';
  }
};

const translateTransactionType = (type: string) => {
  switch (type) {
    case 'earn':
      return 'Pontos ganhos';
    case 'redeem':
      return 'Resgate';
    case 'expire':
      return 'Expiração';
    case 'adjustment':
      return 'Ajuste';
    case 'referral':
      return 'Indicação';
    default:
      return type;
  }
};

const getTransactionTypeStyle = (type: string) => {
  switch (type) {
    case 'earn':
    case 'adjustment':
    case 'referral':
      return 'text-green-600';
    case 'redeem':
    case 'expire':
      return 'text-red-600';
    default:
      return '';
  }
};

const formatPoints = (points: number) => {
  const prefix = points >= 0 ? '+' : '';
  return `${prefix}${points}`;
};

type SortField = 'name' | 'tier' | 'points' | 'enrollment' | 'activity';
type SortOrder = 'asc' | 'desc';

type SortConfig = {
  field: SortField;
  order: SortOrder;
};

const LoyaltyPage = () => {
  const [filterTier, setFilterTier] = useState<string | null>(null);
  const { translations } = useLanguage();
  const [potentialMembers, setPotentialMembers] = useState<any[]>([]);
  
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isCreateRewardDialogOpen, setIsCreateRewardDialogOpen] = useState(false);
  const [isTransactionFiltersDialogOpen, setIsTransactionFiltersDialogOpen] = useState(false);
  const [isManualAdjustmentDialogOpen, setIsManualAdjustmentDialogOpen] = useState(false);
  const [isMemberDetailDialogOpen, setIsMemberDetailDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'name', order: 'asc' });
  
  useEffect(() => {
    const memberCustomerIds = sampleLoyaltyMembers.map(member => member.customerId);
    const nonMemberCustomers = sampleCustomers.filter(customer => !memberCustomerIds.includes(customer.id));
    
    setPotentialMembers(nonMemberCustomers);
  }, []);
  
  const sortMembers = (members: any[]) => {
    return [...members].sort((a, b) => {
      let comparison = 0;
      
      switch (sortConfig.field) {
        case 'name':
          comparison = a.customerName.localeCompare(b.customerName);
          break;
        case 'tier':
          const tierOrder = { platinum: 3, gold: 2, silver: 1, bronze: 0 };
          comparison = (tierOrder[a.tier] || 0) - (tierOrder[b.tier] || 0);
          break;
        case 'points':
          comparison = a.currentPoints - b.currentPoints;
          break;
        case 'enrollment':
          comparison = a.enrollmentDate.getTime() - b.enrollmentDate.getTime();
          break;
        case 'activity':
          comparison = a.lastActivityDate.getTime() - b.lastActivityDate.getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortConfig.order === 'asc' ? comparison : -comparison;
    });
  };
  
  const handleSort = (field: SortField) => {
    setSortConfig(currentConfig => {
      if (currentConfig.field === field) {
        return { field, order: currentConfig.order === 'asc' ? 'desc' : 'asc' };
      } else {
        return { field, order: 'asc' };
      }
    });
  };
  
  const getSortIcon = (field: SortField) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.order === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />;
  };
  
  const handleViewMemberDetails = (member: any) => {
    setSelectedMember(member);
    setIsMemberDetailDialogOpen(true);
  };
  
  const filteredMembers = filterTier 
    ? sampleLoyaltyMembers.filter(member => member.tier === filterTier)
    : sampleLoyaltyMembers;
    
  const sortedMembers = sortMembers(filteredMembers);
  
  const filteredTransactions = samplePointTransactions.filter(transaction => {
    let matchesType = true;
    let matchesDateRange = true;
    
    if (transactionFilters.transactionType && transactionFilters.transactionType !== "all") {
      matchesType = transaction.transactionType === transactionFilters.transactionType;
    }
    
    if (transactionFilters.dateRange?.from) {
      const from = new Date(transactionFilters.dateRange.from);
      from.setHours(0, 0, 0, 0);
      matchesDateRange = transaction.createdAt >= from;
      
      if (transactionFilters.dateRange.to) {
        const to = new Date(transactionFilters.dateRange.to);
        to.setHours(23, 59, 59, 999);
        matchesDateRange = matchesDateRange && transaction.createdAt <= to;
      }
    }
    
    return matchesType && matchesDateRange;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.loyaltyAndPoints}</h2>
          <p className="text-muted-foreground">
            {translations.manageCustomerLoyalty}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Gift className="mr-2 h-4 w-4" /> Importar Recompensas
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" /> Configurar Programa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{translations.totalPointsIssued}</CardTitle>
            <CardDescription>Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loyaltyProgramStats.totalPointsIssued.toLocaleString()}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {loyaltyProgramStats.totalPointsRedeemed.toLocaleString()} pontos resgatados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{translations.activeMembers}</CardTitle>
            <CardDescription>Mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loyaltyProgramStats.activeMembers}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {loyaltyProgramStats.totalMembers.toLocaleString()} total cadastrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{translations.rewardsClaimed}</CardTitle>
            <CardDescription>Mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loyaltyProgramStats.rewardsClaimedThisMonth}</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>Mais popular: {loyaltyProgramStats.mostRedeemedReward.name}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{translations.memberTiers}</CardTitle>
            <CardDescription>Distribuição</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex gap-1 flex-col">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-purple-100 text-purple-800 mr-2`}>Platina</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.platinum}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.platinum / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-amber-100 text-amber-800 mr-2`}>Ouro</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.gold}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.gold / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-slate-100 text-slate-800 mr-2`}>Prata</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.silver}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.silver / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-stone-100 text-stone-800 mr-2`}>Bronze</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.bronze}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.bronze / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" /> Membros
          </TabsTrigger>
          <TabsTrigger value="rewards">
            <Award className="h-4 w-4 mr-2" /> Recompensas
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <CreditCard className="h-4 w-4 mr-2" /> Transações de Pontos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{translations.loyaltyProgramMembers}</CardTitle>
                <CardDescription>
                  Visualize e gerencie clientes inscritos no programa de fidelidade.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setFilterTier(null)}>
                  <Users className="h-4 w-4 mr-2" /> Todos os Níveis
                </Button>
                <Button variant="outline" size="sm" onClick={() => setFilterTier("platinum")}>
                  <Crown className="h-4 w-4 mr-2 text-purple-600" /> Platina
                </Button>
                <Button variant="outline" size="sm" onClick={() => setFilterTier("gold")}>
                  <Crown className="h-4 w-4 mr-2 text-amber-600" /> Ouro
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" /> Ordenar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {sortedMembers.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center">
                            Membro
                            {getSortIcon('name')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50" 
                          onClick={() => handleSort('tier')}
                        >
                          <div className="flex items-center">
                            Nível
                            {getSortIcon('tier')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="text-right cursor-pointer hover:bg-muted/50" 
                          onClick={() => handleSort('points')}
                        >
                          <div className="flex items-center justify-end">
                            Pontos
                            {getSortIcon('points')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSort('enrollment')}
                        >
                          <div className="flex items-center">
                            Inscrição
                            {getSortIcon('enrollment')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleSort('activity')}
                        >
                          <div className="flex items-center">
                            Última Atividade
                            {getSortIcon('activity')}
                          </div>
                        </TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedMembers.slice(0, 10).map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  {member.customerName.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.customerName}</p>
                                <p className="text-sm text-muted-foreground">{member.customerEmail}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getTierColor(member.tier)}>
                              {translateTierName(member.tier)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {member.currentPoints.toLocaleString()}
                            <p className="text-xs text-muted-foreground">
                              {member.pointsToNextTier > 0 ? 
                                `${member.pointsToNextTier} para próximo nível` : 
                                "Nível máximo atingido"}
                            </p>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {formatDistanceToNow(member.enrollmentDate, { addSuffix: true })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {formatDistanceToNow(member.lastActivityDate, { addSuffix: true })}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <span className="sr-only">Abrir menu</span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewMemberDetails(member)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar membro
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsManualAdjustmentDialogOpen(true)}>
                                  <PlusCircle className="h-4 w-4 mr-2" />
                                  Ajustar pontos
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Send className="h-4 w-4 mr-2" />
                                  Enviar mensagem
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-12 text-muted-foreground">
                  <p className="text-lg mb-2">Nenhum membro neste nível</p>
                  <p>Selecione outro nível ou visualize todos os membros.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-slate-50 p-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Mostrando {Math.min(10, sortedMembers.length)} de {sortedMembers.length} membros
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsInviteDialogOpen(true)}>
                  <UserPlus className="h-4 w-4 mr-2" /> Convidar Clientes
                </Button>
                <Button size="sm" onClick={() => setIsAddMemberDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Membro
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="rewards" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{translations.availableRewards}</CardTitle>
              <CardDescription>
                Crie e gerencie recompensas que os clientes podem resgatar com seus pontos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleLoyaltyRewards.filter(r => r.active).map(reward => (
                  <div key={reward.id} className="bg-white border rounded-lg overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      {reward.imageUrl ? (
                        <img src={reward.imageUrl} alt={reward.name} className="h-full w-full object-cover" />
                      ) : (
                        <Gift className="h-12 w-12 text-gray-300" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{reward.name}</h3>
                        <Badge>{reward.pointCost} pontos</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {reward.category === "discount" ? "desconto" : 
                           reward.category === "freebie" ? "brinde" :
                           reward.category === "exclusive" ? "exclusivo" : "experiência"}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {reward.redemptionCount} resgates
                        </p>
                      </div>
                      {reward.limitedTime && (
                        <div className="flex items-center mt-2 text-xs text-amber-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Oferta por tempo limitado
                          {reward.expiryDate && (
                            <span className="ml-1">
                              (Expira {formatDistanceToNow(reward.expiryDate, { addSuffix: true })})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div 
                  className="bg-white border rounded-lg overflow-hidden border-dashed cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={() => setIsCreateRewardDialogOpen(true)}
                >
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-center">Criar Nova Recompensa</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Desenhe uma nova recompensa para os membros do seu programa de fidelidade
                    </p>
                    <Button className="mt-4">
                      <Award className="h-4 w-4 mr-2" /> Criar Recompensa
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{translations.pointTransactions}</CardTitle>
                <CardDescription>
                  Acompanhe pontos ganhos e resgatados pelos clientes.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsTransactionFiltersDialogOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" /> Filtrar por Data
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setIsManualAdjustmentDialogOpen(true)}
                >
                  <div className="flex mr-2">
                    <PlusCircle className="h-4 w-4 text-green-500" />
                    <MinusCircle className="h-4 w-4 text-red-500 -ml-1" />
                  </div>
                  Ajuste Manual
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {(transactionFilters.dateRange || transactionFilters.transactionType) && (
                <div className="mb-4 p-2 rounded-md bg-muted/30 border flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filtros aplicados</span>
                    
                    {transactionFilters.dateRange?.from && (
                      <Badge variant="outline" className="ml-2">
                        {transactionFilters.dateRange.from.toLocaleDateString('pt-BR')} 
                        {transactionFilters.dateRange.to && ` - ${transactionFilters.dateRange.to.toLocaleDateString('pt-BR')}`}
                      </Badge>
                    )}
                    
                    {transactionFilters.transactionType && transactionFilters.transactionType !== "all" && (
                      <Badge variant="outline" className="ml-1">
                        {translateTransactionType(transactionFilters.transactionType)}
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setTransactionFilters({})}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Transação</TableHead>
                      <TableHead className="text-right">Pontos</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.slice(0, 10).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{transaction.customerName}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="capitalize">{translateTransactionType(transaction.transactionType)}</span>
                          </TableCell>
                          <TableCell className={`text-right font-medium ${getTransactionTypeStyle(transaction.transactionType)}`}>
                            {formatPoints(transaction.points)}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {formatDistanceToNow(transaction.createdAt, { addSuffix: true })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {transaction.description}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Nenhuma transação encontrada com os filtros aplicados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-slate-50 p-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {Math.min(10, filteredTransactions.length)} de {filteredTransactions.length} transações
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <InviteCustomersDialog 
        isOpen={isInviteDialogOpen} 
        onClose={() => setIsInviteDialogOpen(false)} 
        potentialMembers={potentialMembers}
      />
      
      <AddMemberDialog 
        isOpen={isAddMemberDialogOpen}
        onClose={() => setIsAddMemberDialogOpen(false)}
        potentialMembers={potentialMembers}
      />
      
      <CreateRewardDialog
        isOpen={isCreateRewardDialogOpen}
        onClose={() => setIsCreateRewardDialogOpen(false)}
      />
      
      <TransactionFiltersDialog
        isOpen={isTransactionFiltersDialogOpen}
        onClose={() => setIsTransactionFiltersDialogOpen(false)}
        onApplyFilters={setTransactionFilters}
      />
      
      <ManualAdjustmentDialog
        isOpen={isManualAdjustmentDialogOpen}
        onClose={() => setIsManualAdjustmentDialogOpen(false)}
        selectedMember={selectedMember}
      />
      
      <MemberDetailDialog
        isOpen={isMemberDetailDialogOpen}
        onClose={() => setIsMemberDetailDialogOpen(false)}
        member={selectedMember}
      />
    </div>
  );
};

export default LoyaltyPage;
