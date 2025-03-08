"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Progress } from "@/components/ui/progress";

export function ProgramMetrics() {
  const utilizationData = [
    { program: "Tree Planting", capacity: 100, attended: 95 },
    { program: "Beach Cleanup", capacity: 80, attended: 72 },
    { program: "Recycling Workshop", capacity: 50, attended: 48 },
    { program: "Conservation Talk", capacity: 120, attended: 98 },
  ];

  const materialData = [
    { material: "Guides", downloads: 1250 },
    { material: "Videos", downloads: 980 },
    { material: "Presentations", downloads: 750 },
    { material: "Worksheets", downloads: 620 },
  ];

  return (
    <Card className="col-span-1 row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4 text-green-600" />
          <CardTitle className="text-sm font-medium">
            Program Analytics
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">24 Active Programs</div>
        <p className="text-xs text-muted-foreground">12,500 people impacted</p>
        <Tabs defaultValue="utilization" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="utilization">Utilization</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="utilization" className="space-y-4 mt-4">
            {utilizationData.map((program) => (
              <div key={program.program} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>{program.program}</span>
                  <span>
                    {program.attended}/{program.capacity}
                  </span>
                </div>
                <Progress
                  value={(program.attended / program.capacity) * 100}
                  className="h-2"
                />
              </div>
            ))}
            <div className="pt-2 text-center">
              <span className="text-sm font-medium">Average Utilization</span>
              <span className="block text-2xl font-bold">91%</span>
            </div>
          </TabsContent>
          <TabsContent value="materials">
            <div className="h-[200px] mt-4">
              <ChartContainer
                config={{
                  downloads: {
                    label: "Downloads",
                    color: "#16a34a",
                  },
                }}
              >
                <BarChart data={materialData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="material" />
                  <YAxis />
                  <Bar
                    dataKey="downloads"
                    fill="#16a34a"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="pt-2 text-center">
              <span className="text-sm font-medium">Total Downloads</span>
              <span className="block text-2xl font-bold">3,600</span>
            </div>
          </TabsContent>
          <TabsContent value="performance" className="space-y-4 mt-4">
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
            <div className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <span className="text-sm font-medium text-green-800 dark:text-green-300">
                Goals Achieved
              </span>
              <span className="text-3xl font-bold text-green-600">78%</span>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
