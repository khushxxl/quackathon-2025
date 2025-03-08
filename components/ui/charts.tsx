"use client";

import * as React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Legend,
  TooltipProps,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./chart";

interface ChartProps {
  data: any[];
  valueFormatter?: (value: number) => string;
}

export function BarChart({
  data,
  valueFormatter = (value: number) => `${value}`,
}: ChartProps) {
  return (
    <ChartContainer
      config={{
        bar: {
          theme: {
            light: "hsl(142.1, 76.2%, 36.3%)",
            dark: "hsl(142.1, 70.6%, 45.3%)",
          },
        },
      }}
    >
      <RechartsBarChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          width={30}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => value as string}
              formatter={(value) => [valueFormatter(value as number), "Value"]}
            />
          }
        />
        <Bar
          dataKey="value"
          fill="var(--color-bar)"
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}

export function LineChart({
  data,
  valueFormatter = (value: number) => `${value}`,
}: ChartProps) {
  return (
    <ChartContainer
      config={{
        line: {
          theme: {
            light: "hsl(142.1, 76.2%, 36.3%)",
            dark: "hsl(142.1, 70.6%, 45.3%)",
          },
        },
      }}
    >
      <RechartsLineChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          width={30}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => value as string}
              formatter={(value) => [valueFormatter(value as number), "Value"]}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--color-line)"
          strokeWidth={2}
          dot={{ r: 4, fill: "var(--color-line)" }}
          activeDot={{ r: 6, fill: "var(--color-line)" }}
        />
      </RechartsLineChart>
    </ChartContainer>
  );
}

interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

export function PieChart({ data }: { data: PieChartData[] }) {
  const COLORS = data.map(
    (item) => item.color || `hsl(${Math.random() * 360}, 70%, 50%)`
  );

  return (
    <ChartContainer
      config={{
        pie: {
          theme: {
            light: "hsl(142.1, 76.2%, 36.3%)",
            dark: "hsl(142.1, 70.6%, 45.3%)",
          },
        },
      }}
    >
      <RechartsPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(value) => value as string}
              formatter={(value, name) => [value, name]}
            />
          }
        />
        <Legend
          content={<ChartLegendContent />}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </RechartsPieChart>
    </ChartContainer>
  );
}
