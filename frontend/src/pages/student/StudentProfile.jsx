/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/elements/Navbar";
import { Loader, Loader2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/Constant";
import { setLoading } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";

function StudentProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  // Fetch updated user profile from the backend
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true, // Ensure cookies are included for authentication
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-10 h-10 text-center animate-spin text-gray-500" />
      </div>
    );
  }
  const { role, fullName, email, studentDetails } = userData;
  const resumeUrl = studentDetails.resumeLink;

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-5 py-10 bg-gradient-to-br from-[#fff1eb] to-[#ace0f9]">
        <div className="w-full max-w-4xl p-8 overflow-hidden bg-white rounded-lg shadow-md">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="mt-4 text-2xl font-bold text-[#0e4d62]">
                {fullName || "Not Uploaded"}
              </h2>
              <p className="text-sm text-gray-600">
                {studentDetails?.graduationStatus || "Not Uploaded"}
              </p>
            </div>
            {role === "student" && (
              <button
                className="text-gray-600 hover:text-blue-600"
                aria-label="Edit Profile"
                onClick={() => navigate("/student/profile/edit")}
              >
                <Pencil className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Conditional Sections */}
          {email && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">
                Contact
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Email: </strong>
                  <a href={`mailto:${email}`} className="text-gray-500">
                    {email}
                  </a>
                </li>
                {studentDetails?.github && (
                  <li>
                    <strong>GitHub: </strong>
                    <a
                      href={studentDetails.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500"
                    >
                      {studentDetails.github}
                    </a>
                  </li>
                )}
                {studentDetails?.linkedin && (
                  <li>
                    <strong>LinkedIn: </strong>
                    <a
                      href={studentDetails.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500"
                    >
                      {studentDetails.linkedin}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {studentDetails?.about && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                About Me
              </h3>
              <p className="text-sm text-gray-700">{studentDetails.about}</p>
            </div>
          )}

          {studentDetails?.education?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Education
              </h3>
              <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
                {studentDetails.education.map((edu, index) => (
                  <li key={index}>
                    <strong>{edu.degree}</strong>, {edu.institution}
                    <p>{edu.year}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {studentDetails?.experience?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Experience
              </h3>
              <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
                {studentDetails.experience.map((exp, index) => (
                  <li key={index}>
                    <strong>{exp.role}</strong>, {exp.company}
                    <p>
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p>{exp.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {studentDetails?.projects?.length > 0 ? (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">
                Projects
              </h3>
              <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
                {studentDetails.projects.map((project, index) => (
                  <li key={index}>
                    <strong>{project.name}:</strong> {project.description}
                    {project.link && (
                      <p className="mt-1 text-sm font-semibold">
                        Project Link:{" "}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {project.link}
                        </a>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <span> No </span>
          )}

          {studentDetails?.skills?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {studentDetails.skills.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          {studentDetails?.interests?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {studentDetails.interests.map((interest, index) => (
                  <Badge key={index}>{interest}</Badge>
                ))}
              </div>
            </div>
          )}

          {studentDetails?.resumeLink && (
            <div className="mt-8">
              <a
                href={studentDetails.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 font-semibold text-white bg-[#0e4d62] rounded-md hover:bg-[#093644] transition"
              >
                View Resume: {studentDetails.resumeName}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
