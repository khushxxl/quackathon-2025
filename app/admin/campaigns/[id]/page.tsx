"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import {
  useCampaigns,
  Campaign,
  CampaignStatus,
} from "@/context/campaign-context";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, Users, ArrowLeft, Download } from "lucide-react";

// Participant type to be used in the campaign
type Participant = {
  age: string;
  name: string;
  email: string;
  reason: string;
  applied_at: string;
  resume_link: string;
  approval_status: "approved" | "denied" | "pending";
};

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { campaigns } = useCampaigns();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  // Status colors for badges
  const statusColors = {
    active: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-gray-100 text-gray-800",
  };

  // Approval status colors and labels
  const approvalStatusConfig = {
    approved: { color: "text-green-600", label: "Approved" },
    denied: { color: "text-red-600", label: "Denied" },
    pending: { color: "text-amber-600", label: "Not Set" },
  };

  useEffect(() => {
    async function fetchCampaignDetails() {
      if (!params.id) return;

      setLoading(true);
      try {
        // Get campaign data from Supabase
        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;

        if (data) {
          const mappedCampaign = {
            id: data.id,
            name: data.name,
            description: data.description,
            status: data.status as CampaignStatus,
            startDate: new Date(data.start_date),
            participants: data.participants,
            goals: {
              participantTarget: data.participant_target,
            },
            image: data.image_url,
          };

          setCampaign(mappedCampaign);

          // Get participants data from the JSONB field - use participants_data field
          const participantsData = data.participants_data || [];
          setParticipants(participantsData);
        }
      } catch (err) {
        console.error("Error fetching campaign details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaignDetails();
  }, [params.id]);

  const handleUpdateApprovalStatus = async (
    participantEmail: string,
    status: "approved" | "denied" | "pending"
  ) => {
    if (!campaign) return;

    try {
      // Update participant locally first for responsive UI
      const updatedParticipants = participants.map((p) =>
        p.email === participantEmail ? { ...p, approval_status: status } : p
      );
      setParticipants(updatedParticipants);

      // Get the current campaign from Supabase
      const { data, error } = await supabase
        .from("campaigns")
        .select("participants_data")
        .eq("id", campaign.id)
        .single();

      if (error) throw error;

      // Update the specific participant in the JSONB array
      const updatedParticipantsData = data.participants_data.map((p: any) =>
        p.email === participantEmail ? { ...p, approval_status: status } : p
      );

      // Update Supabase
      const { error: updateError } = await supabase
        .from("campaigns")
        .update({
          participants_data: updatedParticipantsData,
          // Update participant count if needed
          participants: updatedParticipantsData.filter(
            (p: any) => p.approval_status === "approved"
          ).length,
        })
        .eq("id", campaign.id);

      if (updateError) throw updateError;
    } catch (err) {
      console.error("Error updating participant status:", err);
      // Revert the local state on error
      const { data } = await supabase
        .from("campaigns")
        .select("participants_data")
        .eq("id", campaign.id)
        .single();

      if (data) {
        setParticipants(data.participants_data);
      }
    }
  };

  const handleExportParticipants = () => {
    if (!participants.length) return;

    // Create CSV content
    const headers = "Name,Email,Age,Reason,Applied,Resume Link,Status\n";
    const rows = participants
      .map(
        (p) =>
          `"${p.name}","${p.email}","${p.age}","${p.reason}","${new Date(
            p.applied_at
          ).toLocaleDateString()}","${p.resume_link}","${p.approval_status}"`
      )
      .join("\n");
    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `participants-${campaign?.name.replace(/\s+/g, "-")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[400px]">
          <p>Loading campaign details...</p>
        </div>
      </DashboardShell>
    );
  }

  if (!campaign) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Campaign not found"
          description="The campaign you're looking for doesn't exist"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/admin/campaigns")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to campaigns
        </Button>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Button
        variant="outline"
        size="sm"
        className="mb-6 w-fit"
        onClick={() => router.push("/admin/campaigns")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to campaigns
      </Button>

      <div className="grid gap-6">
        {/* Campaign Header */}
        <div className="flex flex-col md:flex-row gap-6">
          {campaign.image && (
            <div className="w-full md:w-1/3 h-60 md:h-auto rounded-lg overflow-hidden">
              <div className="relative w-full h-full min-h-[240px]">
                <Image
                  src={campaign.image}
                  alt={campaign.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{campaign.name}</h1>
              <Badge className={statusColors[campaign.status]}>
                {campaign.status.charAt(0).toUpperCase() +
                  campaign.status.slice(1)}
              </Badge>
            </div>

            <p className="text-muted-foreground mb-4">{campaign.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 opacity-70" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(campaign.startDate, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 opacity-70" />
                <div>
                  <p className="text-sm font-medium">Participants</p>
                  <p className="text-sm text-muted-foreground">
                    {campaign.participants} /{" "}
                    {campaign.goals.participantTarget || "No target"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Participants</h2>
            <Button variant="outline" onClick={handleExportParticipants}>
              <Download className="h-4 w-4 mr-2" />
              Export Participants
            </Button>
          </div>

          <Table>
            <TableCaption>
              A list of all participants for this campaign.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No participants found for this campaign
                  </TableCell>
                </TableRow>
              ) : (
                participants.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {participant.name}
                    </TableCell>
                    <TableCell>{participant.age}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate" title={participant.reason}>
                        {participant.reason}
                      </div>
                    </TableCell>
                    <TableCell>
                      {participant.resume_link && (
                        <a 
                          href={participant.resume_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(participant.applied_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          approvalStatusConfig[participant.approval_status]
                            .color
                        }
                      >
                        {
                          approvalStatusConfig[participant.approval_status]
                            .label
                        }
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={participant.approval_status}
                        onValueChange={(value) =>
                          handleUpdateApprovalStatus(
                            participant.email,
                            value as "approved" | "denied" | "pending"
                          )
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Set Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="approved">Approve</SelectItem>
                          <SelectItem value="denied">Deny</SelectItem>
                          <SelectItem value="pending">Not Set</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  );
}
