import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to map database campaign to frontend campaign
export function mapDbCampaignToFrontend(dbCampaign: any) {
  return {
    id: dbCampaign.id,
    name: dbCampaign.name,
    description: dbCampaign.description,
    status: dbCampaign.status,
    startDate: new Date(dbCampaign.start_date),
    participants: dbCampaign.participants,
    goals: {
      participantTarget: dbCampaign.participant_target,
    },
    image: dbCampaign.image_url,
    locations: dbCampaign.locations,
    requirements: dbCampaign.requirements,
  };
}
