
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock } from "lucide-react";

interface ScheduleSettingsProps {
  scheduledDate: string;
  setScheduledDate: (v: string) => void;
  scheduledTime: string;
  setScheduledTime: (v: string) => void;
  translations: any;
}

const ScheduleSettings: React.FC<ScheduleSettingsProps> = ({
  scheduledDate,
  setScheduledDate,
  scheduledTime,
  setScheduledTime,
  translations
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        {translations.scheduling || "Scheduling"}
      </CardTitle>
      <CardDescription>
        {translations.setDeliveryTime || "Set when your campaign should be delivered"}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <RadioGroup defaultValue="now" className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="now" id="send-now" />
            <Label htmlFor="send-now">{translations.sendImmediately || "Send immediately"}</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scheduled" id="scheduled" />
            <Label htmlFor="scheduled">{translations.scheduleForLater || "Schedule for later"}</Label>
          </div>

          <div className="pl-6 grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="date">{translations.date || "Date"}</Label>
              <Input
                type="date"
                id="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">{translations.time || "Time"}</Label>
              <Input
                type="time"
                id="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>
        </RadioGroup>

        <div className="mt-4">
          <div className="flex items-start space-x-3">
            <Checkbox id="optimize-time" />
            <div className="grid gap-1.5">
              <Label htmlFor="optimize-time" className="font-medium">
                {translations.optimizeDelivery || "Optimize delivery time"}
              </Label>
              <p className="text-sm text-muted-foreground">
                {translations.optimizeDescription || "Send at best time for each customer based on their past engagement"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
export default ScheduleSettings;
