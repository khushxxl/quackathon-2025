import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface Campaign {
  id: string;
  name: string;
  description: string;
  image_url: string;
  start_date: string;
  participant_target: number;
  participants: number;
  locations: string;
  requirements: string;
}

interface CampaignsProps {
  loading: boolean;
  activeCampaigns: Campaign[];
  handleApplyClick: (campaignId: string, campaignName: string) => void;
}

export default function Campaigns({
  loading,
  activeCampaigns,
  handleApplyClick,
}: CampaignsProps) {
  return (
    <section
      id="campaigns"
      className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-green-50 via-white to-green-100/50 dark:from-green-900/30 dark:via-gray-900 dark:to-green-800/20 relative"
    >
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-300/20 dark:bg-green-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200/30 dark:bg-green-800/10 rounded-full blur-3xl"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="px-4 py-1 bg-white dark:bg-gray-800 shadow-sm rounded-full text-green-600 dark:text-green-400 font-medium text-sm mb-4 border border-green-100 dark:border-green-800">
            Join Us
          </span>
          <h2 className="text-4xl md:text-5xl font-poppins-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-500 dark:from-green-400 dark:to-green-300 mb-6">
            Active Volunteer Campaigns
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 dark:from-green-500 dark:to-green-300 rounded-full"></div>
        </div>

        {loading ? (
          <LoadingState />
        ) : activeCampaigns.length > 0 ? (
          <CampaignGrid
            campaigns={activeCampaigns}
            onApplyClick={handleApplyClick}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-poppins-bold text-gray-700 dark:text-gray-300 mb-4">
        No Active Campaigns
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        There are currently no active campaigns. Please check back later or
        contact us for more information.
      </p>
      <Link
        href="/contact"
        className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg transition duration-300 font-poppins-bold"
      >
        Contact Us
      </Link>
    </div>
  );
}

interface CampaignGridProps {
  campaigns: Campaign[];
  onApplyClick: (campaignId: string, campaignName: string) => void;
}

function CampaignGrid({ campaigns, onApplyClick }: CampaignGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onApplyClick={onApplyClick}
        />
      ))}
    </div>
  );
}

interface CampaignCardProps {
  campaign: Campaign;
  onApplyClick: (campaignId: string, campaignName: string) => void;
}

function CampaignCard({ campaign, onApplyClick }: CampaignCardProps) {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
      <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl">
        <img
          src={campaign.image_url || "/images/placeholder-campaign.jpg"}
          alt={campaign.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-2xl font-poppins-bold text-green-700 dark:text-green-400 mb-4">
        {campaign.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
        {campaign.description}
      </p>
      {campaign.requirements && (
        <p className="text-gray-700 dark:text-gray-400 mb-6 text-sm italic border-l-2 border-green-500 pl-3">
          <span className="font-medium">Requirements:</span>{" "}
          {campaign.requirements}
        </p>
      )}
      <div className="flex flex-wrap gap-4 mb-6">
        <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800/50">
          {new Date(campaign.start_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800/50">
          {campaign.participant_target - campaign.participants} spots left
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {campaign.locations && (
          <Link
            target="_blank"
            href={campaign.locations}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800/50 hover:shadow-md transition-all"
          >
            <MapPin className="w-4 h-4 mr-2" />
            View Location
          </Link>
        )}
      </div>

      <button
        onClick={() => onApplyClick(campaign.id, campaign.name)}
        className="inline-block w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition duration-300 font-poppins-bold text-center transform group-hover:scale-105"
      >
        Apply Now
      </button>
    </div>
  );
}
