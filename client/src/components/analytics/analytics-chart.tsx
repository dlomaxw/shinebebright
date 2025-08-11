import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts";
import { format, parseISO } from "date-fns";

interface AnalyticsChartProps {
  data: any[];
  dataKey: string;
  valueKey: string;
  title: string;
  type?: "line" | "bar" | "area";
  color?: string;
  height?: number;
}

const AnalyticsChart = ({ 
  data, 
  dataKey, 
  valueKey, 
  title, 
  type = "line", 
  color = "#FFD700", 
  height = 300 
}: AnalyticsChartProps) => {
  
  // Process data for chart
  const processedData = data.map(item => ({
    ...item,
    date: format(parseISO(item[dataKey]), "MMM dd"),
    value: typeof item[valueKey] === 'object' ? 
      Object.values(item[valueKey] as any).reduce((a: any, b: any) => a + b, 0) : 
      item[valueKey]
  }));

  const chartComponents = {
    line: (
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#666" fontSize={12} />
        <YAxis stroke="#666" fontSize={12} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={3}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: color }}
        />
      </LineChart>
    ),
    bar: (
      <BarChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#666" fontSize={12} />
        <YAxis stroke="#666" fontSize={12} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    area: (
      <AreaChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#666" fontSize={12} />
        <YAxis stroke="#666" fontSize={12} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          fill={`${color}20`}
          strokeWidth={3}
        />
      </AreaChart>
    )
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        {chartComponents[type]}
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;