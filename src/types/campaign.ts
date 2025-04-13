
export type CampaignType = 'whatsapp' | 'sms' | 'email' | 'paid' | 'rcs';

export type CampaignTemplate = {
  id: string;
  name: string;
  type: CampaignType;
  subject?: string;
  content: string;
  description: string;
  imageUrl?: string;
  platform?: string; // For paid traffic (meta, google, etc)
  category?: string; // Added category field
  inactiveDays?: string; // New field: for customer recovery campaigns
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
  menuIds?: string[];  // Associated menu IDs for this campaign
  deliveryPlatforms?: string[];  // Associated delivery platforms
  platform?: string; // For paid traffic (meta, google, etc)
  incentiveType?: 'coupon' | 'loyalty' | 'none';
  couponId?: string;
  loyaltyPoints?: number;
  audienceType?: 'all' | 'segment' | 'custom';
  audienceSegmentId?: string;
  channels: CampaignType[];
  inactiveDays?: string; // New field: for customer recovery campaigns
  // Added fields for tracking campaign performance
  deliveredCount?: number;
  openedCount?: number;
  clickedCount?: number;
  failedCount?: number;
  reportData?: CampaignReportData;
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

// New interfaces for campaign reporting
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
