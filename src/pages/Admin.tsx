/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  message,
  Divider,
} from "antd";
import {
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaPlusCircle,
  FaTrash,
  FaChartBar,
} from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchJobs, createJob, deleteJob } from "../store/jobSlice";
import { fetchApplications } from "../store/applicationSlice";
import { fetchUsers } from "../store/userSlice";

const { Option } = Select;

const Admin: React.FC = () => {
  const dispatch = useAppDispatch();
  const { jobs } = useAppSelector((state) => state.jobs);
  const { applications } = useAppSelector((state) => state.applications);
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchApplications());
    dispatch(fetchUsers());
  }, [dispatch]);

  const onFinish = (values: any) => {
    dispatch(createJob(values))
      .then(() => message.success("Job added successfully"))
      .catch(() => message.error("Failed to add job"));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-[100px] py-12">

      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-4 mb-12">
        <FaChartBar className="text-4xl text-indigo-600" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Manage jobs, applications and users efficiently
          </p>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* ================= LEFT: POST JOB ================= */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl shadow-sm border-0 p-6">

            <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <FaPlusCircle className="text-indigo-500 text-xl" />
              Post New Job
            </h2>

            <Form layout="vertical" onFinish={onFinish}>
              <div className="grid md:grid-cols-2 gap-6">

                <Form.Item
                  name="title"
                  label="Job Title"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="company"
                  label="Company"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  name="location"
                  label="Location"
                  rules={[{ required: true }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item name="salary"
                 label="Salary Range"
                 rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>

                <Form.Item name="time" label="Posted">
                  <Input size="large" placeholder="e.g. 2 days ago" />
                </Form.Item>

                <Form.Item name="type" label="Job Type" rules={[{ required: true }]}>
                  <Select size="large" allowClear>
                    <Option value="Full-Time">Full-Time</Option>
                    <Option value="Part-Time">Part-Time</Option>
                    <Option value="Remote">Remote</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="category" label="Category" >
                  <Input size="large" />
                </Form.Item>

                <Form.Item name="logo" label="Logo URL" rules={[{ required: true }]}>
                  <Input size="large" />
                </Form.Item>

              </div>

              <Form.Item name="description" label="Description">
                <Input.TextArea rows={4} />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full rounded-xl mt-4"
              >
                Add Job
              </Button>
            </Form>
          </Card>
        </div>

        {/*  RIGHT: STATS  */}
        <div className="space-y-6">

          <Card className="rounded-2xl shadow-sm text-center p-6">
            <FaBriefcase className="text-3xl text-indigo-500 mx-auto mb-3" />
            <h4 className="text-gray-500 text-sm">Total Jobs</h4>
            <p className="text-3xl font-bold text-indigo-600">
              {jobs.length}
            </p>
          </Card>

          <Card className="rounded-2xl shadow-sm text-center p-6">
            <FaFileAlt className="text-3xl text-green-500 mx-auto mb-3" />
            <h4 className="text-gray-500 text-sm">Applications</h4>
            <p className="text-3xl font-bold text-green-600">
              {applications.length}
            </p>
          </Card>

          <Card className="rounded-2xl shadow-sm text-center p-6">
            <FaUsers className="text-3xl text-purple-500 mx-auto mb-3" />
            <h4 className="text-gray-500 text-sm">Users</h4>
            <p className="text-3xl font-bold text-purple-600">
              {users.length}
            </p>
          </Card>

        </div>
      </div>

      {/* EXISTING JOBS  */}
      <Divider className="my-14" />

      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
        <FaBriefcase className="text-indigo-500 text-xl" />
        Existing Jobs
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <Card
            key={job._id || job.id}
            className="rounded-2xl shadow-sm border-0 hover:shadow-md transition duration-300"
          >
            <div className="flex justify-between items-start">

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {job.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {job.company} • {job.location}
                </p>
              </div>

              <Button
                danger
                size="small"
                icon={<FaTrash />}
                onClick={() => {
                  dispatch(deleteJob(job._id || job.id?.toString() || ""));
                  message.info("Job removed");
                }}
              >
                Delete
              </Button>

            </div>
          </Card>
        ))}
      </div>

      {/*  APPLICATIONS */}
      <Divider className="my-14" />

      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
        <FaFileAlt className="text-green-500 text-xl" />
        Applications
      </h2>

      <div className="space-y-4">
        {applications.map((a) => (
          <Card
            key={a._id || a.email + a.jobId}
            className="rounded-2xl shadow-sm border-0"
          >
            <p className="font-semibold text-gray-800">
              {a.name} ({a.email})
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Applied to Job ID: {a.jobId}
            </p>
            {a.cover && (
              <p className="mt-2 text-gray-600 text-sm">
                Cover: {a.cover}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* USERS  */}
      <Divider className="my-14" />

      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
        <FaUsers className="text-purple-500 text-xl" />
        Users
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {users.map((u, idx) => (
          <Card
            key={idx}
            className="rounded-2xl shadow-sm border-0 text-center p-6"
          >
            <FaUsers className="text-xl text-purple-500 mx-auto mb-3" />
            <p className="text-gray-700">
              {u.email || u.name || "User"}
            </p>
          </Card>
        ))}
      </div>

    </div>
  );
};

export default Admin;