import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
//import Navbar from "../components/Navbar";


const MainLayout = () => {
    return (
        <div className="w-[1440px] h-[994px] mx-auto">
          {/* //  <Navbar/> */}
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;