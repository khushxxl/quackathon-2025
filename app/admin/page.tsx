import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { VolunteerMetrics } from "@/components/volunteer-metrics";
import { ParticipantMetrics } from "@/components/participant-metrics";
import { ProgramMetrics } from "@/components/program-metrics";
import { FeedbackMetrics } from "@/components/feedback-metrics";
import { ImpactMetrics } from "@/components/impact-metrics";
import { TrendMetrics } from "@/components/trend-metrics";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Environmental analytics dashboard",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics Dashboard"
        description="Track the impact of your environmental initiatives"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <VolunteerMetrics />
        <ParticipantMetrics />
        <ProgramMetrics />
        <FeedbackMetrics />
        <ImpactMetrics />
        <TrendMetrics />
      </div>
    </DashboardShell>
  );
}
