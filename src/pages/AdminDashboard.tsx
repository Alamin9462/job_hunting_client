/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Card,
  Table,
  Button,
  Form,
  Input,
  Select,
  Modal,
  message,
  Statistic,
  Empty,
} from "antd";
import {
  FaChartBar,
  FaFileAlt,
  FaUsers,
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaBell,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchJobs, createJob, deleteJob } from "../store/jobSlice";
import { fetchApplications } from "../store/applicationSlice";
import { fetchUsers } from "../store/userSlice";

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { jobs } = useAppSelector((state) => state.jobs);
  const { applications } = useAppSelector((state) => state.applications);
  const { users } = useAppSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchApplications());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddJob = (values: any) => {
    dispatch(createJob(values))
      .then(() => {
        message.success("Job posted successfully!");
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch(() => {
        message.error("Failed to post job");
      });
  };

  const handleDeleteJob = (jobId: string) => {
    Modal.confirm({
      title: "Delete Job",
      content: "Are you sure you want to delete this job?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        // make sure to send the MongoDB _id if available
        dispatch(deleteJob(jobId))
          .then(() => message.success("Job deleted successfully"))
          .catch(() => message.error("Failed to delete job"));
      },
    });
  };

  // Table columns for Jobs
  const jobColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      width: 150,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: 120,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 120,
    },
    {
      title: "Type",
      dataIndex: "job_type",
      key: "job_type",
      width: 100,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      width: 100,
      render: (salary: string) => `$${salary}`,
    },
    {
      title: "Logo",
      dataIndex: "company_logo",
      key: "company_logo",
      width: 120,
      render: (url: string) => url ? <img src={url} alt="logo" className="h-8" /> : null,
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
            icon={<FaEdit />}
            onClick={() => {
              form.setFieldsValue(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            size="small"
            icon={<FaTrash />}
            onClick={() => handleDeleteJob(record._id || record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Table columns for Applications
  const applicationColumns = [
    {
      title: "Applicant Name",
      dataIndex: ["applicant", "name"],
      key: "applicantName",
      width: 150,
    },
    {
      title: "Job",
      dataIndex: ["job", "title"],
      key: "jobTitle",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: ["applicant", "email"],
      key: "email",
      width: 180,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        const color =
          status === "accepted"
            ? "green"
            : status === "rejected"
              ? "red"
              : "orange";
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Date Applied",
      dataIndex: "appliedAt",
      key: "appliedAt",
      width: 150,
    },
  ];

  // Table columns for Users
  const userColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (role: string) => (
        <span
          style={{
            color: role === "admin" ? "#ef4444" : "#10b981",
          }}
        >
          {role.toUpperCase()}
        </span>
      ),
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
    },
  ];

  const tabItems = [
    {
      key: "overview",
      label: (
        <span className="flex items-center gap-2">
          <FaChartBar /> Overview
        </span>
      ),
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-lg shadow-sm">
            <Statistic
              title="Total Jobs"
              value={jobs?.length || 0}
              prefix={<FaFileAlt className="text-indigo-600 mr-2" />}
            />
          </Card>
          <Card className="rounded-lg shadow-sm">
            <Statistic
              title="Total Applications"
              value={applications?.length || 0}
              prefix={<FaBell className="text-orange-600 mr-2" />}
            />
          </Card>
          <Card className="rounded-lg shadow-sm">
            <Statistic
              title="Total Users"
              value={users?.length || 0}
              prefix={<FaUsers className="text-green-600 mr-2" />}
            />
          </Card>
          <Card className="rounded-lg shadow-sm">
            <Statistic
              title="Acceptance Rate"
              value={75}
              precision={0}
              suffix="%"
              prefix={<FaChartBar className="text-red-600 mr-2" />}
            />
          </Card>
        </div>
      ),
    },
    {
      key: "jobs",
      label: (
        <span className="flex items-center gap-2">
          <FaFileAlt /> Jobs Management
        </span>
      ),
      children: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Posted Jobs</h2>
            <Button
              type="primary"
              icon={<FaPlusCircle />}
              onClick={() => setIsModalOpen(true)}
            >
              Post New Job
            </Button>
          </div>
          {jobs && jobs.length > 0 ? (
            <Table
              columns={jobColumns}
              dataSource={jobs}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          ) : (
            <Empty description="No jobs posted yet" />
          )}
        </div>
      ),
    },
    {
      key: "applications",
      label: (
        <span className="flex items-center gap-2">
          <FaBell /> Applications
        </span>
      ),
      children: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Job Applications</h2>
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
      key: "users",
      label: (
        <span className="flex items-center gap-2">
          <FaUsers /> Users
        </span>
      ),
      children: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Registered Users</h2>
          {users && users.length > 0 ? (
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1000 }}
            />
          ) : (
            <Empty description="No users found" />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-25 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <FaChartBar className="text-4xl text-red-600" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage jobs, applications, and users efficiently
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Card className="rounded-xl shadow-sm border-0 mb-6">
        <Tabs items={tabItems} size="large" />
      </Card>

      {/* Post Job Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <FaPlusCircle className="text-indigo-600" />
            Post New Job
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            Post Job
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form} onFinish={handleAddJob}>
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: "Please enter job title" }]}
          >
            <Input placeholder="e.g., Senior Developer" />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input placeholder="e.g., Tech Company" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input placeholder="e.g., New York, NY" />
          </Form.Item>

          <Form.Item
            name="job_type"
            label="Job Type"
            rules={[{ required: true, message: "Please select job type" }]}
          >
            <Select placeholder="Select job type">
              <Select.Option value="Full-time">Full-time</Select.Option>
              <Select.Option value="Part-time">Part-time</Select.Option>
              <Select.Option value="Contract">Contract</Select.Option>
              <Select.Option value="Internship">Internship</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="company_logo"
            label="Company Logo URL"
            rules={[{ required: true, type: 'url', message: 'Please enter a valid URL' }]}
          >
            <Input placeholder="https://example.com/logo.png" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: false }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="IT">IT</Select.Option>
              <Select.Option value="Marketing">Marketing</Select.Option>
              <Select.Option value="Design">Design</Select.Option>
              <Select.Option value="Sales">Sales</Select.Option>
              <Select.Option value="HR">HR</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="salary"
            label="Salary Range"
            rules={[{ required: true, message: "Please enter salary" }]}
          >
            <Input placeholder="e.g., 80000" type="number" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Job Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} placeholder="Describe the job role..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
