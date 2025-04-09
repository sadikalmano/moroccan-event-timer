
import React from 'react';

interface BarChartProps {
  data: {
    label: string;
    value: number;
  }[];
  className?: string;
  color?: string;
  highlightIndex?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  className = "", 
  color = "#74F4F2",  // Default to teal highlight color
  highlightIndex
}) => {
  // Find the maximum value to normalize heights
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className={`flex items-end justify-between h-full ${className}`}>
      {data.map((item, index) => {
        const isHighlighted = highlightIndex === index;
        const normalizedHeight = `${(item.value / maxValue) * 100}%`;
        
        return (
          <div 
            key={index} 
            className="h-full flex-1 flex flex-col justify-end px-1"
          >
            <div 
              style={{ 
                height: normalizedHeight,
                backgroundColor: isHighlighted ? color : 'rgba(255, 255, 255, 0.2)',
              }}
              className="rounded-t-sm w-full transition-all duration-300"
            />
            <div className="text-xs text-center mt-2 text-gray-400">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};
