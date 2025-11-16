import { DateTimeWidget } from "@/components/dashboard/DateTimeWidget";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { CircularGauge } from "@/components/dashboard/CircularGauge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { EnergyBreakdown } from "@/components/dashboard/EnergyBreakdown";
import { AreaChartComponent } from "@/components/dashboard/AreaChart";
import { BarChartComponent } from "@/components/dashboard/BarChart";
import { useEffect, useState } from "react";

const Index = () => {
  const [greenFactor, setGreenFactor] = useState(18);
  const [batteryLevel, setBatteryLevel] = useState(80);
  const [dashboardMode, setDashboardMode] = useState<'supply' | 'demand'>('supply');

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGreenFactor(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
      setBatteryLevel(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const solarData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.sin(i / 3.8) * 2000 + 1500,
    value2: Math.sin(i / 3.8) * 1500 + 1000,
  }));

  const pricingData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: Math.random() * 200 + 100,
  }));

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
        <WeatherWidget title="WEATHER TODAY" temperature={5} condition="65 KM/H E" rain={55} />
        <WeatherWidget title="WEATHER TOMORROW" temperature={5} condition="65 KM/H E" rain={55} />
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
      {dashboardMode === 'supply' && (
        <>
          {/* Energy Production Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <StatsCard
              title="TOTAL GREEN ENERGY"
              subtitle="50% Of Max. Capacity"
              value="2"
              unit="MW"
              indicator="green"
              details={[
                { label: "Daily Total", value: "124 MWh" },
                { label: "Month To Date", value: "124 MWh" },
                { label: "Year To Date", value: "124 MWh" },
                { label: "Total", value: "124 MWh" },
              ]}
            />
            <StatsCard
              title="SOLAR ENERGY"
              subtitle="Solar Energy Generated"
              value="2"
              unit="MW"
              indicator="green"
              details={[
                { label: "Daily Total", value: "124 MWh" },
                { label: "Month To Date", value: "124 MWh" },
                { label: "Year To Date", value: "124 MWh" },
                { label: "Total", value: "124 MWh" },
              ]}
            />
            <StatsCard
              title="WIND ENERGY"
              subtitle="Wind Energy Generated"
              value="2"
              unit="MW"
              indicator="green"
              details={[
                { label: "Daily Total", value: "124 MWh" },
                { label: "Month To Date", value: "124 MWh" },
                { label: "Year To Date", value: "124 MWh" },
                { label: "Total", value: "124 MWh" },
              ]}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <AreaChartComponent
                title="SOLAR POWER"
                data={solarData}
                height={250}
              />
            </div>
            <CircularGauge
              title="TOTAL BATTERY"
              value={Math.round(batteryLevel)}
              maxValue={100}
              label="State of Charge"
              subtitle="The Battery is 80% Charged"
            />
          </div>
        </>
      )}

      {/* Demand Dashboard */}
      {dashboardMode === 'demand' && (
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
        onClick={() => setDashboardMode(prev => prev === 'supply' ? 'demand' : 'supply')}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-mono transition-all duration-200 border border-border/50"
        aria-label={`Switch to ${dashboardMode === 'supply' ? 'demand' : 'supply'} dashboard`}
      >
        {dashboardMode === 'supply' ? 'D' : 'S'}
      </button>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-right mt-8">
        Last updated: {new Date().toLocaleString('en-US')}
      </p>
    </div>
  );
};

export default Index;
