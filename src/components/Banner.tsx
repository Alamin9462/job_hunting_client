import { Input, Button } from "antd";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import Image from "../assets/slider.png";
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
    <div className="px-4 sm:px-6 md:px-16 lg:px-[124px] bg-[#f9f8fd] py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight text-center md:text-left">
            Discover <br className="hidden sm:block" />
            more than <br className="hidden sm:block" />
            <span className="text-indigo-600">5000+ Jobs</span>
          </h1>

          <p className="mt-4 text-gray-500 text-sm sm:text-base text-center md:text-left">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search Box */}
          <div className="flex flex-col md:flex-row gap-4 mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-md w-full">
            
            <Input
              className="w-full md:flex-1"
              size="large"
              prefix={<FaSearch />}
              placeholder="Job title or keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <Input
              className="w-full md:flex-1"
              size="large"
              prefix={<FaMapMarkerAlt />}
              placeholder="Location"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
            />

            <Button
              type="primary"
              size="large"
              className="w-full md:w-auto"
              onClick={handleSearch}
            >
              Search my job
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-3 text-center md:text-left">
            Popular design: UI design, UX design, Frontend development
          </p>
        </div>

        {/* Right Image Section */}
        <div className="relative flex justify-center items-center mt-10 md:mt-0">
          
          {/* Decorative Elements - Hidden on Mobile */}
          <div className="hidden sm:block absolute sm:w-[250px] sm:h-[200px] md:w-[380px] md:h-[300px] border-2 border-indigo-300 rounded-2xl rotate-12"></div>

          <div className="hidden sm:block absolute sm:w-[220px] sm:h-[170px] md:w-[340px] md:h-[260px] border border-indigo-200 rounded-2xl -rotate-6"></div>

          <div className="hidden sm:block absolute sm:w-[80px] sm:h-[50px] md:w-[120px] md:h-[80px] bg-indigo-100 rounded-lg top-4 right-6 md:top-6 md:right-12 rotate-12 opacity-70"></div>

          <div className="hidden sm:block absolute sm:w-[70px] sm:h-[40px] md:w-[100px] md:h-[60px] bg-purple-100 rounded-lg bottom-4 left-6 md:bottom-6 md:left-10 -rotate-12 opacity-70"></div>

          <div className="hidden sm:block absolute sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] bg-indigo-400/10 blur-3xl rounded-full"></div>

          {/* Image */}
          <img
            src={Image}
            alt="hero"
            className="relative 
              w-[220px] sm:w-[280px] md:w-[350px] lg:w-[420px]
              h-auto
              z-10"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;