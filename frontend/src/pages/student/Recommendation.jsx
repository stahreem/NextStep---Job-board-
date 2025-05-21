import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/elements/Navbar";
import JobCard from "@/components/elements/JobCard";
import { Toaster, toast } from "sonner";
import { RECOMMEND_API_END_POINT } from "@/utils/Constant";

function Recommendation() {
  const [behavioralRecs, setBehavioralRecs] = useState([]);
  const [contentRecs, setContentRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const [behavioralRes, contentRes] = await Promise.all([
        axios.get(`${RECOMMEND_API_END_POINT}/recommendations`, {
          withCredentials: true,
        }),
        axios.get(`${RECOMMEND_API_END_POINT}/recommend`, {
          withCredentials: true,
        }),
      ]);

      // ✅ Behavioral response fix
      if (Array.isArray(behavioralRes.data.recommendations)) {
        console.log(
          "Behavioral Recommendations:",
          behavioralRes.data.recommendations
        );
        setBehavioralRecs(behavioralRes.data.recommendations);
      }

      // ✅ Content-based response
      if (contentRes.data.success && Array.isArray(contentRes.data.data)) {
        console.log("Content-based Recommendations:", contentRes.data.data);
        setContentRecs(contentRes.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      toast.error("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" richColors />
      <div className="container px-4 py-6 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center">
          Job Recommendations
        </h1>

        {loading ? (
          <p className="text-center">Loading recommendations...</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Behavioral Recommendations */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">
                Behavioral Recommendations
              </h2>
              {behavioralRecs.length ? (
                behavioralRecs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <p>No behavioral recommendations available.</p>
              )}
            </section>

            {/* Content-based Recommendations */}
            <section>
              <h2 className="mb-4 text-xl font-semibold">
                Content-based Recommendations
              </h2>
              {contentRecs.length ? (
                contentRecs.map((rec) => <JobCard key={rec.jobId} job={rec} />)
              ) : (
                <p>No content-based recommendations available.</p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recommendation;
