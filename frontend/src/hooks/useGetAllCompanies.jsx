import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data.companies);
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn("No companies found.");
          dispatch(setCompanies([]));
        } else {
          console.error("Error fetching companies:", error);
        }
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
