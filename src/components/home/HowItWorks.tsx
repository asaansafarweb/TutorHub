import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  CalendarCheck,
  Video,
  CreditCard,
  UserCheck,
  DollarSign,
  Laptop,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [tab, setTab] = useState<'students' | 'tutors'>('students');
  const { setCurrentPage, setAuthModalOpen, setAuthDefaultRole } = useApp();

  const studentSteps = [
    {
      number: '01',
      icon: <Search className="w-6 h-6 text-emerald-600" />,
      title: 'Search & Compare Pakistani Tutors',
      description: 'Filter by Cambridge O/A Levels, Matric, MDCAT, city (Lahore, Karachi, Islamabad), budget in PKR, and verified CNIC badges.'
    },
    {
      number: '02',
      icon: <CreditCard className="w-6 h-6 text-emerald-600" />,
      title: 'Book Trial or Regular Class',
      description: 'Pick convenient dates and slots. Pay effortlessly with JazzCash, Easypaisa, 1Link Bank Transfer, or Debit/Credit Cards.'
    },
    {
      number: '03',
      icon: <Video className="w-6 h-6 text-emerald-600" />,
      title: 'Learn in Interactive Virtual Classroom',
      description: 'Join real-time video sessions with collaborative digital whiteboard, past paper screen sharing, attendance, and instant notes.'
    }
  ];

  const tutorSteps = [
    {
      number: '01',
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Register & Upload CNIC / Degrees',
      description: 'Submit your national ID (CNIC), university degrees (LUMS, NUST, KEMU, IBA), and teaching credentials for quick verification.'
    },
    {
      number: '02',
      icon: <Laptop className="w-6 h-6 text-emerald-600" />,
      title: 'Set Subjects, Rates (PKR) & Schedule',
      description: 'Define your hourly fee, add subject offerings, and set your weekly availability slots with complete control.'
    },
    {
      number: '03',
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      title: 'Teach Students & Withdraw Directly',
      description: 'Conduct classes online or at home. Withdraw your cleared earnings instantly to your JazzCash, Easypaisa, or Pakistani bank account.'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How TutorHub Pakistan Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Whether you are a student striving for top grades or an educator wanting to build a sustainable online tutoring career.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mt-4">
            <button
              onClick={() => setTab('students')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'students'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              🎓 For Students & Parents
            </button>
            <button
              onClick={() => setTab('tutors')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                tab === 'tutors'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              👨‍🏫 For Tutors & Teachers
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {(tab === 'students' ? studentSteps : tutorSteps).map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 relative space-y-4 hover:border-emerald-500 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-2xl font-black text-slate-300 dark:text-slate-700">
                  {step.number}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-10 text-center">
          {tab === 'students' ? (
            <button
              onClick={() => setCurrentPage('find-tutors')}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all inline-flex items-center gap-2"
            >
              <span>Search Available Tutors Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthDefaultRole('tutor');
                setAuthModalOpen(true);
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all inline-flex items-center gap-2"
            >
              <span>Join as Tutor & Start Earning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
