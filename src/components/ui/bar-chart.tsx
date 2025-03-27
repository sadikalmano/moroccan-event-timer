
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

interface BarChartProps {
  categories?: string[];
  series: {
    name: string;
    data: number[];
  }[];
  colors?: string[];
  className?: string;
}

export const BarChart = ({
  categories = [],
  series,
  colors = ["#36DFBF"],
  className
}: BarChartProps) => {
  // Transform the series data into a format that Recharts can use
  const data = series[0].data.map((value, index) => {
    const category = categories[index] || `Item ${index + 1}`;
    return {
      category,
      [series[0].name]: value
    };
  });

  return (
    <ChartContainer 
      config={{
        [series[0].name]: {
          color: colors[0]
        }
      }}
      className={className}
    >
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
        <XAxis 
          dataKey="category" 
          tick={{ fill: "#9CA3AF" }} 
          axisLine={{ stroke: "#333" }}
        />
        <YAxis 
          tick={{ fill: "#9CA3AF" }} 
          axisLine={{ stroke: "#333" }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-black/80 text-white p-2 rounded shadow-lg border border-gray-700">
                  <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey={series[0].name} 
          fill={colors[0]} 
          radius={[4, 4, 0, 0]} 
        />
      </RechartsBarChart>
    </ChartContainer>
  );
};
