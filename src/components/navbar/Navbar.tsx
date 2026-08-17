import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Search,
  Globe,
  Sun,
  Moon,
  Bell,
  Heart,
  Video,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Shield,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  Database
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    currentUser,
    activeRole,
    switchUserRole,
    logoutUser,
    setAuthModalOpen,
    setAuthDefaultRole,
    language,
    setLanguage,
    t,
    isDarkMode,
    toggleDarkMode,
    unreadNotificationsCount,
    notifications,
    markAllNotificationsRead,
    isTutorFavorite,
    tutors,
    setActiveClassroomId
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const favoriteTutorsList = tutors.filter(tutor => isTutorFavorite(tutor.id));

  const handleRoleSelect = (role: 'student' | 'tutor' | 'admin' | 'guest') => {
    switchUserRole(role);
    setRoleMenuOpen(false);
    if (role === 'student') setCurrentPage('student-dashboard');
    else if (role === 'tutor') setCurrentPage('tutor-dashboard');
    else if (role === 'admin') setCurrentPage('admin-dashboard');
    else setCurrentPage('home');
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors duration-200 ${isDarkMode ? 'bg-slate-900 border-b border-slate-800 text-white' : 'bg-white border-b border-emerald-100 text-slate-900'} shadow-xs`}>
      {/* Top Demo Banner / Quick Role Switcher */}
      <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-emerald-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-emerald-200">🇵🇰 TutorHub Pakistan Live Demo:</span>
          <span className="hidden sm:inline text-emerald-300">Switch persona instantly to test Student, Tutor & Admin dashboards:</span>
        </div>
        
        <div className="flex items-center gap-1.5 my-0.5">
          <button
            id="role-btn-student"
            onClick={() => handleRoleSelect('student')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
              activeRole === 'student'
                ? 'bg-emerald-400 text-slate-950 shadow-xs'
                : 'bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700'
            }`}
          >
            🎓 Student (Ayesha)
          </button>
          <button
            id="role-btn-tutor"
            onClick={() => handleRoleSelect('tutor')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
              activeRole === 'tutor'
                ? 'bg-emerald-400 text-slate-950 shadow-xs'
                : 'bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700'
            }`}
          >
            👨‍🏫 Tutor (Prof. Salman)
          </button>
          <button
            id="role-btn-admin"
            onClick={() => handleRoleSelect('admin')}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
              activeRole === 'admin'
                ? 'bg-emerald-400 text-slate-950 shadow-xs'
                : 'bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700'
            }`}
          >
            🛡️ Admin Desk
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-emerald-700 dark:text-emerald-400">
                  TutorHub
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700">
                  PAKISTAN
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-none">
                {language === 'ur' ? 'پاکستان کا بہترین تدریسی پلیٹ فارم' : 'Verified Online & Home Tutors'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-find-tutors"
              onClick={() => setCurrentPage('find-tutors')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'find-tutors'
                  ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <Search className="w-4 h-4 inline-block mr-1.5" />
              {t.findTutors}
            </button>

            <button
              id="nav-pricing"
              onClick={() => setCurrentPage('pricing')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'pricing'
                  ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              {t.pricing}
            </button>

            <button
              id="nav-blog"
              onClick={() => setCurrentPage('blog')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'blog' || currentPage === 'blog-detail'
                  ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <BookOpen className="w-4 h-4 inline-block mr-1.5" />
              {t.blog}
            </button>

            {/* Quick Live Classroom Simulator */}
            <button
              id="nav-live-classroom"
              onClick={() => {
                setActiveClassroomId('room-demo-live');
                setCurrentPage('live-classroom');
              }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 border border-emerald-300/60 dark:border-emerald-700/60 transition-all flex items-center gap-1.5"
            >
              <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>{t.onlineClassroom}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </button>

            {/* Database Schema & API Docs */}
            <button
              id="nav-db-schema"
              onClick={() => setCurrentPage('db-schema')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                currentPage === 'db-schema'
                  ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>DB & API</span>
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              id="btn-toggle-language"
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-slate-700 dark:text-slate-200 transition-colors"
              title="Switch English / اردو"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="btn-toggle-darkmode"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                id="btn-notifications-toggle"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</span>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-emerald-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 mt-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications yet</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          className={`py-2.5 px-2 rounded-lg text-xs transition-colors ${
                            !n.isRead ? 'bg-emerald-50/60 dark:bg-emerald-950/30' : ''
                          }`}
                        >
                          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.createdAt}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Portal Direct Button or Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="btn-user-profile-menu"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-emerald-200 dark:border-slate-700 bg-emerald-50/50 dark:bg-slate-800 hover:bg-emerald-100/70 transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500"
                  />
                  <div className="hidden sm:block text-left">
                    <span className="block text-xs font-semibold leading-tight text-slate-900 dark:text-slate-100 truncate max-w-[100px]">
                      {currentUser.name}
                    </span>
                    <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium capitalize">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50">
                    <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                        {currentUser.role.toUpperCase()} PORTAL
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'student' && (
                        <button
                          onClick={() => {
                            setCurrentPage('student-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                        >
                          <GraduationCap className="w-4 h-4 text-emerald-600" />
                          Student Dashboard
                        </button>
                      )}

                      {currentUser.role === 'tutor' && (
                        <button
                          onClick={() => {
                            setCurrentPage('tutor-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                        >
                          <BookOpen className="w-4 h-4 text-emerald-600" />
                          Tutor Dashboard
                        </button>
                      )}

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setCurrentPage('admin-dashboard');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg flex items-center gap-2"
                        >
                          <Shield className="w-4 h-4 text-emerald-600" />
                          Admin Console
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logoutUser();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="btn-login-modal"
                  onClick={() => {
                    setAuthDefaultRole('student');
                    setAuthModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {t.login}
                </button>
                <button
                  id="btn-register-tutor-modal"
                  onClick={() => {
                    setAuthDefaultRole('tutor');
                    setAuthModalOpen(true);
                  }}
                  className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-600/30 transition-all items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.becomeTutor}
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 bg-white dark:bg-slate-900 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                setCurrentPage('find-tutors');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              {t.findTutors}
            </button>
            <button
              onClick={() => {
                setActiveClassroomId('room-demo-live');
                setCurrentPage('live-classroom');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-emerald-600" />
              {t.onlineClassroom}
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                setCurrentPage('student-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🎓 Student Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentPage('tutor-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              👨‍🏫 Tutor Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentPage('admin-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🛡️ Admin Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentPage('pricing');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              💳 Pricing & Fees (PKR)
            </button>
            <button
              onClick={() => {
                setCurrentPage('blog');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              📖 Blog & Study Guides
            </button>
            <button
              onClick={() => {
                setCurrentPage('db-schema');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              🗄️ Database Schema & API
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setAuthDefaultRole('student');
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthDefaultRole('tutor');
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              Become Tutor
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
