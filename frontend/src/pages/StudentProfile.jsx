/* eslint-disable no-unused-vars */
// import React from 'react';
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/elements/Navbar";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { USER_API_END_POINT } from "../utils/Constant";


function StudentProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const isResume = user?.role;
  const userRole = user?.role; // student recruiter

  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await axios.get(`${USER_API_END_POINT}/profile/update`);
  //     setUserData(response.data.user);
  //   };

  //   fetchUser();
  // }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-5 py-10 bg-gradient-to-br from-[#fff1eb] to-[#ace0f9]">
        <div className="w-full max-w-4xl p-8 overflow-hidden bg-white rounded-lg shadow-md">
          {/* Profile Header with Edit Icon */}
          <div className="flex flex-col justify-between mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mt-4 text-2xl font-bold text-[#0e4d62]">
                  {user?.fullName || "Not Upload"}
                </h2>
                <p className="text-sm text-gray-600">
                  {user?.studentDetails?.graduationStatus || "Not Upload"}{" "}
                </p>
              </div>
              {userRole === "student" && (
                <button
                  className="text-gray-600 hover:text-blue-600"
                  aria-label="Edit Profile"
                  onClick={() => navigate("/student/profile/edit")}
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">
              Contact
            </h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <strong>Email: </strong>{" "}
                <a href={user?.email} className="text-gray-500">
                  {user?.email || "Not Upload"}
                </a>
              </li>
              <li>
                <strong>GitHub: </strong>{" "}
                <a
                  href={user?.studentDetails?.github}
                  target="_blank"
                  className="text-gray-500"
                >
                  {user?.studentDetails?.github || "Not Upload"}
                </a>
              </li>
              <li>
                <strong>LinkedIn: </strong>{" "}
                <a
                  href={user?.studentDetails?.linkedin}
                  target="_blank"
                  className="text-gray-500"
                >
                  {user?.studentDetails?.linkedin || "Not Upload"}
                </a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              About Me
            </h3>
            <p className="text-sm text-gray-700">
              {user?.studentDetails?.about || "Not Upload"}
            </p>
          </div>


          {/* Education Section */}
          {user?.studentDetails?.education?.length > 0 ? (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Education
              </h3>
              <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
                {user?.studentDetails?.education.map((edu, index) => (
                  <li key={index}>
                    <strong>{edu.degree}</strong>, {edu.institution}
                    <p>{edu.year}</p>
                  </li>
                )) }
              </ul>
            </div>
          ) : (<p> Not Upload</p>)
          }

          {/* Experience Section */}
          {user?.studentDetails?.experience?.length > 0 ? (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                Experience
              </h3>
              <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
                {user?.studentDetails?.experience.map((exp, index) => (
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
          ): (<p> Not Upload</p>)}

          {/* Projects Section */}
          {user?.studentDetails?.projects?.length > 0 ? (
            <div className="mb-8">
              <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">
                Projects
              </h3>
              <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
                {user?.studentDetails?.projects.map((project, index) => (
                  <li key={index}>
                    <strong>{project.name}:</strong> {project.description}
                    <p className="mt-1 text-sm font-semibold">
                      Project Link:{" "}
                      <a
                        href={project.link}
                        target="_blank"
                        className="hover:underline"
                      >
                        {project.link}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ): (<p> Not Upload</p>)}

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Skills</h3>
            <div className="flex flex-wrap gap-2 cursor-pointer">
              {user?.studentDetails?.skills.length !== 0 ? (
                user?.studentDetails?.skills.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))
              ) : (
                <span className="text-xs font-semibold text-gray-500">
                 Not Upload
                </span>
              )}
            </div>
          </div>

          {/* Interests Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {user?.studentDetails?.interests.length !== 0 ? (
                user?.studentDetails?.interests.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))
              ) : (
                <span className="text-xs font-semibold text-gray-500">
                   Not Upload
                </span>
              )}
            </div>
          </div>

          {/* View Resume Button */}
          <div className="mt-8">
          {user?.studentDetails?.resumeLink && (
            <div className="mt-8">
              <a
                href={user?.studentDetails?.resumeLink}
                target="_blank"
                // rel="noreferrer"
                className="px-4 py-2 font-semibold text-white bg-[#0e4d62] rounded-md hover:bg-[#093644] transition"
              >
                View Resume : {user?.studentDetails?.resumeName}
              </a>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
