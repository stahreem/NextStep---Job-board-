import { useState } from "react";
import { Search } from "lucide-react";
// import {Typed} from "react-typed";
import { Button } from "../ui/button";

function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search when clicking the search button
  const handleSearch = () => {
    if (searchTerm.trim() === "") return;

    // Send request to backend API with search term (replace with actual API call)
    fetch(`https://your-backend-url.com/search?query=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        // Handle the search results
        console.log("Search results:", data);
      })
      .catch(error => console.error("Error fetching search results:", error));
  };

  return (
    <section className="my-16 text-center">
      <div className="flex flex-col gap-5">
        {/* Main heading with typing animation */}
        <h1 className="text-4xl font-bold leading-snug">
          Search, Apply & <br />
          Get Your <span className="text-[#0dbfb3]">
            {/* <Typed
              strings={["Dream Job", "Dream Internship"]}
              typeSpeed={80}
              backSpeed={60}
              loop
            /> */}Dream Job
          </span>
        </h1>

        {/* Search Input and Button */}
        <div className="flex items-center w-full max-w-xl p-2 mx-auto bg-white border border-gray-300 rounded-full shadow-lg md:px-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-2 text-lg text-gray-700 placeholder-gray-500 bg-transparent border-none outline-none"
          />
          <Button onClick={handleSearch} className="rounded-full w-[20%] text-gray-500 hover:text-[#0dbfb3]">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
