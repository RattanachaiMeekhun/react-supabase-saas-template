import { Card, Form, Input, Button, Typography, Divider, Space } from "antd";
import {
  LockOutlined,
  UserOutlined,
  LoginOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../slice/authThunks";
import type { LoginPayload } from "../slice/authTypes";
import type { AppDispatch, RootState } from "../../../redux/redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import "./Auth.css";
import { themeColors } from "../../../themes/themeConfig";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: LoginPayload) => {
    const res = await dispatch(loginUser(values));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    } else {
      console.error("Login failed:", res.payload);
    }
  };

  // If isSignUp is true, render the Register component
  if (isSignUp) {
    return (
      <div className="auth-container">
        {/* Animated background gradient */}
        <div
          className="auth-bg-layer"
          style={{
            background: `radial-gradient(circle at 20% 50%, ${themeColors.secondary}4D 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${themeColors.primary}4D 0%, transparent 50%)`,
            animation: "float 15s ease-in-out infinite",
          }}
        />
        <Register setIsSignUp={setIsSignUp} />
      </div>
    );
  }

  return (
    <div className="auth-container">
      {/* Animated background circles */}
      <div
        className="auth-bg-layer"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${themeColors.secondary}4D 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${themeColors.primary}4D 0%, transparent 50%)`,
          animation: "float 15s ease-in-out infinite",
        }}
      />

      {/* Login Card */}
      <Card
        className="auth-card"
        style={{
          maxWidth: 460,
          borderRadius: 16,
          boxShadow: `0 10px 40px rgba(0, 0, 0, 0.1), 0 0 1px ${themeColors.border}`,
          border: `1px solid ${themeColors.border}`,
          background: themeColors.surface,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header with icon */}
        <div className="auth-header">
          <div
            className="auth-icon"
            style={{
              background: `linear-gradient(135deg, ${themeColors.primary}20 0%, ${themeColors.secondary}20 100%)`,
              border: `2px solid ${themeColors.primary}4D`,
            }}
          >
            <LoginOutlined
              style={{ fontSize: 28, color: themeColors.primary }}
            />
          </div>
          <Title
            level={2}
            style={{
              color: themeColors.textPrimary,
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Welcome Back
          </Title>
          <Text
            style={{
              color: themeColors.textSecondary,
              fontSize: 15,
            }}
          >
            Sign in to continue to your account
          </Text>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            className="auth-error"
            style={{
              backgroundColor: `${themeColors.accent}1A`, // using accent as error bg? or red?
              border: `1px solid ${themeColors.accent}4D`,
            }}
          >
            <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
          </div>
        )}

        {/* Login Form */}
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{ color: themeColors.primary, fontSize: 18 }}
                />
              }
              placeholder="Enter your email"
              autoFocus
              style={{
                borderRadius: 8,
                border: `1px solid ${themeColors.border}`,
                backgroundColor: "#fff",
                color: themeColors.textPrimary,
              }}
              className="auth-input-hover"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={
                <LockOutlined
                  style={{ color: themeColors.primary, fontSize: 18 }}
                />
              }
              placeholder="Enter your password"
              style={{
                borderRadius: 8,
                border: `1px solid ${themeColors.border}`,
                backgroundColor: "#fff",
              }}
              className="auth-input-hover"
            />
          </Form.Item>

          <div className="auth-forgot-password-container">
            <a
              href="/forgot-password"
              style={{
                color: themeColors.primary,
                fontSize: 14,
                textDecoration: "none",
                fontWeight: 500,
              }}
              className="auth-link"
            >
              Forgot password?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              icon={<LoginOutlined />}
              style={{
                height: 48,
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                background: themeColors.primary,
                border: "none",
                boxShadow: `0 4px 12px ${themeColors.primary}33`,
              }}
              className="auth-button-hover"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ borderColor: themeColors.border, margin: "24px 0" }}>
          <Text style={{ color: themeColors.textSecondary, fontSize: 13 }}>
            OR
          </Text>
        </Divider>

        {/* Google Sign In */}
        <Button
          type="default"
          block
          icon={<GoogleOutlined style={{ fontSize: 18, color: "#4285F4" }} />}
          style={{
            height: 48,
            borderRadius: 8,
            border: `1px solid ${themeColors.border}`,
            fontWeight: 500,
            fontSize: 15,
            background: "#fff",
            color: themeColors.textPrimary,
          }}
          className="auth-button-hover"
        >
          Continue with Google
        </Button>

        {/* Sign Up Link */}
        <div
          className="auth-footer-container"
          style={{ borderTop: `1px solid ${themeColors.border}` }}
        >
          <Space size={4}>
            <Text style={{ color: themeColors.textSecondary, fontSize: 15 }}>
              Don't have an account?
            </Text>
            <Button
              type="link"
              onClick={() => setIsSignUp(true)}
              style={{
                color: themeColors.primary,
                fontWeight: 600,
                padding: "0 4px",
                height: "auto",
              }}
              className="hover:scale-105 transition-transform"
            >
              Sign Up
            </Button>
          </Space>
        </div>
      </Card>
      {/* CSS Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
