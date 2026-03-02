/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Card,
  Table,
  Button,
  Empty,
  Statistic,
  Modal,
  Form,
  Input,
  message,
  Tag,
} from "antd";
import {
  FaUser,
  FaFileAlt,
  FaBookmark,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchApplications } from "../store/applicationSlice";

const UserDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { applications } = useAppSelector((state) => state.applications);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const handleUpdateProfile = (values: any) => {
    console.log("Profile updated:", values);
    message.success("Profile updated successfully!");
    setIsProfileModalOpen(false);
  };

  const handleWithdrawApplication = () => {
    Modal.confirm({
      title: "Withdraw Application",
      content: "Are you sure you want to withdraw this application?",
      okText: "Withdraw",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        message.success("Application withdrawn");
      },
    });
  };

  // Application Statistics
  const acceptedCount = applications?.filter((app: any) => app.status === "accepted").length || 0;
  const rejectedCount = applications?.filter((app: any) => app.status === "rejected").length || 0;
  const pendingCount = applications?.filter((app: any) => app.status === "pending").length || 0;

  // Columns for Applications Table
  const applicationColumns = [
    {
      title: "Job Title",
      dataIndex: ["job", "title"],
      key: "jobTitle",
      width: 200,
      render: (text: string) => (
        <div>
          <p className="font-semibold text-gray-800">{text}</p>
        </div>
      ),
    },
    {
      title: "Company",
      dataIndex: ["job", "company"],
      key: "company",
      width: 150,
    },
    {
      title: "Applied Date",
      dataIndex: "appliedAt",
      key: "appliedAt",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        let color = "processing";
        let icon = null;

        if (status === "accepted") {
          color = "success";
          icon = <FaCheckCircle className="mr-1" />;
        } else if (status === "rejected") {
          color = "error";
        }

        return (
          <Tag icon={icon} color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            icon={<FaDownload />}
            disabled={record.status !== "accepted"}
          >
            Download Offer
          </Button>
          {record.status === "pending" && (
            <Button
              danger
              size="small"
              icon={<FaTrash />}
              onClick={() => handleWithdrawApplication()}
            >
              Withdraw
            </Button>
          )}
        </div>
      ),
    },
  ];


  const tabItems = [
    {
      key: "overview",
      label: (
        <span className="flex items-center gap-2">
          <FaUser /> Overview
        </span>
      ),
      children: (
        <div>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="rounded-lg shadow-sm">
              <Statistic
                title="Applications Sent"
                value={applications?.length || 0}
                prefix={<FaFileAlt className="text-indigo-600 mr-2" />}
              />
            </Card>
            <Card className="rounded-lg shadow-sm">
              <Statistic
                title="Pending"
                value={pendingCount}
                prefix={<FaFileAlt className="text-orange-600 mr-2" />}
              />
            </Card>
            <Card className="rounded-lg shadow-sm">
              <Statistic
                title="Accepted"
                value={acceptedCount}
                prefix={<FaCheckCircle className="text-green-600 mr-2" />}
              />
            </Card>
            <Card className="rounded-lg shadow-sm">
              <Statistic
                title="Rejected"
                value={rejectedCount}
                prefix={<FaTrash className="text-red-600 mr-2" />}
              />
            </Card>
          </div>

          {/* Profile Card */}
          <Card className="rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">My Profile</h3>
              <Button
                type="primary"
                icon={<FaEdit />}
                onClick={() => setIsProfileModalOpen(true)}
              >
                Edit Profile
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-semibold">{user?.name || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold">{user?.email || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-lg font-semibold">{user?.phone || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-semibold">{user?.location || "Not set"}</p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    {
      key: "applications",
      label: (
        <span className="flex items-center gap-2">
          <FaFileAlt /> My Applications
        </span>
      ),
      children: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Application History</h2>
          {applications && applications.length > 0 ? (
            <Table
              columns={applicationColumns}
              dataSource={applications}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          ) : (
            <Empty description="No applications yet" />
          )}
        </div>
      ),
    },
    {
      key: "saved",
      label: (
        <span className="flex items-center gap-2">
          <FaBookmark /> Saved Jobs
        </span>
      ),
      children: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Saved Jobs</h2>
          <Empty description="No saved jobs yet" />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-[100px] py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <FaUser className="text-4xl text-indigo-600" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Track your applications and manage your profile
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Card className="rounded-xl shadow-sm border-0">
        <Tabs items={tabItems} size="large" />
      </Card>

      {/* Edit Profile Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <FaEdit className="text-indigo-600" />
            Edit Profile
          </div>
        }
        open={isProfileModalOpen}
        onCancel={() => {
          setIsProfileModalOpen(false);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsProfileModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            Save Changes
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form} onFinish={handleUpdateProfile}>
          <Form.Item
            name="name"
            label="Full Name"
            initialValue={user?.name}
            rules={[
              { required: true, message: "Please enter your name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            initialValue={user?.email}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            initialValue={user?.phone}
          >
            <Input placeholder="+1 (555) 000-0000" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            initialValue={user?.location}
          >
            <Input placeholder="City, State/Country" />
          </Form.Item>

          <Form.Item
            name="bio"
            label="Bio"
            initialValue={user?.bio}
          >
            <Input.TextArea rows={4} placeholder="Tell us about yourself..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDashboard;
