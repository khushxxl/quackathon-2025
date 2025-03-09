"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { CampaignsOverview } from "@/components/campaigns/campaigns-overview";
import { CampaignsFilters } from "@/components/campaigns/campaigns-filters";
import { CreateCampaignButton } from "@/components/campaigns/create-campaign-button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuth } from "@/lib/utils";

export default function CampaignsPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    const auth = async () => {
      const { user, error } = (await checkAuth()) as {
        user: User;
        error: any;
      };
      if (!user) {
        router.push("/auth/sign-in");
      } else {
        setUserData(user);
      }
    };

    auth();
  }, []);
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
