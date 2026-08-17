import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Share2,
  Bookmark
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Cambridge O/A Levels', 'MDCAT & ECAT', 'Study Strategies', 'Tech & Coding', 'Parent Guides'];

  const articles = [
    {
      id: 'mdcat-2025-prep',
      title: 'How to Score 190+ in MDCAT: Complete Biology & Chemistry Roadmap by KEMU Position Holders',
      category: 'MDCAT & ECAT',
      author: 'Dr. Maria Qureshi (KEMU)',
      readTime: '6 min read',
      date: 'Jan 15, 2025',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      summary:
        'Proven mnemonic methods, high-yield PMDC syllabus topics, past paper timing strategies, and how 1-on-1 tutoring bridges conceptual gaps for Punjab, Sindh & Federal aspirants.'
    },
    {
      id: 'cambridge-past-papers',
      title: 'Top 7 Common Mistakes Pakistani Students Make in CAIE O/A Level Physics & Mathematics',
      category: 'Cambridge O/A Levels',
      author: 'Prof. Salman Ahmed',
      readTime: '8 min read',
      date: 'Jan 10, 2025',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
      summary:
        'Examiner report breakdowns on vector components, calculus mechanics derivations, unit conversions, and formula sheets that differentiate A* candidates from B grades.'
    },
    {
      id: 'freelance-developer-guide',
      title: 'Bridging the FAST-NUCES & University Syllabus to High-Income US Remote Tech Jobs in 2025',
      category: 'Tech & Coding',
      author: 'Bilal Tariq',
      readTime: '5 min read',
      date: 'Jan 04, 2025',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
      summary:
        'Why Pakistani CS students must master React, TypeScript, Next.js, and AI SDKs early alongside university degrees to land remote contracts earning in USD.'
    },
    {
      id: 'online-vs-home-tuition',
      title: 'Online Whiteboard Tutoring vs Traditional Home Tuitions in Lahore & Karachi: Cost & Efficiency Audit',
      category: 'Parent Guides',
      author: 'Academic Research Team',
      readTime: '4 min read',
      date: 'Dec 28, 2024',
      image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=600&auto=format&fit=crop&q=80',
      summary:
        'Comparing travel time savings, safety, screen recordability, and access to top nationwide subject matter experts versus local neighborhood academy commuting.'
    }
  ];

  const filteredArticles = selectedTag === 'All' ? articles : articles.filter(a => a.category === selectedTag);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>TutorHub Academic Journal & Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pakistani Education Insights & Study Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Curated tips on Cambridge CAIEs, MDCAT/ECAT, Board exam distinctions, and high-income digital career pathways.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedTag === tag
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map(art => (
            <div
              key={art.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-emerald-700 dark:text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      {art.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4">
                <span className="text-[11px] text-slate-400 font-medium">{art.date}</span>
                <button
                  onClick={() => setCurrentPage('find-tutors')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
