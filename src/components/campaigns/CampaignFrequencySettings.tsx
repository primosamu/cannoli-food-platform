
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, Mail, MessageSquare } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CampaignFrequencySettings = () => {
  const [maxEmailsPerWeek, setMaxEmailsPerWeek] = useState<number>(2);
  const [maxEmailsPerMonth, setMaxEmailsPerMonth] = useState<number>(8);
  const [maxSmsPerWeek, setMaxSmsPerWeek] = useState<number>(1);
  const [maxSmsPerMonth, setMaxSmsPerMonth] = useState<number>(4);
  const [automaticSegmentation, setAutomaticSegmentation] = useState<boolean>(true);
  const [warningThreshold, setWarningThreshold] = useState<number>(80); // percentage
  const [exclusionDuration, setExclusionDuration] = useState<number>(7); // days
  
  // Simulated data for overcontacted customers
  const overcontactedCustomers = [
    { id: "cust-1", name: "John Doe", email: "john.doe@example.com", contacts: 8, lastContact: "2025-04-10" },
    { id: "cust-2", name: "Jane Smith", email: "jane.smith@example.com", contacts: 6, lastContact: "2025-04-09" },
    { id: "cust-3", name: "Robert Brown", email: "robert.b@example.com", contacts: 7, lastContact: "2025-04-08" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Contact Frequency Control</CardTitle>
          <CardDescription>
            Set limits on how frequently customers can be contacted to avoid message fatigue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="email">
            <TabsList className="mb-4">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Campaigns
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                SMS Campaigns
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Maximum emails per week per customer</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[maxEmailsPerWeek]}
                        max={7}
                        step={1}
                        onValueChange={(value) => setMaxEmailsPerWeek(value[0])}
                        className="flex-1"
                      />
                      <span className="font-medium w-4">{maxEmailsPerWeek}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Maximum emails per month per customer</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[maxEmailsPerMonth]}
                        max={30}
                        step={1}
                        onValueChange={(value) => setMaxEmailsPerMonth(value[0])}
                        className="flex-1"
                      />
                      <span className="font-medium w-4">{maxEmailsPerMonth}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-slate-50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Email Campaign Settings
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Weekly limit:</span>
                      <Badge variant="outline">{maxEmailsPerWeek} emails</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Monthly limit:</span>
                      <Badge variant="outline">{maxEmailsPerMonth} emails</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Automatic customer segmentation:</span>
                      <Badge variant={automaticSegmentation ? "success" : "outline"}>
                        {automaticSegmentation ? "Enabled" : "Disabled"}
                      </Badge>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning Threshold</AlertTitle>
                <AlertDescription>
                  You'll be warned when a customer reaches {warningThreshold}% of their contact limit for the period.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="sms" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Maximum SMS per week per customer</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[maxSmsPerWeek]}
                        max={5}
                        step={1}
                        onValueChange={(value) => setMaxSmsPerWeek(value[0])}
                        className="flex-1"
                      />
                      <span className="font-medium w-4">{maxSmsPerWeek}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Maximum SMS per month per customer</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[maxSmsPerMonth]}
                        max={15}
                        step={1}
                        onValueChange={(value) => setMaxSmsPerMonth(value[0])}
                        className="flex-1"
                      />
                      <span className="font-medium w-4">{maxSmsPerMonth}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-slate-50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    SMS Campaign Settings
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Weekly limit:</span>
                      <Badge variant="outline">{maxSmsPerWeek} messages</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Monthly limit:</span>
                      <Badge variant="outline">{maxSmsPerMonth} messages</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Automatic customer segmentation:</span>
                      <Badge variant={automaticSegmentation ? "success" : "outline"}>
                        {automaticSegmentation ? "Enabled" : "Disabled"}
                      </Badge>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning Threshold</AlertTitle>
                <AlertDescription>
                  You'll be warned when a customer reaches {warningThreshold}% of their contact limit for the period.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
          
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Global Settings</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="automatic-segmentation">Automatic customer segmentation</Label>
                  <Switch
                    id="automatic-segmentation"
                    checked={automaticSegmentation}
                    onCheckedChange={setAutomaticSegmentation}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Warning threshold (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[warningThreshold]}
                      max={100}
                      step={5}
                      onValueChange={(value) => setWarningThreshold(value[0])}
                      className="flex-1"
                    />
                    <span className="font-medium w-8">{warningThreshold}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Exclude overcontacted customers for (days)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[exclusionDuration]}
                      max={30}
                      step={1}
                      onValueChange={(value) => setExclusionDuration(value[0])}
                      className="flex-1"
                    />
                    <span className="font-medium w-8">{exclusionDuration}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Paid traffic exceptions</Label>
                  <Select defaultValue="apply">
                    <SelectTrigger>
                      <SelectValue placeholder="Select policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ignore">Ignore limits for paid traffic</SelectItem>
                      <SelectItem value="apply">Apply limits to all traffic</SelectItem>
                      <SelectItem value="custom">Custom rules</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Contact limits don't apply to paid traffic campaigns by default
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Currently Overcontacted Customers</h3>
                <div className="border rounded-md">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-3 py-2 text-left text-xs">Name</th>
                        <th className="px-3 py-2 text-left text-xs">Contacts</th>
                        <th className="px-3 py-2 text-left text-xs">Last Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {overcontactedCustomers.map((customer) => (
                        <tr key={customer.id}>
                          <td className="px-3 py-2 text-sm">{customer.name}</td>
                          <td className="px-3 py-2 text-sm">
                            <Badge variant="destructive" className="text-xs">
                              {customer.contacts}
                            </Badge>
                          </td>
                          <td className="px-3 py-2 text-sm">{customer.lastContact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Showing 3 of 12 overcontacted customers
                  </span>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
