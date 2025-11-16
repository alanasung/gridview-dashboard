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
      <p className="text-xs text-muted-foreground mb-2">DATE AND TIME</p>
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl font-bold leading-none">{time.toLocaleTimeString("en-US", { hour12: false })}</p>
        <p className="text-xs text-muted-foreground mt-2 leading-none">
          {time.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
        </p>
      </div>
    </Card>
  );
};
