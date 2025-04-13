
import { Translations } from "../types/language";

const esTranslations: Translations = {
  // General
  cancel: 'Cancelar',
  save: 'Guardar',
  delete: 'Eliminar',
  edit: 'Editar',
  view: 'Ver',
  add: 'Añadir',
  remove: 'Eliminar',
  search: 'Buscar',
  filter: 'Filtrar',
  sort: 'Ordenar',
  show: 'Mostrar',
  hide: 'Ocultar',
  error: 'Error',
  pleaseCompleteAllFields: 'Por favor complete todos los campos',
  use: 'Usar',
  language: 'Idioma',
  
  // Navigation
  dashboard: 'Panel',
  menus: 'Menús',
  orders: 'Pedidos',
  customers: 'Clientes',
  campaigns: 'Campañas',
  calendar: 'Calendario',
  coupons: 'Cupones',
  loyalty: 'Fidelidad',
  integrations: 'Integraciones',
  settings: 'Configuración',
  system: 'Sistema',
  profile: 'Perfil',
  logout: 'Cerrar sesión',
  
  // Orders
  newOrders: 'Nuevo',
  preparing: 'Preparando',
  ready: 'Listo',
  delivering: 'Entregando',
  completed: 'Completado',
  orderNumber: 'Pedido',
  updated: 'actualizado',
  orderPreparingToast: 'El pedido está siendo preparado',
  orderReadyToast: 'El pedido está listo para recoger/entregar',
  orderDeliveringToast: 'El pedido ha salido para entrega',
  orderCompletedToast: 'El pedido ha sido completado',
  orderCancelledToast: 'El pedido ha sido cancelado',
  waitingToBePrepared: 'Esperando preparación',
  currentlyInPreparation: 'En preparación',
  readyForPickupDelivery: 'Listo para recoger/entregar',
  outForDelivery: 'En camino',
  orderManagement: 'Gestión de Pedidos',
  
  // Ordering channels
  mobile: 'Móvil',
  totem: 'Totem',
  whatsapp: 'WhatsApp',
  app: 'Aplicación',
  ifood: 'iFood',
  rappi: 'Rappi',
  other: 'Otro',
  channels: 'Canales',
  
  // Delivery
  assignDelivery: 'Asignar Entrega',
  selectACourier: 'Seleccione un repartidor',
  changeCourier: 'Cambiar Repartidor',
  deliveryAssigned: 'Entrega Asignada',
  hasBeenAssignedToOrder: 'ha sido asignado al pedido',
  deliveryTypeChanged: 'El tipo de entrega ha sido cambiado',
  reassignCourier: 'Reasignar Repartidor',
  currentCourier: 'Repartidor Actual',
  deliveryMethod: 'Método de Entrega',
  ownDelivery: 'Entrega Propia',
  selfDelivery: 'Entrega por Cliente',
  thirdPartyDelivery: 'Tercero',
  selectCourier: 'Seleccionar Repartidor',
  noAvailableCouriers: 'No hay repartidores disponibles',
  courierName: 'Nombre del Repartidor',
  enterCourierName: 'Ingrese nombre del repartidor',
  deliveryCompany: 'Empresa de Entrega',
  selectACompany: 'Seleccione una empresa',
  deliveryAddress: 'Dirección de Entrega',
  noAddress: 'No se proporcionó dirección',
  assign: 'Asignar',
  
  // Couriers
  couriers: 'Repartidores',
  courierUpdated: 'Repartidor Actualizado',
  courierStatusUpdated: 'El estado de disponibilidad del repartidor ha sido actualizado',
  courierAdded: 'Repartidor Añadido',
  courierAddedSuccessfully: 'El repartidor ha sido añadido con éxito',
  courierManagement: 'Gestión de Repartidores',
  manageDeliveryTeam: 'Gestionar equipo de entrega',
  availableCouriers: 'Repartidores Disponibles',
  unavailableCouriers: 'Repartidores No Disponibles',
  available: 'Disponible',
  unavailable: 'No Disponible',
  noUnavailableCouriers: 'No hay repartidores no disponibles',
  addNewCourier: 'Añadir Nuevo Repartidor',
  enterCourierPhone: 'Ingrese teléfono del repartidor',
  addCourier: 'Añadir Repartidor',
  
  // Reports
  reports: 'Informes',
  deliveryReport: 'Informe de Entregas',
  viewDeliveryPerformance: 'Ver métricas de rendimiento de entregas',
  courier: 'Repartidor',
  deliveredOrders: 'Pedidos Entregados',
  totalAmount: 'Importe Total',
  active: 'Activo',
  deliveries: 'Entregas',
  noDeliveriesYet: 'Aún no hay entregas',
  name: 'Nombre',
  phone: 'Teléfono',
  status: 'Estado',
  actions: 'Acciones',
  
  // View options
  kanban: 'Kanban',
  list: 'Lista',
  
  // Language names
  english: 'Inglés',
  portuguese: 'Portugués',
  spanish: 'Español',

  // Campaign related
  presetCampaigns: 'Campañas Preestablecidas',
  chooseTemplates: 'Elija entre plantillas de campañas listas para usar',
  viewAllCampaigns: 'Ver Todas las Campañas',
  allCampaigns: 'Todas las Campañas',
  schedule: 'Programar',
  analytics: 'Análisis',
  scheduled: 'Programadas',
  drafts: 'Borradores',
  marketingCampaigns: 'Campañas de Marketing',
  createManageCampaigns: 'Cree y gestione campañas de marketing para su restaurante.',
  presets: 'Preestablecidas',
  createCampaign: 'Crear Campaña',

  // Campaign categories
  'customer-recovery': 'Recuperación de Clientes',
  'consumption-pattern': 'Patrones de Consumo',
  'channel-migration': 'Migración de Canal',

  // Campaign category descriptions
  'customer-recoveryDescription': 'Recupere clientes que no han pedido en un tiempo',
  'loyaltyDescription': 'Recompense y comprometa a sus clientes fieles',
  'consumption-patternDescription': 'Fomente nuevos comportamientos de consumo',
  'channel-migrationDescription': 'Traslade clientes de marketplaces a pedidos directos',

  // Image optimizer
  imageOptimizer: 'Optimizador de Imagen',
  upload: 'Subir',
  uploadImage: 'Sube una imagen para comenzar',
  basic: 'Básico',
  filters: 'Filtros',
  brightness: 'Brillo',
  contrast: 'Contraste',
  saturation: 'Saturación',
  sharpness: 'Nitidez',
  reset: 'Reiniciar',
  optimizeWithAI: 'Optimizar con IA',
  optimizing: 'Optimizando...',
  apply: 'Aplicar',
  normal: 'Normal',
  imageOptimized: 'Imagen optimizada',
  imageOptimizedDesc: 'Tu imagen ha sido optimizada con éxito',

  // Dashboard
  overview: 'Vista General',
  detailedAnalytics: 'Análisis Detallado',
  totalRevenue: 'Ingresos Totales',
  activeCustomers: 'Clientes Activos',
  customerSegmentation: 'Segmentación de Clientes',
  topPerformingMenuItems: 'Elementos de Menú con Mejor Rendimiento',
  campaignPerformance: 'Rendimiento de Campañas',
  salesByStore: 'Ventas por Tienda',
  customersAndOrdersPerDay: 'Clientes y Pedidos por Día',
  restaurantPerformance: 'Rendimiento del Restaurante',
  customerData: 'Datos de Clientes',
  
  // Menu Management
  menuManagement: 'Gestión de Menú',
  createAndManageMenu: 'Cree y gestione sus elementos de menú a través de diferentes canales',
  categories: 'Categorías',
  items: 'Elementos',
  
  // Customers
  customerManagement: 'Gestión de Clientes',
  manageCustomerInfo: 'Gestione la información y datos de contacto de sus clientes',
  
  // Calendar
  calendarManagement: 'Gestión de Calendario',
  scheduleAndManageEvents: 'Programe y gestione los eventos de su restaurante y campañas de marketing',
  filterCampaigns: 'Filtrar Campañas',
  dateRange: 'Rango de Fechas',
  
  // Coupons
  couponManagement: 'Gestión de Cupones',
  createAndManageCoupons: 'Cree y gestione cupones de descuento para sus clientes',
  activeCoupons: 'Cupones Activos',
  inactiveCoupons: 'Cupones Inactivos',
  scheduledCoupons: 'Cupones Programados',
  
  // Loyalty
  loyaltyAndPoints: 'Fidelidad y Puntos',
  manageCustomerLoyalty: 'Gestione su programa de fidelidad y recompensas para clientes',
  totalPointsIssued: 'Total de Puntos Emitidos',
  activeMembers: 'Miembros Activos',
  rewardsClaimed: 'Recompensas Reclamadas',
  memberTiers: 'Niveles de Miembros',
  loyaltyProgramMembers: 'Miembros del Programa de Fidelidad',
  availableRewards: 'Recompensas Disponibles',
  pointTransactions: 'Transacciones de Puntos',
  
  // Integrations
  integrationsManagement: 'Gestión de Integraciones',
  connectYourRestaurant: 'Conecte su sistema de restaurante con otras plataformas y servicios',
  paymentProcessors: 'Procesadores de Pago',
  deliveryMarketplaces: 'Marketplaces de Entrega',
  socialMedia: 'Redes Sociales',
  marketingTools: 'Herramientas de Marketing',
  
  // Settings
  settingsManagement: 'Gestión de Configuración',
  manageAccount: 'Administre su cuenta, tiendas y preferencias de aplicación',
  stores: 'Tiendas',
  applicationPreferences: 'Preferencias de Aplicación',

  // Data Insights
  dataInsights: 'Análisis de Datos',
  exploreConnections: 'Explore conexiones y relaciones entre diferentes entidades de datos en su restaurante',
  connectedCustomers: 'Clientes Conectados',
  connectedOrders: 'Pedidos Conectados',
  menuItems: 'Elementos de Menú',
  campaignsCoupons: 'Campañas y Cupones',
  popularMenuItems: 'Elementos de Menú Populares',
  customerRetention: 'Retención de Clientes',
  
  // Common dashboard elements
  distributionAcrossDays: 'Distribución a lo largo de los días',
  ordersPerDate: 'Pedidos por Fecha',
  orderForecast: 'Previsión de Pedidos',
  nextDays: 'Próximos Días',
  historicalData: 'Datos Históricos',
  futurePredicitions: 'Predicciones Futuras',
  lessThan: 'Menos',
  moreThan: 'Más',
  customerVisits: 'Visitas de Clientes',
  trafficByHour: 'Tráfico por Hora',
};

export default esTranslations;
