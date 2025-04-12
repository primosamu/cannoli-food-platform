
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DataConnector from '@/utils/dataConnector';

export const DataConnectionsOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Get sample IDs for demonstration
  const sampleCustomerId = DataConnector.customers.getAll()[0]?.id || "";
  const sampleOrderId = DataConnector.orders.getAll()[0]?.id || "";
  const sampleMenuItemId = DataConnector.menu.getItems()[0]?.id || "";
  const sampleCampaignId = DataConnector.campaigns.getAll()[0]?.id || "";
  const sampleCouponId = DataConnector.coupons.getAll()[0]?.id || "";

  const renderCustomerConnections = () => {
    if (!selectedId) {
      return <p className="text-muted-foreground">Select a customer to view their connections</p>;
    }

    const customer = DataConnector.customers.getById(selectedId);
    if (!customer) return <p>Customer not found</p>;

    const orders = DataConnector.customers.getOrderHistory(selectedId);
    const analytics = DataConnector.customers.getSpendingAnalytics(selectedId);
    const coupons = DataConnector.customers.getUsedCoupons(selectedId);
    const campaigns = DataConnector.customers.getAppliedCampaigns(selectedId);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Customer: {customer.name}</h3>
          <p className="text-muted-foreground">{customer.email} • {customer.phone}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{orders.length} orders</p>
              <p className="text-muted-foreground text-sm">
                Total spent: ${analytics.totalSpent.toFixed(2)}
              </p>
              <p className="text-muted-foreground text-sm">
                Average order: ${analytics.averageOrderValue.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Coupons Used</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{coupons.length} coupons</p>
              {coupons.length > 0 && (
                <ul className="text-sm text-muted-foreground">
                  {coupons.slice(0, 3).map(coupon => (
                    <li key={coupon.id}>{coupon.code} - {coupon.name}</li>
                  ))}
                  {coupons.length > 3 && <li>+ {coupons.length - 3} more</li>}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Campaigns Received</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{campaigns.length} campaigns</p>
              {campaigns.length > 0 && (
                <ul className="text-sm text-muted-foreground">
                  {campaigns.slice(0, 3).map(campaign => (
                    <li key={campaign.id}>{campaign.name}</li>
                  ))}
                  {campaigns.length > 3 && <li>+ {campaigns.length - 3} more</li>}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Category Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.spendingByCategory && Object.keys(analytics.spendingByCategory).length > 0 ? (
                <ul className="text-sm">
                  {Object.entries(analytics.spendingByCategory)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 4)
                    .map(([category, amount]) => (
                      <li key={category} className="flex justify-between">
                        <span>{category}</span>
                        <span className="text-muted-foreground">${amount.toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No category data available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderOrderConnections = () => {
    if (!selectedId) {
      return <p className="text-muted-foreground">Select an order to view its connections</p>;
    }

    const orderWithDetails = DataConnector.orders.getOrderWithMenuDetails(selectedId);
    if (!orderWithDetails) return <p>Order not found</p>;

    const customer = DataConnector.customers.getById(orderWithDetails.customer.id);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Order: {orderWithDetails.orderNumber}</h3>
          <p className="text-muted-foreground">
            {new Date(orderWithDetails.createdAt).toLocaleDateString()} • 
            Status: <span className="capitalize">{orderWithDetails.status}</span> • 
            Total: ${orderWithDetails.totalAmount.toFixed(2)}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{customer?.name}</p>
              <p className="text-sm text-muted-foreground">{customer?.email}</p>
              <p className="text-sm text-muted-foreground">
                {customer?.orderCount || 0} total orders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium capitalize">{orderWithDetails.delivery.type} Delivery</p>
              {orderWithDetails.delivery.courier && (
                <p className="text-sm">Courier: {orderWithDetails.delivery.courier}</p>
              )}
              {orderWithDetails.delivery.fee && (
                <p className="text-sm text-muted-foreground">Fee: ${orderWithDetails.delivery.fee.toFixed(2)}</p>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {orderWithDetails.items.map(item => {
                  const menuItem = orderWithDetails.enrichedItems?.find(ei => ei.id === item.id)?.menuItem;
                  const category = menuItem ? 
                    DataConnector.menu.getCategoryById(menuItem.category) : 
                    undefined;
                  
                  return (
                    <li key={item.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.quantity}x {item.name}</span>
                        {category && (
                          <span className="block text-xs text-muted-foreground">
                            Category: {category.name}
                          </span>
                        )}
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderMenuConnections = () => {
    if (!selectedId) {
      return <p className="text-muted-foreground">Select a menu item to view its connections</p>;
    }

    const menuItem = DataConnector.menu.getItemById(selectedId);
    if (!menuItem) return <p>Menu item not found</p>;

    const category = DataConnector.menu.getCategoryById(menuItem.category);
    
    // Simulate finding orders with this menu item
    const allOrders = DataConnector.orders.getAll();
    const relatedOrders = allOrders.filter(order => 
      order.items.some(item => item.name === menuItem.name)
    ).slice(0, 5);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Menu Item: {menuItem.name}</h3>
          <p className="text-muted-foreground">{menuItem.description}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{category?.name}</p>
              <p className="text-sm text-muted-foreground">{category?.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm">
                {Object.entries(menuItem.prices).map(([type, price]) => (
                  <li key={type} className="flex justify-between">
                    <span className="capitalize">{type.replace('_', ' ')}</span>
                    <span>${price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm">
                {Object.entries(menuItem.platforms)
                  .filter(([_, active]) => active)
                  .map(([platform]) => (
                    <li key={platform} className="capitalize">
                      {platform.replace('_', ' ')}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {relatedOrders.length > 0 ? (
                <ul className="text-sm">
                  {relatedOrders.map(order => (
                    <li key={order.id} className="flex justify-between">
                      <span>{order.orderNumber}</span>
                      <span className="text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No recent orders</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCampaignConnections = () => {
    if (!selectedId) {
      return <p className="text-muted-foreground">Select a campaign to view its connections</p>;
    }

    const campaign = DataConnector.campaigns.getById(selectedId);
    if (!campaign) return <p>Campaign not found</p>;

    const coupons = DataConnector.campaigns.getRelatedCoupons(selectedId);
    const targetCustomers = DataConnector.campaigns.getTargetCustomers(selectedId);
    const impact = DataConnector.campaigns.getCampaignImpact(selectedId);

    // Get related menu items if any
    const menuItems = campaign.menuIds?.map(id => 
      DataConnector.menu.getItemById(id)
    ).filter(Boolean) || [];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Campaign: {campaign.name}</h3>
          <p className="text-muted-foreground">
            {campaign.type.toUpperCase()} Campaign • 
            Status: <span className="capitalize">{campaign.status}</span>
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {targetCustomers.length} Target Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm">
                {targetCustomers.slice(0, 5).map(customer => (
                  <li key={customer.id}>{customer.name}</li>
                ))}
                {targetCustomers.length > 5 && <li>+ {targetCustomers.length - 5} more</li>}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Related Coupons</CardTitle>
            </CardHeader>
            <CardContent>
              {coupons.length > 0 ? (
                <ul className="text-sm">
                  {coupons.map(coupon => (
                    <li key={coupon.id}>
                      <span className="font-medium">{coupon.code}</span> - {coupon.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No coupons associated</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Featured Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
              {menuItems.length > 0 ? (
                <ul className="text-sm">
                  {menuItems.map(item => (
                    <li key={item?.id}>{item?.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No featured menu items</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Impact</CardTitle>
            </CardHeader>
            <CardContent>
              {impact ? (
                <ul className="text-sm">
                  <li className="flex justify-between">
                    <span>Delivered</span>
                    <span>{impact.metrics.deliveredCount}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Open Rate</span>
                    <span>{(impact.metrics.openedCount / (impact.metrics.deliveredCount || 1) * 100).toFixed(1)}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Est. Revenue</span>
                    <span>${impact.metrics.estimatedRevenue}</span>
                  </li>
                </ul>
              ) : (
                <p className="text-muted-foreground">Impact data not available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCouponConnections = () => {
    if (!selectedId) {
      return <p className="text-muted-foreground">Select a coupon to view its connections</p>;
    }

    const coupon = DataConnector.coupons.getById(selectedId);
    if (!coupon) return <p>Coupon not found</p>;

    const relatedCampaigns = DataConnector.coupons.getRelatedCampaigns(selectedId);
    const analytics = DataConnector.coupons.getCouponUsageAnalytics(selectedId);

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Coupon: {coupon.code}</h3>
          <p className="text-muted-foreground">
            {coupon.name} • 
            Type: <span className="capitalize">{coupon.type}</span> • 
            Status: {coupon.active ? "Active" : "Inactive"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Related Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {relatedCampaigns.length > 0 ? (
                <ul className="text-sm">
                  {relatedCampaigns.map(campaign => (
                    <li key={campaign.id}>
                      {campaign.name} ({campaign.type})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No related campaigns</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Usage Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics ? (
                <ul className="text-sm">
                  <li className="flex justify-between">
                    <span>Total Usage</span>
                    <span>{analytics.totalUsage}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Unique Customers</span>
                    <span>{analytics.uniqueCustomers}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Avg. Order Value</span>
                    <span>${analytics.averageOrderValue.toFixed(2)}</span>
                  </li>
                </ul>
              ) : (
                <p className="text-muted-foreground">No analytics available</p>
              )}
            </CardContent>
          </Card>

          {analytics?.channelDistribution && (
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Usage by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(analytics.channelDistribution).map(([channel, count]) => (
                    <li key={channel} className="flex flex-col">
                      <span className="capitalize font-medium">{channel}</span>
                      <div className="flex items-center">
                        <div className="h-2 bg-primary rounded-full mr-2" 
                          style={{ width: `${count / analytics.totalUsage * 100}px` }}></div>
                        <span>{count}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Connections Explorer</CardTitle>
        <CardDescription>
          See how different entities are connected across the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {DataConnector.customers.getAll().slice(0, 10).map(customer => (
                <Button 
                  key={customer.id}
                  variant={selectedId === customer.id ? "default" : "outline"}
                  onClick={() => setSelectedId(customer.id)}
                >
                  {customer.name}
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setSelectedId(sampleCustomerId)}>
                Random Example
              </Button>
            </div>
            {renderCustomerConnections()}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {DataConnector.orders.getAll().slice(0, 10).map(order => (
                <Button 
                  key={order.id}
                  variant={selectedId === order.id ? "default" : "outline"}
                  onClick={() => setSelectedId(order.id)}
                >
                  {order.orderNumber}
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setSelectedId(sampleOrderId)}>
                Random Example
              </Button>
            </div>
            {renderOrderConnections()}
          </TabsContent>

          <TabsContent value="menu" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {DataConnector.menu.getItems().slice(0, 10).map(item => (
                <Button 
                  key={item.id}
                  variant={selectedId === item.id ? "default" : "outline"}
                  onClick={() => setSelectedId(item.id)}
                >
                  {item.name}
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setSelectedId(sampleMenuItemId)}>
                Random Example
              </Button>
            </div>
            {renderMenuConnections()}
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {DataConnector.campaigns.getAll().slice(0, 10).map(campaign => (
                <Button 
                  key={campaign.id}
                  variant={selectedId === campaign.id ? "default" : "outline"}
                  onClick={() => setSelectedId(campaign.id)}
                >
                  {campaign.name.substring(0, 15)}{campaign.name.length > 15 ? '...' : ''}
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setSelectedId(sampleCampaignId)}>
                Random Example
              </Button>
            </div>
            {renderCampaignConnections()}
          </TabsContent>

          <TabsContent value="coupons" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {DataConnector.coupons.getAll().slice(0, 10).map(coupon => (
                <Button 
                  key={coupon.id}
                  variant={selectedId === coupon.id ? "default" : "outline"}
                  onClick={() => setSelectedId(coupon.id)}
                >
                  {coupon.code}
                </Button>
              ))}
              <Button variant="ghost" onClick={() => setSelectedId(sampleCouponId)}>
                Random Example
              </Button>
            </div>
            {renderCouponConnections()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
