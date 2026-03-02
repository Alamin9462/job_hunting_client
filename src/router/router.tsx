import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";

// // Layouts
// import MainLayout from "../layouts/MainLayout";
// import DashboardLayout from "../layouts/DashboardLayout";
// import AdminLayout from "../layouts/AdminLayout";

// // Public Pages
// import Home from "../pages/Home";
// import Jobs from "../pages/Jobs";
// import JobDetails from "../pages/JobDetails";
// import Companies from "../pages/Companies";
// import Login from "../pages/Login";
// import Register from "../pages/Register";

// // User Dashboard Pages
// import MyApplications from "../pages/dashboard/MyApplications";

// // Admin Pages
// import AdminDashboard from "../pages/admin/AdminDashboard";
// import ManageUsers from "../pages/admin/ManageUsers";
// import ManageJobs from "../pages/admin/ManageJobs";
// import PostJob from "../pages/admin/PostJob";

// Protected Routes
// import ProtectedRoute from "./ProtectedRoute";
// import AdminProtectedRoute from "./AdminProtectedRoute";

const router = createBrowserRouter([

  // 🌍 Public Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "jobs/:id",
        element: <JobDetails />,
      },
      {
        path: "companies",
        //element: <Companies />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      }
    ],
  },


//   //  Authentication
//   {
//     path: "/login",
//    // element: <Login />,
//   },
//   {
//     path: "/register",
//    // element: <Register />,
//   },


//   // User Dashboard (Protected)

//   {
//     path: "/dashboard",
//    // element: (
//      // <ProtectedRoute>
//       //  <DashboardLayout />
//      // </ProtectedRoute>
//    // )

//     children: [
//       {
//         index: true,
//        // element: <UserDashboard />,
//       },
//       {
//         path: "applications",
//        // element: <MyApplications />,
//       },
    
//     ],
//   },

//   //  Admin Panel
//   {
//     path: "/admin",
//     element: (
//      // <AdminProtectedRoute>
//      //   <AdminLayout />
//      // </AdminProtectedRoute>
//     ),
//     children: [
//       {
//         index: true,
//        // element: <AdminDashboard />,
//       },
//       {
//         path: "manage-users",
//        // element: <ManageUsers />,
//       },
//       {
//         path: "manage-jobs",
//        // element: <ManageJobs />,
//       },
//       {
//         path: "post-job",
//        // element: <PostJob />,
//       },
//     ],
//   },
]);

export default router;