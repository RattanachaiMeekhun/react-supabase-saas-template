import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import "./Charts.css";

type LineChartProps = BaseChartType & {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="chart-container-full">
      <ChartDetailDisplay {...props} />
      <div className="chart-center-container">
        <Line
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
          updateMode="resize"
        />
      </div>
    </div>
  );
};
export default LineChart;
