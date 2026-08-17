import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Video,
  BookOpen,
  FileText,
  Heart,
  CreditCard,
  User,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Search
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    tutors,
    favoriteTutors,
    studyMaterials,
    assignments,
    submitAssignment,
    requestRefund,
    setCurrentPage,
    setActiveClassroomId,
    openBookingForTutor,
    updateCurrentUserProfile
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'classes' | 'assignments' | 'materials' | 'favorites' | 'payments' | 'settings'
  >('classes');

  // Submit Assignment State
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState('https://drive.google.com/file/d/student_homework_solution.pdf');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [assignmentSubmittedSuccess, setAssignmentSubmittedSuccess] = useState(false);

  // Refund modal state
  const [refundBookingId, setRefundBookingId] = useState<string | null>(null);
  const [refundReason, setRefundReason] = useState('Scheduling conflict');
  const [refundSuccess, setRefundSuccess] = useState(false);

  // Edit Profile State
  const [name, setName] = useState(currentUser?.name || 'Ayesha Khan');
  const [city, setCity] = useState(currentUser?.city || 'Islamabad');
  const [phone, setPhone] = useState(currentUser?.phone || '+92 334 9876543');
  const [educationLevel, setEducationLevel] = useState(currentUser?.educationLevel || 'A Levels');
  const [learningGoals, setLearningGoals] = useState(
    currentUser?.learningGoals || ['Score A* in Cambridge CAIE Physics', 'MDCAT Medical Prep']
  );
  const [profileSaved, setProfileSaved] = useState(false);

  const studentBookings = bookings.filter(b => b.studentId === currentUser?.id || b.studentEmail === currentUser?.email);

  const handleLaunchClass = (booking: any) => {
    setActiveClassroomId(booking.classRoomId || 'room-live');
    setCurrentPage('live-classroom');
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignmentId) return;
    submitAssignment(selectedAssignmentId, submissionUrl, submissionNotes);
    setAssignmentSubmittedSuccess(true);
    setTimeout(() => {
      setAssignmentSubmittedSuccess(false);
      setSelectedAssignmentId(null);
    }, 1500);
  };

  const handleRequestRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundBookingId) return;
    requestRefund(refundBookingId, refundReason);
    setRefundSuccess(true);
    setTimeout(() => {
      setRefundSuccess(false);
      setRefundBookingId(null);
    }, 1500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name,
      city: city as any,
      phone,
      educationLevel,
      learningGoals
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Welcome Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-emerald-500/30"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Welcome back, {currentUser?.name}! 🎓
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Student
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentUser?.city} • {currentUser?.educationLevel || 'A-Levels'} • Enrolled in 3 Subjects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{studentBookings.length}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Total Classes</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{assignments.length}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Assignments</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{favoriteTutors.length}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Saved Tutors</div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'classes', label: 'My Classes & Schedule', icon: <Calendar className="w-4 h-4" /> },
            { id: 'assignments', label: `Assignments (${assignments.length})`, icon: <FileText className="w-4 h-4" /> },
            { id: 'materials', label: 'Study Notes & Sheets', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'favorites', label: `Saved Tutors (${favoriteTutors.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'payments', label: 'Payment Invoices', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'settings', label: 'Account Profile', icon: <User className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: CLASSES */}
        {activeTab === 'classes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Scheduled Sessions</h2>
              <button
                onClick={() => setCurrentPage('find-tutors')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                + Book New Tutor Class
              </button>
            </div>

            {studentBookings.length === 0 ? (
              <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Classes Booked Yet</h3>
                <p className="text-xs text-slate-500">
                  Search top verified Pakistani tutors and book a free trial session.
                </p>
                <button
                  onClick={() => setCurrentPage('find-tutors')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Find Tutors
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentBookings.map(b => (
                  <div
                    key={b.id}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.tutorAvatar}
                            alt={b.tutorName}
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-emerald-500/30"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.tutorName}</h4>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{b.subjectName}</p>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {b.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Date: <strong>{b.date}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Time: <strong>{b.timeSlot} (PST)</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Fee: Rs. <strong>{b.amountPKR.toLocaleString()}</strong> ({b.paymentMethod.toUpperCase()})</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => handleLaunchClass(b)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Live Classroom</span>
                      </button>

                      <button
                        onClick={() => setRefundBookingId(b.id)}
                        className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-semibold"
                      >
                        Refund / Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Homework & Weekly Assignments</h2>

            <div className="space-y-3">
              {assignments.map(asg => (
                <div
                  key={asg.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{asg.title}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            asg.status === 'graded'
                              ? 'bg-emerald-100 text-emerald-800'
                              : asg.status === 'submitted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {asg.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {asg.subject} • Assigned by {asg.tutorName} • Due: <strong>{asg.dueDate}</strong>
                      </p>
                    </div>

                    {asg.grade && (
                      <div className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold px-3 py-1 rounded-xl text-xs">
                        Grade: {asg.grade}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    {asg.description}
                  </p>

                  {asg.feedback && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                      <strong>Tutor Feedback:</strong> {asg.feedback}
                    </div>
                  )}

                  {asg.status === 'pending' && (
                    <div>
                      {selectedAssignmentId === asg.id ? (
                        <form onSubmit={handleAssignmentSubmit} className="space-y-3 pt-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Solution PDF / Google Drive / GitHub Link
                            </label>
                            <input
                              type="url"
                              required
                              value={submissionUrl}
                              onChange={e => setSubmissionUrl(e.target.value)}
                              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Student Notes (Optional)
                            </label>
                            <textarea
                              rows={2}
                              value={submissionNotes}
                              onChange={e => setSubmissionNotes(e.target.value)}
                              placeholder="e.g. Solved question 3 with alternate derivation..."
                              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedAssignmentId(null)}
                              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-xs"
                            >
                              Confirm Homework Submission
                            </button>
                          </div>
                        </form>
                      ) : (
                        <button
                          onClick={() => setSelectedAssignmentId(asg.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Submit Solution</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: STUDY MATERIALS */}
        {activeTab === 'materials' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Downloadable Study Notes & Past Paper Derivations</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyMaterials.map(mat => (
                <div
                  key={mat.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                        {mat.fileFormat} • {mat.fileSize}
                      </span>
                      <span className="text-[10px] text-slate-400">{mat.downloadsCount} downloads</span>
                    </div>

                    <h3 className="font-bold text-xs text-slate-900 dark:text-white pt-1">{mat.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{mat.description}</p>
                  </div>

                  <a
                    href={mat.fileUrl}
                    download
                    onClick={e => {
                      e.preventDefault();
                      alert(`Downloading: "${mat.title}" (${mat.fileSize})`);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FAVORITE TUTORS */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Saved / Favorite Tutors</h2>

            {favoriteTutors.length === 0 ? (
              <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <Heart className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Favorite Tutors Saved</h3>
                <p className="text-xs text-slate-500">
                  Click the heart icon on any tutor profile to easily access and rebook them later.
                </p>
                <button
                  onClick={() => setCurrentPage('find-tutors')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Browse Tutors
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tutors
                  .filter(t => favoriteTutors.includes(t.id))
                  .map(tutor => (
                    <div
                      key={tutor.id}
                      className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={tutor.avatar}
                            alt={tutor.name}
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-emerald-500"
                          />
                          <div>
                            <h3 className="font-bold text-xs text-slate-900 dark:text-white">{tutor.name}</h3>
                            <p className="text-[11px] text-slate-500">{tutor.city} • {tutor.experienceYears} yrs exp</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{tutor.headline}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-600">Rs. {tutor.hourlyRatePKR.toLocaleString()}/hr</span>
                        <button
                          onClick={() => openBookingForTutor(tutor)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Transaction History & Invoices</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Invoice ID</th>
                    <th className="pb-3">Tutor / Subject</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Gateway</th>
                    <th className="pb-3">Amount (PKR)</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {studentBookings.map(b => (
                    <tr key={b.id}>
                      <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">#{b.id.toUpperCase()}</td>
                      <td className="py-3">
                        <div className="font-bold text-slate-900 dark:text-white">{b.tutorName}</div>
                        <div className="text-[10px] text-slate-400">{b.subjectName}</div>
                      </td>
                      <td className="py-3 text-slate-500">{b.date}</td>
                      <td className="py-3 uppercase font-bold text-slate-700 dark:text-slate-300">{b.paymentMethod}</td>
                      <td className="py-3 font-extrabold text-emerald-600">Rs. {b.amountPKR.toLocaleString()}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          PAID
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => alert(`Invoice #${b.id.toUpperCase()} downloaded!`)}
                          className="text-emerald-600 font-bold hover:underline"
                        >
                          PDF Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS / EDIT PROFILE */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 max-w-2xl space-y-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Edit Student Profile</h2>

            {profileSaved && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">City in Pakistan</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Education Level</label>
                  <select
                    value={educationLevel}
                    onChange={e => setEducationLevel(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Matric / SSC">Matric / SSC</option>
                    <option value="FSc Pre-Medical / Pre-Engineering">FSc Pre-Medical / Pre-Engineering</option>
                    <option value="O Levels (Cambridge/Edexcel)">O Levels (Cambridge/Edexcel)</option>
                    <option value="A Levels (Cambridge/Edexcel)">A Levels (Cambridge/Edexcel)</option>
                    <option value="MDCAT / ECAT Aspirant">MDCAT / ECAT Aspirant</option>
                    <option value="University Undergraduate">University Undergraduate</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all"
              >
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Refund Modal */}
        {refundBookingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              {refundSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold">Refund Request Submitted!</h3>
                  <p className="text-xs text-slate-500">
                    Your request has been logged. Funds will be reversed to your account within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestRefundSubmit} className="space-y-4">
                  <h3 className="text-base font-bold">Request Refund / Reschedule</h3>
                  <p className="text-xs text-slate-500">
                    Booking Reference: #{refundBookingId.toUpperCase()}
                  </p>

                  <div>
                    <label className="block text-xs font-bold mb-1">Reason for Refund</label>
                    <select
                      value={refundReason}
                      onChange={e => setRefundReason(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="Scheduling conflict">Scheduling conflict with school/college</option>
                      <option value="Tutor did not join">Tutor did not attend</option>
                      <option value="Technical connectivity issue">Technical connectivity issue</option>
                      <option value="Syllabus not aligned">Syllabus not aligned</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setRefundBookingId(null)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md"
                    >
                      Submit Refund Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
