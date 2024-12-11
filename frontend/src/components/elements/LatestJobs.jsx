// import React from 'react'

import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
// eslint-disable-next-line no-unused-vars
import { store } from "@/redux/store";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-6xl px-4 mx-auto my-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#4b5563] mb-8">
        <span className="text-[#0a2f65]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {allJobs.length !== 0 ? (
          allJobs.slice(0, 6).map((item, index) => (
            <div key={item._id}>
              <LatestJobCards key={index} job={item} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
