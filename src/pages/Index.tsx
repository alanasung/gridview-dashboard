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
    }))
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
    }))
  );

  const [lmp30DaysData] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      time: `${i + 1}`,
      value: Math.sin(i / 5) * 15 + 40,
    }))
  );

  const [lmp1YearData] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      time: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      value: Math.sin(i / 2) * 15 + 40,
    }))
  );

  // Demand Response state
  const [drStatus] = useState<"none" | "upcoming" | "active">("active");
  const [drTimeRemaining] = useState("1h 22m");
  const [drReduction] = useState("2.5");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-foreground">GRID</span>
          <span className="text-primary">ENERGY</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">CTPARK BUILDING - AMSTERDAM</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <DateTimeWidget />
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
            <AreaChartComponent title="SOLAR POWER" data={solarData} height={250} />
            <AreaChartComponent title="WIND POWER" data={windData} height={250} />
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
            <div className="md:col-span-2">
              <AreaChartComponent
                title="LOAD FORECAST MON VALLEY U.S. STEEL - NEXT 24 HOURS"
                data={loadForecastData}
                height={250}
              />
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
                      drStatus === "active" ? "bg-destructive animate-pulse" :
                      drStatus === "upcoming" ? "bg-yellow-500 animate-pulse" :
                      "bg-primary"
                    }`} 
                  />
                  <Badge 
                    variant={drStatus === "active" ? "destructive" : "secondary"}
                    className="font-semibold"
                  >
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
        </>
      )}

      {/* Demand Dashboard */}
      {dashboardMode === "demand" && (
        <>
          {/* Energy Breakdown and Water */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-1 lg:col-span-2">
              <EnergyBreakdown
                title="ENERGY USAGE"
                total={372}
                unit="MW"
                items={[
                  { name: "Building", value: 124, unit: "MW", percentage: 46.83, color: "bg-primary" },
                  { name: "DC Chargers", value: 124, unit: "MW", percentage: 22.34, color: "bg-secondary" },
                  { name: "AC Chargers", value: 124, unit: "MW", percentage: 21.34, color: "bg-chart-3" },
                  { name: "Battery Storage", value: 1, unit: "MW", percentage: 0.3, color: "bg-chart-4" },
                ]}
              />
            </div>
            <StatsCard
              title="WATER"
              subtitle="Usage last hour"
              value="150"
              unit="m3/h"
              indicator="green"
              details={[
                { label: "Daily Total", value: "124 M3" },
                { label: "Month To Date", value: "124 M3" },
                { label: "Year To Date", value: "124 M3" },
                { label: "Total", value: "124 M3" },
              ]}
            />
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
