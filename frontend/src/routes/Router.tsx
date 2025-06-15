import { Route, Routes } from "react-router-dom";
import LayoutRoot from "./LayoutRoot ";
import Home from "../pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route element={<LayoutRoot />}>
        <Route index path="/" element={<Home />} />
        <Route path="*" element={<>Not Found</>} />
      </Route>
    </Routes>
  );
};

export default Router;
