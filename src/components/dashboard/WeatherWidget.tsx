import { Card } from "@/components/ui/card";
import { Cloud } from "lucide-react";

interface WeatherWidgetProps {
  title: string;
  temperature: number;
  condition: string;
  rain: number;
}

export const WeatherWidget = ({ title, temperature, condition, rain }: WeatherWidgetProps) => {
  return (
    <Card className="p-6 border-border bg-card">
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-4xl font-bold mb-2">{temperature}°C</p>
          <p className="text-sm text-muted-foreground">{condition}</p>
          <p className="text-xs text-muted-foreground">Estimated rain {rain}%</p>
        </div>
        <Cloud className="w-12 h-12 text-muted-foreground" />
      </div>
    </Card>
  );
};
