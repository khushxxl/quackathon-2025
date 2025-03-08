import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Communities",
  description: "Manage your environmental communities",
};

export default function CommunitiesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Communities"
        description="Manage your environmental communities and groups"
      />
      <div className="flex items-center justify-center h-[500px] border rounded-lg">
        <p className="text-muted-foreground">Communities content coming soon</p>
        <Link href="/admin/campaigns/new-campaign">Create New Campaign</Link>
      </div>
    </DashboardShell>
  );
}
