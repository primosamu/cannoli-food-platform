
export type CampaignType = 'whatsapp' | 'sms' | 'email' | 'paid' | 'rcs';

export type CampaignTemplate = {
  id: string;
  name: string;
  type: CampaignType;
  subject?: string;
  content: string;
  description: string;
  imageUrl?: string;
  platform?: string; // Para tráfego pago (meta, google, etc)
  category?: string;
  inactiveDays?: string;
  audienceType?: 'all' | 'segment' | 'custom'; // Tipo de audiência
  audienceSegmentId?: string; // ID do segmento de audiência
  audienceSize?: number; // Tamanho estimado da audiência
  targetAudience?: {
    age?: string;
    location?: string;
    interests?: string[];
    keywords?: string[];
    remarketing?: boolean;
    daysVisited?: number;
  }; // Configuração específica para tráfego pago
};

export type CampaignData = {
  id: string;
  name: string;
  type: CampaignType;
  subject?: string;
  content: string;
  imageUrl?: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  scheduledDate?: Date;
  audienceSize?: number;
  createdAt: Date;
  updatedAt: Date;
  menuIds?: string[];  // IDs dos menus associados a esta campanha
  deliveryPlatforms?: string[];  // Plataformas de entrega associadas
  platform?: string; // Para tráfego pago (meta, google, etc)
  incentiveType?: 'coupon' | 'loyalty' | 'none';
  couponId?: string;
  loyaltyPoints?: number;
  audienceType?: 'all' | 'segment' | 'custom';
  audienceSegmentId?: string;
  channels: CampaignType[];
  inactiveDays?: string; // Campo para campanhas de recuperação de clientes
  // Campos para rastreamento de desempenho da campanha
  deliveredCount?: number;
  openedCount?: number;
  clickedCount?: number;
  failedCount?: number;
  reportData?: CampaignReportData;
  targetAudience?: {
    age?: string;
    location?: string;
    interests?: string[];
    keywords?: string[];
    remarketing?: boolean;
    daysVisited?: number;
  }; // Configuração específica para tráfego pago
};

export interface CampaignEvent {
  id: string;
  campaignId: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  type: CampaignType;
}

// Interfaces para relatórios de campanha
export interface CampaignReportData {
  totalRecipients: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  failedCount: number;
  pendingCount: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  failureReasons: FailureReason[];
  customerEngagements: CustomerEngagement[];
  deliveryByDay: DailyDeliveryData[];
}

export interface FailureReason {
  reason: string;
  count: number;
}

export interface CustomerEngagement {
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: 'delivered' | 'opened' | 'clicked' | 'failed' | 'pending';
  timestamp: Date;
  action?: string;
}

export interface DailyDeliveryData {
  date: Date;
  delivered: number;
  failed: number;
}
