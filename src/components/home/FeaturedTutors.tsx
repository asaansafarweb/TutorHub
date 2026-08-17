import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Video,
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  CheckCircle2
} from 'lucide-react';
import { TutorProfile } from '../../types';

export const FeaturedTutors: React.FC = () => {
  const {
    tutors,
    setCurrentPage,
    setSelectedTutorId,
    openBookingForTutor,
    toggleFavoriteTutor,
    isTutorFavorite,
    t
  } = useApp();

  const featuredList = tutors.filter(tut => tut.featured || tut.rating >= 4.9).slice(0, 4);

  const handleViewProfile = (tutorId: string) => {
    setSelectedTutorId(tutorId);
    setCurrentPage('tutor-detail');
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Top Rated Educators in Pakistan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Pakistani Tutors & Specialists
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Learn from Cambridge examiners, King Edward doctors, LUMS gold medalists, and FAST coding architects.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('find-tutors')}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 self-start md:self-auto shadow-xs"
          >
            <span>Browse All {tutors.length}+ Tutors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tutors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.map(tutor => {
            const isFav = isTutorFavorite(tutor.id);

            return (
              <div
                key={tutor.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header & Avatar */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="relative">
                        <img
                          src={tutor.avatar}
                          alt={tutor.name}
                          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                        />
                        {tutor.isVerified && (
                          <div
                            className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-sm"
                            title="CNIC & Degree Verified"
                          >
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavoriteTutor(tutor.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isFav
                            ? 'bg-rose-50 border-rose-200 text-rose-500'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500'
                        }`}
                        title={isFav ? 'Remove from favorites' : 'Save tutor'}
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>

                    {/* Tutor Name & City */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <h3
                          onClick={() => handleViewProfile(tutor.id)}
                          className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 cursor-pointer transition-colors line-clamp-1"
                        >
                          {tutor.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {tutor.city}
                        </span>
                        <span>•</span>
                        <span>{tutor.experienceYears} yrs exp</span>
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {tutor.headline}
                    </p>

                    {/* Subject Badges */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {tutor.subjects.slice(0, 2).map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800"
                        >
                          {s.subjectName}
                        </span>
                      ))}
                      {tutor.subjects.length > 2 && (
                        <span className="text-[10px] text-slate-400 px-1 py-0.5">
                          +{tutor.subjects.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating & Stats Strip */}
                  <div className="px-5 py-2.5 bg-slate-50/80 dark:bg-slate-800/50 border-y border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-900 dark:text-white">{tutor.rating}</span>
                      <span className="text-[10px] text-slate-400">({tutor.totalReviews})</span>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      👥 <strong>{tutor.totalStudentsTaught}</strong> students
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & Actions */}
                <div className="p-5 pt-3 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Fee from</span>
                      <div className="text-base font-extrabold text-slate-900 dark:text-white">
                        Rs. {tutor.hourlyRatePKR.toLocaleString()}
                        <span className="text-[10px] font-normal text-slate-500">/hr</span>
                      </div>
                    </div>

                    {tutor.trialRatePKR === 0 ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                        Free Trial
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-full">
                        Trial: Rs.{tutor.trialRatePKR}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleViewProfile(tutor.id)}
                      className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors text-center"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => openBookingForTutor(tutor)}
                      className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs shadow-emerald-600/30 transition-all text-center flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
