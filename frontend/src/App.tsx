import Router from "./routes/Router";
import "./chartjs-setup";
import "./App.css";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#DDE6ED",
          colorBgBase: "#27374D",
          colorBgContainer: "#526D82",
          colorText: "#DDE6ED",
          colorTextSecondary: "#9DB2BF",
          colorBorder: "#9DB2BF",
        },
      }}
    >
      <Router />
    </ConfigProvider>
  );
}

export default App;
