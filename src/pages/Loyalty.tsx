
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, Award, Users, Plus, Gift, Calendar, ArrowUpDown, UserPlus, Crown, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  sampleLoyaltyMembers,
  sampleLoyaltyRewards,
  samplePointTransactions,
  loyaltyProgramStats
} from "@/data/sampleLoyaltyData";
import { formatDistanceToNow } from "date-fns";

// Helper function to get tier color
const getTierColor = (tier: string) => {
  switch(tier) {
    case "platinum": return "bg-purple-100 text-purple-800";
    case "gold": return "bg-amber-100 text-amber-800";
    case "silver": return "bg-slate-100 text-slate-800";
    default: return "bg-stone-100 text-stone-800";
  }
};

// Helper function to get transaction type styling
const getTransactionTypeStyle = (type: string) => {
  switch(type) {
    case "earn": return "text-green-600";
    case "redeem": return "text-red-600";
    case "expire": return "text-orange-600";
    case "adjustment": return "text-blue-600";
    case "referral": return "text-purple-600";
    default: return "";
  }
};

// Helper function to format points with sign
const formatPoints = (points: number) => {
  return points > 0 ? `+${points}` : points.toString();
};

const LoyaltyPage = () => {
  const [filterTier, setFilterTier] = useState<string | null>(null);
  
  // Filter members by tier if a filter is selected
  const filteredMembers = filterTier 
    ? sampleLoyaltyMembers.filter(member => member.tier === filterTier)
    : sampleLoyaltyMembers;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Loyalty & Points</h2>
          <p className="text-muted-foreground">
            Manage your customer loyalty program and rewards.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Gift className="mr-2 h-4 w-4" /> Import Rewards
          </Button>
          <Button>
            <Settings className="mr-2 h-4 w-4" /> Configure Program
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Points Issued</CardTitle>
            <CardDescription>All time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loyaltyProgramStats.totalPointsIssued.toLocaleString()}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {loyaltyProgramStats.totalPointsRedeemed.toLocaleString()} points redeemed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Members</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loyaltyProgramStats.activeMembers}</div>
            <p className="text-muted-foreground text-sm mt-1">
              {loyaltyProgramStats.totalMembers.toLocaleString()} total enrolled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rewards Claimed</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loyaltyProgramStats.rewardsClaimedThisMonth}</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span>Most popular: {loyaltyProgramStats.mostRedeemedReward.name}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Member Tiers</CardTitle>
            <CardDescription>Distribution</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex gap-1 flex-col">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-purple-100 text-purple-800 mr-2`}>Platinum</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.platinum}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.platinum / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-amber-100 text-amber-800 mr-2`}>Gold</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.gold}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.gold / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-slate-100 text-slate-800 mr-2`}>Silver</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.silver}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.silver / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="outline" className={`bg-stone-100 text-stone-800 mr-2`}>Bronze</Badge>
                  <span className="text-muted-foreground text-sm">{loyaltyProgramStats.membersByTier.bronze}</span>
                </div>
                <span className="text-sm">{Math.round((loyaltyProgramStats.membersByTier.bronze / loyaltyProgramStats.totalMembers) * 100)}%</span>
              </div>
            </div>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Loyalty Program Members</CardTitle>
                <CardDescription>
                  View and manage customers enrolled in your loyalty program.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setFilterTier(null)}>
                  <Users className="h-4 w-4 mr-2" /> All Tiers
                </Button>
                <Button variant="outline" size="sm" onClick={() => setFilterTier("platinum")}>
                  <Crown className="h-4 w-4 mr-2 text-purple-600" /> Platinum
                </Button>
                <Button variant="outline" size="sm" onClick={() => setFilterTier("gold")}>
                  <Crown className="h-4 w-4 mr-2 text-amber-600" /> Gold
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" /> Sort
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {filteredMembers.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                        <TableHead>Enrollment</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.slice(0, 10).map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  {member.customerName.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{member.customerName}</p>
                                <p className="text-sm text-muted-foreground">{member.customerEmail}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getTierColor(member.tier)}>
                              {member.tier.charAt(0).toUpperCase() + member.tier.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {member.currentPoints.toLocaleString()}
                            <p className="text-xs text-muted-foreground">
                              {member.pointsToNextTier > 0 ? 
                                `${member.pointsToNextTier} to next tier` : 
                                "Max tier achieved"}
                            </p>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {formatDistanceToNow(member.enrollmentDate, { addSuffix: true })}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {formatDistanceToNow(member.lastActivityDate, { addSuffix: true })}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="sm">Details</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-12 text-muted-foreground">
                  <p className="text-lg mb-2">No members in this tier</p>
                  <p>Select another tier or view all members.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-slate-50 p-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Showing {Math.min(10, filteredMembers.length)} of {filteredMembers.length} members
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" /> Invite Customers
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Member
                </Button>
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleLoyaltyRewards.filter(r => r.active).map(reward => (
                  <div key={reward.id} className="bg-white border rounded-lg overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      {reward.imageUrl ? (
                        <img src={reward.imageUrl} alt={reward.name} className="h-full w-full object-cover" />
                      ) : (
                        <Gift className="h-12 w-12 text-gray-300" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{reward.name}</h3>
                        <Badge>{reward.pointCost} points</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {reward.category}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {reward.redemptionCount} redemptions
                        </p>
                      </div>
                      {reward.limitedTime && (
                        <div className="flex items-center mt-2 text-xs text-amber-600">
                          <Clock className="h-3 w-3 mr-1" />
                          Limited time offer
                          {reward.expiryDate && (
                            <span className="ml-1">
                              (Expires {formatDistanceToNow(reward.expiryDate, { addSuffix: true })})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Add new reward card */}
                <div className="bg-white border rounded-lg overflow-hidden border-dashed">
                  <div className="h-full flex flex-col items-center justify-center p-8">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-center">Create New Reward</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Design a new reward for your loyalty program members
                    </p>
                    <Button className="mt-4">
                      <Award className="h-4 w-4 mr-2" /> Create Reward
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Point Transactions</CardTitle>
                <CardDescription>
                  Track points earned and redeemed by customers.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" /> Filter by Date
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Manual Adjustment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Transaction</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {samplePointTransactions.slice(0, 10).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{transaction.customerName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="capitalize">{transaction.transactionType}</span>
                        </TableCell>
                        <TableCell className={`text-right font-medium ${getTransactionTypeStyle(transaction.transactionType)}`}>
                          {formatPoints(transaction.points)}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {formatDistanceToNow(transaction.createdAt, { addSuffix: true })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {transaction.description}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-slate-50 p-4">
              <p className="text-sm text-muted-foreground">
                Showing 10 of {samplePointTransactions.length} transactions
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltyPage;
