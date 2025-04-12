
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
  
  // Couriers
  couriers: string;
  courierUpdated: string;
  courierStatusUpdated: string;

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
  
  // View options
  kanban: string;
  list: string;
  
  // Language names
  english: string;
  portuguese: string;
  spanish: string;
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
    
    // Couriers
    couriers: 'Couriers',
    courierUpdated: 'Courier Updated',
    courierStatusUpdated: 'Courier availability status has been updated',
    
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
    
    // View options
    kanban: 'Kanban',
    list: 'List',
    
    // Language names
    english: 'English',
    portuguese: 'Portuguese',
    spanish: 'Spanish'
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
    
    // Couriers
    couriers: 'Entregadores',
    courierUpdated: 'Entregador Atualizado',
    courierStatusUpdated: 'Status de disponibilidade do entregador foi atualizado',
    
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
    
    // View options
    kanban: 'Kanban',
    list: 'Lista',
    
    // Language names
    english: 'Inglês',
    portuguese: 'Português',
    spanish: 'Espanhol'
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
    
    // Couriers
    couriers: 'Repartidores',
    courierUpdated: 'Repartidor Actualizado',
    courierStatusUpdated: 'El estado de disponibilidad del repartidor ha sido actualizado',
    
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
    
    // View options
    kanban: 'Kanban',
    list: 'Lista',
    
    // Language names
    english: 'Inglés',
    portuguese: 'Portugués',
    spanish: 'Español'
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
