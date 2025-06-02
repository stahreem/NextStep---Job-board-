import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/Constant";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CompaniesTable() {
  const { companies, searchCompany } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompany) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompany.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompany]);

  // Handle delete action for a specific company
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );
    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message || "Company deleted successfully!");

        const updatedCompanies = companies.filter(
          (company) => company._id !== id
        );
        dispatch(setCompanies(updatedCompanies));
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
          <TableCaption>A list of your registered companies.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="font-bold text-center text-gray-400"
                >
                  No company registered yet
                </TableCell>
              </TableRow>
            ) : (
              filterCompany.map((company) => (
                <TableRow key={company._id} className="font-semibold">
                  <TableCell>{company.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        className="w-16 h-16"
                        src={company.companyLogo}
                        alt={company.name}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Link to="/admin/company/details"> {company.name} </Link>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-start gap-10">
                      <Edit
                        className="w-5 h-5 cursor-pointer text-[#0e4d62]"
                        onClick={() =>
                          navigate(`/admin/company/${company?._id}`)
                        }
                      />
                      <Trash2
                        className="w-5 h-5 text-red-500 cursor-pointer"
                        onClick={() => handleDelete(company?._id)}
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

export default CompaniesTable;
