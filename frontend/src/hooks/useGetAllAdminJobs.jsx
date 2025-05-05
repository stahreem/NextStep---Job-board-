import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function useGetAllAdminJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/admins`, {
          withCredentials: true,
        });
        console.log(res.data.jobs);
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
          //   toast.success(res.data.message || "All jobs get Successfully!");
          // } else {
          //   toast.error(res.data.message || "Failed to get All jobs. Please try again.");
        }
        console.log("from useGetAllAdminJobs", res);
      } catch (error) {
        // console.log(error);
        const errorMsg =
          error.response?.data?.message || "Login failed. Please try again.";
        toast.error(errorMsg);
        dispatch(setAllAdminJobs([]));
      }
    };
    fetchAllJobs();
  }, []);
}

export default useGetAllAdminJobs;
