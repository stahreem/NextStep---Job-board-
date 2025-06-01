import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import useGetCompanyById from "@/hooks/useGetCompanyById";
import { setCompanies } from "@/redux/companySlice";
import { store } from "@/redux/store";
import { JOB_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function JobsTable() {
  const { allAdminJobs, searchJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterJob, setFilterJob] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJob) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJob.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(searchJob.toLowerCase())
        );
      });
    setFilterJob(filteredJob);
  }, [allAdminJobs, searchJob]);

  // useGetCompanyById();

  // Handle delete action for a specific company
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`${JOB_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message || "Job Post  deleted successfully!");

        // Update Redux state: Remove the deleted company from the state
        const updatedJobPost = allAdminJobs.filter((job) => job._id !== id);
        dispatch(setCompanies(updatedJobPost));
      } else {
        toast.error(res.data.message || "Failed to delete the company.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Deletion failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      <div className="flex items-center m-5">
        <Table>
          <TableCaption>A list of your posted jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>No of Applicants</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAdminJobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="font-bold text-center text-gray-400"
                >
                  No jobs posted yet
                </TableCell>
              </TableRow>
            ) : (
              filterJob.map((job) => (
                <TableRow key={job._id} className="font-semibold">
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>

                  <TableCell>
                    {" "}
                    <Link to="/admin/company/details">
                      {" "}
                      {job?.company?.name}{" "}
                    </Link>
                  </TableCell>

                  <TableCell
                    className="cursor-pointer"
                    onClick={() => navigate(`/job/description/${job?._id}`)}
                  >
                    {job?.title}
                  </TableCell>
                  <TableCell>{job?.application.length}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-start gap-9">
                      <Eye
                        className="w-5 h-5 cursor-pointer text-[#0e4d62]"
                        onClick={() =>
                          navigate(`/admin/job/${job?._id}/applicants`)
                        }
                      />
                      <Edit
                        className="w-5 h-5 cursor-pointer text-[#0e4d62]"
                        onClick={() =>
                          navigate(`/admin/job/post/update/${job?._id}`)
                        }
                      />
                      <Trash2
                        className="w-5 h-5 text-red-500 cursor-pointer"
                        onClick={() => handleDelete(job?._id)} // Pass company ID here
                      />
                    </div>
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

export default JobsTable;
