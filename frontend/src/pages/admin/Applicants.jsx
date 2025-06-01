import ApplicationTable from "@/components/elements/ApplicationTable";
import Navbar from "@/components/elements/Navbar";
import { setApplication } from "@/redux/applicationSlice";
import { store } from "@/redux/store";
import { APPLICATION_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applications`,
          { withCredentials: true }
        );
        console.log(res.data);

        if (res.data.success) {
          dispatch(setApplication(res.data.applications));
          setJobTitle(res.data.jobTitle);
          setCompany(res.data.company);
          // console.log(applicants.length);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl mt-14">
        <div className="relative flex items-center mb-6">
          {/* Left Arrow */}
          <ArrowLeft
            className="absolute w-6 h-6 text-gray-700 cursor-pointer left-10 hover:text-teal-500"
            onClick={() => navigate("/admin/jobs")}
          />

          {/* Centered Title */}
          <h1 className="flex-grow text-2xl font-bold text-center text-[#0e4d62]">
            <span className="text-[#0e4d62]">{jobTitle}</span>{" "}
            <span className="font-semibold text-teal-600">
              @ {company?.name}
            </span>{" "}
            —
            <span className="font-medium text-gray-700">
              {" "}
              Applications ({applicants?.length || 0})
            </span>
          </h1>
        </div>
        <ApplicationTable />
      </div>
    </div>
  );
}

export default Applicants;
