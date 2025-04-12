
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'es';

export type Translations = {
  language: string;
  orders: string;
  couriers: string;
  reports: string;
  orderManagement: string;
  kanban: string;
  list: string;
  show: string;
  hide: string;
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
  orderNumber: string;
  updated: string;
  orderPreparingToast: string;
  orderReadyToast: string;
  orderDeliveringToast: string;
  orderCompletedToast: string;
  orderCancelledToast: string;
  deliveryAssigned: string;
  hasBeenAssignedToOrder: string;
  deliveryTypeChanged: string;
  cancel: string;
  assign: string;
  assignDelivery: string;
  deliveryMethod: string;
  ownDelivery: string;
  selfDelivery: string;
  thirdPartyDelivery: string;
  selectCourier: string;
  selectACourier: string;
  noAvailableCouriers: string;
  courierName: string;
  enterCourierName: string;
  deliveryCompany: string;
  selectACompany: string;
  deliveryAddress: string;
  noAddress: string;
  courierUpdated: string;
  courierStatusUpdated: string;
  courierManagement: string;
  manageDeliveryTeam: string;
  availableCouriers: string;
  unavailableCouriers: string;
  name: string;
  phone: string;
  deliveries: string;
  status: string;
  actions: string;
  available: string;
  unavailable: string;
  noUnavailableCouriers: string;
  addNewCourier: string;
  enterCourierPhone: string;
  addCourier: string;
  courierAdded: string;
  courierAddedSuccessfully: string;
  error: string;
  pleaseCompleteAllFields: string;
  // Add missing translations for Header and Sidebar
  profile: string;
  logout: string;
  system: string;
  // Add new translations for changing courier
  changeCourier: string;
  reassignCourier: string;
  currentCourier: string;
};

const translations: Record<Language, Translations> = {
  en: {
    language: 'English',
    orders: 'Orders',
    couriers: 'Couriers',
    reports: 'Reports',
    orderManagement: 'Order Management',
    kanban: 'Kanban',
    list: 'List',
    show: 'Show',
    hide: 'Hide',
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
    orderNumber: 'Order',
    updated: 'updated',
    orderPreparingToast: 'Order is now being prepared',
    orderReadyToast: 'Order is now ready for pickup/delivery',
    orderDeliveringToast: 'Order is now out for delivery',
    orderCompletedToast: 'Order has been completed',
    orderCancelledToast: 'Order has been cancelled',
    deliveryAssigned: 'Delivery assigned',
    hasBeenAssignedToOrder: 'has been assigned to order',
    deliveryTypeChanged: 'Delivery type has been changed',
    cancel: 'Cancel',
    assign: 'Assign',
    assignDelivery: 'Assign Delivery',
    deliveryMethod: 'Delivery Method',
    ownDelivery: 'Own Courier',
    selfDelivery: 'Self Delivery',
    thirdPartyDelivery: '3rd Party',
    selectCourier: 'Select Courier',
    selectACourier: 'Select a courier',
    noAvailableCouriers: 'No available couriers',
    courierName: 'Courier Name',
    enterCourierName: 'Enter courier name',
    deliveryCompany: 'Delivery Company',
    selectACompany: 'Select a company',
    deliveryAddress: 'Delivery Address',
    noAddress: 'No address provided',
    courierUpdated: 'Courier updated',
    courierStatusUpdated: 'Courier status has been updated',
    courierManagement: 'Courier Management',
    manageDeliveryTeam: 'Manage your delivery team',
    availableCouriers: 'Available Couriers',
    unavailableCouriers: 'Unavailable Couriers',
    name: 'Name',
    phone: 'Phone',
    deliveries: 'Deliveries',
    status: 'Status',
    actions: 'Actions',
    available: 'Available',
    unavailable: 'Unavailable',
    noUnavailableCouriers: 'No unavailable couriers',
    addNewCourier: 'Add New Courier',
    enterCourierPhone: 'Enter courier phone',
    addCourier: 'Add Courier',
    courierAdded: 'Courier added',
    courierAddedSuccessfully: 'Courier was added successfully',
    error: 'Error',
    pleaseCompleteAllFields: 'Please complete all fields',
    // Add missing translations for Header and Sidebar
    profile: 'Profile',
    logout: 'Logout',
    system: 'System',
    // Add new translations for changing courier
    changeCourier: 'Change Courier',
    reassignCourier: 'Reassign Courier',
    currentCourier: 'Current Courier',
  },
  pt: {
    language: 'Português',
    orders: 'Pedidos',
    couriers: 'Entregadores',
    reports: 'Relatórios',
    orderManagement: 'Gestão de Pedidos',
    kanban: 'Kanban',
    list: 'Lista',
    show: 'Mostrar',
    hide: 'Ocultar',
    completed: 'Concluídos',
    channels: 'Canais',
    mobile: 'Mobile',
    totem: 'Totem',
    whatsapp: 'WhatsApp',
    app: 'App',
    ifood: 'iFood',
    rappi: 'Rappi',
    other: 'Outro',
    newOrders: 'Novos Pedidos',
    preparing: 'Preparando',
    ready: 'Pronto',
    delivering: 'Entregando',
    waitingToBePrepared: 'Aguardando preparo',
    currentlyInPreparation: 'Em preparação',
    readyForPickupDelivery: 'Pronto para retirada/entrega',
    outForDelivery: 'Em entrega',
    orderNumber: 'Pedido',
    updated: 'atualizado',
    orderPreparingToast: 'Pedido está sendo preparado',
    orderReadyToast: 'Pedido está pronto para retirada/entrega',
    orderDeliveringToast: 'Pedido está em entrega',
    orderCompletedToast: 'Pedido foi concluído',
    orderCancelledToast: 'Pedido foi cancelado',
    deliveryAssigned: 'Entrega atribuída',
    hasBeenAssignedToOrder: 'foi designado para o pedido',
    deliveryTypeChanged: 'Tipo de entrega foi alterado',
    cancel: 'Cancelar',
    assign: 'Atribuir',
    assignDelivery: 'Atribuir Entrega',
    deliveryMethod: 'Método de Entrega',
    ownDelivery: 'Entregador Próprio',
    selfDelivery: 'Auto Entrega',
    thirdPartyDelivery: 'Terceirizado',
    selectCourier: 'Selecione o Entregador',
    selectACourier: 'Selecione um entregador',
    noAvailableCouriers: 'Nenhum entregador disponível',
    courierName: 'Nome do Entregador',
    enterCourierName: 'Digite o nome do entregador',
    deliveryCompany: 'Empresa de Entrega',
    selectACompany: 'Selecione uma empresa',
    deliveryAddress: 'Endereço de Entrega',
    noAddress: 'Sem endereço fornecido',
    courierUpdated: 'Entregador atualizado',
    courierStatusUpdated: 'Status do entregador foi atualizado',
    courierManagement: 'Gestão de Entregadores',
    manageDeliveryTeam: 'Gerencie sua equipe de entrega',
    availableCouriers: 'Entregadores Disponíveis',
    unavailableCouriers: 'Entregadores Indisponíveis',
    name: 'Nome',
    phone: 'Telefone',
    deliveries: 'Entregas',
    status: 'Status',
    actions: 'Ações',
    available: 'Disponível',
    unavailable: 'Indisponível',
    noUnavailableCouriers: 'Nenhum entregador indisponível',
    addNewCourier: 'Adicionar Novo Entregador',
    enterCourierPhone: 'Digite o telefone do entregador',
    addCourier: 'Adicionar Entregador',
    courierAdded: 'Entregador adicionado',
    courierAddedSuccessfully: 'Entregador foi adicionado com sucesso',
    error: 'Erro',
    pleaseCompleteAllFields: 'Por favor, preencha todos os campos',
    // Add missing translations for Header and Sidebar
    profile: 'Perfil',
    logout: 'Sair',
    system: 'Sistema',
    // Add new translations for changing courier
    changeCourier: 'Mudar Entregador',
    reassignCourier: 'Reatribuir Entregador',
    currentCourier: 'Entregador Atual',
  },
  es: {
    language: 'Español',
    orders: 'Pedidos',
    couriers: 'Repartidores',
    reports: 'Informes',
    orderManagement: 'Gestión de Pedidos',
    kanban: 'Kanban',
    list: 'Lista',
    show: 'Mostrar',
    hide: 'Ocultar',
    completed: 'Completados',
    channels: 'Canales',
    mobile: 'Móvil',
    totem: 'Totem',
    whatsapp: 'WhatsApp',
    app: 'App',
    ifood: 'iFood',
    rappi: 'Rappi',
    other: 'Otro',
    newOrders: 'Nuevos Pedidos',
    preparing: 'Preparando',
    ready: 'Listo',
    delivering: 'Entregando',
    waitingToBePrepared: 'Esperando preparación',
    currentlyInPreparation: 'En preparación',
    readyForPickupDelivery: 'Listo para recogida/entrega',
    outForDelivery: 'En camino',
    orderNumber: 'Pedido',
    updated: 'actualizado',
    orderPreparingToast: 'El pedido está siendo preparado',
    orderReadyToast: 'El pedido está listo para recogida/entrega',
    orderDeliveringToast: 'El pedido está en entrega',
    orderCompletedToast: 'El pedido ha sido completado',
    orderCancelledToast: 'El pedido ha sido cancelado',
    deliveryAssigned: 'Entrega asignada',
    hasBeenAssignedToOrder: 'ha sido asignado al pedido',
    deliveryTypeChanged: 'Tipo de entrega ha sido cambiado',
    cancel: 'Cancelar',
    assign: 'Asignar',
    assignDelivery: 'Asignar Entrega',
    deliveryMethod: 'Método de Entrega',
    ownDelivery: 'Repartidor Propio',
    selfDelivery: 'Auto Entrega',
    thirdPartyDelivery: 'Terceros',
    selectCourier: 'Seleccionar Repartidor',
    selectACourier: 'Seleccione un repartidor',
    noAvailableCouriers: 'No hay repartidores disponibles',
    courierName: 'Nombre del Repartidor',
    enterCourierName: 'Ingrese nombre del repartidor',
    deliveryCompany: 'Empresa de Reparto',
    selectACompany: 'Seleccione una empresa',
    deliveryAddress: 'Dirección de Entrega',
    noAddress: 'No se proporcionó dirección',
    courierUpdated: 'Repartidor actualizado',
    courierStatusUpdated: 'Estado del repartidor ha sido actualizado',
    courierManagement: 'Gestión de Repartidores',
    manageDeliveryTeam: 'Administre su equipo de entrega',
    availableCouriers: 'Repartidores Disponibles',
    unavailableCouriers: 'Repartidores No Disponibles',
    name: 'Nombre',
    phone: 'Teléfono',
    deliveries: 'Entregas',
    status: 'Estado',
    actions: 'Acciones',
    available: 'Disponible',
    unavailable: 'No Disponible',
    noUnavailableCouriers: 'No hay repartidores no disponibles',
    addNewCourier: 'Añadir Nuevo Repartidor',
    enterCourierPhone: 'Ingrese teléfono del repartidor',
    addCourier: 'Añadir Repartidor',
    courierAdded: 'Repartidor añadido',
    courierAddedSuccessfully: 'Repartidor fue añadido con éxito',
    error: 'Error',
    pleaseCompleteAllFields: 'Por favor complete todos los campos',
    // Add missing translations for Header and Sidebar
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    system: 'Sistema',
    // Add new translations for changing courier
    changeCourier: 'Cambiar Repartidor',
    reassignCourier: 'Reasignar Repartidor',
    currentCourier: 'Repartidor Actual',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  translations: translations.en
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
