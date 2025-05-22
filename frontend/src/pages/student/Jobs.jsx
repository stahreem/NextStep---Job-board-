import FilterCard from "@/components/elements/FilterCard";
import JobCard from "@/components/elements/JobCard";
import Navbar from "@/components/elements/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Jobs() {
  useGetAllJobs();
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.salary
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div>
      <Navbar />
      <section className="px-4 mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Filter Section */}
          <aside className="self-start w-full lg:w-1/5 h-fit">
            <FilterCard />
          </aside>

          {/* Job Listings Section */}
          <main className="flex-1 pb-5">
            {filterJobs?.length <= 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                Jobs Not Found
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filterJobs.map((item) => (
                  <JobCard key={item._id} job={item} />
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
