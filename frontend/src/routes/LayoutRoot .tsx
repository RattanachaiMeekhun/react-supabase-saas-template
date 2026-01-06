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
  Typography,
  type MenuProps,
} from "antd";
import type { AppDispatch, RootState } from "../redux/redux";
import { useSelector } from "react-redux";
import Loader from "../components/ETC/Loader";
import { useDispatch } from "react-redux";
import BaseNavLink from "../components/Nav/BaseNavLink";
import { checkAuthStatus } from "../features/slice/auth/authThunks";

const { Title, Text } = Typography;
const { Sider, Content, Header } = Layout;
const LayoutRoot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { loading } = useSelector((e: RootState) => e.auth);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse on mobile
      if (mobile) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  useEffect(() => {
    if (isAuthenticated === null) {
      dispatch(checkAuthStatus()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          navigate("/login");
        } else {
          navigate("/home");
        }
      });
    }
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
    return (
      <Layout className="h-screen w-screen overflow-hidden">
        <Content className="flex items-center justify-center">
          <Outlet />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="h-screen w-screen overflow-hidden">
      {/* Sider with responsive behavior */}
      <Sider
        width={isMobile ? 200 : 150}
        collapsedWidth={isMobile ? 0 : 80}
        className="bg-surface border-r border-border"
        theme="dark"
        collapsed={collapsed}
        breakpoint="md"
        collapsible
        trigger={null}
        style={{
          background: "#526D82",
          overflow: "auto",
          height: "100vh",
          position: isMobile ? "fixed" : "relative",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: isMobile ? 1000 : 1,
          transition: "all 0.2s",
        }}
      >
        <div className="text-primary flex flex-col h-full">
          {/* Logo/Title */}
          <div
            className={`${
              collapsed && !isMobile ? "p-4" : "p-6"
            } border-b border-border flex items-center justify-center`}
          >
            {collapsed && !isMobile ? (
              <div
                className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-surface font-bold text-xl shadow-sm"
                style={{ background: "#DDE6ED", color: "#526D82" }}
              >
                M
              </div>
            ) : (
              <span className="font-bold text-xl text-primary">My App</span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              <div onClick={() => isMobile && setCollapsed(true)}>
                <BaseNavLink
                  to="/"
                  end
                  className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-primary"
                >
                  <HomeFilled className="text-lg flex-shrink-0" />
                  {!collapsed && <span>Home</span>}
                </BaseNavLink>
              </div>
              <BaseNavLink
                to="/about"
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-primary"
              >
                <InfoCircleFilled className="text-lg flex-shrink-0" />
                {!collapsed && <span>About</span>}
              </BaseNavLink>
              <BaseNavLink
                to="/contact"
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-primary"
              >
                <ContactsFilled className="text-lg flex-shrink-0" />
                {!collapsed && <span>Contact</span>}
              </BaseNavLink>
            </div>
          </nav>

          {/* User Info */}
          {!collapsed && (
            <div className="p-4 border-t border-border">
              <span className="text-sm text-primary">Welcome, User!</span>
            </div>
          )}
        </div>
      </Sider>

      {/* Mobile overlay when sidebar is open */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={() => setCollapsed(true)}
          style={{ backdropFilter: "blur(2px)" }}
        />
      )}
      <Layout className="flex-1 overflow-hidden">
        <Header
          style={{
            background: "#526D82",
            padding: isMobile ? "0 12px" : "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 100,
            height: isMobile ? 56 : 64,
            position: "sticky",
            top: 0,
          }}
        >
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                color: "#DDE6ED",
                fontSize: "16px",
                width: isMobile ? 48 : 64,
                height: isMobile ? 48 : 64,
              }}
            />
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-surface font-bold text-xl shadow-sm"
                style={{ background: "#DDE6ED", color: "#526D82" }}
              >
                D
              </div>
              <Title
                level={isMobile ? 5 : 4}
                style={{ margin: 0, color: "#DDE6ED", whiteSpace: "nowrap" }}
                className="hidden sm:block"
              >
                Business Analytics
              </Title>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
            <Button
              type="text"
              icon={<SearchOutlined className="text-lg text-primary" />}
              className="hidden lg:flex hover:bg-white/10"
              style={{ color: "#DDE6ED" }}
            />
            <Badge count={5} size="small" offset={[-5, 5]}>
              <Button
                type="text"
                icon={<BellOutlined className="text-lg text-primary" />}
                className="hover:bg-white/10"
                style={{ color: "#DDE6ED" }}
              />
            </Badge>
            <Button
              type="text"
              icon={<QuestionCircleOutlined className="text-lg text-primary" />}
              className="hidden lg:flex hover:bg-white/10"
              style={{ color: "#DDE6ED" }}
            />
            <div className="h-6 w-px bg-border mx-1 sm:mx-2 hidden md:block" />
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space className="cursor-pointer hover:bg-white/10 p-1 sm:p-2 rounded-lg transition-colors">
                <Avatar
                  size={isMobile ? "small" : "default"}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#DDE6ED", color: "#526D82" }}
                />
                <div className="hidden lg:block text-sm leading-tight">
                  <div>
                    <Text strong style={{ color: "#DDE6ED", display: "block" }}>
                      John Doe
                    </Text>
                  </div>
                  <div>
                    <Text
                      type="secondary"
                      className="text-xs"
                      style={{ color: "#9DB2BF", display: "block" }}
                    >
                      Admin
                    </Text>
                  </div>
                </div>
              </Space>
            </Dropdown>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          className="bg-blend-darken overflow-auto"
          style={{
            padding: isMobile ? "16px" : "24px",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <div className="max-w-full mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutRoot;
