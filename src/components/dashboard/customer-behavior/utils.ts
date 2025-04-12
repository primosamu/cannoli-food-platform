
import { CampaignType } from "@/types/campaign";
import { MessageSquare, Mail, PercentCircle } from "lucide-react";
import React from "react";

// Helper function to determine campaign category from segment
export const getCategoryFromSegment = (segmentType?: string, segmentName?: string): string => {
  // RFM segments
  if (segmentType === 'rfm-segments') {
    if (segmentName === 'Champions' || segmentName === 'Loyal' || segmentName === 'Potential Loyalist') {
      return 'loyalty';
    } else if (segmentName === 'At Risk' || segmentName === "Can't Lose" || segmentName === 'Hibernating' || segmentName === 'Lost') {
      return 'customer-recovery';
    }
  }
  
  // Recency - people who haven't purchased in a while
  if (segmentType === 'recency' && (segmentName?.includes(">60 days") || segmentName?.includes("45-60 days"))) {
    return 'customer-recovery';
  }
  
  // Frequency - loyal customers
  if (segmentType === 'frequency' && (segmentName?.includes(">10 orders") || segmentName?.includes("6-10 orders"))) {
    return 'loyalty';
  }
  
  // Meal preference - change consumption patterns
  if (segmentType === 'meal-preference') {
    return 'consumption-pattern';
  }
  
  // Day preference - weekday vs weekend
  if (segmentType === 'day-preference') {
    return 'consumption-pattern';
  }
  
  // Default to generic template
  return '';
};

export const getTemplateIcon = (type: CampaignType) => {
  switch (type) {
    case "whatsapp":
      return React.createElement(MessageSquare, { className: "h-5 w-5 text-green-600" });
    case "sms":
      return React.createElement(MessageSquare, { className: "h-5 w-5 text-blue-600" });
    case "email":
      return React.createElement(Mail, { className: "h-5 w-5 text-orange-600" });
    case "paid":
      return React.createElement(PercentCircle, { className: "h-5 w-5 text-purple-600" });
    default:
      return null;
  }
};

export const getTemplateTypeName = (type: CampaignType) => {
  switch (type) {
    case "whatsapp":
      return "WhatsApp";
    case "sms":
      return "SMS";
    case "email":
      return "Email";
    case "paid":
      return "Tráfego Pago";
    default:
      return "Desconhecido";
  }
};
