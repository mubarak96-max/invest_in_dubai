'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Phone, MessageSquare } from 'lucide-react';
import ProjectHero from '@/components/project/ProjectHero';
import ProjectOverview from '@/components/project/ProjectOverview';
import PaymentPlan from '@/components/project/PaymentPlan';
import FloorPlans from '@/components/project/FloorPlans';
import ContactForm from '@/components/project/ContactForm';
import ProjectAmenities from '@/components/project/ProjectAmenities';
import ProjectLocation from '@/components/project/ProjectLocation';
import DeveloperInfo from '@/components/project/DeveloperInfo';
import UniqueSellingPoints from '@/components/project/UniqueSellingPoints';

export default function ProjectPageClient({ project }) {
  const contactFormRef = useRef(null);

  const handleFindOutMore = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50">
      <ProjectHero project={project} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          <ProjectOverview project={project} />
          {project.amenities && <ProjectAmenities amenities={project.amenities} />}
          {project.usp && project.usp.length > 0 && 
            <UniqueSellingPoints points={project.usp} onFindOutMore={handleFindOutMore} />
          }
          {project.paymentPlan && project.paymentPlan.length > 0 && <PaymentPlan plan={project.paymentPlan} />}
          {project.floorPlans && project.floorPlans.length > 0 && <FloorPlans plans={project.floorPlans} />}
          {project.location && <ProjectLocation location={project.location} nearbyPlaces={project.nearbyPlaces} />}
          <DeveloperInfo developer={project.developer} />
          
          <div ref={contactFormRef} className="relative pt-8 rounded-lg overflow-hidden shadow-lg my-12">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/contact-bg.jpg"
                alt="Register your interest background"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Hook & Buttons */}
                <div className="text-white text-center md:text-left">
                  <h2 className="text-4xl font-bold">Don't Miss Out!</h2>
                  <p className="mt-4 text-lg text-gray-200">Register your interest today to receive exclusive access to project details, floor plans, and special launch offers. Our property experts are ready to assist you.</p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <a href="tel:+971000000000" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Us
                    </a>
                    <a href="https://wa.me/971000000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition-colors">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-2xl">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
