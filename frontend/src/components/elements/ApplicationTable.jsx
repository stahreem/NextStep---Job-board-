import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  FIT_SCORE_API_END_POINT,
} from "@/utils/Constant";
import { setApplication } from "@/redux/applicationSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ApplicationTable() {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const { id: jobId } = useParams();
  const [fitScores, setFitScores] = useState({});

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || `Application ${status}`);

        const updatedApplicants = applicants.map((app) =>
          app._id === id ? { ...app, status } : app
        );
        dispatch(setApplication(updatedApplicants));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update status. Try again."
      );
    }
  };

  useEffect(() => {
    const fetchFitScores = async () => {
      const scores = {};

      for (const applicant of applicants) {
        const userId = String(applicant?.applicant?._id);
        if (!userId) continue;
        console.log(
          "Applicants list:",
          applicants.map((a) => a?.applicant?._id)
        );
        try {
          const res = await axios.get(
            `${FIT_SCORE_API_END_POINT}/${jobId}/${userId}`
          );

          if (
            res.data.success &&
            res.data.recommendedScore?.fit_score !== undefined
          ) {
            const score = res.data.recommendedScore.fit_score;
            scores[userId] = score;
          } else {
            scores[userId] = null; // Will show "Not Calculated"
          }
        } catch (error) {
          scores[userId] = null;
          console.error("Error fetching fit score for user:", userId, error);
        }
      }

      console.log("Final fit scores map:", scores);
      setFitScores(scores);
    };

    if (applicants.length) fetchFitScores();
  }, [applicants, jobId]);

  const getColorClass = (score) => {
    if (score > 80) return "text-green-600 font-bold";
    if (score > 65) return "text-lime-500 font-semibold";
    if (score > 50) return "text-yellow-500 font-medium";
    if (score > 35) return "text-orange-500 font-medium";
    return "text-red-500 font-semibold";
  };

  return (
    <div>
      <div className="flex items-center m-5">
        <Table>
          <TableCaption>A list of your posted jobs application.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Fit Score</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="font-bold text-center text-gray-400"
                >
                  No jobs posted yet
                </TableCell>
              </TableRow>
            ) : (
              applicants.map((app) => (
                <TableRow key={app._id} className="font-semibold">
                  <TableCell>{app?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{app?.applicant?.fullName}</TableCell>
                  <TableCell>{app?.applicant?.email}</TableCell>
                  <TableCell>{app?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {app?.applicant?.studentDetails?.resumeLink ? (
                      <a
                        href={app?.applicant?.studentDetails?.resumeLink}
                        className="text-blue-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {app?.applicant?.studentDetails?.resumeName}
                      </a>
                    ) : (
                      <span>Not Uploaded</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {(() => {
                      const userId = String(app?.applicant?._id);
                      const score = fitScores?.[userId];

                      console.log(
                        "Rendering cell for:",
                        userId,
                        "score:",
                        score
                      );

                      if (typeof score === "number") {
                        return (
                          <span className={getColorClass(score)}>{score}%</span>
                        );
                      } else {
                        return (
                          <span className="italic text-gray-400">Pending</span>
                        );
                      }
                    })()}
                  </TableCell>

                  <TableCell>
                    {app?.status === "accepted" ? (
                      <span className="text-green-600">Accepted</span>
                    ) : app?.status === "rejected" ? (
                      <span className="text-red-600">Rejected</span>
                    ) : (
                      <div className="flex justify-start gap-4">
                        <CheckCircle
                          className="cursor-pointer"
                          size={24}
                          color="green"
                          onClick={() => statusHandler("accepted", app._id)}
                        />
                        <XCircle
                          className="cursor-pointer"
                          size={24}
                          color="red"
                          onClick={() => statusHandler("rejected", app._id)}
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ApplicationTable;
