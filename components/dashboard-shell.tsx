import type React from "react";
interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        {children}
      </div>
    </div>
  );
}
