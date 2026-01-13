import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import "./Charts.css";

type DoughnutChartProps = BaseChartType & {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
};

const DoughnutChart: React.FC<DoughnutChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="chart-container-full">
      <ChartDetailDisplay {...props} />
      <div className="chart-center-container">
        <Doughnut
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
        />
      </div>
    </div>
  );
};

export default DoughnutChart;
