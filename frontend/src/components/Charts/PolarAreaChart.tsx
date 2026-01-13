import { PolarArea } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import "./Charts.css";

type PolarAreaChartProps = BaseChartType & {
  data: ChartData<"polarArea">;
  options?: ChartOptions<"polarArea">;
};

const PolarAreaChart: React.FC<PolarAreaChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="chart-container-full">
      <ChartDetailDisplay {...props} />
      <div className="chart-center-container">
        <PolarArea
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
        />
      </div>
    </div>
  );
};
export default PolarAreaChart;
