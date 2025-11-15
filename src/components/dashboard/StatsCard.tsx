import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  unit: string;
  subtitle?: string;
  icon?: LucideIcon;
  indicator?: "green" | "orange" | "blue";
  details?: { label: string; value: string }[];
}

export const StatsCard = ({ title, value, unit, subtitle, icon: Icon, indicator, details }: StatsCardProps) => {
  const getIndicatorColor = () => {
    switch (indicator) {
      case "green": return "bg-primary";
      case "orange": return "bg-secondary";
      case "blue": return "bg-chart-3";
      default: return "bg-muted-foreground";
    }
  };

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {indicator && (
          <div className={`w-2 h-2 rounded-full ${getIndicatorColor()} animate-pulse`} />
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mb-4">
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-lg text-muted-foreground">{unit}</p>
      </div>

      {details && (
        <div className="space-y-1 pt-4 border-t border-border">
          {details.map((detail, index) => (
            <div key={index} className="flex justify-between text-xs">
              <span className="text-muted-foreground">{detail.label}</span>
              <span className="text-foreground">{detail.value}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
