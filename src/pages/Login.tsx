/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Button, message, Card, Divider, Space, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaSignInAlt,
  FaShieldAlt,
} from "react-icons/fa";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState<"user" | "admin" | null>(null);

  interface Credentials {
    email: string;
    password: string;
  }

  const demoCredentials = {
    user: {
      email: "alaminmd9462@gmail.com",
      password: "alamin123",
    },
    admin: {
      email: "admin@gmail.com",
      password: "admin123",
    },
  };

  const fillDemoCredentials = (role: "user" | "admin") => {
    setSelectedRole(role);
    form.setFieldsValue({
      email: demoCredentials[role].email,
      password: demoCredentials[role].password,
    });
  };

  const onFinish = (values: Credentials) => {
    if (!selectedRole) {
      message.error("Please select a role");
      return;
    }

    dispatch(login({ ...values, role: selectedRole }))
      .then((res: any) => {
        if (res.payload && res.payload.token) {
          message.success(`Welcome ${selectedRole === "admin" ? "Admin" : "User"}!`);
          navigate(selectedRole === "admin" ? "/admin-dashboard" : "/user-dashboard");
        }
      })
      .catch(() => {
        message.error("Login failed");
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border-0">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaSignInAlt className="text-5xl text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <Divider />

        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Select Role:</p>
          <div className="grid grid-cols-2 gap-3">
            {/* User Role */}
            <div
              onClick={() => fillDemoCredentials("user")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRole === "user"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-gray-50 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-indigo-600" />
                <span className="font-semibold text-sm">General User</span>
              </div>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>

            {/* Admin Role */}
            <div
              onClick={() => fillDemoCredentials("admin")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRole === "admin"
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-gray-50 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FaShieldAlt className="text-red-600" />
                <span className="font-semibold text-sm">Admin</span>
              </div>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Demo Credentials Info */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <FaShieldAlt /> Demo Credentials
          </p>
          <Space direction="vertical" size="small" className="w-full text-xs">
            <div>
              <Tag color="blue">User</Tag>
              <p className="text-gray-700">
                <span className="font-mono">user@example.com / user123456</span>
              </p>
            </div>
            <div>
              <Tag color="red">Admin</Tag>
              <p className="text-gray-700">
                <span className="font-mono">admin@example.com / admin123456</span>
              </p>
            </div>
          </Space>
        </div>

        {/* Login Form */}
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="Email Address"
              prefix={<FaEnvelope className="text-gray-400 mr-2" />}
              disabled={!selectedRole}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<FaLock className="text-gray-400 mr-2" />}
              disabled={!selectedRole}
            />
          </Form.Item>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            disabled={!selectedRole}
            className="w-full rounded-lg font-semibold"
            icon={<FaSignInAlt />}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </Form>

        <Divider />

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
