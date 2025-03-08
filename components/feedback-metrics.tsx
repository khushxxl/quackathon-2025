"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
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

export function FeedbackMetrics() {
  const sentimentData = [
    { name: "Positive", value: 68, color: "#16a34a" },
    { name: "Neutral", value: 24, color: "#d1d5db" },
    { name: "Negative", value: 8, color: "#ef4444" },
  ];

  const themesData = [
    { theme: "Program Quality", count: 245 },
    { theme: "Logistics", count: 180 },
    { theme: "Materials", count: 120 },
    { theme: "Staff", count: 95 },
    { theme: "Facilities", count: 60 },
  ];

  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-green-600" />
          <CardTitle className="text-sm font-medium">
            Feedback Analytics
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">1,250 Feedback Responses</div>
        <p className="text-xs text-muted-foreground">68% positive sentiment</p>
        <Tabs defaultValue="sentiment" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="nps">NPS</TabsTrigger>
          </TabsList>
          <TabsContent value="sentiment" className="space-y-4">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  positive: {
                    label: "Positive",
                    color: "#16a34a",
                  },
                  neutral: {
                    label: "Neutral",
                    color: "#d1d5db",
                  },
                  negative: {
                    label: "Negative",
                    color: "#ef4444",
                  },
                }}
              >
                <PieChart>
                  <Pie
                    data={sentimentData}
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
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="themes">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  count: {
                    label: "Mentions",
                    color: "#16a34a",
                  },
                }}
              >
                <BarChart data={themesData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="theme" />
                  <YAxis />
                  <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="nps" className="space-y-4 mt-4">
            <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <span className="text-sm font-medium text-green-800 dark:text-green-300">
                Net Promoter Score
              </span>
              <span className="text-3xl font-bold text-green-600">42</span>
              <span className="text-xs text-green-700 dark:text-green-400 mt-1">
                Good (35-50 range)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
                <span className="text-xs font-medium text-red-800 dark:text-red-300">
                  Detractors
                </span>
                <span className="text-lg font-bold text-red-600">18%</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <span className="text-xs font-medium">Passives</span>
                <span className="text-lg font-bold">22%</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                <span className="text-xs font-medium text-green-800 dark:text-green-300">
                  Promoters
                </span>
                <span className="text-lg font-bold text-green-600">60%</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
