"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CampaignStatus = "active" | "upcoming" | "completed";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  startDate: Date;
  endDate: Date;
  participants: number;
  fundsRaised: number;
  volunteerHours: number;
  goals: {
    fundraisingGoal?: number;
    participantTarget?: number;
  };
  resources: {
    name: string;
    url: string;
  }[];
  team: string[];
}

interface CampaignContextType {
  campaigns: Campaign[];
  filteredCampaigns: Campaign[];
  filters: {
    status: CampaignStatus | "all";
    dateRange: { from?: Date; to?: Date };
    search: string;
  };
  setFilters: (filters: Partial<CampaignContextType["filters"]>) => void;
  addCampaign: (campaign: Omit<Campaign, "id">) => void;
  updateCampaign: (id: string, data: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(
  undefined
);

// Sample data for demonstration
const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Tree Planting Initiative",
    description: "Community tree planting in urban areas",
    status: "active",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 11, 30),
    participants: 120,
    fundsRaised: 5000,
    volunteerHours: 480,
    goals: {
      fundraisingGoal: 7500,
      participantTarget: 150,
    },
    resources: [
      { name: "Planting Guide", url: "/resources/planting-guide.pdf" },
    ],
    team: ["Jane Smith", "John Doe"],
  },
  {
    id: "2",
    name: "Ocean Cleanup",
    description: "Beach and coastal waters cleanup",
    status: "upcoming",
    startDate: new Date(2023, 7, 15),
    endDate: new Date(2023, 9, 15),
    participants: 0,
    fundsRaised: 2000,
    volunteerHours: 0,
    goals: {
      participantTarget: 75,
    },
    resources: [],
    team: ["Alice Johnson"],
  },
  {
    id: "3",
    name: "Recycling Awareness",
    description: "Educational campaign for proper recycling",
    status: "completed",
    startDate: new Date(2023, 1, 1),
    endDate: new Date(2023, 3, 30),
    participants: 350,
    fundsRaised: 3500,
    volunteerHours: 750,
    goals: {
      participantTarget: 300,
      fundraisingGoal: 3000,
    },
    resources: [
      { name: "Recycling Handbook", url: "/resources/recycling-handbook.pdf" },
    ],
    team: ["Mark Wilson", "Sarah Lee"],
  },
];

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(SAMPLE_CAMPAIGNS);
  const [filters, setFiltersState] = useState({
    status: "all" as CampaignStatus | "all",
    dateRange: {} as { from?: Date; to?: Date },
    search: "",
  });

  const setFilters = (newFilters: Partial<typeof filters>) => {
    setFiltersState({ ...filters, ...newFilters });
  };

  const addCampaign = (campaign: Omit<Campaign, "id">) => {
    const newCampaign = {
      ...campaign,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const updateCampaign = (id: string, data: Partial<Campaign>) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, ...data } : campaign
      )
    );
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
  };

  // Apply filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    // Status filter
    if (filters.status !== "all" && campaign.status !== filters.status) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.from && campaign.startDate < filters.dateRange.from) {
      return false;
    }
    if (filters.dateRange.to && campaign.endDate > filters.dateRange.to) {
      return false;
    }

    // Search filter
    if (
      filters.search &&
      !campaign.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        filteredCampaigns,
        filters,
        setFilters,
        addCampaign,
        updateCampaign,
        deleteCampaign,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignProvider");
  }
  return context;
}
