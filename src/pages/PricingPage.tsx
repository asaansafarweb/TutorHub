import React from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  CreditCard,
  Building,
  GraduationCap,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { setCurrentPage, setAuthModalOpen, setAuthDefaultRole } = useApp();

  const plans = [
    {
      name: 'Diagnostic Trial',
      badge: 'Free or Subsidized',
      price: '0 - 500',
      period: 'per 25-min session',
      desc: 'Ideal for testing tutor compatibility, reviewing syllabus difficulty, and past paper diagnostics.',
      features: [
        '25-min 1-on-1 video session',
        'Interactive whiteboard access',
        'Syllabus & weakness audit',
        'Direct chat with tutor before booking',
        'Zero commitment required'
      ],
      cta: 'Book Trial Session',
      popular: false,
      buttonStyle: 'border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
    },
    {
      name: 'Hourly Standard Class',
      badge: 'Most Popular',
      price: '1,500 - 3,500',
      period: 'per 60-min class',
      desc: 'Pay as you go for deep concept explanation, problem-solving derivations, and topic drills.',
      features: [
        '60-min dedicated live class',
        'Whiteboard notes auto-saved as PDF',
        'Custom homework & past paper grading',
        'Recording replay available for 30 days',
        'Instant reschedule flexibility',
        'Pay with JazzCash / Easypaisa / Cards'
      ],
      cta: 'Find Tutors by Rate',
      popular: true,
      buttonStyle: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30'
    },
    {
      name: 'Monthly Master Package',
      badge: 'Save 15%',
      price: '16,000 - 36,000',
      period: '12 classes / month (3x week)',
      desc: 'Complete curriculum mastery for Cambridge O/A Levels, Matric/FSc, or MDCAT/ECAT targets.',
      features: [
        '12 full live classes (3 per week)',
        '24/7 WhatsApp priority doubt solver',
        'Weekly graded quizzes & parent report cards',
        'Mock exam grading according to CAIE rubrics',
        'Dedicated backup tutor support guarantee',
        '100% money-back satisfaction warranty'
      ],
      cta: 'Explore Monthly Tutors',
      popular: false,
      buttonStyle: 'border border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transparent Pakistani Rupee (PKR) Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fair & Transparent Rates for Every Budget
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            No hidden platform fees. Pay tutors directly for what you learn. All sessions protected by our 100% Satisfaction Guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl bg-white dark:bg-slate-900 border p-8 flex flex-col justify-between transition-all duration-200 shadow-sm relative ${
                plan.popular
                  ? 'border-emerald-500 dark:border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{plan.name}</h3>
                    {!plan.popular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{plan.desc}</p>
                </div>

                <div className="border-y border-slate-100 dark:border-slate-800 py-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-400 font-bold">PKR</span>
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">{plan.period}</div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Included Features:
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setCurrentPage('find-tutors')}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${plan.buttonStyle}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                100% Lesson Satisfaction Guarantee
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 max-w-xl leading-relaxed">
                If you are not satisfied with your first session, we will either provide a full 100% refund to your JazzCash / Bank account or match you with another top tutor free of charge.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('find-tutors')}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 whitespace-nowrap"
          >
            Start Learning Risk-Free
          </button>
        </div>
      </div>
    </div>
  );
};
