
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Users,
  CreditCard,
  Save
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account and application preferences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="account">
        <div className="flex">
          <div className="w-1/4 pr-4">
            <TabsList className="flex flex-col h-full space-y-1 w-full bg-transparent p-0">
              <TabsTrigger value="account" className="justify-start px-3">
                <User className="h-4 w-4 mr-2" /> Account
              </TabsTrigger>
              <TabsTrigger value="restaurant" className="justify-start px-3">
                <Building className="h-4 w-4 mr-2" /> Restaurant Profile
              </TabsTrigger>
              <TabsTrigger value="team" className="justify-start px-3">
                <Users className="h-4 w-4 mr-2" /> Team Members
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start px-3">
                <CreditCard className="h-4 w-4 mr-2" /> Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start px-3">
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start px-3">
                <Shield className="h-4 w-4 mr-2" /> Security
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="w-3/4">
            <TabsContent value="account" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Admin User" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@cannoli.tech" />
                  </div>
                  
                  <Button className="mt-4">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="restaurant" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Profile</CardTitle>
                  <CardDescription>
                    Update your restaurant's information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name">Restaurant Name</Label>
                    <Input id="restaurant-name" defaultValue="Cannoli Food Tech" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-address">Address</Label>
                    <Input id="restaurant-address" placeholder="Enter your restaurant address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-phone">Phone Number</Label>
                    <Input id="restaurant-phone" placeholder="Enter phone number" />
                  </div>
                  
                  <Button className="mt-4">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage access and permissions for your team members.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <p>No team members have been added yet.</p>
                    <Button className="mt-4">
                      <Users className="h-4 w-4 mr-2" /> Add Team Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                  <CardDescription>
                    Manage your subscription and payment methods.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8 text-muted-foreground">
                    <p>No billing information available.</p>
                    <Button className="mt-4" variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Updates</p>
                      <p className="text-sm text-muted-foreground">Receive updates about new features</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Button className="mt-4">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Update your password and security preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  
                  <Button className="mt-4">
                    <Shield className="h-4 w-4 mr-2" /> Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
