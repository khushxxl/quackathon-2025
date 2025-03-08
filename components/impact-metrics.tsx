"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export function ImpactMetrics() {
  const efficiencyData = [
    { program: "Tree Planting", ratio: 1.8 },
    { program: "Beach Cleanup", ratio: 2.2 },
    { program: "Recycling Workshop", ratio: 1.5 },
    { program: "Conservation Talk", ratio: 0.8 },
  ];

  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Leaf className="h-4 w-4 text-green-600" />
          <CardTitle className="text-sm font-medium">
            Organizational Impact
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$245,000 Budget</div>
        <p className="text-xs text-muted-foreground">
          $19.60 cost per participant
        </p>
        <Tabs defaultValue="efficiency" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
          </TabsList>
          <TabsContent value="efficiency" className="space-y-4 mt-4">
            <div className="h-[200px]">
              <ChartContainer
                config={{
                  ratio: {
                    label: "Volunteer-to-Participant Ratio",
                    color: "#16a34a",
                  },
                }}
              >
                <BarChart data={efficiencyData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="program" />
                  <YAxis />
                  <Bar dataKey="ratio" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="pt-2 text-center">
              <span className="text-sm font-medium">Average Ratio</span>
              <span className="block text-2xl font-bold">1.6:1</span>
            </div>
          </TabsContent>
          <TabsContent value="environmental" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  Trees Planted
                </span>
                <span className="text-3xl font-bold text-green-600">5,280</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  CO2 Offset
                </span>
                <span className="text-3xl font-bold text-green-600">125t</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  Waste Collected
                </span>
                <span className="text-3xl font-bold text-green-600">3.2t</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  Area Restored
                </span>
                <span className="text-3xl font-bold text-green-600">12ha</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
