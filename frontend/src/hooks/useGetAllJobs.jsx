import { setAllJobs } from "@/redux/jobSlice";
import { store } from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          //   toast.success(res.data.message || "All jobs get Successfully!");
          // } else {
          //   toast.error(res.data.message || "Failed to get All jobs. Please try again.");
        }
        // console.log(res);
      } catch (error) {
        // console.log(error);
        const errorMsg =
          error.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMsg);
      }
    };
    fetchAllJobs();
  }, []);
}

export default useGetAllJobs;
