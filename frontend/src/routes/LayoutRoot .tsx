import React, { use, useEffect, useState } from "react";
import {
  ContactsFilled,
  HomeFilled,
  InfoCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Layout } from "antd";
import BaseNavLink from "../components/Nav/BaseNavLink";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/redux";
import { useSelector } from "react-redux";
import { checkAuthStatus } from "../redux/slices/authSlice";
import Loader from "../components/ETC/Loader";

const { Sider, Content, Header } = Layout;
const LayoutRoot: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, loading } = useSelector((e: RootState) => e.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkAuthStatus()).then((res) => {
      if (res.meta.requestStatus === "rejected") {
        console.error("Authentication check failed:", res.payload);
        navigate("/login", { replace: true });
      } else {
        console.log("Authentication check successful:", res.payload);
      }
    });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return (
      <Layout className="h-screen w-screen">
        <Content className="bg-[#4F4557] flex items-center justify-center">
          <Outlet />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="h-screen w-screen">
      {/* Sider */}
      <Sider
        width={150}
        className="bg-[#1d4ed8] border-r-2 border-[#27272a]"
        theme="dark"
        collapsed={collapsed}
      >
        <div className="text-white flex flex-col h-full">
          {/* Logo/Title */}
          <div className="p-6 border-b border-[#27272a]">
            <span className="font-bold text-xl text-white">My App</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <BaseNavLink
                to="/"
                end
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-white"
              >
                <HomeFilled /> {!collapsed && "Home"}
              </BaseNavLink>
              <BaseNavLink
                to="/about"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-white"
              >
                <InfoCircleFilled /> {!collapsed && "About"}
              </BaseNavLink>
              <BaseNavLink
                to="/contact"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-white"
              >
                <ContactsFilled /> {!collapsed && "Contact"}
              </BaseNavLink>
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-[#27272a]">
            <span className="text-sm text-white">Welcome, User!</span>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header className="bg-[#1d4ed8] text-white flex items-center justify-between !px-4 border-b-2 border-[#27272a]">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "white",
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content className="bg-[#4F4557] overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutRoot;
