import CelebrityTestimonials from '@/components/CelebrityTestimonials'
import CommunitiesSection from '@/components/CommunitiesSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import FeaturesSection from '@/components/FeaturesSection'
import HeroSection from '@/components/Hero'
import React from 'react'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <FeaturesSection />
        <FeaturedProperties />
        <CommunitiesSection />
        <CelebrityTestimonials />
    </div>
  )
}

export default Home