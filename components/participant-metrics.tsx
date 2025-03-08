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

export function ParticipantMetrics() {
  const attendanceData = [
    { name: "Attended", value: 85, color: "#16a34a" },
    { name: "Missed", value: 15, color: "#d1d5db" },
  ];

  const satisfactionData = [
    { rating: "5 Stars", count: 450 },
    { rating: "4 Stars", count: 320 },
    { rating: "3 Stars", count: 180 },
    { rating: "2 Stars", count: 40 },
    { rating: "1 Star", count: 10 },
  ];

  const demographicsData = [
    { name: "Urban", value: 55, color: "#059669" },
    { name: "Suburban", value: 30, color: "#10b981" },
    { name: "Rural", value: 15, color: "#34d399" },
  ];

  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-green-600" />
          <CardTitle className="text-sm font-medium">
            Participant Analytics
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">3,250 Participants</div>
        <p className="text-xs text-muted-foreground">85% attendance rate</p>
        <Tabs defaultValue="attendance" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>
          <TabsContent value="attendance" className="space-y-4">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  attended: {
                    label: "Attended",
                    color: "#16a34a",
                  },
                  missed: {
                    label: "Missed",
                    color: "#d1d5db",
                  },
                }}
              >
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="satisfaction">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  count: {
                    label: "Participants",
                    color: "#16a34a",
                  },
                }}
              >
                <BarChart data={satisfactionData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="pt-4 text-center">
              <span className="text-sm font-medium">Average Rating</span>
              <span className="block text-2xl font-bold">4.2/5</span>
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
