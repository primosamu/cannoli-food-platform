
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

const CouponsPage = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  function handleCreateCoupon(data: CouponFormValues) {
    toast({
      title: "Coupon created successfully",
      description: `Coupon ${data.name} (${data.code}) has been created.`,
    });
    setIsDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupon Management</h2>
          <p className="text-muted-foreground">
            Create and manage discount coupons for your customers.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>
                Fill out the form to create a new promotional coupon.
              </DialogDescription>
            </DialogHeader>
            <CouponForm onSubmit={handleCreateCoupon} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Coupons</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Coupons</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Coupons</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Coupons</CardTitle>
              <CardDescription>
                Currently active coupons that customers can use.
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
              <CardTitle>Inactive Coupons</CardTitle>
              <CardDescription>
                Coupons that are currently disabled.
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
              <CardTitle>Scheduled Coupons</CardTitle>
              <CardDescription>
                Coupons scheduled for future activation.
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
