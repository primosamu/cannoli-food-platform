
export type CampaignType = 'whatsapp' | 'sms' | 'email' | 'paid';

export type CampaignTemplate = {
  id: string;
  name: string;
  type: CampaignType;
  subject?: string;
  content: string;
  description: string;
  imageUrl?: string;
  platform?: string; // For paid traffic (meta, google, etc)
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
