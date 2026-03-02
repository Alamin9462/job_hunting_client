/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Button, message, Card, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../store/authSlice";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaUserCheck,
  FaShieldAlt,
  FaUserPlus,
} from "react-icons/fa";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedRole, setSelectedRole] = useState<"user" | "admin" | null>(null);

  interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const onFinish = (values: RegisterCredentials) => {
    if (!selectedRole) {
      message.error("Please select a role");
      return;
    }

    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    dispatch(
      register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: selectedRole,
      })
    )
      .then((res: any) => {
        if (res.payload && res.payload.token) {
          message.success("Registered and logged in successfully!");
          if (selectedRole === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/jobs");
          }
        }
      })
      .catch(() => {
        message.error("Registration failed");
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg rounded-2xl shadow-xl border-0">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaUserPlus className="text-5xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 mt-2">Join our job hunting community</p>
        </div>

        <Divider />

        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">Select Your Role:</p>
          <div className="grid grid-cols-2 gap-3">
            {/* User Role */}
            <div
              onClick={() => {
                setSelectedRole("user");
                form.setFieldValue("role", "user");
              }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRole === "user"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-gray-50 hover:border-green-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FaUser className="text-green-600" />
                <span className="font-semibold text-sm">Job Seeker</span>
              </div>
              <p className="text-xs text-gray-500">Find jobs & apply</p>
            </div>

            {/* Admin Role */}
            <div
              onClick={() => {
                setSelectedRole("admin");
                form.setFieldValue("role", "admin");
              }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRole === "admin"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-gray-50 hover:border-green-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <FaShieldAlt className="text-red-600" />
                <span className="font-semibold text-sm">Recruiter/Admin</span>
              </div>
              <p className="text-xs text-gray-500">Post & manage jobs</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Registration Form */}
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Name Field */}
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input
              size="large"
              placeholder="Full Name"
              prefix={<FaUser className="text-gray-400 mr-2" />}
            />
          </Form.Item>

          {/* Email Field */}
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
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<FaLock className="text-gray-400 mr-2" />}
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password" }]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm Password"
              prefix={<FaLock className="text-gray-400 mr-2" />}
            />
          </Form.Item>

          {/* Hidden Role Field */}
          <Form.Item name="role" hidden>
            <Input />
          </Form.Item>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            disabled={!selectedRole}
            className="w-full rounded-lg font-semibold bg-green-600"
            icon={<FaUserCheck />}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Form>

        <Divider />

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
