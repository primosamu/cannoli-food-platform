
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CouponForm } from "@/components/coupons/CouponForm";
import { CouponFormValues } from "@/components/coupons/CouponSchema";

interface NewCouponDialogSectionProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onCreate: (data: CouponFormValues) => void;
  translations: any;
}

export const NewCouponDialogSection: React.FC<NewCouponDialogSectionProps> = ({
  open,
  onOpenChange,
  onCreate,
  translations
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{translations.createNewCouponInstead || "Create New Coupon"}</DialogTitle>
        <DialogDescription>
          {translations.fillOutCouponForm || "Fill out the form to create a new promotional coupon."}
        </DialogDescription>
      </DialogHeader>
      <CouponForm onSubmit={onCreate} />
    </DialogContent>
  </Dialog>
);
