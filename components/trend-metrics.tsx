"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

export function TrendMetrics() {
  const participationData = [
    { month: "Jan", volunteers: 1200, participants: 2800 },
    { month: "Feb", volunteers: 1250, participants: 3000 },
    { month: "Mar", volunteers: 1400, participants: 3200 },
    { month: "Apr", volunteers: 1350, participants: 3100 },
    { month: "May", volunteers: 1500, participants: 3300 },
    { month: "Jun", volunteers: 1550, participants: 3500 },
  ];

  const attendanceData = [
    { month: "Jan", treePlanting: 92, beachCleanup: 85, workshop: 78 },
    { month: "Feb", treePlanting: 94, beachCleanup: 82, workshop: 80 },
    { month: "Mar", treePlanting: 91, beachCleanup: 88, workshop: 82 },
    { month: "Apr", treePlanting: 95, beachCleanup: 90, workshop: 85 },
    { month: "May", treePlanting: 97, beachCleanup: 92, workshop: 88 },
    { month: "Jun", treePlanting: 96, beachCleanup: 94, workshop: 90 },
  ];

  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <CardTitle className="text-sm font-medium">
            Trends & Comparisons
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+12% YoY Growth</div>
        <p className="text-xs text-muted-foreground">
          Consistent improvement across all metrics
        </p>
        <Tabs defaultValue="participation" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="participation">Participation</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>
          <TabsContent value="participation" className="space-y-4">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  volunteers: {
                    label: "Volunteers",
                    color: "#16a34a",
                  },
                  participants: {
                    label: "Participants",
                    color: "#10b981",
                  },
                }}
              >
                <LineChart data={participationData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="volunteers"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="participants"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="attendance">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  treePlanting: {
                    label: "Tree Planting",
                    color: "#16a34a",
                  },
                  beachCleanup: {
                    label: "Beach Cleanup",
                    color: "#0ea5e9",
                  },
                  workshop: {
                    label: "Workshops",
                    color: "#8b5cf6",
                  },
                }}
              >
                <AreaChart data={attendanceData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Area
                    type="monotone"
                    dataKey="treePlanting"
                    stroke="#16a34a"
                    fill="#16a34a"
                    fillOpacity={0.2}
                    stackId="1"
                  />
                  <Area
                    type="monotone"
                    dataKey="beachCleanup"
                    stroke="#0ea5e9"
                    fill="#0ea5e9"
                    fillOpacity={0.2}
                    stackId="2"
                  />
                  <Area
                    type="monotone"
                    dataKey="workshop"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.2}
                    stackId="3"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </AreaChart>
              </ChartContainer>
            </div>
            <div className="pt-2 text-center">
              <span className="text-sm font-medium">Average Attendance</span>
              <span className="block text-2xl font-bold">89%</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
