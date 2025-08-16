'use client';

import { useModal } from '@/hooks/useModal';
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

export default function ProjectPageClient({ project }) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="bg-gray-50">
      <ProjectHero project={project} onRegisterInterest={openModal} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContactModal isOpen={isOpen} closeModal={closeModal} projectTitle={project.title} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <ProjectOverview project={project} />
            {project.amenities && <ProjectAmenities amenities={project.amenities} />}
            {project.usp && project.usp.length > 0 && 
              <UniqueSellingPoints points={project.usp} onFindOutMore={openModal} />
            }
            {project.videoId && <ProjectVideo videoId={project.videoId} />}
            {project.paymentPlan && project.paymentPlan.length > 0 && <PaymentPlan plan={project.paymentPlan} />}
            {project.floorPlans && project.floorPlans.length > 0 && <FloorPlans plans={project.floorPlans} />}
            {project.location && <ProjectLocation location={project.location} nearbyPlaces={project.nearbyPlaces} />}
            <DeveloperInfo developer={project.developer} />
            {project.faqs && <FAQ faqs={project.faqs} />}
            <InvestmentCalculator price={project.price} onGetAnalysis={openModal} />

            <div className="relative rounded-lg overflow-hidden shadow-lg my-12">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/contact-bg.jpg"
                  alt="Register your interest background"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black opacity-60"></div>
              </div>
              <div className="relative z-10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <h2 className="text-4xl font-bold">Don't Miss Out!</h2>
                  <p className="mt-4 text-lg text-gray-200">Register your interest today to receive exclusive access to project details, floor plans, and special launch offers. Our property experts are ready to assist you.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-2xl">
                  <ContactForm projectTitle={project.title} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
