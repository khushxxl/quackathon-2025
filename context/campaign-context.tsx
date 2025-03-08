"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase, mapDbCampaignToFrontend } from "@/lib/supabase";

export type CampaignStatus = "active" | "upcoming" | "completed";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
  startDate: Date;
  participants: number;
  goals: {
    participantTarget: number;
  };
  image: string;
}

interface CampaignFilters {
  search: string;
  status: CampaignStatus | "all";
  dateRange: {
    from?: Date;
    to?: Date;
  };
}

interface CampaignContextProps {
  campaigns: Campaign[];
  filteredCampaigns: Campaign[];
  filters: CampaignFilters;
  setFilters: (newFilters: Partial<CampaignFilters>) => void;
  addCampaign: (
    campaign: Omit<Campaign, "id">,
    imageFile?: File | null
  ) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CampaignContext = createContext<CampaignContextProps | undefined>(
  undefined
);

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<CampaignFilters>({
    search: "",
    status: "all",
    dateRange: {},
  });

  // Fetch campaigns from Supabase
  useEffect(() => {
    async function fetchCampaigns() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("campaigns").select("*");

        if (error) throw error;

        const mappedCampaigns = data.map(mapDbCampaignToFrontend);
        setCampaigns(mappedCampaigns);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  // Filter campaigns based on filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    // Filter by search text
    if (
      filters.search &&
      !campaign.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !campaign.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (filters.status !== "all" && campaign.status !== filters.status) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange.from && campaign.startDate < filters.dateRange.from) {
      return false;
    }

    return true;
  });

  // Update filters
  const setFilters = (newFilters: Partial<CampaignFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  // Add a new campaign
  const addCampaign = async (
    campaign: Omit<Campaign, "id">,
    imageFile?: File | null
  ) => {
    try {
      let imageUrl = campaign.image;

      // If an image file is provided, upload it to Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 15)}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload the image to the "images" bucket
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error uploading image to storage:", uploadError);
          throw uploadError;
        }

        // Get the public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        imageUrl = urlData.publicUrl;
      }

      // Map frontend campaign to database format
      const dbCampaign = {
        name: campaign.name,
        description: campaign.description,
        status: campaign.status,
        start_date: campaign.startDate.toISOString(),
        participants: 0, // New campaigns start with 0 participants
        participant_target: campaign.goals.participantTarget,
        image_url: imageUrl,
        participants_data: [],
      };

      const { data, error } = await supabase
        .from("campaigns")
        .insert(dbCampaign)
        .select();

      if (error) {
        console.error("Error inserting campaign record:", error);
        throw error;
      }

      // Add the new campaign to the state
      if (data && data.length > 0) {
        setCampaigns([...campaigns, mapDbCampaignToFrontend(data[0])]);
      }
    } catch (err: any) {
      console.error("Error adding campaign:", err);
      setError(err.message);
      throw err; // Re-throw so the UI can handle it
    }
  };

  // Delete a campaign
  const deleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase.from("campaigns").delete().eq("id", id);

      if (error) throw error;

      // Remove campaign from state
      setCampaigns(campaigns.filter((c) => c.id !== id));
    } catch (err: any) {
      console.error("Error deleting campaign:", err);
      setError(err.message);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        filteredCampaigns,
        filters,
        setFilters,
        addCampaign,
        deleteCampaign,
        loading,
        error,
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
