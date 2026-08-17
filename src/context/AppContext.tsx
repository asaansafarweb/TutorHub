import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  StudentProfile,
  TutorProfile,
  Booking,
  ChatMessage,
  Assignment,
  StudyMaterial,
  PaymentTransaction,
  WithdrawalRequest,
  AppNotification,
  BlogPost,
  SubjectCategory,
  LanguageCode,
  PlatformReportStats
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_TUTORS,
  INITIAL_STUDENTS,
  INITIAL_ADMIN,
  INITIAL_BOOKINGS,
  INITIAL_MESSAGES,
  INITIAL_ASSIGNMENTS,
  INITIAL_STUDY_MATERIALS,
  INITIAL_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_BLOG_POSTS,
  INITIAL_PLATFORM_STATS
} from '../data/mockData';
import { translations } from '../utils/translations';

export type AppPage = 
  | 'home'
  | 'find-tutors'
  | 'tutor-detail'
  | 'student-dashboard'
  | 'tutor-dashboard'
  | 'admin-dashboard'
  | 'live-classroom'
  | 'blog'
  | 'blog-detail'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'faq'
  | 'help'
  | 'privacy'
  | 'terms'
  | 'db-schema';

interface AppContextType {
  // Navigation & Page state
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
  selectedTutorId: string | null;
  setSelectedTutorId: (id: string | null) => void;
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
  activeClassroomId: string | null;
  setActiveClassroomId: (id: string | null) => void;

  // Role & Auth state
  currentUser: User | StudentProfile | TutorProfile | null;
  activeRole: UserRole | 'guest';
  switchUserRole: (role: UserRole | 'guest') => void;
  loginUser: (user: User) => void;
  logoutUser: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authDefaultRole: 'student' | 'tutor';
  setAuthDefaultRole: (role: 'student' | 'tutor') => void;

  // Language & Theme
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof translations.en;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Core Data Collections
  categories: SubjectCategory[];
  tutors: TutorProfile[];
  students: StudentProfile[];
  bookings: Booking[];
  messages: ChatMessage[];
  assignments: Assignment[];
  studyMaterials: StudyMaterial[];
  transactions: PaymentTransaction[];
  withdrawals: WithdrawalRequest[];
  notifications: AppNotification[];
  blogPosts: BlogPost[];
  platformStats: PlatformReportStats;

  // Booking Modal
  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  bookingTutor: TutorProfile | null;
  openBookingForTutor: (tutor: TutorProfile) => void;

  // Action methods
  createBooking: (newBooking: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  addReviewToTutor: (tutorId: string, review: { rating: number; comment: string; subject: string }) => void;
  replyToReview: (tutorId: string, reviewId: string, reply: string) => void;
  toggleFavoriteTutor: (tutorId: string) => void;
  isTutorFavorite: (tutorId: string) => boolean;
  
  // Chat actions
  sendMessage: (receiverId: string, text: string, fileAttachment?: any, voiceNoteDuration?: number) => void;
  markMessagesAsRead: (senderId: string) => void;

  // Student Actions
  updateStudentProfile: (updated: Partial<StudentProfile>) => void;
  submitHomework: (assignmentId: string, fileName: string, notes: string) => void;
  requestRefund: (transactionId: string, reason: string) => void;

  // Tutor Actions
  updateTutorProfile: (updated: Partial<TutorProfile>) => void;
  addTutorSubject: (subject: { subjectId: string; subjectName: string; category: string; hourlyRatePKR: number; level: string }) => void;
  removeTutorSubject: (subjectId: string) => void;
  uploadStudyMaterial: (material: Omit<StudyMaterial, 'id' | 'uploadedDate' | 'downloadCount'>) => void;
  createAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void;
  gradeAssignment: (assignmentId: string, marks: number, feedback: string) => void;
  requestWithdrawal: (amount: number, method: 'jazzcash' | 'easypaisa' | 'bank_transfer', details: { title: string; number: string; bank?: string }) => void;

  // Admin Actions
  verifyTutor: (tutorId: string, status: 'verified' | 'rejected', notes?: string) => void;
  toggleUserStatus: (userId: string) => void;
  approveWithdrawal: (withdrawalId: string) => void;
  addNewSubject: (categoryId: string, subject: { name: string; nameUrdu: string; avgHourlyRatePKR: number; level: string }) => void;
  deleteSubject: (subjectId: string) => void;

  // Search & Filter state helper
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCityFilter: string;
  setSelectedCityFilter: (city: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;

  // Notification helper
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & view
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>('tutor-salman');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>('how-to-score-a-star-cambridge-physics-pakistan');
  const [activeClassroomId, setActiveClassroomId] = useState<string | null>(null);

  // Auth & Roles
  const [activeRole, setActiveRole] = useState<UserRole | 'guest'>('student');
  const [currentUser, setCurrentUser] = useState<User | StudentProfile | TutorProfile | null>(INITIAL_STUDENTS[0]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<'student' | 'tutor'>('student');

  // Language & Theme
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Collections state
  const [categories, setCategories] = useState<SubjectCategory[]>(INITIAL_CATEGORIES);
  const [tutors, setTutors] = useState<TutorProfile[]>(INITIAL_TUTORS);
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(INITIAL_STUDY_MATERIALS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [blogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [platformStats] = useState<PlatformReportStats>(INITIAL_PLATFORM_STATS);

  // Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTutor, setBookingTutor] = useState<TutorProfile | null>(null);

  // Global search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCityFilter, setSelectedCityFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Translation bundle
  const t = translations[language];

  // Sync role switch
  const switchUserRole = (role: UserRole | 'guest') => {
    setActiveRole(role);
    if (role === 'student') {
      setCurrentUser(students[0] || INITIAL_STUDENTS[0]);
    } else if (role === 'tutor') {
      setCurrentUser(tutors[0] || INITIAL_TUTORS[0]);
    } else if (role === 'admin') {
      setCurrentUser(INITIAL_ADMIN);
    } else {
      setCurrentUser(null);
    }
  };

  const loginUser = (user: User) => {
    setCurrentUser(user);
    setActiveRole(user.role);
    setAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveRole('guest');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const openBookingForTutor = (tutor: TutorProfile) => {
    setBookingTutor(tutor);
    setBookingModalOpen(true);
  };

  // Create booking
  const createBooking = (newBookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newId = `bk-${Date.now().toString().slice(-4)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      classRoomId: `room-${Math.floor(100 + Math.random() * 900)}`
    };

    setBookings(prev => [newBooking, ...prev]);

    // Create payment transaction
    const platformCommissionRate = 0.15;
    const platformFee = Math.round(newBooking.amountPKR * platformCommissionRate);
    const tutorEarnings = newBooking.amountPKR - platformFee;

    const newTxn: PaymentTransaction = {
      id: `txn-${Date.now().toString().slice(-4)}`,
      bookingId: newId,
      studentId: newBooking.studentId,
      studentName: newBooking.studentName,
      tutorId: newBooking.tutorId,
      tutorName: newBooking.tutorName,
      amountPKR: newBooking.amountPKR,
      platformFeePKR: platformFee,
      tutorEarningsPKR: tutorEarnings,
      paymentMethod: newBooking.paymentMethod,
      transactionRef: `${newBooking.paymentMethod.toUpperCase()}-${Math.floor(10000000000 + Math.random() * 90000000000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      invoiceNumber: `INV-PK-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Send notifications
    const studentNotif: AppNotification = {
      id: `notif-${Date.now()}-1`,
      userId: newBooking.studentId,
      title: 'Booking Confirmed 🎉',
      message: `Your class with ${newBooking.tutorName} on ${newBooking.date} (${newBooking.timeSlot}) is scheduled.`,
      type: 'booking',
      createdAt: 'Just now',
      isRead: false
    };

    const tutorNotif: AppNotification = {
      id: `notif-${Date.now()}-2`,
      userId: newBooking.tutorId,
      title: 'New Student Booking 📅',
      message: `${newBooking.studentName} booked a ${newBooking.sessionType.replace('_', ' ')} for ${newBooking.subjectName}.`,
      type: 'booking',
      createdAt: 'Just now',
      isRead: false
    };

    setNotifications(prev => [studentNotif, tutorNotif, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
  };

  const addReviewToTutor = (tutorId: string, review: { rating: number; comment: string; subject: string }) => {
    const student = currentUser && currentUser.role === 'student' ? (currentUser as StudentProfile) : students[0];
    const newRev = {
      id: `rev-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      studentAvatar: student.avatar,
      studentCity: student.city,
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
      subject: review.subject
    };

    setTutors(prev => prev.map(t => {
      if (t.id === tutorId) {
        const updatedReviews = [newRev, ...t.reviews];
        const avg = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...t,
          reviews: updatedReviews,
          rating: Number(avg.toFixed(2)),
          totalReviews: updatedReviews.length
        };
      }
      return t;
    }));
  };

  const replyToReview = (tutorId: string, reviewId: string, reply: string) => {
    setTutors(prev => prev.map(t => {
      if (t.id === tutorId) {
        return {
          ...t,
          reviews: t.reviews.map(r => r.id === reviewId ? { ...r, tutorReply: reply } : r)
        };
      }
      return t;
    }));
  };

  const toggleFavoriteTutor = (tutorId: string) => {
    if (currentUser?.role === 'student') {
      const student = currentUser as StudentProfile;
      const isFav = student.favoriteTutorIds.includes(tutorId);
      const newFavs = isFav
        ? student.favoriteTutorIds.filter(id => id !== tutorId)
        : [...student.favoriteTutorIds, tutorId];

      const updated = { ...student, favoriteTutorIds: newFavs };
      setCurrentUser(updated);
      setStudents(prev => prev.map(s => s.id === student.id ? updated : s));
    }
  };

  const isTutorFavorite = (tutorId: string): boolean => {
    if (currentUser?.role === 'student') {
      return (currentUser as StudentProfile).favoriteTutorIds?.includes(tutorId) || false;
    }
    return false;
  };

  const sendMessage = (receiverId: string, text: string, fileAttachment?: any, voiceNoteDuration?: number) => {
    if (!currentUser) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId,
      text,
      timestamp: 'Just now',
      fileAttachment,
      voiceNoteDuration,
      isRead: false
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const markMessagesAsRead = (senderId: string) => {
    if (!currentUser) return;
    setMessages(prev => prev.map(m => m.senderId === senderId && m.receiverId === currentUser.id ? { ...m, isRead: true } : m));
  };

  const updateStudentProfile = (updated: Partial<StudentProfile>) => {
    if (currentUser?.role === 'student') {
      const merged = { ...currentUser, ...updated } as StudentProfile;
      setCurrentUser(merged);
      setStudents(prev => prev.map(s => s.id === merged.id ? merged : s));
    }
  };

  const submitHomework = (assignmentId: string, fileName: string, notes: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'submitted',
          submittedAt: new Date().toISOString().split('T')[0],
          submissionFileName: fileName,
          submissionNotes: notes
        };
      }
      return a;
    }));
  };

  const requestRefund = (transactionId: string, reason: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          refundRequested: true,
          refundReason: reason
        };
      }
      return t;
    }));
  };

  const updateTutorProfile = (updated: Partial<TutorProfile>) => {
    if (currentUser?.role === 'tutor') {
      const merged = { ...currentUser, ...updated } as TutorProfile;
      setCurrentUser(merged);
      setTutors(prev => prev.map(t => t.id === merged.id ? merged : t));
    }
  };

  const addTutorSubject = (subject: { subjectId: string; subjectName: string; category: string; hourlyRatePKR: number; level: string }) => {
    if (currentUser?.role === 'tutor') {
      const tutor = currentUser as TutorProfile;
      const updatedSubjects = [...tutor.subjects.filter(s => s.subjectId !== subject.subjectId), subject];
      updateTutorProfile({ subjects: updatedSubjects });
    }
  };

  const removeTutorSubject = (subjectId: string) => {
    if (currentUser?.role === 'tutor') {
      const tutor = currentUser as TutorProfile;
      const updatedSubjects = tutor.subjects.filter(s => s.subjectId !== subjectId);
      updateTutorProfile({ subjects: updatedSubjects });
    }
  };

  const uploadStudyMaterial = (material: Omit<StudyMaterial, 'id' | 'uploadedDate' | 'downloadCount'>) => {
    const newMat: StudyMaterial = {
      ...material,
      id: `mat-${Date.now()}`,
      uploadedDate: new Date().toISOString().split('T')[0],
      downloadCount: 0
    };
    setStudyMaterials(prev => [newMat, ...prev]);
  };

  const createAssignment = (assignment: Omit<Assignment, 'id' | 'status'>) => {
    const newAsg: Assignment = {
      ...assignment,
      id: `asg-${Date.now()}`,
      status: 'pending'
    };
    setAssignments(prev => [newAsg, ...prev]);
  };

  const gradeAssignment = (assignmentId: string, marks: number, feedback: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === assignmentId) {
        return {
          ...a,
          status: 'graded',
          marksObtained: marks,
          tutorFeedback: feedback
        };
      }
      return a;
    }));
  };

  const requestWithdrawal = (amount: number, method: 'jazzcash' | 'easypaisa' | 'bank_transfer', details: { title: string; number: string; bank?: string }) => {
    if (!currentUser) return;
    const newWd: WithdrawalRequest = {
      id: `wd-${Date.now().toString().slice(-4)}`,
      tutorId: currentUser.id,
      tutorName: currentUser.name,
      amountPKR: amount,
      paymentMethod: method,
      accountTitle: details.title,
      accountNumber: details.number,
      bankName: details.bank,
      requestedAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setWithdrawals(prev => [newWd, ...prev]);
  };

  const verifyTutor = (tutorId: string, status: 'verified' | 'rejected', notes?: string) => {
    setTutors(prev => prev.map(t => {
      if (t.id === tutorId) {
        return {
          ...t,
          isVerified: status === 'verified',
          verification: {
            ...t.verification,
            status,
            verificationNotes: notes
          }
        };
      }
      return t;
    }));
  };

  const toggleUserStatus = (userId: string) => {
    setTutors(prev => prev.map(t => t.id === userId ? { ...t, isVerified: !t.isVerified } : t));
    setStudents(prev => prev.map(s => s.id === userId ? { ...s, isVerified: !s.isVerified } : s));
  };

  const approveWithdrawal = (withdrawalId: string) => {
    setWithdrawals(prev => prev.map(w => {
      if (w.id === withdrawalId) {
        return {
          ...w,
          status: 'approved',
          processedAt: new Date().toISOString().split('T')[0],
          adminNotes: 'Payment sent successfully via 1Link IBFT / M-Wallet.'
        };
      }
      return w;
    }));
  };

  const addNewSubject = (categoryId: string, subject: { name: string; nameUrdu: string; avgHourlyRatePKR: number; level: string }) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      categoryId,
      ...subject,
      tutorCount: 1,
      popular: false
    };

    setCategories(prev => prev.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          subjects: [...c.subjects, newSub]
        };
      }
      return c;
    }));
  };

  const deleteSubject = (subjectId: string) => {
    setCategories(prev => prev.map(c => ({
      ...c,
      subjects: c.subjects.filter(s => s.id !== subjectId)
    })));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedTutorId,
        setSelectedTutorId,
        selectedBlogSlug,
        setSelectedBlogSlug,
        activeClassroomId,
        setActiveClassroomId,

        currentUser,
        activeRole,
        switchUserRole,
        loginUser,
        logoutUser,
        authModalOpen,
        setAuthModalOpen,
        authDefaultRole,
        setAuthDefaultRole,

        language,
        setLanguage,
        t,
        isDarkMode,
        toggleDarkMode,

        categories,
        tutors,
        students,
        bookings,
        messages,
        assignments,
        studyMaterials,
        transactions,
        withdrawals,
        notifications,
        blogPosts,
        platformStats,

        bookingModalOpen,
        setBookingModalOpen,
        bookingTutor,
        openBookingForTutor,

        createBooking,
        updateBookingStatus,
        addReviewToTutor,
        replyToReview,
        toggleFavoriteTutor,
        isTutorFavorite,

        sendMessage,
        markMessagesAsRead,

        updateStudentProfile,
        submitHomework,
        requestRefund,

        updateTutorProfile,
        addTutorSubject,
        removeTutorSubject,
        uploadStudyMaterial,
        createAssignment,
        gradeAssignment,
        requestWithdrawal,

        verifyTutor,
        toggleUserStatus,
        approveWithdrawal,
        addNewSubject,
        deleteSubject,

        searchQuery,
        setSearchQuery,
        selectedCityFilter,
        setSelectedCityFilter,
        selectedCategoryFilter,
        setSelectedCategoryFilter,

        markAllNotificationsRead,
        unreadNotificationsCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
