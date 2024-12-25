import JobsTable from '@/components/elements/JobsTable';
import Navbar from '@/components/elements/Navbar';
import { Button } from '@/components/ui/button';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
// import { Input } from '@/components/ui/input';
import { setSearchJob } from '@/redux/jobSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminJobs() {
  useGetAllAdminJobs()
  const [input, setInput] = useState()
  const navigate = useNavigate();
const dispatch = useDispatch()

useEffect(() => {
  dispatch(setSearchJob(input))
},[input])


  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search job by role or company..."
            className="w-[70%] py-3 px-4 text-lg text-gray-800 bg-white rounded-full shadow-md placeholder-gray-500 focus:outline-none focus:ring-2"
            onChange={(e) => setInput(e.target.value)}
          />
          
          {/* Add job post Button */}
          <Button
            className="bg-[#0e4d62]"
            onClick={() => navigate('/admin/job/post')}
          >
            Create Job Post
          </Button>
        </div>

        {/* Table Section */}
        <div className="p-6 mt-10 rounded-xl ">
          <JobsTable />
        </div>
      </div>
    </div>
  );
}

export default AdminJobs;
