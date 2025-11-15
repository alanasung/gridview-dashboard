import { Card } from "@/components/ui/card";

interface EnergyItem {
  name: string;
  value: number;
  unit: string;
  percentage: number;
  color: string;
}

interface EnergyBreakdownProps {
  title: string;
  total: number;
  unit: string;
  items: EnergyItem[];
}

export const EnergyBreakdown = ({ title, total, unit, items }: EnergyBreakdownProps) => {
  return (
    <Card className="p-6 border-border bg-card">
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="flex items-baseline gap-2 mb-6">
        <p className="text-4xl font-bold">{total}</p>
        <p className="text-lg text-muted-foreground">{unit}</p>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
            <div className="flex items-baseline gap-4 text-sm">
              <span className="text-foreground">{item.value} {item.unit}</span>
              <span className="text-muted-foreground w-12 text-right">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
