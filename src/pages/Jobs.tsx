import React, { useMemo, useState, useEffect } from "react";
import { Input, Select, Card, Tag } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchJobs, type Job } from "../store/jobSlice";

const { Option } = Select;

const Jobs: React.FC = () => {
  const { jobs } = useAppSelector((state) => state.jobs);
  const dispatch = useAppDispatch();
  const [searchParams] = React.useState(() => new URLSearchParams(window.location.search));
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [category, setCategory] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => j.category && set.add(j.category));
    return Array.from(set);
  }, [jobs]);

  const filtered = useMemo<Job[]>(() => {
    const q = keyword.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const cat = category.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchK =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q);
      const matchL = !loc || j.location.toLowerCase().includes(loc);
      const matchC = !cat || (j.category || "").toLowerCase() === cat;
      return matchK && matchL && matchC;
    });
  }, [jobs, keyword, location, category]);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="px-4 md:px-[124px] py-8">
      <h2 className="text-3xl font-bold mb-6">Job Listings</h2>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Input
          placeholder="Keyword (title or company)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Select
          allowClear
          placeholder="Category"
          value={category || undefined}
          onChange={(val) => setCategory(val || "")}
          className="min-w-[200px]"
        >
          {categories.map((c) => (
            <Option key={c} value={c}>
              {c}
            </Option>
          ))}
        </Select>
      </div>

      {/* Job Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((job) => (
          <Card
            key={job._id || job.id}
            className="rounded-2xl border border-gray-100 hover:shadow-xl transition duration-300"
          >
            <Link to={`/jobs/${job._id || job.id}`} className="block">
              <div className="flex justify-between items-start gap-6">
                <div className="flex gap-4">
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="h-12 w-12 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {job.location}
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <BsCurrencyDollar />
                          {job.salary}
                        </div>
                      )}
                      {job.time && (
                        <div className="flex items-center gap-1">
                          <FiClock />
                          {job.time}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {job.type && <Tag color="blue">{job.type}</Tag>}
                  {job.category && <Tag color="purple">{job.category}</Tag>}
                </div>
              </div>
            </Link>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No jobs match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
