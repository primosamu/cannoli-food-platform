
import { Translations } from "../types/language";

const enTranslations: Translations = {
  // General
  cancel: 'Cancel',
  save: 'Save',
  delete: 'Delete',
  edit: 'Edit',
  view: 'View',
  add: 'Add',
  remove: 'Remove',
  search: 'Search',
  filter: 'Filter',
  sort: 'Sort',
  show: 'Show',
  hide: 'Hide',
  error: 'Error',
  pleaseCompleteAllFields: 'Please complete all fields',
  use: 'Use',
  language: 'Language',
  
  // Navigation
  dashboard: 'Dashboard',
  menus: 'Menus',
  orders: 'Orders',
  customers: 'Customers',
  campaigns: 'Campaigns',
  calendar: 'Calendar',
  coupons: 'Coupons',
  loyalty: 'Loyalty',
  integrations: 'Integrations',
  settings: 'Settings',
  system: 'System',
  profile: 'Profile',
  logout: 'Logout',
  
  // Orders
  newOrders: 'New',
  preparing: 'Preparing',
  ready: 'Ready',
  delivering: 'Delivering',
  completed: 'Completed',
  orderNumber: 'Order',
  updated: 'updated',
  orderPreparingToast: 'Order is now being prepared',
  orderReadyToast: 'Order is now ready for pickup/delivery',
  orderDeliveringToast: 'Order is now out for delivery',
  orderCompletedToast: 'Order has been completed',
  orderCancelledToast: 'Order has been cancelled',
  waitingToBePrepared: 'Waiting to be prepared',
  currentlyInPreparation: 'Currently in preparation',
  readyForPickupDelivery: 'Ready for pickup/delivery',
  outForDelivery: 'Out for delivery',
  orderManagement: 'Order Management',
  
  // Ordering channels
  mobile: 'Mobile',
  totem: 'Totem',
  whatsapp: 'WhatsApp',
  app: 'App',
  ifood: 'iFood',
  rappi: 'Rappi',
  other: 'Other',
  channels: 'Channels',
  
  // Delivery
  assignDelivery: 'Assign Delivery',
  selectACourier: 'Select a courier',
  changeCourier: 'Change Courier',
  deliveryAssigned: 'Delivery Assigned',
  hasBeenAssignedToOrder: 'has been assigned to order',
  deliveryTypeChanged: 'Delivery type has been changed',
  reassignCourier: 'Reassign Courier',
  currentCourier: 'Current Courier',
  deliveryMethod: 'Delivery Method',
  ownDelivery: 'Own Delivery',
  selfDelivery: 'Self Delivery',
  thirdPartyDelivery: 'Third Party',
  selectCourier: 'Select Courier',
  noAvailableCouriers: 'No available couriers',
  courierName: 'Courier Name',
  enterCourierName: 'Enter courier name',
  deliveryCompany: 'Delivery Company',
  selectACompany: 'Select a company',
  deliveryAddress: 'Delivery Address',
  noAddress: 'No address provided',
  assign: 'Assign',
  
  // Couriers
  couriers: 'Couriers',
  courierUpdated: 'Courier Updated',
  courierStatusUpdated: 'Courier availability status has been updated',
  courierAdded: 'Courier Added',
  courierAddedSuccessfully: 'Courier has been added successfully',
  courierManagement: 'Courier Management',
  manageDeliveryTeam: 'Manage your delivery team',
  availableCouriers: 'Available Couriers',
  unavailableCouriers: 'Unavailable Couriers',
  available: 'Available',
  unavailable: 'Unavailable',
  noUnavailableCouriers: 'No unavailable couriers',
  addNewCourier: 'Add New Courier',
  enterCourierPhone: 'Enter courier phone',
  addCourier: 'Add Courier',
  
  // Reports
  reports: 'Reports',
  deliveryReport: 'Delivery Report',
  viewDeliveryPerformance: 'View delivery performance metrics',
  courier: 'Courier',
  deliveredOrders: 'Delivered Orders',
  totalAmount: 'Total Amount',
  active: 'Active',
  deliveries: 'Deliveries',
  noDeliveriesYet: 'No deliveries yet',
  name: 'Name',
  phone: 'Phone',
  status: 'Status',
  actions: 'Actions',
  
  // View options
  kanban: 'Kanban',
  list: 'List',
  
  // Language names
  english: 'English',
  portuguese: 'Portuguese',
  spanish: 'Spanish',

  // Campaign related
  presetCampaigns: 'Preset Campaigns',
  chooseTemplates: 'Choose from ready-to-use campaign templates',
  viewAllCampaigns: 'View All Campaigns',
  allCampaigns: 'All Campaigns',
  schedule: 'Schedule',
  analytics: 'Analytics',
  scheduled: 'Scheduled',
  drafts: 'Drafts',
  marketingCampaigns: 'Marketing Campaigns',
  createManageCampaigns: 'Create and manage marketing campaigns for your restaurant.',
  presets: 'Presets',
  createCampaign: 'Create Campaign',

  // Campaign categories
  'customer-recovery': 'Customer Recovery',
  'consumption-pattern': 'Consumption Patterns',
  'channel-migration': 'Channel Migration',

  // Campaign category descriptions
  'customer-recoveryDescription': 'Win back customers who haven\'t ordered in a while',
  'loyaltyDescription': 'Reward and engage your loyal customers',
  'consumption-patternDescription': 'Encourage new consumption behaviors',
  'channel-migrationDescription': 'Move customers from marketplaces to direct ordering',

  // Image optimizer
  imageOptimizer: 'Image Optimizer',
  upload: 'Upload',
  uploadImage: 'Upload an image to start',
  basic: 'Basic',
  filters: 'Filters',
  brightness: 'Brightness',
  contrast: 'Contrast',
  saturation: 'Saturation',
  sharpness: 'Sharpness',
  reset: 'Reset',
  optimizeWithAI: 'Optimize with AI',
  optimizing: 'Optimizing...',
  apply: 'Apply',
  normal: 'Normal',
  imageOptimized: 'Image optimized',
  imageOptimizedDesc: 'Your image has been optimized successfully',

  // Dashboard
  overview: 'Overview',
  detailedAnalytics: 'Detailed Analytics',
  totalRevenue: 'Total Revenue',
  activeCustomers: 'Active Customers',
  customerSegmentation: 'Customer Segmentation',
  topPerformingMenuItems: 'Top Performing Menu Items',
  campaignPerformance: 'Campaign Performance',
  salesByStore: 'Sales by Store',
  customersAndOrdersPerDay: 'Customers and Orders per Day',
  restaurantPerformance: 'Restaurant Performance',
  customerData: 'Customer Data',
  
  // Menu Management
  menuManagement: 'Menu Management',
  createAndManageMenu: 'Create and manage your menu items across different channels',
  categories: 'Categories',
  items: 'Items',
  
  // Customers
  customerManagement: 'Customer Management',
  manageCustomerInfo: 'Manage your customer information and contact details',
  
  // Calendar
  calendarManagement: 'Calendar Management',
  scheduleAndManageEvents: 'Schedule and manage your restaurant events and marketing campaigns',
  filterCampaigns: 'Filter Campaigns',
  dateRange: 'Date Range',
  
  // Coupons
  couponManagement: 'Coupon Management',
  createAndManageCoupons: 'Create and manage discount coupons for your customers',
  activeCoupons: 'Active Coupons',
  inactiveCoupons: 'Inactive Coupons',
  scheduledCoupons: 'Scheduled Coupons',
  
  // Loyalty
  loyaltyAndPoints: 'Loyalty & Points',
  manageCustomerLoyalty: 'Manage your customer loyalty program and rewards',
  totalPointsIssued: 'Total Points Issued',
  activeMembers: 'Active Members',
  rewardsClaimed: 'Rewards Claimed',
  memberTiers: 'Member Tiers',
  loyaltyProgramMembers: 'Loyalty Program Members',
  availableRewards: 'Available Rewards',
  pointTransactions: 'Point Transactions',
  
  // Integrations
  integrationsManagement: 'Integrations Management',
  connectYourRestaurant: 'Connect your restaurant system with other platforms and services',
  paymentProcessors: 'Payment Processors',
  deliveryMarketplaces: 'Delivery Marketplaces',
  socialMedia: 'Social Media',
  marketingTools: 'Marketing Tools',
  
  // Settings
  settingsManagement: 'Settings Management',
  manageAccount: 'Manage your account, stores, and application preferences',
  stores: 'Stores',
  applicationPreferences: 'Application Preferences',

  // Data Insights
  dataInsights: 'Data Insights',
  exploreConnections: 'Explore connections and relationships between different data entities in your restaurant',
  connectedCustomers: 'Connected Customers',
  connectedOrders: 'Connected Orders',
  menuItems: 'Menu Items',
  campaignsCoupons: 'Campaigns & Coupons',
  popularMenuItems: 'Popular Menu Items',
  customerRetention: 'Customer Retention',
  
  // Common dashboard elements
  distributionAcrossDays: 'Distribution across days',
  ordersPerDate: 'Orders per Date',
  orderForecast: 'Order Forecast',
  nextDays: 'Next Days',
  historicalData: 'Historical Data',
  futurePredicitions: 'Future Predictions',
  lessThan: 'Less',
  moreThan: 'More',
  customerVisits: 'Customer Visits',
  trafficByHour: 'Traffic by Hour',
};

export default enTranslations;
