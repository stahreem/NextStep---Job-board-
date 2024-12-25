import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect, useMemo } from "react";
import { setSingleJob } from "@/redux/jobSlice";

function JobCard({ job }) {
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Calculate days ago
  const daysAgo = useMemo(() => {
    const createdAt = new Date(job?.createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }, [job?.createdAt]);

  // Fetch job details when component mounts
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/job/${job?._id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Something went wrong. Please try again later.";
        toast.error(errorMsg);
      }
    };
    fetchSingleJob();
  }, [job, dispatch]);

  // Bookmark handler
  const bookmarkJobHandler = async () => {
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/bookmark/${job?._id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Job bookmarked successfully!");
      } else {
        toast.error(res.data.message || "Bookmark failed. Please try again.");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Something went wrong. Please try again later.";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-6 sm:p-4 mb-5 md:p-5 rounded-lg shadow-md border border-[#b1ebe4] bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out relative">
      <span className="text-xs text-[#1c3230] font-semibold">
        {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
      </span>

      {/* Bookmark Button */}
      <button
        className="absolute z-30 p-1 text-gray-600 bg-gray-100 rounded-full top-3 right-3 hover:bg-gray-200"
        aria-label="Bookmark this job"
        onClick={bookmarkJobHandler}
      >
        <Bookmark className="w-5 h-5" />
      </button>

      {/* Company Info */}
      <div className="flex items-center justify-between mt-[-20px]">
        <div>
          <h1 className="text-lg font-semibold sm:text-base text-primaryAccent">
            {job?.company?.name}
          </h1>
          <p className="text-sm sm:text-xs text-textSecondary">{job?.location}</p>
        </div>
        <Avatar className="w-20 h-20 mr-[-20px] z-20">
          <AvatarImage src={job?.company?.companyLogo} />
        </Avatar>
      </div>

      {/* Job Title and Description */}
      <div className="mt-[-10px]">
        <h2 className="text-xl font-bold sm:text-lg text-textPrimary">{job?.title}</h2>
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
          {job?.position} Positions
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

      {/* View Details Button */}
      <div className="flex justify-start gap-4 mt-10">
        <Button
        
        className=" bg-[#0e4d62] hover:bg-[#093644] text-white px-3 py-1 text-xs sm:text-sm border-primaryAccent "
        onClick={() => navigate(`/job/description/${job?._id}`)}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          
          className="px-3 py-1 text-xs sm:text-sm border-primaryAccent text-primaryAccent"
          // onClick={() => navigate(`/job/description/${job?._id}`)}
        >
          Bookmark
        </Button>
      </div>
    </div>
  );
}

export default JobCard;
