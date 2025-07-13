import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dashboardReducer from "./slices/dashboardSlice"; // เพิ่ม slice สำหรับ dashboard
import authReducer from "./slices/authSlice"; // เพิ่ม slice สำหรับ authentication

// import chartReducer from "./slices/chartSlice"; // เพิ่ม slice อื่นได้

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    dashboard: dashboardReducer, // เพิ่ม reducer สำหรับ dashboard
    // chart: chartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
