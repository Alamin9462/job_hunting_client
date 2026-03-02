import { Button, Dropdown, Avatar, Badge } from "antd";
import { FaBriefcase, FaChartBar, FaUsers, FaFileAlt, FaCog } from "react-icons/fa";
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
      {
        key: "profile",
        label: "Profile",
      },
      {
        key: "settings",
        label: "Settings",
      },
      {
        type: "divider" as const,
      },
      {
        key: "logout",
        label: "Logout",
        onClick: () => {
          dispatch(logout());
        },
      },
    ],
  };

  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex justify-between items-center px-4 md:px-25 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold cursor-pointer hover:opacity-80 transition">
            <FaBriefcase className="text-3xl text-red-600" />
            <span className="text-gray-800">QuickHire</span>
            <Badge
              count="Admin"
              style={{ backgroundColor: "#ef4444", fontSize: "10px" }}
              className="ml-2"
            />
          </Link>

          {/* Admin Nav Links */}
          <div className="hidden lg:flex gap-8 text-gray-600 font-medium">
            <Link
              to="/admin-dashboard"
              className={`flex items-center gap-2 text-sm transition duration-200 ${
                isActive("/admin-dashboard")
                  ? "text-red-600 border-b-2 border-red-600"
                  : "hover:text-red-600"
              }`}
            >
              <FaChartBar className="text-lg" />
              Dashboard
            </Link>

            <Link
              to="/admin-dashboard"
              className={`flex items-center gap-2 text-sm transition duration-200 ${
                isActive("/admin-dashboard")
                  ? "text-red-600 border-b-2 border-red-600"
                  : "hover:text-red-600"
              }`}
            >
              <FaFileAlt className="text-lg" />
              Post Jobs
            </Link>

            <Link
              to="/admin-dashboard"
              className={`flex items-center gap-2 text-sm transition duration-200 ${
                isActive("/admin-dashboard")
                  ? "text-red-600 border-b-2 border-red-600"
                  : "hover:text-red-600"
              }`}
            >
              <FaUsers className="text-lg" />
              Applications
            </Link>

            <Link
              to="/admin-dashboard"
              className={`flex items-center gap-2 text-sm transition duration-200 ${
                isActive("/admin-dashboard")
                  ? "text-red-600 border-b-2 border-red-600"
                  : "hover:text-red-600"
              }`}
            >
              <FaCog className="text-lg" />
              Settings
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Dropdown */}
          <Dropdown menu={userMenu} trigger={["click"]}>
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
              <Avatar
                size={40}
                icon={<FaChartBar />}
                style={{ backgroundColor: "#ef4444" }}
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </Dropdown>

          {/* Logout Button Mobile */}
          <Button
            type="text"
            danger
            className="lg:hidden"
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
