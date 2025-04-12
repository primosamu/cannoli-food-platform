
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Users,
  CreditCard,
  Save,
  Plus,
  Trash2,
  Pencil,
  Store,
  BarChart,
  Calendar,
  Settings,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
  CircleDollarSign,
  Receipt,
  CreditCard as CreditCardIcon
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  stores: string[];
}

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  active: boolean;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { 
      id: '1', 
      name: 'John Doe', 
      email: 'john@example.com', 
      role: 'admin', 
      stores: ['store-1', 'store-2'] 
    }
  ]);
  
  const [stores, setStores] = useState<StoreLocation[]>([
    {
      id: 'store-1',
      name: 'Downtown Location',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      active: true
    },
    {
      id: 'store-2',
      name: 'Uptown Location',
      address: '456 High St, Uptown',
      phone: '(555) 987-6543',
      active: true
    }
  ]);
  
  const [newTeamMember, setNewTeamMember] = useState({
    name: '',
    email: '',
    role: 'staff' as const,
    stores: [] as string[]
  });

  const [newStore, setNewStore] = useState({
    name: '',
    address: '',
    phone: '',
    active: true
  });

  const [accountDetails, setAccountDetails] = useState({
    name: 'Admin User',
    email: 'admin@cannoli.tech'
  });

  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false);

  const handleSaveAccountDetails = () => {
    toast({
      title: "Account Updated",
      description: "Your account details have been saved successfully."
    });
  };

  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.email) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedMembers = [
      ...teamMembers,
      {
        id: `member-${Date.now()}`,
        ...newTeamMember
      }
    ];

    setTeamMembers(updatedMembers);
    setNewTeamMember({
      name: '',
      email: '',
      role: 'staff',
      stores: []
    });

    setIsTeamDialogOpen(false);
    
    toast({
      title: "Team Member Added",
      description: `${newTeamMember.name} has been added to your team.`
    });
  };

  const handleAddStore = () => {
    if (!newStore.name || !newStore.address || !newStore.phone) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const updatedStores = [
      ...stores,
      {
        id: `store-${Date.now()}`,
        ...newStore
      }
    ];

    setStores(updatedStores);
    setNewStore({
      name: '',
      address: '',
      phone: '',
      active: true
    });

    setIsStoreDialogOpen(false);
    
    toast({
      title: "Store Added",
      description: `${newStore.name} has been added to your locations.`
    });
  };

  const handleRemoveTeamMember = (id: string) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    setTeamMembers(updatedMembers);
    
    toast({
      title: "Team Member Removed",
      description: "The team member has been removed."
    });
  };

  const handleRemoveStore = (id: string) => {
    const updatedStores = stores.filter(store => store.id !== id);
    setStores(updatedStores);
    
    toast({
      title: "Store Removed",
      description: "The store location has been removed."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account, stores, and application preferences.
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
              <TabsTrigger value="stores" className="justify-start px-3">
                <Store className="h-4 w-4 mr-2" /> Store Locations
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
                    <Input 
                      id="name" 
                      value={accountDetails.name} 
                      onChange={(e) => setAccountDetails({...accountDetails, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={accountDetails.email} 
                      onChange={(e) => setAccountDetails({...accountDetails, email: e.target.value})} 
                    />
                  </div>
                  
                  <Button className="mt-4" onClick={handleSaveAccountDetails}>
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stores" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Your Store Locations</h3>
                <Dialog open={isStoreDialogOpen} onOpenChange={setIsStoreDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Add Store
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Store Location</DialogTitle>
                      <DialogDescription>
                        Add a new store location to manage in your account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="store-name">Store Name</Label>
                        <Input
                          id="store-name"
                          placeholder="Downtown Store"
                          value={newStore.name}
                          onChange={(e) => setNewStore({...newStore, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="store-address">Address</Label>
                        <Input
                          id="store-address"
                          placeholder="123 Main St"
                          value={newStore.address}
                          onChange={(e) => setNewStore({...newStore, address: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="store-phone">Phone</Label>
                        <Input
                          id="store-phone"
                          placeholder="(555) 123-4567"
                          value={newStore.phone}
                          onChange={(e) => setNewStore({...newStore, phone: e.target.value})}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="store-active"
                          checked={newStore.active}
                          onCheckedChange={(checked) => setNewStore({...newStore, active: checked})}
                        />
                        <Label htmlFor="store-active">Active</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsStoreDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddStore}>
                        Add Store
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {stores.length > 0 ? (
                <div className="space-y-4">
                  {stores.map((store) => (
                    <Card key={store.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <h4 className="font-medium text-lg">{store.name}</h4>
                              {store.active ? (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active
                                </span>
                              ) : (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  Inactive
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Building className="h-4 w-4 mr-2" />
                              {store.address}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="h-4 w-4 mr-2" />
                              {store.phone}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Pencil className="h-4 w-4 mr-2" /> Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRemoveStore(store.id)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Store className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No store locations added yet</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="team" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" /> Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>
                        Add a new team member to your restaurant management system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={newTeamMember.name}
                          onChange={(e) => setNewTeamMember({...newTeamMember, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="johndoe@example.com"
                          value={newTeamMember.email}
                          onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                          value={newTeamMember.role}
                          onChange={(e) => setNewTeamMember({...newTeamMember, role: e.target.value as 'admin' | 'manager' | 'staff'})}
                        >
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="staff">Staff</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Accessible Stores</Label>
                        {stores.map((store) => (
                          <div key={store.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`store-${store.id}`}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              checked={newTeamMember.stores.includes(store.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewTeamMember({
                                    ...newTeamMember,
                                    stores: [...newTeamMember.stores, store.id]
                                  });
                                } else {
                                  setNewTeamMember({
                                    ...newTeamMember,
                                    stores: newTeamMember.stores.filter(id => id !== store.id)
                                  });
                                }
                              }}
                            />
                            <Label htmlFor={`store-${store.id}`}>{store.name}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsTeamDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddTeamMember}>
                        Add Team Member
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {teamMembers.length > 0 ? (
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <h4 className="font-medium">{member.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="h-4 w-4 mr-2" />
                              {member.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <span className="capitalize px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">
                                {member.role}
                              </span>
                              <span className="ml-2 text-xs text-muted-foreground">
                                {member.stores.length > 0
                                  ? `${member.stores.length} ${member.stores.length === 1 ? 'store' : 'stores'}`
                                  : 'No stores assigned'}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Pencil className="h-4 w-4 mr-2" /> Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleRemoveTeamMember(member.id)}>
                              <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center p-6">
                    <Users className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">No team members have been added yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Your current subscription and billing details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border p-4 rounded-lg bg-primary/5">
                      <div className="space-y-1">
                        <h4 className="font-medium">Pro Plan</h4>
                        <p className="text-sm text-muted-foreground">$49.99/month</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Next billing date</span>
                        <span className="font-medium">May 15, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Payment method</span>
                        <span className="font-medium flex items-center">
                          <CreditCardIcon className="h-3 w-3 mr-1" /> •••• 4242
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Billing email</span>
                        <span className="font-medium">billing@yourcompany.com</span>
                      </div>
                    </div>

                    <Separator />
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Plan Features</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Multiple store management</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Unlimited team members</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Advanced analytics and reporting</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>API access</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                          <span>Premium support</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button>
                        <CircleDollarSign className="h-4 w-4 mr-2" /> Manage Subscription
                      </Button>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <CreditCardIcon className="h-4 w-4 mr-2" /> Update Payment Method
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Receipt className="h-4 w-4 mr-2" /> View Invoices
                        </Button>
                      </div>
                    </div>
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
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified about new orders</p>
                    </div>
                    <Switch defaultChecked />
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
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Enable two-factor authentication for enhanced security</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Button className="mt-4">
                    <Lock className="h-4 w-4 mr-2" /> Update Password
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
