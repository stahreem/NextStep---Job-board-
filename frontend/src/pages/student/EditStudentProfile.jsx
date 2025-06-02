import Navbar from "@/components/elements/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/Constant";

function EditStudentProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    graduationStatus: "",
    email: "",
    phoneNumber: "",
    password: "",
    github: "",
    linkedin: "",
    about: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ role: "", company: "", year: "" }],
    skills: [""],
    projects: [{ name: "", description: "", link: "" }],
    interests: [""],
    resumeLink: "",
  });

  // Pre-fill the form data once the user data is available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user?.fullName || "",
        graduationStatus: user?.studentDetails?.graduationStatus || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        password: user?.password || "",
        github: user?.studentDetails?.github || "",
        linkedin: user?.studentDetails?.linkedin || "",
        about: user?.studentDetails?.about || "",
        education: user?.studentDetails?.education?.length
          ? user.studentDetails.education
          : [{ degree: "", institution: "", year: "" }],
        experience: user?.studentDetails?.experience?.length
          ? user.studentDetails.experience
          : [{ role: "", company: "", year: "" }],
        skills: user?.studentDetails?.skills?.length
          ? user.studentDetails.skills
          : [""],
        projects: user?.studentDetails?.projects?.length
          ? user.studentDetails.projects
          : [{ name: "", description: "", link: "" }],
        interests: user?.studentDetails?.interests?.length
          ? user.studentDetails.interests
          : [""],
        resumeLink: user?.studentDetails?.resumeLink || "",
      }));
    }
  }, [user]); // Only run when user data changes

  // Handlers for single-field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index] = {
      ...updatedSection[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      [section]: updatedSection,
    });
  };

  const handleChangeForSkillsAndInterest = (index, value, section) => {
    const updatedSection = [...formData[section]];
    updatedSection[index] = value; // Replace the value directly
    setFormData({
      ...formData,
      [section]: updatedSection,
    });
  };

  const handleAddField = (section, newItem) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], newItem],
    });
  };

  const handleRemoveField = (field, index) => {
    if (formData[field].length > 1) {
      const updatedArray = [...formData[field]];
      updatedArray.splice(index, 1);
      setFormData({
        ...formData,
        [field]: updatedArray,
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFormData({ ...formData, file });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Updated Profile Data:", formData);
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setLoading(false);

      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message || "Profile updated successfully!");
        navigate("/student/profile");
      } else {
        toast.error(res.data.message || "Failed to update profile.");
      }
    } catch (err) {
      setLoading(false);
      const errorMsg =
        err.response?.data?.message || "Update failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  return (
    <section>
      <Navbar />
      <div className="px-5 py-10 mx-auto ">
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

            {/* Education Section */}
            <div>
              <h3 className="text-lg font-semibold">Education</h3>
              {formData.education.map((item, index) => (
                <div key={index} className="mb-3 space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`degree-${index}`}></Label>
                      <Input
                        type="text"
                        name={`degree-${index}`}
                        value={item.degree}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "degree",
                            e.target.value,
                            "education"
                          )
                        }
                        placeholder="B.E Computer Science "
                      />
                    </div>
                    <div>
                      <Label htmlFor={`institution-${index}`}></Label>
                      <Input
                        type="text"
                        name={`institution-${index}`}
                        value={item.institution}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "institution",
                            e.target.value,
                            "education"
                          )
                        }
                        placeholder="xyz University"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`year-${index}`}></Label>
                      <Input
                        type="text"
                        name={`year-${index}`}
                        value={item.year}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "year",
                            e.target.value,
                            "education"
                          )
                        }
                        placeholder="2020-2024"
                      />
                    </div>
                  </div>
                  {formData.education.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveField("education", index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  handleAddField("education", {
                    degree: "",
                    institution: "",
                    year: "",
                  })
                }
              >
                Add Education
              </Button>
            </div>

            {/* Experience Section */}
            <div>
              <h3 className="text-lg font-semibold">Experience</h3>
              {formData.experience.map((item, index) => (
                <div key={index} className="mb-3 space-y-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`role-${index}`}></Label>
                      <Input
                        type="text"
                        name={`role-${index}`}
                        value={item.role}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "role",
                            e.target.value,
                            "experience"
                          )
                        }
                        placeholder="Role"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`company-${index}`}></Label>
                      <Input
                        type="text"
                        name={`company-${index}`}
                        value={item.company}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "company",
                            e.target.value,
                            "experience"
                          )
                        }
                        placeholder="Company"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`year-${index}`}></Label>
                      <Input
                        type="text"
                        name={`year-${index}`}
                        value={item.year}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "year",
                            e.target.value,
                            "experience"
                          )
                        }
                        placeholder="Year"
                      />
                    </div>
                  </div>
                  {formData.experience.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveField("experience", index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  handleAddField("experience", {
                    role: "",
                    company: "",
                    year: "",
                  })
                }
              >
                Add Experience
              </Button>
            </div>

            {/* Project  Section */}
            <div>
              <h3 className="text-lg font-semibold">Projects</h3>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-3 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`project-name-${index}`}> </Label>
                      <Input
                        type="text"
                        name={`project-name-${index}`}
                        value={project.name}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "name",
                            e.target.value,
                            "projects"
                          )
                        }
                        placeholder="Project Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`project-description-${index}`}></Label>
                      <Input
                        type="text"
                        name={`project-description-${index}`}
                        value={project.description}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "description",
                            e.target.value,
                            "projects"
                          )
                        }
                        placeholder="Description"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`project-link-${index}`}> </Label>
                      <Input
                        type="url"
                        name={`project-link-${index}`}
                        value={project.link}
                        onChange={(e) =>
                          handleArrayChange(
                            index,
                            "link",
                            e.target.value,
                            "projects"
                          )
                        }
                        placeholder="Project Link"
                      />
                    </div>
                  </div>
                  {formData.projects.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleRemoveField("projects", index)}
                    >
                      Remove Project
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  handleAddField("projects", {
                    name: "",
                    description: "",
                    link: "",
                  })
                }
              >
                Add Project
              </Button>
            </div>

            {/* Skills and interest Section */}
            <div className="grid grid-cols-2 gap-4">
              {/* Skills Section */}
              <div>
                <h3 className="text-lg font-semibold">Skills</h3>
                {formData.skills.map((skill, index) => (
                  <div key={index} className="mb-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Label htmlFor={`skill-${index}`}></Label>
                        <Input
                          type="text"
                          name={`skill-${index}`}
                          value={skill} // Make sure it's a string
                          onChange={
                            (e) =>
                              handleChangeForSkillsAndInterest(
                                index,
                                e.target.value,
                                "skills"
                              ) // Corrected
                          }
                          placeholder="Skill"
                        />
                      </div>
                      {formData.skills.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => handleRemoveField("skills", index)}
                          className="ml-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAddField("skills", "")} // Adding a string, not an object
                >
                  Add Skill
                </Button>
              </div>

              {/* Interests Section */}
              <div>
                <h3 className="text-lg font-semibold">Interests</h3>
                {formData.interests.map((interest, index) => (
                  <div key={index} className="mb-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Label htmlFor={`interest-${index}`}></Label>
                        <Input
                          type="text"
                          name={`interest-${index}`}
                          value={interest} // Ensure this is a string
                          onChange={
                            (e) =>
                              handleChangeForSkillsAndInterest(
                                index,
                                e.target.value,
                                "interests"
                              ) // Corrected
                          }
                          placeholder="Interest"
                        />
                      </div>
                      {formData.interests.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => handleRemoveField("interests", index)}
                          className="ml-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => handleAddField("interests", "")} // Adding a string, not an object
                >
                  Add Interest
                </Button>
              </div>
            </div>

            {/* resume file */}
            <div>
              <Label htmlFor="file">Resume:{}</Label>
              <Input
                id="file"
                type="file"
                name="file"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>

            {/* Submit */}
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
