export type UserRole = 'student' | 'tutor' | 'admin';

export type LanguageCode = 'en' | 'ur';

export type TuitionMode = 'online' | 'in_person' | 'both';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected' | 'rescheduled';

export type PaymentStatus = 'pending' | 'completed' | 'refunded' | 'failed';

export type PaymentMethod = 'jazzcash' | 'easypaisa' | 'stripe' | 'bank_transfer' | 'paypal';

export type EducationLevel = 'Matric / SSC' | 'O-Levels / IGCSE' | 'FSc / HSSC' | 'A-Levels' | 'Bachelors' | 'Masters / PhD' | 'Professional';

export type PakistaniCity = 
  | 'Lahore' 
  | 'Karachi' 
  | 'Islamabad' 
  | 'Rawalpindi' 
  | 'Faisalabad' 
  | 'Multan' 
  | 'Peshawar' 
  | 'Quetta' 
  | 'Sialkot' 
  | 'Gujranwala' 
  | 'Hyderabad' 
  | 'Online (Nationwide)';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  city: PakistaniCity;
  country: string;
  gender: 'Male' | 'Female' | 'Other';
  createdAt: string;
  isVerified: boolean;
  twoFactorEnabled?: boolean;
}

export interface StudentProfile extends User {
  role: 'student';
  dob: string;
  educationLevel: EducationLevel;
  preferredLanguage: string[];
  learningGoals: string;
  favoriteTutorIds: string[];
  totalHoursLearned: number;
  completedClassesCount: number;
}

export interface TutorSubjectRate {
  subjectId: string;
  subjectName: string;
  category: string;
  hourlyRatePKR: number;
  level: string;
}

export interface AvailabilitySlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlots: string[]; // e.g. ["09:00 - 10:00", "15:00 - 16:00", "18:00 - 19:00"]
}

export interface TutorReview {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentCity: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  subject: string;
  tutorReply?: string;
}

export interface TutorVerificationDoc {
  cnicNumber: string;
  cnicFrontUrl: string;
  cnicBackUrl: string;
  degreeTitle: string;
  degreeInstitute: string;
  degreeDocumentUrl: string;
  certificateUrls: string[];
  status: 'pending' | 'verified' | 'rejected' | 'additional_info_required';
  verificationNotes?: string;
  submittedAt: string;
}

export interface TutorProfile extends User {
  role: 'tutor';
  qualification: string; // e.g. "M.Sc. Physics (LUMS), Gold Medalist"
  experienceYears: number;
  bio: string;
  headline: string;
  subjects: TutorSubjectRate[];
  languagesSpoken: string[];
  tuitionMode: TuitionMode;
  hourlyRatePKR: number; // base/featured hourly rate
  trialRatePKR: number; // 0 for free trial or discounted
  rating: number; // e.g. 4.9
  totalReviews: number;
  totalStudentsTaught: number;
  totalClassesDelivered: number;
  availabilitySchedule: AvailabilitySlot[];
  videoIntroUrl?: string;
  verification: TutorVerificationDoc;
  featured?: boolean;
  reviews: TutorReview[];
  responseRatePercent: number;
  responseTime: string; // e.g. "Within 1 hour"
}

export interface SubjectCategory {
  id: string;
  name: string;
  nameUrdu: string;
  icon: string;
  description: string;
  subjects: Subject[];
}

export interface Subject {
  id: string;
  categoryId: string;
  name: string;
  nameUrdu: string;
  popular?: boolean;
  tutorCount: number;
  avgHourlyRatePKR: number;
  level: string; // 'School' | 'College' | 'University' | 'Skills'
}

export interface Booking {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentEmail: string;
  studentPhone: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  subjectName: string;
  sessionType: 'trial' | 'single_class' | 'monthly_package';
  classMode: 'online' | 'in_person';
  date: string; // 'YYYY-MM-DD'
  timeSlot: string; // '16:00 - 17:00'
  amountPKR: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  meetingPlatform: 'builtin' | 'zoom' | 'google_meet' | 'teams';
  meetingLink?: string;
  notes?: string;
  createdAt: string;
  classRoomId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  text: string;
  timestamp: string;
  fileAttachment?: {
    name: string;
    url: string;
    size: string;
    type: string;
  };
  voiceNoteDuration?: number; // duration in seconds
  isRead: boolean;
}

export interface ChatThread {
  id: string;
  participantOneId: string;
  participantTwoId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: UserRole;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Assignment {
  id: string;
  tutorId: string;
  tutorName: string;
  studentId: string;
  studentName: string;
  subject: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  attachmentUrl?: string;
  attachmentName?: string;
  status: 'pending' | 'submitted' | 'graded';
  submittedAt?: string;
  submissionFileUrl?: string;
  submissionFileName?: string;
  submissionNotes?: string;
  marksObtained?: number;
  tutorFeedback?: string;
}

export interface StudyMaterial {
  id: string;
  tutorId: string;
  tutorName: string;
  subject: string;
  title: string;
  category: 'Past Paper' | 'Lecture Notes' | 'Formula Sheet' | 'E-Book' | 'Syllabus';
  fileType: 'pdf' | 'docx' | 'zip';
  fileSize: string;
  downloadUrl: string;
  uploadedDate: string;
  targetLevel: string;
  downloadCount: number;
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  studentId: string;
  studentName: string;
  tutorId: string;
  tutorName: string;
  amountPKR: number;
  platformFeePKR: number;
  tutorEarningsPKR: number;
  paymentMethod: PaymentMethod;
  transactionRef: string;
  date: string;
  status: PaymentStatus;
  invoiceNumber: string;
  refundRequested?: boolean;
  refundReason?: string;
}

export interface WithdrawalRequest {
  id: string;
  tutorId: string;
  tutorName: string;
  amountPKR: number;
  paymentMethod: 'jazzcash' | 'easypaisa' | 'bank_transfer';
  accountTitle: string;
  accountNumber: string; // Mobile number or IBAN
  bankName?: string;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  processedAt?: string;
  adminNotes?: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'message' | 'assignment' | 'system' | 'class';
  link?: string;
  createdAt: string;
  isRead: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleUrdu: string;
  excerpt: string;
  excerptUrdu: string;
  content: string;
  authorName: string;
  authorRole: string;
  category: 'Education' | 'Online Learning' | 'Study Tips' | 'Career Guidance' | 'Exam Preparation';
  publishedDate: string;
  readTimeMinutes: number;
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage: string;
}

export interface PlatformReportStats {
  totalRevenuePKR: number;
  monthlyRevenuePKR: number;
  platformCommissionPKR: number;
  totalStudents: number;
  totalTutors: number;
  verifiedTutors: number;
  totalClassesDelivered: number;
  averageSatisfactionRate: number;
  topSubjects: { name: string; bookings: number; revenuePKR: number }[];
  cityDistribution: { city: string; students: number; tutors: number }[];
  monthlyGrowth: { month: string; students: number; bookings: number; revenuePKR: number }[];
}
