import { Button, Dropdown, Avatar, type MenuProps } from "antd";
import { FaBriefcase, FaBell, FaBookmark, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";

const UserNavbar = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => !!state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const userMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      onClick: () => {
        // navigate to profile
      },
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => {
        dispatch(logout());
      },
    },
  ];

  return (
    <div className="border-b border-gray-100 sticky top-0 z-50 bg-[#f9f8fd]">
      <div className="mx-auto flex justify-between items-center px-4 md:px-31 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold cursor-pointer hover:opacity-80 transition">
            <FaBriefcase className="text-3xl text-indigo-600" />
            <span>QuickHire</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-gray-600 font-medium">
            <Link
              to="/jobs"
              className={`text-sm transition duration-200 ${
                isActive("/jobs")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "hover:text-indigo-600"
              }`}
            >
              Find Jobs
            </Link>

            <Link
              to="/companies"
              className={`text-sm transition duration-200 ${
                isActive("/companies")
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "hover:text-indigo-600"
              }`}
            >
              Browse Companies
            </Link>


          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isLogged ? (
            <>
              {/* Notification Bell */}
              <Button
                type="text"
                icon={<FaBell className="text-lg text-gray-600" />}
                className="hidden sm:block hover:text-indigo-600 transition"
              />

              {/* Bookmark Button */}
              <Button
                type="text"
                icon={<FaBookmark className="text-lg text-gray-600" />}
                className="hidden sm:block hover:text-indigo-600 transition"
              />

              {/* User Dropdown */}
              <Dropdown menu={{ items: userMenu }} trigger={["click"]}>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  <Avatar
                    size={36}
                    icon={<FaUser />}
                    style={{ backgroundColor: "#4f46e5" }}
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name || "User"}
                    </p>
                  </div>
                </div>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button
                  type="text"
                  className="font-bold text-gray-600 hover:text-indigo-600"
                >
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  type="primary"
                  className="rounded-lg px-6 shadow-md"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
