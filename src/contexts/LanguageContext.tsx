
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the supported languages
export type Language = 'en' | 'pt' | 'es';

// Define the language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
};

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations for each language
const translationSets: Record<Language, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    menus: 'Menu Management',
    customers: 'Customers',
    campaigns: 'Campaigns',
    orders: 'Order Management',
    calendar: 'Calendar',
    coupons: 'Coupons',
    loyalty: 'Loyalty & Points',
    integrations: 'Integrations',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Log out',
    system: 'CRM System',
    selectLanguage: 'Select Language',
    english: 'English',
    portuguese: 'Portuguese',
    spanish: 'Spanish',
    assignCourier: 'Assign Courier',
    courierName: 'Courier Name',
    enterCourierName: 'Enter courier name',
    deliveryAddress: 'Delivery Address',
    noAddress: 'No address provided (Pickup)',
    cancel: 'Cancel',
    assign: 'Assign Courier'
  },
  pt: {
    dashboard: 'Painel',
    menus: 'Gerenciamento de Menu',
    customers: 'Clientes',
    campaigns: 'Campanhas',
    orders: 'Gerenciamento de Pedidos',
    calendar: 'Calendário',
    coupons: 'Cupons',
    loyalty: 'Fidelidade & Pontos',
    integrations: 'Integrações',
    settings: 'Configurações',
    profile: 'Perfil',
    logout: 'Sair',
    system: 'Sistema CRM',
    selectLanguage: 'Selecionar Idioma',
    english: 'Inglês',
    portuguese: 'Português',
    spanish: 'Espanhol',
    assignCourier: 'Atribuir Entregador',
    courierName: 'Nome do Entregador',
    enterCourierName: 'Digite o nome do entregador',
    deliveryAddress: 'Endereço de Entrega',
    noAddress: 'Nenhum endereço fornecido (Retirada)',
    cancel: 'Cancelar',
    assign: 'Atribuir Entregador'
  },
  es: {
    dashboard: 'Panel',
    menus: 'Gestión de Menú',
    customers: 'Clientes',
    campaigns: 'Campañas',
    orders: 'Gestión de Pedidos',
    calendar: 'Calendario',
    coupons: 'Cupones',
    loyalty: 'Fidelidad & Puntos',
    integrations: 'Integraciones',
    settings: 'Configuraciones',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    system: 'Sistema CRM',
    selectLanguage: 'Seleccionar Idioma',
    english: 'Inglés',
    portuguese: 'Portugués',
    spanish: 'Español',
    assignCourier: 'Asignar Mensajero',
    courierName: 'Nombre del Mensajero',
    enterCourierName: 'Ingrese nombre del mensajero',
    deliveryAddress: 'Dirección de Entrega',
    noAddress: 'No se proporcionó dirección (Recogida)',
    cancel: 'Cancelar',
    assign: 'Asignar Mensajero'
  }
};

// LanguageProvider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Create the LanguageProvider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize the language from localStorage or default to 'en'
  const storedLanguage = localStorage.getItem('language') as Language;
  const [language, setLanguage] = useState<Language>(storedLanguage || 'en');

  // Update language and save to localStorage
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Create the context value
  const contextValue: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    translations: translationSets[language]
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
