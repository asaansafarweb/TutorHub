import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Building2,
  Languages,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { SubjectCategory } from '../../types';

export const SubjectCategories: React.FC = () => {
  const { categories, setCurrentPage, setSearchQuery, setSelectedCategoryFilter, language } = useApp();
  const [activeCatId, setActiveCatId] = useState<string>(categories[0]?.id || 'cat-school');

  const activeCategory = categories.find(c => c.id === activeCatId) || categories[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Languages':
        return <Languages className="w-5 h-5" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleSubjectClick = (subjectName: string, categoryName: string) => {
    setSearchQuery(subjectName);
    setSelectedCategoryFilter(categoryName);
    setCurrentPage('find-tutors');
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Explore Curriculum & Subjects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Find Tutors by Subject & Level
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              From Federal & Cambridge board exams to high-income programming and IELTS mastery.
            </p>
          </div>

          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategoryFilter('All');
              setCurrentPage('find-tutors');
            }}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 self-start md:self-auto"
          >
            <span>View all 50+ subjects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
          {categories.map(cat => {
            const isSelected = cat.id === activeCatId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {getIcon(cat.icon)}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {cat.subjects.length} Subjects
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-xs sm:text-sm leading-tight">
                    {language === 'ur' ? cat.nameUrdu : cat.name}
                  </h3>
                  <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {cat.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Subjects Grid in Active Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {activeCategory?.subjects.map(sub => (
            <div
              key={sub.id}
              onClick={() => handleSubjectClick(sub.name, activeCategory.name)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {sub.name}
                  </h4>
                  {sub.popular && (
                    <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-md">
                      Hot
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {sub.nameUrdu} • {sub.level} Level
                </p>

                <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>
                    👥 <strong>{sub.tutorCount}</strong> Tutors
                  </span>
                  <span>•</span>
                  <span>
                    Avg: <strong>Rs. {sub.avgHourlyRatePKR.toLocaleString()}</strong>/hr
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 group-hover:bg-emerald-600 group-hover:text-white text-slate-400 flex items-center justify-center transition-all shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
