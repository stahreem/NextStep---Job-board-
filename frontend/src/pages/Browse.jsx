// import React from 'react'

import JobCard from "@/components/elements/JobCard";
import Navbar from "@/components/elements/Navbar"

const randomJobs = [1, 2, 3];

function Browse() {
  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center mx-5">
      <h1 className="m-4 mt-5 text-2xl font-semibold "> Search Results - ({randomJobs.length})</h1>
      <div className="grid grid-cols-1 gap-2 m-4 mb-3 overflow-y-clip sm:grid-cols-2 lg:grid-cols-3">
        {randomJobs.map((item, index) => (
                  <JobCard key={index} />
                ))}
                </div>
      </div>
    </div>
  )
}

export default Browse