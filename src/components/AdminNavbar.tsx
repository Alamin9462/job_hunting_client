import { Button, Dropdown, Avatar, Badge } from "antd";
import {
  FaBriefcase,
  FaChartBar,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";

const AdminNavbar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const isActive = (path: string) => location.pathname === path;

  const userMenu = {
    items: [
      { key: "profile", label: "Profile" },
      { key: "settings", label: "Settings" },
      { type: "divider" as const },
      {
        key: "logout",
        label: "Logout",
        onClick: () => dispatch(logout()),
      },
    ],
  };

  const navLinkClass = (path: string) =>
    `flex items-center gap-2 text-sm font-medium transition duration-200 pb-1 ${
      isActive(path)
        ? "text-indigo-600 border-b-2 border-indigo-600"
        : "text-gray-600 hover:text-indigo-600"
    }`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-indigo-100 shadow-sm">
      <div className="mx-auto flex justify-between items-center px-4 md:px-20 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold hover:opacity-80 transition"
          >
            <div className="p-2 bg-indigo-100 rounded-xl">
              <FaBriefcase className="text-2xl text-indigo-600" />
            </div>

            <span className="text-indigo-700">QuickHire</span>

            <Badge
              count="ADMIN"
              className="ml-2"
              style={{
                backgroundColor: "#6366f1",
                fontSize: "10px",
                fontWeight: 600,
              }}
            />
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex gap-8">
            <Link to="/admin-dashboard" className={navLinkClass("/admin-dashboard")}>
              <FaChartBar className="text-base" />
              Dashboard
            </Link>

            <Link to="/admin-jobs" className={navLinkClass("/admin-jobs")}>
              <FaFileAlt className="text-base" />
              Jobs
            </Link>

            <Link to="/admin-applications" className={navLinkClass("/admin-applications")}>
              <FaUsers className="text-base" />
              Applications
            </Link>

            <Link to="/admin-settings" className={navLinkClass("/admin-settings")}>
              <FaCog className="text-base" />
              Settings
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <Dropdown menu={userMenu} trigger={["click"]}>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-indigo-50 cursor-pointer transition">
              <Avatar
                size={40}
                icon={<FaUserCircle />}
                className="bg-indigo-600"
              />

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
            </div>
          </Dropdown>

          <Button
            type="text"
            className="lg:hidden text-indigo-600 font-medium"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;