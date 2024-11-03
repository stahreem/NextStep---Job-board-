import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const user = false;

  return (
    <nav className="top-0 w-full p-4 bg-white ">
      <div className="flex items-center justify-between h-8 mx-auto max-w-7xl">
        {/* Left side */}
        <div>
          <Link to="/" className="text-xl font-bold text-gray-900">
            Next<span className="text-[#0dbfb3]">Step</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-8 pr-10">
          <ul className="flex items-center gap-5 font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
          {!user ? (
            <div className="space-x-2">
              <Link to="/login">
                <Button variant="outline" className="border-[#dddddd] rounded-lg">Log in</Button>
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
                <div>
                  <h4 className="text-lg font-semibold">Shifa Tahreem</h4>
                  <p className="text-sm">shifatahreem@gmail.com</p>
                  <hr className="my-3 text-[#000]" />
                  <div className="gap-2 font-medium">
                    <p className="hover:text-[#023b81] cursor-pointer">Profile</p>
                    <p className="hover:text-[#023b81] cursor-pointer">My Application</p>
                    <p className="hover:text-[#023b81] cursor-pointer">Edit Resume</p>
                    <p className="hover:text-[#023b81] cursor-pointer">Log out</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
