import { Input, Button } from "antd";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import Image from "../assets/slider.png";
import Navbar from "./Navbar";
import React from "react";

interface BannerProps {
  onSearch?: (keyword: string, location: string) => void;
}

const HeroSection: React.FC<BannerProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = React.useState("");
  const [loc, setLoc] = React.useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(keyword, loc);
  };

  return (
    <div className=" px-[124px] bg-[#f9f8fd]">
      <Navbar />
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Discover <br /> more than <br />
            <span className="text-indigo-600 font-extrabold">5000+ Jobs</span>
          </h1>

          <p className="mt-4 line-clamp-2 text-gray-500">
            Great platform for the job seeker that searching for <br /> new career heights and passionate about startups.
          </p>

          {/* Search Box */}
          <div className="flex gap-2 mt-8 bg-white p-5 rounded-lg shadow-md">
            <Input
              prefix={<FaSearch />}
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Input
              prefix={<FaMapMarkerAlt />}
              placeholder="Location"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />
            <Button type="primary" onClick={handleSearch}>
              Search my job
            </Button>
          </div>
          <p className="text-sm text-gray-500 py-2">Popular design: UI design, UX design, Frontend development</p>
        </div>

        {/* Right Image */}
      <div className="relative flex justify-center items-center">

  {/* Big Back Rectangle */}
  <div className="absolute w-[380px] h-[300px] border-2 border-indigo-300 rounded-2xl rotate-12"></div>

  {/* Second Rectangle */}
  <div className="absolute w-[340px] h-[260px] border-1 border-indigo-200 rounded-2xl -rotate-6"></div>

  {/* Small Accent Rectangle Top */}
  <div className="absolute w-[120px] h-[80px] bg-indigo-100 rounded-lg top-6 right-12 rotate-12 opacity-70"></div>

  {/* Small Accent Rectangle Bottom */}
  <div className="absolute w-[100px] h-[60px] bg-purple-100 rounded-lg bottom-6 left-10 -rotate-12 opacity-70"></div>

  {/* Soft Gradient Glow */}
  <div className="absolute w-[300px] h-[300px] bg-indigo-400/10 blur-3xl rounded-full"></div>

  {/* Image */}
  <img
    src={Image}
    alt="hero"
    className="relative w-full max-w-sm z-10"
  />
</div>
      </div>
    </div>
  );
};

export default HeroSection;
