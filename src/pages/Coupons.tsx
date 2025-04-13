
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import { CouponForm } from "@/components/coupons/CouponForm";
import { CouponTable } from "@/components/coupons/CouponTable";
import { EmptyScheduledCoupons } from "@/components/coupons/EmptyScheduledCoupons";
import { sampleCouponData, CouponFormValues } from "@/components/coupons/CouponSchema";
import { useLanguage } from "@/contexts/LanguageContext";

const CouponsPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { translations } = useLanguage();
  
  function handleCreateCoupon(data: CouponFormValues) {
    toast({
      title: "Cupom criado com sucesso",
      description: `Cupom ${data.name} (${data.code}) foi criado.`,
    });
    setIsDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{translations.couponManagement}</h2>
          <p className="text-muted-foreground">
            {translations.createAndManageCoupons}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> {translations.createNewCoupon}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{translations.createNewCoupon}</DialogTitle>
              <DialogDescription>
                {translations.fillOutCouponForm}
              </DialogDescription>
            </DialogHeader>
            <CouponForm onSubmit={handleCreateCoupon} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">{translations.activeCoupons}</TabsTrigger>
          <TabsTrigger value="inactive">{translations.inactiveCoupons}</TabsTrigger>
          <TabsTrigger value="scheduled">{translations.scheduledCoupons}</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{translations.activeCoupons}</CardTitle>
              <CardDescription>
                Cupons atualmente ativos que os clientes podem usar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CouponTable 
                data={sampleCouponData} 
                filter="active"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{translations.inactiveCoupons}</CardTitle>
              <CardDescription>
                Cupons que estão atualmente desativados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CouponTable 
                data={sampleCouponData} 
                filter="inactive"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{translations.scheduledCoupons}</CardTitle>
              <CardDescription>
                Cupons agendados para ativação futura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmptyScheduledCoupons onCreateClick={() => setIsDialogOpen(true)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CouponsPage;
