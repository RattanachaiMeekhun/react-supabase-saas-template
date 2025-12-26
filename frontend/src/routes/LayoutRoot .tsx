import React, { use, useEffect, useState } from "react";
import {
  BellOutlined,
  ContactsFilled,
  HomeFilled,
  InfoCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Layout,
  Space,
  theme,
  Typography,
  type MenuProps,
} from "antd";
import BaseNavLink from "../components/Nav/BaseNavLink";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/redux";
import { useSelector } from "react-redux";
import { checkAuthStatus } from "../redux/slices/authSlice";
import Loader from "../components/ETC/Loader";
import AIChatBotContainer from "../components/Container/AIChatBotContainer";

const { Title, Text } = Typography;
const { Sider, Content, Header } = Layout;
const LayoutRoot: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const { isAuthenticated, loading } = useSelector((e: RootState) => e.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userMenu: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: "Logout",
      danger: true,
    },
  ];
  // useEffect(() => {
  //   dispatch(checkAuthStatus()).then((res) => {
  //     if (res.meta.requestStatus === "rejected") {
  //       console.error("Authentication check failed:", res.payload);
  //       navigate("/login", { replace: true });
  //     } else {
  //       console.log("Authentication check successful:", res.payload);
  //     }
  //   });
  // }, [dispatch]);

  if (loading) {
    return <Loader />;
  }
  // if (!isAuthenticated) {
  //   return (
  //     <Layout className="h-screen w-screen">
  //       <Content className="bg-[#4F4557] flex items-center justify-center">
  //         <Outlet />
  //       </Content>
  //     </Layout>
  //   );
  // }

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
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            zIndex: 10,
            height: 64,
          }}
        >
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
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
              D
            </div>
            <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
              Business Analytics
            </Title>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              type="text"
              icon={<SearchOutlined className="text-lg" />}
              className="hidden md:flex"
            />
            <Badge count={5} size="small" offset={[-5, 5]}>
              <Button type="text" icon={<BellOutlined className="text-lg" />} />
            </Badge>
            <Button
              type="text"
              icon={<QuestionCircleOutlined className="text-lg" />}
              className="hidden md:flex"
            />
            <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block" />
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#3b82f6" }}
                />
                <div className="hidden md:block text-sm leading-tight">
                  <Text strong>John Doe</Text>
                  <Text type="secondary" className="text-xs">
                    Admin
                  </Text>
                </div>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content className="bg-[#4F4557] overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutRoot;
