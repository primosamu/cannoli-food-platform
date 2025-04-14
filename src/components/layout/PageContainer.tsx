
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <main 
      className={cn(
        "flex-1 overflow-auto p-5 lg:p-6 animate-fade-in", 
        className
      )} 
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
}
