import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { CampaignsOverview } from "@/components/campaigns/campaigns-overview";
import { CampaignsFilters } from "@/components/campaigns/campaigns-filters";
import { CreateCampaignButton } from "@/components/campaigns/create-campaign-button";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Manage your environmental campaigns and initiatives",
};

export default function CampaignsPage() {
  return (
      <DashboardShell>
        <DashboardHeader
          heading="Campaigns"
          description="Manage your environmental campaigns and initiatives"
        />
        <div className="flex items-center justify-between mb-4">
          <CampaignsFilters />
          <CreateCampaignButton />
        </div>
        <CampaignsOverview />
      </DashboardShell>
  );
}
