
import React from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyScheduledCouponsProps {
  onCreateClick: () => void;
}

export const EmptyScheduledCoupons: React.FC<EmptyScheduledCouponsProps> = ({ 
  onCreateClick 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-muted-foreground">No scheduled coupons found.</p>
      <Button className="mt-4" onClick={onCreateClick}>
        <PlusCircle className="mr-2 h-4 w-4" /> Schedule New Coupon
      </Button>
    </div>
  );
};
