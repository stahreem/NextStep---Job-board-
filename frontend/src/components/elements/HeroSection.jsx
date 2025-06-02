import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetAllJobs();

  // Function to handle search when clicking the search button
  const handleSearch = () => {
    if (query.trim() === "") return;
    dispatch(setSearchQuery(query));
    navigate("/browse");
    console.log("Search term submitted:", query);
  };

  return (
    <section className="my-16 text-center">
      <div className="flex flex-col gap-5">
        {/* Main heading with typing animation */}
        <h1 className="text-4xl font-bold leading-snug">
          Search, Apply & <br />
          Get Your <span className="text-[#0dbfb3]">Dream Job</span>
        </h1>

        {/* Search Input and Button */}
        <div className="flex items-center w-full max-w-xl p-2 mx-auto bg-white border border-gray-300 rounded-full shadow-lg md:px-4">
          <input
            type="text"
            placeholder="Search for jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-2 pl-2 text-lg text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none"
          />
          <Button
            onClick={handleSearch}
            className="rounded-full w-[20%] text-gray-500 hover:text-[#0dbfb3]"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
