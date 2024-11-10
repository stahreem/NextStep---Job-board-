// import React from 'react'

import LatestJobCards from "./LatestJobCards";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function LatestJobs() {
  return (
    <div className="max-w-6xl px-4 mx-auto my-20 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#4b5563] mb-8">
        <span className="text-[#0a2f65]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {randomJobs.slice(0, 6).map((item, index) => (
          <LatestJobCards key={index} />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
