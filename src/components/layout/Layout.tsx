
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { PageContainer } from "./PageContainer";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Set document language to Portuguese
  useEffect(() => {
    document.documentElement.lang = 'pt';
    document.title = 'Cannoli Food Tech - Sistema';
    
    // Add font imports to document head
    const fontLinkElement = document.createElement('link');
    fontLinkElement.rel = 'stylesheet';
    fontLinkElement.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLinkElement);
    
    return () => {
      // Clean up the font link when component unmounts
      document.head.removeChild(fontLinkElement);
    };
  }, []);
  
  return (
    <div className="flex h-screen bg-muted/30">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-0 lg:ml-64">
        <Header />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}
