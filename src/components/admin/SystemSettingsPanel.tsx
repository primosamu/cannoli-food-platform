
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle, Download, RefreshCcw, Save, Settings, UserCog, Users } from "lucide-react";

export const SystemSettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("general");
  
  // Configurações gerais do sistema (simulado)
  const [generalSettings, setGeneralSettings] = useState({
    businessName: "Cannoli Food Tech",
    phoneNumber: "+55 (11) 99999-9999",
    email: "contato@cannoli.tech",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    language: "pt-BR",
    timezone: "America/Sao_Paulo"
  });
  
  // Configurações de notificações (simulado)
  const [notificationSettings, setNotificationSettings] = useState({
    sendOrderNotifications: true,
    sendPaymentNotifications: true,
    sendLoyaltyNotifications: true,
    sendMarketingEmails: false,
    adminNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });
  
  // Configurações do programa de fidelidade (simulado)
  const [loyaltySettings, setLoyaltySettings] = useState({
    pointsPerPurchase: "10",
    minimumPointsRedemption: "100",
    welcomeBonus: "50",
    birthdayBonus: "100",
    autoEnrollment: false,
    expirationDays: "180"
  });
  
  // Configurações de usuários (simulado)
  const adminUsers = [
    { id: 1, name: "Admin Principal", email: "admin@cannoli.tech", role: "super_admin", lastActive: "Hoje" },
    { id: 2, name: "Gerente Comercial", email: "gerente@cannoli.tech", role: "admin", lastActive: "Ontem" },
    { id: 3, name: "Suporte Técnico", email: "suporte@cannoli.tech", role: "support", lastActive: "3 dias atrás" },
  ];
  
  // Handler para salvar as configurações gerais
  const handleSaveGeneralSettings = () => {
    toast.success("Configurações gerais salvas com sucesso");
  };
  
  // Handler para salvar as configurações de notificações
  const handleSaveNotificationSettings = () => {
    toast.success("Configurações de notificações salvas com sucesso");
  };
  
  // Handler para salvar as configurações de fidelidade
  const handleSaveLoyaltySettings = () => {
    toast.success("Configurações do programa de fidelidade salvas com sucesso");
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="loyalty">Programa de Fidelidade</TabsTrigger>
          <TabsTrigger value="users">Usuários Admin</TabsTrigger>
        </TabsList>
        
        {/* Configurações Gerais */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas do seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nome do Negócio</Label>
                  <Input
                    id="businessName"
                    value={generalSettings.businessName}
                    onChange={(e) => setGeneralSettings({...generalSettings, businessName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Telefone de Contato</Label>
                  <Input
                    id="phoneNumber"
                    value={generalSettings.phoneNumber}
                    onChange={(e) => setGeneralSettings({...generalSettings, phoneNumber: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email de Contato</Label>
                <Input
                  id="email"
                  value={generalSettings.email}
                  onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma Padrão</Label>
                  <Select
                    value={generalSettings.language}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, language: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um fuso horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">Brasília (UTC-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Redefinir</Button>
              <Button onClick={handleSaveGeneralSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Manutenção do Sistema</CardTitle>
              <CardDescription>
                Ferramentas para gerenciamento e manutenção do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Backup do Sistema</h4>
                  <p className="text-sm text-muted-foreground">
                    Faça download de um backup completo dos dados do sistema
                  </p>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Backup
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Limpar Cache</h4>
                  <p className="text-sm text-muted-foreground">
                    Limpe o cache do sistema para resolver problemas de desempenho
                  </p>
                </div>
                <Button variant="outline">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Limpar
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Logs do Sistema</h4>
                  <p className="text-sm text-muted-foreground">
                    Visualize logs de atividade e erros do sistema
                  </p>
                </div>
                <Button variant="outline">Visualizar Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Notificações */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Configure como e quando as notificações são enviadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="font-semibold text-lg">Notificações de Eventos</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Pedidos</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar sobre novos pedidos e alterações de status
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.sendOrderNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, sendOrderNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Pagamentos</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar sobre pagamentos recebidos e falhas
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.sendPaymentNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, sendPaymentNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Fidelidade</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar sobre atividades no programa de fidelidade
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.sendLoyaltyNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, sendLoyaltyNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir o envio de emails de marketing e promoções
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.sendMarketingEmails}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, sendMarketingEmails: checked})
                    }
                  />
                </div>
              </div>
              
              <Separator />
              
              <h3 className="font-semibold text-lg">Canais de Notificação</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Administrador</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações no painel administrativo
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.adminNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, adminNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações por email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailNotifications: checked})
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações por SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, smsNotifications: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Redefinir</Button>
              <Button onClick={handleSaveNotificationSettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Configurações do Programa de Fidelidade */}
        <TabsContent value="loyalty" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Programa de Fidelidade</CardTitle>
              <CardDescription>
                Personalize as regras e recompensas do seu programa de fidelidade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pointsPerPurchase">Pontos por Real Gasto</Label>
                  <Input
                    id="pointsPerPurchase"
                    value={loyaltySettings.pointsPerPurchase}
                    onChange={(e) => setLoyaltySettings({...loyaltySettings, pointsPerPurchase: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minimumPointsRedemption">Pontos Mínimos para Resgate</Label>
                  <Input
                    id="minimumPointsRedemption"
                    value={loyaltySettings.minimumPointsRedemption}
                    onChange={(e) => setLoyaltySettings({...loyaltySettings, minimumPointsRedemption: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="welcomeBonus">Bônus de Boas-vindas</Label>
                  <Input
                    id="welcomeBonus"
                    value={loyaltySettings.welcomeBonus}
                    onChange={(e) => setLoyaltySettings({...loyaltySettings, welcomeBonus: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthdayBonus">Bônus de Aniversário</Label>
                  <Input
                    id="birthdayBonus"
                    value={loyaltySettings.birthdayBonus}
                    onChange={(e) => setLoyaltySettings({...loyaltySettings, birthdayBonus: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expirationDays">Dias para Expiração de Pontos</Label>
                <Input
                  id="expirationDays"
                  value={loyaltySettings.expirationDays}
                  onChange={(e) => setLoyaltySettings({...loyaltySettings, expirationDays: e.target.value})}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Defina como 0 para pontos sem validade
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label>Inscrição Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Inscrever automaticamente novos clientes no programa de fidelidade
                  </p>
                </div>
                <Switch
                  checked={loyaltySettings.autoEnrollment}
                  onCheckedChange={(checked) => 
                    setLoyaltySettings({...loyaltySettings, autoEnrollment: checked})
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Redefinir</Button>
              <Button onClick={handleSaveLoyaltySettings}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Gerenciamento de Usuários Admin */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <CardTitle>Usuários Administrativos</CardTitle>
                  <CardDescription>
                    Gerenciar usuários com acesso administrativo
                  </CardDescription>
                </div>
                <Button>
                  <UserCog className="mr-2 h-4 w-4" />
                  Adicionar Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adminUsers.map(user => (
                  <div 
                    key={user.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
                  >
                    <div className="space-y-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                          {user.role === 'super_admin' ? 'Super Admin' : 
                           user.role === 'admin' ? 'Administrador' : 'Suporte'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Ativo: {user.lastActive}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm" className="text-red-600">Remover</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-sm text-muted-foreground flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Os usuários listados aqui têm acesso ao painel administrativo.
                Gerencie as permissões com cuidado.
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
