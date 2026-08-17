import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Star,
  Users,
  Video,
  BookOpen,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { PakistaniCity } from '../../types';

export const HeroSection: React.FC = () => {
  const {
    t,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedCityFilter,
    setSelectedCityFilter,
    setAuthModalOpen,
    setAuthDefaultRole
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localCity, setLocalCity] = useState(selectedCityFilter);
  const [tuitionMode, setTuitionMode] = useState<'all' | 'online' | 'in_person'>('all');

  const popularPills = [
    'O/A Level Physics',
    'MDCAT Biology',
    'Cambridge Mathematics',
    'IELTS 7.5+',
    'Full-Stack React & AI',
    'Quran with Tajweed',
    'ACCA Accounting'
  ];

  const cities: string[] = [
    'All',
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setSelectedCityFilter(localCity);
    setCurrentPage('find-tutors');
  };

  const handlePillClick = (subject: string) => {
    setSearchQuery(subject);
    setCurrentPage('find-tutors');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/40 via-teal-100/30 to-transparent dark:from-emerald-950/20 dark:via-teal-950/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-700/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Pakistan’s #1 CNIC & Degree Verified Tutoring Network</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Find the Best <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-300/60 decoration-wavy decoration-2">Verified Tutors</span> in Pakistan
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Personalized 1-on-1 online & home tutoring for Matric, O/A Levels, MDCAT, ECAT, Languages, and High-Income Skills. Pay easily via JazzCash, Easypaisa, or Cards.
          </p>

          {/* Search Box Card */}
          <div className="pt-4 pb-2">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-2 items-center"
            >
              {/* Search text input */}
              <div className="flex-1 flex items-center gap-2.5 px-3 py-2 w-full">
                <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                <input
                  type="text"
                  placeholder="Subject, topic, or tutor name (e.g. Physics, MDCAT, Salman)..."
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700" />

              {/* City selector */}
              <div className="flex items-center gap-2 px-3 py-2 w-full md:w-48">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  value={localCity}
                  onChange={e => setLocalCity(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-transparent text-slate-800 dark:text-slate-200 focus:outline-hidden cursor-pointer"
                >
                  <option value="All">All Pakistan</option>
                  {cities.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c} className="dark:bg-slate-800">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit search button */}
              <button
                type="submit"
                id="btn-hero-search-submit"
                className="w-full md:w-auto px-6 py-3 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Find Tutors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Popular Subject Quick Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-4 text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Popular:</span>
              {popularPills.map(pill => (
                <button
                  key={pill}
                  onClick={() => handlePillClick(pill)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 text-slate-600 dark:text-slate-300 text-[11px] font-medium transition-all"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Action CTA Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setAuthDefaultRole('student');
                setAuthModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Book a Free Trial Session</span>
            </button>

            <button
              onClick={() => {
                setAuthDefaultRole('tutor');
                setAuthModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-50 dark:bg-slate-800 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-slate-700 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Become a Tutor & Earn in PKR</span>
            </button>
          </div>

          {/* Live Platform Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-slate-200 dark:border-slate-800 mt-8">
            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">5,400+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Tutors</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">45,000+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Students</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">128,000+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Classes Completed</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-500 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>4.92 / 5.0</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Parent & Student Trust</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
