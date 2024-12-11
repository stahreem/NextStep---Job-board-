import { Link } from "react-router-dom";
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { HiMenu, HiX } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/Constant";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      console.log(res);

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/dashboard");
        toast.success(res.data.message || "Logout successfully!");
      } else {
        toast.error(res.data.message || "Failed to Logout.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Update failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <nav className="top-0 w-full p-4 bg-white shadow-md">
      <div className="flex items-center justify-between h-12 mx-auto max-w-7xl">
        {/* Left side - Brand */}
        <div>
          <Link to="/dashboard" className="text-xl font-bold text-gray-900">
            Next<span className="text-[#0dbfb3]">Step</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 pr-4">
          {/* Desktop Links */}
          <ul className="items-center hidden gap-6 font-medium md:flex">
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {/* Authentication Buttons or Profile */}
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
            <Popover>
              <PopoverTrigger>
                <MoreVertical />
              </PopoverTrigger>
              <PopoverContent className="mt-2 mr-3 w-72">
                <div className="p-4">
                  {/* User Info */}
                  <h4 className="text-lg font-semibold">{user?.fullName}</h4>
                  <p className="mb-3 text-sm">{user?.email}</p>
                  <hr className="my-3 text-[#000]" />

                  {/* Profile Management Links */}
                  <div className="flex flex-col gap-2 font-medium">
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
                      My Application
                    </Link>
                    <p
                      onClick={handleLogout}
                      className="hover:text-[#023b81] cursor-pointer"
                    >
                      Log out
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Hamburger Menu for Small Screens */}
          {!user && (
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? (
                  <HiX className="text-2xl text-gray-900" />
                ) : (
                  <HiMenu className="text-2xl text-gray-900" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && user && (
        <div className="flex flex-col items-center p-4 space-y-4 bg-white shadow-md md:hidden">
          <Link to="/" className="text-lg">
            Home
          </Link>
          <Link to="/jobs" className="text-lg">
            Jobs
          </Link>
          <Link to="/browse" className="text-lg">
            Browse
          </Link>
          <div className="flex space-x-2">
            <Link to="/login">
              <Button variant="outline" className="border-[#dddddd] rounded-lg">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#0e4d62]">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
