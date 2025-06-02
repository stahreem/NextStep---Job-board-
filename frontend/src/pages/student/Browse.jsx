// import React from 'react'

import JobCard from "@/components/elements/JobCard";
import Navbar from "@/components/elements/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { store } from "@/redux/store";
import { useSelector } from "react-redux";

function Browse() {
  const { allJobs, searchQuery } = useSelector((store) => store.job);

  const filteredJobs = allJobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useGetAllJobs();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mx-5">
        <h1 className="m-4 mt-5 text-2xl font-semibold ">
          {" "}
          Search Results - ({filteredJobs.length})
        </h1>
        <div className="grid grid-cols-1 gap-2 m-4 mb-3 overflow-y-clip sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
