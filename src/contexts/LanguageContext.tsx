
import React, { createContext, useContext, useState } from 'react';

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
}

// Define translations
const translations: Record<Language, Translations> = {
  en: {
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
    'channel-migrationDescription': 'Move customers from marketplaces to direct ordering'
  },
  pt: {
    // General
    cancel: 'Cancelar',
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    view: 'Visualizar',
    add: 'Adicionar',
    remove: 'Remover',
    search: 'Buscar',
    filter: 'Filtrar',
    sort: 'Ordenar',
    show: 'Mostrar',
    hide: 'Ocultar',
    error: 'Erro',
    pleaseCompleteAllFields: 'Por favor, preencha todos os campos',
    use: 'Usar',
    
    // Navigation
    dashboard: 'Painel',
    menus: 'Cardápios',
    orders: 'Pedidos',
    customers: 'Clientes',
    campaigns: 'Campanhas',
    calendar: 'Calendário',
    coupons: 'Cupons',
    loyalty: 'Fidelidade',
    integrations: 'Integrações',
    settings: 'Configurações',
    system: 'Sistema',
    profile: 'Perfil',
    logout: 'Sair',
    
    // Orders
    newOrders: 'Novo',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivering: 'Entregando',
    completed: 'Concluído',
    orderNumber: 'Pedido',
    updated: 'atualizado',
    orderPreparingToast: 'Pedido está sendo preparado',
    orderReadyToast: 'Pedido está pronto para retirada/entrega',
    orderDeliveringToast: 'Pedido saiu para entrega',
    orderCompletedToast: 'Pedido foi concluído',
    orderCancelledToast: 'Pedido foi cancelado',
    waitingToBePrepared: 'Aguardando preparo',
    currentlyInPreparation: 'Em preparo',
    readyForPickupDelivery: 'Pronto para retirada/entrega',
    outForDelivery: 'Saiu para entrega',
    orderManagement: 'Gestão de Pedidos',
    
    // Ordering channels
    mobile: 'Celular',
    totem: 'Totem',
    whatsapp: 'WhatsApp',
    app: 'Aplicativo',
    ifood: 'iFood',
    rappi: 'Rappi',
    other: 'Outro',
    channels: 'Canais',
    
    // Delivery
    assignDelivery: 'Atribuir Entrega',
    selectACourier: 'Selecione um entregador',
    changeCourier: 'Trocar Entregador',
    deliveryAssigned: 'Entrega Atribuída',
    hasBeenAssignedToOrder: 'foi atribuído ao pedido',
    deliveryTypeChanged: 'Tipo de entrega foi alterado',
    reassignCourier: 'Reatribuir Entregador',
    currentCourier: 'Entregador Atual',
    deliveryMethod: 'Método de Entrega',
    ownDelivery: 'Entrega Própria',
    selfDelivery: 'Entrega pelo Cliente',
    thirdPartyDelivery: 'Terceirizado',
    selectCourier: 'Selecionar Entregador',
    noAvailableCouriers: 'Sem entregadores disponíveis',
    courierName: 'Nome do Entregador',
    enterCourierName: 'Digite o nome do entregador',
    deliveryCompany: 'Empresa de Entrega',
    selectACompany: 'Selecione uma empresa',
    deliveryAddress: 'Endereço de Entrega',
    noAddress: 'Nenhum endereço fornecido',
    assign: 'Atribuir',
    
    // Couriers
    couriers: 'Entregadores',
    courierUpdated: 'Entregador Atualizado',
    courierStatusUpdated: 'Status de disponibilidade do entregador foi atualizado',
    courierAdded: 'Entregador Adicionado',
    courierAddedSuccessfully: 'Entregador foi adicionado com sucesso',
    courierManagement: 'Gestão de Entregadores',
    manageDeliveryTeam: 'Gerenciar equipe de entrega',
    availableCouriers: 'Entregadores Disponíveis',
    unavailableCouriers: 'Entregadores Indisponíveis',
    available: 'Disponível',
    unavailable: 'Indisponível',
    noUnavailableCouriers: 'Sem entregadores indisponíveis',
    addNewCourier: 'Adicionar Novo Entregador',
    enterCourierPhone: 'Digite o telefone do entregador',
    addCourier: 'Adicionar Entregador',
    
    // Reports
    reports: 'Relatórios',
    deliveryReport: 'Relatório de Entregas',
    viewDeliveryPerformance: 'Ver métricas de desempenho de entregas',
    courier: 'Entregador',
    deliveredOrders: 'Pedidos Entregues',
    totalAmount: 'Valor Total',
    active: 'Ativo',
    deliveries: 'Entregas',
    noDeliveriesYet: 'Nenhuma entrega ainda',
    name: 'Nome',
    phone: 'Telefone',
    status: 'Status',
    actions: 'Ações',
    
    // View options
    kanban: 'Kanban',
    list: 'Lista',
    
    // Language names
    english: 'Inglês',
    portuguese: 'Português',
    spanish: 'Espanhol',

    // Campaign related
    presetCampaigns: 'Campanhas Predefinidas',
    chooseTemplates: 'Escolha entre modelos de campanhas prontos para uso',
    viewAllCampaigns: 'Ver Todas as Campanhas',
    allCampaigns: 'Todas as Campanhas',
    schedule: 'Agendar',
    analytics: 'Análises',
    scheduled: 'Agendadas',
    drafts: 'Rascunhos',
    marketingCampaigns: 'Campanhas de Marketing',
    createManageCampaigns: 'Crie e gerencie campanhas de marketing para seu restaurante.',
    presets: 'Predefinidas',
    createCampaign: 'Criar Campanha',

    // Campaign categories
    'customer-recovery': 'Recuperação de Clientes',
    'consumption-pattern': 'Padrões de Consumo',
    'channel-migration': 'Migração de Canal',

    // Campaign category descriptions
    'customer-recoveryDescription': 'Recupere clientes que não fazem pedidos há algum tempo',
    'loyaltyDescription': 'Recompense e engaje seus clientes fiéis',
    'consumption-patternDescription': 'Incentive novos comportamentos de consumo',
    'channel-migrationDescription': 'Mova clientes de marketplaces para pedidos diretos'
  },
  es: {
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
    'channel-migrationDescription': 'Traslade clientes de marketplaces a pedidos directos'
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    translations: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
