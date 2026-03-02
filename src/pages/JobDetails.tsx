/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Tag, Form, Input, Button, message } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchJobById } from "../store/jobSlice";
import { submitApplication } from "../store/applicationSlice";

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentJob: job } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [id, dispatch]);

  if (!job) {
    return <p className="p-8">Job not found</p>;
  }

  interface ApplicationForm { name: string; email: string; resume: string; cover?: string; }

  type ApplicationPayload = {
    cover: any;
    name: string;
    email: string;
    resume_link: string;
    cover_note?: string;
    job_id?: string;
  };

  const onFinish = (values: ApplicationForm) => {
   
    const payload: ApplicationPayload = {
      cover: values.cover,          
      name: values.name,
      email: values.email,
      resume_link: values.resume,
      cover_note: values.cover,
      job_id: id,
    };
    dispatch(submitApplication(payload))
      .then(() => {
        message.success("Application submitted!");
        navigate("/jobs");
      })
      .catch(() => {
        message.error("Failed to submit");
      });
  };

  return (
    <div className="px-4 md:px-31 py-8">
      <Button type="link" onClick={() => navigate(-1)}>
        &larr; Back to jobs
      </Button>

      <Card className="mt-4 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-6">
          {job.company_logo && (
            <img
              src={job.company_logo}
              alt={job.company}
              className="h-20 w-20 object-contain"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{job.title}</h2>
            <p className="text-gray-500">{job.company}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt /> {job.location}
              </div>
              {job.salary && (
                <div className="flex items-center gap-1">
                  <BsCurrencyDollar /> {job.salary}
                </div>
              )}
              {job.job_type && (
                <div className="flex items-center gap-1">
                  <FiClock /> {job.job_type}
                </div>
              )}
            </div>
            <div className="mt-2">
              {job.job_type && <Tag color="blue">{job.job_type}</Tag>}
              {job.category && <Tag color="purple">{job.category}</Tag>}
            </div>
            {job.description && (
              <div className="mt-4 text-gray-700">
                <h3 className="font-semibold">Job Description</h3>
                <p>{job.description}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Apply Form */}
      <Card className="mt-8 rounded-2xl">
        <h3 className="text-xl font-semibold mb-4">Apply Now</h3>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="resume"
            label="Resume link"
            rules={[{ required: true, message: "Please provide resume URL" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="cover" label="Cover note">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Application
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default JobDetails;
