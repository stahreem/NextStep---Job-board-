// import React from 'react'

import FilterCard from "@/components/elements/FilterCard";
import JobCard from "@/components/elements/JobCard";
import Navbar from "@/components/elements/Navbar";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8,9,1,1,2,3,4,5,6,6,7];

function Jobs() {
  return (
    <div className="">
      <Navbar />
      <section className="px-4 mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Filter Section */}
          <aside className="w-full lg:w-1/5">
            <FilterCard />
          </aside>
          
          {/* Job Listings Section */}
          <main className="flex-1 h-[88vh] pb-5">
            {jobsArray.length <= 0 ? (
              <span className="text-center text-gray-500">Jobs Not Found</span>
            ) : (
              <div className="grid grid-cols-1 gap-2 mb-3 overflow-y-visible sm:grid-cols-2 lg:grid-cols-3">
                {jobsArray.map((item, index) => (
                  <JobCard key={index} />
                ))}
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}

export default Jobs;
