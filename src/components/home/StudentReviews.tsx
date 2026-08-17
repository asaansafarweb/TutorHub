import React from 'react';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';

export const StudentReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Ayesha Khan',
      city: 'Islamabad',
      role: 'A-Level Student (Beaconhouse Margalla)',
      tutorName: 'Prof. Salman Ahmed',
      subject: 'Cambridge Physics A2',
      rating: 5,
      comment:
        'Finding a trusted Cambridge Physics teacher in Islamabad used to be difficult. Prof. Salman taught me on TutorHub with interactive whiteboard derivations. I scored A* in my final CAIE exam! Paid via JazzCash without any hassle.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      badge: 'Score: A* in Physics'
    },
    {
      id: 2,
      name: 'Dr. Tariq Mahmood (Parent)',
      city: 'Lahore (DHA Phase 5)',
      role: 'Parent of MDCAT Aspirant',
      tutorName: 'Dr. Maria Qureshi',
      subject: 'MDCAT Biology & Chemistry',
      rating: 5,
      comment:
        'My daughter Fatima prepared with Dr. Maria for 4 months on TutorHub. Her conceptual mnemonics for Human Physiology were top-notch. She secured 191/200 and got admission in King Edward Medical University!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      badge: 'King Edward MBBS Seat'
    },
    {
      id: 3,
      name: 'Hamza Farooq',
      city: 'Karachi (Gulshan-e-Iqbal)',
      role: 'FAST-NUCES CS Student',
      tutorName: 'Bilal Tariq',
      subject: 'Full-Stack React & AI',
      rating: 5,
      comment:
        'Sir Bilal helped me transition from standard university theory to building real SaaS products. Within 3 months of mentorship, I landed a remote US frontend developer internship paying in USD!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      badge: 'Remote Dev Job'
    },
    {
      id: 4,
      name: 'Mrs. Saima Jameel',
      city: 'Dubai (Overseas Pakistani)',
      role: 'Mother of 2 Kids',
      tutorName: 'Ustadh Hafiz Zohaib',
      subject: 'Quran with Tajweed & Urdu',
      rating: 5,
      comment:
        'Living in Dubai, we wanted authentic Pakistani Quran and Urdu teachers for our kids. Ustadh Zohaib is extremely polite, punctual, and engages the children with visual Makhaarij slides.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      badge: 'Overseas Learner'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Real Verified Pakistani Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Students & Parents Say
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            Over 45,000+ Pakistani and overseas learners achieve their dream university admissions and skills with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map(rev => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                {/* Rating stars & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {rev.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-500"
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {rev.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{rev.city}</span>
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
                    {rev.subject}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
