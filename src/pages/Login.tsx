/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  interface Credentials { email: string; password: string; }
  const onFinish = (values: Credentials) => {
    dispatch(login(values))
      .then((res: any) => {
        if (res.payload && res.payload.token) {
          message.success("Logged in");
          navigate("/");
        }
      })
      .catch(() => {
        message.error("Login failed");
      });
  };

  return (
    <div className="px-4 md:px-[124px] py-8">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Login;
