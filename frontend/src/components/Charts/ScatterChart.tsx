import { Scatter } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import "./Charts.css";

type ScatterChartProps = BaseChartType & {
  data: ChartData<"scatter">;
  options?: ChartOptions<"scatter">;
};

const ScatterChart: React.FC<ScatterChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="chart-container-full">
      <ChartDetailDisplay {...props} />
      <div className="chart-center-container chart-p-4">
        <Scatter
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
        />
      </div>
    </div>
  );
};
export default ScatterChart;
