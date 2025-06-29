import { Card, Form, Input, Button, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signIn, signUp } from "../services/authService";
import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    if (isSignUp) {
      const { data, error } = await signUp(values.email, values.password);
      setLoading(false);
      if (!error && data?.user) {
        await supabase.from("profiles").insert([
          {
            id: data.user.id, // ใช้ id จาก auth.users
            email: values.email,
            full_name: "", // หรือข้อมูลอื่น ๆ ที่ต้องการ
            avatar_url: "",
            role: "user",
          },
        ]);
        message.success(
          "Sign up successful! Please check your email to verify your account."
        );
      } else {
        message.error(error?.message);
        setIsSignUp(false);
      }
    } else {
      const { data, error } = await signIn(values.email, values.password);
      setLoading(false);
      if (!error && data?.user) {
        message.success("Login successful!");
        navigate("/");
      } else if (error) {
        message.error(error.message);
      }
    }
  };
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card style={{ minWidth: 350, boxShadow: "0 2px 16px #0001" }}>
        <div className="text-center mb-6">
          <Title level={3}>{isSignUp ? "Sign Up" : "Sign In"}</Title>
        </div>
        <Form
          name={isSignUp ? "signup" : "login"}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
              autoFocus
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-2">
          <a href="/forgot-password" className="text-primary">
            Forgot password?
          </a>
        </div>
        <div className="text-center mt-4">
          <Button
            type="link"
            onClick={() => setIsSignUp((prev) => !prev)}
            style={{ padding: 0 }}
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </div>{" "}
        <Button
          type="default"
          block
          icon={
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              width={18}
              style={{ marginRight: 8 }}
            />
          }
          onClick={handleGoogleSignIn}
          style={{ marginBottom: 16, marginTop: 8 }}
        >
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
