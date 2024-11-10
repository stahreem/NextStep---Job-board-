import Navbar from "@/components/elements/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
// eslint-disable-next-line no-unused-vars
import { store } from "@/redux/store";
import { Loader } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  // const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading} = useSelector(store => store.auth )

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
    const { fullName, email, phoneNumber, password, role } = input;

    // Basic validation
    if (!fullName || !email || !phoneNumber || !password || !role) {
      toast.error("All fields are required");
      return;
    }

      // console.log(input);
      
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json", 
          },
          withCredentials: true,
        }
      );

      // Check if registration was successful
      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        navigate("/login");
      } else {
        // Handle case where success is false
        toast.error(res.data.message || "Registration failed. Please try again.")
      }
    } catch (err) {
      // setError("Failed to submit the form. Please try again.");
      const errorMsg = err.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(errorMsg);
      // console.error("Error:", err.response?.data || err.message);

    } finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#fff1eb] to-[#ace0f9] flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 bg-[#f7f7f7] rounded-lg shadow-lg p-6 md:p-8 lg:p-10 flex justify-center items-center">
        <form className="w-full" onSubmit={submitHandler}>
          <h1 className="mb-5 text-xl font-bold text-center md:text-2xl lg:text-3xl">
            Sign Up
          </h1>

          {/* Error Message
          {error && <p className="mb-4 text-center text-red-500">{error}</p>} */}

          {/* Name */}
          <div className="mb-4">
            <Label htmlFor="name" className="sr-only">
              Name
            </Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="John"
              className="w-full focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="john@mail.com"
              className="w-full focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <Label htmlFor="phone" className="sr-only">
              Phone
            </Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="9876543210"
              className="w-full focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Select User Type */}
          <div className="mb-6">
            <Select onValueChange={(value) => setInput((prev) => ({ ...prev, role: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="recruiter">Recruiter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sign Up Button */}
          <div className="flex justify-center mb-4">
       {   loading ? <Button className="w-full max-w-xs bg-[#0e4d62]"> <Loader className=" animate-spin"/>Please Wait </Button> :
            <Button type="submit" className="w-full max-w-xs bg-[#0e4d62]">
              Sign Up
            </Button>
}
          </div>

          {/* Login Link */}
          <p className="text-xs text-center text-slate-400 md:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0dbfb3] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;
