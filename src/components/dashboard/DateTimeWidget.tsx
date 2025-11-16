import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export const DateTimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-4 border-border bg-card">
      <p className="text-xs text-muted-foreground mb-1">DATE AND TIME</p>
      <p className="text-2xl font-bold mb-0.5">{time.toLocaleTimeString('en-US', { hour12: false })}</p>
      <p className="text-xs text-muted-foreground">{time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</p>
    </Card>
  );
};
