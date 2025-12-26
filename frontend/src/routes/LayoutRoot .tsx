import React, { useState } from "react";
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
import { Outlet } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Layout,
  Space,
  Typography,
  type MenuProps,
} from "antd";
import BaseNavLink from "../components/Nav/BaseNavLink";
import type { RootState } from "../redux/redux";
import { useSelector } from "react-redux";
import Loader from "../components/ETC/Loader";

const { Title, Text } = Typography;
const { Sider, Content, Header } = Layout;
const LayoutRoot: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { loading } = useSelector((e: RootState) => e.auth);
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
        className="bg-surface border-r border-border"
        theme="dark"
        collapsed={collapsed}
        style={{ background: "#526D82" }}
      >
        <div className="text-primary flex flex-col h-full">
          {/* Logo/Title */}
          <div className="p-6 border-b border-border">
            <span className="font-bold text-xl text-primary">My App</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <BaseNavLink
                to="/"
                end
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-primary"
              >
                <HomeFilled /> {!collapsed && "Home"}
              </BaseNavLink>
              <BaseNavLink
                to="/about"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-primary"
              >
                <InfoCircleFilled /> {!collapsed && "About"}
              </BaseNavLink>
              <BaseNavLink
                to="/contact"
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-primary"
              >
                <ContactsFilled /> {!collapsed && "Contact"}
              </BaseNavLink>
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-border">
            <span className="text-sm text-primary">Welcome, User!</span>
          </div>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#526D82",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
            height: 64,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "#DDE6ED",
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-surface font-bold text-xl shadow-sm">
              D
            </div>
            <Title level={4} style={{ margin: 0, color: "#DDE6ED" }}>
              Business Analytics
            </Title>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              type="text"
              icon={<SearchOutlined className="text-lg text-primary" />}
              className="hidden md:flex hover:bg-white/10"
            />
            <Badge count={5} size="small" offset={[-5, 5]}>
              <Button
                type="text"
                icon={<BellOutlined className="text-lg text-primary" />}
                className="hover:bg-white/10"
              />
            </Badge>
            <Button
              type="text"
              icon={<QuestionCircleOutlined className="text-lg text-primary" />}
              className="hidden md:flex hover:bg-white/10"
            />
            <div className="h-6 w-px bg-border mx-2 hidden md:block" />
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space className="cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors">
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#DDE6ED", color: "#526D82" }}
                />
                <div className="hidden md:block text-sm leading-tight">
                  <Text strong style={{ color: "#DDE6ED" }}>
                    John Doe
                  </Text>
                  <Text
                    type="secondary"
                    className="text-xs"
                    style={{ color: "#9DB2BF" }}
                  >
                    Admin
                  </Text>
                </div>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content className="bg-blend-darken overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutRoot;
