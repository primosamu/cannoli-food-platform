
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface IncentiveSettingsProps {
  incentiveType: string;
  setIncentiveType: (v: string) => void;
  setNewCouponDialogOpen: (v: boolean) => void;
  template: any;
  translations: any;
}

const IncentiveSettings: React.FC<IncentiveSettingsProps> = ({
  incentiveType,
  setIncentiveType,
  setNewCouponDialogOpen,
  template,
  translations
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">Incentivos & Ofertas</CardTitle>
      <CardDescription>
        {translations.addIncentives || "Add promotional incentives to your campaign"}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <RadioGroup
        value={incentiveType}
        onValueChange={setIncentiveType}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="no-incentive" />
          <Label htmlFor="no-incentive">{translations.noIncentive || "No incentive"}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="coupon" id="coupon" />
          <Label htmlFor="coupon">{translations.addCoupon || "Add coupon"}</Label>
        </div>
        {incentiveType === "coupon" && (
          <div className="pl-6 space-y-3">
            <Select defaultValue={template?.category === 'customer-recovery' ? "welcome-back-10" : undefined}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={translations.selectCoupon || "Select existing coupon"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="welcome-back-10">Welcome Back 10% OFF</SelectItem>
                  <SelectItem value="free-delivery">Free Delivery</SelectItem>
                  <SelectItem value="bogo">Buy One Get One Free</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0"
                onClick={() => setNewCouponDialogOpen(true)}
              >
                <BadgePercent className="h-3 w-3 mr-1" />
                {translations.createNewCouponInstead || "Create new coupon instead"}
              </Button>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="loyalty" id="loyalty" />
          <Label htmlFor="loyalty">{translations.addLoyaltyPoints || "Add loyalty points"}</Label>
        </div>
        {incentiveType === "loyalty" && (
          <div className="pl-6 space-y-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="points-amount">{translations.pointsToAward || "Points to award:"}</Label>
              <Input
                type="number"
                id="points-amount"
                className="w-24"
                placeholder="100"
              />
            </div>
          </div>
        )}
      </RadioGroup>
    </CardContent>
  </Card>
);
export default IncentiveSettings;
