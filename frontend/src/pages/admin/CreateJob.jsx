import Navbar from "@/components/elements/Navbar";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { store } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/Constant";
import { toast } from "sonner";

function CreateJob() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { loading } = useSelector((store) => store.auth);
  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    experienceLevel: "",
    location: "",
    jobType: "",
    position: "",
    companyID: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${JOB_API_END_POINT}/post`,input, {
      headers: { "Content-Type": "application/json" },
        withCredentials:true,
      } )
      if (res.data.success) {
        toast.success(res.data.message || "Post Created successfully!");
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Failed to update company.");
      }
    } catch (err) {
        const errorMsg =
        err.response?.data?.message || "Update failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
    console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-lg shadow-md">
        <div className="relative flex items-center mb-6">
          {/* Left Arrow */}
          <ArrowLeft
            className="absolute left-0 h-6 w-6 text-gray-700 hover:text-teal-500 cursor-pointer"
            onClick={() => navigate("/admin/jobs")}
          />

          {/* Centered Title */}
          <h1 className="flex-grow text-2xl font-bold text-center text-[#0e4d62]">
            Create Job
          </h1>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Title */}
          <div className="grid grid-flow-col gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter job title"
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
              />
            </div>
            {/* Company ID */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <Select
                value={input.companyID}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, companyID: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies && companies.length > 0 ? (
                    companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled value="">
                      No companies available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Enter job description"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62] resize-none"
              rows={4}
            />
          </div>
          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              placeholder="Enter job requirements"
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62] resize-none"
              rows={4}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Enter salary in LPA"
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
              />
            </div>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter job location"
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Enter job position"
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
              />
            </div>
          </div>
          <div className="grid grid-flow-col gap-3">
            {/* Experience Level */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <Select
                value={input.experienceLevel}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, experienceLevel: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresher">Fresher(0-1)</SelectItem>
                  <SelectItem value="intermediate">Intermediate(2-5)</SelectItem>
                  <SelectItem value="senior">senior(6-10)</SelectItem>
                  <SelectItem value="superSenior">Super Senior(12+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>

              <Select
                value={input.jobType}
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, jobType: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onSite">On Site</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            {loading ? (
              <Button className="w-full max-w-xs bg-[#0e4d62] hover:bg-[#093647] transition-all">
                <Loader className=" animate-spin" /> Please Wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full max-w-xs bg-[#0e4d62]">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
