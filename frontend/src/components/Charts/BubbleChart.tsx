import { Bubble } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import "./Charts.css";

type BubbleChartProps = BaseChartType & {
  data: ChartData<"bubble">;
  options?: ChartOptions<"bubble">;
};

const BubbleChart: React.FC<BubbleChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="chart-container-center">
      <ChartDetailDisplay {...props} />
      <div className="chart-center-container">
        <Bubble
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
        />
      </div>
    </div>
  );
};

export default BubbleChart;
