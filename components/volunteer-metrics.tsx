"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

export function VolunteerMetrics() {
  const volunteerData = [
    { name: "Active", value: 1200, color: "#16a34a" },
    { name: "Inactive", value: 300, color: "#d1d5db" },
  ];

  const hoursData = [
    { month: "Jan", hours: 1200 },
    { month: "Feb", hours: 1400 },
    { month: "Mar", hours: 1800 },
    { month: "Apr", hours: 2200 },
    { month: "May", hours: 2600 },
    { month: "Jun", hours: 3000 },
  ];

  const demographicsData = [
    { name: "18-24", value: 25, color: "#059669" },
    { name: "25-34", value: 35, color: "#10b981" },
    { name: "35-44", value: 20, color: "#34d399" },
    { name: "45+", value: 20, color: "#6ee7b7" },
  ];

  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-green-600" />
          <CardTitle className="text-sm font-medium">
            Volunteer Analytics
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,500 Volunteers</div>
        <p className="text-xs text-muted-foreground">80% active volunteers</p>
        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  active: {
                    label: "Active",
                    color: "#16a34a",
                  },
                  inactive: {
                    label: "Inactive",
                    color: "#d1d5db",
                  },
                }}
              >
                <PieChart>
                  <Pie
                    data={volunteerData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {volunteerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Retention Rate</span>
                <span className="text-2xl font-bold">85%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Event Participation</span>
                <span className="text-2xl font-bold">750</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="hours">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  hours: {
                    label: "Hours",
                    color: "#16a34a",
                  },
                }}
              >
                <BarChart data={hoursData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="hours" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="pt-4 text-center">
              <span className="text-sm font-medium">Total Hours YTD</span>
              <span className="block text-2xl font-bold">12,200</span>
            </div>
          </TabsContent>
          <TabsContent value="demographics">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  value: {
                    label: "Percentage",
                    color: "#16a34a",
                  },
                }}
              >
                <PieChart>
                  <Pie
                    data={demographicsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {demographicsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
