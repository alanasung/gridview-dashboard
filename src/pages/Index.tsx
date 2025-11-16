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

      {/* EV Chargers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatsCard
          title="TOTAL CHARGERS"
          subtitle="25% Of Max. Capacity"
          value="256"
          unit="kW"
          indicator="green"
          details={[
            { label: "Daily Total", value: "124 MWh" },
            { label: "Month To Date", value: "124 MWh" },
            { label: "Year To Date", value: "124 MWh" },
            { label: "Total", value: "124 MWh" },
          ]}
        />
        <StatsCard
          title="AC CHARGER"
          subtitle="50,000 active"
          value="128"
          unit="kW"
          indicator="orange"
          details={[
            { label: "Daily Total", value: "124 MWh" },
            { label: "Month To Date", value: "124 MWh" },
            { label: "Year To Date", value: "124 MWh" },
            { label: "Total", value: "124 MWh" },
          ]}
        />
        <StatsCard
          title="DC CHARGER"
          subtitle="10,72 active"
          value="128"
          unit="kW"
          indicator="green"
          details={[
            { label: "Daily Total", value: "124 MWh" },
            { label: "Month To Date", value: "124 MWh" },
            { label: "Year To Date", value: "124 MWh" },
            { label: "Total", value: "124 MWh" },
          ]}
        />
      </div>

      {/* Energy Breakdown and Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        <div className="lg:col-span-1">
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
          title="LOCAL GREEN ENERGY"
          subtitle="Produced last hour"
          value="125"
          unit="kW"
          indicator="green"
          details={[
            { label: "Week To Date", value: "124 MWh" },
            { label: "Month To Date", value: "124 MWh" },
            { label: "Year To Date", value: "124 MWh" },
            { label: "Total", value: "124 MWh" },
          ]}
        />
        <StatsCard
          title="HBE FACTOR"
          subtitle="Generated today"
          value="38"
          unit="%"
          details={[
            { label: "Week To Date", value: "46 %" },
            { label: "Month To Date", value: "46 %" },
            { label: "Year To Date", value: "46 %" },
            { label: "Total", value: "46 %" },
          ]}
        />
        <StatsCard
          title="HBE CERTIFICATES"
          subtitle="Generated today"
          value="5"
          unit="HBE"
          indicator="green"
          details={[
            { label: "Daily Total", value: "5 HBE" },
            { label: "Month To Date", value: "10 HBE" },
            { label: "Year To Date", value: "15 HBE" },
            { label: "Total", value: "20 HBE" },
          ]}
        />
        <StatsCard
          title="TOTAL GRID"
          subtitle="33% Of Max. Capacity"
          value="15"
          unit="MW"
          indicator="orange"
          details={[
            { label: "Daily", value: "IN: 124 OUT: 124 MWh" },
            { label: "Weekly", value: "124 124 MWh" },
            { label: "Monthly", value: "124 124 MWh" },
          ]}
        />
      </div>

      {/* Water and Gas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        <StatsCard
          title="GAS"
          subtitle="Usage last hour"
          value="150"
          unit="m3/h"
          details={[
            { label: "Daily Total", value: "124 M3" },
            { label: "Month To Date", value: "124 M3" },
            { label: "Year To Date", value: "124 M3" },
            { label: "Total", value: "124 M3" },
          ]}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <AreaChartComponent
          title="SOLAR POWER"
          data={solarData}
          height={250}
        />
        <BarChartComponent
          title="EPEX ELECTRA PRICING DAY-AHEAD"
          subtitle="Today 14:00:23"
          data={pricingData}
          height={250}
        />
        <div className="flex flex-col gap-4">
          <StatsCard
            title="CURRENT EPEX PRICE"
            value="114.85"
            unit="€/MWh"
            details={[
              { label: "Today average", value: "124 €/MW" },
              { label: "Today Min", value: "124 €/MW" },
              { label: "Today Max", value: "124 €/MW" },
            ]}
          />
          <CircularGauge
            title="TOTAL BATTERY"
            value={Math.round(batteryLevel)}
            maxValue={100}
            label="State of Charge"
            subtitle="The Battery is 80% Charged"
            size="sm"
          />
        </div>
      </div>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-right mt-8">
        Last updated: {new Date().toLocaleString('en-US')}
      </p>
    </div>
  );
};

export default Index;
