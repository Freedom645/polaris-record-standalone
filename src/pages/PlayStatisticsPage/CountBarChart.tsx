import type { CountByClearStatus } from "@/models/view/PlayStatistics";
import { BarChart, type BarChartProps } from "@mui/x-charts";
import React from "react";

export type ChartType = "num" | "rate";

interface CountBarChartProps {
  count: readonly CountByClearStatus[];
  chartType: ChartType;
}

const CountBarChart: React.FC<CountBarChartProps> = ({ count, chartType }) => {
  const series = [
    {
      dataKey: "noPlay",
      stack: "cs",
      color: "#a1a1a1ff",
      label: "NO PLAY",
    },
    { dataKey: "goodTry", stack: "cs", color: "#93f095ff", label: "GOOD TRY" },
    { dataKey: "clear", stack: "cs", color: "#53d7ffff", label: "SUCCESS" },
    { dataKey: "fc", stack: "cs", color: "#e68efcff", label: "FULL COMBO" },
    { dataKey: "ap", stack: "cs", color: "#ffee51ff", label: "ALL PERFECT" },
  ] as const;

  const config: Partial<BarChartProps> = {
    height: 400,
    margin: { left: 0 },
    xAxis: [{ dataKey: "key", height: 30 }],
    yAxis: [{ width: 30 }],
    hideLegend: false,
  };

  const convert = (
    data: readonly CountByClearStatus[],
    type: ChartType
  ): readonly CountByClearStatus[] => {
    if (type === "num") {
      return data;
    }

    return data.map((e) => {
      const total = e.noPlay + e.goodTry + e.clear + e.fc + e.ap;
      const newData = Object.entries(e).reduce(
        (obj, [key, value]) =>
          Object.assign(obj, {
            [key]: typeof value === "string" ? value : (value * 100) / total,
          }),
        {} as CountByClearStatus
      );

      return newData;
    });
  };

  return (
    <BarChart dataset={convert(count, chartType)} series={series} {...config} />
  );
};

export default CountBarChart;
