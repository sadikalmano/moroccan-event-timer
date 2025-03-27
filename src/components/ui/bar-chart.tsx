
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
import { useTheme } from '@/contexts/ThemeContext';

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
  colors = ["#74F4F2"], // Use our accent teal color as default
  className
}: BarChartProps) => {
  const { theme } = useTheme();
  
  // Set theme-specific colors
  const gridColor = theme === 'dark' ? '#3C4255' : '#E3E5F4';
  const textColor = theme === 'dark' ? '#E3E5F4' : '#2E3248';
  
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
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
        <XAxis 
          dataKey="category" 
          tick={{ fill: textColor }} 
          axisLine={{ stroke: gridColor }}
        />
        <YAxis 
          tick={{ fill: textColor }} 
          axisLine={{ stroke: gridColor }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-popover text-popover-foreground p-2 rounded shadow-lg border border-border">
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
