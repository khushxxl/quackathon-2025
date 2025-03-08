"use client";

import { useCampaigns, Campaign } from "@/context/campaign-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Users,
  Clock,
  DollarSign,
  Pencil,
  Archive,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export function CampaignsOverview() {
  const { filteredCampaigns } = useCampaigns();

  if (filteredCampaigns.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] border rounded-lg">
        <p className="text-muted-foreground">
          No campaigns found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const { updateCampaign, deleteCampaign } = useCampaigns();

  return (
    <Card>
      <CardHeader className="relative pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{campaign.name}</CardTitle>
          <Badge className={statusColors[campaign.status]}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {campaign.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>
              {format(campaign.startDate, "MMM d, yyyy")} -{" "}
              {format(campaign.endDate, "MMM d, yyyy")}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Users className="h-4 w-4 mb-1 opacity-70" />
              <span className="text-sm font-medium">
                {campaign.participants}
              </span>
              <span className="text-xs text-muted-foreground">
                Participants
              </span>
            </div>

            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <DollarSign className="h-4 w-4 mb-1 opacity-70" />
              <span className="text-sm font-medium">
                ${campaign.fundsRaised}
              </span>
              <span className="text-xs text-muted-foreground">Raised</span>
            </div>

            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Clock className="h-4 w-4 mb-1 opacity-70" />
              <span className="text-sm font-medium">
                {campaign.volunteerHours}
              </span>
              <span className="text-xs text-muted-foreground">Hours</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/campaigns/${campaign.id}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
        <div className="space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => deleteCampaign(campaign.id)}
          >
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
