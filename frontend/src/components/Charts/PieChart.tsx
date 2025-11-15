import { Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";
import { useEffect } from "react";

type PieChartProps = BaseChartType & {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
};

const PieChart: React.FC<PieChartProps> = (props) => {
  const { data, options } = props;
  useEffect(() => {
    // Effect to handle data updates
  }, [data, options]);

  return (
    <div className="h-full w-full flex flex-col text-center">
      <ChartDetailDisplay {...props} />
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <Pie
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
