import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Navbar from './components/elements/Navbar'
import Dashboard from "./pages/student/Dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import FrontPage from "./pages/student/FrontPage";
import Jobs from "./pages/student/Jobs";
import Browse from "./pages/student/Browse";
import StudentProfile from "./pages/student/StudentProfile";
import AppliedJob from "./pages/student/AppliedJob";
import JobDescription from "./pages/student/JobDescription";
import EditStudentProfile from "./pages/student/EditStudentProfile";
import AdminCompany from "./pages/admin/AdminCompany";
import CreateCompany from "./pages/admin/CreateCompany";
import UpdateCompany from "./pages/admin/UpdateCompany";
import CompanyDetails from "./pages/admin/CompanyDetails";
import AdminJobs from "./pages/admin/AdminJobs";
import CreateJob from "./pages/admin/CreateJob";
import JobDetails from "./pages/admin/JobDetails";
import Applicants from "./pages/admin/Applicants";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import UpdateJob from "./pages/admin/UpdateJob";
import BookMark from "./pages/student/BookMark";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/student/profile",
    element: <StudentProfile />,
  },
  {
    path: "/student/profile/edit",
    element: <EditStudentProfile />,
  },
  {
    path: "/student/application",
    element: <AppliedJob />,
  },
  {
    path: "/job/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/student/bookmark/",
    element: <BookMark />,
  },
  // admin
  {
    path: "/admin/company",
    element: (
      <ProtectedRoute>
        <AdminCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/company/create",
    element: (
      <ProtectedRoute>
        <CreateCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/company/:id",
    element: (
      <ProtectedRoute>
        <UpdateCompany />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/company/details",
    element: (
      <ProtectedRoute>
        <CompanyDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/post",
    element: (
      <ProtectedRoute>
        <CreateJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/post/update/:id",
    element: (
      <ProtectedRoute>
        <UpdateJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/details",
    element: (
      <ProtectedRoute>
        <JobDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div className="h-screen bg-gradient-to-br from-[#fff1eb] to-[#ace0f9] bg-fixed flex flex-col">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
