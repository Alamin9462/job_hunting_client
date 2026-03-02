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
  Empty,
  Row,
  Col,
  Descriptions,
  Tag,
  Avatar,
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
  const [appStatusFilter, setAppStatusFilter] = useState<string>("");
  const [appSearch, setAppSearch] = useState<string>("");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [viewAppOpen, setViewAppOpen] = useState(false);


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
      title: "Resume",
      dataIndex: "resume_link",
      key: "resume",
      width: 150,
      render: (link: string) =>
        link ? (
          <a href={link} target="_blank" rel="noreferrer" className="text-indigo-600">
            View Resume
          </a>
        ) : (
          <span className="text-gray-400">No resume</span>
        ),
    },
    {
      title: "Cover Note",
      dataIndex: "cover_note",
      key: "cover_note",
      width: 200,
      render: (note: string) => (
        <span>{note ? (note.length > 120 ? note.slice(0, 120) + "..." : note) : "-"}</span>
      ),
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
      title: "Submitted At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
    },
    {
      title: "Actions",
      key: "actions",
      width: 140,
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            size="small"
            onClick={() => {
              setSelectedApplication(record);
              setViewAppOpen(true);
            }}
          >
            View
          </Button>
        </div>
      ),
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
        <div className="mb-8">
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card className="rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <Avatar size={48} icon={<FaFileAlt />} />
                  <div>
                    <div className="text-sm text-gray-500">Total Jobs</div>
                    <div className="text-2xl font-bold">{jobs?.length || 0}</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <Avatar size={48} icon={<FaBell />} />
                  <div>
                    <div className="text-sm text-gray-500">Applications</div>
                    <div className="text-2xl font-bold">{applications?.length || 0}</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <Avatar size={48} icon={<FaUsers />} />
                  <div>
                    <div className="text-sm text-gray-500">Users</div>
                    <div className="text-2xl font-bold">{users?.length || 0}</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <Avatar size={48} icon={<FaChartBar />} />
                  <div>
                    <div className="text-sm text-gray-500">Acceptance</div>
                    <div className="text-2xl font-bold">75%</div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Card className="rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Recent Applications</h3>
            {applications && applications.length > 0 ? (
              <Table
                columns={applicationColumns}
                dataSource={applications.slice().reverse()}
                rowKey={(r: any) => r._id || r.id}
                pagination={{ pageSize: 8 }}
                scroll={{ x: 1000 }}
              />
            ) : (
              <Empty description="No applications yet" />
            )}
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
              rowKey={(r: any) => r._id || r.id}
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

          {/* filter & search */}
          <div className="flex flex-wrap gap-4 mb-4">
            <Select
              placeholder="Filter by status"
              allowClear
              style={{ width: 200 }}
              value={appStatusFilter || undefined}
              onChange={(val) => setAppStatusFilter(val || "")}
            >
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="accepted">Accepted</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
            <Input
              placeholder="Search applicant"
              value={appSearch}
              onChange={(e) => setAppSearch(e.target.value)}
              style={{ width: 200 }}
            />
          </div>

          {applications && applications.length > 0 ? (
            <Table
              columns={applicationColumns}
              dataSource={applications
                .filter((a: any) =>
                  appStatusFilter ? a.status === appStatusFilter : true
                )
                .filter((a: any) =>
                  appSearch
                    ? a.applicant?.name
                        .toLowerCase()
                        .includes(appSearch.toLowerCase())
                    : true
                )
              }
              rowKey={(r: any) => r._id || r.id}
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
              rowKey={(r: any) => r._id || r.id}
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

      {/* View Application Modal */}
      <Modal
        title={selectedApplication ? `Application - ${selectedApplication?.applicant?.name || "Unknown"}` : "Application Details"}
        open={viewAppOpen}
        onCancel={() => {
          setViewAppOpen(false);
          setSelectedApplication(null);
        }}
        footer={[
          <Button key="close" onClick={() => { setViewAppOpen(false); setSelectedApplication(null); }}>
            Close
          </Button>
        ]}
        width={800}
      >
        {selectedApplication ? (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Applicant Name">{selectedApplication.applicant?.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedApplication.applicant?.email}</Descriptions.Item>
            <Descriptions.Item label="Applied For">{selectedApplication.job?.title || selectedApplication.job_id || "-"}</Descriptions.Item>
            <Descriptions.Item label="Resume">{
              selectedApplication.resume_link ? (
                <a href={selectedApplication.resume_link} target="_blank" rel="noreferrer">Open Resume</a>
              ) : "-"
            }</Descriptions.Item>
            <Descriptions.Item label="Cover Note">{selectedApplication.cover_note || "-"}</Descriptions.Item>
            <Descriptions.Item label="Status"><Tag color={selectedApplication.status === 'accepted' ? 'green' : selectedApplication.status === 'rejected' ? 'red' : 'orange'}>{selectedApplication.status || 'pending'}</Tag></Descriptions.Item>
            <Descriptions.Item label="Submitted At">{selectedApplication.createdAt || selectedApplication.appliedAt || "-"}</Descriptions.Item>
            <Descriptions.Item label="Raw Data"><pre className="whitespace-pre-wrap text-xs">{JSON.stringify(selectedApplication, null, 2)}</pre></Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty description="No application selected" />
        )}
      </Modal>

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
