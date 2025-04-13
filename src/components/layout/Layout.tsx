
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
