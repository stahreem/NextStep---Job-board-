/* eslint-disable no-unused-vars */
import Navbar from "@/components/elements/Navbar";
import { Bookmark, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";

function JobDescription() {
  const { id: jobID } = useParams();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  // Check if the user has already applied
  const isInitiallyApplied =
    singleJob?.application?.some((app) => app.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // Fetch job details by ID
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobID}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          // setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
        }
      } catch (error) {
        // console.error("Error applying for the job:", error);
        const errorMsg =
          error.response?.data?.message ||
          "Something went wrong. Please try again later.";
        toast.error(errorMsg);
      }
    };
    fetchSingleJob();
  }, [jobID, dispatch, user?._id]);

  // Apply for a job handler
  const applyJobHandler = async () => {
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobID}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        // const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
        // dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(
          res.data.message || "Application submitted successfully!"
        );
      } else {
        toast.error(
          res.data.message || "Application failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error applying for the job:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-5 py-10 bg-gradient-to-br from-[#fff1eb] to-[#ace0f9]">
        <div className="relative w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
          {/* Bookmark or Edit Button */}
          {user?.role === "student" ? (
            <button
              className="absolute p-2 bg-gray-100 rounded-full top-3 right-3 hover:bg-gray-200"
              aria-label="Bookmark"
            >
              <Bookmark className="w-5 h-5 text-gray-600" />
            </button>
          ) : (
            <button
              className="absolute p-2 bg-gray-100 rounded-full top-3 right-16 hover:bg-gray-200"
              aria-label="Edit"
            >
              <Edit className="w-5 h-5 text-gray-600" />
            </button>
          )}

          {/* Job Title and Company Info */}
          <div className="flex flex-col mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#0e4d62]">
                  {singleJob?.title}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-[-50]">
            {/* <img
              className="w-32 h-32"
              src="https://tse2.mm.bing.net/th?id=OIP.9kLadk-ff48v9vs0zQL12QHaE7&pid=Api&P=0&h=180" 
            />*/}
            <Avatar className="w-28 h-28">
              <AvatarImage src="https://tse2.mm.bing.net/th?id=OIP.9kLadk-ff48v9vs0zQL12QHaE7&pid=Api&P=0&h=180" />
            </Avatar>
          </div>
          {/* Job Overview */}
          <div className="mb-8 mt-[-130px]">
            <h3 className="mb-3 text-lg font-semibold text-gray-700">
              <p className="mt-4 text-sm text-gray-700">
                <strong>Description</strong> : {singleJob?.description}
              </p>
              <strong>Requirements</strong>:
            </h3>
            <ul className="ml-5 space-y-2 text-sm list-disc">
              {singleJob?.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              )) || <p>No specific requirements listed.</p>}
            </ul>
          </div>

          {/* Job Details */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Job Details
            </h3>
            <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
              <li>
                <strong>Location:</strong> {singleJob?.location || "Remote"}
              </li>
              <li>
                <strong>Employment Type:</strong> {singleJob?.jobType || "N/A"}
              </li>
              <li>
                <strong>Salary:</strong> {singleJob?.salary || "N/A"} LPA
              </li>
              <li>
                <strong>Positions Available:</strong> {singleJob?.position || 0}
              </li>
              <li>
                <strong>Total Applications:</strong>{" "}
                {singleJob?.application?.length || 0}
              </li>
            </ul>
          </div>

          {/* Posted Date */}
          <p className="text-lg font-semibold text-gray-500">
            Posted On:{" "}
            <strong>{singleJob?.createdAt?.split("T")[0] || "N/A"}</strong>
          </p>

          {/* Apply Button */}
          <div className="mt-8">
            {user?.role === "student" && (
              <Button
                onClick={setIsApplied ? null : applyJobHandler}
                disabled={setIsApplied}
                className={`px-4 py-2 font-semibold rounded-md transition ${
                  setIsApplied
                    ? "bg-gray-400 cursor-not-allowed text-gray-100"
                    : "bg-[#0e4d62] hover:bg-[#093644] text-slate-100"
                }`}
              >
                {setIsApplied ? "Already Applied" : "Apply Now"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
