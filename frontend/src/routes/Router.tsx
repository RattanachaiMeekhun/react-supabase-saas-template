import { Route, Routes } from "react-router-dom";
import LayoutRoot from "./LayoutRoot ";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import Login from "../features/auth/pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route element={<LayoutRoot />}>
        <Route index path="/login" element={<Login />} />
        <Route path="/home" element={<DashboardPage />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
    </Routes>
  );
};

export default Router;
