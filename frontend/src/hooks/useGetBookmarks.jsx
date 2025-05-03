import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setBookmarkedJobs } from "@/redux/jobSlice";
import { BOOKMARK_API_END_POINT } from "@/utils/Constant";

function useGetBookmarks() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookmarkedIds = async () => {
      try {
        const res = await axios.get(`${BOOKMARK_API_END_POINT}/all`, {
          withCredentials: true,
        });
        console.log("Bookmarks response:", res);

        if (res.data.success) {
          dispatch(setBookmarkedJobs(res.data.jobs));
        }
      } catch (err) {
        toast.error("Failed to fetch bookmarks");
        console.log(err);
      }
    };
    fetchBookmarkedIds();
  }, [dispatch]);
}

export default useGetBookmarks;
