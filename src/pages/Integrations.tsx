import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Link2, 
  ShoppingCart, 
  CreditCard, 
  Share2, 
  Check, 
  X, 
  Tag, 
  AlertCircle,
  Facebook,
  Instagram,
  Target,
  BarChart3,
  Globe,
  Store,
  MessageSquare,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Smartphone
} from "lucide-react";

// Integration type definition
type IntegrationType = 
  | "payment" 
  | "marketplace" 
  | "social" 
  | "analytics" 
  | "tag_manager" 
  | "meta_ads"
  | "messaging";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "not-connected";
  type: IntegrationType;
}

const IntegrationsPage = () => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "payment-stripe",
      name: "Stripe",
      description: "Process online payments securely.",
      icon: <CreditCard className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "payment"
    },
    {
      id: "marketplace-ifood",
      name: "iFood",
      description: "Connect to Brazil's largest food delivery platform.",
      icon: <ShoppingCart className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "marketplace"
    },
    {
      id: "marketplace-rappi",
      name: "Rappi",
      description: "Integrate with Rappi delivery service.",
      icon: <ShoppingCart className="h-12 w-12 text-gray-400" />,
      status: "connected",
      type: "marketplace"
    },
    {
      id: "social-instagram",
      name: "Instagram",
      description: "Share updates directly to your Instagram account.",
      icon: <Instagram className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "social"
    },
    {
      id: "social-facebook",
      name: "Facebook",
      description: "Post directly to your Facebook page.",
      icon: <Facebook className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "social"
    },
    {
      id: "meta-ads",
      name: "Meta Ads",
      description: "Create and manage Facebook & Instagram ad campaigns.",
      icon: <Target className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "meta_ads"
    },
    {
      id: "tag-manager",
      name: "Google Tag Manager",
      description: "Manage all your marketing tags without code edits.",
      icon: <Tag className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "tag_manager"
    },
    {
      id: "analytics-ga4",
      name: "Google Analytics 4",
      description: "Track and analyze website traffic and conversions.",
      icon: <BarChart3 className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "analytics"
    },
    {
      id: "messaging-zenvia-sms",
      name: "Zenvia SMS",
      description: "Envie SMS para seus clientes usando a plataforma Zenvia.",
      icon: <MessageSquare className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "messaging"
    },
    {
      id: "messaging-zenvia-rcs",
      name: "Zenvia RCS",
      description: "Envie mensagens RCS ricas para seus clientes usando a Zenvia.",
      icon: <MessageCircle className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "messaging"
    },
    {
      id: "messaging-zenvia-whatsapp",
      name: "Zenvia WhatsApp (API Oficial)",
      description: "Envie mensagens WhatsApp usando a API oficial do WhatsApp com Zenvia.",
      icon: <Send className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "messaging"
    },
    {
      id: "messaging-evolution-api",
      name: "Evolution API (WhatsApp)",
      description: "Alternativa para envio de mensagens WhatsApp com Evolution API.",
      icon: <Smartphone className="h-12 w-12 text-gray-400" />,
      status: "not-connected",
      type: "messaging"
    },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [integrationKey, setIntegrationKey] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getIntegrationsByType = (type: IntegrationType) => {
    return integrations.filter(integration => integration.type === type);
  };

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIntegrationKey("");
    setIsDialogOpen(true);
  };

  const handleSubmitConnection = () => {
    if (!selectedIntegration || !integrationKey.trim()) {
      toast({
        title: "Error",
        description: "Please provide a valid API key",
        variant: "destructive",
      });
      return;
    }

    setIntegrations(integrations.map(i => 
      i.id === selectedIntegration.id 
        ? { ...i, status: "connected" } 
        : i
    ));

    toast({
      title: "Success",
      description: `${selectedIntegration.name} has been connected successfully!`,
    });
    
    setIsDialogOpen(false);
  };

  const handleAddNewService = () => {
    toast({
      title: "Coming Soon",
      description: "Our integration marketplace is under development. More services will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrações</h2>
          <p className="text-muted-foreground">
            Conecte seu sistema de restaurante com outras plataformas e serviços.
          </p>
        </div>
        <Button onClick={handleAddNewService}>
          <Link2 className="mr-2 h-4 w-4" /> Conectar Novo Serviço
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Plataformas de Mensagens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getIntegrationsByType("messaging").map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConnect={() => handleConnect(integration)} 
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Processors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getIntegrationsByType("payment").map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConnect={() => handleConnect(integration)} 
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Delivery Marketplaces</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getIntegrationsByType("marketplace").map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConnect={() => handleConnect(integration)} 
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Social Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getIntegrationsByType("social").map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConnect={() => handleConnect(integration)} 
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Marketing Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...getIntegrationsByType("meta_ads"), ...getIntegrationsByType("tag_manager")].map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConnect={() => handleConnect(integration)} 
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getIntegrationsByType("analytics").map((integration) => (
            <IntegrationCard 
              key={integration.id} 
              integration={integration} 
              onConnect={() => handleConnect(integration)} 
            />
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Looking for More?</CardTitle>
          <CardDescription>
            Discover additional services that you can connect with your restaurant system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 text-muted-foreground">
            <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <p>Need to connect with other services?</p>
            <p className="mt-2">Check our marketplace for additional integrations or request a new one.</p>
            <Button className="mt-4" variant="outline" onClick={handleAddNewService}>
              <Link2 className="mr-2 h-4 w-4" /> Browse Integration Marketplace
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conectar a {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              {selectedIntegration?.id.includes('zenvia') ? 
                "Insira suas credenciais da Zenvia para conectar." : 
                selectedIntegration?.id.includes('evolution') ? 
                "Insira a URL da API e o token para conectar à Evolution API." :
                "Insira sua chave de API para conectar com " + selectedIntegration?.name + "."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedIntegration?.id.includes('zenvia') && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="account-id">Zenvia Account ID</Label>
                  <Input
                    id="account-id"
                    placeholder="Insira o ID da sua conta Zenvia"
                    value={integrationKey}
                    onChange={(e) => setIntegrationKey(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-token">Zenvia API Token</Label>
                  <Input
                    id="api-token"
                    type="password"
                    placeholder="Insira seu token da API Zenvia"
                    value={integrationKey}
                    onChange={(e) => setIntegrationKey(e.target.value)}
                  />
                </div>
              </>
            )}
            
            {selectedIntegration?.id.includes('evolution') && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="api-url">URL da Evolution API</Label>
                  <Input
                    id="api-url"
                    placeholder="https://sua-instancia.evolution-api.com"
                    value={integrationKey}
                    onChange={(e) => setIntegrationKey(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-token">Token de Autenticação</Label>
                  <Input
                    id="api-token"
                    type="password"
                    placeholder="Insira seu token da Evolution API"
                    value={integrationKey}
                    onChange={(e) => setIntegrationKey(e.target.value)}
                  />
                </div>
              </>
            )}
            
            {!selectedIntegration?.id.includes('zenvia') && !selectedIntegration?.id.includes('evolution') && (
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave de API</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Insira sua chave de API"
                  value={integrationKey}
                  onChange={(e) => setIntegrationKey(e.target.value)}
                />
              </div>
            )}
            
            <div className="flex items-center space-x-2 text-sm">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span>Suas credenciais são armazenadas com segurança e nunca compartilhadas.</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmitConnection}>Conectar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface IntegrationCardProps {
  integration: Integration;
  onConnect: () => void;
}

const IntegrationCard = ({ integration, onConnect }: IntegrationCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle>{integration.name}</CardTitle>
          {integration.status === "connected" ? (
            <div className="flex items-center text-sm text-green-600">
              <Check className="h-4 w-4 mr-1" /> Conectado
            </div>
          ) : (
            <div className="flex items-center text-sm text-gray-500">
              <X className="h-4 w-4 mr-1" /> Não Conectado
            </div>
          )}
        </div>
        <CardDescription>{integration.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center py-4 space-y-4">
          {integration.icon}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant={integration.status === "connected" ? "outline" : "default"}
          onClick={onConnect}
        >
          {integration.status === "connected" ? "Gerenciar" : "Conectar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationsPage;
