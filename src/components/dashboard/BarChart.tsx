import { Card } from "@/components/ui/card";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface BarChartProps {
  title: string;
  subtitle?: string;
  data: Array<{ time: string; value: number; value2?: number }>;
  height?: number;
}

export const BarChartComponent = ({ title, subtitle, data, height = 200 }: BarChartProps) => {
  return (
    <Card className="p-6 border-border bg-card">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
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
          <Bar 
            dataKey="value" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
          />
          {data[0]?.value2 !== undefined && (
            <Bar 
              dataKey="value2" 
              fill="hsl(var(--secondary))" 
              radius={[4, 4, 0, 0]}
            />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  );
};
