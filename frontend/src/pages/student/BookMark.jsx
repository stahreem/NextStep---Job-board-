import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "@/components/elements/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useGetBookmarks from "@/hooks/useGetBookmarks";
import { setBookmarkedJobs } from "@/redux/jobSlice";
import { BOOKMARK_API_END_POINT } from "@/utils/Constant";

function BookMark() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useGetBookmarks();

  const { bookmarkedJobs = [] } = useSelector((state) => state.job);

  const unbookmarkJobHandler = async (jobId) => {
    try {
      await axios.delete(`${BOOKMARK_API_END_POINT}/${jobId}`, {
        withCredentials: true,
      });

      const updatedJobs = bookmarkedJobs.filter((job) => job._id !== jobId);
      dispatch(setBookmarkedJobs(updatedJobs)); // update Redux directly
      toast.success("Bookmark removed");
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mt-4 text-textPrimary text-center">
        Bookmarked Jobs
      </h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        You have bookmarked{" "}
        <span className="font-semibold">{bookmarkedJobs.length}</span> job
        {bookmarkedJobs.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {bookmarkedJobs.length ? (
          bookmarkedJobs.map((job) => {
            const postedDate = new Date(job.createdAt);
            const today = new Date();
            const daysAgo = Math.floor(
              (today - postedDate) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={job._id}
                className="w-full max-w-md p-6 sm:p-4 mb-5 md:p-5 rounded-lg shadow-md border border-[#b1ebe4] bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out relative"
              >
                <span className="text-xs text-[#1c3230] font-semibold">
                  {daysAgo === 0 ? "Today" : `${daysAgo} days ago`}
                </span>

                <div className="flex items-center justify-between mt-[-20px]">
                  <div>
                    <h1 className="text-lg font-semibold sm:text-base text-primaryAccent">
                      {job?.company?.name}
                    </h1>
                    <p className="text-sm sm:text-xs text-textSecondary">
                      {job?.location}
                    </p>
                  </div>
                  <Avatar className="w-20 h-20 mr-[-20px] z-20">
                    <AvatarImage src={job?.company?.companyLogo} />
                  </Avatar>
                </div>

                <div className="mt-[-10px]">
                  <h2 className="text-xl font-bold sm:text-lg text-textPrimary">
                    {job?.title}
                  </h2>
                  <p className="mt-1 text-sm sm:text-xs text-textSecondary">
                    {job?.description?.slice(0, 100)}...
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4 overflow-x-hidden whitespace-nowrap">
                  <Badge
                    variant="outline"
                    className="text-xs sm:text-xs md:text-sm border-primaryAccent text-primaryAccent"
                  >
                    {job?.position} Positions
                  </Badge>
                  <Badge
                    variant="secondary"
                    style={{ backgroundColor: "#0dbfb3", color: "#ffffff" }}
                    className="text-xs sm:text-xs md:text-sm"
                  >
                    {job?.salary} LPA
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#ff7878", color: "#ffffff" }}
                    className="text-xs sm:text-xs md:text-sm"
                  >
                    {job?.jobType}
                  </Badge>
                </div>

                <div className="flex justify-start gap-4 mt-10">
                  <Button
                    className=" bg-[#0e4d62] hover:bg-[#093644] text-white px-3 py-1 text-xs sm:text-sm border-primaryAccent "
                    onClick={() => navigate(`/job/description/${job?._id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="destructive"
                    className="px-3 py-1 text-xs sm:text-sm"
                    onClick={() => unbookmarkJobHandler(job._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-500">
            No bookmarked jobs yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default BookMark;
