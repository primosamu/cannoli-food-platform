
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LoyaltyMember, getTransactionsByCustomer } from "@/data/sampleLoyaltyData";
import { formatDistanceToNow } from "date-fns";
import { CreditCard, Award, Calendar, Crown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MemberDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  member: LoyaltyMember | null;
}

export const MemberDetailDialog = ({ isOpen, onClose, member }: MemberDetailDialogProps) => {
  if (!member) return null;

  const transactions = getTransactionsByCustomer(member.customerId);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalhes do Membro</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="p-4 border rounded-md">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold">{member.customerName.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-bold">{member.customerName}</h3>
                  <p className="text-sm text-muted-foreground">{member.customerEmail}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Nível:</span>
                  <Badge variant="outline" className={getTierColor(member.tier)}>
                    {translateTierName(member.tier)}
                  </Badge>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Pontos atuais:</span>
                  <span className="font-bold">{member.currentPoints}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Total de pontos:</span>
                  <span>{member.totalEarnedPoints}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Pontos resgatados:</span>
                  <span>{member.totalRedeemedPoints}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Data de inscrição:</span>
                  <span>{formatDistanceToNow(member.enrollmentDate, { addSuffix: true })}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Última atividade:</span>
                  <span>{formatDistanceToNow(member.lastActivityDate, { addSuffix: true })}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Validade dos pontos:</span>
                  <span>{formatDistanceToNow(member.pointExpiryDate, { addSuffix: true })}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Indicações:</span>
                  <span>{member.referralCount}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="transactions">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transactions">
                  <CreditCard className="h-4 w-4 mr-2" /> Transações
                </TabsTrigger>
                <TabsTrigger value="rewards">
                  <Award className="h-4 w-4 mr-2" /> Recompensas
                </TabsTrigger>
                <TabsTrigger value="history">
                  <Calendar className="h-4 w-4 mr-2" /> Histórico
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="pt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transação</TableHead>
                        <TableHead className="text-right">Pontos</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Descrição</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                          <TableRow key={transaction.id}>
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
                          <TableCell colSpan={4} className="h-24 text-center">
                            Nenhuma transação encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="rewards" className="pt-4">
                <div className="text-center p-6">
                  <Crown className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg">Recompensas resgatadas</h3>
                  <p className="text-muted-foreground mb-4">
                    Este membro ainda não resgatou nenhuma recompensa.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="pt-4">
                <div className="text-center p-6">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg">Histórico de atividades</h3>
                  <p className="text-muted-foreground mb-4">
                    O histórico detalhado de atividades estará disponível em breve.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={onClose}>
            Ajustar pontos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
