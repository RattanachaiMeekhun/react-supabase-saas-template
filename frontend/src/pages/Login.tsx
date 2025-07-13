import { Card, Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginUser,
  signUpUser,
  type LoginPayload,
} from "../redux/slices/authSlice";
import type { AppDispatch, RootState } from "../redux/redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: LoginPayload) => {
    if (isSignUp) {
      const res = await dispatch(signUpUser(values));
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      } else {
        console.error("Sign up failed:", res.payload);
      }
    } else {
      const res = await dispatch(loginUser(values));
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      } else {
        console.error("Login failed:", res.payload);
      }
    }
  };
  // const handleGoogleSignIn = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //   });
  //   if (error) {
  //     message.error(error.message);
  //   }
  // };

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
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
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
          // onClick={handleGoogleSignIn}
          style={{ marginBottom: 16, marginTop: 8 }}
        >
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
