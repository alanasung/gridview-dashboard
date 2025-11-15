import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export const DateTimeWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-6 border-border bg-card">
      <p className="text-sm text-muted-foreground mb-2">DATE AND TIME</p>
      <p className="text-4xl font-bold mb-1">{time.toLocaleTimeString('en-US', { hour12: false })}</p>
      <p className="text-sm text-muted-foreground">{time.toLocaleDateString('en-US', { weekday: 'long' })}</p>
      <p className="text-xs text-muted-foreground">{time.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </Card>
  );
};
