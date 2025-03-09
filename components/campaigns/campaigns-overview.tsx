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
import { CalendarIcon, Users, ExternalLink, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

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

  const { deleteCampaign } = useCampaigns();

  return (
    <Card style={{ padding: 0, marginTop: 10, height: "auto" }}>
      <CardHeader style={{ padding: 0 }} className="relative pb-2">
        {campaign.image && (
          <div className="w-[100%] h-[200px] rounded-t-md overflow-hidden  mb-2">
            <img
              className="object-cover w-full h-full "
              src={campaign.image}
              alt={campaign.name}
              width={"100%"}
            />
          </div>
        )}
        <div className="flex justify-between items-start p-2">
          <CardTitle className="text-xl">{campaign.name}</CardTitle>
          <Badge className={statusColors[campaign.status]}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2 p-2">
          {campaign.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 p-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            <span>Starts: {format(campaign.startDate, "MMM d, yyyy")}</span>
          </div>

          {/* Location information */}
          {campaign.locations && (
            <div className="flex items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4 opacity-70"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Location: {campaign.locations}</span>
            </div>
          )}

          {/* Requirements information - shortened/preview */}
          {campaign.requirements && (
            <div className="flex items-start text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-4 w-4 opacity-70 mt-0.5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span className="line-clamp-1">
                Requirements: {campaign.requirements}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Users className="h-4 w-4 mb-1 opacity-70" />
              <span className="text-sm font-medium">
                {campaign.participants}
              </span>
              <span className="text-xs text-muted-foreground">
                Participants
              </span>
            </div>

            {campaign.goals.participantTarget && (
              <div className="flex flex-col items-center p-2 bg-muted rounded-md">
                <Users className="h-4 w-4 mb-1 opacity-70" />
                <span className="text-sm font-medium">
                  {campaign.goals.participantTarget}
                </span>
                <span className="text-xs text-muted-foreground">Target</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 mt-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/campaigns/${campaign.id}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          onClick={() => deleteCampaign(campaign.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
