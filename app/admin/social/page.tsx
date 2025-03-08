import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";

export const metadata: Metadata = {
  title: "Social",
  description: "Manage your social media presence",
};

export default function SocialPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Social"
        description="Manage your social media presence and engagement"
      />
      <div className="flex items-center justify-center h-[500px] border rounded-lg">
        <p className="text-muted-foreground">Social content coming soon</p>
      </div>
    </DashboardShell>
  );
}
