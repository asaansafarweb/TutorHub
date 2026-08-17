import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { BookingModal } from './components/tutors/BookingModal';
import { HomePage } from './pages/HomePage';
import { FindTutorsPage } from './pages/FindTutorsPage';
import { TutorDetailPage } from './pages/TutorDetailPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TutorDashboard } from './pages/TutorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { VirtualClassroom } from './components/classroom/VirtualClassroom';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { TermsPage, PrivacyPage, DbSchemaViewer } from './pages/InfoPages';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';

const MainAppContent: React.FC = () => {
  const { currentPage, isDarkMode, language } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'find-tutors':
        return <FindTutorsPage />;
      case 'tutor-detail':
        return <TutorDetailPage />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'tutor-dashboard':
        return <TutorDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'live-classroom':
        return <VirtualClassroom />;
      case 'pricing':
        return <PricingPage />;
      case 'blog':
      case 'blog-detail':
        return <BlogPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'db-schema':
        return <DbSchemaViewer />;
      case 'faq':
        return (
          <div className="py-12 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
            <FaqSection />
          </div>
        );
      case 'contact':
        return (
          <div className="py-12 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen">
            <ContactSection />
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  const isLiveClassroom = currentPage === 'live-classroom';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F8FAFC] text-slate-800'
      }`}
      dir={language === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Top Navigation */}
      {!isLiveClassroom && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Footer */}
      {!isLiveClassroom && <Footer />}

      {/* Global Modals */}
      <AuthModal />
      <BookingModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
