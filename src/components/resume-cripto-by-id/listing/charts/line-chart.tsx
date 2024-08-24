"use client";
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface LineChartComponentProps {
  color: string;
}

export function LineChartComponent({ color }: LineChartComponentProps) {
  // Dados representando as últimas 24 horas
  const chartData = [
    { time: "00:00", change: -1.2 },
    { time: "04:00", change: -2.5 },
  ];

  const chartConfig = {
    change: {
      label: "Price Change (24h)",
      color,
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
          <XAxis dataKey="time" hide />
          <YAxis domain={["auto", "auto"]} hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="change"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
