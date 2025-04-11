
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
  return (
    <main 
      className={cn(
        "flex-1 overflow-auto p-4 lg:p-6", 
        className
      )} 
      {...props}
    >
      {children}
    </main>
  );
}
