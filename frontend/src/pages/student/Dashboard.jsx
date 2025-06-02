import HeroSection from "@/components/elements/HeroSection";
import CategoryCarouselSection from "@/components/elements/CategoryCarouselSection";
import Navbar from "@/components/elements/Navbar";
import LatestJobs from "@/components/elements/LatestJobs";
import Footer from "@/components/elements/Footer";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, loading } = useSelector((store) => store.auth);
  const isAuthenticated = !!user;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (user?.role === "recruiter") {
        navigate("/admin/company");
      }
    }
  }, [user, isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
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
