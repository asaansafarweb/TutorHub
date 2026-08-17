import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  FileText,
  Lock,
  Database,
  CheckCircle2,
  Server,
  Layers,
  Code,
  Key,
  ExternalLink
} from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last updated: January 2025 • TutorHub Pakistan (Pvt) Ltd</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and registering on TutorHub Pakistan (web, mobile, or integrated portals), students, parents, and educators agree to adhere to these Terms of Service in compliance with the Electronic Transactions Ordinance and the laws of the Islamic Republic of Pakistan.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">2. Tutor Accreditation & CNIC Vetting</h2>
            <p>
              All tutors listed on TutorHub must submit valid Pakistani National Identity Cards (CNIC) or official passports alongside verifiable academic degrees. Misrepresentation of qualifications results in immediate profile de-activation and forfeiture of pending balances.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">3. Payments, JazzCash Escrow & Refunds</h2>
            <p>
              Tuition payments are securely held in platform escrow until scheduled sessions are conducted successfully. Students are entitled to a 100% refund or free tutor re-assignment if reported within 24 hours of an unsatisfactory session.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">4. Code of Conduct & Child Safety</h2>
            <p>
              TutorHub maintains a zero-tolerance policy against harassment, abuse, or improper conduct. All virtual classroom recordings are stored securely for quality audit and student safety purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Protecting student & tutor data across Pakistan</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">1. Information Collection</h2>
            <p>
              We collect user registration data including full name, phone number, email address, city, education board/curriculum, and CNIC credentials (for educators only) strictly for authentication and service delivery.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">2. Payment Security</h2>
            <p>
              Financial transactions via JazzCash, Easypaisa, 1Link, and Card switches are processed over 256-bit TLS encrypted gateways. TutorHub does not store full credit card CVV codes or MPIN numbers on its servers.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">3. Data Sharing & Third Parties</h2>
            <p>
              Student contact numbers are shared only with the specifically booked tutor to facilitate class coordination. We never sell personal information to third-party marketing brokers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DbSchemaViewer: React.FC = () => {
  const { tutors, students, bookings, assignments, studyMaterials } = useApp();

  const collections = [
    {
      name: 'users / tutors',
      count: tutors.length,
      icon: <Server className="w-4 h-4 text-emerald-600" />,
      schema: `{
  id: string (PK),
  name: string,
  email: string,
  phone: string (+92...),
  role: 'tutor' | 'student' | 'admin',
  cnicNumber: string,
  city: 'Lahore' | 'Karachi' | 'Islamabad'...,
  qualification: string,
  experienceYears: number,
  hourlyRatePKR: number,
  trialRatePKR: number,
  isVerified: boolean,
  rating: number,
  subjects: Array<{ subjectId, subjectName, category, hourlyRatePKR }>
}`
    },
    {
      name: 'bookings / sessions',
      count: bookings.length,
      icon: <Layers className="w-4 h-4 text-teal-600" />,
      schema: `{
  id: string (PK),
  studentId: string (FK),
  tutorId: string (FK),
  subjectName: string,
  sessionType: 'trial' | 'single_class' | 'monthly_package',
  classMode: 'online' | 'in_person',
  date: string (YYYY-MM-DD),
  timeSlot: string (PST),
  amountPKR: number,
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled',
  paymentStatus: 'completed' | 'pending',
  paymentMethod: 'jazzcash' | 'easypaisa' | 'stripe' | 'bank_transfer',
  meetingPlatform: 'builtin' | 'zoom' | 'google_meet'
}`
    },
    {
      name: 'assignments & submissions',
      count: assignments.length,
      icon: <FileText className="w-4 h-4 text-blue-600" />,
      schema: `{
  id: string (PK),
  tutorId: string (FK),
  studentId: string (FK),
  subject: string,
  title: string,
  dueDate: string,
  status: 'pending' | 'submitted' | 'graded',
  totalMarks: number,
  obtainedMarks?: number,
  feedback?: string
}`
    },
    {
      name: 'study_materials / resources',
      count: studyMaterials.length,
      icon: <Database className="w-4 h-4 text-purple-600" />,
      schema: `{
  id: string (PK),
  title: string,
  subject: string,
  curriculum: 'Cambridge O-Level' | 'MDCAT' | 'A-Level'...,
  fileType: 'PDF' | 'ZIP' | 'DOCX',
  fileSize: string,
  downloadCount: number,
  verifiedByTutor: boolean
}`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Database className="w-3.5 h-3.5" />
            <span>Architecture & Data Models</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            System Database Schema & Storage Entities
          </h1>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Interactive overview of relational models powering TutorHub Pakistan's real-time state, payments, and multi-role operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">{col.icon}</div>
                  <h3 className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {col.name}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {col.count} Records in State
                </span>
              </div>

              <div className="bg-slate-900 dark:bg-black/80 rounded-2xl p-4 overflow-x-auto text-emerald-400 font-mono text-[11px] leading-relaxed border border-slate-800">
                <pre>{col.schema}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
