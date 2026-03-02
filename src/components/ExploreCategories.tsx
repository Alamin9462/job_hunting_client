import { Card } from "antd";
import { FaBullhorn, FaLaptopCode, FaChartBar } from "react-icons/fa";

const categories = [
  { title: "Technology", jobs: 436, icon: <FaLaptopCode /> },
  { title: "Marketing", jobs: 140, icon: <FaBullhorn /> },
  { title: "Technology", jobs: 436, icon: <FaLaptopCode /> },
  { title: "Sales", jobs: 756, icon: <FaChartBar /> },
  { title: "Technology", jobs: 436, icon: <FaLaptopCode /> },
  { title: "Sales", jobs: 756, icon: <FaChartBar /> },
];

const CategorySection = () => {
  return (
    <div className="px-4 md:px-[124px] bg-white py-8">
      <h2 className="text-3xl font-extrabold mb-10">
        Explore by{" "}
        <span className="text-indigo-600 font-extrabold">Category</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <Card key={i} className="hover:shadow-lg transition rounded-xl">
            <div className="text-3xl text-indigo-600 mb-4">{cat.icon}</div>
            <h3 className="text-lg font-semibold">{cat.title}</h3>
            <p className="text-gray-400">{cat.jobs} jobs available</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
