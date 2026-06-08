import { ReactNode } from "react";
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-[100dvh] w-full flex overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 relative flex flex-col min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
