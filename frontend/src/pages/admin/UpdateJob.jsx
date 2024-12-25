import Navbar from "@/components/elements/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";
import {  JOB_API_END_POINT } from "@/utils/Constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader } from "lucide-react";
import { setLoading } from "@/redux/authSlice";
import useGetJobById from "@/hooks/useGetJobById";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


function UpdateJob() {
    const params = useParams();
    useGetJobById (params.id);
  const { singleJob } = useSelector((store) => store.job);
  const [input, setInput] = useState({
    title:"",
      description:"",
      requirements:"",
      salary:"",
      experienceLevel:"",
      location:"",
      jobType:"",
      position:"",
      companyID:"",
  });
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (singleJob) {
      setInput({
        title:singleJob.title ||"",
      description:singleJob.description || "",
      requirements:singleJob.requirements || "",
      salary: singleJob.salary || "",
      experienceLevel:singleJob.experienceLevel || "",
      location:singleJob.location || "",
      jobType:singleJob.jobType || "",
      position:singleJob.position || "",
      });
    }
  }, [singleJob,  params.id]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await axios.post(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res);
      
      if (res.data.success) {
        toast.success(res.data.message || "Job Post updated successfully!");
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
  };

  return (
    <div>
    <Navbar />
    <div className="max-w-3xl p-8 mx-auto my-10 bg-white rounded-lg shadow-md">
      <div className="relative flex items-center mb-6">
        {/* Left Arrow */}
        <ArrowLeft
          className="absolute left-0 w-6 h-6 text-gray-700 cursor-pointer hover:text-teal-500"
          onClick={() => navigate("/admin/jobs")}
        />

        {/* Centered Title */}
        <h1 className="flex-grow text-2xl font-bold text-center text-[#0e4d62]">
         Update Job Post 
        </h1>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* Title */}
        <div className="grid grid-flow-col gap-3">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
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
         
        </div>
        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
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
          <label className="block mb-1 text-sm font-medium text-gray-700">
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
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
            <label className="block mb-1 text-sm font-medium text-gray-700">
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

export default UpdateJob;

