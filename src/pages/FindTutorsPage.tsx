import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Filter,
  ArrowUpDown,
  Heart,
  Calendar,
  Sparkles,
  BookOpen,
  DollarSign,
  GraduationCap,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { TutorProfile, PakistaniCity } from '../types';

export const FindTutorsPage: React.FC = () => {
  const {
    tutors,
    searchQuery,
    setSearchQuery,
    selectedCityFilter,
    setSelectedCityFilter,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setSelectedTutorId,
    setCurrentPage,
    openBookingForTutor,
    toggleFavoriteTutor,
    isTutorFavorite
  } = useApp();

  // Local Filter States
  const [maxHourlyRate, setMaxHourlyRate] = useState<number>(5000);
  const [selectedGender, setSelectedGender] = useState<'all' | 'Male' | 'Female'>('all');
  const [selectedMode, setSelectedMode] = useState<'all' | 'online' | 'in_person'>('all');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_low' | 'price_high' | 'experience'>('rating');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const cities: Array<PakistaniCity | 'All'> = [
    'All',
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta'
  ];

  const categories = [
    'All',
    'School Subjects (Matric & O/A Level)',
    'College & University (FSc, MDCAT, ECAT, BS)',
    'Languages & Test Preparation (IELTS, German, Arabic)',
    'Professional & Tech Skills (Coding, Design, Freelancing)'
  ];

  // Filtered & Sorted Tutors
  const filteredTutors = useMemo(() => {
    return tutors
      .filter(tut => {
        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = tut.name.toLowerCase().includes(q);
          const matchesHeadline = tut.headline.toLowerCase().includes(q);
          const matchesSubjects = tut.subjects.some(s => s.subjectName.toLowerCase().includes(q));
          const matchesCity = tut.city.toLowerCase().includes(q);
          if (!matchesName && !matchesHeadline && !matchesSubjects && !matchesCity) return false;
        }

        // City filter
        if (selectedCityFilter !== 'All' && tut.city !== selectedCityFilter) {
          return false;
        }

        // Category filter
        if (selectedCategoryFilter !== 'All') {
          const hasCat = tut.subjects.some(s => s.category.includes(selectedCategoryFilter) || selectedCategoryFilter.includes(s.category));
          if (!hasCat) return false;
        }

        // Gender filter
        if (selectedGender !== 'all' && tut.gender !== selectedGender) {
          return false;
        }

        // Mode filter
        if (selectedMode !== 'all') {
          if (selectedMode === 'online' && !tut.onlineAvailable) return false;
          if (selectedMode === 'in_person' && !tut.inPersonAvailable) return false;
        }

        // Hourly rate
        if (tut.hourlyRatePKR > maxHourlyRate) {
          return false;
        }

        // Verified only
        if (onlyVerified && !tut.isVerified) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_low') return a.hourlyRatePKR - b.hourlyRatePKR;
        if (sortBy === 'price_high') return b.hourlyRatePKR - a.hourlyRatePKR;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        return 0;
      });
  }, [
    tutors,
    searchQuery,
    selectedCityFilter,
    selectedCategoryFilter,
    selectedGender,
    selectedMode,
    maxHourlyRate,
    onlyVerified,
    sortBy
  ]);

  const handleTutorClick = (id: string) => {
    setSelectedTutorId(id);
    setCurrentPage('tutor-detail');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCityFilter('All');
    setSelectedCategoryFilter('All');
    setSelectedGender('all');
    setSelectedMode('all');
    setMaxHourlyRate(5000);
    setOnlyVerified(false);
    setSortBy('rating');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Find Verified Pakistani Tutors
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
              Showing <strong className="text-emerald-600">{filteredTutors.length}</strong> available educators across Pakistan
            </p>
          </div>

          {/* Quick Search and Mobile filter button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
              <span>Filters</span>
            </button>

            <div className="relative flex-1 md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search subject, name, city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar Filters + Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Sidebar Filter Panel (Desktop) */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
              >
                Reset all
              </button>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                City / Location
              </label>
              <select
                value={selectedCityFilter}
                onChange={e => setSelectedCityFilter(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {cities.map(c => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Pakistani Cities' : c}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={selectedCategoryFilter}
                onChange={e => setSelectedCategoryFilter(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode of Tutoring */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Tuition Mode
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-center text-[11px]">
                <button
                  onClick={() => setSelectedMode('all')}
                  className={`py-1.5 rounded-lg font-bold transition-all ${
                    selectedMode === 'all' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedMode('online')}
                  className={`py-1.5 rounded-lg font-bold transition-all ${
                    selectedMode === 'online' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => setSelectedMode('in_person')}
                  className={`py-1.5 rounded-lg font-bold transition-all ${
                    selectedMode === 'in_person' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Home
                </button>
              </div>
            </div>

            {/* Gender Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Tutor Gender
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-center text-[11px]">
                <button
                  onClick={() => setSelectedGender('all')}
                  className={`py-1.5 rounded-lg font-bold transition-all ${
                    selectedGender === 'all' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Any
                </button>
                <button
                  onClick={() => setSelectedGender('Female')}
                  className={`py-1.5 rounded-lg font-bold transition-all ${
                    selectedGender === 'Female' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Female
                </button>
                <button
                  onClick={() => setSelectedGender('Male')}
                  className={`py-1.5 rounded-lg font-bold transition-all ${
                    selectedGender === 'Male' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Male
                </button>
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">Max Hourly Fee</span>
                <span className="text-emerald-600">Rs. {maxHourlyRate.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={800}
                max={6000}
                step={200}
                value={maxHourlyRate}
                onChange={e => setMaxHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Rs. 800</span>
                <span>Rs. 6,000+</span>
              </div>
            </div>

            {/* Verified Toggle */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={e => setOnlyVerified(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CNIC & Degree Verified Only</span>
                </span>
              </label>
            </div>
          </aside>

          {/* Right Results Column */}
          <main className="md:col-span-8 lg:col-span-9 space-y-4">
            {/* Sort Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="text-slate-500 dark:text-slate-400">
                Sorted by:
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as any)}
                  className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <option value="rating">Highest Rating (5.0★)</option>
                  <option value="price_low">Lowest Hourly Fee</option>
                  <option value="price_high">Highest Hourly Fee</option>
                  <option value="experience">Most Experienced (Years)</option>
                </select>
              </div>
            </div>

            {/* Tutors List */}
            {filteredTutors.length === 0 ? (
              <div className="p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">No Tutors Match Your Filters</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting the hourly fee slider, selecting "All Pakistani Cities", or resetting your search.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTutors.map(tutor => {
                  const isFav = isTutorFavorite(tutor.id);

                  return (
                    <div
                      key={tutor.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-5 justify-between"
                    >
                      {/* Left: Avatar & Info */}
                      <div className="flex gap-4 flex-1">
                        <div className="relative shrink-0">
                          <img
                            src={tutor.avatar}
                            alt={tutor.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                          />
                          {tutor.isVerified && (
                            <div
                              className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-sm"
                              title="CNIC & Degree Verified"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3
                                onClick={() => handleTutorClick(tutor.id)}
                                className="font-extrabold text-base text-slate-900 dark:text-white hover:text-emerald-600 cursor-pointer transition-colors"
                              >
                                {tutor.name}
                              </h3>
                              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                                {tutor.headline}
                              </p>
                            </div>

                            <button
                              onClick={() => toggleFavoriteTutor(tutor.id)}
                              className={`p-2 rounded-xl border md:hidden ${
                                isFav ? 'bg-rose-50 border-rose-200 text-rose-500' : 'text-slate-400'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-600" />
                              {tutor.city}
                            </span>
                            <span>•</span>
                            <span>{tutor.experienceYears} Years Exp</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 font-bold text-slate-900 dark:text-white">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              {tutor.rating} ({tutor.totalReviews} reviews)
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed pt-1">
                            {tutor.bio}
                          </p>

                          {/* Subjects Badges */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {tutor.subjects.map((sub, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800"
                              >
                                {sub.subjectName} ({sub.level})
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Pricing & CTA */}
                      <div className="md:w-56 shrink-0 md:border-l md:border-slate-100 dark:md:border-slate-800 md:pl-5 flex flex-col justify-between pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Hourly Rate</span>
                            <button
                              onClick={() => toggleFavoriteTutor(tutor.id)}
                              className={`hidden md:block p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
                                isFav ? 'text-rose-500' : 'text-slate-400'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                            </button>
                          </div>

                          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                            Rs. {tutor.hourlyRatePKR.toLocaleString()}
                            <span className="text-xs font-normal text-slate-400">/hr</span>
                          </div>

                          <div className="mt-1">
                            {tutor.trialRatePKR === 0 ? (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-md inline-block">
                                Free 25-Min Trial
                              </span>
                            ) : (
                              <span className="text-[11px] font-medium text-slate-500">
                                Trial: Rs. {tutor.trialRatePKR}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 mt-4">
                          <button
                            onClick={() => openBookingForTutor(tutor)}
                            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book Session</span>
                          </button>

                          <button
                            onClick={() => handleTutorClick(tutor.id)}
                            className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 transition-colors"
                          >
                            View Full Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
