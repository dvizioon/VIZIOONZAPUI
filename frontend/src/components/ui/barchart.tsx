
import * as React from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts"
import { Card } from "@/components/ui/card"

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string | string[];
    borderWidth?: number;
  }[];
}

export interface BarChartProps {
  data: ChartData;
  className?: string;
  options?: {
    responsive?: boolean;
    plugins?: {
      legend?: {
        position?: 'top' | 'bottom' | 'left' | 'right';
      };
    };
    scales?: {
      x?: {
        grid?: {
          display?: boolean;
        };
        beginAtZero?: boolean;
        max?: number;
      };
      y?: {
        beginAtZero?: boolean;
        grid?: {
          display?: boolean;
        };
      };
    };
    indexAxis?: 'x' | 'y';
  };
}

// Function to transform the Chart.js style data to Recharts style data
const transformDataForRecharts = (chartData: ChartData) => {
  const { labels, datasets } = chartData;
  
  return labels.map((label, index) => {
    const dataPoint: Record<string, any> = { labels: label };
    
    datasets.forEach((dataset, datasetIndex) => {
      dataPoint[`datasets[${datasetIndex}].data`] = dataset.data[index];
    });
    
    return dataPoint;
  });
};

export function BarChart({ data, className, options }: BarChartProps) {
  const isHorizontal = options?.indexAxis === 'y';
  const transformedData = transformDataForRecharts(data);
  
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsBarChart
        data={transformedData}
        layout={isHorizontal ? "vertical" : "horizontal"}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis 
          type={isHorizontal ? "number" : "category"} 
          dataKey={isHorizontal ? undefined : "labels"}
          hide={!data.labels || data.labels.length === 0}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
          domain={isHorizontal && options?.scales?.x?.max ? [0, options.scales.x.max] : undefined}
        />
        <YAxis 
          type={isHorizontal ? "category" : "number"}
          dataKey={isHorizontal ? "labels" : undefined}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
          hide={isHorizontal && (!data.labels || data.labels.length === 0)}
          domain={!isHorizontal && options?.scales?.y?.beginAtZero ? [0, 'auto'] : undefined}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
          contentStyle={{ 
            backgroundColor: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.375rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            padding: '0.5rem'
          }}
        />
        <Legend 
          verticalAlign={options?.plugins?.legend?.position === 'bottom' ? 'bottom' : 'top'}
          align={
            options?.plugins?.legend?.position === 'left' ? 'left' :
            options?.plugins?.legend?.position === 'right' ? 'right' : 'center'
          }
        />
        {data.datasets.map((dataset, index) => (
          <Bar 
            key={index}
            dataKey={`datasets[${index}].data`}
            name={dataset.label}
            fill={Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : dataset.backgroundColor}
            stroke={Array.isArray(dataset.borderColor) ? dataset.borderColor[0] : dataset.borderColor}
            strokeWidth={dataset.borderWidth || 1}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function LineChart({ data, className, options }: BarChartProps) {
  return (
    <Card className={className}>
      {/* We'll implement LineChart later if needed */}
      <div className="p-4 text-center">Line Chart Component</div>
    </Card>
  )
}
