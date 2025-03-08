import type React from "react";
interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="container mx-auto max-w-7xl flex min-h-screen flex-col space-y-6 p-8">
      {children}
    </div>
  );
}
