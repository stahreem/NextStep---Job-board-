// import React from 'react'
import { Badge } from "@/components/ui/badge";

function LatestJobCards() {
  return (
    <div className="p-6 sm:p-4 md:p-5 rounded-lg shadow-md border border-[#b1ebe4] bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out">
      {/* Company and Location */}
      <div className="mb-3">
        <h1 className="text-lg font-semibold sm:text-base text-primaryAccent">Company Name</h1>
        <p className="text-sm sm:text-xs text-textSecondary">India</p>
      </div>

      {/* Job Title and Description */}
      <div className="mb-4">
        <h2 className="text-xl font-bold sm:text-lg text-textPrimary">Job Title</h2>
        <p className="mt-1 text-sm sm:text-xs text-textSecondary">
          Some brief description about the job role, key responsibilities, or highlights.
        </p>
      </div>

      {/* Job Details Badges */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Badge variant="outline" className="text-xs sm:text-xs md:text-sm border-primaryAccent text-primaryAccent">
          10 Positions
        </Badge>
        <Badge
          variant="secondary"
          style={{ backgroundColor: '#0dbfb3', color: '#ffffff' }}
          className="text-xs sm:text-xs md:text-sm"
        >
          14 LPA
        </Badge>
        <Badge
          style={{ backgroundColor: '#ff7878', color: '#ffffff' }}
          className="text-xs sm:text-xs md:text-sm"
        >
          Part Time
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
