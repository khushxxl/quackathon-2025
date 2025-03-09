"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { checkAuth } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Users, CalendarIcon, Award, TrendingUp, MapPin } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import {
  format,
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  isSameDay,
  isSameWeek,
  isSameMonth,
} from "date-fns";
import type { DateRange } from "react-day-picker";

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
  });

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
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch campaigns
      const { data: campaignData, error: campaignError } = await supabase
        .from("campaigns")
        .select("*");

      if (campaignError) throw campaignError;
      setCampaigns(campaignData || []);

      // Extract all participants from campaigns
      const allParticipants =
        campaignData?.flatMap((campaign) => campaign.participants_data || []) ||
        [];
      setParticipants(allParticipants);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on date range
  const filterDataByDateRange = (data: any[]) => {
    return data.filter((item) => {
      const itemDate = new Date(
        item.start_date || item.applied_at || item.created_at
      );
      return itemDate >= dateRange.from! && itemDate <= dateRange.to!;
    });
  };

  const filteredCampaigns = filterDataByDateRange(campaigns);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics Dashboard"
        description="Track and analyze your environmental campaign performance"
      />

      <div className="flex justify-end mb-6">
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>

      {loading ? (
        <AnalyticsSkeletonLoader />
      ) : (
        <div className="space-y-6">
          <AnalyticsSummary
            campaigns={filteredCampaigns}
            participants={participants}
          />

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">
                Campaign Performance
              </TabsTrigger>
              <TabsTrigger value="participants">
                Participant Metrics
              </TabsTrigger>
              <TabsTrigger value="engagement">Engagement Trends</TabsTrigger>
              <TabsTrigger value="regional">Regional Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="mt-6">
              <CampaignPerformance campaigns={filteredCampaigns} />
            </TabsContent>

            <TabsContent value="participants" className="mt-6">
              <ParticipantMetrics
                campaigns={filteredCampaigns}
                participants={participants}
              />
            </TabsContent>

            <TabsContent value="engagement" className="mt-6">
              <EngagementOverTime
                campaigns={filteredCampaigns}
                dateRange={dateRange}
              />
            </TabsContent>

            <TabsContent value="regional" className="mt-6">
              <RegionalImpact campaigns={filteredCampaigns} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </DashboardShell>
  );
}

// Date Range Picker Component
interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  className?: string;
}

function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(dateRange);

  // Predefined date ranges
  const handlePredefinedRange = (days: number) => {
    const to = new Date();
    const from = addDays(to, -days);
    setDate({ from, to });
    onDateRangeChange({ from, to });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-3 border-b">
            <div className="flex gap-2 mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePredefinedRange(7)}
              >
                Last 7 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePredefinedRange(30)}
              >
                Last 30 days
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePredefinedRange(90)}
              >
                Last 90 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePredefinedRange(365)}
              >
                Last year
              </Button>
            </div>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              if (selectedDate?.from && selectedDate?.to) {
                onDateRangeChange(selectedDate);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Analytics Summary Component
interface AnalyticsSummaryProps {
  campaigns: any[];
  participants: any[];
}

function AnalyticsSummary({ campaigns, participants }: AnalyticsSummaryProps) {
  // Calculate total active campaigns
  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "active"
  ).length;

  // Calculate total participants
  const totalParticipants = campaigns.reduce(
    (sum, campaign) => sum + (campaign.participants || 0),
    0
  );

  // Calculate approval rate
  const approvedParticipants = participants.filter(
    (p) => p.approval_status === "approved"
  ).length;
  const approvalRate = participants.length
    ? Math.round((approvedParticipants / participants.length) * 100)
    : 0;

  // Calculate campaign completion rate
  const completedCampaigns = campaigns.filter(
    (campaign) => campaign.status === "completed"
  ).length;
  const completionRate = campaigns.length
    ? Math.round((completedCampaigns / campaigns.length) * 100)
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Campaigns
          </CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCampaigns}</div>
          <p className="text-xs text-muted-foreground">
            {campaigns.length} total campaigns
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Participants
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalParticipants}</div>
          <p className="text-xs text-muted-foreground">
            {approvedParticipants} approved volunteers
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvalRate}%</div>
          <p className="text-xs text-muted-foreground">
            {approvedParticipants} of {participants.length} applications
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {completedCampaigns} of {campaigns.length} campaigns
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Campaign Performance Component
interface CampaignPerformanceProps {
  campaigns: any[];
}

function CampaignPerformance({ campaigns }: CampaignPerformanceProps) {
  // Sort campaigns by participant count (descending)
  const sortedCampaigns = [...campaigns]
    .sort((a, b) => (b.participants || 0) - (a.participants || 0))
    .slice(0, 5); // Top 5 campaigns

  // Prepare data for the chart
  const chartData = sortedCampaigns.map((campaign) => {
    const participantTarget = campaign.participant_target || 0;
    const currentParticipants = campaign.participants || 0;
    const completionPercentage = participantTarget
      ? Math.min(
          Math.round((currentParticipants / participantTarget) * 100),
          100
        )
      : 0;

    return {
      name: campaign.name,
      participants: currentParticipants,
      target: participantTarget,
      completion: completionPercentage,
    };
  });

  // Status colors for badges
  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800",
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>
            Participant recruitment progress for top campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="border border-border bg-background p-2 shadow-sm rounded-md">
                          <p className="font-medium">
                            {payload[0].payload.name}
                          </p>
                          <p className="text-sm">Current: {payload[0].value}</p>
                          <p className="text-sm">Target: {payload[1].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="participants"
                  name="Current Participants"
                  fill="hsl(var(--chart-1))"
                />
                <Bar
                  dataKey="target"
                  name="Target"
                  fill="hsl(var(--chart-2))"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recruitment Progress</CardTitle>
          <CardDescription>
            Participant recruitment progress for each campaign
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedCampaigns.map((campaign) => {
              const participantTarget = campaign.participant_target || 0;
              const currentParticipants = campaign.participants || 0;
              const progressPercentage = participantTarget
                ? Math.min(
                    Math.round((currentParticipants / participantTarget) * 100),
                    100
                  )
                : 0;

              return (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{campaign.name}</span>
                      <Badge className={statusColors[campaign.status]}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {currentParticipants} / {participantTarget} participants
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Participant Metrics Component
interface ParticipantMetricsProps {
  campaigns: any[];
  participants: any[];
}

function ParticipantMetrics({
  campaigns,
  participants,
}: ParticipantMetricsProps) {
  // Calculate approval status distribution
  const approvalStatusData = [
    {
      name: "Approved",
      value: participants.filter((p) => p.approval_status === "approved")
        .length,
      color: "hsl(var(--chart-1))",
    },
    {
      name: "Pending",
      value: participants.filter((p) => p.approval_status === "pending").length,
      color: "hsl(var(--chart-2))",
    },
    {
      name: "Rejected",
      value: participants.filter((p) => p.approval_status === "rejected")
        .length,
      color: "hsl(var(--chart-3))",
    },
  ].filter((item) => item.value > 0);

  // Calculate age distribution
  const ageGroups = {
    "Under 18": 0,
    "18-24": 0,
    "25-34": 0,
    "35-44": 0,
    "45-54": 0,
    "55+": 0,
  };

  participants.forEach((participant) => {
    const age = Number.parseInt(participant.age);
    if (isNaN(age)) return;

    if (age < 18) ageGroups["Under 18"]++;
    else if (age >= 18 && age <= 24) ageGroups["18-24"]++;
    else if (age >= 25 && age <= 34) ageGroups["25-34"]++;
    else if (age >= 35 && age <= 44) ageGroups["35-44"]++;
    else if (age >= 45 && age <= 54) ageGroups["45-54"]++;
    else ageGroups["55+"]++;
  });

  const ageDistributionData = Object.entries(ageGroups)
    .map(([name, value], index) => ({
      name,
      value,
      color: [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
        "hsl(var(--chart-1))",
      ][index],
    }))
    .filter((item) => item.value > 0);

  // Calculate campaign distribution
  const campaignDistributionData = campaigns
    .map((campaign, index) => ({
      name: campaign.name,
      value: campaign.participants || 0,
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    }))
    .filter((item) => item.value > 0)
    .slice(0, 6); // Limit to 6 campaigns for better visualization

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Approval Status</CardTitle>
          <CardDescription>
            Distribution of participant approval statuses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={approvalStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {approvalStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>
            Age groups of participants across all campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {ageDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Campaign Distribution</CardTitle>
          <CardDescription>
            Distribution of participants across campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={campaignDistributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {campaignDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Engagement Over Time Component
interface EngagementOverTimeProps {
  campaigns: any[];
  dateRange: DateRange;
}

function EngagementOverTime({ campaigns, dateRange }: EngagementOverTimeProps) {
  if (!dateRange.from || !dateRange.to) return null;

  // Determine the interval type based on date range
  const daysDifference = Math.ceil(
    (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
  );

  let intervalType: "day" | "week" | "month" = "day";
  if (daysDifference > 90) {
    intervalType = "month";
  } else if (daysDifference > 30) {
    intervalType = "week";
  }

  // Generate intervals based on the selected date range
  let intervals: Date[] = [];
  if (intervalType === "day") {
    intervals = eachDayOfInterval({ start: dateRange.from, end: dateRange.to });
  } else if (intervalType === "week") {
    intervals = eachWeekOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    });
  } else {
    intervals = eachMonthOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    });
  }

  // Format the interval for display
  const formatInterval = (date: Date) => {
    if (intervalType === "day") return format(date, "MMM d");
    if (intervalType === "week") return `Week of ${format(date, "MMM d")}`;
    return format(date, "MMM yyyy");
  };

  // Check if a date falls within an interval
  const isInInterval = (date: Date, interval: Date) => {
    if (intervalType === "day") return isSameDay(date, interval);
    if (intervalType === "week")
      return isSameWeek(date, interval, { weekStartsOn: 1 });
    return isSameMonth(date, interval);
  };

  // Calculate new participants per interval
  const participantData = intervals.map((interval) => {
    // Count new participants in this interval
    const newParticipants = campaigns.flatMap((campaign) =>
      (campaign.participants_data || []).filter((p: any) => {
        if (!p.applied_at) return false;
        const appliedDate = new Date(p.applied_at);
        return isInInterval(appliedDate, interval);
      })
    ).length;

    // Count new campaigns in this interval
    const newCampaigns = campaigns.filter((campaign) => {
      if (!campaign.created_at) return false;
      const createdDate = new Date(campaign.created_at);
      return isInInterval(createdDate, interval);
    }).length;

    return {
      date: formatInterval(interval),
      newParticipants,
      newCampaigns,
    };
  });

  // Calculate cumulative participants over time
  let cumulativeParticipants = 0;
  const cumulativeData = participantData.map((data) => {
    cumulativeParticipants += data.newParticipants;
    return {
      ...data,
      totalParticipants: cumulativeParticipants,
    };
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>New Engagement Over Time</CardTitle>
          <CardDescription>
            New participants and campaigns over the selected time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={participantData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newParticipants"
                  name="New Participants"
                  stroke="hsl(var(--chart-1))"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="newCampaigns"
                  name="New Campaigns"
                  stroke="hsl(var(--chart-2))"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cumulative Growth</CardTitle>
          <CardDescription>
            Total participant growth over the selected time period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={cumulativeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalParticipants"
                  name="Total Participants"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Regional Impact Component
interface RegionalImpactProps {
  campaigns: any[];
}

function RegionalImpact({ campaigns }: RegionalImpactProps) {
  // Extract and count locations
  const locationCounts: Record<string, number> = {};
  const locationParticipants: Record<string, number> = {};

  campaigns.forEach((campaign) => {
    const location = campaign.locations || "Unknown";

    // Count campaigns per location
    locationCounts[location] = (locationCounts[location] || 0) + 1;

    // Count participants per location
    locationParticipants[location] =
      (locationParticipants[location] || 0) + (campaign.participants || 0);
  });

  // Convert to array for chart
  const locationData = Object.entries(locationCounts)
    .map(([name, count]) => ({
      name,
      campaigns: count,
      participants: locationParticipants[name] || 0,
    }))
    .sort((a, b) => b.participants - a.participants);

  // Get top locations for display
  const topLocations = [...locationData].slice(0, 5);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Regional Distribution</CardTitle>
          <CardDescription>
            Campaign and participant distribution by location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={locationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="campaigns"
                  name="Campaigns"
                  fill="hsl(var(--chart-1))"
                />
                <Bar
                  dataKey="participants"
                  name="Participants"
                  fill="hsl(var(--chart-2))"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Locations</CardTitle>
          <CardDescription>
            Locations with the highest participation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topLocations.map((location, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{location.name}</h4>
                    <Badge variant="outline">
                      {location.campaigns} campaigns
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {location.participants} total participants
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location Impact</CardTitle>
          <CardDescription>
            Environmental impact metrics by region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topLocations.map((location, index) => {
              // Calculate a mock environmental impact score based on participants
              const impactScore = Math.round(location.participants * 2.5);
              // Calculate a mock carbon offset (kg) based on participants
              const carbonOffset = Math.round(location.participants * 12.3);

              return (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium">{location.name}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Impact Score
                      </p>
                      <p className="text-lg font-bold">{impactScore}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Carbon Offset
                      </p>
                      <p className="text-lg font-bold">{carbonOffset} kg</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Skeleton Loader Component
function AnalyticsSkeletonLoader() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
