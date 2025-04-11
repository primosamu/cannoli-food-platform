
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { PageContainer } from "./PageContainer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
