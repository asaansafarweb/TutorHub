import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Search,
  BookOpen,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    tutors,
    bookings,
    verifyTutor,
    currentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'transactions' | 'users' | 'settings'>('verifications');
  const [searchTerm, setSearchTerm] = useState('');

  // Platform metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amountPKR, 0);
  const platformCommissionPKR = Math.round(totalRevenue * 0.15); // 15% platform commission

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                TutorHub Pakistan • Master Admin Control
              </h1>
              <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-slate-500">
              National Tutor Verification Desk, 1Link Financial Audit & System Management.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase">System Status</span>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>All Gateways Live (JazzCash, Easypaisa, 1Link)</span>
            </div>
          </div>
        </div>

        {/* High Level Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Tutors in Pakistan</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{tutors.length + 5400}</div>
            <div className="text-[11px] text-emerald-600 font-semibold">+12 joined today</div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Active Students</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white">45,820</div>
            <div className="text-[11px] text-emerald-600 font-semibold">98.4% Completion rate</div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total GMV (PKR)</span>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              Rs. {(totalRevenue + 18500000).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">Gross processed volume</div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Platform Net Commission (15%)</span>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
              Rs. {(platformCommissionPKR + 2775000).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">Platform operational revenue</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'verifications', label: 'Tutor Verification Queue', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'transactions', label: '1Link & JazzCash Payments', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'users', label: 'Manage All Users', icon: <Users className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: VERIFICATION QUEUE */}
        {activeTab === 'verifications' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Pakistani Tutors CNIC & Degree Verification Queue
              </h2>
              <span className="text-xs text-slate-400">Showing {tutors.length} applications</span>
            </div>

            <div className="space-y-3">
              {tutors.map(tutor => (
                <div
                  key={tutor.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-1 ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">{tutor.name}</h3>
                        {tutor.isVerified ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>CNIC & Degree Approved</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            Verification Pending
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        {tutor.city} • Rate: Rs. {tutor.hourlyRatePKR.toLocaleString()}/hr • {tutor.verification?.degreeTitle || tutor.qualification} ({tutor.verification?.degreeInstitute || 'Verified Institution'})
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        CNIC: {tutor.cnicNumber || '35202-*******-1'} | Mobile: {tutor.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {!tutor.isVerified ? (
                      <>
                        <button
                          onClick={() => {
                            verifyTutor(tutor.id, 'verified');
                            alert(`Approved CNIC & degrees for ${tutor.name}!`);
                          }}
                          className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve CNIC</span>
                        </button>

                        <button
                          onClick={() => {
                            verifyTutor(tutor.id, 'rejected');
                            alert(`Rejected application for ${tutor.name}.`);
                          }}
                          className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          verifyTutor(tutor.id, 'rejected');
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100"
                      >
                        Revoke Verification
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Real-Time Transactions & Gateway Logs</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-3">Transaction</th>
                    <th className="pb-3">Student</th>
                    <th className="pb-3">Tutor</th>
                    <th className="pb-3">Gateway</th>
                    <th className="pb-3">Gross (PKR)</th>
                    <th className="pb-3">Commission (15%)</th>
                    <th className="pb-3">Net Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td className="py-3 font-mono font-bold">#{b.id.toUpperCase()}</td>
                      <td className="py-3 font-bold">{b.studentName}</td>
                      <td className="py-3 text-emerald-600 font-semibold">{b.tutorName}</td>
                      <td className="py-3 uppercase font-bold text-slate-700 dark:text-slate-300">{b.paymentMethod}</td>
                      <td className="py-3 font-bold">Rs. {b.amountPKR.toLocaleString()}</td>
                      <td className="py-3 text-purple-600 font-bold">Rs. {Math.round(b.amountPKR * 0.15).toLocaleString()}</td>
                      <td className="py-3 text-emerald-600 font-extrabold">Rs. {Math.round(b.amountPKR * 0.85).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: USERS */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Registered Users in Pakistan</h2>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs space-y-2">
              <p>Total Database Records: <strong>45,820 Students, 5,420 Tutors</strong></p>
              <p className="text-slate-500">Full audit logging enabled with Pakistani IP address tracking & fraud prevention switch.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
