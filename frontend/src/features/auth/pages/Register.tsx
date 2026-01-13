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
          <UserAddOutlined style={{ fontSize: 28, color: "#DDE6ED" }} />
        </div>
        <Title
          level={2}
          style={{
            color: "#DDE6ED",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          Create Account
        </Title>
        <Text
          style={{
            color: "#9DB2BF",
            fontSize: 15,
          }}
        >
          Sign up to get started
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
            prefix={<MailOutlined style={{ color: "#9DB2BF", fontSize: 18 }} />}
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
          rules={[
            { required: true, message: "Please input your password!" },
            { validator: validatePassword },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#9DB2BF", fontSize: 18 }} />}
            placeholder="Create a password"
            style={{
              borderRadius: 8,
              border: "1px solid rgba(157, 178, 191, 0.3)",
            }}
            className="auth-input-hover"
          />
        </Form.Item>

        {/* Password Requirements */}
        <div
          className="auth-password-requirements"
          style={{
            backgroundColor: "rgba(221, 230, 237, 0.1)",
            border: "1px solid rgba(157, 178, 191, 0.2)",
          }}
        >
          <Text
            style={{
              color: "#9DB2BF",
              fontSize: 12,
              display: "block",
              marginBottom: 6,
            }}
          >
            Password must contain:
          </Text>
          <ul
            style={{
              margin: 0,
              paddingLeft: 20,
              color: "#9DB2BF",
              fontSize: 12,
            }}
          >
            <li>At least 8 characters</li>
            <li>One uppercase letter (A-Z)</li>
            <li>One lowercase letter (a-z)</li>
            <li>One number (0-9)</li>
            <li>One special character (!@#$%^&*...)</li>
          </ul>
        </div>

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
            prefix={<LockOutlined style={{ color: "#9DB2BF", fontSize: 18 }} />}
            placeholder="Confirm your password"
            style={{
              borderRadius: 8,
              border: "1px solid rgba(157, 178, 191, 0.3)",
            }}
            className="auth-input-hover"
          />
        </Form.Item>

        <Form.Item>
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
              background:
                "linear-gradient(135deg, rgba(221, 230, 237, 0.9) 0%, rgba(221, 230, 237, 0.8) 100%)",
              border: "none",
              boxShadow: "0 4px 12px rgba(221, 230, 237, 0.2)",
            }}
            className="auth-button-hover"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      <Divider
        style={{ borderColor: "rgba(157, 178, 191, 0.3)", margin: "24px 0" }}
      >
        <Text style={{ color: "#9DB2BF", fontSize: 13 }}>OR</Text>
      </Divider>

      {/* Google Sign In */}
      <Flex justify="center" vertical gap={10}>
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
        <Button
          type="text"
          size="large"
          className="auth-button-hover"
          style={{
            color: "#DDE6ED",
            fontWeight: 500,
          }}
          onClick={() => setIsSignUp(false)}
        >
          Already have an account? <strong>Sign In</strong>
        </Button>
      </Flex>
      {/* Terms and Privacy */}
      <div className="auth-footer">
        <Text style={{ color: "#9DB2BF", fontSize: 13 }}>
          By signing up, you agree to our{" "}
          <a
            href="/terms"
            style={{ color: "#DDE6ED", textDecoration: "none" }}
            className="auth-link"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            style={{ color: "#DDE6ED", textDecoration: "none" }}
            className="auth-link"
          >
            Privacy Policy
          </a>
        </Text>
      </div>
    </Card>
  );
};

export default Register;
