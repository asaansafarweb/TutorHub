import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Video,
  Award,
  BookOpen,
  GraduationCap,
  Heart,
  Share2,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  Languages,
  MessageCircle,
  Play
} from 'lucide-react';

export const TutorDetailPage: React.FC = () => {
  const {
    selectedTutorId,
    tutors,
    setCurrentPage,
    openBookingForTutor,
    toggleFavoriteTutor,
    isTutorFavorite
  } = useApp();

  const [activeTab, setActiveTab] = useState<'about' | 'subjects' | 'schedule' | 'reviews'>('about');

  const tutor = tutors.find(t => t.id === selectedTutorId) || tutors[0];

  if (!tutor) {
    return (
      <div className="min-h-screen py-16 text-center">
        <p>Tutor not found.</p>
        <button
          onClick={() => setCurrentPage('find-tutors')}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Back to Tutors
        </button>
      </div>
    );
  }

  const isFav = isTutorFavorite(tutor.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Link */}
        <button
          onClick={() => setCurrentPage('find-tutors')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tutors Search</span>
        </button>

        {/* Top Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="relative">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-emerald-500/20"
                />
                {tutor.isVerified && (
                  <div
                    className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-full shadow-md"
                    title="CNIC & University Verified"
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {tutor.name}
                  </h1>
                  {tutor.isVerified && (
                    <span className="text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified CNIC & Degree</span>
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {tutor.headline}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {tutor.city}, Pakistan
                  </span>
                  <span>•</span>
                  <span>{tutor.experienceYears} Years Teaching Experience</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {tutor.rating} ({tutor.totalReviews} student reviews)
                  </span>
                  <span>•</span>
                  <span>👥 {tutor.totalStudentsTaught} Students Taught</span>
                </div>

                {/* Languages spoken */}
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-300">
                  <Languages className="w-4 h-4 text-emerald-600" />
                  <span>Languages: {tutor.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Booking Box */}
            <div className="w-full md:w-72 bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500 uppercase font-semibold">Standard Fee</span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Rs. {tutor.hourlyRatePKR.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400">/hr</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Trial Offer: </span>
                <span className="text-slate-600 dark:text-slate-300">
                  {tutor.trialRatePKR === 0 ? 'Free 25-Min Trial Session' : `Rs. ${tutor.trialRatePKR} (25-Min)`}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => openBookingForTutor(tutor)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Class / Trial</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFavoriteTutor(tutor.id)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      isFav
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    <span>{isFav ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Tutor profile link copied to clipboard!');
                    }}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mt-8 pt-2">
            {[
              { id: 'about', label: 'About & Qualifications' },
              { id: 'subjects', label: `Subjects & Rates (${tutor.subjects.length})` },
              { id: 'schedule', label: 'Availability Calendar' },
              { id: 'reviews', label: `Student Reviews (${tutor.reviews.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                {/* Bio */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Biography & Teaching Approach</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {tutor.bio}
                  </p>
                </div>

                {/* Video Demo Box */}
                {tutor.videoIntroUrl && (
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Video className="w-4 h-4 text-emerald-600" />
                      <span>Video Introduction & Sample Lecture</span>
                    </h3>
                    <div className="relative aspect-video rounded-2xl bg-slate-900 overflow-hidden flex items-center justify-center group cursor-pointer">
                      <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                        alt="Video Preview"
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>
                      <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-lg text-xs text-white">
                        Teaching Demonstration (2:45)
                      </div>
                    </div>
                  </div>
                )}

                {/* Education & Qualifications */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                    <span>Education & Degrees</span>
                  </h3>

                  <div className="space-y-3">
                    {tutor.education.map(edu => (
                      <div
                        key={edu.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {edu.degree}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300">{edu.institution}</p>
                          <p className="text-[11px] text-slate-400">Class of {edu.year}</p>
                        </div>
                        {edu.verified && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {tutor.certifications.length > 0 && (
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      <span>Professional Accreditations</span>
                    </h3>

                    <div className="space-y-3">
                      {tutor.certifications.map(cert => (
                        <div
                          key={cert.id}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start justify-between"
                        >
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white">{cert.title}</h4>
                            <p className="text-xs text-slate-500">{cert.issuer} • {cert.year}</p>
                          </div>
                          {cert.verified && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUBJECTS TAB */}
            {activeTab === 'subjects' && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Subject Offerings & Rates</h3>
                <div className="space-y-3">
                  {tutor.subjects.map(s => (
                    <div
                      key={s.subjectId}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {s.subjectName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {s.category} • {s.level} Level
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                          Rs. {s.hourlyRatePKR.toLocaleString()}/hr
                        </div>
                        <button
                          onClick={() => openBookingForTutor(tutor)}
                          className="mt-1 text-[11px] font-bold text-emerald-600 hover:underline"
                        >
                          Book this subject →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCHEDULE TAB */}
            {activeTab === 'schedule' && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Weekly Availability (PST Time)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tutor.availabilitySchedule.map(sched => (
                    <div
                      key={sched.day}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{sched.day}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {sched.timeSlots.map((slot, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Verified Student Reviews ({tutor.reviews.length})
                  </h3>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-slate-900 dark:text-white">{tutor.rating} / 5.0</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {tutor.reviews.map(rev => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.studentAvatar}
                            alt={rev.studentName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                              {rev.studentName}
                            </h4>
                            <p className="text-[10px] text-slate-400">{rev.subject} • {rev.date}</p>
                          </div>
                        </div>

                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Trust & Guarantee Sidebar */}
          <div className="space-y-5">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-3xl border border-emerald-200 dark:border-emerald-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>TutorHub 100% Student Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                If you are not 100% satisfied with your first session, we will issue a full refund or provide a free replacement tutor of your choice.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">Class Highlights</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>HD 1-on-1 Interactive Whiteboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Past Paper derivations & live worksheets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Downloadable PDF class notes & recordings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Payment via JazzCash, Easypaisa & Cards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
