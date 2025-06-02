import Navbar from "@/components/elements/Navbar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";
import { useSelector } from "react-redux";

function AppliedJob() {
  useGetAppliedJob();
  const { allAppliedJob } = useSelector((store) => store.job);

  return (
    <div>
      <Navbar />
      <h1 className="flex items-center justify-center mt-5 text-2xl font-semibold text-cyan-900">
        Applied Job ({allAppliedJob?.length || 0})
      </h1>
      <div className="flex items-center m-5">
        <Table>
          <TableCaption>A list of jobs you have applied to.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Application Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJob?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="font-bold text-center text-gray-400"
                >
                  You haven't applied for any job application.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJob?.map((app) => (
                <TableRow key={app._id} className="font-semibold">
                  <TableCell>{app?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{app?.job?.company?.name || "N/A"}</TableCell>
                  <TableCell>{app?.job?.company?.location || "N/A"}</TableCell>
                  <TableCell>{app?.job?.title || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        app?.status === "accepted"
                          ? "bg-green-100 text-green-600"
                          : app?.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }
                    >
                      {app?.status?.toUpperCase() || "PENDING"}
                    </Badge>
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

export default AppliedJob;
