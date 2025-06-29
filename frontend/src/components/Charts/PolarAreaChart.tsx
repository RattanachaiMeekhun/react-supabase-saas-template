import { PolarArea } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";

type PolarAreaChartProps = BaseChartType & {
  data: ChartData<"polarArea">;
  options?: ChartOptions<"polarArea">;
};

const PolarAreaChart: React.FC<PolarAreaChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="h-full w-full flex flex-col text-center">
      <ChartDetailDisplay {...props} />
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <PolarArea
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
        />
      </div>
    </div>
  );
};
export default PolarAreaChart;
