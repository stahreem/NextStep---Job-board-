import Navbar from "@/components/elements/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "@/utils/Constant";
import { useNavigate } from "react-router-dom";
import { setSingleCompany } from "@/redux/companySlice";
import { setLoading } from "@/redux/authSlice";
import { ArrowLeft, Loader } from "lucide-react";

function CreateCompany() {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message || "Company registered successfully!");
        const companyId = res?.data?.company?._id;
        navigate(`/admin/company/${companyId}`);
      } else {
        toast.error(res.data.message || "Failed to registered Company.");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Update failed. Please try again.";
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10">
        <div className="px-5 py-10">
          <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-6">
  {/* Left Arrow */}
  <ArrowLeft
    className="w-6 h-6 mr-auto text-gray-700 cursor-pointer hover:text-teal-500"
    onClick={() => navigate("/admin/company")}
  />

  {/* Centered Heading */}
  <h1 className="text-2xl font-bold text-center text-[#0e4d62] flex-1">
    Register Company
  </h1>
</div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Your company name will look like this:{" "}
                    <span className="font-semibold text-[#0e4d62]">
                      {companyName}
                    </span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg "
                    required
                  />
                  {companyName && (
                    <p className="mt-2 text-sm text-gray-500">
                      Give a professional company name
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                {loading ? (
                  <Button className="w-full max-w-xs bg-[#0e4d62]">
                    <Loader className=" animate-spin" /> Please Wait...
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full max-w-xs bg-[#0e4d62]"
                  >
                    Register Company
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
