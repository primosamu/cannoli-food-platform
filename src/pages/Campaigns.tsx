
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, MessageSquare, Mail, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignCreator from "@/components/campaigns/CampaignCreator";
import ImageOptimizer from "@/components/campaigns/ImageOptimizer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h2>
          <p className="text-muted-foreground">
            Create and manage marketing campaigns for your restaurant.
          </p>
        </div>
        <Button onClick={() => setShowCreator(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      {showCreator ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create New Campaign</CardTitle>
                <CardDescription>
                  Design your marketing campaign for WhatsApp, SMS, Email or Paid Traffic
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => setShowCreator(false)}>
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">
                  <MessageSquare className="mr-2 h-4 w-4" /> 
                  Content
                </TabsTrigger>
                <TabsTrigger value="images">
                  <Image className="mr-2 h-4 w-4" /> 
                  Images
                </TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="pt-6">
                <CampaignCreator />
              </TabsContent>
              <TabsContent value="images" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageOptimizer />
                  <Card>
                    <CardHeader>
                      <CardTitle>Image Gallery</CardTitle>
                      <CardDescription>
                        Select from your previous images or upload new ones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div 
                            key={item} 
                            className="aspect-video bg-gray-100 rounded flex items-center justify-center"
                          >
                            <span className="text-muted-foreground">Image {item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Campaigns</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                  Currently running marketing campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-muted-foreground">
                  <p>No active campaigns at the moment.</p>
                  <p className="mt-2">Click "Create Campaign" to start a new marketing initiative.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scheduled" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Campaigns</CardTitle>
                <CardDescription>
                  Marketing campaigns scheduled for future dates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-muted-foreground">
                  <p>No scheduled campaigns.</p>
                  <p className="mt-2">Plan your next marketing campaign in advance.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Campaigns</CardTitle>
                <CardDescription>
                  History of past marketing campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-muted-foreground">
                  <p>No completed campaigns found.</p>
                  <p className="mt-2">Your campaign history will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Floating help button with templates info */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className="fixed bottom-6 right-6 rounded-full h-12 w-12 shadow-lg p-0"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Campaign Templates</DialogTitle>
            <DialogDescription>
              Use our ready-made templates to create effective marketing campaigns.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Available Template Types:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-green-600 mr-2" />
                  WhatsApp Templates
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                  SMS Templates
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-orange-600 mr-2" />
                  Email Templates
                </li>
                <li className="flex items-center">
                  <Image className="h-4 w-4 text-purple-600 mr-2" />
                  Paid Traffic Templates
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Click on "Create Campaign" and select a template to get started quickly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampaignsPage;
