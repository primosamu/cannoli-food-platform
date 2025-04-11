
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, Award, Users } from "lucide-react";

const LoyaltyPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Loyalty & Points</h2>
          <p className="text-muted-foreground">
            Manage your customer loyalty program and rewards.
          </p>
        </div>
        <Button>
          <Settings className="mr-2 h-4 w-4" /> Configure Program
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Points Issued</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Members</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rewards Claimed</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" /> Members
          </TabsTrigger>
          <TabsTrigger value="rewards">
            <Award className="h-4 w-4 mr-2" /> Rewards
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <CreditCard className="h-4 w-4 mr-2" /> Point Transactions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program Members</CardTitle>
              <CardDescription>
                View and manage customers enrolled in your loyalty program.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12 text-muted-foreground">
                <p className="text-lg mb-2">No members enrolled yet</p>
                <p>Members will appear here once they join your loyalty program.</p>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-slate-50 p-4">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" /> Invite Customers
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="rewards" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Rewards</CardTitle>
              <CardDescription>
                Create and manage rewards that customers can redeem with their points.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12 text-muted-foreground">
                <p className="text-lg mb-2">No rewards created yet</p>
                <p>Create rewards for your loyalty program members.</p>
                <Button className="mt-4">
                  <Award className="h-4 w-4 mr-2" /> Create Reward
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Point Transactions</CardTitle>
              <CardDescription>
                Track points earned and redeemed by customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12 text-muted-foreground">
                <p className="text-lg mb-2">No transaction history</p>
                <p>Point transactions will appear here after members start earning or redeeming points.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltyPage;
