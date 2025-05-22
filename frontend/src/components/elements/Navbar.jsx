import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/Constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/dashboard");
        toast.success(res.data.message || "Logout successfully!");
      } else {
        toast.error(res.data.message || "Failed to Logout.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Logout failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <nav className="top-0 w-full p-4 bg-white shadow-md">
      <div className="flex items-center justify-between h-12 mx-auto max-w-7xl">
        {/* Brand */}
        <div>
          <Link to="/dashboard" className="text-xl font-bold text-gray-900">
            Next<span className="text-[#0dbfb3]">Step</span>
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 pr-4">
          {/* Large screen links */}
          {user && (
            <ul className="items-center hidden gap-6 font-medium md:flex">
              {user.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/company" className="hover:text-[#023b81]">
                      Company
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs" className="hover:text-[#023b81]">
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/dashboard" className="hover:text-[#023b81]">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/jobs" className="hover:text-[#023b81]">
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/browse" className="hover:text-[#023b81]">
                      Browse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}

          {/* Logged out state */}
          {!user ? (
            <div className="hidden space-x-2 md:flex">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#dddddd] rounded-lg"
                >
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#0e4d62]">Sign Up</Button>
              </Link>
            </div>
          ) : (
            // Large screen popover
            <div className="hidden md:block">
              <Popover>
                <PopoverTrigger>
                  <MoreVertical className="text-2xl text-gray-900 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="mt-2 mr-3 bg-white rounded-lg shadow-lg w-72">
                  <div className="p-4">
                    <h4 className="text-lg font-semibold">{user?.fullName}</h4>
                    <p className="mb-3 text-sm">{user?.email}</p>
                    <hr className="my-3 text-gray-300" />
                    <div className="flex flex-col gap-2 font-medium">
                      {user.role !== "recruiter" && (
                        <>
                          <Link
                            to="/student/profile"
                            className="hover:text-[#023b81] cursor-pointer"
                          >
                            Profile
                          </Link>
                          <Link
                            to="/student/application"
                            className="hover:text-[#023b81] cursor-pointer"
                          >
                            Applications
                          </Link>
                          <Link
                            to="/student/bookmark"
                            className="hover:text-[#023b81] cursor-pointer"
                          >
                            Bookmarked
                          </Link>
                          <Link
                            to="/student/recommendations"
                            className="hover:text-[#023b81] cursor-pointer"
                          >
                            Recommendations
                          </Link>
                        </>
                      )}
                      <p
                        onClick={handleLogout}
                        className="cursor-pointer hover:text-[#023b81]"
                      >
                        Logout
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Small screen popover */}
          <div className="block md:hidden">
            <Popover>
              <PopoverTrigger>
                <MoreVertical className="text-2xl text-gray-900 cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-64 mt-2 mr-3 bg-white rounded-lg shadow-lg">
                <div className="p-4">
                  {user ? (
                    <>
                      <h4 className="text-lg font-semibold">
                        {user?.fullName}
                      </h4>
                      <p className="mb-3 text-sm">{user?.email}</p>
                      <hr className="my-3 text-gray-300" />
                      <div className="flex flex-col gap-2 font-medium">
                        {user.role === "recruiter" ? (
                          <>
                            <Link
                              to="/admin/company"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Company
                            </Link>
                            <Link
                              to="/admin/jobs"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Jobs
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/dashboard"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Home
                            </Link>
                            <Link
                              to="/jobs"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Jobs
                            </Link>
                            <Link
                              to="/browse"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Browse
                            </Link>
                            <Link
                              to="/student/profile"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Profile
                            </Link>
                            <Link
                              to="/student/application"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Applications
                            </Link>
                            <Link
                              to="/student/bookmark"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Bookmarked
                            </Link>
                            <Link
                              to="/student/recommendations"
                              className="hover:text-[#023b81] cursor-pointer"
                            >
                              Recommendations
                            </Link>
                          </>
                        )}
                        <p
                          onClick={handleLogout}
                          className="cursor-pointer hover:text-[#023b81]"
                        >
                          Logout
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link to="/login">
                        <Button
                          variant="outline"
                          className="border-[#dddddd] rounded-lg w-full"
                        >
                          Log in
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="bg-[#0e4d62] w-full">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
