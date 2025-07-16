import React, { use, useEffect, useState } from "react";
import {
  ContactsFilled,
  HomeFilled,
  InfoCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Layout, Avatar, Space, Typography } from "antd";
import BaseNavLink from "../components/Nav/BaseNavLink";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/redux";
import { useSelector } from "react-redux";
import { checkAuthStatus } from "../redux/slices/authSlice";
import Loader from "../components/ETC/Loader";

const { Sider, Content, Header } = Layout;
const { Text } = Typography;
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
      <Layout className="h-screen w-screen bg-dark-primary">
        <Content className="bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary flex items-center justify-center">
          <Outlet />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="h-screen w-screen bg-dark-primary">
      {/* Modern Dark Sidebar */}
      <Sider
        width={collapsed ? 80 : 280}
        className="bg-dark-secondary shadow-2xl border-r border-dark-quaternary transition-all duration-300"
        theme="dark"
        collapsed={collapsed}
        collapsible
        trigger={null}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-dark-quaternary">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              {!collapsed && (
                <div>
                  <Text className="text-lg font-semibold text-text-primary block">SaaS App</Text>
                  <Text className="text-xs text-text-muted">Dark Dashboard</Text>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <BaseNavLink
                to="/"
                end
                className="flex items-center w-full text-left px-4 py-3 rounded-xl hover:bg-dark-hover transition-all duration-200 text-text-secondary hover:text-primary-400 group"
              >
                <HomeFilled className="text-lg group-hover:text-primary-400" />
                {!collapsed && <span className="ml-3 font-medium">Dashboard</span>}
              </BaseNavLink>
              
              <BaseNavLink
                to="/about"
                className="flex items-center w-full text-left px-4 py-3 rounded-xl hover:bg-dark-hover transition-all duration-200 text-text-secondary hover:text-primary-400 group"
              >
                <InfoCircleFilled className="text-lg group-hover:text-primary-400" />
                {!collapsed && <span className="ml-3 font-medium">Analytics</span>}
              </BaseNavLink>
              
              <BaseNavLink
                to="/contact"
                className="flex items-center w-full text-left px-4 py-3 rounded-xl hover:bg-dark-hover transition-all duration-200 text-text-secondary hover:text-primary-400 group"
              >
                <ContactsFilled className="text-lg group-hover:text-primary-400" />
                {!collapsed && <span className="ml-3 font-medium">Settings</span>}
              </BaseNavLink>
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-dark-quaternary">
            <div className="flex items-center space-x-3">
              <Avatar
                size={collapsed ? 32 : 40}
                icon={<UserOutlined />}
                className="bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg"
              />
              {!collapsed && (
                <div className="flex-1">
                  <Text className="text-sm font-medium text-text-primary block">John Doe</Text>
                  <Text className="text-xs text-text-muted">Admin</Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </Sider>

      <Layout className="bg-dark-primary">
        {/* Modern Dark Header */}
        <Header className="bg-dark-secondary shadow-lg border-b border-dark-quaternary flex items-center justify-between px-6 h-16">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-text-secondary hover:text-primary-400 hover:bg-dark-hover rounded-lg transition-all duration-200"
              size="large"
            />
            <div className="h-6 w-px bg-dark-quaternary" />
            <div>
              <Text className="text-lg font-semibold text-text-primary">Welcome back!</Text>
            </div>
          </div>
          
          <Space size="middle">
            <Button 
              type="text" 
              className="text-text-secondary hover:text-primary-400 hover:bg-dark-hover"
            >
              Notifications
            </Button>
            <Avatar
              size={36}
              icon={<UserOutlined />}
              className="bg-gradient-to-br from-primary-500 to-primary-700 cursor-pointer shadow-lg"
            />
          </Space>
        </Header>

        {/* Main Content */}
        <Content className="bg-dark-primary overflow-auto p-6">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutRoot;
