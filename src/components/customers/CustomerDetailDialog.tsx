
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Customer } from "./CustomerList";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, MessageSquare, User, Package, Tag, Phone, UserRound } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerDetailDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock purchase history
const generatePurchaseHistory = (customer: Customer) => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `ord-${1000 + i}`,
    date: new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)), // Each purchase is 1 week apart
    items: i === 0 
      ? "Penne alla Vodka, Garlic Bread" 
      : i === 1 
        ? "Margherita Pizza, Caesar Salad" 
        : i === 2 
          ? "Tiramisu, Espresso" 
          : i === 3 
            ? "Fettuccine Alfredo, Bruschetta" 
            : "Spaghetti Carbonara, Wine",
    amount: (customer.totalSpent / 5) * (1 - (i * 0.05))
  }));
};

// Mock campaign history
const generateCampaignHistory = (customer: Customer) => {
  return Array.from({ length: 3 }, (_, i) => ({
    id: `camp-${1000 + i}`,
    name: i === 0 
      ? "Summer Special" 
      : i === 1 
        ? "Weekend Promotion" 
        : "Loyalty Reward",
    date: new Date(Date.now() - (i * 15 * 24 * 60 * 60 * 1000)), // Each campaign is 15 days apart
    type: i === 0 ? "email" : i === 1 ? "sms" : "whatsapp",
    status: i === 0 ? "delivered" : i === 1 ? "opened" : "clicked"
  }));
};

const CustomerDetailDialog: React.FC<CustomerDetailDialogProps> = ({
  customer,
  isOpen,
  onClose,
}) => {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const [messageText, setMessageText] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  
  if (!customer) return null;
  
  const purchaseHistory = generatePurchaseHistory(customer);
  const campaignHistory = generateCampaignHistory(customer);
  
  const handleSendMessage = () => {
    if (!messageText) {
      toast({
        title: translations.error || "Erro",
        description: translations.pleaseEnterMessage || "Por favor, digite uma mensagem",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: translations.messageSent || "Mensagem enviada",
      description: `${translations.messageQueuedFor || "Sua mensagem foi enfileirada para ser enviada para"} ${customer.name}`,
    });
    setMessageText("");
  };
  
  const handleSendEmail = () => {
    if (!emailSubject || !emailBody) {
      toast({
        title: translations.error || "Erro",
        description: translations.pleaseEnterSubjectAndBody || "Por favor, preencha o assunto e o conteúdo",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: translations.emailSent || "Email enviado",
      description: `${translations.emailQueuedFor || "Seu email foi enfileirado para ser enviado para"} ${customer.name}`,
    });
    setEmailSubject("");
    setEmailBody("");
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-blue-100 text-blue-800">{translations.delivered || "Entregue"}</Badge>;
      case "opened":
        return <Badge className="bg-green-100 text-green-800">{translations.opened || "Aberto"}</Badge>;
      case "clicked":
        return <Badge className="bg-purple-100 text-purple-800">{translations.clicked || "Clicado"}</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "email":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Email</Badge>;
      case "sms":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">SMS</Badge>;
      case "whatsapp":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">WhatsApp</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <UserRound className="h-5 w-5" />
            {customer.name}
          </DialogTitle>
          <DialogDescription>
            {translations.customerSince || "Cliente desde"} {format(customer.joinDate, "dd/MM/yyyy")} • CPF: {customer.cpf}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{translations.totalOrders || "Total de Pedidos"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customer.orderCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{translations.totalSpent || "Total Gasto"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {customer.totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{translations.lastOrder || "Último Pedido"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{format(customer.lastOrderDate, "dd/MM")}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{translations.tags || "Etiquetas"}:</span>
          </div>
          {customer.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">{translations.overview || "Visão Geral"}</TabsTrigger>
            <TabsTrigger value="purchases">{translations.purchaseHistory || "Histórico de Compras"}</TabsTrigger>
            <TabsTrigger value="campaigns">{translations.campaignHistory || "Histórico de Campanhas"}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{translations.customerInformation || "Informações do Cliente"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium">Email:</span>
                    <span className="text-sm col-span-2">{customer.email}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium">{translations.phone || "Telefone"}:</span>
                    <span className="text-sm col-span-2">
                      {customer.phone ? customer.phone : (
                        <span className="text-amber-500 text-xs italic flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {translations.noPhoneNumber || "Sem número de telefone"}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium">CPF:</span>
                    <span className="text-sm col-span-2">{customer.cpf}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm font-medium">{translations.joinDate || "Data de Cadastro"}:</span>
                    <span className="text-sm col-span-2">{format(customer.joinDate, "dd/MM/yyyy")}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{translations.recentActivity || "Atividade Recente"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">{translations.lastOrder || "Último pedido"}: </span>
                    <span>{format(customer.lastOrderDate, "dd/MM/yyyy")}</span>
                  </div>
                  {purchaseHistory.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">{translations.recentPurchase || "Compra recente"}: </span>
                      <span>{purchaseHistory[0].items}</span>
                    </div>
                  )}
                  {campaignHistory.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium">{translations.lastCampaign || "Última campanha"}: </span>
                      <span>{campaignHistory[0].name} ({format(campaignHistory[0].date, "dd/MM")})</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{translations.sendMessage || "Enviar Mensagem"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {customer.phone ? (
                    <>
                      <Textarea 
                        placeholder={translations.enterYourMessage || "Digite sua mensagem"}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <Button 
                        className="w-full"
                        onClick={handleSendMessage}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" /> {translations.sendWhatsAppSms || "Enviar WhatsApp/SMS"}
                      </Button>
                    </>
                  ) : (
                    <div className="p-4 bg-muted rounded-md flex items-center justify-center flex-col text-center gap-2">
                      <Phone className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">{translations.noPhoneAvailable || "Nenhum número de telefone disponível"}</p>
                      <p className="text-xs text-muted-foreground">{translations.usePhoneEnrichment || "Use o enriquecimento de telefone para completar os dados deste cliente."}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{translations.sendEmail || "Enviar Email"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Input 
                    placeholder={translations.subject || "Assunto"}
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="mb-2"
                  />
                  <Textarea 
                    placeholder={translations.emailBody || "Conteúdo do email"}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button 
                    className="w-full"
                    onClick={handleSendEmail}
                  >
                    <Mail className="h-4 w-4 mr-2" /> {translations.sendEmail || "Enviar Email"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">{translations.orderId || "ID do Pedido"}</th>
                    <th className="px-4 py-2 text-left">{translations.date || "Data"}</th>
                    <th className="px-4 py-2 text-left">{translations.items || "Itens"}</th>
                    <th className="px-4 py-2 text-left">{translations.amount || "Valor"}</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((purchase) => (
                    <tr key={purchase.id} className="border-b">
                      <td className="px-4 py-2">{purchase.id}</td>
                      <td className="px-4 py-2">{format(purchase.date, "dd/MM/yyyy")}</td>
                      <td className="px-4 py-2">{purchase.items}</td>
                      <td className="px-4 py-2">R$ {purchase.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <div className="border rounded-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">{translations.campaign || "Campanha"}</th>
                    <th className="px-4 py-2 text-left">{translations.date || "Data"}</th>
                    <th className="px-4 py-2 text-left">{translations.type || "Tipo"}</th>
                    <th className="px-4 py-2 text-left">{translations.status || "Status"}</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignHistory.map((campaign) => (
                    <tr key={campaign.id} className="border-b">
                      <td className="px-4 py-2">{campaign.name}</td>
                      <td className="px-4 py-2">{format(campaign.date, "dd/MM/yyyy")}</td>
                      <td className="px-4 py-2">{getTypeBadge(campaign.type)}</td>
                      <td className="px-4 py-2">{getStatusBadge(campaign.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>{translations.close || "Fechar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
