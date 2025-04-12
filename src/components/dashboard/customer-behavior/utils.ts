
import { CampaignType } from "@/types/campaign";
import { MessageSquare, Mail, PercentCircle } from "lucide-react";
import React from "react";

// Helper function to determine campaign category from segment
export const getCategoryFromSegment = (segmentType?: string, segmentName?: string): string => {
  if (!segmentType || !segmentName) return "";
  
  // Check segment type and set appropriate category
  if (segmentType.includes('recency') && segmentName.includes('>60 days')) {
    return "customer-recovery";
  } 
  
  if (segmentType === 'rfm-segments') {
    if (segmentName.includes('Lost') || segmentName.includes('At Risk')) {
      return "customer-recovery";
    }
    
    if (segmentName.includes('Champion') || segmentName.includes('Loyal')) {
      return "loyalty";
    }
  }
  
  if (segmentType.includes('frequency') && segmentName.includes('orders')) {
    return "loyalty";
  } 
  
  if (segmentType === 'meal-preference' || segmentType === 'day-preference') {
    return "consumption-pattern";
  }
  
  if (segmentType === 'beverage-preference' || segmentType === 'dessert-preference') {
    return "consumption-pattern";
  }
  
  return "";
};

// Get template icon based on campaign type
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
