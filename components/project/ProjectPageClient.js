'use client';

import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import Image from 'next/image';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import PaymentPlan from '@/components/project/PaymentPlan';
import FloorPlans from '@/components/project/FloorPlans';
import ContactForm from '@/components/project/ContactForm';
import ProjectAmenities from '@/components/project/ProjectAmenities';
import ProjectLocation from '@/components/project/ProjectLocation';
import DeveloperInfo from '@/components/project/DeveloperInfo';
import UniqueSellingPoints from '@/components/project/UniqueSellingPoints';
import ProjectVideo from '@/components/project/ProjectVideo';
import FAQ from '@/components/project/FAQ';
import InvestmentCalculator from '@/components/project/InvestmentCalculator';
import ContactModal from '@/components/global/ContactModal';
import BrochureDownload from '@/components/project/BrochureDownload';

export default function ProjectPageClient({ project }) {
  console.log('Project data in ProjectPageClient:', project);

  // Early return if no project data
  if (!project) {
    console.error('No project data provided to ProjectPageClient');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <p className="text-gray-600">The requested project could not be loaded.</p>
        </div>
      </div>
    );
  }

  // Normalize brochure URL from multiple possible shapes returned by Sanity
  const brochureProp = project?.brochureUrl || project?.brochure?.asset?.url || project?.brochure?.url || null;
  console.log('Brochure URL (resolved):', brochureProp);

  const { isOpen, openModal, closeModal } = useModal();
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const openBrochure = () => setIsBrochureOpen(true);
  const closeBrochure = () => setIsBrochureOpen(false);

  // Sanitize images array to ensure we never pass empty string to next/image src
  let safeImages = [];

  try {
    if (Array.isArray(project?.images)) {
      safeImages = project.images
        .filter(Boolean)  // Remove null/undefined
        .filter(img => typeof img === 'string')  // Ensure strings only
        .map(img => img.trim())  // Trim whitespace
        .filter(img => img !== '')  // Remove empty strings
    }
  } catch (error) {
    console.error('Error processing project images:', error);
  }

  const sanitizedProject = {
    ...project,
    images: safeImages.length > 0 ? safeImages : ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D']
  };

  return (
    <div className="bg-gray-50">
      <ProjectHero project={sanitizedProject} onRegisterInterest={openModal} onDownloadBrochure={openBrochure} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContactModal isOpen={isOpen} closeModal={closeModal} projectTitle={sanitizedProject.title} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <ProjectOverview project={sanitizedProject} />
            {sanitizedProject.amenities && <ProjectAmenities amenities={sanitizedProject.amenities} />}
            {sanitizedProject.usp && sanitizedProject.usp.length > 0 &&
              <UniqueSellingPoints points={sanitizedProject.usp} onFindOutMore={openModal} />
            }
            {sanitizedProject.videoId && <ProjectVideo videoId={sanitizedProject.videoId} />}
            {sanitizedProject.paymentPlan && sanitizedProject.paymentPlan.length > 0 && <PaymentPlan plan={sanitizedProject.paymentPlan} />}
            {sanitizedProject.floorPlans && sanitizedProject.floorPlans.length > 0 && <FloorPlans plans={sanitizedProject.floorPlans} />}
            {sanitizedProject.location && <ProjectLocation location={sanitizedProject.location} nearbyPlaces={sanitizedProject.nearbyPlaces} />}

            {sanitizedProject.faqs && <FAQ faqs={sanitizedProject.faqs} />}
            <InvestmentCalculator price={sanitizedProject.price} onGetAnalysis={openModal} />

            {/* <div className="bg-white p-6 rounded-lg shadow-md my-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Brochure</h2>
              <p className="text-gray-600 mb-4">
                {brochureProp
                  ? `Download our comprehensive project brochure for detailed information about ${sanitizedProject.title}.`
                  : 'Brochure not currently available. Please contact us for more information.'
                }
              </p>
              <BrochureDownload
                projectTitle={sanitizedProject.title}
                brochureUrl={brochureProp}
                onContactRequest={openModal}
                isOpen={isBrochureOpen}
                onClose={closeBrochure}
              />
            </div> */}

            <div className="relative rounded-lg overflow-hidden shadow-lg my-12">
              <div className="absolute inset-0 z-0">
                {/* Only render Image if src is provided */}
                <Image
                  src="/images/contact-bg.jpg" // You might want to replace this with an actual image path
                  alt="Register your interest background"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
              </div>
              <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <h2 className="text-4xl font-bold">Don't Miss Out!</h2>
                  <p className="mt-4 text-lg text-gray-200">Register your interest today to receive exclusive access to project details, floor plans, and special launch offers. Our property experts are ready to assist you.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-2xl">
                  <ContactForm projectTitle={sanitizedProject.title} />
                </div>
              </div>
              <DeveloperInfo developer={sanitizedProject.developer} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
