// import React from 'react';
// import { useLocation } from "react-router-dom";
import Navbar from "@/components/elements/Navbar";
import { Bookmark, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function JobDescription() {
  //   const location = useLocation();
  //   const job = location.state?.job;

  const userRole = "student"; // student recruiter
  const isApplied = false;
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-5 py-10 bg-gradient-to-br from-[#fff1eb] to-[#ace0f9]">
        <div className="relative w-full max-w-4xl p-8 overflow-hidden bg-white rounded-lg shadow-md">
          {/* Bookmark Button */}
          {userRole === "student" ? (
            <button
              className="absolute z-30 p-2 transition bg-gray-100 rounded-full top-3 right-3 hover:bg-gray-200"
              aria-label="Bookmark"
            >
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <button
              className="absolute z-30 p-2 transition bg-gray-100 rounded-full top-3 right-16 hover:bg-gray-200"
              aria-label="Edit"
            >
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Job Title and Company Info */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#0e4d62]">title</h1>
                {/* {job.title} */}
                <p className="text-sm text-gray-600">companyName</p>
                {/* {job.companyName} */}
              </div>
              <Avatar className="w-28 h-28 mr-[-20px] z-20">
                {/* Company logo on the right side of the name */}
                <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.9kLadk-ff48v9vs0zQL12QHaE7&pid=Api&P=0&h=180" />
              </Avatar>
            </div>
          </div>

          {/* Job Overview */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Job Overview
            </h3>
            <p className="text-sm text-gray-700">longDescription</p>
            {/* {job.longDescription} */}
          </div>

          {/* Job Details */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Job Details
            </h3>
            <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
              <li>
                <strong>Location:</strong> location
              </li>
              <li>
                <strong>Employment Type:</strong> type
              </li>
              <li>
                <strong>Salary:</strong> salary
              </li>
              <li>
                <strong>Positions Available:</strong> 12
              </li>
              <li>
                <strong>Total Applications :</strong> 12
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-500">
              Posted On: <strong>13-4-2024</strong>
            </p>
          </div>

          {/* Application Button */}
          <div className="mt-8">
            {userRole === "student" && (
              // <button
              //   className="px-4 py-2 font-semibold text-white bg-[#0e4d62] rounded-md hover:bg-[#093644] transition"
              //  >
              <Button
                className={`px-4 py-2 font-semibold rounded-md transition ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed text-gray-100"
                    : "bg-[#0e4d62] hover:bg-[#093644] text-slate-100"
                }`}
                disabled={isApplied} // Disables the button if the job is already applied
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>

              // </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
