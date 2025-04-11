
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, ShoppingCart, CreditCard, Share2, Check, X } from "lucide-react";

const IntegrationsPage = () => {
  // Sample integration data
  const integrations = [
    {
      name: "Payment Processor",
      description: "Connect your payment processor to handle transactions.",
      icon: <CreditCard className="h-12 w-12 text-gray-400" />,
      status: "not-connected"
    },
    {
      name: "Online Ordering Platform",
      description: "Integrate with online food ordering platforms.",
      icon: <ShoppingCart className="h-12 w-12 text-gray-400" />,
      status: "not-connected"
    },
    {
      name: "Social Media",
      description: "Connect your social media accounts for automated posts.",
      icon: <Share2 className="h-12 w-12 text-gray-400" />,
      status: "not-connected"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
          <p className="text-muted-foreground">
            Connect your restaurant system with other platforms and services.
          </p>
        </div>
        <Button>
          <Link2 className="mr-2 h-4 w-4" /> Connect New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.name} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle>{integration.name}</CardTitle>
                {integration.status === "connected" ? (
                  <div className="flex items-center text-sm text-green-600">
                    <Check className="h-4 w-4 mr-1" /> Connected
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-gray-500">
                    <X className="h-4 w-4 mr-1" /> Not Connected
                  </div>
                )}
              </div>
              <CardDescription>{integration.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-4 space-y-4">
                {integration.icon}
                <Button variant={integration.status === "connected" ? "outline" : "default"}>
                  {integration.status === "connected" ? "Manage" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Integrations</CardTitle>
          <CardDescription>
            Discover more services that you can connect with your restaurant system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 text-muted-foreground">
            <p>Looking for more integrations?</p>
            <p className="mt-2">Check our marketplace for additional services and tools.</p>
            <Button className="mt-4" variant="outline">
              <Link2 className="mr-2 h-4 w-4" /> Browse Integration Marketplace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsPage;
