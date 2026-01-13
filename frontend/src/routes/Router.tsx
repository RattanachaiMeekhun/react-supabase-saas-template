import { Route, Routes } from "react-router-dom";
import LayoutRoot from "./LayoutRoot ";
import Home from "../pages/Home";
import Login from "../features/auth/pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route element={<LayoutRoot />}>
        <Route index path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
    </Routes>
  );
};

export default Router;
