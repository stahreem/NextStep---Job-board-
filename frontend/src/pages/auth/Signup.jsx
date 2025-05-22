import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Loader, Eye, EyeOff } from "lucide-react";

import Navbar from "@/components/elements/Navbar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading } from "@/redux/authSlice";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, password, role } = input;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      toast.error("All fields are required");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#fff1eb] to-[#ace0f9] flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg md:max-w-lg lg:max-w-xl md:p-8">
        <form onSubmit={handleSubmit} className="w-full">
          <h1 className="mb-5 text-2xl font-bold text-center">Sign Up</h1>

          {/* Name */}
          <div className="mb-4">
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>

          {/* Password + Toggle */}
          <div className="relative mb-4">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute text-gray-500 top-2 right-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Role */}
          <div className="mb-6">
            <Select
              value={input.role}
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

          {/* Submit */}
          <div className="mb-4">
            <Button type="submit" className="w-full bg-[#0e4d62]">
              {loading ? (
                <>
                  <Loader className="mr-2 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-500">
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
