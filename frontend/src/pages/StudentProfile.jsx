// import React from 'react';
import { Badge } from "@/components/ui/badge"; // Assuming Badge component is imported
import Navbar from "@/components/elements/Navbar";
import { Pencil } from "lucide-react"; // Assuming Lucide Icons for the edit icon
// import { useDispatch } from "react-redux";
// import { editProfile } from "@/store/actions"; // Update with actual action path

function StudentProfile() {
  // const dispatch = useDispatch();

  // Edit button handler
  // const handleEdit = () => {
  //   dispatch(editProfile());
  // };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-5 py-10 bg-gradient-to-br from-[#fff1eb] to-[#ace0f9]">
        <div className="w-full max-w-4xl p-8 overflow-hidden bg-white rounded-lg shadow-md">
          
          {/* Profile Header with Edit Icon */}
          <div className="flex flex-col justify-between mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mt-4 text-2xl font-bold text-[#0e4d62]">John Doe</h2>
                <p className="text-sm text-gray-600">Computer Science Student, Class of 2024</p>
              </div>
              <button
                className="text-gray-600 hover:text-blue-600"
                aria-label="Edit Profile"
                // onClick={handleEdit}
              >
                <Pencil className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">Contact</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li><strong>Email: </strong> <a href="mailto:john@mail.com" className="text-gray-500">john@mail.com</a></li>
              <li><strong>GitHub: </strong> <a href="https://github.com" target="_blank" className="text-gray-500">https://github.com</a></li>
              <li><strong>LinkedIn: </strong> <a href="https://linkedin.com" target="_blank" className="text-gray-500">https://linkedin.com</a></li>
            </ul>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">About Me</h3>
            <p className="text-sm text-gray-700">
              Passionate computer science student with interests in full-stack development, AI, and data science. Eager to apply my knowledge to real-world projects and learn from industry professionals.
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Education</h3>
            <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
              <li>
                <strong>Bachelor of Science in Computer Science</strong>, XYZ University
                <p>Expected Graduation: 2024</p>
              </li>
              <li>
                <strong>High School Diploma</strong>, ABC High School
                <p>Graduated: 2020</p>
              </li>
            </ul>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Experience</h3>
            <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
              <li>
                <strong>Frontend Developer Intern</strong>, Tech Solutions Inc.
                <p>June 2023 - August 2023</p>
                <p>Developed and optimized responsive components for client projects using React and Tailwind CSS.</p>
              </li>
              <li>
                <strong>Data Science Research Assistant</strong>, XYZ University
                <p>September 2022 - May 2023</p>
                <p>Assisted in creating predictive models for climate data analysis using Python and Machine Learning libraries.</p>
              </li>
            </ul>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Skills</h3>
            <div className="flex flex-wrap gap-2 cursor-pointer">
              <Badge>JavaScript</Badge>
              <Badge>React</Badge>
              <Badge>Node.js</Badge>
              <Badge>MongoDB</Badge>
              <Badge>Python</Badge>
              <Badge>Machine Learning</Badge>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">Projects</h3>
            <ul className="ml-5 space-y-2 text-sm text-gray-700 list-disc">
              <li>
                <strong>Job Portal Website:</strong> A MERN stack web app for job seekers to find and apply for jobs.
                <p className="mt-1 text-sm font-semibold">
                  Project Link: <a href="https://shifatahreem.netlify.app/" target="_blank" className="hover:underline">https://shifatahreem.netlify.app/</a>
                </p>
              </li>
              <li>
                <strong>Data Visualization Dashboard:</strong> Developed a dashboard using D3.js and React for interactive data visualization.
                <p className="mt-1 text-sm font-semibold">
                  Project Link: <a href="https://shifatahreem.netlify.app/" target="_blank" className="hover:underline">https://shifatahreem.netlify.app/</a>
                </p>
              </li>
            </ul>
          </div>

          {/* Interests Section */}
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-semibold text-[#0e4d62]">Interests</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Artificial Intelligence</Badge>
              <Badge>Blockchain</Badge>
              <Badge>Open Source</Badge>
              <Badge>Web Development</Badge>
            </div>
          </div>

          {/* View Resume Button */}
          <div className="mt-8">
            <button
              className="px-4 py-2 font-semibold text-white bg-[#0e4d62] rounded-md hover:bg-[#093644] transition"
              
            >
              View Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
