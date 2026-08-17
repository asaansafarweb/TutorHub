import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  Lock,
  User,
  ShieldCheck,
  Upload,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import { PakistaniCity, EducationLevel } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authDefaultRole,
    loginUser,
    setCurrentPage,
    switchUserRole
  } = useApp();

  const [role, setRole] = useState<'student' | 'tutor'>(authDefaultRole || 'student');
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [authType, setAuthType] = useState<'email' | 'phone' | 'social'>('email');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState<PakistaniCity>('Lahore');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  // Student specific
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('O-Levels / IGCSE');
  const [learningGoals, setLearningGoals] = useState('');

  // Tutor specific
  const [cnicNumber, setCnicNumber] = useState('');
  const [qualification, setQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState(3);
  const [hourlyRatePKR, setHourlyRatePKR] = useState(2000);
  const [subjectsSelected, setSubjectsSelected] = useState('Physics & Mathematics');
  const [fileUploaded, setFileUploaded] = useState(false);

  // Phone OTP Simulation
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authType === 'phone' && !otpSent) {
      setOtpSent(true);
      return;
    }

    if (authType === 'phone' && otpSent && otpCode !== '1234') {
      setOtpError('Invalid OTP code. Please enter 1234 for demo verification.');
      return;
    }

    const newUser = {
      id: `${role}-${Date.now()}`,
      name: fullName || (role === 'student' ? 'Zubair Qasim' : 'Dr. Adeel Hashmi'),
      email: email || `${role}@tutorhub.pk`,
      phone: phone || '+92 300 1234567',
      role: role,
      avatar:
        role === 'student'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      city: city,
      country: 'Pakistan',
      gender: gender,
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: role === 'student' ? true : false,
      twoFactorEnabled: false
    };

    loginUser(newUser);
    if (role === 'student') {
      setCurrentPage('student-dashboard');
    } else {
      setCurrentPage('tutor-dashboard');
    }
  };

  const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
    const demoUser = {
      id: `${role}-social-${Date.now()}`,
      name: provider === 'Google' ? 'Hamza Tariq (Google)' : 'Sadia Malik (Facebook)',
      email: provider === 'Google' ? 'hamza.tariq@gmail.com' : 'sadia.malik@facebook.com',
      phone: '+92 333 4567890',
      role: role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      city: 'Islamabad' as PakistaniCity,
      country: 'Pakistan',
      gender: 'Male' as const,
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    };

    loginUser(demoUser);
    setCurrentPage(role === 'student' ? 'student-dashboard' : 'tutor-dashboard');
  };

  const pakistaniCities: PakistaniCity[] = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Online (Nationwide)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative">
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded-md">
              TutorHub Pakistan
            </span>
          </div>

          <h2 className="text-xl font-bold">
            {mode === 'login' ? 'Welcome Back!' : 'Join Pakistan’s Premier Tutoring Network'}
          </h2>
          <p className="text-xs text-emerald-100 mt-1">
            {role === 'student'
              ? 'Connect with top verified Pakistani tutors & score high'
              : 'Teach online, build your student base & earn directly via JazzCash/Easypaisa'}
          </p>

          {/* Role Tabs */}
          <div className="flex bg-black/20 p-1 rounded-xl mt-4">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'student' ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              I am a Student / Parent
            </button>
            <button
              type="button"
              onClick={() => setRole('tutor')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                role === 'tutor' ? 'bg-white text-emerald-800 shadow-sm' : 'text-emerald-100 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              I am a Tutor / Teacher
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Mode Switch (Login vs Register) */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`pb-2.5 px-4 transition-colors border-b-2 ${
                mode === 'register'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Create New Account
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`pb-2.5 px-4 transition-colors border-b-2 ${
                mode === 'login'
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Existing User Login
            </button>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          <div className="flex items-center gap-2 my-2">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            <span className="text-[11px] text-slate-400 font-medium uppercase">Or with Email / Mobile</span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Auth method tab: Email vs Pakistani Mobile OTP */}
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setAuthType('email');
                  setOtpSent(false);
                }}
                className={`flex-1 py-1.5 rounded-lg border text-center font-medium ${
                  authType === 'email'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                Email Address
              </button>
              <button
                type="button"
                onClick={() => setAuthType('phone')}
                className={`flex-1 py-1.5 rounded-lg border text-center font-medium ${
                  authType === 'phone'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600'
                }`}
              >
                Mobile Number (+92)
              </button>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder={role === 'student' ? 'e.g. Ayesha Khan' : 'e.g. Prof. Salman Ahmed'}
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            )}

            {authType === 'email' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pakistani Mobile Number (Jazz / Telenor / Zong / Ufone)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {otpSent && (
                  <div className="mt-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                      📱 SMS OTP sent to your number! (Demo Code: <strong>1234</strong>)
                    </p>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="Enter 4-digit OTP (1234)"
                      value={otpCode}
                      onChange={e => {
                        setOtpCode(e.target.value);
                        setOtpError('');
                      }}
                      className="mt-2 w-full p-2 text-center tracking-widest text-base font-bold rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    />
                    {otpError && <p className="text-[11px] text-rose-600 mt-1">{otpError}</p>}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Registration Additional Fields */}
            {mode === 'register' && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
                    <select
                      value={city}
                      onChange={e => setCity(e.target.value as PakistaniCity)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      {pakistaniCities.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value as any)}
                      className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {role === 'student' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Education Level
                      </label>
                      <select
                        value={educationLevel}
                        onChange={e => setEducationLevel(e.target.value as EducationLevel)}
                        className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        <option value="Matric / SSC">Matric / SSC (Federal, Punjab, Sindh Boards)</option>
                        <option value="O-Levels / IGCSE">Cambridge O-Levels / IGCSE</option>
                        <option value="FSc / HSSC">FSc / HSSC (Pre-Med, Pre-Eng, ICS)</option>
                        <option value="A-Levels">Cambridge A-Levels</option>
                        <option value="Bachelors">Bachelors (University)</option>
                        <option value="Masters / PhD">Masters / PhD</option>
                        <option value="Professional">Professional Skills & Languages</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Learning Goals & Target Exam
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Targeting 8 A*s in O-Levels or 190+ in MDCAT"
                        value={learningGoals}
                        onChange={e => setLearningGoals(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </>
                ) : (
                  /* Tutor Specific Registration Fields */
                  <div className="space-y-3 p-3 bg-emerald-50/50 dark:bg-slate-800/60 rounded-2xl border border-emerald-200/80 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Tutor Accreditation & CNIC Verification</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        CNIC / National ID Number (Required for Vetting)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="35201-XXXXXXX-X"
                        value={cnicNumber}
                        onChange={e => setCnicNumber(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Highest Qualification
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. M.Sc. Physics (LUMS)"
                          value={qualification}
                          onChange={e => setQualification(e.target.value)}
                          className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Experience (Years)
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={40}
                          value={experienceYears}
                          onChange={e => setExperienceYears(Number(e.target.value))}
                          className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Hourly Rate (PKR)
                        </label>
                        <input
                          type="number"
                          step={100}
                          min={500}
                          value={hourlyRatePKR}
                          onChange={e => setHourlyRatePKR(Number(e.target.value))}
                          className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Subjects to Teach
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Physics, Math, MDCAT"
                          value={subjectsSelected}
                          onChange={e => setSubjectsSelected(e.target.value)}
                          className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Resume / Degree Upload Simulation */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Upload Degree / CNIC / Certificates (PDF or JPG)
                      </label>
                      <div
                        onClick={() => setFileUploaded(true)}
                        className={`p-3 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                          fileUploaded
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            : 'border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-500'
                        }`}
                      >
                        {fileUploaded ? (
                          <div className="flex items-center justify-center gap-2 text-xs font-bold">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span>CNIC_Degree_Certificates_Attached.pdf (3.4 MB)</span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <Upload className="w-5 h-5 mx-auto text-slate-400" />
                            <p className="text-xs font-medium">Click to attach CV & Verified Degree Documents</p>
                            <p className="text-[10px] text-slate-400">PDF, JPG up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              <span>{mode === 'register' ? `Register as ${role === 'student' ? 'Student' : 'Tutor'}` : 'Sign In Now'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400 pt-2">
              By proceeding, you agree to TutorHub Pakistan's Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
