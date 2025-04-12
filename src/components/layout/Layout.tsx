
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
  
  // Force document title to update when language changes
  useEffect(() => {
    // This effect ensures proper language propagation throughout the app
    document.documentElement.lang = language;
    // You could also set page title here based on language
  }, [language]);
  
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
