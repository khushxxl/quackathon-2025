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
import {
  CalendarIcon,
  Users,
  ArrowLeft,
  Download,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { checkAuth } from "@/lib/utils";

// Participant type to be used in the campaign
type Participant = {
  id: string;
  age: string;
  name: string;
  email: string;
  reason: string;
  applied_at: string;
  resume_link: string;
  approval_status: "approved" | "rejected" | "pending";
  location?: string;
  requirements?: string[];
};

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { campaigns } = useCampaigns();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);

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
  }, [router]);

  // Status colors for badges
  const statusColors = {
    active: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-gray-100 text-gray-800",
  };

  // Approval status colors and labels
  const approvalStatusConfig = {
    approved: { color: "text-green-600", label: "Approved" },
    rejected: { color: "text-red-600", label: "Rejected" },
    pending: { color: "text-amber-600", label: "Pending" },
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
            locations: data.locations,
            requirements: data.requirements || [],
          };

          setCampaign(mappedCampaign as Campaign);

          // Get participants data from the JSONB field
          const participantsData = data.participants_data || [];

          // Ensure each participant has an id
          const participantsWithIds = participantsData.map(
            (p: any, index: number) => ({
              ...p,
              id: p.id || `participant-${index}-${Date.now()}`,
            })
          );

          setParticipants(participantsWithIds);
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
    participantId: string,
    status: "approved" | "rejected" | "pending"
  ) => {
    if (!campaign) return;

    try {
      // Create a new array with the updated participant
      const updatedParticipants = participants.map((p) =>
        p.id === participantId ? { ...p, approval_status: status } : p
      );

      // Update local state for immediate UI feedback
      setParticipants(updatedParticipants);

      // Update Supabase with the new participants array
      const { error: updateError } = await supabase
        .from("campaigns")
        .update({
          participants_data: updatedParticipants,
          // Update participant count based on approved participants
          participants: updatedParticipants.filter(
            (p) => p.approval_status === "approved"
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
    const headers =
      "Name,Email,Age,Reason,Applied,Resume Link,Status,Location,Requirements\n";
    const rows = participants
      .map(
        (p) =>
          `"${p.name}","${p.email}","${p.age}","${p.reason}","${new Date(
            p.applied_at
          ).toLocaleDateString()}","${p.resume_link}","${p.approval_status}","${
            p.location || ""
          }","${(p.requirements || []).join("; ")}"`
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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

              {campaign.locations && (
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.locations}
                    </p>
                  </div>
                </div>
              )}

              {campaign.requirements && campaign.requirements.length > 0 && (
                <div className="flex items-center">
                  <ClipboardList className="mr-2 h-5 w-5 opacity-70" />
                  <div>
                    <p className="text-sm font-medium">Requirements</p>
                    <p className="text-sm text-muted-foreground">
                      {Array.isArray(campaign.requirements)
                        ? campaign.requirements.join(", ")
                        : campaign.requirements}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Participants</h2>
            <Button
              variant="outline"
              onClick={handleExportParticipants}
              disabled={participants.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Participants
            </Button>
          </div>

          <div className="overflow-x-auto">
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

                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      No participants found for this campaign
                    </TableCell>
                  </TableRow>
                ) : (
                  participants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">
                        {participant.name}
                      </TableCell>
                      <TableCell>{participant.age}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>
                        <div
                          className="max-w-[200px] truncate"
                          title={participant.reason}
                        >
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
                        <span
                          className={
                            approvalStatusConfig[
                              participant?.approval_status as
                                | "approved"
                                | "rejected"
                                | "pending"
                            ].color
                          }
                        >
                          {participant?.approval_status[0].toUpperCase() +
                            participant?.approval_status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={participant?.approval_status}
                          onValueChange={(value) =>
                            handleUpdateApprovalStatus(
                              participant.id,
                              value as "approved" | "rejected" | "pending"
                            )
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Set Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approve</SelectItem>
                            <SelectItem value="rejected">Reject</SelectItem>
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
      </div>
    </DashboardShell>
  );
}
