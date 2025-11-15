import { Card } from "@/components/ui/card";
import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface AreaChartProps {
  title: string;
  data: Array<{ time: string; value: number; value2?: number }>;
  height?: number;
}

export const AreaChartComponent = ({ title, data, height = 200 }: AreaChartProps) => {
  return (
    <Card className="p-6 border-border bg-card">
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="hsl(var(--primary))" 
            fillOpacity={1} 
            fill="url(#colorValue)"
            strokeWidth={2}
          />
          {data[0]?.value2 !== undefined && (
            <Area 
              type="monotone" 
              dataKey="value2" 
              stroke="hsl(var(--secondary))" 
              fillOpacity={1} 
              fill="url(#colorValue2)"
              strokeWidth={2}
            />
          )}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
