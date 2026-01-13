import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import "./Charts.css";

type BarChartProps = BaseChartType & {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
};

const BarChart: React.FC<BarChartProps> = (props) => {
  const { data, options, recommendation } = props;

  return (
    <div className="chart-container-full">
      <ChartDetailDisplay {...props} />
      <div className="chart-flex-1">
        <Bar
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
          updateMode="resize"
        />
      </div>
      {recommendation && (
        <div className="chart-recommendation">{recommendation}</div>
      )}
    </div>
  );
};

export default BarChart;
