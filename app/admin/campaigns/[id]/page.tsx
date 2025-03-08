"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { useCampaigns, Campaign } from "@/context/campaign-context";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  id: string;
  name: string;
  email: string;
  joined: Date;
  approvalStatus: "approved" | "denied" | "pending";
};

// Sample participant data for the campaign
const SAMPLE_PARTICIPANTS: Participant[] = [
  {
    id: "p1",
    name: "John Smith",
    email: "john.smith@example.com",
    joined: new Date(2023, 5, 10),
    approvalStatus: "approved",
  },
  {
    id: "p2",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    joined: new Date(2023, 5, 12),
    approvalStatus: "pending",
  },
  {
    id: "p3",
    name: "Michael Brown",
    email: "m.brown@example.com",
    joined: new Date(2023, 5, 15),
    approvalStatus: "denied",
  },
  {
    id: "p4",
    name: "Sophia Davis",
    email: "sophia.d@example.com",
    joined: new Date(2023, 5, 18),
    approvalStatus: "approved",
  },
  {
    id: "p5",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    joined: new Date(2023, 5, 20),
    approvalStatus: "pending",
  },
];

export default function CampaignDetailPage() {
  const params = useParams();
  const { campaigns } = useCampaigns();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);

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
    if (params.id) {
      // Find the campaign with the matching ID
      const foundCampaign = campaigns.find((c) => c.id === params.id);
      if (foundCampaign) {
        setCampaign(foundCampaign);
        // In a real app, you would fetch participants for this campaign
        // For this example, we'll use the sample data
        setParticipants(SAMPLE_PARTICIPANTS);
      }
    }
  }, [params.id, campaigns]);

  const handleUpdateApprovalStatus = (
    participantId: string,
    status: "approved" | "denied" | "pending"
  ) => {
    setParticipants(
      participants.map((p) =>
        p.id === participantId ? { ...p, approvalStatus: status } : p
      )
    );
  };

  const handleExportParticipants = () => {
    // In a real app, this would export the participant data to CSV/Excel
    alert(`Exporting ${participants.length} participants to Excel`);
  };

  if (!campaign) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Campaign not found"
          description="The campaign you're looking for doesn't exist"
        />
        <Button variant="outline" size="sm" asChild>
          <a href="/admin/campaigns">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to campaigns
          </a>
        </Button>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Button variant="outline" size="sm" className="mb-6 w-fit" asChild>
        <a href="/admin/campaigns">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to campaigns
        </a>
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
                <TableHead>Email</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Approval Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No participants found for this campaign
                  </TableCell>
                </TableRow>
              ) : (
                participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell className="font-medium">
                      {participant.name}
                    </TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>
                      {format(participant.joined, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          approvalStatusConfig[participant.approvalStatus].color
                        }
                      >
                        {approvalStatusConfig[participant.approvalStatus].label}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={participant.approvalStatus}
                        onValueChange={(value) =>
                          handleUpdateApprovalStatus(
                            participant.id,
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
