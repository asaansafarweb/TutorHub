import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, CreditCard, Video, Users } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How are tutors on TutorHub Pakistan verified?',
      a: 'Every educator undergoes a mandatory 3-tier verification process: (1) CNIC and National ID identity verification, (2) Degree verification from recognized universities (LUMS, NUST, KEMU, FAST, IBA, etc.) or Cambridge/British Council accreditations, and (3) A mandatory 15-minute live interview and teaching demo.'
    },
    {
      q: 'What payment methods can I use to pay for classes in Pakistan?',
      a: 'We support all major Pakistani payment options: JazzCash, Easypaisa, 1Link Bank Transfer (Meezan, HBL, UBL, Alfalah, etc.), as well as Visa / MasterCard / UnionPay debit and credit cards. Overseas students can also pay seamlessly using PayPal or international cards.'
    },
    {
      q: 'How does the interactive virtual classroom work?',
      a: 'Our built-in online classroom requires zero software installations—it runs directly in any modern browser on laptops, tablets, or smartphones. It features a collaborative digital drawing whiteboard, screen sharing for past papers, HD video, attendance tracking, and downloadable class notes. Zoom, Google Meet, and MS Teams links are also supported.'
    },
    {
      q: 'Can I book a trial lesson before committing to a full package?',
      a: 'Yes! Most tutors offer a free 20-30 minute trial diagnostic session or a discounted introductory class. This allows you to discuss syllabus goals, past paper challenges, and assess teaching compatibility.'
    },
    {
      q: 'What is your refund and reschedule policy?',
      a: 'If a tutor is unable to conduct a scheduled session or if you are dissatisfied with a paid session within 24 hours, you can request an instant 100% refund or free reschedule directly from your Student Portal under Payments & Invoices.'
    },
    {
      q: 'How do tutors receive their payouts in Pakistan?',
      a: 'Tutors can request withdrawal of their earned balance at any time directly into their JazzCash mobile account, Easypaisa wallet, or any Pakistani commercial bank account via 1Link IBFT with fast 24-hour turnaround.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers to Common Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Everything you need to know about booking, verified tutors, and payments.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
