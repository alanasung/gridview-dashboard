import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export const DateTimeWidget = () => {
  const [time, setTime] = useState(new Date());
  
  // Simulate net power balance (in a real app, this would come from an API)
  const supply = 10.6;
  const load = 10.3;
  const netBalance = supply - load;
  
  const getBalanceStatus = () => {
    if (netBalance > 0.1) return { label: "Surplus", color: "text-primary" };
    if (netBalance < -0.1) return { label: "Deficit", color: "text-destructive" };
    return { label: "Balanced", color: "text-muted-foreground" };
  };
  
  const status = getBalanceStatus();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-6 border-border bg-card">
      <p className="text-xs text-muted-foreground mb-2">DATE AND TIME</p>
      <div className="flex flex-col items-center justify-center mb-4">
        <p className="text-4xl font-bold leading-none">{time.toLocaleTimeString("en-US", { hour12: false })}</p>
        <p className="text-xs text-muted-foreground mt-2 leading-none">
          {time.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>
      
      <div className="border-t border-border pt-4">
        <p className="text-xs text-muted-foreground mb-3">NET POWER BALANCE</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Net Power Balance:</span>
            <span className={`text-sm font-bold ${status.color}`}>
              {netBalance > 0 ? '+' : ''}{netBalance.toFixed(1)} MW ({status.label})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Supply:</span>
            <span className="text-xs text-foreground">{supply.toFixed(1)} MW</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Load:</span>
            <span className="text-xs text-foreground">{load.toFixed(1)} MW</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Status:</span>
            <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
