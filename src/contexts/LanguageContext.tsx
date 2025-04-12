
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'pt' | 'es';

interface Translations {
  // Navigation and general UI
  dashboard: string;
  orders: string;
  coupons: string;
  campaigns: string;
  customers: string;
  menus: string;
  calendar: string;
  loyalty: string;
  integrations: string;
  settings: string;
  
  // Order management
  orderManagement: string;
  kanban: string;
  list: string;
  hide: string;
  show: string;
  completed: string;
  channels: string;
  mobile: string;
  totem: string;
  whatsapp: string;
  app: string;
  ifood: string;
  rappi: string;
  other: string;
  newOrders: string;
  preparing: string;
  ready: string;
  delivering: string;
  waitingToBePrepared: string;
  currentlyInPreparation: string;
  readyForPickupDelivery: string;
  outForDelivery: string;
  
  // Order status change messages
  orderPreparingToast: string;
  orderReadyToast: string;
  orderDeliveringToast: string;
  orderCompletedToast: string;
  orderCancelledToast: string;
  orderNumber: string;
  updated: string;
  
  // Courier management
  couriers: string;
  reports: string;
  courierManagement: string;
  manageDeliveryTeam: string;
  availableCouriers: string;
  unavailableCouriers: string;
  noAvailableCouriers: string;
  noUnavailableCouriers: string;
  addNewCourier: string;
  name: string;
  phone: string;
  deliveries: string;
  status: string;
  actions: string;
  available: string;
  unavailable: string;
  cancel: string;
  addCourier: string;
  enterCourierName: string;
  enterCourierPhone: string;
  courierAdded: string;
  courierAddedSuccessfully: string;
  courierUpdated: string;
  courierStatusUpdated: string;
  error: string;
  pleaseCompleteAllFields: string;
  
  // Delivery assignment
  assignDelivery: string;
  deliveryAssigned: string;
  hasBeenAssignedToOrder: string;
  deliveryTypeChanged: string;
  courierName: string;
  deliveryAddress: string;
  noAddress: string;
  assign: string;
  deliveryMethod: string;
  ownDelivery: string;
  selfDelivery: string;
  thirdPartyDelivery: string;
  selectCourier: string;
  selectACourier: string;
  deliveryCompany: string;
  selectACompany: string;
  
  // Delivery report
  deliveryReport: string;
  viewDeliveryPerformance: string;
  courier: string;
  deliveredOrders: string;
  totalAmount: string;
  active: string;
  noDeliveriesYet: string;
  
  // Languages
  english: string;
  portuguese: string;
  spanish: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
}

// Define translations
const translationsData: Record<Language, Translations> = {
  en: {
    // Navigation and general UI
    dashboard: 'Dashboard',
    orders: 'Orders',
    coupons: 'Coupons',
    campaigns: 'Campaigns',
    customers: 'Customers',
    menus: 'Menus',
    calendar: 'Calendar',
    loyalty: 'Loyalty',
    integrations: 'Integrations',
    settings: 'Settings',
    
    // Order management
    orderManagement: 'Order Management',
    kanban: 'Kanban',
    list: 'List',
    hide: 'Hide',
    show: 'Show',
    completed: 'Completed',
    channels: 'Channels',
    mobile: 'Mobile',
    totem: 'Totem',
    whatsapp: 'WhatsApp',
    app: 'App',
    ifood: 'iFood',
    rappi: 'Rappi',
    other: 'Other',
    newOrders: 'New Orders',
    preparing: 'Preparing',
    ready: 'Ready',
    delivering: 'Delivering',
    waitingToBePrepared: 'Waiting to be prepared',
    currentlyInPreparation: 'Currently in preparation',
    readyForPickupDelivery: 'Ready for pickup/delivery',
    outForDelivery: 'Out for delivery',
    
    // Order status change messages
    orderPreparingToast: 'Order is now being prepared',
    orderReadyToast: 'Order is ready for pickup/delivery',
    orderDeliveringToast: 'Order is out for delivery',
    orderCompletedToast: 'Order completed successfully',
    orderCancelledToast: 'Order has been cancelled',
    orderNumber: 'Order',
    updated: 'Updated',
    
    // Courier management
    couriers: 'Couriers',
    reports: 'Reports',
    courierManagement: 'Courier Management',
    manageDeliveryTeam: 'Manage your delivery team and track performance',
    availableCouriers: 'Available Couriers',
    unavailableCouriers: 'Unavailable Couriers',
    noAvailableCouriers: 'No available couriers',
    noUnavailableCouriers: 'No unavailable couriers',
    addNewCourier: 'Add New Courier',
    name: 'Name',
    phone: 'Phone',
    deliveries: 'Deliveries',
    status: 'Status',
    actions: 'Actions',
    available: 'Available',
    unavailable: 'Unavailable',
    cancel: 'Cancel',
    addCourier: 'Add Courier',
    enterCourierName: 'Enter courier name',
    enterCourierPhone: 'Enter courier phone',
    courierAdded: 'Courier Added',
    courierAddedSuccessfully: 'Courier has been added successfully',
    courierUpdated: 'Courier Updated',
    courierStatusUpdated: 'Courier availability status has been updated',
    error: 'Error',
    pleaseCompleteAllFields: 'Please complete all required fields',
    
    // Delivery assignment
    assignDelivery: 'Assign Delivery',
    deliveryAssigned: 'Delivery Assigned',
    hasBeenAssignedToOrder: 'has been assigned to order',
    deliveryTypeChanged: 'Delivery type has been updated',
    courierName: 'Courier Name',
    deliveryAddress: 'Delivery Address',
    noAddress: 'No address provided',
    assign: 'Assign',
    deliveryMethod: 'Delivery Method',
    ownDelivery: 'Own Courier',
    selfDelivery: 'Customer Courier',
    thirdPartyDelivery: 'Third Party',
    selectCourier: 'Select Courier',
    selectACourier: 'Select a courier',
    deliveryCompany: 'Delivery Company',
    selectACompany: 'Select a company',
    
    // Delivery report
    deliveryReport: 'Delivery Report',
    viewDeliveryPerformance: 'View delivery performance and statistics',
    courier: 'Courier',
    deliveredOrders: 'Delivered Orders',
    totalAmount: 'Total Amount',
    active: 'active',
    noDeliveriesYet: 'No deliveries recorded yet',
    
    // Languages
    english: 'English',
    portuguese: 'Portuguese',
    spanish: 'Spanish'
  },
  pt: {
    // Navigation and general UI
    dashboard: 'Painel',
    orders: 'Pedidos',
    coupons: 'Cupons',
    campaigns: 'Campanhas',
    customers: 'Clientes',
    menus: 'Cardápios',
    calendar: 'Calendário',
    loyalty: 'Fidelidade',
    integrations: 'Integrações',
    settings: 'Configurações',
    
    // Order management
    orderManagement: 'Gestão de Pedidos',
    kanban: 'Kanban',
    list: 'Lista',
    hide: 'Ocultar',
    show: 'Mostrar',
    completed: 'Concluídos',
    channels: 'Canais',
    mobile: 'Mobile',
    totem: 'Totem',
    whatsapp: 'WhatsApp',
    app: 'App',
    ifood: 'iFood',
    rappi: 'Rappi',
    other: 'Outros',
    newOrders: 'Novos Pedidos',
    preparing: 'Preparando',
    ready: 'Prontos',
    delivering: 'Entregando',
    waitingToBePrepared: 'Aguardando preparo',
    currentlyInPreparation: 'Em preparação',
    readyForPickupDelivery: 'Prontos para retirada/entrega',
    outForDelivery: 'Saiu para entrega',
    
    // Order status change messages
    orderPreparingToast: 'Pedido está sendo preparado',
    orderReadyToast: 'Pedido está pronto para retirada/entrega',
    orderDeliveringToast: 'Pedido saiu para entrega',
    orderCompletedToast: 'Pedido concluído com sucesso',
    orderCancelledToast: 'Pedido foi cancelado',
    orderNumber: 'Pedido',
    updated: 'Atualizado',
    
    // Courier management
    couriers: 'Entregadores',
    reports: 'Relatórios',
    courierManagement: 'Gestão de Entregadores',
    manageDeliveryTeam: 'Gerencie sua equipe de entrega e acompanhe o desempenho',
    availableCouriers: 'Entregadores Disponíveis',
    unavailableCouriers: 'Entregadores Indisponíveis',
    noAvailableCouriers: 'Não há entregadores disponíveis',
    noUnavailableCouriers: 'Não há entregadores indisponíveis',
    addNewCourier: 'Adicionar Novo Entregador',
    name: 'Nome',
    phone: 'Telefone',
    deliveries: 'Entregas',
    status: 'Status',
    actions: 'Ações',
    available: 'Disponível',
    unavailable: 'Indisponível',
    cancel: 'Cancelar',
    addCourier: 'Adicionar Entregador',
    enterCourierName: 'Digite o nome do entregador',
    enterCourierPhone: 'Digite o telefone do entregador',
    courierAdded: 'Entregador Adicionado',
    courierAddedSuccessfully: 'Entregador foi adicionado com sucesso',
    courierUpdated: 'Entregador Atualizado',
    courierStatusUpdated: 'Status de disponibilidade do entregador foi atualizado',
    error: 'Erro',
    pleaseCompleteAllFields: 'Por favor, preencha todos os campos obrigatórios',
    
    // Delivery assignment
    assignDelivery: 'Designar Entrega',
    deliveryAssigned: 'Entrega Designada',
    hasBeenAssignedToOrder: 'foi designado para o pedido',
    deliveryTypeChanged: 'Tipo de entrega foi atualizado',
    courierName: 'Nome do Entregador',
    deliveryAddress: 'Endereço de Entrega',
    noAddress: 'Nenhum endereço fornecido',
    assign: 'Designar',
    deliveryMethod: 'Método de Entrega',
    ownDelivery: 'Entregador Próprio',
    selfDelivery: 'Entregador do Cliente',
    thirdPartyDelivery: 'Terceirizado',
    selectCourier: 'Selecionar Entregador',
    selectACourier: 'Selecione um entregador',
    deliveryCompany: 'Empresa de Entrega',
    selectACompany: 'Selecione uma empresa',
    
    // Delivery report
    deliveryReport: 'Relatório de Entregas',
    viewDeliveryPerformance: 'Visualize o desempenho e estatísticas de entregas',
    courier: 'Entregador',
    deliveredOrders: 'Pedidos Entregues',
    totalAmount: 'Valor Total',
    active: 'ativo',
    noDeliveriesYet: 'Nenhuma entrega registrada ainda',
    
    // Languages
    english: 'Inglês',
    portuguese: 'Português',
    spanish: 'Espanhol'
  },
  es: {
    // Navigation and general UI
    dashboard: 'Tablero',
    orders: 'Pedidos',
    coupons: 'Cupones',
    campaigns: 'Campañas',
    customers: 'Clientes',
    menus: 'Menús',
    calendar: 'Calendario',
    loyalty: 'Fidelidad',
    integrations: 'Integraciones',
    settings: 'Ajustes',
    
    // Order management
    orderManagement: 'Gestión de Pedidos',
    kanban: 'Kanban',
    list: 'Lista',
    hide: 'Ocultar',
    show: 'Mostrar',
    completed: 'Completados',
    channels: 'Canales',
    mobile: 'Móvil',
    totem: 'Totem',
    whatsapp: 'WhatsApp',
    app: 'App',
    ifood: 'iFood',
    rappi: 'Rappi',
    other: 'Otros',
    newOrders: 'Nuevos Pedidos',
    preparing: 'Preparando',
    ready: 'Listos',
    delivering: 'Entregando',
    waitingToBePrepared: 'Esperando preparación',
    currentlyInPreparation: 'En preparación',
    readyForPickupDelivery: 'Listos para recoger/entregar',
    outForDelivery: 'En camino',
    
    // Order status change messages
    orderPreparingToast: 'El pedido está siendo preparado',
    orderReadyToast: 'El pedido está listo para recoger/entregar',
    orderDeliveringToast: 'El pedido está en camino',
    orderCompletedToast: 'Pedido completado exitosamente',
    orderCancelledToast: 'El pedido ha sido cancelado',
    orderNumber: 'Pedido',
    updated: 'Actualizado',
    
    // Courier management
    couriers: 'Repartidores',
    reports: 'Informes',
    courierManagement: 'Gestión de Repartidores',
    manageDeliveryTeam: 'Gestiona tu equipo de reparto y sigue el rendimiento',
    availableCouriers: 'Repartidores Disponibles',
    unavailableCouriers: 'Repartidores No Disponibles',
    noAvailableCouriers: 'No hay repartidores disponibles',
    noUnavailableCouriers: 'No hay repartidores no disponibles',
    addNewCourier: 'Añadir Nuevo Repartidor',
    name: 'Nombre',
    phone: 'Teléfono',
    deliveries: 'Entregas',
    status: 'Estado',
    actions: 'Acciones',
    available: 'Disponible',
    unavailable: 'No Disponible',
    cancel: 'Cancelar',
    addCourier: 'Añadir Repartidor',
    enterCourierName: 'Ingrese nombre del repartidor',
    enterCourierPhone: 'Ingrese teléfono del repartidor',
    courierAdded: 'Repartidor Añadido',
    courierAddedSuccessfully: 'El repartidor ha sido añadido exitosamente',
    courierUpdated: 'Repartidor Actualizado',
    courierStatusUpdated: 'El estado de disponibilidad del repartidor ha sido actualizado',
    error: 'Error',
    pleaseCompleteAllFields: 'Por favor, complete todos los campos requeridos',
    
    // Delivery assignment
    assignDelivery: 'Asignar Entrega',
    deliveryAssigned: 'Entrega Asignada',
    hasBeenAssignedToOrder: 'ha sido asignado al pedido',
    deliveryTypeChanged: 'El tipo de entrega ha sido actualizado',
    courierName: 'Nombre del Repartidor',
    deliveryAddress: 'Dirección de Entrega',
    noAddress: 'No se proporcionó dirección',
    assign: 'Asignar',
    deliveryMethod: 'Método de Entrega',
    ownDelivery: 'Repartidor Propio',
    selfDelivery: 'Repartidor del Cliente',
    thirdPartyDelivery: 'Tercero',
    selectCourier: 'Seleccionar Repartidor',
    selectACourier: 'Seleccione un repartidor',
    deliveryCompany: 'Empresa de Entrega',
    selectACompany: 'Seleccione una empresa',
    
    // Delivery report
    deliveryReport: 'Informe de Entregas',
    viewDeliveryPerformance: 'Ver rendimiento y estadísticas de entregas',
    courier: 'Repartidor',
    deliveredOrders: 'Pedidos Entregados',
    totalAmount: 'Monto Total',
    active: 'activo',
    noDeliveriesYet: 'Aún no se han registrado entregas',
    
    // Languages
    english: 'Inglés',
    portuguese: 'Portugués',
    spanish: 'Español'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations: translationsData[language] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
