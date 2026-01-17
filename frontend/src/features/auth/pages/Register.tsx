import { Card, Form, Input, Button, Typography, Divider, Flex } from "antd";
import {
  LockOutlined,
  GoogleOutlined,
  UserAddOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { signUpUser } from "../slice/authThunks";
import type { AppDispatch, RootState } from "../../../redux/redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { themeColors } from "../../../themes/themeConfig";

const { Title, Text } = Typography;

interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProps {
  setIsSignUp: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsSignUp }) => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject();
    }

    const errors: string[] = [];

    if (value.length < 8) {
      errors.push("at least 8 characters");
    }
    if (!/[A-Z]/.test(value)) {
      errors.push("one uppercase letter");
    }
    if (!/[a-z]/.test(value)) {
      errors.push("one lowercase letter");
    }
    if (!/[0-9]/.test(value)) {
      errors.push("one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push("one special character");
    }

    if (errors.length > 0) {
      return Promise.reject(
        new Error(`Password must contain ${errors.join(", ")}`)
      );
    }

    return Promise.resolve();
  };

  const onFinish = async (values: RegisterPayload) => {
    const { email, password } = values;
    const res = await dispatch(signUpUser({ email, password }));
    if (res.meta.requestStatus === "fulfilled") {
      // Optionally show success message and redirect to login
      navigate("/login");
    } else {
      console.error("Sign up failed:", res.payload);
      setIsSignUp(true);
    }
  };

  return (
    <Card
      className="auth-card"
      style={{
        maxWidth: 460,
        maxHeight: "calc(100vh - 32px)",
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
          <UserAddOutlined
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
          Create Account
        </Title>
        <Text
          style={{
            color: themeColors.textSecondary,
            fontSize: 15,
          }}
        >
          Join a community of innovators
        </Text>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          className="auth-error"
          style={{
            backgroundColor: `${themeColors.accent}1A`,
            border: `1px solid ${themeColors.accent}4D`,
          }}
        >
          <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
        </div>
      )}

      {/* Register Form */}
      <Form
        name="register"
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
              <MailOutlined
                style={{ color: themeColors.primary, fontSize: 18 }}
              />
            }
            placeholder="Email address"
            style={{
              borderRadius: 8,
              border: `1px solid ${themeColors.border}`,
              backgroundColor: "#fff",
            }}
            className="auth-input-hover"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password
            prefix={
              <LockOutlined
                style={{ color: themeColors.primary, fontSize: 18 }}
              />
            }
            placeholder="Create password"
            style={{
              borderRadius: 8,
              border: `1px solid ${themeColors.border}`,
              backgroundColor: "#fff",
            }}
            className="auth-input-hover"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={
              <LockOutlined
                style={{ color: themeColors.primary, fontSize: 18 }}
              />
            }
            placeholder="Confirm password"
            style={{
              borderRadius: 8,
              border: `1px solid ${themeColors.border}`,
              backgroundColor: "#fff",
            }}
            className="auth-input-hover"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12 }}>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            icon={<UserAddOutlined />}
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Divider style={{ borderColor: themeColors.border, margin: "16px 0" }}>
        <Text style={{ color: themeColors.textSecondary, fontSize: 13 }}>
          OR
        </Text>
      </Divider>

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
        Sign up with Google
      </Button>

      <div
        className="auth-footer-container"
        style={{
          borderTop: `1px solid ${themeColors.border}`,
          marginTop: 24,
          paddingTop: 16,
        }}
      >
        <Flex justify="center" gap={4}>
          <Text style={{ color: themeColors.textSecondary, fontSize: 15 }}>
            Already have an account?
          </Text>
          <Button
            type="link"
            onClick={() => setIsSignUp(false)}
            style={{
              color: themeColors.primary,
              fontWeight: 600,
              padding: "0 4px",
              height: "auto",
            }}
            className="hover:scale-105 transition-transform"
          >
            Sign In
          </Button>
        </Flex>
      </div>
    </Card>
  );
};

export default Register;
