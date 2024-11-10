import HeroSection from '@/components/elements/HeroSection'
import CategoryCarouselSection from '@/components/elements/CategoryCarouselSection'
import Navbar from '@/components/elements/Navbar'
import LatestJobs from '@/components/elements/LatestJobs'
import Footer from '@/components/elements/Footer'
// import React from 'react'

function Dashboard() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarouselSection/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Dashboard