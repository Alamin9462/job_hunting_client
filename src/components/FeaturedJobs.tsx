import React from "react";
import { Card, Tag } from "antd";
import { FaMapMarkerAlt, FaBookmark } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchJobs } from "../store/jobSlice";

const FeaturedJobs = () => {
  const { jobs } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();
  // pick a few jobs for featured sake
  const featured = jobs.slice(0, 4);

  React.useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs());
    }
  }, [jobs.length, dispatch]);
  return (
    <div className="px-4 md:px-[124px] bg-white py-8">
      <div className="mx-auto">

        {/* Section Title */}
        <h2 className="text-4xl font-extrabold mb-12">
          Featured{" "}
          <span className="text-indigo-600">Jobs</span>
        </h2>

        {/* Job Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((job, index) => (
            <Card
              key={index}
              className="rounded-2xl border border-gray-100 hover:shadow-xl transition duration-300 relative"
            >
              {/* Bookmark Icon */}
              <FaBookmark className="absolute top-5 right-5 text-gray-300 hover:text-indigo-600 cursor-pointer transition" />

              {/* Company Logo */}
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={job.company_logo || ""}
                  alt={job.company}
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-lg">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {job.company}
                  </p>
                </div>
              </div>

              {/* Location + Salary */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {job.location}
                </div>

                <div className="flex items-center gap-1">
                  <BsCurrencyDollar />
                  {job.salary}
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <Tag color="blue">{job.job_type}</Tag>
                <Tag color="green">{job.category}</Tag>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturedJobs;