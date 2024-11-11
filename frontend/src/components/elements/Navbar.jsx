import { Link } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiMenu, HiX } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector(store =>store.auth)

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
                <Button variant="outline" className="border-[#dddddd] rounded-lg">
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
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="mt-2 mr-3 w-72">
                <div className="p-4">
                  {/* User Info */}
                  <h4 className="text-lg font-semibold">Shifa Tahreem</h4>
                  <p className="mb-3 text-sm">shifatahreem@gmail.com</p>
                  <hr className="my-3 text-[#000]" />

                  {/* Navigation Links */}
                  {/* <div className="gap-2 mb-4 font-medium">
                    <Link to="/" className="block hover:text-[#023b81] cursor-pointer">Home</Link>
                    <Link to="/jobs" className="block hover:text-[#023b81] cursor-pointer">Jobs</Link>
                    <Link to="/browse" className="block hover:text-[#023b81] cursor-pointer">Browse</Link>
                  </div>
                  <hr className="my-3 text-[#000]" /> */}

                  {/* Profile Management Links */}
                  <div className="flex flex-col gap-2 font-medium">
                    <Link to="/studentProfile" className="hover:text-[#023b81] cursor-pointer">Profile</Link>
                    <Link className="hover:text-[#023b81] cursor-pointer">My Application</Link>
                    <Link className="hover:text-[#023b81] cursor-pointer">Edit Resume</Link>
                    <p className="hover:text-[#023b81] cursor-pointer">Log out</p>
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
          <Link to="/" className="text-lg">Home</Link>
          <Link to="/jobs" className="text-lg">Jobs</Link>
          <Link to="/browse" className="text-lg">Browse</Link>
          <div className="flex space-x-2">
            <Link to="/login">
              <Button variant="outline" className="border-[#dddddd] rounded-lg">Log in</Button>
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
