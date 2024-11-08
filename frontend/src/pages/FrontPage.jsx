import  { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// eslint-disable-next-line no-unused-vars
import { useSpring, animated } from '@react-spring/web';
import Footer from '@/components/elements/Footer';

function FrontPage() {
  // Initialize AOS
  // useEffect(() => {
  //   AOS.init({ duration: 1000, once: true });
  // }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      // once: true,
    });
  }, []);

  // React Spring for fade-in effect on page load
  // eslint-disable-next-line no-unused-vars
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-[#e0f7fa]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl" data-aos="fade-up">
          Unlock Opportunities with <span className="mt-3 text-gray-900"> 
          Next<span className="text-[#0dbfb3]">Step</span></span>
        </h1>
        <p className="mt-4 text-gray-700 text-md md:text-lg" data-aos="fade-up" data-aos-delay="100">
          <span className="font-semibold text-gray-900">Build AI-powered resumes</span>, connect directly with recruiters, and access top job listings—all in one place. 
          <span className="block font-semibold text-[#0e4d62]">NextStep is free for students and recruiters.</span>
        </p>
        <div className="flex flex-col items-center justify-center mt-8 space-y-4 md:flex-row md:space-y-0 md:space-x-4" data-aos="fade-up" data-aos-delay="200">
          <a
            href="/signup"
            className="px-8 py-3 text-md font-semibold text-white bg-[#0e4d62] rounded-md shadow-lg hover:bg-[#023b81] transition-colors duration-300"
          >
            Get Started
          </a>
          <a
            href="/about"
            className="px-8 py-3 text-md font-semibold text-[#0e4d62] border border-[#0e4d62] rounded-md hover:bg-[#0e4d62] hover:text-white transition-colors duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>



      {/* How It Works Section */}
      <section className="py-20 bg-[#f4f4f4]">
        <div className="max-w-5xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0e4d62] mb-10" data-aos="fade-up">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {["Sign Up & Create Your Profile", "Personalize & Get Recommendations", "Connect & Succeed"].map((step, index) => (
              <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={`${200 + index * 100}`}>
                <h3 className="text-xl font-semibold text-[#023b81] mb-2">{`${index + 1}. ${step}`}</h3>
                <p>
                  {index === 0 ? "Join the platform and create a profile tailored to showcase your skills, experience, and goals."
                    : index === 1 ? "Based on your profile, receive personalized job or candidate recommendations."
                    : "Reach out, communicate, and take the next step in your journey with confidence."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Standout Features Section */}
      <section className="py-20 bg-[#e8f5e9]">
        <div className="max-w-5xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0e4d62] mb-10" data-aos="fade-up">
            Our Standout Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Verified Connections", description: "Our platform only includes verified profiles, giving you a trusted and safe environment to make professional connections." },
              { title: "Advanced Job Alerts", description: "Receive instant notifications for roles that match your profile, ensuring you never miss out on a relevant opportunity." },
              { title: "Comprehensive Analytics", description: "Gain insights into your applications or candidate searches, helping you refine your approach and make data-driven decisions." },
              { title: "Community Support", description: "Access resources, tips, and advice from our community and industry experts to guide your career journey." },
              { title: "Secure Messaging", description: "Communicate directly with recruiters or job seekers in a secure environment, preserving privacy and fostering trust." },
              { title: "Resume & Profile Enhancement", description: "Enhance your profile with AI-driven suggestions, making sure it stands out to the right people." }
            ].map((feature, index) => (
              <div key={index} className="p-6 text-left bg-white rounded-lg shadow" data-aos="fade-up" data-aos-delay={`${200 + index * 100}`}>
                <h3 className="text-lg font-semibold text-[#023b81] mb-2">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 bg-[#f7f7f7]">
        <div className="max-w-5xl mx-auto mb-10 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" data-aos="fade-up">
            What Our Users Are Saying
          </h2>
          <p className="text-lg text-gray-700 md:text-xl" data-aos="fade-up" data-aos-delay="300">
            Hear from students and recruiters who have transformed their career-building experience with NextStep.
          </p>
        </div>
        <div className="grid max-w-5xl grid-cols-1 gap-10 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {[
            { quote: "NextStep helped me craft the perfect resume and even connect with recruiters directly. It's the support I needed for my job search.", name: "Sarah, Software Engineer" },
            { quote: "As a recruiter, I appreciate the direct communication feature. It makes it easy to get to know candidates personally before hiring.", name: "Tom, HR Specialist" },
            { quote: "Building a resume was always intimidating for me, but NextStep’s AI-powered tool made it easy and effective.", name: "Priya, Data Analyst" }
          ].map((testimonial, index) => (
            <div key={index} className="p-6 text-center bg-white rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay={`${200 + index * 100}`}>
              <p className="mb-4 italic text-gray-700">&quot;{testimonial.quote}&quot;</p>
              <p className="font-semibold">-{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="px-6 py-16 bg-[#e4ffe5]">
        <div className="max-w-5xl mx-auto mb-10 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" data-aos="fade-up">
            Why Choose NextStep
          </h2>
          <p className="text-lg text-gray-700 md:text-xl" data-aos="fade-up" data-aos-delay="300">
            From personalized resume-building to instant messaging with recruiters, NextStep offers unique features designed to empower both students and recruiters.
          </p>
        </div>
        <div className="grid max-w-5xl grid-cols-1 gap-10 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "AI-Powered Resume Builder", description: "Get personalized, AI-generated resumes that highlight your skills and experiences, helping you stand out in the job market." },
            { title: "Direct Messaging with Recruiters", description: "Communicate directly with recruiters to build relationships, ask questions, and gain insights into the hiring process." },
            { title: "Completely Free Service", description: "Our platform is entirely free for both students and recruiters, making career-building accessible to everyone." }
          ].map((feature, index) => (
            <div key={index} className="p-6 text-left bg-white rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay={`${200 + index * 100}`}>
              <h3 className="text-lg font-semibold text-[#023b81] mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default FrontPage;

