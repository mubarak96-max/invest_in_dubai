import CelebrityTestimonials from '@/components/CelebrityTestimonials'
import CommunitiesSection from '@/components/CommunitiesSection'
import FeaturedProperties from '@/components/FeaturedProperties'
import FeaturedProjects from '@/components/FeaturedProjects'
import FeaturesSection from '@/components/FeaturesSection'
import FreeConsultationCTA from '@/components/FreeConsultationCTA'
import HeroSection from '@/components/Hero'
import InvestmentCalculator from '@/components/InvestmentCalculator'
import MarketStatsBanner from '@/components/MarketStatsBanner'
import RecentTransactions from '@/components/RecentTransactions'
import { client, queries } from '@/lib/sanity'
import React from 'react'

export const revalidate = 60
const [marketStats, recentTransactions, featuredProps, featuredAreas, featuredProjects] = await Promise.all([
  client.fetch(queries.allMarketActivity),
  client.fetch(queries.activeRecentTransactions),
  client.fetch(`*[_type=='property' && defined(featured) && featured==true][0...12]{
      _id,
      title,
      'slug': slug.current,
      'image': images[0].asset->url,
      price,
      'category': category,
      'type': propertyType,
      'beds': bedrooms,
      'baths': bathrooms,
      'sqft': area,
      'address': coalesce(location.building + ', ' + location.community, location.community),
      'handover': handover,
      description
    }`),
  client.fetch(`*[_type=='area' && defined(featured) && featured==true][0...9]{
      _id,
      name,
      'slug': slug.current,
      'image': image.asset->url,
      'description': description,
      'avgPrice': averagePrice,
      'properties': propertyCount
    }`),
  client.fetch(`*[_type=='project' && defined(featured) && featured==true][0...6]{
      _id,
      title,
      'slug': slug.current,
      'image': images[0].asset->url,
      startingPrice,
      'priceDisplay': select(defined(startingPrice) => 'Starting from AED ' + string(startingPrice), true => 'Contact for Price'),
      handover,
      'address': coalesce(location.building + ', ' + location.community, location.community),
      projectStatus,
      propertyTypes,
      'developer': developer->name,
      'beds': floorPlans[0].bedrooms
    }`)
]);


const Home = async () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RecentTransactions items={recentTransactions} />
      <MarketStatsBanner stats={marketStats} />
      <FeaturedProperties properties={featuredProps} />
      <FeaturedProjects projects={featuredProjects} />
      <InvestmentCalculator />
      <CommunitiesSection items={featuredAreas} />
      <CelebrityTestimonials />
      <FreeConsultationCTA />
    </div>
  )
}

export default Home