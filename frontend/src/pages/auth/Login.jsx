/* eslint-disable no-unused-vars */
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
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { store } from "@/redux/store";
import { Loader } from "lucide-react";


function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user,  loading} = useSelector(store => store.auth )
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
  dispatch(setLoading(true))
    const { email, password, role } = input;
  
    if (!email || !password || !role) {
      setError("All fields are required");
      return;
    }
  
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      dispatch(setUser(res.data.user))
      navigate("/dashboard");
      if (res.data.success) {
        toast.success(res.data.message || "Login successful!");
      } else {
        toast.error(res.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle specific error from backend if present
      const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    } finally{
      dispatch(setLoading(false))
    }
  };
  
useEffect(() => {
  if(user){
    navigate("/dashboard")
  }
},[]) 

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#fff1eb] to-[#ace0f9] flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 bg-[#f7f7f7] rounded-lg shadow-lg p-6 md:p-8 lg:p-10 flex justify-center items-center">
        <form className="w-full" onSubmit={submitHandler}>
          <h1 className="mb-5 text-xl font-bold text-center md:text-2xl lg:text-3xl">
            Log in
          </h1>

          {/* Error Message */}
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="john@mail.com"
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
              id="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              className="w-full focus:ring-0 focus:outline-none"
            />
          </div>

          {/* Select User Type */}
          <div className="mb-6">
            <Select
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, role: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="recruiter">Recruiter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Log in Button */}
          <div className="flex justify-center mb-4">
            {
              loading ? <Button className="w-full max-w-xs bg-[#0e4d62]">
                 <Loader className=" animate-spin"/> Please Wait...
                  </Button> :
            <Button type="submit" className="w-full max-w-xs bg-[#0e4d62]">
              Log in
            </Button>
            }
          </div>

          {/* Signup Link */}
          <p className="text-xs text-center text-slate-400 md:text-base">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#0dbfb3] hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
