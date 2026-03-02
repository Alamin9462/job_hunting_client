import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Footer from "../components/Footer";
import UserNavbar from "../components/UserNavbar";
import AdminNavbar from "../components/AdminNavbar";

const MainLayout = () => {
  const role = useAppSelector((state) => state.auth.role);

  return (
    <div className="lg:w-[1440px] sm:w-full mx-auto flex flex-col">
      {/* Render appropriate navbar based on role */}
      {role === "admin" ? <AdminNavbar /> : <UserNavbar />}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;