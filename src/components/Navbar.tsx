import { Button } from "antd";
import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";


const Navbar = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => !!state.auth.token);

  return (
    <div className="  border-b top-0 z-50 border-gray-100">
      <div className=" mx-auto flex justify-between items-center  py-5">

        {/* Left Section */}
        <div className="flex items-center gap-12">

          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold  cursor-pointer">
            <FaBriefcase className="text-3xl text-indigo-600" />
            QuickHire
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-gray-600 font-medium">
            <Link
              to="/jobs"
              className="hover:text-indigo-600 text-sm transition duration-200"
            >
              Find Jobs
            </Link>

            <Link
              to="/companies"
              className="hover:text-indigo-600 text-sm transition duration-200"
            >
              Browse Companies
            </Link>
            <Link
              to="/admin"
              className="hover:text-indigo-600 text-sm transition duration-200"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/** show logout if authenticated */}
          {isLogged ? (
            <Button
              type="text"
              className="font-bold text-gray-600 hover:text-indigo-600"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
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
          )}        </div>

      </div>
    </div>
  );
};

export default Navbar;