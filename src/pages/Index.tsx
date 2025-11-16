import { DateTimeWidget } from "@/components/dashboard/DateTimeWidget";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { CircularGauge } from "@/components/dashboard/CircularGauge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { EnergyBreakdown } from "@/components/dashboard/EnergyBreakdown";
import { AreaChartComponent } from "@/components/dashboard/AreaChart";
import { BarChartComponent } from "@/components/dashboard/BarChart";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const Index = () => {
  const [greenFactor, setGreenFactor] = useState(18);
  const [batteryLevel, setBatteryLevel] = useState(80);
  const [dashboardMode, setDashboardMode] = useState<"supply" | "demand">("supply");
  const [currentHour] = useState(new Date().getHours());
  const [lmpData, setLmpData] = useState(() =>
    Array.from({ length: 42 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.sin(i / 4) * 15 + 40 + Math.random() * 5, // Smoother pattern $25-$60 range
    })),
  );

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGreenFactor((prev) => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
      setBatteryLevel((prev) => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));

      // Update LMP data dynamically - subtle changes
      setLmpData((prev) => {
        const newData = [...prev];
        const lastValue = newData[newData.length - 1].value;
        newData.shift(); // Remove oldest
        newData.push({
          time: `${newData.length}:00`,
          value: lastValue + (Math.random() - 0.5) * 2, // Small incremental changes
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const solarData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.sin(i / 3.8) * 2000 + 1500,
    value2: Math.sin(i / 3.8) * 1500 + 1000,
  }));

  const windData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.sin(i / 4.2) * 1800 + 1200,
    value2: Math.sin(i / 4.2) * 1300 + 900,
  }));

  const loadForecastData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.sin(i / 3.5) * 150 + 350 + Math.random() * 30,
  }));

  const irradianceData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.sin(i / 3.8) * 400 + 500,
  }));

  const windSpeedData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.sin(i / 4.2) * 8 + 12,
  }));

  const temperatureData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.sin(i / 6) * 5 + 15,
  }));

  const [lmp7DaysData] = useState(() =>
    Array.from({ length: 7 * 24 }, (_, i) => ({
      time: `Day ${Math.floor(i / 24) + 1}`,
      value: Math.sin(i / 12) * 15 + 40,
    })),
  );

  const [lmp30DaysData] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      time: `${i + 1}`,
      value: Math.sin(i / 5) * 15 + 40,
    })),
  );

  const [lmp1YearData] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      time: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      value: Math.sin(i / 2) * 15 + 40,
    })),
  );

  // Solar Power historical data
  const [solar7DaysData] = useState(() =>
    Array.from({ length: 7 * 24 }, (_, i) => ({
      time: `Day ${Math.floor(i / 24) + 1}`,
      value: Math.sin(i / 12) * 2000 + 1500,
      value2: Math.sin(i / 12) * 1500 + 1000,
    })),
  );

  const [solar30DaysData] = useState(() =>
    Array.from({ length: 30 * 24 }, (_, i) => ({
      time: `Day ${Math.floor(i / 24) + 1}`,
      value: Math.sin(i / 24) * 2000 + 1500,
      value2: Math.sin(i / 24) * 1500 + 1000,
    })),
  );

  // Wind Power historical data
  const [wind7DaysData] = useState(() =>
    Array.from({ length: 7 * 24 }, (_, i) => ({
      time: `Day ${Math.floor(i / 24) + 1}`,
      value: Math.sin(i / 14) * 1800 + 1200,
      value2: Math.sin(i / 14) * 1300 + 900,
    })),
  );

  const [wind30DaysData] = useState(() =>
    Array.from({ length: 30 * 24 }, (_, i) => ({
      time: `Day ${Math.floor(i / 24) + 1}`,
      value: Math.sin(i / 28) * 1800 + 1200,
      value2: Math.sin(i / 28) * 1300 + 900,
    })),
  );

  // Load Forecast historical data
  const [loadForecast7DaysData] = useState(() =>
    Array.from({ length: 7 * 24 }, (_, i) => ({
      time: `Day ${Math.floor(i / 24) + 1}`,
      value: Math.sin(i / 10) * 150 + 350,
    })),
  );

  const [loadForecast30DaysData] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      time: `${i + 1}`,
      value: Math.sin(i / 5) * 150 + 350,
    })),
  );

  const [loadForecast1YearData] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      time: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
      value: Math.sin(i / 2) * 150 + 350,
    })),
  );

  // Demand Response state
  const [drStatus] = useState<"none" | "upcoming" | "active">("active");
  const [drTimeRemaining] = useState("1h 22m");
  const [drReduction] = useState("2.5");

  // Curtailment state
  const [curtailmentPercentage] = useState(12);
  const [solarCurtailed] = useState(10.3);
  const [windCurtailed] = useState(2.1);
  const [curtailmentIncidents] = useState(4);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-foreground">R.E.</span>
          <span className="text-primary">M.O.S.</span>
        </h1>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2 lg:col-span-1">
          <DateTimeWidget />
        </div>
        <div className="space-y-2">
          <WeatherWidget title="WEATHER TODAY" temperature={5} condition="65 KM/H E" rain={55} />
          <div className="flex gap-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-medium text-center text-muted-foreground">Irradiance</p>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent title="IRRADIANCE (W/m²)" data={irradianceData} height={200} />
              </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-medium text-center text-muted-foreground">Wind Speed</p>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent title="WIND SPEED (m/s)" data={windSpeedData} height={200} />
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="space-y-2">
          <WeatherWidget title="WEATHER TOMORROW" temperature={5} condition="65 KM/H E" rain={55} />
          <div className="flex gap-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-medium text-center text-muted-foreground">Irradiance</p>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent title="IRRADIANCE (W/m²)" data={irradianceData} height={200} />
              </HoverCardContent>
            </HoverCard>
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                  <p className="text-xs font-medium text-center text-muted-foreground">Wind Speed</p>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent title="WIND SPEED (m/s)" data={windSpeedData} height={200} />
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <CircularGauge
            title="Total Carbon Intensity of Electric Grid"
            value={Math.round(greenFactor)}
            maxValue={100}
            label="Green factor"
            subtitle="Total Green Result Yesterday: 93.2%"
          />
        </div>
      </div>

      {/* Supply Dashboard */}
      {dashboardMode === "supply" && (
        <>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Solar Power with History */}
            <div className="space-y-2">
              <AreaChartComponent title="SOLAR POWER" data={solarData} height={250} />
              <div className="flex gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 7 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="SOLAR POWER - LAST 7 DAYS" data={solar7DaysData} height={200} />
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 30 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="SOLAR POWER - LAST 30 DAYS" data={solar30DaysData} height={200} />
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>

            {/* Wind Power with History */}
            <div className="space-y-2">
              <AreaChartComponent title="WIND POWER" data={windData} height={250} />
              <div className="flex gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 7 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="WIND POWER - LAST 7 DAYS" data={wind7DaysData} height={200} />
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 30 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="WIND POWER - LAST 30 DAYS" data={wind30DaysData} height={200} />
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="space-y-2">
              <CircularGauge
                title="BESS-BLDG1-FLR1"
                value={Math.round(batteryLevel)}
                maxValue={100}
                label="State of Charge"
                subtitle="The Battery is 80% Charged"
                metrics={[
                  { label: "Supply of Energy", value: "3.2 MWh" },
                  { label: "Degradation Cost", value: "$0.02/kWh" },
                ]}
                isAvailable={true}
              />
              <div className="flex gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">
                        Power Limits & SOC Bounds & Ramp Rate
                      </p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-foreground">Battery System Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">SOC_min:</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">SOC_max:</span>
                          <span className="font-medium">90%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Max charge power:</span>
                          <span className="font-medium">4.5 MW</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Max discharge power:</span>
                          <span className="font-medium">4.2 MW (84% of rated)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Ramp rate:</span>
                          <span className="font-medium">0.5 MW/s</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
            <div className="space-y-2">
              <CircularGauge
                title="BESS-BLDG3-FLR2"
                value={65}
                maxValue={100}
                label="State of Charge"
                subtitle="The Battery is 65% Charged"
                metrics={[
                  { label: "Supply of Energy", value: "2.8 MWh" },
                  { label: "Degradation Cost", value: "$0.025/kWh" },
                ]}
                isAvailable={true}
              />
              <div className="flex gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">
                        Power Limits & SOC Bounds & Ramp Rate
                      </p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-foreground">Battery System Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">SOC_min:</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">SOC_max:</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Max charge power:</span>
                          <span className="font-medium">4.0 MW</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Max discharge power:</span>
                          <span className="font-medium">3.8 MW (82% of rated)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Ramp rate:</span>
                          <span className="font-medium">0.45 MW/s</span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>

          {/* Load Forecast and LMP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2 space-y-2">
              <AreaChartComponent
                title="LOAD FORECAST MON VALLEY U.S. STEEL - NEXT 24 HOURS"
                data={loadForecastData}
                height={250}
              />
              <div className="flex gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 7 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="LOAD FORECAST - LAST 7 DAYS" data={loadForecast7DaysData} height={200} />
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 30 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent
                      title="LOAD FORECAST - LAST 30 DAYS"
                      data={loadForecast30DaysData}
                      height={200}
                    />
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 1 Year</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="LOAD FORECAST - LAST 1 YEAR" data={loadForecast1YearData} height={200} />
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>

          {/* Real-time LMPs */}
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="space-y-2">
              <AreaChartComponent
                title="REAL-TIME LMPS ($/MWh) - NEXT 42 HOURS"
                data={lmpData}
                height={250}
                currentIndex={currentHour}
                currentValue={lmpData[currentHour]?.value}
              />
              <div className="flex gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 7 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="LMPs - LAST 7 DAYS ($/MWh)" data={lmp7DaysData} height={200} />
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 30 Days</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="LMPs - LAST 30 DAYS ($/MWh)" data={lmp30DaysData} height={200} />
                  </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Card className="flex-1 p-2 cursor-pointer hover:bg-accent/50 transition-colors">
                      <p className="text-xs font-medium text-center text-muted-foreground">Last 1 Year</p>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 p-4" side="bottom">
                    <AreaChartComponent title="LMPs - LAST 1 YEAR ($/MWh)" data={lmp1YearData} height={200} />
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>

          {/* Demand Response Card */}
          <div className="mb-4">
            <Card className="p-6 border-border bg-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Demand Response</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      drStatus === "active"
                        ? "bg-destructive animate-pulse"
                        : drStatus === "upcoming"
                          ? "bg-yellow-500 animate-pulse"
                          : "bg-primary"
                    }`}
                  />
                  <Badge variant={drStatus === "active" ? "destructive" : "secondary"} className="font-semibold">
                    {drStatus === "active" ? "ACTIVE" : drStatus === "upcoming" ? "UPCOMING" : "NO EVENT"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Event Type</p>
                  <p className="text-xl font-bold text-foreground">
                    {drStatus === "active" ? "Emergency" : drStatus === "upcoming" ? "Scheduled" : "None"}
                  </p>
                </div>

                {drStatus !== "none" && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Time Remaining</p>
                      <p className="text-3xl font-bold text-foreground">{drTimeRemaining}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Required Reduction</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-foreground">{drReduction}</p>
                        <p className="text-lg text-muted-foreground">MW</p>
                      </div>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">No Event</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <span className="text-muted-foreground">Upcoming</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Curtailment Status Card */}
          <div className="mb-4">
            <Card className="p-6 border-border bg-card">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Curtailment Status</h3>
                <p className="text-sm text-muted-foreground">Renewable Curtailment: {curtailmentPercentage}% (Today)</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Solar Curtailed</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">{solarCurtailed}</p>
                      <p className="text-lg text-muted-foreground">MWh</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Wind Curtailed</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-foreground">{windCurtailed}</p>
                      <p className="text-lg text-muted-foreground">MWh</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Incidents</span>
                    <span className="text-2xl font-bold text-foreground">{curtailmentIncidents}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Demand Dashboard */}
      {dashboardMode === "demand" && (
        <>
          {/* Industrial Load & Load Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <StatsCard
                    title="INDUSTRIAL LOAD"
                    subtitle="Current demand"
                    value="8.4"
                    unit="MW"
                    indicator="green"
                    details={[
                      { label: "Peak Today", value: "9.2 MW" },
                      { label: "Average Today", value: "7.8 MW" },
                      { label: "Forecast Next Hr", value: "8.6 MW" },
                    ]}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent title="LOAD FORECAST (24H)" data={loadForecastData} height={200} />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">LOAD SPLIT</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Critical Load</span>
                        <span className="text-sm font-bold text-destructive">5.2 MW (62%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-destructive h-2 rounded-full" style={{ width: "62%" }} />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Flexible Load</span>
                        <span className="text-sm font-bold text-primary">3.2 MW (38%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "38%" }} />
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <BarChartComponent
                  title="CRITICAL VS FLEXIBLE (24H)"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: Math.sin(i / 3.5) * 90 + 220,
                    value2: Math.sin(i / 3.5) * 60 + 130,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">SHIFT SCHEDULE</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Current Shift</span>
                        <Badge variant="default">Day Shift</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Production Level</span>
                        <span className="text-sm font-bold text-primary">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Next Shift</span>
                        <span className="text-xs text-foreground">18:00 (4h 15m)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Staff Count</span>
                        <span className="text-xs text-foreground">42 workers</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <BarChartComponent
                  title="PRODUCTION LEVEL BY HOUR"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: i >= 6 && i <= 14 ? 85 : i >= 14 && i <= 22 ? 75 : 30,
                    value2: 0,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">LOAD SOURCE MIX</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Renewables</span>
                        <span className="text-sm font-bold text-primary">4.2 MW (50%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Battery</span>
                        <span className="text-sm font-bold text-secondary">1.8 MW (21%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Grid</span>
                        <span className="text-sm font-bold text-chart-3">2.1 MW (25%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Other Storage</span>
                        <span className="text-sm font-bold text-chart-4">0.3 MW (4%)</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent
                  title="ENERGY SOURCE MIX (24H)"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: Math.sin(i / 3.8) * 150 + 200,
                    value2: Math.sin(i / 4.2) * 80 + 100,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* DR Actions & Battery Interaction */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <p className="text-sm text-muted-foreground">DR ACTIONS</p>
                      <Badge variant="destructive">Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Curtailment Amount</span>
                        <span className="text-sm font-bold text-destructive">{drReduction} MW</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Event Duration</span>
                        <span className="text-xs text-foreground">{drTimeRemaining}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Load Shift Window</span>
                        <span className="text-xs text-foreground">18:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Recommended Action</span>
                        <span className="text-xs text-primary">Shift 1.2 MW</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent
                  title="DR EVENT TIMELINE"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: i >= 14 && i <= 18 ? 350 - 25 : 350,
                    value2: 350,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">BATTERY INTERACTION</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Charge Power</span>
                        <span className="text-sm font-bold text-primary">1.2 MW</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Discharge Power</span>
                        <span className="text-sm font-bold text-secondary">0.0 MW</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Net Power</span>
                        <span className="text-sm font-bold text-primary">+1.2 MW</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Status</span>
                        <Badge variant="default">Charging</Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent
                  title="CHARGE/DISCHARGE POWER (24H)"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: Math.sin(i / 3.8) * 60 + 70,
                    value2: Math.sin(i / 4.2) * 50 + 60,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <StatsCard
                    title="BATTERY SOC & TEMP"
                    subtitle="State of charge"
                    value={Math.round(batteryLevel)}
                    unit="%"
                    indicator="green"
                    details={[
                      { label: "Temperature", value: "28°C" },
                      { label: "Voltage", value: "750 V" },
                      { label: "Current", value: "1.6 A" },
                    ]}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent
                  title="BATTERY SOC HISTORY (24H)"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: Math.sin(i / 4) * 20 + 70,
                    value2: 0,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">BATTERY HEALTH</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Cycle Count</span>
                        <span className="text-sm font-bold text-foreground">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">State of Health</span>
                        <span className="text-sm font-bold text-primary">96.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Aging Rate</span>
                        <span className="text-sm font-bold text-primary">Normal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Next Maintenance</span>
                        <span className="text-xs text-foreground">45 days</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent
                  title="BATTERY DEGRADATION TREND"
                  data={Array.from({ length: 12 }, (_, i) => ({
                    time: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
                    value: 100 - i * 0.3,
                    value2: 0,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Energy Rates & DR Incentives */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">ENERGY RATES</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Current TOU Rate</span>
                        <span className="text-sm font-bold text-secondary">$0.145/kWh</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Off-Peak Rate</span>
                        <span className="text-xs text-foreground">$0.089/kWh</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Peak Rate</span>
                        <span className="text-xs text-foreground">$0.245/kWh</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Demand Charge</span>
                        <span className="text-sm font-bold text-destructive">$18.50/kW</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <BarChartComponent
                  title="TOU RATES BY HOUR"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: i >= 16 && i <= 21 ? 0.245 : i >= 9 && i <= 16 ? 0.145 : 0.089,
                    value2: 0,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">DR COMPENSATION</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Today's Payment</span>
                        <span className="text-sm font-bold text-primary">$2,450</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Incentives MTD</span>
                        <span className="text-xs text-foreground">$18,200</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Expected This Month</span>
                        <span className="text-sm font-bold text-primary">$24,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">YTD Total</span>
                        <span className="text-xs text-foreground">$142,300</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <BarChartComponent
                  title="MONTHLY DR PAYMENTS"
                  data={Array.from({ length: 12 }, (_, i) => ({
                    time: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
                    value: Math.sin(i / 2) * 5000 + 15000,
                    value2: 0,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">EQUIPMENT LIMITS</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Heat Pump Temp</span>
                        <span className="text-sm font-bold text-primary">42°C</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Pressure</span>
                        <span className="text-xs text-foreground">2.8 bar</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Electrolyzer Load</span>
                        <span className="text-sm font-bold text-primary">1.8 MW</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">H2 Production</span>
                        <span className="text-xs text-foreground">85 kg/h</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <AreaChartComponent
                  title="EQUIPMENT PERFORMANCE (24H)"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: Math.sin(i / 4) * 10 + 40,
                    value2: Math.sin(i / 3.5) * 0.5 + 2.5,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div>
                  <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                    <p className="text-sm text-muted-foreground mb-4">COST SAVINGS</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Battery Savings</span>
                        <span className="text-sm font-bold text-primary">$3,240</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">DR Actions</span>
                        <span className="text-sm font-bold text-primary">$2,450</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Load Shifting</span>
                        <span className="text-sm font-bold text-primary">$1,180</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Total Today</span>
                        <span className="text-sm font-bold text-primary">$6,870</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-96 p-4" side="bottom">
                <BarChartComponent
                  title="DAILY COST SAVINGS"
                  data={Array.from({ length: 7 }, (_, i) => ({
                    time: `Day ${i + 1}`,
                    value: Math.sin(i / 2) * 2000 + 6000,
                    value2: 0,
                  }))}
                  height={200}
                />
              </HoverCardContent>
            </HoverCard>
          </div>

          {/* Energy Timeline & DR Baseline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                  <p className="text-sm text-muted-foreground mb-4">ENERGY CONSUMPTION & PEAK EXPOSURE</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Current Consumption</span>
                      <span className="text-lg font-bold text-foreground">8.4 MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Today's Peak</span>
                      <span className="text-sm font-bold text-destructive">9.2 MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Monthly Peak</span>
                      <span className="text-sm font-bold text-secondary">9.8 MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Peak Demand Charge</span>
                      <span className="text-sm font-bold text-destructive">$181.30</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Next Peak Window</span>
                      <span className="text-xs text-foreground">16:00 - 21:00</span>
                    </div>
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-[600px] p-4" side="bottom">
                <AreaChartComponent
                  title="ENERGY CONSUMPTION TIMELINE & PEAK FORECAST"
                  data={Array.from({ length: 48 }, (_, i) => ({
                    time: `${i}:00`,
                    value: Math.sin(i / 4) * 100 + 350,
                    value2: i >= 32 && i <= 42 ? 450 : 0,
                  }))}
                  height={250}
                />
              </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <Card className="p-6 border-border bg-card cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <p className="text-sm text-muted-foreground">DR BASELINE VS ACTUAL</p>
                    {drStatus === "active" && <Badge variant="destructive">Event Active</Badge>}
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Baseline Load</span>
                      <span className="text-lg font-bold text-muted-foreground">10.9 MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Actual Load</span>
                      <span className="text-lg font-bold text-foreground">8.4 MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Reduction Achieved</span>
                      <span className="text-sm font-bold text-primary">{drReduction} MW</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Performance</span>
                      <span className="text-sm font-bold text-primary">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Event Ends In</span>
                      <span className="text-xs text-foreground">{drTimeRemaining}</span>
                    </div>
                  </div>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-[600px] p-4" side="bottom">
                <AreaChartComponent
                  title="DR EVENT: BASELINE VS ACTUAL LOAD"
                  data={Array.from({ length: 24 }, (_, i) => ({
                    time: `${i}:00`,
                    value: i >= 14 && i <= 18 ? 350 : 370,
                    value2: 400,
                  }))}
                  height={250}
                />
              </HoverCardContent>
            </HoverCard>
          </div>
        </>
      )}

      {/* Dashboard Toggle Button */}
      <button
        onClick={() => setDashboardMode((prev) => (prev === "supply" ? "demand" : "supply"))}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-mono transition-all duration-200 border border-border/50"
        aria-label={`Switch to ${dashboardMode === "supply" ? "demand" : "supply"} dashboard`}
      >
        {dashboardMode === "supply" ? "D" : "S"}
      </button>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-right mt-8">
        Last updated: {new Date().toLocaleString("en-US")}
      </p>
    </div>
  );
};

export default Index;
