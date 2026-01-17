import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChartLayoutItem } from "../../../components/Charts/TChartType";

type DashboardState = {
  // state properties
  title: string;
  description?: string;
  items: ChartLayoutItem[];
};

const initialState: DashboardState = {
  title: "Dashboard",
  items: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // your reducers
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload; // update title
    },
  },
});

export const { setTitle } = dashboardSlice.actions;
export default dashboardSlice.reducer;
