import Router from "./routes/Router";
import "./chartjs-setup";
import "./App.css";
import { ConfigProvider, theme } from "antd";
import { initializeTheme, themeColors } from "./themes/themeConfig";
import { useLayoutEffect } from "react";

function App() {
  // Sync CSS variables with Ant Design tokens
  useLayoutEffect(() => {
    initializeTheme();
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: themeColors.primary,
          colorBgBase: themeColors.background,
          colorBgContainer: themeColors.surface,
          colorText: themeColors.textPrimary,
          colorTextSecondary: themeColors.textSecondary,
          colorBorder: themeColors.border,
        },
      }}
    >
      <Router />
    </ConfigProvider>
  );
}

export default App;
