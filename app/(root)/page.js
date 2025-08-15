import CelebrityTestimonials from '@/components/CelebrityTestimonials'
import CommunitiesSection from '@/components/CommunitiesSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import FeaturesSection from '@/components/FeaturesSection'
import FreeConsultationCTA from '@/components/FreeConsultationCTA'
import HeroSection from '@/components/Hero'
import InvestmentCalculator from '@/components/InvestmentCalculator'
import MarketStatsBanner from '@/components/MarketStatsBanner'
import React from 'react'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <FeaturesSection />
        <MarketStatsBanner/>
        <FeaturedProperties />
        <InvestmentCalculator />
        <CommunitiesSection />
        <CelebrityTestimonials />
        <FreeConsultationCTA />
    </div>
  )
}

export default Home