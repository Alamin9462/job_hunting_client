/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Form, Input, Button, message } from "antd";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { register } from "../store/authSlice";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  interface Credentials {
    email: string;
    password: string;
  }
  const onFinish = (values: Credentials) => {
    dispatch(register(values))
      .then((res: any) => {
        if (res.payload && res.payload.token) {
          message.success("Registered and logged in");
          navigate("/");
        }
      })
      .catch(() => {
        message.error("Registration failed");
      });
  };

  return (
    <div className="px-4 md:px-[124px] py-8">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="name"
          rules={[{ required: true, type: "string" }]}
        >
          <Input />
        </Form.Item>
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
            Register
          </Button>
        </Form.Item>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Register;
