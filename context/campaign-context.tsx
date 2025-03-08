"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CampaignStatus = "active" | "upcoming" | "completed";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  startDate: Date;
  participants: number;
  goals: {
    participantTarget?: number;
  };
  image?: string;
}

interface CampaignContextType {
  campaigns: Campaign[];
  filteredCampaigns: Campaign[];
  filters: {
    status: CampaignStatus | "all";
    dateRange: { from?: Date };
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
    participants: 120,
    goals: {
      participantTarget: 150,
    },
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "2",
    name: "Ocean Cleanup",
    description: "Beach and coastal waters cleanup",
    status: "upcoming",
    startDate: new Date(2023, 7, 15),
    participants: 0,
    goals: {
      participantTarget: 75,
    },
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: "3",
    name: "Recycling Awareness",
    description: "Educational campaign for proper recycling",
    status: "completed",
    startDate: new Date(2023, 1, 1),
    participants: 350,
    goals: {
      participantTarget: 300,
    },
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(SAMPLE_CAMPAIGNS);
  const [filters, setFiltersState] = useState({
    status: "all" as CampaignStatus | "all",
    dateRange: {} as { from?: Date },
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
