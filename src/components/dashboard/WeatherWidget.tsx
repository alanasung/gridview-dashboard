import { Card } from "@/components/ui/card";
import { Cloud } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

interface WeatherWidgetProps {
  title: string;
  temperature: number;
  condition: string;
  rain: number;
}

// Generate hourly data for today
const generateTodayData = (currentTemp: number) => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const temp = currentTemp + Math.sin((i - 6) / 4) * 5 + (Math.random() - 0.5) * 2;
    return {
      time: `${hour.toString().padStart(2, '0')}:00`,
      temperature: Math.round(temp * 10) / 10,
    };
  });
  return hours;
};

export const WeatherWidget = ({ title, temperature, condition, rain }: WeatherWidgetProps) => {
  const todayData = generateTodayData(temperature);
  const currentHour = new Date().getHours();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:00`;
  
  return (
    <Card className="p-6 border-border bg-card">
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-4xl font-bold mb-2">{temperature}°C</p>
          <p className="text-sm text-muted-foreground">{condition}</p>
          <p className="text-xs text-muted-foreground">Estimated rain {rain}%</p>
        </div>
        <Cloud className="w-12 h-12 text-muted-foreground" />
      </div>

      {/* Temperature Graph */}
      <div>
        <p className="text-xs text-muted-foreground mb-2">Temperature Today</p>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={todayData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={35}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px"
              }}
              formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Temp']}
            />
            <ReferenceLine 
              x={currentTime} 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              strokeDasharray="3 3"
              label={{ 
                value: 'Now', 
                position: 'top',
                fill: 'hsl(var(--primary))',
                fontSize: 10
              }}
            />
            <Area 
              type="monotone" 
              dataKey="temperature" 
              stroke="hsl(var(--chart-1))" 
              fillOpacity={1} 
              fill="url(#tempGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
