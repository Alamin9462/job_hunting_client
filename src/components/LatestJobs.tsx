import React from "react";
import { Card, Tag } from "antd";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiClock } from "react-icons/fi";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchJobs } from "../store/jobSlice";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const { jobs } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();
  // show the first four jobs as "latest"
  const jobsToShow = jobs.slice(0, 4);

  React.useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [jobs.length, dispatch]);

  return (
    <div className="bg-[#f9f8fd] py-8 px-4 md:px-[124px]">
      <div className="mx-auto">

        {/* Heading Section */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold">
            Latest{" "}
            <span className="text-indigo-600">Jobs Open</span>
          </h2>

          <div className="flex items-center gap-2 text-indigo-600 font-medium cursor-pointer hover:gap-3 transition-all duration-300">
            <Link to="/jobs">View All Jobs</Link>
            <FaArrowRight />
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {jobsToShow.map((job, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-gray-100 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-start gap-6">

                {/* Left Section */}
                <div className="flex gap-4">
                  <img
                    src={job.company_logo || ""}
                    alt={job.company}
                    className="h-12 w-12 object-contain"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">
                      {job.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {job.company}
                    </p>

                    {/* Info Row */}
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {job.location}
                      </div>

                      <div className="flex items-center gap-1">
                        <BsCurrencyDollar />
                        {job.salary}
                      </div>

                      {/* job time removed - could show job_type if needed */}
                      <div className="flex items-center gap-1">
                        <FiClock />
                        {job.job_type || ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2">
                  <Tag color="blue">{job.job_type}</Tag>
                  <Tag color="purple">{job.category}</Tag>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestJobs;