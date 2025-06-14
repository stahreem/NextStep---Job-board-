/* eslint-disable react/prop-types */
// import React from 'react'
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function LatestJobCards({ job }) {
  const navigate = useNavigate();
  return (
    <div className="p-6 sm:p-4 md:p-5 rounded-lg shadow-md border border-[#b1ebe4] bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {/* Company and Location */}
      <div
        className="mb-3"
        onClick={() => navigate(`/job/description/${job._id}`)}
      >
        <h1 className="text-lg font-semibold sm:text-base text-primaryAccent">
          {job?.company?.name}
        </h1>
        <p className="text-sm sm:text-xs text-textSecondary">{job?.location}</p>
      </div>
      {/* Job Title and Description */}
      <div className="mb-4">
        <h2 className="text-xl font-bold sm:text-lg text-textPrimary">
          {job?.title}
        </h2>
        <p className="mt-1 text-sm sm:text-xs text-textSecondary">
          {job?.description.slice(0, 100)}...
        </p>
      </div>

      {/* Job Details Badges */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge
          // variant="outline"
          style={{ backgroundColor: "#4b5560", color: "#ffffff" }}
          className="text-xs sm:text-xs md:text-sm border-primaryAccent text-primaryAccent"
        >
          {job?.position} Position
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
          {job?.jobType.toUpperCase()}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
