// import React from 'react'

function Footer() {
  return (
  <section className="bg-[#0e4d62] text-white py-10">
    <div className="grid max-w-5xl grid-cols-1 gap-8 px-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
      {/* Logo & Description */}
      <div className="flex flex-col items-center sm:items-start">
        <h3 className="mb-4 text-2xl font-semibold">NextStep</h3>
        <p className="mb-4 text-lg">
          Empowering students and recruiters with AI-driven tools, real-time connections, and career resources—all for free.
        </p>
        <a href="/about" className="text-lg underline hover:text-[#001631]">
          Learn More
        </a>
      </div>
  
      {/* Quick Links */}
      <div className="flex flex-col items-center sm:items-start">
        <h4 className="mb-4 text-xl font-semibold">Quick Links</h4>
        <ul>
          <li><a href="/about" className="text-lg hover:text-[#001631] mb-2">About Us</a></li>
          <li><a href="/signup" className="text-lg hover:text-[#001631] mb-2">Sign Up</a></li>
          <li><a href="/login" className="text-lg hover:text-[#001631] mb-2">Login</a></li>
          <li><a href="/contact" className="text-lg hover:text-[#001631] mb-2">Contact</a></li>
          <li><a href="/privacy-policy" className="text-lg hover:text-[#001631] mb-2">Privacy Policy</a></li>
          <li><a href="/terms-of-service" className="text-lg hover:text-[#001631] mb-2">Terms of Service</a></li>
        </ul>
      </div>
  
      {/* For Students */}
      <div className="flex flex-col items-center sm:items-start">
        <h4 className="mb-4 text-xl font-semibold">For Students</h4>
        <ul>
          <li><a href="/how-it-works" className="text-lg hover:text-[#001631] mb-2">How It Works</a></li>
          <li><a href="/ai-resume" className="text-lg hover:text-[#001631] mb-2">AI-Powered Resume</a></li>
          <li><a href="/find-jobs" className="text-lg hover:text-[#001631] mb-2">Find Jobs</a></li>
          <li><a href="/chat-with-recruiters" className="text-lg hover:text-[#001631] mb-2">Chat with Recruiters</a></li>
        </ul>
      </div>
  
      {/* For Recruiters */}
      <div className="flex flex-col items-center sm:items-start">
        <h4 className="mb-4 text-xl font-semibold">For Recruiters</h4>
        <ul>
          <li><a href="/post-jobs" className="text-lg hover:text-[#001631] mb-2">Post Jobs</a></li>
          <li><a href="/recruiter-dashboard" className="text-lg hover:text-[#001631] mb-2">Recruiter Dashboard</a></li>
          <li><a href="/view-applicants" className="text-lg hover:text-[#001631] mb-2">View Applicants</a></li>
          <li><a href="/manage-listings" className="text-lg hover:text-[#001631] mb-2">Manage Listings</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-10 text-lg text-center">
      <p>© 2024 NextStep. All Rights Reserved.</p>
    </div>
  </section>
  )
}

export default Footer