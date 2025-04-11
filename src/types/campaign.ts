
export type CampaignType = 'whatsapp' | 'sms' | 'email' | 'paid';

export type CampaignTemplate = {
  id: string;
  name: string;
  type: CampaignType;
  subject?: string;
  content: string;
  description: string;
  imageUrl?: string;
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
};
