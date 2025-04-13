import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BuyCreditsModal } from "@/components/billing/BuyCreditsModal";
import { CreditType } from "@/components/billing/credits/types";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Users,
  CreditCard,
  Save,
  Plus,
  Trash2,
  Pencil,
  Store,
  BarChart,
  Calendar,
  Settings,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  CircleDollarSign,
  Receipt,
  CreditCard as CreditCardIcon,
  PlusCircle
} from "lucide-react";
import { StoreSelector, Store as StoreType } from "@/components/dashboard/StoreSelector"; 
import { useLanguage } from "@/contexts/LanguageContext";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  stores: string[];
}

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  active: boolean;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const { translations } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'admin', 
      stores: ['store-1', 'store-2'] 
    }
  ]);
  
  const [stores, setStores] = useState<StoreLocation[]>([
    {
      id: 'store-1',
      name: 'Downtown Location',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      active: true
    },
    {
      id: 'store-2',
      name: 'Uptown Location',
      address: '456 High St, Uptown',
      phone: '(555) 987-6543',
      active: true
    }
  ]);
  
  const [newTeamMember, setNewTeamMember] = useState<{
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'staff';
    stores: string[];
  }>({
    name: '',
    email: '',
    role: 'staff',
    stores: []
  });

  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    phone: '',
    active: true
  });

  const [accountDetails, setAccountDetails] = useState({
    name: 'Admin User',
    email: 'admin@cannoli.tech'
  });

  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false);
  const [buyCreditsModalOpen, setBuyCreditsModalOpen] = useState(false);
  const [creditType, setCreditType] = useState<CreditType>('phone');
  
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const storeOptions: StoreType[] = stores.map((store) => ({
    id: store.id,
    name: store.name
  }));

  const handleSaveAccountDetails = () => {
    toast({
      title: "Account Updated",
      description: "Your account details have been saved successfully."
    });
  };

  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.email) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedMembers = [
      ...teamMembers,
      {
        id: `member-${Date.now()}`,
        ...newTeamMember
      }
    ];

    setTeamMembers(updatedMembers);
    setNewTeamMember({
      name: '',
      email: '',
      role: 'staff',
      stores: []
    });

    setIsTeamDialogOpen(false);
    
    toast({
      title: "Team Member Added",
      description: `${newTeamMember.name} has been added to your team.`
    });
  };

  const handleAddStore = () => {
    if (!newStore.name || !newStore.address || !newStore.phone) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedStores = [
      ...stores,
      {
        id: `store-${Date.now()}`,
        ...newStore
      }
    ];

    setStores(updatedStores);
    setNewStore({
      name: '',
      address: '',
      phone: '',
      active: true
    });

    setIsStoreDialogOpen(false);
    
    toast({
      title: "Store Added",
      description: `${newStore.name} has been added to your locations.`
    });
  };

  const handleRemoveTeamMember = (id: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedMembers);
    
    toast({
      title: "Team Member Removed",
      description: "The team member has been removed."
    });
  };

  const handleRemoveStore = (id: string) => {
    const updatedStores = stores.filter(store => store.id !== id);
    setStores(updatedStores);
    
    toast({
      title: "Store Removed",
      description: "The store location has been removed."
    });
  };

  const handleSelectAllStores = () => {
    if (newTeamMember.stores.length === stores.length) {
      setNewTeamMember({
        ...newTeamMember,
        stores: []
      });
    } else {
      setNewTeamMember({
        ...newTeamMember,
        stores: stores.map(store => store.id)
      });
    }
  };

  const handleBuyCredits = (type: CreditType) => {
    setCreditType(type);
    setBuyCreditsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.settingsManagement}</h2>
          <p className="text-muted-foreground">
            {translations.manageAccount}
          </p>
        </div>
        
        <div className="flex items-center">
          <StoreSelector
            stores={storeOptions}
            selectedStores={selectedStores}
            onStoreChange={setSelectedStores}
          />
        </div>
      </div>

      <Tabs defaultValue="account">
        <div className="flex">
          <div className="w-1/4 pr-4">
            <TabsList className="flex flex-col h-full space-y-1 w-full bg-transparent p-0">
              <TabsTrigger value="account" className="justify-start px-3">
                <User className="h-4 w-4 mr-2" /> Conta
              </TabsTrigger>
              <TabsTrigger value="stores" className="justify-start px-3">
                <Store className="h-4 w-4 mr-2" /> Lojas
              </TabsTrigger>
              <TabsTrigger value="team" className="justify-start px-3">
                <Users className="h-4 w-4 mr-2" /> Equipe
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start px-3">
                <CreditCard className="h-4 w-4 mr-2" /> Faturamento
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start px-3">
                <Bell className="h-4 w-4 mr-2" /> Notificações
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start px-3">
                <Shield className="h-4 w-4 mr-2" /> Segurança
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="w-3/4">
            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Conta</CardTitle>
                  <CardDescription>
                    Gerencie suas informações de conta e preferências.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input 
                      id="name" 
                      value={accountDetails.name} 
                      onChange={(e) => setAccountDetails({...accountDetails, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={accountDetails.email} 
                      onChange={(e) => setAccountDetails({...accountDetails, email: e.target.value})} 
                    />
                  </div>
                  
                  <Button className="mt-4" onClick={handleSaveAccountDetails}>
                    <Save className="h-4 w-4 mr-2" /> Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stores" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Suas Lojas</h3>
                <Dialog open={isStoreDialogOpen} onOpenChange={setIsStoreDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Adicionar Loja
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Nova Loja</DialogTitle>
                      <DialogDescription>
                        Adicione uma nova loja para gerenciar em sua conta.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="store-name">Nome da Loja</Label>
                        <Input
                          id="store-name"
                          placeholder="Loja Centro"
                          value={newStore.name}
                          onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="store-address">Endereço</Label>
                        <Input
                          id="store-address"
                          placeholder="Rua Principal, 123"
                          value={newStore.address}
                          onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="store-phone">Telefone</Label>
                        <Input
                          id="store-phone"
                          placeholder="(11) 99999-9999"
                          value={newStore.phone}
                          onChange={(e) => setNewStore({...newStore, phone: e.target.value})}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="store-active"
                          checked={newStore.active}
                          onCheckedChange={(checked) => setNewStore({...newStore, active: checked})}
                        />
                        <Label htmlFor="store-active">Ativo</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsStoreDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddStore}>
                        Adicionar Loja
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {stores.length > 0 ? (
                <div className="space-y-4">
                  {stores.map((store) => (
                    <Card key={store.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <h4 className="font-medium text-lg">{store.name}</h4>
                              {store.active ? (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Ativo
                                </span>
                              ) : (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Inativo
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="h-4 w-4 mr-2" />
                              {store.address}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-4 w-4 mr-2" />
                              {store.phone}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Pencil className="h-4 w-4 mr-2" /> Editar
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRemoveStore(store.id)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Remover
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Store className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Nenhuma loja localizada adicionada ainda</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="team" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Membros da Equipe</h3>
                <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Adicionar Membro
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Membro à Equipe</DialogTitle>
                      <DialogDescription>
                        Adicione um novo membro à sua equipe de gerenciamento.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={newTeamMember.name}
                          onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="johndoe@example.com"
                          value={newTeamMember.email}
                          onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                          value={newTeamMember.role}
                          onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value as 'admin' | 'manager' | 'staff'})}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="staff">Staff</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex justify-between items-center">
                          <Label>Accessible Stores</Label>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleSelectAllStores}
                            className="mb-2"
                          >
                            {newTeamMember.stores.length === stores.length ? "Deselect All" : "Select All"}
                          </Button>
                        </div>
                        <div className="max-h-40 overflow-y-auto border rounded-md p-2 space-y-2">
                          {stores.map((store) => (
                            <div key={store.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`store-${store.id}`}
                                checked={newTeamMember.stores.includes(store.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setNewTeamMember({
                                      ...newTeamMember,
                                      stores: [...newTeamMember.stores, store.id]
                                    });
                                  } else {
                                    setNewTeamMember({
                                      ...newTeamMember,
                                      stores: newTeamMember.stores.filter(id => id !== store.id)
                                    });
                                  }
                                }}
                              />
                              <Label 
                                htmlFor={`store-${store.id}`}
                                className="text-sm cursor-pointer"
                              >
                                {store.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsTeamDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddTeamMember}>
                        Adicionar Membro
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {teamMembers.length > 0 ? (
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <h4 className="font-medium">{member.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="h-4 w-4 mr-2" />
                              {member.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="capitalize px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                                {member.role}
                              </span>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {member.stores.length > 0
                                  ? `${member.stores.length} ${member.stores.length === 1 ? 'store' : 'stores'}`
                                  : 'Nenhuma loja atribuída'}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Pencil className="h-4 w-4 mr-2" /> Editar
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRemoveTeamMember(member.id)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Remover
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center p-6">
                    <Users className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Nenhum membro da equipe adicionado ainda.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Plano de Assinatura</CardTitle>
                  <CardDescription>
                    Seu plano atual e detalhes de faturamento.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border p-4 rounded-lg bg-primary/5">
                      <div className="space-y-1">
                        <h4 className="font-medium">Plano Pro</h4>
                        <p className="text-sm text-muted-foreground">R$49,99/mês</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Ativo
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Próxima cobrança</span>
                        <span className="font-medium">15 de Maio, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Método de pagamento</span>
                        <span className="font-medium flex items-center">
                          <CreditCardIcon className="h-3 w-3 mr-1" /> •••• 4242
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Email de faturamento</span>
                        <span className="font-medium">faturamento@suaempresa.com</span>
                      </div>
                    </div>

                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Recursos do Plano</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Gerenciamento de múltiplas lojas</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Membros da equipe ilimitados</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Análises e relatórios avançados</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Acesso à API</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Suporte premium</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button>
                        <CircleDollarSign className="h-4 w-4 mr-2" /> Gerenciar Assinatura
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <CreditCardIcon className="h-4 w-4 mr-2" /> Atualizar Método de Pagamento
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Receipt className="h-4 w-4 mr-2" /> Ver Faturas
                        </Button>
                      </div>
                      
                      <Button onClick={() => setBuyCreditsModalOpen(true)} className="mt-2">
                        <PlusCircle className="h-4 w-4 mr-2" /> Comprar Créditos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Notificação</CardTitle>
                  <CardDescription>
                    Configure como você recebe notificações.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificações por Email</p>
                      <p className="text-sm text-muted-foreground">Receba notificações via email</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificações Push</p>
                      <p className="text-sm text-muted-foreground">Receba notificações push no seu dispositivo</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Atualizações de Marketing</p>
                      <p className="text-sm text-muted-foreground">Receba atualizações sobre novos recursos</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alertas de Pedidos</p>
                      <p className="text-sm text-muted-foreground">Seja notificado sobre novos pedidos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Button className="mt-4">
                    <Save className="h-4 w-4 mr-2" /> Salvar Alterações
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Segurança</CardTitle>
                  <CardDescription>
                    Atualize sua senha e preferências de segurança.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Ative a autenticação de dois fatores para segurança aprimorada</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Button className="mt-4">
                    <Lock className="h-4 w-4 mr-2" /> Atualizar Senha
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      <BuyCreditsModal
        open={buyCreditsModalOpen}
        onClose={() => setBuyCreditsModalOpen(false)}
        onPurchase={(packageId, quantity) => {
          toast({
            title: "Compra Realizada",
            description: `Você comprou ${quantity} pacote(s) de créditos.`,
          });
          setBuyCreditsModalOpen(false);
        }}
        creditType={creditType}
      />
    </div>
  );
};

export default SettingsPage;
