import {
  SubjectCategory,
  TutorProfile,
  StudentProfile,
  User,
  Booking,
  ChatMessage,
  ChatThread,
  Assignment,
  StudyMaterial,
  PaymentTransaction,
  WithdrawalRequest,
  AppNotification,
  BlogPost,
  PlatformReportStats
} from '../types';

export const INITIAL_CATEGORIES: SubjectCategory[] = [
  {
    id: 'cat-school',
    name: 'School & O/A Levels',
    nameUrdu: 'اسکول اور او/اے لیول',
    icon: 'GraduationCap',
    description: 'Matric (Federal, Punjab, Sindh, KPK, Balochistan) & Cambridge IGCSE / O / A Levels',
    subjects: [
      { id: 'sub-math-school', categoryId: 'cat-school', name: 'Mathematics', nameUrdu: 'ریاضی', popular: true, tutorCount: 420, avgHourlyRatePKR: 1800, level: 'School' },
      { id: 'sub-phys-school', categoryId: 'cat-school', name: 'Physics', nameUrdu: 'طبیعیات (فزکس)', popular: true, tutorCount: 360, avgHourlyRatePKR: 2000, level: 'School' },
      { id: 'sub-chem-school', categoryId: 'cat-school', name: 'Chemistry', nameUrdu: 'کیمیاء (کیمسٹری)', popular: true, tutorCount: 290, avgHourlyRatePKR: 1900, level: 'School' },
      { id: 'sub-bio-school', categoryId: 'cat-school', name: 'Biology', nameUrdu: 'حیاتیات (بائیولوجی)', popular: true, tutorCount: 310, avgHourlyRatePKR: 2000, level: 'School' },
      { id: 'sub-eng-school', categoryId: 'cat-school', name: 'English Literature & Lang', nameUrdu: 'انگریزی ادب و زبان', popular: true, tutorCount: 450, avgHourlyRatePKR: 1600, level: 'School' },
      { id: 'sub-urdu-school', categoryId: 'cat-school', name: 'Urdu (Nazm & Nasar)', nameUrdu: 'اردو (نظم و نثر)', popular: false, tutorCount: 180, avgHourlyRatePKR: 1300, level: 'School' },
      { id: 'sub-islam-school', categoryId: 'cat-school', name: 'Islamiat & Quran Nazra', nameUrdu: 'اسلامیات اور ناظرہ قرآن', popular: true, tutorCount: 240, avgHourlyRatePKR: 1200, level: 'School' },
      { id: 'sub-cs-school', categoryId: 'cat-school', name: 'Computer Science (Python/C++)', nameUrdu: 'کمپیوٹر سائنس', popular: true, tutorCount: 380, avgHourlyRatePKR: 2200, level: 'School' },
      { id: 'sub-pak-school', categoryId: 'cat-school', name: 'Pakistan Studies', nameUrdu: 'مطالعہ پاکستان', popular: false, tutorCount: 150, avgHourlyRatePKR: 1400, level: 'School' },
    ]
  },
  {
    id: 'cat-college-uni',
    name: 'College & University',
    nameUrdu: 'کالج اور یونیورسٹی',
    icon: 'Building2',
    description: 'FSc (Pre-Med / Pre-Eng), ICS, ICom, Bachelor & Masters courses, MDCAT & ECAT Entry Prep',
    subjects: [
      { id: 'sub-acc-uni', categoryId: 'cat-college-uni', name: 'Accounting (Financial & Cost)', nameUrdu: 'اکاؤنٹنگ', popular: true, tutorCount: 210, avgHourlyRatePKR: 2400, level: 'College' },
      { id: 'sub-stats-uni', categoryId: 'cat-college-uni', name: 'Statistics & Probability', nameUrdu: 'شماریات (اسٹیٹسٹکس)', popular: false, tutorCount: 170, avgHourlyRatePKR: 2200, level: 'College' },
      { id: 'sub-econ-uni', categoryId: 'cat-college-uni', name: 'Economics (Micro & Macro)', nameUrdu: 'معاشیات (اکنامکس)', popular: true, tutorCount: 190, avgHourlyRatePKR: 2300, level: 'College' },
      { id: 'sub-bus-uni', categoryId: 'cat-college-uni', name: 'Business Studies & Management', nameUrdu: 'بزنس اسٹڈیز', popular: false, tutorCount: 140, avgHourlyRatePKR: 2000, level: 'College' },
      { id: 'sub-prog-uni', categoryId: 'cat-college-uni', name: 'Data Structures & Algorithms', nameUrdu: 'ڈی ایس اے اور پروگرامنگ', popular: true, tutorCount: 310, avgHourlyRatePKR: 2800, level: 'University' },
      { id: 'sub-mdcat-uni', categoryId: 'cat-college-uni', name: 'MDCAT Crash Prep (Bio/Chem/Phys)', nameUrdu: 'ایم ڈی کیٹ تیاری', popular: true, tutorCount: 260, avgHourlyRatePKR: 3000, level: 'College' },
      { id: 'sub-ecat-uni', categoryId: 'cat-college-uni', name: 'ECAT / NUST NET Prep', nameUrdu: 'ای کیٹ و نسٹ انٹری ٹیسٹ', popular: true, tutorCount: 230, avgHourlyRatePKR: 2600, level: 'College' },
    ]
  },
  {
    id: 'cat-languages',
    name: 'Languages',
    nameUrdu: 'زبانیں',
    icon: 'Languages',
    description: 'Fluency, Grammar, Native conversation, IELTS, TOEFL, Arabic & Chinese (HSK)',
    subjects: [
      { id: 'sub-ielts-lang', categoryId: 'cat-languages', name: 'IELTS Academic & General (7.5+ Band)', nameUrdu: 'آئلٹس اکیڈمک و جنرل', popular: true, tutorCount: 340, avgHourlyRatePKR: 2500, level: 'Languages' },
      { id: 'sub-spoken-eng', categoryId: 'cat-languages', name: 'Spoken English & Accent Training', nameUrdu: 'اسپوکن انگلش', popular: true, tutorCount: 410, avgHourlyRatePKR: 1700, level: 'Languages' },
      { id: 'sub-arabic-lang', categoryId: 'cat-languages', name: 'Arabic (Classical Quranic & Modern)', nameUrdu: 'عربی زبان و گرامر', popular: true, tutorCount: 180, avgHourlyRatePKR: 1500, level: 'Languages' },
      { id: 'sub-chinese-lang', categoryId: 'cat-languages', name: 'Chinese Mandarin (HSK 1 - 5)', nameUrdu: 'چینی مینڈارن', popular: true, tutorCount: 95, avgHourlyRatePKR: 2600, level: 'Languages' },
      { id: 'sub-french-lang', categoryId: 'cat-languages', name: 'French (DELF A1-B2)', nameUrdu: 'فرانسیسی زبان', popular: false, tutorCount: 65, avgHourlyRatePKR: 2500, level: 'Languages' },
      { id: 'sub-urdu-foreign', categoryId: 'cat-languages', name: 'Urdu for Foreigners & Overseas Kids', nameUrdu: 'اوورسیز بچوں کے لیے اردو', popular: true, tutorCount: 130, avgHourlyRatePKR: 2000, level: 'Languages' },
    ]
  },
  {
    id: 'cat-skills',
    name: 'Professional Skills',
    nameUrdu: 'پیشہ ورانہ مہارتیں',
    icon: 'Sparkles',
    description: 'High-income digital skills, Freelancing on Upwork/Fiverr, AI workflows & Design',
    subjects: [
      { id: 'sub-webdev-skill', categoryId: 'cat-skills', name: 'Full-Stack Web Development (MERN)', nameUrdu: 'ویب ڈویلپمنٹ', popular: true, tutorCount: 290, avgHourlyRatePKR: 3000, level: 'Skills' },
      { id: 'sub-graphic-skill', categoryId: 'cat-skills', name: 'Graphic Design & UI/UX (Figma/Adobe)', nameUrdu: 'گرافک ڈیزائن اور UI/UX', popular: true, tutorCount: 240, avgHourlyRatePKR: 2200, level: 'Skills' },
      { id: 'sub-ai-skill', categoryId: 'cat-skills', name: 'AI & ChatGPT for Work & Coding', nameUrdu: 'آرٹیفیشل انٹیلیجنس اور چیٹ جی پی ٹی', popular: true, tutorCount: 195, avgHourlyRatePKR: 2800, level: 'Skills' },
      { id: 'sub-mkt-skill', categoryId: 'cat-skills', name: 'Digital Marketing & Facebook/Google Ads', nameUrdu: 'ڈیجیٹل مارکیٹنگ', popular: true, tutorCount: 180, avgHourlyRatePKR: 2000, level: 'Skills' },
      { id: 'sub-excel-skill', categoryId: 'cat-skills', name: 'MS Excel Advanced & Power BI', nameUrdu: 'ایکسل اور پاور بی آئی', popular: true, tutorCount: 160, avgHourlyRatePKR: 1900, level: 'Skills' },
    ]
  }
];

export const INITIAL_TUTORS: TutorProfile[] = [
  {
    id: 'tutor-salman',
    name: 'Prof. Salman Ahmed',
    email: 'salman.physics@tutorhub.pk',
    phone: '+92 300 4589210',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    city: 'Lahore',
    country: 'Pakistan',
    gender: 'Male',
    createdAt: '2023-01-15',
    isVerified: true,
    twoFactorEnabled: true,
    qualification: 'M.Sc. Physics (LUMS) - Gold Medalist | 12+ Years Cambridge Examiner',
    experienceYears: 12,
    headline: 'O/A Levels & ECAT Physics Specialist (89% Students Scored A*/A)',
    bio: 'Assalam-o-Alaikum! I am Salman Ahmed, former senior faculty at Aitchison College & Lahore Grammar School. I demystify complex mechanics, electromagnetism, and modern physics through visual simulations and past-paper exam technique masterclasses.',
    hourlyRatePKR: 2500,
    trialRatePKR: 0,
    rating: 4.98,
    totalReviews: 142,
    totalStudentsTaught: 380,
    totalClassesDelivered: 1240,
    tuitionMode: 'both',
    languagesSpoken: ['English', 'Urdu', 'Punjabi'],
    responseRatePercent: 99,
    responseTime: 'Within 30 mins',
    featured: true,
    videoIntroUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    verification: {
      cnicNumber: '35201-1234567-9',
      cnicFrontUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      cnicBackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      degreeTitle: 'Master of Science in Physics',
      degreeInstitute: 'Lahore University of Management Sciences (LUMS)',
      degreeDocumentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      certificateUrls: ['Cambridge Certified Teacher Certificate 2021'],
      status: 'verified',
      submittedAt: '2023-01-16'
    },
    subjects: [
      { subjectId: 'sub-phys-school', subjectName: 'Physics (O/A Level)', category: 'School & O/A Levels', hourlyRatePKR: 2500, level: 'O/A Levels' },
      { subjectId: 'sub-ecat-uni', subjectName: 'ECAT / NET Physics', category: 'College & University', hourlyRatePKR: 2800, level: 'Entry Test' },
      { subjectId: 'sub-math-school', subjectName: 'Mathematics (O-Level)', category: 'School & O/A Levels', hourlyRatePKR: 2200, level: 'O-Level' }
    ],
    availabilitySchedule: [
      { day: 'Monday', timeSlots: ['15:00 - 16:00', '16:30 - 17:30', '18:00 - 19:00', '20:00 - 21:00'] },
      { day: 'Tuesday', timeSlots: ['15:00 - 16:00', '16:30 - 17:30', '18:00 - 19:00', '20:00 - 21:00'] },
      { day: 'Wednesday', timeSlots: ['15:00 - 16:00', '16:30 - 17:30', '18:00 - 19:00', '20:00 - 21:00'] },
      { day: 'Thursday', timeSlots: ['15:00 - 16:00', '16:30 - 17:30', '18:00 - 19:00', '20:00 - 21:00'] },
      { day: 'Friday', timeSlots: ['16:00 - 17:00', '17:30 - 18:30', '20:00 - 21:00'] },
      { day: 'Saturday', timeSlots: ['10:00 - 11:00', '11:30 - 12:30', '14:00 - 15:00', '16:00 - 17:00'] },
      { day: 'Sunday', timeSlots: ['11:00 - 12:00', '14:00 - 15:00', '16:00 - 17:00'] }
    ],
    reviews: [
      {
        id: 'rev-1',
        studentId: 'stud-ayesha',
        studentName: 'Ayesha Khan',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        studentCity: 'Islamabad',
        rating: 5,
        comment: 'Sir Salman is phenomenal! I went from a C in my A-Level Physics mocks to an A* in the final Cambridge exam. His notes and interactive whiteboard diagrams made circuit concepts crystal clear.',
        date: '2024-05-18',
        subject: 'Physics (A-Level)',
        tutorReply: 'JazakAllah Ayesha! Your dedication to solving 10 years past papers was truly commendable.'
      },
      {
        id: 'rev-2',
        studentId: 'stud-bilal',
        studentName: 'Bilal Riaz',
        studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        studentCity: 'Lahore',
        rating: 5,
        comment: 'Best teacher in Lahore. He explains derivations like a story. Very punctual and flexible timing.',
        date: '2024-06-02',
        subject: 'ECAT Physics'
      }
    ]
  },
  {
    id: 'tutor-maria',
    name: 'Dr. Maria Qureshi',
    email: 'maria.qureshi@tutorhub.pk',
    phone: '+92 321 9845120',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    city: 'Karachi',
    country: 'Pakistan',
    gender: 'Female',
    createdAt: '2023-02-10',
    isVerified: true,
    twoFactorEnabled: true,
    qualification: 'MBBS (King Edward Medical University) | MDCAT Top Ranker',
    experienceYears: 8,
    headline: 'MDCAT, FSc & A-Level Biology & Chemistry Mentor',
    bio: 'Passionate doctor and educator helping future medical doctors secure admissions in top government medical colleges (KEMU, AIMC, Dow, SMC). Customized high-yield topic flashcards, NUMS past-paper shortcuts, and conceptual diagrams.',
    hourlyRatePKR: 3000,
    trialRatePKR: 500,
    rating: 5.0,
    totalReviews: 188,
    totalStudentsTaught: 520,
    totalClassesDelivered: 1850,
    tuitionMode: 'online',
    languagesSpoken: ['English', 'Urdu', 'Sindhi'],
    responseRatePercent: 100,
    responseTime: 'Within 15 mins',
    featured: true,
    verification: {
      cnicNumber: '42201-9876543-2',
      cnicFrontUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      cnicBackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      degreeTitle: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
      degreeInstitute: 'King Edward Medical University (KEMU)',
      degreeDocumentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      certificateUrls: ['PMDC Registered License', 'Medical Genetics Fellowship'],
      status: 'verified',
      submittedAt: '2023-02-11'
    },
    subjects: [
      { subjectId: 'sub-mdcat-uni', subjectName: 'MDCAT Biology & Chemistry', category: 'College & University', hourlyRatePKR: 3000, level: 'Entry Test' },
      { subjectId: 'sub-bio-school', subjectName: 'Biology (A-Level / FSc)', category: 'School & O/A Levels', hourlyRatePKR: 2800, level: 'A-Level' },
      { subjectId: 'sub-chem-school', subjectName: 'Chemistry (Organic & Inorganic)', category: 'School & O/A Levels', hourlyRatePKR: 2600, level: 'College' }
    ],
    availabilitySchedule: [
      { day: 'Monday', timeSlots: ['17:00 - 18:00', '18:30 - 19:30', '20:00 - 21:00'] },
      { day: 'Tuesday', timeSlots: ['17:00 - 18:00', '18:30 - 19:30', '20:00 - 21:00'] },
      { day: 'Wednesday', timeSlots: ['17:00 - 18:00', '18:30 - 19:30', '20:00 - 21:00'] },
      { day: 'Thursday', timeSlots: ['17:00 - 18:00', '18:30 - 19:30', '20:00 - 21:00'] },
      { day: 'Saturday', timeSlots: ['11:00 - 12:00', '14:00 - 15:00', '16:00 - 17:00', '19:00 - 20:00'] },
      { day: 'Sunday', timeSlots: ['11:00 - 12:00', '14:00 - 15:00', '16:00 - 17:00'] }
    ],
    reviews: [
      {
        id: 'rev-3',
        studentId: 'stud-fatima',
        studentName: 'Fatima Zahra',
        studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        studentCity: 'Karachi',
        rating: 5,
        comment: 'Dr. Maria is a lifesaver. Her memory mnemonics for human physiology and organic reaction mechanisms helped me score 191 in MDCAT! Secured King Edward merit seat.',
        date: '2024-04-10',
        subject: 'MDCAT Biology'
      }
    ]
  },
  {
    id: 'tutor-hamza',
    name: 'Engr. Hamza Malik',
    email: 'hamza.nust@tutorhub.pk',
    phone: '+92 333 5511223',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    city: 'Islamabad',
    country: 'Pakistan',
    gender: 'Male',
    createdAt: '2023-03-01',
    isVerified: true,
    twoFactorEnabled: false,
    qualification: 'B.S. Software Engineering (NUST) - President Gold Medalist',
    experienceYears: 6,
    headline: 'Mathematics (Calculus/Algebra), Python & Coding Tutor',
    bio: 'Software engineer at a US tech company and passionate math tutor. I make calculus, vectors, quadratic equations, and python coding easy and fun through real-world applications and step-by-step problem dissection.',
    hourlyRatePKR: 2200,
    trialRatePKR: 0,
    rating: 4.95,
    totalReviews: 96,
    totalStudentsTaught: 270,
    totalClassesDelivered: 890,
    tuitionMode: 'both',
    languagesSpoken: ['English', 'Urdu'],
    responseRatePercent: 98,
    responseTime: 'Within 45 mins',
    featured: true,
    verification: {
      cnicNumber: '61101-3456789-1',
      cnicFrontUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      cnicBackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      degreeTitle: 'Bachelor of Science in Software Engineering',
      degreeInstitute: 'National University of Sciences and Technology (NUST)',
      degreeDocumentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      certificateUrls: ['AWS Certified Solutions Architect', 'NUST Gold Medal Citation'],
      status: 'verified',
      submittedAt: '2023-03-02'
    },
    subjects: [
      { subjectId: 'sub-math-school', subjectName: 'Mathematics (O/A Level, FSc)', category: 'School & O/A Levels', hourlyRatePKR: 2200, level: 'School' },
      { subjectId: 'sub-prog-uni', subjectName: 'Python, DSA & Web Coding', category: 'College & University', hourlyRatePKR: 2600, level: 'University' }
    ],
    availabilitySchedule: [
      { day: 'Monday', timeSlots: ['19:00 - 20:00', '20:30 - 21:30', '22:00 - 23:00'] },
      { day: 'Wednesday', timeSlots: ['19:00 - 20:00', '20:30 - 21:30', '22:00 - 23:00'] },
      { day: 'Friday', timeSlots: ['19:00 - 20:00', '20:30 - 21:30'] },
      { day: 'Saturday', timeSlots: ['10:00 - 11:00', '11:30 - 12:30', '14:00 - 15:00', '17:00 - 18:00'] },
      { day: 'Sunday', timeSlots: ['10:00 - 11:00', '14:00 - 15:00', '17:00 - 18:00'] }
    ],
    reviews: [
      {
        id: 'rev-4',
        studentId: 'stud-saad',
        studentName: 'Saad Farooq',
        studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        studentCity: 'Islamabad',
        rating: 5,
        comment: 'Engr. Hamza taught me O-Level Additional Math and Python programming. He is super patient and explains the "why" behind every formula.',
        date: '2024-03-15',
        subject: 'Mathematics'
      }
    ]
  },
  {
    id: 'tutor-areeba',
    name: 'Ms. Areeba Noor',
    email: 'areeba.noor@tutorhub.pk',
    phone: '+92 312 8844221',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    city: 'Rawalpindi',
    country: 'Pakistan',
    gender: 'Female',
    createdAt: '2023-04-12',
    isVerified: true,
    twoFactorEnabled: true,
    qualification: 'M.A. English (Kinnaird) | British Council Certified IELTS Trainer (Band 8.5)',
    experienceYears: 7,
    headline: 'IELTS Academic/General (8.0+ Guarantee) & O/A Level English',
    bio: 'Certified English language trainer who has coached 600+ students and professionals to achieve their target IELTS band for UK, Canada, Australia and US visas.',
    hourlyRatePKR: 1800,
    trialRatePKR: 0,
    rating: 4.92,
    totalReviews: 110,
    totalStudentsTaught: 610,
    totalClassesDelivered: 1420,
    tuitionMode: 'online',
    languagesSpoken: ['English', 'Urdu'],
    responseRatePercent: 97,
    responseTime: 'Within 1 hour',
    featured: true,
    verification: {
      cnicNumber: '37405-7766554-4',
      cnicFrontUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      cnicBackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      degreeTitle: 'Master of Arts in English Linguistics',
      degreeInstitute: 'Kinnaird College for Women',
      degreeDocumentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      certificateUrls: ['British Council IELTS Train the Trainer 2022'],
      status: 'verified',
      submittedAt: '2023-04-13'
    },
    subjects: [
      { subjectId: 'sub-ielts-lang', subjectName: 'IELTS Preparation (Speaking/Writing)', category: 'Languages', hourlyRatePKR: 2500, level: 'Languages' },
      { subjectId: 'sub-eng-school', subjectName: 'English (O/A Level, FSc)', category: 'School & O/A Levels', hourlyRatePKR: 1800, level: 'School' },
      { subjectId: 'sub-spoken-eng', subjectName: 'Spoken English & Fluency', category: 'Languages', hourlyRatePKR: 1700, level: 'Languages' }
    ],
    availabilitySchedule: [
      { day: 'Tuesday', timeSlots: ['14:00 - 15:00', '16:00 - 17:00', '18:00 - 19:00'] },
      { day: 'Thursday', timeSlots: ['14:00 - 15:00', '16:00 - 17:00', '18:00 - 19:00'] },
      { day: 'Saturday', timeSlots: ['12:00 - 13:00', '14:00 - 15:00', '16:00 - 17:00'] },
      { day: 'Sunday', timeSlots: ['12:00 - 13:00', '14:00 - 15:00', '16:00 - 17:00'] }
    ],
    reviews: []
  },
  {
    id: 'tutor-bilal',
    name: 'Bilal Tariq',
    email: 'bilal.tech@tutorhub.pk',
    phone: '+92 301 7766554',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    city: 'Lahore',
    country: 'Pakistan',
    gender: 'Male',
    createdAt: '2023-05-20',
    isVerified: true,
    twoFactorEnabled: true,
    qualification: 'Senior Full-Stack Architect & AI Specialist (FAST-NUCES)',
    experienceYears: 9,
    headline: 'Full-Stack Web Dev (React, Node.js), AI & Upwork Freelancing Mentor',
    bio: 'Top-rated freelancer on Upwork ($150k+ earned). I mentor students and graduates in building production web applications, React, Node.js, AI prompting, and how to land high-paying remote international clients.',
    hourlyRatePKR: 2800,
    trialRatePKR: 0,
    rating: 4.97,
    totalReviews: 84,
    totalStudentsTaught: 310,
    totalClassesDelivered: 750,
    tuitionMode: 'online',
    languagesSpoken: ['English', 'Urdu', 'Punjabi'],
    responseRatePercent: 99,
    responseTime: 'Within 20 mins',
    featured: true,
    verification: {
      cnicNumber: '35202-9988776-5',
      cnicFrontUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      cnicBackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      degreeTitle: 'Bachelor of Science in Computer Science',
      degreeInstitute: 'FAST-NUCES Lahore',
      degreeDocumentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      certificateUrls: ['MongoDB Certified Developer', 'Upwork Top Rated Plus Badge'],
      status: 'verified',
      submittedAt: '2023-05-21'
    },
    subjects: [
      { subjectId: 'sub-webdev-skill', subjectName: 'Full-Stack Web Development (React & Node)', category: 'Professional Skills', hourlyRatePKR: 2800, level: 'Skills' },
      { subjectId: 'sub-ai-skill', subjectName: 'AI & ChatGPT Integration', category: 'Professional Skills', hourlyRatePKR: 3000, level: 'Skills' }
    ],
    availabilitySchedule: [
      { day: 'Monday', timeSlots: ['20:00 - 21:00', '21:30 - 22:30'] },
      { day: 'Wednesday', timeSlots: ['20:00 - 21:00', '21:30 - 22:30'] },
      { day: 'Saturday', timeSlots: ['15:00 - 16:00', '17:00 - 18:00', '19:00 - 20:00'] },
      { day: 'Sunday', timeSlots: ['15:00 - 16:00', '17:00 - 18:00', '19:00 - 20:00'] }
    ],
    reviews: []
  },
  {
    id: 'tutor-zohaib',
    name: 'Ustadh Hafiz Zohaib',
    email: 'zohaib.quran@tutorhub.pk',
    phone: '+92 345 1122334',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    city: 'Peshawar',
    country: 'Pakistan',
    gender: 'Male',
    createdAt: '2023-06-15',
    isVerified: true,
    twoFactorEnabled: false,
    qualification: 'Shahadat-ul-Aalamia (Wifaq-ul-Madaris) & M.A. Islamic Studies (Univ of Peshawar)',
    experienceYears: 10,
    headline: 'Tajweed Quran, Arabic Grammar & Islamiat for School/Overseas',
    bio: 'Dedicated Hafiz-e-Quran and certified Tajweed teacher teaching kids and adults across Pakistan, UAE, UK, and USA. Interactive screen whiteboard for Makhaarij and rules of recitation.',
    hourlyRatePKR: 1200,
    trialRatePKR: 0,
    rating: 4.99,
    totalReviews: 215,
    totalStudentsTaught: 480,
    totalClassesDelivered: 2400,
    tuitionMode: 'online',
    languagesSpoken: ['Urdu', 'Pashto', 'Arabic', 'English'],
    responseRatePercent: 100,
    responseTime: 'Within 10 mins',
    featured: false,
    verification: {
      cnicNumber: '17301-4455667-8',
      cnicFrontUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      cnicBackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      degreeTitle: 'M.A. Islamic Studies & Shahadat-ul-Aalamia',
      degreeInstitute: 'University of Peshawar & Wifaq-ul-Madaris',
      degreeDocumentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      certificateUrls: ['Qiraat & Tajweed Ijazah Certificate'],
      status: 'verified',
      submittedAt: '2023-06-16'
    },
    subjects: [
      { subjectId: 'sub-islam-school', subjectName: 'Quran with Tajweed & Islamiat', category: 'School & O/A Levels', hourlyRatePKR: 1200, level: 'School' },
      { subjectId: 'sub-arabic-lang', subjectName: 'Arabic Grammar & Reading', category: 'Languages', hourlyRatePKR: 1500, level: 'Languages' }
    ],
    availabilitySchedule: [
      { day: 'Monday', timeSlots: ['14:00 - 15:00', '15:30 - 16:30', '17:00 - 18:00', '19:00 - 20:00'] },
      { day: 'Tuesday', timeSlots: ['14:00 - 15:00', '15:30 - 16:30', '17:00 - 18:00', '19:00 - 20:00'] },
      { day: 'Wednesday', timeSlots: ['14:00 - 15:00', '15:30 - 16:30', '17:00 - 18:00', '19:00 - 20:00'] },
      { day: 'Thursday', timeSlots: ['14:00 - 15:00', '15:30 - 16:30', '17:00 - 18:00', '19:00 - 20:00'] },
      { day: 'Friday', timeSlots: ['16:00 - 17:00', '18:00 - 19:00'] }
    ],
    reviews: []
  },
  {
    id: 'tutor-zoya',
    name: 'Ms. Zoya Tariq',
    email: 'zoya.finance@tutorhub.pk',
    phone: '+92 322 4433221',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    city: 'Karachi',
    country: 'Pakistan',
    gender: 'Female',
    createdAt: '2023-07-08',
    isVerified: true,
    twoFactorEnabled: true,
    qualification: 'ACCA Member | BBA (IBA Karachi)',
    experienceYears: 5,
    headline: 'Accounting, Financial Management & Economics Tutor',
    bio: 'Making accounting ledger entries, cash flow statements, cost accounting and microeconomics simple through step-by-step cases and exam pass strategies.',
    hourlyRatePKR: 2000,
    trialRatePKR: 0,
    rating: 4.89,
    totalReviews: 64,
    totalStudentsTaught: 190,
    totalClassesDelivered: 540,
    tuitionMode: 'online',
    languagesSpoken: ['English', 'Urdu'],
    responseRatePercent: 96,
    responseTime: 'Within 2 hours',
    featured: false,
    verification: {
      cnicNumber: '42101-1122334-6',
      cnicFrontUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      cnicBackUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      degreeTitle: 'ACCA Affiliate & BBA Finance',
      degreeInstitute: 'Institute of Business Administration (IBA) Karachi',
      degreeDocumentUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
      certificateUrls: ['ACCA Global Certificate'],
      status: 'verified',
      submittedAt: '2023-07-09'
    },
    subjects: [
      { subjectId: 'sub-acc-uni', subjectName: 'Accounting (O/A Level, B.Com, ACCA)', category: 'College & University', hourlyRatePKR: 2000, level: 'College' },
      { subjectId: 'sub-econ-uni', subjectName: 'Economics (Micro & Macro)', category: 'College & University', hourlyRatePKR: 2100, level: 'College' }
    ],
    availabilitySchedule: [
      { day: 'Monday', timeSlots: ['18:00 - 19:00', '19:30 - 20:30'] },
      { day: 'Tuesday', timeSlots: ['18:00 - 19:00', '19:30 - 20:30'] },
      { day: 'Thursday', timeSlots: ['18:00 - 19:00', '19:30 - 20:30'] },
      { day: 'Saturday', timeSlots: ['11:00 - 12:00', '15:00 - 16:00'] }
    ],
    reviews: []
  }
];

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'stud-ayesha',
    name: 'Ayesha Khan',
    email: 'ayesha.khan@gmail.com',
    phone: '+92 334 9876543',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    city: 'Islamabad',
    country: 'Pakistan',
    gender: 'Female',
    createdAt: '2024-01-10',
    isVerified: true,
    twoFactorEnabled: false,
    dob: '2006-09-14',
    educationLevel: 'A-Levels',
    preferredLanguage: ['English', 'Urdu'],
    learningGoals: 'Aiming for straight A*s in Cambridge A-Level Physics & Math for NUST & Imperial College admission.',
    favoriteTutorIds: ['tutor-salman', 'tutor-maria'],
    totalHoursLearned: 38,
    completedClassesCount: 26
  }
];

export const INITIAL_ADMIN: User = {
  id: 'admin-super',
  name: 'TutorHub Admin Officer',
  email: 'admin@tutorhub.pk',
  phone: '+92 42 111 888 777',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
  city: 'Lahore',
  country: 'Pakistan',
  gender: 'Male',
  createdAt: '2022-01-01',
  isVerified: true,
  twoFactorEnabled: true
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    studentId: 'stud-ayesha',
    studentName: 'Ayesha Khan',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    studentEmail: 'ayesha.khan@gmail.com',
    studentPhone: '+92 334 9876543',
    tutorId: 'tutor-salman',
    tutorName: 'Prof. Salman Ahmed',
    tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    subjectName: 'Physics (O/A Level)',
    sessionType: 'single_class',
    classMode: 'online',
    date: '2026-08-18',
    timeSlot: '16:30 - 17:30',
    amountPKR: 2500,
    status: 'confirmed',
    paymentStatus: 'completed',
    paymentMethod: 'jazzcash',
    meetingPlatform: 'builtin',
    classRoomId: 'room-phy-902',
    notes: 'Covering Electromagnetism Faradays Law and Cambridge 2023 Paper 4 questions.',
    createdAt: '2026-08-16'
  },
  {
    id: 'bk-102',
    studentId: 'stud-ayesha',
    studentName: 'Ayesha Khan',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    studentEmail: 'ayesha.khan@gmail.com',
    studentPhone: '+92 334 9876543',
    tutorId: 'tutor-maria',
    tutorName: 'Dr. Maria Qureshi',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    subjectName: 'MDCAT Biology & Chemistry',
    sessionType: 'trial',
    classMode: 'online',
    date: '2026-08-19',
    timeSlot: '17:00 - 18:00',
    amountPKR: 500,
    status: 'confirmed',
    paymentStatus: 'completed',
    paymentMethod: 'easypaisa',
    meetingPlatform: 'builtin',
    classRoomId: 'room-bio-404',
    notes: 'Trial diagnostic session on Biological Molecules & Genetics.',
    createdAt: '2026-08-16'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'tutor-salman',
    senderName: 'Prof. Salman Ahmed',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    receiverId: 'stud-ayesha',
    text: 'Assalam-o-Alaikum Ayesha, please review the formula sheet for Electromagnetic Induction before our class tomorrow.',
    timestamp: 'Yesterday at 5:15 PM',
    isRead: true,
    fileAttachment: {
      name: 'A_Level_Physics_EM_Induction_Notes.pdf',
      url: '#',
      size: '2.4 MB',
      type: 'pdf'
    }
  },
  {
    id: 'msg-2',
    senderId: 'stud-ayesha',
    senderName: 'Ayesha Khan',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    receiverId: 'tutor-salman',
    text: 'Walaikum Assalam Sir! Yes, I solved 5 past paper questions from May/June 2022 variant 42 as well.',
    timestamp: 'Yesterday at 5:30 PM',
    isRead: true
  },
  {
    id: 'msg-3',
    senderId: 'tutor-salman',
    senderName: 'Prof. Salman Ahmed',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    receiverId: 'stud-ayesha',
    text: 'Excellent! We will go over question 4 step-by-step on our digital whiteboard.',
    timestamp: 'Today at 10:14 AM',
    voiceNoteDuration: 18,
    isRead: false
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    tutorId: 'tutor-salman',
    tutorName: 'Prof. Salman Ahmed',
    studentId: 'stud-ayesha',
    studentName: 'Ayesha Khan',
    subject: 'Physics (A-Level)',
    title: 'Electromagnetism & Lenz Law Past Paper Topical 2021-2023',
    description: 'Solve all structured questions in Section B. Show detailed units and vector direction diagrams.',
    dueDate: '2026-08-20',
    totalMarks: 50,
    attachmentName: 'Lenz_Law_Worksheet_A2.pdf',
    status: 'submitted',
    submittedAt: '2026-08-16',
    submissionFileName: 'Ayesha_Khan_Physics_HW3.pdf',
    submissionNotes: 'Completed all 8 problems. Pls check Q6 Lenz law diagram.',
    marksObtained: 48,
    tutorFeedback: 'Superb work! Accurate vector representations. Keep it up.'
  },
  {
    id: 'asg-2',
    tutorId: 'tutor-maria',
    tutorName: 'Dr. Maria Qureshi',
    studentId: 'stud-ayesha',
    studentName: 'Ayesha Khan',
    subject: 'MDCAT Biology',
    title: 'DNA Replication & Transcription High-Yield MCQ Worksheet',
    description: '40 MCQs timed test. Maximum allowed time: 30 minutes without reference book.',
    dueDate: '2026-08-22',
    totalMarks: 40,
    attachmentName: 'MDCAT_Genetics_DrMaria.pdf',
    status: 'pending'
  }
];

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    tutorId: 'tutor-salman',
    tutorName: 'Prof. Salman Ahmed',
    subject: 'Physics (A-Level)',
    title: 'Cambridge A2 Physics Formula Book & Derivation Guide (2026 Edition)',
    category: 'Formula Sheet',
    fileType: 'pdf',
    fileSize: '4.8 MB',
    downloadUrl: '#',
    uploadedDate: '2026-07-20',
    targetLevel: 'A-Levels',
    downloadCount: 420
  },
  {
    id: 'mat-2',
    tutorId: 'tutor-maria',
    tutorName: 'Dr. Maria Qureshi',
    subject: 'MDCAT Biology',
    title: 'UHS & NUMS Past 10 Years Solved MDCAT MCQs with Explanations',
    category: 'Past Paper',
    fileType: 'pdf',
    fileSize: '12.6 MB',
    downloadUrl: '#',
    uploadedDate: '2026-08-01',
    targetLevel: 'MDCAT / FSc',
    downloadCount: 890
  },
  {
    id: 'mat-3',
    tutorId: 'tutor-hamza',
    tutorName: 'Engr. Hamza Malik',
    subject: 'Mathematics',
    title: 'Integration by Parts & Substitution Quick Revision Cheat Sheet',
    category: 'Lecture Notes',
    fileType: 'pdf',
    fileSize: '1.9 MB',
    downloadUrl: '#',
    uploadedDate: '2026-08-05',
    targetLevel: 'FSc & A-Levels',
    downloadCount: 610
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'txn-9901',
    bookingId: 'bk-101',
    studentId: 'stud-ayesha',
    studentName: 'Ayesha Khan',
    tutorId: 'tutor-salman',
    tutorName: 'Prof. Salman Ahmed',
    amountPKR: 2500,
    platformFeePKR: 375, // 15% platform commission
    tutorEarningsPKR: 2125,
    paymentMethod: 'jazzcash',
    transactionRef: 'JC-88349201948',
    date: '2026-08-16',
    status: 'completed',
    invoiceNumber: 'INV-PK-2026-0089'
  },
  {
    id: 'txn-9902',
    bookingId: 'bk-102',
    studentId: 'stud-ayesha',
    studentName: 'Ayesha Khan',
    tutorId: 'tutor-maria',
    tutorName: 'Dr. Maria Qureshi',
    amountPKR: 500,
    platformFeePKR: 75,
    tutorEarningsPKR: 425,
    paymentMethod: 'easypaisa',
    transactionRef: 'EP-44910293812',
    date: '2026-08-16',
    status: 'completed',
    invoiceNumber: 'INV-PK-2026-0090'
  }
];

export const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wd-501',
    tutorId: 'tutor-salman',
    tutorName: 'Prof. Salman Ahmed',
    amountPKR: 28000,
    paymentMethod: 'bank_transfer',
    accountTitle: 'Salman Ahmed',
    accountNumber: 'PK42MEZN0001092837461902',
    bankName: 'Meezan Bank Ltd (Gulberg Branch)',
    requestedAt: '2026-08-15',
    status: 'approved',
    processedAt: '2026-08-16',
    adminNotes: 'Transferred via 1Link IBFT.'
  },
  {
    id: 'wd-502',
    tutorId: 'tutor-maria',
    tutorName: 'Dr. Maria Qureshi',
    amountPKR: 15500,
    paymentMethod: 'jazzcash',
    accountTitle: 'Maria Qureshi',
    accountNumber: '03219845120',
    requestedAt: '2026-08-17',
    status: 'pending'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'stud-ayesha',
    title: 'Class Reminder 🔔',
    message: 'Your A-Level Physics class with Prof. Salman Ahmed starts tomorrow at 4:30 PM.',
    type: 'class',
    createdAt: '1 hour ago',
    isRead: false
  },
  {
    id: 'notif-2',
    userId: 'stud-ayesha',
    title: 'Payment Successful ✅',
    message: 'Rs. 2,500 successfully paid via JazzCash for Booking #BK-101. Invoice generated.',
    type: 'payment',
    createdAt: '1 day ago',
    isRead: true
  },
  {
    id: 'notif-3',
    userId: 'stud-ayesha',
    title: 'Assignment Graded 📝',
    message: 'Prof. Salman graded your Electromagnetism worksheet (48/50 Marks).',
    type: 'assignment',
    createdAt: '2 days ago',
    isRead: true
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'how-to-score-a-star-cambridge-physics-pakistan',
    title: 'How to Score Straight A*s in Cambridge O & A Level Physics',
    titleUrdu: 'کیمبرج او اور اے لیول فزکس میں A* حاصل کرنے کا مکمل گائیڈ',
    excerpt: 'Expert tips on topical past paper drills, mastering definitions, experimental physics Paper 3/5, and time allocation during the exam.',
    excerptUrdu: 'پاسٹ پیپرز کی مشق، تعریفات پر عبور اور امتحان کے دوران وقت کی درست تقسیم کے اہم طریقے',
    authorName: 'Prof. Salman Ahmed',
    authorRole: 'Senior Cambridge Physics Specialist',
    category: 'Exam Preparation',
    publishedDate: 'August 12, 2026',
    readTimeMinutes: 6,
    featuredImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    metaTitle: 'How to Score A* in O/A Level Physics in Pakistan | TutorHub',
    metaDescription: 'Step-by-step study guide by LUMS gold medalist Prof. Salman on scoring A* in Cambridge CAIE Physics exams.',
    keywords: ['O Level Physics Pakistan', 'A Level Physics Tutor Lahore', 'CAIE Past Papers', 'TutorHub'],
    ogImage: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=80',
    content: `
### Mastering Cambridge Physics in Pakistan

Achieving an A* in Cambridge IGCSE, O-Level, or A-Level Physics requires more than just memorizing textbook formulas. The CAIE examiners test conceptual clarity, application of principles in novel situations, and mathematical precision.

#### 1. Focus on Command Words
Examiners in Pakistan frequently report that students lose marks because they confuse **State**, **Describe**, and **Explain**:
- **State**: Simply write the scientific term or law without lengthy reasoning.
- **Describe**: Detail what happens (e.g., "the needle deflects right then returns to zero").
- **Explain**: Give the scientific reason why (e.g., "due to changing magnetic flux and Lenz's law opposing the motion").

#### 2. The 10-Year Topical Strategy
Never jump to yearly past papers too early. First, master **Topical Past Papers** right after finishing each unit (Mechanics, Waves, Thermodynamics, Electromagnetism). Once your accuracy reaches 85%+, shift to timed yearly papers from 2018 to 2025.

#### 3. Online 1-on-1 Guidance
Working with a verified tutor on TutorHub allows you to screen-share complex circuit diagrams, get instantaneous feedback on derivation steps, and build exam confidence.
    `
  },
  {
    id: 'blog-2',
    slug: 'mdcat-preparation-tips-pakistan-medical-colleges',
    title: 'Ultimate MDCAT Preparation Strategy for Top Medical Colleges in Pakistan',
    titleUrdu: 'پاکستان کے ٹاپ میڈیکل کالجز کے لیے ایم ڈی کیٹ تیاری کی بہترین حکمت عملی',
    excerpt: 'Detailed roadmap for Punjab, Sindh, and KPK MDCAT aspirants: high-yield biology chapters, chemistry numerical shortcuts, and mock tests.',
    excerptUrdu: 'پنجاب، سندھ اور خیبر پختونخوا کے طلباء کے لیے حیاتیات اور کیمسٹری کے شارٹ کٹس اور ماک ٹیسٹ',
    authorName: 'Dr. Maria Qureshi',
    authorRole: 'MBBS (King Edward) & MDCAT Mentor',
    category: 'Study Tips',
    publishedDate: 'August 08, 2026',
    readTimeMinutes: 8,
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    metaTitle: 'MDCAT Preparation Strategy Pakistan | King Edward Doctor Guide',
    metaDescription: 'Dr. Maria Qureshi shares high-yield tips and time management secrets to score 190+ in MDCAT 2026.',
    keywords: ['MDCAT Prep Pakistan', 'King Edward Medical University', 'NUMS Entry Test', 'TutorHub MDCAT'],
    ogImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    content: `
### Cracking the MDCAT with 190+ Score

Competition for public sector medical seats in Pakistan is intense, with over 200,000 students competing for approximately 5,000 merit seats.

#### 1. Textbooks are Your Quran in Biology
In Biology, 95% of questions are direct line-by-line statements from your provincial textbook board (PTB, Sindh Board, KPK Board) along with Federal Board inclusions. Make color-coded sticky notes on diagrams and cycles (Krebs cycle, Calvin cycle, action potential).

#### 2. Chemistry: Organic Reaction Mechanisms
Do not memorize reactions in isolation. Understand nucleophilic substitution, electrophilic addition, and resonance. Once you know the mechanism, you can predict products of any question effortlessly.

#### 3. Daily MCQ Practice
Aim for at least **150 to 200 MCQs daily** with strict timer conditions. Analyze every wrong answer and maintain a "Mistake Register".
    `
  },
  {
    id: 'blog-3',
    slug: 'top-in-demand-tech-freelancing-skills-pakistan',
    title: 'Top In-Demand Tech Skills for Pakistani Students to Earn in Dollars in 2026',
    titleUrdu: 'پاکستانی طلباء کے لیے 2026 میں ڈالر کمانے کی سرفہرست ٹیک اور فری لانسنگ مہارتیں',
    excerpt: 'Discover why React, Full-Stack, AI integration, and Figma UI/UX are the highest paying freelance skills on Upwork & Fiverr.',
    excerptUrdu: 'اپ ورک اور فائیور پر سب سے زیادہ معاوضہ دینے والی پروگرامنگ، ڈیزائن اور AI مہارتیں',
    authorName: 'Bilal Tariq',
    authorRole: 'Senior Full-Stack Architect & Upwork Top Rated',
    category: 'Career Guidance',
    publishedDate: 'August 02, 2026',
    readTimeMinutes: 5,
    featuredImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    metaTitle: 'Best Freelancing Tech Skills in Pakistan | Learn & Earn Dollars',
    metaDescription: 'Learn high-income digital skills in Pakistan: Web development, AI prompting, and UI/UX design with 1-on-1 mentorship.',
    keywords: ['Freelancing in Pakistan', 'Learn React Pakistan', 'Upwork Freelance Skills', 'TutorHub'],
    ogImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    content: `
### Freelancing in Pakistan: The Dollar Opportunity

Pakistan is ranked among the top 4 freelancing countries globally. For university and college students, mastering a high-demand tech skill can secure financial independence before graduation.

#### The Big 4 Skills for 2026:
1. **Full-Stack JavaScript (React, Next.js, Node.js)**
2. **AI Workflows & API Integrations (Gemini, OpenAI, Claude)**
3. **UI/UX Design in Figma**
4. **Data Analytics & Advanced Excel / Power BI**

With personalized mentorship on TutorHub, you can build real portfolio projects and learn the art of proposal writing for Upwork and Fiverr.
    `
  }
];

export const INITIAL_PLATFORM_STATS: PlatformReportStats = {
  totalRevenuePKR: 14850000,
  monthlyRevenuePKR: 2840000,
  platformCommissionPKR: 426000,
  totalStudents: 45200,
  totalTutors: 5400,
  verifiedTutors: 4850,
  totalClassesDelivered: 128400,
  averageSatisfactionRate: 4.91,
  topSubjects: [
    { name: 'Physics (O/A Level)', bookings: 4120, revenuePKR: 10300000 },
    { name: 'MDCAT Biology & Chem', bookings: 3890, revenuePKR: 11670000 },
    { name: 'Mathematics (School/Uni)', bookings: 5400, revenuePKR: 11880000 },
    { name: 'IELTS Preparation', bookings: 2980, revenuePKR: 7450000 },
    { name: 'Web Dev & AI Skills', bookings: 2150, revenuePKR: 6020000 },
    { name: 'Quran with Tajweed', bookings: 3600, revenuePKR: 4320000 }
  ],
  cityDistribution: [
    { city: 'Lahore', students: 16800, tutors: 1950 },
    { city: 'Karachi', students: 14200, tutors: 1680 },
    { city: 'Islamabad', students: 6900, tutors: 890 },
    { city: 'Rawalpindi', students: 3400, tutors: 420 },
    { city: 'Faisalabad', students: 2100, tutors: 260 },
    { city: 'Multan', students: 1800, tutors: 200 },
    { city: 'Peshawar', students: 1600, tutors: 190 },
    { city: 'Quetta', students: 950, tutors: 110 }
  ],
  monthlyGrowth: [
    { month: 'Mar 2026', students: 32000, bookings: 7800, revenuePKR: 19500000 },
    { month: 'Apr 2026', students: 35400, bookings: 8900, revenuePKR: 22250000 },
    { month: 'May 2026', students: 39000, bookings: 9800, revenuePKR: 24500000 },
    { month: 'Jun 2026', students: 41800, bookings: 10600, revenuePKR: 26500000 },
    { month: 'Jul 2026', students: 43900, bookings: 11200, revenuePKR: 28000000 },
    { month: 'Aug 2026', students: 45200, bookings: 11800, revenuePKR: 29500000 }
  ]
};
