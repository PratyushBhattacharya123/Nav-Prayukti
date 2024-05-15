import React from "react";
import { LineChart as MuiLineChart } from "@mui/x-charts/LineChart";

interface LineChartProps {
  data: any;
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div className="relative">
      <MuiLineChart
        yAxis={[{ id: "linearAxis", label: "Value" }]}
        series={[
          {
            data: data,
          },
        ]}
        height={200}
        width={300}
      />
      {data?.length > 0 && (
        <div className="flex items-center justify-center">
          <p className="absolute z-[1000] bottom-2 text-xs">
            Number of entries within the specific time range
          </p>
        </div>
      )}
    </div>
  );
};

export default LineChart;
