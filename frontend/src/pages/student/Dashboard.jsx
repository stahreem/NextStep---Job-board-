import HeroSection from "@/components/elements/HeroSection";
import CategoryCarouselSection from "@/components/elements/CategoryCarouselSection";
import Navbar from "@/components/elements/Navbar";
import LatestJobs from "@/components/elements/LatestJobs";
import Footer from "@/components/elements/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import React from 'react'

function Dashboard() {

  const { user } = useSelector(store=> store.auth)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(user){
      if(user.role === "recruiter"){
        navigate("/admin/company")
      } 
    }
  },[user])

  useGetAllJobs();

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarouselSection />
      <LatestJobs />
      <Footer />
    </div>
  );
}

export default Dashboard;
