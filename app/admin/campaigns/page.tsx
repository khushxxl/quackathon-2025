"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { CampaignsOverview } from "@/components/campaigns/campaigns-overview";
import { CampaignsFilters } from "@/components/campaigns/campaigns-filters";
import { CreateCampaignButton } from "@/components/campaigns/create-campaign-button";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuth, sendEmail } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCampaigns } from "@/context/campaign-context";
import { Mail, X } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
export default function CampaignsPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedVolunteers, setSelectedVolunteers] = useState<string[]>([]);
  const [notifyAll, setNotifyAll] = useState(false);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase.from("campaigns").select("*");

    if (error) throw error;

    setCampaigns(data);
    console.log(data);
  };

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
    fetchCampaigns();
  }, []);

  // Get unique volunteers from all campaigns
  const getUniqueVolunteers = () => {
    console.log(campaigns);

    const allParticipants = campaigns.flatMap(
      (campaign: any) => campaign.participants_data || []
    );

    // Create a map to deduplicate by email
    const uniqueVolunteersMap = new Map();
    allParticipants.forEach((participant: any) => {
      if (participant.email && !uniqueVolunteersMap.has(participant.email)) {
        uniqueVolunteersMap.set(participant.email, participant);
      }
    });

    return Array.from(uniqueVolunteersMap.values());
  };

  const uniqueVolunteers = getUniqueVolunteers();

  const handleVolunteerSelection = (email: string) => {
    setSelectedVolunteers((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleSendNotification = async () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      toast.error("Please provide both subject and content for the email");
      return;
    }

    setIsSending(true);
    try {
      let emailsToNotify: string[] = [];

      if (notifyAll) {
        // Use all unique volunteer emails
        emailsToNotify = uniqueVolunteers.map((v) => v.email);
      } else {
        // Use only selected volunteer emails
        emailsToNotify = selectedVolunteers;
      }

      if (emailsToNotify.length === 0) {
        toast.error("There are no volunteers to notify");
        return;
      }

      // Send email to each participant
      for (const email of emailsToNotify) {
        await sendEmail(
          email,
          "",
          "Volunteer Notification",
          emailSubject,
          emailContent.split("\n"),
          "",
          emailSubject
        );
      }

      toast.success(`Notification sent to ${emailsToNotify.length} volunteers`);
      setIsDialogOpen(false);
      setEmailSubject("");
      setEmailContent("");
      setSelectedVolunteers([]);
      setNotifyAll(true);
    } catch (error) {
      console.error("Error sending notifications:", error);
      toast.error("Failed to send notifications. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Campaigns"
        description="Manage your environmental campaigns and initiatives"
      />
      <div className="flex items-center justify-between mb-4">
        <CampaignsFilters />
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Notify Volunteers
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Send Notification to Volunteers</DialogTitle>
                <DialogDescription>
                  Send an email notification to all volunteers across campaigns.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="col-span-3"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Recipients</Label>
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2 mb-2">
                      {/* <Checkbox
                        id="notify-all"
                        checked={notifyAll}
                        onCheckedChange={(checked) => {
                          setNotifyAll(checked === true);
                          if (checked) setSelectedVolunteers([]);
                        }}
                      /> */}
                      <Label htmlFor="notify-all">Notify all volunteers</Label>
                    </div>

                    {!notifyAll && (
                      <Select onValueChange={handleVolunteerSelection}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select volunteers" />
                        </SelectTrigger>
                        <SelectContent>
                          {uniqueVolunteers.length === 0 ? (
                            <SelectItem value="none" disabled>
                              No volunteers available
                            </SelectItem>
                          ) : (
                            uniqueVolunteers.map((volunteer) => (
                              <SelectItem
                                key={volunteer.email}
                                value={volunteer.email}
                              >
                                {volunteer.name} ({volunteer.email})
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}

                    {!notifyAll && selectedVolunteers.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">
                          Selected volunteers ({selectedVolunteers.length}):
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {selectedVolunteers.map((email) => (
                            <Badge
                              key={email}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {email}
                              <X
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => handleVolunteerSelection(email)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleSendNotification}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Notification"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <CreateCampaignButton />
        </div>
      </div>
      <CampaignsOverview />
    </DashboardShell>
  );
}
