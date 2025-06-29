import { Radar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import { useRef } from "react";
import ChartDetailDisplay from "./ChartDetailDisplay";

type RadarChartProps = BaseChartType & {
  data: ChartData<"radar">;
  options?: ChartOptions<"radar">;
};

const RadarChart: React.FC<RadarChartProps> = (props) => {
  const { data, options } = props;
  const container = useRef(null);

  return (
    <div
      className="h-full w-full flex flex-col text-center pb-10"
      ref={container}
    >
      <ChartDetailDisplay {...props} />
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        {" "}
        <Radar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            ...options,
          }}
        />
      </div>
    </div>
  );
};
export default RadarChart;
