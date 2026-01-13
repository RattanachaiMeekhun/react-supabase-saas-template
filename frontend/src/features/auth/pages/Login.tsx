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
            background:
              "radial-gradient(circle at 20% 50%, rgba(221, 230, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(157, 178, 191, 0.3) 0%, transparent 50%)",
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
          background:
            "radial-gradient(circle at 20% 50%, rgba(221, 230, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(157, 178, 191, 0.3) 0%, transparent 50%)",
          animation: "float 15s ease-in-out infinite",
        }}
      />

      {/* Login Card */}
      <Card
        className="auth-card"
        style={{
          maxWidth: 460,
          borderRadius: 16,
          boxShadow:
            "0 10px 40px rgba(0, 0, 0, 0.3), 0 0 1px rgba(221, 230, 237, 0.1)",
          border: "1px solid rgba(157, 178, 191, 0.2)",
          background: "rgba(82, 109, 130, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Header with icon */}
        <div className="auth-header">
          <div
            className="auth-icon"
            style={{
              background:
                "linear-gradient(135deg, rgba(221, 230, 237, 0.2) 0%, rgba(157, 178, 191, 0.2) 100%)",
              border: "2px solid rgba(221, 230, 237, 0.3)",
            }}
          >
            <LoginOutlined style={{ fontSize: 28, color: "#DDE6ED" }} />
          </div>
          <Title
            level={2}
            style={{
              color: "#DDE6ED",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            Welcome Back
          </Title>
          <Text
            style={{
              color: "#9DB2BF",
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
              backgroundColor: "rgba(255, 77, 79, 0.15)",
              border: "1px solid rgba(255, 77, 79, 0.3)",
            }}
          >
            <Text style={{ color: "#ff4d4f", fontSize: 14 }}>{error}</Text>
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
                <UserOutlined style={{ color: "#9DB2BF", fontSize: 18 }} />
              }
              placeholder="Enter your email"
              autoFocus
              style={{
                borderRadius: 8,
                border: "1px solid rgba(157, 178, 191, 0.3)",
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
                <LockOutlined style={{ color: "#9DB2BF", fontSize: 18 }} />
              }
              placeholder="Enter your password"
              style={{
                borderRadius: 8,
                border: "1px solid rgba(157, 178, 191, 0.3)",
              }}
              className="auth-input-hover"
            />
          </Form.Item>

          <div className="auth-forgot-password-container">
            <a
              href="/forgot-password"
              style={{
                color: "#DDE6ED",
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
                background:
                  "linear-gradient(135deg, rgba(221, 230, 237, 0.9) 0%, rgba(221, 230, 237, 0.8) 100%)",
                border: "none",
                boxShadow: "0 4px 12px rgba(221, 230, 237, 0.2)",
              }}
              className="auth-button-hover"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider
          style={{ borderColor: "rgba(157, 178, 191, 0.3)", margin: "24px 0" }}
        >
          <Text style={{ color: "#9DB2BF", fontSize: 13 }}>OR</Text>
        </Divider>

        {/* Google Sign In */}
        <Button
          type="default"
          block
          icon={<GoogleOutlined style={{ fontSize: 18, color: "#4285F4" }} />}
          // onClick={handleGoogleSignIn}
          style={{
            height: 48,
            borderRadius: 8,
            border: "1px solid rgba(157, 178, 191, 0.3)",
            fontWeight: 500,
            fontSize: 15,
            background: "rgba(82, 109, 130, 0.5)",
          }}
          className="auth-button-hover"
        >
          Continue with Google
        </Button>

        {/* Sign Up Link */}
        <div
          className="auth-footer-container"
          style={{ borderTop: "1px solid rgba(157, 178, 191, 0.2)" }}
        >
          <Space size={4}>
            <Text style={{ color: "#9DB2BF", fontSize: 15 }}>
              Don't have an account?
            </Text>
            <Button
              type="link"
              onClick={() => setIsSignUp(true)}
              style={{
                color: "#DDE6ED",
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

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .transition-transform {
          transition: transform 0.2s ease-in-out;
        }

        .transition-all {
          transition: all 0.2s ease-in-out;
        }

        .hover\\:border-primary:hover {
          border-color: #DDE6ED !important;
        }

        .hover\\:underline:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Login;
