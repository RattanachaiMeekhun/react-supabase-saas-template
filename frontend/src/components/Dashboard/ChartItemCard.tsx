import { renderChartItem } from "../../helper/dashboardHelper";
import type { ChartLayoutItem } from "../Charts/TChartType";

const ChartItemCard = (item: ChartLayoutItem) => {
  return (
    <>
      <div className="drag-handle cursor-move w-5 h-5 rounded-full absolute top-2 right-2 z-10" />
      <div className="max-w-full h-full flex flex-col items-center justify-center rounded-lg shadow-lg bg-surface border border-border">
        {renderChartItem(item)}
      </div>
    </>
  );
};

export default ChartItemCard;
