import Navbar from "@/components/elements/Navbar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/Constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader } from "lucide-react";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { setLoading } from "@/redux/authSlice";

function UpdateCompany() {
  const params = useParams();
  useGetCompanyById(params.id);
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    companyLogo: "",
  });
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        companyLogo: singleCompany.companyLogo || "",
      });
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandle = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Company updated successfully!");
        navigate("/admin/company");
      } else {
        toast.error(res.data.message || "Failed to update company.");
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
      <div className="max-w-xl mx-auto my-10">
        <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
          <div className="flex justify-start gap-40">
            <ArrowLeft
              className="w-6 h-6 text-gray-700 cursor-pointer hover:text-teal-500"
              onClick={() => navigate("/admin/company")}
            />
            <h1 className="text-2xl font-bold text-center text-[#0e4d62] mb-6">
              Update Company
            </h1>
          </div>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Company Name */}
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter company description"
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62] resize-none"
                rows={4}
              />
            </div>
            {/* Website */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block mb-1 text-sm font-medium text-gray-700">
                  Website
                </Label>
                <Input
                  type="url"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                  placeholder="Enter company website"
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
                />
              </div>

              {/* Location */}
              <div>
                <Label className="block mb-1 text-sm font-medium text-gray-700">
                  Location
                </Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  placeholder="Enter company location"
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
                />
              </div>
            </div>
            {/* Company Logo */}
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-700">
                Company Logo
              </Label>
              <Input
                type="file"
                name="companyLogo"
                accept="image/*"
                onChange={changeFileHandle}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e4d62]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              {loading ? (
                <Button className="w-full max-w-xs bg-[#0e4d62] hover:bg-[#093647] transition-all">
                  <Loader className=" animate-spin" /> Please Wait...
                </Button>
              ) : (
                <Button type="submit" className="w-full max-w-xs bg-[#0e4d62]">
                  Update
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCompany;
