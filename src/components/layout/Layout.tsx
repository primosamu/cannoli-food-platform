
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { PageContainer } from "./PageContainer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { language } = useLanguage();
  
  // Force document language to update when language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'pt' ? 'Cannoli Food Tech - Sistema' : 
                     language === 'es' ? 'Cannoli Food Tech - Sistema' : 
                     'Cannoli Food Tech - System';
    console.log("Language set to:", language);
  }, [language]);
  
  // Listen for language change events to force re-renders
  useEffect(() => {
    const handleLanguageEvent = (event: Event) => {
      console.log("Language changed event detected");
      // This is just to trigger a re-render
    };
    
    document.addEventListener('language-changed', handleLanguageEvent);
    
    return () => {
      document.removeEventListener('language-changed', handleLanguageEvent);
    };
  }, []);
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-0 lg:ml-64">
        <Header />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}
