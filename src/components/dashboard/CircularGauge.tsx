import { Card } from "@/components/ui/card";

interface CircularGaugeProps {
  title: string;
  value: number;
  maxValue: number;
  label: string;
  subtitle?: string;
  size?: "sm" | "lg";
}

export const CircularGauge = ({ title, value, maxValue, label, subtitle, size = "lg" }: CircularGaugeProps) => {
  const percentage = (value / maxValue) * 100;
  const circumference = size === "lg" ? 377 : 251;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  const radius = size === "lg" ? 60 : 40;

  return (
    <Card className="p-6 border-border bg-card">
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: radius * 2 + 20, height: radius * 2 + 20 }}>
          <svg className="transform -rotate-90" width={radius * 2 + 20} height={radius * 2 + 20}>
            <circle
              cx={radius + 10}
              cy={radius + 10}
              r={radius}
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx={radius + 10}
              cy={radius + 10}
              r={radius}
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary)))" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`font-bold ${size === "lg" ? "text-4xl" : "text-3xl"}`}>{value}%</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-4">{subtitle}</p>}
      </div>
    </Card>
  );
};
