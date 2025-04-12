
import { Translations } from "../types/language";

const ptTranslations: Translations = {
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
  language: 'Idioma',
  
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
  'channel-migrationDescription': 'Mova clientes de marketplaces para pedidos diretos',

  // Image optimizer
  imageOptimizer: 'Otimizador de Imagem',
  upload: 'Enviar',
  uploadImage: 'Carregue uma imagem para começar',
  basic: 'Básico',
  filters: 'Filtros',
  brightness: 'Brilho',
  contrast: 'Contraste',
  saturation: 'Saturação',
  sharpness: 'Nitidez',
  reset: 'Redefinir',
  optimizeWithAI: 'Otimizar com IA',
  optimizing: 'Otimizando...',
  apply: 'Aplicar',
  normal: 'Normal',
  imageOptimized: 'Imagem otimizada',
  imageOptimizedDesc: 'Sua imagem foi otimizada com sucesso',

  // Dashboard
  overview: 'Visão Geral',
  detailedAnalytics: 'Análises Detalhadas',
  totalRevenue: 'Receita Total',
  activeCustomers: 'Clientes Ativos',
  customerSegmentation: 'Segmentação de Clientes',
  topPerformingMenuItems: 'Itens do Menu mais Vendidos',
  campaignPerformance: 'Desempenho de Campanhas',
  salesByStore: 'Vendas por Loja',
  customersAndOrdersPerDay: 'Clientes e Pedidos por Dia',
  restaurantPerformance: 'Desempenho do Restaurante',
  customerData: 'Dados de Clientes',
  
  // Menu Management
  menuManagement: 'Gestão de Cardápio',
  createAndManageMenu: 'Crie e gerencie seus itens de cardápio em diferentes canais',
  categories: 'Categorias',
  items: 'Itens',
  
  // Customers
  customerManagement: 'Gestão de Clientes',
  manageCustomerInfo: 'Gerencie as informações e detalhes de contato dos seus clientes',
  
  // Calendar
  calendarManagement: 'Gestão de Calendário',
  scheduleAndManageEvents: 'Agende e gerencie eventos e campanhas de marketing do seu restaurante',
  filterCampaigns: 'Filtrar Campanhas',
  dateRange: 'Intervalo de Datas',
  
  // Coupons
  couponManagement: 'Gestão de Cupons',
  createAndManageCoupons: 'Crie e gerencie cupons de desconto para seus clientes',
  activeCoupons: 'Cupons Ativos',
  inactiveCoupons: 'Cupons Inativos',
  scheduledCoupons: 'Cupons Agendados',
  
  // Loyalty
  loyaltyAndPoints: 'Fidelidade e Pontos',
  manageCustomerLoyalty: 'Gerencie o programa de fidelidade e recompensas para seus clientes',
  totalPointsIssued: 'Total de Pontos Emitidos',
  activeMembers: 'Membros Ativos',
  rewardsClaimed: 'Recompensas Resgatadas',
  memberTiers: 'Níveis de Membros',
  loyaltyProgramMembers: 'Membros do Programa de Fidelidade',
  availableRewards: 'Recompensas Disponíveis',
  pointTransactions: 'Transações de Pontos',
  
  // Integrations
  integrationsManagement: 'Gestão de Integrações',
  connectYourRestaurant: 'Conecte seu sistema de restaurante com outras plataformas e serviços',
  paymentProcessors: 'Processadores de Pagamento',
  deliveryMarketplaces: 'Marketplaces de Entrega',
  socialMedia: 'Redes Sociais',
  marketingTools: 'Ferramentas de Marketing',
  
  // Settings
  settingsManagement: 'Gestão de Configurações',
  manageAccount: 'Gerencie sua conta, lojas e preferências de aplicativo',
  stores: 'Lojas',
  applicationPreferences: 'Preferências do Aplicativo',

  // Data Insights
  dataInsights: 'Análise de Dados',
  exploreConnections: 'Explore conexões e relações entre diferentes entidades de dados no seu restaurante',
  connectedCustomers: 'Clientes Conectados',
  connectedOrders: 'Pedidos Conectados',
  menuItems: 'Itens do Menu',
  campaignsCoupons: 'Campanhas e Cupons',
  popularMenuItems: 'Itens Populares do Menu',
  customerRetention: 'Retenção de Clientes',
  
  // Common dashboard elements
  distributionAcrossDays: 'Distribuição ao longo dos dias',
  ordersPerDate: 'Pedidos por Data',
  orderForecast: 'Previsão de Pedidos',
  nextDays: 'Próximos Dias',
  historicalData: 'Dados Históricos',
  futurePredicitions: 'Previsões Futuras',
  lessThan: 'Menos',
  moreThan: 'Mais',
  customerVisits: 'Visitas de Clientes',
  trafficByHour: 'Tráfego por Hora',
};

export default ptTranslations;
