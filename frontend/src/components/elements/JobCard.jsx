// import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Bookmark } from "lucide-react"; // Importing a bookmark icon
import { Button } from "@/components/ui/button"; // Assuming you have a button component available in ui
import { useNavigate } from "react-router-dom";

function JobCard() {
  const navigate = useNavigate()
  const jobId = 'jobId'
  return (
    <div className="p-6 sm:p-4 mb-5 md:p-5 rounded-lg shadow-md border border-[#b1ebe4] bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out relative">
       <span className="text-xs text-[#1c3230] font-semibold"> 3 days ago</span>
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
          <h1 className="text-lg font-semibold sm:text-base text-primaryAccent">Company Name</h1>
          <p className="text-sm sm:text-xs text-textSecondary">India</p>
        </div>
        <Avatar className="w-20 h-20 mr-[-20px] z-20">
          {/* Company logo on the right side of the name */}
          <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.9kLadk-ff48v9vs0zQL12QHaE7&pid=Api&P=0&h=180" />
        </Avatar> 
      </div>

      {/* Job Title and Description */}
      <div className="mt-[-10px]">
        <h2 className="text-xl font-bold sm:text-lg text-textPrimary">Job Title</h2>
        <p className="mt-1 text-sm sm:text-xs text-textSecondary">
       voluptate cupidatat non cillum officia. Proident
          aliqua magna do enim nulla commodo amet dolore ut occaecat. Aliquip
          aute sit nisi veniam elit elit sunt voluptate consequat consectetur
          incididunt cillum. Ex sint occaecat duis duis aliquip sint fugiat
          officia quis.
        </p>
      </div>

      {/* Job Details Badges */}
      <div className="flex items-center gap-2 mt-4 overflow-x-hidden whitespace-nowrap">
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


      {/* Upload Time and Action Buttons */}
      <div className="flex justify-start gap-4 mt-10">
        <Button variant="outline" className="px-3 py-1 text-xs sm:text-sm border-primaryAccent text-primaryAccent"
        onClick = {() =>navigate(`/job/description/${jobId}`)}>
          Details
        </Button>
        <Button className="bg-[#0e4d62] text-white px-6
        py-1 text-xs sm:text-sm ">Apply</Button>
      </div>
    </div>
  );
}

export default JobCard;
