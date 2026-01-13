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
import { checkAuthStatus } from "../features/auth/slice/authThunks";
import "./LayoutRoot.css";

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
      <Layout className="layout-root">
        <Content className="center-content">
          <Outlet />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="layout-root">
      {/* Sider with responsive behavior */}
      <Sider
        width={isMobile ? 200 : 150}
        collapsedWidth={isMobile ? 0 : 80}
        className="sider-container"
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
        <div className="sider-content">
          {/* Logo/Title */}
          <div
            className={`logo-container ${
              collapsed && !isMobile ? "p-4" : "p-6"
            }`}
          >
            {collapsed && !isMobile ? (
              <div
                className="logo-collapsed"
                style={{ background: "#DDE6ED", color: "#526D82" }}
              >
                M
              </div>
            ) : (
              <span className="logo-text">My App</span>
            )}
          </div>

          {/* Navigation */}
          <nav className="nav-container">
            <div className="nav-list">
              <div onClick={() => isMobile && setCollapsed(true)}>
                <BaseNavLink to="/" end className="nav-link">
                  <HomeFilled className="nav-icon" />
                  {!collapsed && <span>Home</span>}
                </BaseNavLink>
              </div>
              <BaseNavLink to="/about" className="nav-link">
                <InfoCircleFilled className="nav-icon" />
                {!collapsed && <span>About</span>}
              </BaseNavLink>
              <BaseNavLink to="/contact" className="nav-link">
                <ContactsFilled className="nav-icon" />
                {!collapsed && <span>Contact</span>}
              </BaseNavLink>
            </div>
          </nav>

          {/* User Info */}
          {!collapsed && (
            <div className="user-info-container">
              <span className="text-sm" style={{ color: "#DDE6ED" }}>
                Welcome, User!
              </span>
            </div>
          )}
        </div>
      </Sider>

      {/* Mobile overlay when sidebar is open */}
      {isMobile && !collapsed && (
        <div
          className="mobile-overlay"
          onClick={() => setCollapsed(true)}
          style={{ backdropFilter: "blur(2px)" }}
        />
      )}
      <Layout className="main-layout">
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
          <div className="header-section">
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
            <div className="header-section">
              <div
                className="header-logo"
                style={{ background: "#DDE6ED", color: "#526D82" }}
              >
                D
              </div>
              <Title
                level={isMobile ? 5 : 4}
                style={{ margin: 0, color: "#DDE6ED", whiteSpace: "nowrap" }}
                className="hidden-sm"
              >
                Business Analytics
              </Title>
            </div>
          </div>

          {/* Right Section */}
          <div className="header-section-right">
            <Button
              type="text"
              icon={<SearchOutlined className="header-icon" />}
              className="header-icon-btn"
              style={{ color: "#DDE6ED" }}
            />
            <Badge count={5} size="small" offset={[-5, 5]}>
              <Button
                type="text"
                icon={<BellOutlined className="header-icon" />}
                className="header-icon-btn"
                style={{ color: "#DDE6ED" }}
              />
            </Badge>
            <Button
              type="text"
              icon={<QuestionCircleOutlined className="header-icon" />}
              className="header-icon-btn"
              style={{ color: "#DDE6ED" }}
            />
            <div className="divider-vertical" />
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space className="user-dropdown">
                <Avatar
                  size={isMobile ? "small" : "default"}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#DDE6ED", color: "#526D82" }}
                />
                <div className="user-dropdown-text">
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
          className="content-wrapper"
          style={{
            padding: isMobile ? "16px" : "24px",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <div className="content-inner">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutRoot;
