/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/Constant";
import { toast } from "sonner";
import { useState } from "react";

function JobCard({ job }) {
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  //  days calculate
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const dispatch = useDispatch();
  const jobID = job?._id;

  // Check if the user has already applied
  const isInitiallyApplied =
    singleJob?.application?.some((app) => app.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // Apply for a job handler
  const applyJobHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobID}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        // const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
        // dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(
          res.data.message || "Application submitted successfully!"
        );
      } else {
        toast.error(
          res.data.message || "Application failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-6 sm:p-4 mb-5 md:p-5 rounded-lg shadow-md border border-[#b1ebe4] bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out relative">
      <span className="text-xs text-[#1c3230] font-semibold">
        {" "}
        {daysAgoFunction(job?.createdAt) === 0
          ? "Today"
          : `${daysAgoFunction(job?.createdAt)} days ago`}
      </span>
      {/* Bookmark Button in Top-Right Corner */}
      <button
        className="absolute z-30 p-1 text-gray-600 bg-gray-100 rounded-full top-3 right-3 hover:bg-gray-200"
        aria-label="Bookmark"
      >
        <Bookmark className="w-5 h-5" />
      </button>

      {/* Company Info: Name and Logo */}
      <div className="flex items-center justify-between mt-[-20px]">
        <div>
          <h1 className="text-lg font-semibold sm:text-base text-primaryAccent">
            {job?.company?.name}
          </h1>
          <p className="text-sm sm:text-xs text-textSecondary">
            {job?.location}
          </p>
        </div>
        <Avatar className="w-20 h-20 mr-[-20px] z-20">
          {/* Company logo on the right side of the name */}
          <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.9kLadk-ff48v9vs0zQL12QHaE7&pid=Api&P=0&h=180" />
        </Avatar>
      </div>

      {/* Job Title and Description */}
      <div className="mt-[-10px]">
        <h2 className="text-xl font-bold sm:text-lg text-textPrimary">
          {job?.title}
        </h2>
        <p className="mt-1 text-sm sm:text-xs text-textSecondary">
          {job?.description.slice(0, 100)}...
        </p>
      </div>

      {/* Job Details Badges */}
      <div className="flex items-center gap-2 mt-4 overflow-x-hidden whitespace-nowrap">
        <Badge
          variant="outline"
          className="text-xs sm:text-xs md:text-sm border-primaryAccent text-primaryAccent"
        >
          {job?.position}
          {/* Positions */}
        </Badge>
        <Badge
          variant="secondary"
          style={{ backgroundColor: "#0dbfb3", color: "#ffffff" }}
          className="text-xs sm:text-xs md:text-sm"
        >
          {job?.salary} LPA
        </Badge>
        <Badge
          style={{ backgroundColor: "#ff7878", color: "#ffffff" }}
          className="text-xs sm:text-xs md:text-sm"
        >
          {job?.jobType}
        </Badge>
      </div>

      {/* Upload Time and Action Buttons */}
      <div className="flex justify-start gap-4 mt-10">
        <Button
          variant="outline"
          className="px-3 py-1 text-xs sm:text-sm border-primaryAccent text-primaryAccent"
          onClick={() => navigate(`/job/description/${job?._id}`)}
        >
          Details
        </Button>
        {/* Apply Button */}
        <div>
          {user?.role === "student" && (
            <Button
              onClick={setIsApplied ? null : applyJobHandler}
              disabled={setIsApplied}
              className={`px-4 py-2 font-semibold rounded-md transition ${
                setIsApplied
                  ? "bg-gray-400 cursor-not-allowed text-gray-100"
                  : "bg-[#0e4d62] hover:bg-[#093644] text-slate-100"
              }`}
            >
              {setIsApplied ? "Already Applied" : "Apply Now"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
