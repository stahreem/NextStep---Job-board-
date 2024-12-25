import CompaniesTable from '@/components/elements/CompaniesTable';
import Navbar from '@/components/elements/Navbar';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { setSearchCompany } from '@/redux/companySlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCompany() {
  useGetAllCompanies()
  const [input, setInput] = useState()
  const navigate = useNavigate();
const dispatch = useDispatch()

useEffect(() => {
  dispatch(setSearchCompany(input))
},[input])


  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search companies..."
            className="w-[70%] py-3 px-4 text-lg text-gray-800 bg-white rounded-full shadow-md placeholder-gray-500 focus:outline-none focus:ring-2"
            onChange={(e) => setInput(e.target.value)}
          />
          
          {/* Add Company Button */}
          <Button
            className="bg-[#0e4d62]"
            onClick={() => navigate('/admin/company/create')}
          >
            Add Company
          </Button>
        </div>

        {/* Table Section */}
        <div className="mt-10 p-6 rounded-xl ">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
}

export default AdminCompany;
