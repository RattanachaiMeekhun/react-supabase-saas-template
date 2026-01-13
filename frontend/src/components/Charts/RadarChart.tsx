import { Radar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import { useRef } from "react";
import ChartDetailDisplay from "./ChartDetailDisplay";
import "./Charts.css";

type RadarChartProps = BaseChartType & {
  data: ChartData<"radar">;
  options?: ChartOptions<"radar">;
};

const RadarChart: React.FC<RadarChartProps> = (props) => {
  const { data, options } = props;
  const container = useRef(null);

  return (
    <div className="chart-container-full chart-pb-10" ref={container}>
      <ChartDetailDisplay {...props} />
      <div className="chart-center-container">
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
