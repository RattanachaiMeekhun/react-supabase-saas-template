import { MoreOutlined } from "@ant-design/icons";
import { renderChartItem } from "../../helper/dashboardHelper";
import type { ChartLayoutItem } from "../Charts/TChartType";

const ChartItemCard = (item: ChartLayoutItem) => {
  return (
    <>
      {/* Modern Dark Drag Handle */}
      <div className="drag-handle absolute top-3 right-3 z-10 group">
        <div className="w-6 h-6 bg-dark-tertiary hover:bg-primary-500 rounded-md flex items-center justify-center cursor-move transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg">
          <MoreOutlined className="text-text-muted hover:text-white text-xs rotate-90" />
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="w-full h-full flex flex-col">
        {/* Chart Header */}
        <div className="px-4 py-3 border-b border-border-primary">
          <h3 className="text-sm font-semibold text-text-primary truncate">
            {item.title || "Chart"}
          </h3>
          {item.description && (
            <p className="text-xs text-text-muted mt-1 truncate">
              {item.description}
            </p>
          )}
        </div>
        
        {/* Chart Content */}
        <div className="flex-1 p-4 flex items-center justify-center min-h-0 bg-dark-primary/20">
          {renderChartItem(item)}
        </div>
        
        {/* Chart Footer */}
        {item.insight && (
          <div className="px-4 py-2 bg-dark-tertiary/50 border-t border-border-primary backdrop-blur-sm">
            <p className="text-xs text-text-secondary truncate">
              💡 {item.insight}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChartItemCard;
