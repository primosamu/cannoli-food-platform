
export type Language = 'en' | 'pt' | 'es';

export interface Translations {
  // General
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  view: string;
  add: string;
  remove: string;
  search: string;
  filter: string;
  sort: string;
  show: string;
  hide: string;
  error: string;
  pleaseCompleteAllFields: string;
  use: string;
  language: string;
  
  // Navigation
  dashboard: string;
  menus: string;
  orders: string;
  customers: string;
  campaigns: string;
  calendar: string;
  coupons: string;
  loyalty: string;
  integrations: string;
  settings: string;
  system: string;
  profile: string;
  logout: string;
  
  // Orders
  newOrders: string;
  preparing: string;
  ready: string;
  delivering: string;
  completed: string;
  orderNumber: string;
  updated: string;
  orderPreparingToast: string;
  orderReadyToast: string;
  orderDeliveringToast: string;
  orderCompletedToast: string;
  orderCancelledToast: string;
  waitingToBePrepared: string;
  currentlyInPreparation: string;
  readyForPickupDelivery: string;
  outForDelivery: string;
  orderManagement: string;
  
  // Ordering channels
  mobile: string;
  totem: string;
  whatsapp: string;
  app: string;
  ifood: string;
  rappi: string;
  other: string;
  channels: string;
  
  // Delivery
  assignDelivery: string;
  selectACourier: string;
  changeCourier: string;
  deliveryAssigned: string;
  hasBeenAssignedToOrder: string;
  deliveryTypeChanged: string;
  reassignCourier: string;
  currentCourier: string;
  deliveryMethod: string;
  ownDelivery: string;
  selfDelivery: string;
  thirdPartyDelivery: string;
  selectCourier: string;
  noAvailableCouriers: string;
  courierName: string;
  enterCourierName: string;
  deliveryCompany: string;
  selectACompany: string;
  deliveryAddress: string;
  noAddress: string;
  assign: string;
  
  // Couriers
  couriers: string;
  courierUpdated: string;
  courierStatusUpdated: string;
  courierAdded: string;
  courierAddedSuccessfully: string;
  courierManagement: string;
  manageDeliveryTeam: string;
  availableCouriers: string;
  unavailableCouriers: string;
  available: string;
  unavailable: string;
  noUnavailableCouriers: string;
  addNewCourier: string;
  enterCourierPhone: string;
  addCourier: string;
  
  // Reports
  reports: string;
  deliveryReport: string;
  viewDeliveryPerformance: string;
  courier: string;
  deliveredOrders: string;
  totalAmount: string;
  active: string;
  deliveries: string;
  noDeliveriesYet: string;
  name: string;
  phone: string;
  status: string;
  actions: string;
  
  // View options
  kanban: string;
  list: string;
  
  // Language names
  english: string;
  portuguese: string;
  spanish: string;

  // Campaign related
  presetCampaigns: string;
  chooseTemplates: string;
  viewAllCampaigns: string;
  allCampaigns: string;
  schedule: string;
  analytics: string;
  scheduled: string;
  drafts: string;
  marketingCampaigns: string;
  createManageCampaigns: string;
  presets: string;
  createCampaign: string;

  // Campaign categories
  'customer-recovery': string;
  'consumption-pattern': string;
  'channel-migration': string;

  // Campaign category descriptions
  'customer-recoveryDescription': string;
  'loyaltyDescription': string;
  'consumption-patternDescription': string;
  'channel-migrationDescription': string;

  // Image optimizer
  imageOptimizer: string;
  upload: string;
  uploadImage: string;
  basic: string;
  filters: string;
  brightness: string;
  contrast: string;
  saturation: string;
  sharpness: string;
  reset: string;
  optimizeWithAI: string;
  optimizing: string;
  apply: string;
  normal: string;
  imageOptimized: string;
  imageOptimizedDesc: string;

  // Dashboard
  overview: string;
  detailedAnalytics: string;
  totalRevenue: string;
  activeCustomers: string;
  customerSegmentation: string;
  topPerformingMenuItems: string;
  campaignPerformance: string;
  salesByStore: string;
  customersAndOrdersPerDay: string;
  restaurantPerformance: string;
  customerData: string;
  
  // Menu Management
  menuManagement: string;
  createAndManageMenu: string;
  categories: string;
  items: string;
  
  // Customers
  customerManagement: string;
  manageCustomerInfo: string;
  
  // Calendar
  calendarManagement: string;
  scheduleAndManageEvents: string;
  filterCampaigns: string;
  dateRange: string;
  
  // Coupons
  couponManagement: string;
  createAndManageCoupons: string;
  activeCoupons: string;
  inactiveCoupons: string;
  scheduledCoupons: string;
  
  // Loyalty
  loyaltyAndPoints: string;
  manageCustomerLoyalty: string;
  totalPointsIssued: string;
  activeMembers: string;
  rewardsClaimed: string;
  memberTiers: string;
  loyaltyProgramMembers: string;
  availableRewards: string;
  pointTransactions: string;
  
  // Integrations
  integrationsManagement: string;
  connectYourRestaurant: string;
  paymentProcessors: string;
  deliveryMarketplaces: string;
  socialMedia: string;
  marketingTools: string;
  
  // Settings
  settingsManagement: string;
  manageAccount: string;
  stores: string;
  applicationPreferences: string;

  // Data Insights
  dataInsights: string;
  exploreConnections: string;
  connectedCustomers: string;
  connectedOrders: string;
  menuItems: string;
  campaignsCoupons: string;
  popularMenuItems: string;
  customerRetention: string;
  
  // Common dashboard elements
  distributionAcrossDays: string;
  ordersPerDate: string;
  orderForecast: string;
  nextDays: string;
  historicalData: string;
  futurePredicitions: string;
  lessThan: string;
  moreThan: string;
  customerVisits: string;
  trafficByHour: string;
}
