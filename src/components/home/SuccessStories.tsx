import React from 'react';
import { Award, Trophy, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuccessStories: React.FC = () => {
  const { setCurrentPage } = useApp();

  const stories = [
    {
      title: '8 Straight A*s in Cambridge O-Levels',
      student: 'Zainab Qureshi (Karachi)',
      metric: '8 A* Grades',
      tag: 'CAIE Distinction',
      desc: 'Mastered Chemistry and Add-Math past papers with targeted 1-on-1 weekly masterclasses from LUMS & IBA tutors on TutorHub.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'Secured Merit Seat in King Edward Medical University',
      student: 'Muhammad Saad (Lahore)',
      metric: '192 / 200 MDCAT',
      tag: 'MDCAT Top 50',
      desc: 'Intensive biology mnemonics and chemistry numerical drills with Dr. Maria Qureshi boosted my score by 24 marks.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80'
    },
    {
      title: 'From College Dropout to $2k/mo Remote Developer',
      student: 'Bilal Hassan (Faisalabad)',
      metric: '$2,400 / month',
      tag: 'Tech Career',
      desc: 'Learned Full-Stack React and AI APIs through real projects. Landed 3 long-term clients on Upwork within 4 months.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Inspiring Proven Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Student Success Stories Across Pakistan
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
            See how personalized mentorship turns academic challenges into stellar achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((s, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                  {s.tag}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-lg font-black text-amber-400">{s.metric}</div>
                  <div className="text-xs font-medium text-slate-200">{s.student}</div>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setCurrentPage('find-tutors')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Find a similar mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
