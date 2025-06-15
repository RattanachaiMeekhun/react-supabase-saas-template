import { Radar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import { useRef } from "react";

type RadarChartProps = BaseChartType & {
  data: ChartData<"radar">;
  options?: ChartOptions<"radar">;
};

const RadarChart: React.FC<RadarChartProps> = (props) => {
  const { data, options, title } = props;
  const container = useRef(null);

  return (
    <div className="h-full w-full" ref={container}>
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <Radar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,

          ...options,
        }}
      />
    </div>
  );
};
export default RadarChart;
