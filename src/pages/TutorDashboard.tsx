import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  DollarSign,
  Calendar,
  Clock,
  Video,
  BookOpen,
  FileText,
  Upload,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Plus,
  Trash2
} from 'lucide-react';

export const TutorDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    tutors,
    assignments,
    createAssignment,
    studyMaterials,
    uploadStudyMaterial,
    setCurrentPage,
    setActiveClassroomId
  } = useApp();

  const addAssignment = createAssignment;
  const addStudyMaterial = uploadStudyMaterial;

  const currentTutor = tutors.find(t => t.email === currentUser?.email) || tutors[0];

  const [activeTab, setActiveTab] = useState<
    'overview' | 'classes' | 'assignments' | 'materials' | 'schedule' | 'verification'
  >('overview');

  // Withdrawal modal state
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('25000');
  const [withdrawMethod, setWithdrawMethod] = useState<'jazzcash' | 'easypaisa' | 'bank'>('jazzcash');
  const [withdrawAccount, setWithdrawAccount] = useState('0300 1234567');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Add Assignment state
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [asgTitle, setAsgTitle] = useState('');
  const [asgSubject, setAsgSubject] = useState(currentTutor?.subjects[0]?.subjectName || 'Physics');
  const [asgStudent, setAsgStudent] = useState('Ayesha Khan');
  const [asgDue, setAsgDue] = useState('2026-08-25');
  const [asgDesc, setAsgDesc] = useState('');

  // Add Study Material state
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matSubject, setMatSubject] = useState(currentTutor?.subjects[0]?.subjectName || 'Physics');
  const [matDesc, setMatDesc] = useState('');
  const [matFormat, setMatFormat] = useState('PDF');
  const [matSize, setMatSize] = useState('2.4 MB');

  // Tutor's scheduled bookings
  const tutorBookings = bookings.filter(b => b.tutorId === currentTutor?.id);

  const handleLaunchClass = (booking: any) => {
    setActiveClassroomId(booking.classRoomId || 'room-live');
    setCurrentPage('live-classroom');
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    addAssignment({
      tutorId: currentTutor.id,
      tutorName: currentTutor.name,
      studentId: 'stud-ayesha',
      studentName: asgStudent,
      title: asgTitle,
      description: asgDesc,
      subject: asgSubject,
      dueDate: asgDue
    });
    setShowAddAssignment(false);
    setAsgTitle('');
    setAsgDesc('');
    alert('Assignment successfully assigned to student!');
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    addStudyMaterial({
      tutorId: currentTutor.id,
      tutorName: currentTutor.name,
      title: matTitle,
      subject: matSubject,
      description: matDesc,
      fileUrl: '#',
      fileSize: matSize,
      fileFormat: matFormat
    });
    setShowAddMaterial(false);
    setMatTitle('');
    setMatDesc('');
    alert('Study material uploaded for students!');
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setWithdrawModalOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentTutor.avatar}
                alt={currentTutor.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-emerald-500/30"
              />
              {currentTutor.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Tutor Portal: {currentTutor.name}
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Verified Educator
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentTutor.headline} • Base Rate: <strong>Rs. {currentTutor.hourlyRatePKR.toLocaleString()}</strong>/hr
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setWithdrawModalOpen(true)}
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <DollarSign className="w-4 h-4" />
              <span>Withdraw to JazzCash / Bank</span>
            </button>
          </div>
        </div>

        {/* Top Earnings & Performance Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Lifetime Earnings</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Rs. 185,000
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18% from last month</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Available for Payout</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              Rs. 42,500
            </div>
            <div className="text-[11px] text-slate-500">Ready to transfer via 1Link</div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Students Taught</span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {currentTutor.totalStudentsTaught}
            </div>
            <div className="text-[11px] text-slate-500">4 active regular batches</div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Rating & Reviews</span>
            <div className="text-xl sm:text-2xl font-black text-amber-500">
              {currentTutor.rating} ★
            </div>
            <div className="text-[11px] text-slate-500">{currentTutor.totalReviews} verified reviews</div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'classes', label: `Upcoming Classes (${tutorBookings.length})`, icon: <Calendar className="w-4 h-4" /> },
            { id: 'assignments', label: 'Homework & Assignments', icon: <FileText className="w-4 h-4" /> },
            { id: 'materials', label: 'Study Notes & Sheets', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'schedule', label: 'Weekly Availability Slots', icon: <Clock className="w-4 h-4" /> },
            { id: 'verification', label: 'CNIC / Degree Verification', icon: <ShieldCheck className="w-4 h-4" /> }
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

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Upcoming Classes Today</h3>
                  <button
                    onClick={() => setActiveTab('classes')}
                    className="text-xs text-emerald-600 font-bold hover:underline"
                  >
                    View all
                  </button>
                </div>

                <div className="space-y-3">
                  {tutorBookings.slice(0, 2).map(b => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={b.studentAvatar}
                          alt={b.studentName}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white">{b.studentName}</h4>
                          <p className="text-[11px] text-slate-500">{b.subjectName} • {b.date} at {b.timeSlot}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleLaunchClass(b)}
                        className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Start Class</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Verification Status</h3>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>CNIC & Degrees Verified</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Your profile carries the verified badge, giving you 3.5x more student booking requests across Pakistan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLASSES */}
        {activeTab === 'classes' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Scheduled Student Sessions</h2>
            <div className="space-y-3">
              {tutorBookings.map(b => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={b.studentAvatar}
                      alt={b.studentName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-emerald-500"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{b.studentName}</h4>
                      <p className="text-xs text-emerald-600 font-semibold">{b.subjectName}</p>
                      <p className="text-xs text-slate-500">
                        {b.date} • {b.timeSlot} PST • Fee: Rs. {b.amountPKR.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchClass(b)}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Launch Virtual Classroom</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Student Homework & Assignments</h2>
              <button
                onClick={() => setShowAddAssignment(!showAddAssignment)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Assign New Homework</span>
              </button>
            </div>

            {showAddAssignment && (
              <form
                onSubmit={handleCreateAssignment}
                className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 space-y-3"
              >
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">Create New Homework Task</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Task Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Electromagnetic Induction Past Paper Drills"
                      value={asgTitle}
                      onChange={e => setAsgTitle(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Student</label>
                    <select
                      value={asgStudent}
                      onChange={e => setAsgStudent(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <option value="Ayesha Khan">Ayesha Khan (O/A Level)</option>
                      <option value="Fatima Tariq">Fatima Tariq (MDCAT)</option>
                      <option value="Hamza Farooq">Hamza Farooq (React & AI)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Due Date</label>
                    <input
                      type="date"
                      required
                      value={asgDue}
                      onChange={e => setAsgDue(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Instructions & Problem Set</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Solve questions 4 to 8 from Cambridge May/June 2023 paper 42..."
                    value={asgDesc}
                    onChange={e => setAsgDesc(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddAssignment(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Publish Assignment
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {assignments.map(asg => (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{asg.title}</h4>
                      <p className="text-[11px] text-slate-500">
                        Assigned to: <strong>{asg.studentName}</strong> • Due: {asg.dueDate}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {asg.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 p-2.5 rounded-xl">
                    {asg.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MATERIALS */}
        {activeTab === 'materials' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Study Materials & Notes Sheets</h2>
              <button
                onClick={() => setShowAddMaterial(!showAddMaterial)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Notes / PDF</span>
              </button>
            </div>

            {showAddMaterial && (
              <form
                onSubmit={handleCreateMaterial}
                className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Physics Formula Sheet"
                      value={matTitle}
                      onChange={e => setMatTitle(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={matSubject}
                      onChange={e => setMatSubject(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={matDesc}
                    onChange={e => setMatDesc(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-slate-200 bg-white dark:bg-slate-800"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMaterial(false)}
                    className="px-4 py-2 rounded-xl border text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Upload Material
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studyMaterials.map(m => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      {m.fileFormat} • {m.fileSize}
                    </span>
                    <span className="text-[10px] text-slate-400">{m.downloadsCount} downloads</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{m.title}</h4>
                  <p className="text-[11px] text-slate-500">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Weekly Availability Time Slots (PST)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTutor.availabilitySchedule.map(sched => (
                <div
                  key={sched.day}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                >
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center justify-between">
                    <span>{sched.day}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
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

        {/* TAB 6: VERIFICATION */}
        {activeTab === 'verification' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Pakistani CNIC & Degree Verification</h2>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
              <div className="font-bold text-emerald-800 dark:text-emerald-300">Identity Status: Fully Verified</div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                National Database (NADRA CNIC) and Higher Education Commission (HEC) degrees confirmed.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between">
                <span>CNIC Number (Masked)</span>
                <span className="font-mono font-bold">35202-*******-1 (Verified)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex justify-between">
                <span>Degree Certificate</span>
                <span className="font-bold text-emerald-600">HEC Attested (Verified)</span>
              </div>
            </div>
          </div>
        )}

        {/* Withdrawal Modal */}
        {withdrawModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              {withdrawSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold">Withdrawal Initiated!</h3>
                  <p className="text-xs text-slate-500">
                    Rs. {Number(withdrawAmount).toLocaleString()} PKR will be transferred to your{' '}
                    {withdrawMethod.toUpperCase()} within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWithdraw} className="space-y-4">
                  <h3 className="text-base font-bold">Withdraw Earnings in Pakistan</h3>

                  <div>
                    <label className="block text-xs font-bold mb-1">Amount to Withdraw (PKR)</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      max={42500}
                      value={withdrawAmount}
                      onChange={e => setWithdrawAmount(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-emerald-600"
                    />
                    <span className="text-[10px] text-slate-400">Available Balance: Rs. 42,500</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">Payout Method</label>
                    <select
                      value={withdrawMethod}
                      onChange={e => setWithdrawMethod(e.target.value as any)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    >
                      <option value="jazzcash">JazzCash Mobile Account</option>
                      <option value="easypaisa">Easypaisa Mobile Wallet</option>
                      <option value="bank">1Link Bank Account (Meezan / HBL / UBL)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      {withdrawMethod === 'bank' ? 'IBAN / Account Number' : 'Mobile Account Number'}
                    </label>
                    <input
                      type="text"
                      required
                      value={withdrawAccount}
                      onChange={e => setWithdrawAccount(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setWithdrawModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                    >
                      Confirm Payout
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
