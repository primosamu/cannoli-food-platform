
// Colors used throughout charts
export const COLORS = [
  "#FFA726", "#FB8C00", "#F57C00", "#EF6C00", "#E65100", "#FFB74D", 
  "#FFCC80", "#4CAF50", "#2196F3", "#9C27B0", "#F44336"
];

// RFM Data
export const recencyData = [
  { group: "1 (>60 days)", value: 120, description: "Lost" },
  { group: "2 (45-60 days)", value: 95, description: "At Risk" },
  { group: "3 (30-45 days)", value: 150, description: "Needs Attention" },
  { group: "4 (15-30 days)", value: 230, description: "Active" },
  { group: "5 (0-15 days)", value: 300, description: "Recent" }
];

export const frequencyData = [
  { group: "1 (1 order)", value: 250, description: "One-time" },
  { group: "2 (2 orders)", value: 180, description: "New" },
  { group: "3 (3-5 orders)", value: 210, description: "Regular" },
  { group: "4 (6-10 orders)", value: 140, description: "Frequent" },
  { group: "5 (>10 orders)", value: 120, description: "Loyal" }
];

export const monetaryData = [
  { group: "1 (<$50)", value: 230, description: "Low Value" },
  { group: "2 ($50-100)", value: 250, description: "Medium-Low" },
  { group: "3 ($100-250)", value: 180, description: "Medium" },
  { group: "4 ($250-500)", value: 130, description: "Medium-High" },
  { group: "5 (>$500)", value: 110, description: "High Value" }
];

// RFM Segments
export const rfmSegmentsData = [
  { name: "Champions", value: 95, description: "Best customers, highly engaged", fill: "#4CAF50" },
  { name: "Loyal", value: 120, description: "Consistent spenders, frequent", fill: "#8BC34A" },
  { name: "Potential Loyalist", value: 140, description: "Recent and promising", fill: "#CDDC39" },
  { name: "New Customers", value: 180, description: "Recent, not first-timers", fill: "#FFEB3B" },
  { name: "Promising", value: 110, description: "Recent, not frequent yet", fill: "#FFC107" },
  { name: "Needs Attention", value: 90, description: "Above average, declining", fill: "#FF9800" },
  { name: "At Risk", value: 80, description: "Once valuable, slipping away", fill: "#FF5722" },
  { name: "Can't Lose", value: 30, description: "Past high value, inactive", fill: "#F44336" },
  { name: "Hibernating", value: 60, description: "Past customers, low value", fill: "#E91E63" },
  { name: "Lost", value: 85, description: "Lowest value, not engaged", fill: "#9C27B0" },
  { name: "Others", value: 50, description: "Miscellaneous patterns", fill: "#673AB7" }
];

// Meal Preference
export const mealPreferenceData = [
  { name: "Breakfast", value: 180 },
  { name: "Lunch", value: 420 },
  { name: "Dinner", value: 350 },
  { name: "Late night", value: 90 },
  { name: "Afternoon snack", value: 150 }
];

// Day Preference
export const dayPreferenceData = [
  { name: "Weekday", value: 650 },
  { name: "Weekend", value: 420 }
];

// Repurchase Category
export const repurchaseCategoryData = [
  { name: "Sporadic (>30d)", value: 150 },
  { name: "Very Slow (15-30d)", value: 120 },
  { name: "Slow (8-14d)", value: 180 },
  { name: "Medium (4-7d)", value: 250 },
  { name: "Fast (0-3d)", value: 190 }
];

// Beverage Included
export const beverageData = [
  { name: "Never", value: 150 },
  { name: "Rarely", value: 220 },
  { name: "Frequently", value: 180 },
  { name: "Always", value: 210 },
  { name: "N/A", value: 30 }
];

// Dessert Preference
export const dessertData = [
  { name: "Never", value: 180 },
  { name: "Rarely", value: 250 },
  { name: "Frequently", value: 160 },
  { name: "Always", value: 120 },
  { name: "N/A", value: 40 }
];

// Weather Preference
export const weatherData = [
  { name: "Sunny", value: 320 },
  { name: "Cloudy", value: 280 },
  { name: "Rainy", value: 190 },
  { name: "Cold", value: 150 },
  { name: "Hot", value: 210 }
];
