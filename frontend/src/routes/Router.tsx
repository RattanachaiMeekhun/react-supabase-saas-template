import { Route, Routes } from "react-router-dom";
import LayoutRoot from "./LayoutRoot ";
import Home from "../pages/Home";
import Login from "../pages/Login";

const Router = () => {
  return (
    <Routes>
      <Route element={<LayoutRoot />}>
        <Route index path="/" element={<Home />} />
        <Route index path="/Login" element={<Login />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
    </Routes>
  );
};

export default Router;
