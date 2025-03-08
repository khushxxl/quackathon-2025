"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { mapDbCampaignToFrontend } from "@/lib/supabase";
import { Campaign } from "@/context/campaign-context";
import {
  BarChart3,
  Users,
  CalendarCheck,
  TrendingUp,
  ArrowUpRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";
import { PieChart, BarChart, LineChart } from "@/components/ui/charts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalCampaigns: 0,
    activeCampaigns: 0,
    upcomingCampaigns: 0,
    completedCampaigns: 0,
    avgCompletion: 0,
  });

  const [timeRange, setTimeRange] = useState("30d");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");
  const [goalCompletionTrend, setGoalCompletionTrend] = useState([
    { name: "Week 1", value: 65 },
    { name: "Week 2", value: 73 },
    { name: "Week 3", value: 82 },
    { name: "Week 4", value: 91 },
  ]);

  const [environmentalImpact, setEnvironmentalImpact] = useState({
    carbonSaved: 1240,
    treesPlanted: 350,
    wasteRecycled: 2800,
    waterConserved: 4500,
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    // Apply filters whenever campaigns or filter settings change
    applyFilters();
  }, [campaigns, statusFilter, dateSort]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("campaigns").select("*");

      if (error) throw error;

      if (!data) {
        setCampaigns([]);
        setFilteredCampaigns([]);
        setStats({
          totalParticipants: 0,
          totalCampaigns: 0,
          activeCampaigns: 0,
          upcomingCampaigns: 0,
          completedCampaigns: 0,
          avgCompletion: 0,
        });
        return;
      }

      const mappedCampaigns = data.map(mapDbCampaignToFrontend);
      setCampaigns(mappedCampaigns);

      // Calculate stats
      const totalParticipants = mappedCampaigns.reduce(
        (sum, campaign) => sum + campaign.participants,
        0
      );

      const activeCampaigns = mappedCampaigns.filter(
        (c) => c.status === "active"
      ).length;

      const upcomingCampaigns = mappedCampaigns.filter(
        (c) => c.status === "upcoming"
      ).length;

      const completedCampaigns = mappedCampaigns.filter(
        (c) => c.status === "completed"
      ).length;

      // Calculate average completion percentage
      const campaignsWithTargets = mappedCampaigns.filter(
        (c) => c.goals.participantTarget > 0
      );

      const avgCompletion = campaignsWithTargets.length
        ? campaignsWithTargets.reduce(
            (sum, campaign) =>
              sum +
              (campaign.participants / campaign.goals.participantTarget) *
                100,
            0
          ) / campaignsWithTargets.length
        : 0;

      setStats({
        totalParticipants,
        totalCampaigns: mappedCampaigns.length,
        activeCampaigns,
        upcomingCampaigns,
        completedCampaigns,
        avgCompletion,
      });
    } catch (err: any) {
      console.error("Error fetching campaigns:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...campaigns];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((campaign) => campaign.status === statusFilter);
    }

    // Apply date sorting
    if (dateSort === "newest") {
      filtered.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    } else if (dateSort === "oldest") {
      filtered.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    } else if (dateSort === "mostParticipants") {
      filtered.sort((a, b) => b.participants - a.participants);
    } else if (dateSort === "highestCompletion") {
      filtered.sort((a, b) => {
        const completionA = a.goals.participantTarget > 0 
          ? (a.participants / a.goals.participantTarget) * 100 
          : 0;
        const completionB = b.goals.participantTarget > 0 
          ? (b.participants / b.goals.participantTarget) * 100 
          : 0;
        return completionB - completionA;
      });
    }

    setFilteredCampaigns(filtered);
  };

  const refreshData = () => {
    fetchCampaigns();
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Analytics Dashboard"
        description="Track the impact of your environmental initiatives"
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center">
            <RefreshCw className="h-8 w-8 text-green-600 animate-spin mb-2" />
            <p>Loading campaign data...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center">
            <p className="text-red-500 mb-4">Error loading data: {error}</p>
            <Button onClick={refreshData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Filter Controls */}
          <div className="flex justify-center mb-6">
            <div className="flex flex-wrap gap-4 max-w-6xl w-full">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateSort} onValueChange={setDateSort}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="mostParticipants">Most Participants</SelectItem>
                  <SelectItem value="highestCompletion">Highest Completion</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                className="ml-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Key Metrics Summary Row */}
          <div className="flex justify-center mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl w-full">
              <Card className="bg-green-50 dark:bg-green-900/20 border-none">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-green-100 p-2 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.totalParticipants}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total Participants
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-none">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-blue-100 p-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.totalCampaigns}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total Campaigns
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-amber-50 dark:bg-amber-900/20 border-none">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-amber-100 p-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.avgCompletion.toFixed(0)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Avg. Completion
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 dark:bg-purple-900/20 border-none">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-purple-100 p-2 mb-2">
                    <CalendarCheck className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {stats.activeCampaigns}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active Campaigns
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
              {/* Environmental Impact Card */}
              <Card className="col-span-1 lg:col-span-3 shadow-sm border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-700">
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                      <span className="text-3xl font-bold text-green-600">
                        {environmentalImpact.carbonSaved}
                      </span>
                      <span className="text-sm text-green-700">
                        kg CO2 Saved
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-emerald-50 rounded-lg">
                      <span className="text-3xl font-bold text-emerald-600">
                        {environmentalImpact.treesPlanted}
                      </span>
                      <span className="text-sm text-emerald-700">
                        Trees Planted
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-3xl font-bold text-blue-600">
                        {environmentalImpact.wasteRecycled}
                      </span>
                      <span className="text-sm text-blue-700">
                        kg Waste Recycled
                      </span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-cyan-50 rounded-lg">
                      <span className="text-3xl font-bold text-cyan-600">
                        {environmentalImpact.waterConserved}
                      </span>
                      <span className="text-sm text-cyan-700">
                        L Water Conserved
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Participant Overview
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalParticipants} Participants
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all campaigns
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Campaign Completion</p>
                    <Progress value={stats.avgCompletion} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {stats.avgCompletion.toFixed(1)}% average target
                      completion
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Status - Pie Chart */}
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Campaign Status
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalCampaigns} Total Campaigns
                  </div>
                  <div className="h-40 mt-4">
                    {stats.totalCampaigns > 0 ? (
                      <PieChart
                        data={[
                          {
                            name: "Active",
                            value: stats.activeCampaigns,
                            color: "hsl(142.1, 76.2%, 36.3%)",
                          },
                          {
                            name: "Upcoming",
                            value: stats.upcomingCampaigns,
                            color: "hsl(221.2, 83.2%, 53.3%)",
                          },
                          {
                            name: "Completed",
                            value: stats.completedCampaigns,
                            color: "hsl(220, 14.3%, 95.9%)",
                          },
                        ]}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground text-sm">No campaign data available</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Campaigns */}
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <CalendarCheck className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Recent Campaigns
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredCampaigns.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No campaigns found with current filters
                      </p>
                    ) : (
                      filteredCampaigns.slice(0, 3).map((campaign) => (
                        <div
                          key={campaign.id}
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {campaign.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Starts:{" "}
                              {format(campaign.startDate, "MMM d, yyyy")}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <div className="text-xs mr-2">
                              <span className="font-medium">
                                {campaign.participants}/
                                {campaign.goals.participantTarget || "∞"}
                              </span>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs ${
                                campaign.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : campaign.status === "upcoming"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {campaign.status}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Campaigns - Bar Chart */}
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Top Performing
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-40 mb-4">
                    {campaigns.filter(c => c.goals.participantTarget > 0).length > 0 ? (
                      <BarChart
                        data={campaigns
                          .filter((c) => c.goals.participantTarget > 0)
                          .sort(
                            (a, b) =>
                              b.participants / b.goals.participantTarget -
                              a.participants / a.goals.participantTarget
                          )
                          .slice(0, 3)
                          .map((campaign) => {
                            const percentage =
                              (campaign.participants /
                                campaign.goals.participantTarget) *
                              100;
                            return {
                              name: campaign.name.length > 10 
                                ? campaign.name.substring(0, 10) + '...' 
                                : campaign.name,
                              value: percentage > 100 ? 100 : percentage,
                            };
                          })}
                        valueFormatter={(value) => `${value.toFixed(0)}%`}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground text-sm">No campaigns with targets</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {campaigns
                      .filter((c) => c.goals.participantTarget > 0)
                      .sort(
                        (a, b) =>
                          b.participants / b.goals.participantTarget -
                          a.participants / a.goals.participantTarget
                      )
                      .slice(0, 3)
                      .map((campaign) => {
                        const percentage =
                          (campaign.participants /
                            campaign.goals.participantTarget) *
                          100;
                        return (
                          <div key={campaign.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-medium">
                                {campaign.name}
                              </span>
                              <span>
                                {campaign.participants}/
                                {campaign.goals.participantTarget}
                              </span>
                            </div>
                            <Progress
                              value={percentage > 100 ? 100 : percentage}
                              className="h-2"
                            />
                            <div className="flex justify-end">
                              <span className="text-xs text-green-600">
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Growth - Line Chart */}
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-sm font-medium">
                      Engagement Growth
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-40 mb-4">
                    {campaigns.length > 0 ? (
                      <LineChart
                        data={campaigns
                          .sort(
                            (a, b) =>
                              a.startDate.getTime() - b.startDate.getTime()
                          )
                          .map((campaign, index) => ({
                            name: format(campaign.startDate, "MMM d"),
                            value: campaign.participants,
                          }))}
                        valueFormatter={(value) => `${value} participants`}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground text-sm">No campaign data available</p>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-xs text-green-700 dark:text-green-300">
                        Avg. Participants
                      </span>
                      <div className="flex items-baseline mt-2">
                        <span className="text-2xl font-bold text-green-600">
                          {stats.totalCampaigns
                            ? Math.round(
                                stats.totalParticipants / stats.totalCampaigns
                              )
                            : 0}
                        </span>
                        <span className="ml-2 text-xs text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          per campaign
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="text-xs text-green-700 dark:text-green-300">
                        Completion Rate
                      </span>
                      <div className="flex items-baseline mt-2">
                        <span className="text-2xl font-bold text-green-600">
                          {stats.avgCompletion.toFixed(0)}%
                        </span>
                        <span className="ml-2 text-xs text-green-600 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          avg. targets
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Timeline */}
              <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <CalendarCheck className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Upcoming Timeline
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredCampaigns
                      .filter((c) => c.status === "upcoming")
                      .sort(
                        (a, b) => a.startDate.getTime() - b.startDate.getTime()
                      )
                      .slice(0, 4)
                      .map((campaign) => (
                        <div
                          key={campaign.id}
                          className="flex items-center border-l-2 border-green-500 pl-3"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {campaign.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {format(campaign.startDate, "MMMM d, yyyy")}
                            </p>
                            <p className="text-xs">
                              Target:{" "}
                              {campaign.goals.participantTarget || "Not set"}
                            </p>
                          </div>
                        </div>
                      ))}
                    {filteredCampaigns.filter((c) => c.status === "upcoming").length ===
                      0 && (
                      <p className="text-muted-foreground text-sm">
                        No upcoming campaigns
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Goal Completion Trend */}
              <Card className="col-span-1 lg:col-span-2 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Goal Completion Trend
                    </CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    {["7d", "30d", "90d"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`text-xs px-2 py-1 rounded ${
                          timeRange === range
                            ? "bg-green-100 text-green-700"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <LineChart
                      data={goalCompletionTrend}
                      valueFormatter={(value) => `${value}%`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Participant Demographics */}
              <Card className="col-span-1 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Participant Demographics
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="age">
                    <TabsList className="mb-4">
                      <TabsTrigger value="age">Age</TabsTrigger>
                      <TabsTrigger value="location">Location</TabsTrigger>
                    </TabsList>
                    <TabsContent value="age">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>18-24</span>
                          <span>32%</span>
                        </div>
                        <Progress value={32} className="h-2" />

                        <div className="flex justify-between text-xs">
                          <span>25-34</span>
                          <span>41%</span>
                        </div>
                        <Progress value={41} className="h-2" />

                        <div className="flex justify-between text-xs">
                          <span>35-44</span>
                          <span>18%</span>
                        </div>
                        <Progress value={18} className="h-2" />

                        <div className="flex justify-between text-xs">
                          <span>45+</span>
                          <span>9%</span>
                        </div>
                        <Progress value={9} className="h-2" />
                      </div>
                    </TabsContent>

                    <div>
                      <p className="text-sm font-medium mb-1">Top Locations</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>New York</span>
                          <span>24%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Los Angeles</span>
                          <span>18%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Chicago</span>
                          <span>12%</span>
                        </div>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
}
