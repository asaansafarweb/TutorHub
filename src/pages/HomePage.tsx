import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SubjectCategories } from '../components/home/SubjectCategories';
import { FeaturedTutors } from '../components/home/FeaturedTutors';
import { HowItWorks } from '../components/home/HowItWorks';
import { StudentReviews } from '../components/home/StudentReviews';
import { SuccessStories } from '../components/home/SuccessStories';
import { FaqSection } from '../components/home/FaqSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <SubjectCategories />
      <FeaturedTutors />
      <HowItWorks />
      <StudentReviews />
      <SuccessStories />
      <FaqSection />
      <ContactSection />
    </div>
  );
};
