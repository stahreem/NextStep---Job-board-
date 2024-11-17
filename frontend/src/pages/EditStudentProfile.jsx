import Navbar from "@/components/elements/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DynamicSection,
  DynamicArraySection,
} from "@/components/elements/DynamicSection";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/Constant";

function EditStudentProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    
      fullName: user?.fullName || "",
      graduationStatus: user?.studentDetails?.graduationStatus || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      password: user?.password || "",
      github: user?.studentDetails?.github || "",
      linkedin: user?.studentDetails?.linkedin || "",
      about: user?.studentDetails?.about || "",
      education: user?.studentDetails?.education?.length ? user.studentDetails.education  : [{ degree: "", institution: "", year: "" }],
      experience: user?.studentDetails?.experience?.length ? user.studentDetails.experience : [{ role: "", company: "", year: "" }],
        skills: user?.studentDetails?.skills?.length ? user.studentDetails.skills : [""],
      projects: user?.studentDetails?.projects?.length  ? user.studentDetails.projects : [{ name: "", description: "", link: "" }],
        interests: user?.studentDetails?.interests?.length ? user.studentDetails.interests : [""],
      resumeLink: user?.resumeLink || "",
      
      
    
  });

  // Handlers for single-field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleArrayChange = (index, key, value, field) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
  
      // Handle array of objects
      if (key) {
        updatedArray[index][key] = value;
      } 
      // Handle array of strings
      else {
        updatedArray[index] = value;
      }
  
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleAddField = (field, emptyObject) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], emptyObject],
    }));
  };

  const handleRemoveField = (field, index) => {
    if (formData[field].length > 1) {
      const updatedArray = [...formData[field]];
      updatedArray.splice(index, 1);
      setFormData((prev) => ({ ...prev, [field]: updatedArray }));
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/student/profile");
        toast.success(res.data.message || "Update Data successful!");
      } else {
        toast.error(
          res.data.message || "Update Data failed. Please try again."
        );
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <section className="">
      <Navbar />
      <div className="container px-5 py-10 mx-auto">
        <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-[#0e4d62] mb-6">
            Edit Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="graduationStatus">Graduation Status</Label>
                <Input
                  type="text"
                  name="graduationStatus"
                  value={formData.graduationStatus}
                  onChange={handleChange}
                  placeholder="e.g., Final Year"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            {/* About Section */}
            <div>
              <Label htmlFor="about">About</Label>
              <Input
                type="textarea"
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="Write about yourself..."
                className="h-24"
              />
            </div>

            {/* Dynamic Sections: Education, Experience, Projects, Skills, Interests */}
            <DynamicSection
              title="Education"
              field="education"
              items={formData.education}
              onAdd={() =>
                handleAddField("education", {
                  degree: "",
                  institution: "",
                  year: "",
                })
              }
              onChange={handleArrayChange}
              fields={[
                { name: "degree", placeholder: "Degree" },
                { name: "institution", placeholder: "Institution" },
                { name: "year", placeholder: "Year" },
              ]}
              onRemove={handleRemoveField}
            />
            <DynamicSection
              title="Experience"
              field="experience"
              items={formData.experience}
              onAdd={() =>
                handleAddField("experience", {
                  role: "",
                  company: "",
                  year: "",
                })
              }
              onChange={handleArrayChange}
              fields={[
                { name: "role", placeholder: "Role" },
                { name: "company", placeholder: "Company" },
                { name: "year", placeholder: "Year" },
              ]}
              onRemove={handleRemoveField}
            />
            <DynamicSection
              title="Projects"
              field="projects"
              items={formData.projects}
              onAdd={() =>
                handleAddField("projects", {
                  name: "",
                  description: "",
                  link: "",
                })
              }
              onChange={handleArrayChange}
              fields={[
                { name: "name", placeholder: "Project Name" },
                { name: "description", placeholder: "Description" },
                { name: "link", placeholder: "Project Link" },
              ]}
              onRemove={handleRemoveField}
            />
            <div className="grid grid-cols-2 gap-4">
              <DynamicArraySection
                title="Skills"
                field="skills"
                items={formData.skills}
                onAdd={() => handleAddField("skills", "")}
                onChange={(index, key, value) =>
                  handleArrayChange(index, key, value, "skills")
                }
                onRemove={handleRemoveField}
              />
              <DynamicArraySection
                title="Interests"
                field="interests"
                items={formData.interests}
                onAdd={() => handleAddField("interests", "")}
                onChange={(index, key, value) =>
                  handleArrayChange(index, key, value, "interests")
                }
                onRemove={handleRemoveField}
              />
           
            </div>
            <div>
              <Label htmlFor="resumeLink">Resume Link:</Label>
              <Input
                type="text"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="Upload from drive "
              />
            </div>
            {/* Save Button */}
            <div className="flex justify-center gap-4">
              {loading ? (
                <Button className="w-full max-w-xs bg-[#0e4d62]">
                  <Loader className=" animate-spin" /> Please Wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#0e4d62] text-white px-6 py-2"
                >
                  Save Changes
                </Button>
              )}

              <Button
                variant="outline"
                onClick={() => navigate("/student/profile")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditStudentProfile;
