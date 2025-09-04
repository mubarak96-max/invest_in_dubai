import CelebrityTestimonials from '@/components/CelebrityTestimonials'
import CommunitiesSection from '@/components/CommunitiesSection'
import FeaturedProjects from '@/components/FeaturedProjects'
import FeaturesSection from '@/components/FeaturesSection'
import FreeConsultationCTA from '@/components/FreeConsultationCTA'
import HeroSection from '@/components/Hero'
import InvestmentCalculator from '@/components/InvestmentCalculator'
import MarketStatsBanner from '@/components/MarketStatsBanner'
import RecentTransactions from '@/components/RecentTransactions'
import RecentBlogs from '@/components/RecentBlogs'
import { client, queries } from '@/lib/sanity'
import React from 'react'

export const revalidate = 60
console.log('Fetching homepage data...');
const [marketStats, recentTransactions, areas, featuredProjects, allProjects, recentBlogs] = await Promise.all([
  client.fetch(queries.allMarketActivity),
  client.fetch(queries.activeRecentTransactions),
  client.fetch(`${queries.allAreas}[0...5]`),
  client.fetch(queries.featuredProjects),
  client.fetch(`*[_type == "project"][0...6]{
    _id,
    title,
    "slug": slug.current,
    "image": images[0].asset->url,
    startingPrice,
    handover,
    "address": coalesce(location.address, area->name),
    projectStatus,
    propertyTypes,
    featured
  }`),
  client.fetch(queries.recentBlogs)
]);

console.log('Areas count:', areas?.length || 0);
console.log('Featured projects count:', featuredProjects?.length || 0);
console.log('All projects count:', allProjects?.length || 0);
console.log('Featured projects:', featuredProjects);

// Use featured projects if available, otherwise use first few all projects
const projectsToShow = featuredProjects?.length > 0 ? featuredProjects : allProjects;


const Home = async () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <RecentTransactions items={recentTransactions} />
      <MarketStatsBanner stats={marketStats} />
      <FeaturedProjects projects={projectsToShow} />
      <RecentBlogs blogs={recentBlogs} />
      <InvestmentCalculator />
      <CommunitiesSection items={areas} />
      <CelebrityTestimonials />
      <FreeConsultationCTA />
    </div>
  )
}

export default Home