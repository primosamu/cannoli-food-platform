
/**
 * Format a date to a localized string
 */
export const formatDate = (date: Date | string): string => {
  if (!date) return "-";
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};

/**
 * Format a number as currency (BRL)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Format a phone number
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return "-";
  
  // Simple formatting for display
  return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
};
