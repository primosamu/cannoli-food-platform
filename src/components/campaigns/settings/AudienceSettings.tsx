
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface AudienceSettingsProps {
  audienceType: string;
  setAudienceType: (v: string) => void;
  selectedSegment: string;
  setSelectedSegment: (v: string) => void;
  inactiveDays: string;
  setInactiveDays: (v: string) => void;
  template: any;
  translations: any;
  getEstimatedAudience: () => string;
}

const AudienceSettings: React.FC<AudienceSettingsProps> = ({
  audienceType,
  setAudienceType,
  selectedSegment,
  setSelectedSegment,
  inactiveDays,
  setInactiveDays,
  template,
  translations,
  getEstimatedAudience
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        {translations.audienceTargeting || "Audience Targeting"}
      </CardTitle>
      <CardDescription>
        {translations.chooseAudience || "Choose which customers will receive this campaign"}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <RadioGroup 
        value={audienceType}
        onValueChange={setAudienceType}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all" />
          <Label htmlFor="all" className="cursor-pointer">{translations.allCustomers || "All customers"}</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="segment" id="segment" />
          <Label htmlFor="segment" className="cursor-pointer">{translations.customerSegment || "Customer segment"}</Label>
        </div>
        
        {audienceType === "segment" && (
          <div className="pl-6 space-y-3">
            <Select 
              value={selectedSegment} 
              onValueChange={setSelectedSegment}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={translations.selectSegment || "Select a customer segment"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="inactive">{translations.inactiveCustomers || "Inactive Customers"} ({inactiveDays} {translations.inactiveDays ? translations.inactiveDays.split(':')[0].toLowerCase() : "days"})</SelectItem>
                  <SelectItem value="loyal">{translations.loyalCustomers || "Loyal Customers (5+ orders)"}</SelectItem>
                  <SelectItem value="new">{translations.newCustomers || "New Customers (1-2 orders)"}</SelectItem>
                  <SelectItem value="high-value">{translations.highValueCustomers || "High-Value Customers ($100+)"}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {(selectedSegment === "inactive" || template?.category === 'customer-recovery') && (
              <div className="flex items-center gap-2 mt-2">
                <Label htmlFor="inactive-days">{translations.inactiveDays || "Inactive for at least:"}</Label>
                <Input 
                  id="inactive-days" 
                  type="number" 
                  className="w-20" 
                  value={inactiveDays}
                  onChange={(e) => setInactiveDays(e.target.value)}
                />
                <span className="text-sm">{translations.inactiveDays ? translations.inactiveDays.split(':')[0].toLowerCase() : "days"}</span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom" className="cursor-pointer">{translations.customCriteria || "Custom criteria"}</Label>
        </div>
        
        {audienceType === "custom" && (
          <div className="pl-6 space-y-3">
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={translations.selectSegment || "Select criteria type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="order-count">{translations.orderCount || "Order Count"}</SelectItem>
                  <SelectItem value="last-order">{translations.lastOrder || "Last Order Date"}</SelectItem>
                  <SelectItem value="total-spent">{translations.totalSpent || "Total Amount Spent"}</SelectItem>
                  <SelectItem value="food-preference">{translations.foodPreference || "Food Preference"}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </RadioGroup>
      
      <div className="mt-4">
        <Badge variant="secondary" className="bg-muted/60 hover:bg-muted text-muted-foreground">
          {translations.estimatedAudience || "Estimated audience"}: {getEstimatedAudience()} {translations.customers || "customers"}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export default AudienceSettings;
