import { Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import { useRef, useEffect } from "react";
import "./Charts.css";

type PieChartProps = BaseChartType & {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
};

const PieChart: React.FC<PieChartProps> = (props) => {
  const { data, options } = props;
  const chartRef = useRef<any>(null);
  useEffect(() => {
    if (chartRef.current) {
      console.log("PieChart data updated", chartRef.current.data);
    }
  }, [data, options]);

  return (
    <div className="chart-container-full">
      <ChartDetailDisplay {...props} />
      <div className="chart-center-container">
        <Pie
          ref={chartRef}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            ...options,
          }}
          updateMode="resize"
        />
      </div>
    </div>
  );
};

export default PieChart;
