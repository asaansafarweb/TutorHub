import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Heart,
  Globe,
  Award,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCityFilter, setSelectedCategoryFilter, language, setLanguage } = useApp();

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'];

  const schoolSubjects = [
    'O/A Level Physics',
    'Cambridge Mathematics',
    'MDCAT Biology',
    'FSc Pre-Engineering',
    'IELTS Preparation',
    'Quran with Tajweed',
    'Full-Stack Web Dev',
    'AI & ChatGPT Skills'
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-8 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">TutorHub</span>
                <span className="ml-1.5 bg-emerald-900 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-emerald-700">
                  PAKISTAN
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Pakistan's trusted online tutoring platform connecting ambitious students with verified, CNIC-checked educators from LUMS, NUST, King Edward, IBA, and Cambridge examiners.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/80">
                <ShieldCheck className="w-4 h-4" />
                <span>100% CNIC & Degree Verified Tutors</span>
              </div>
            </div>

            {/* Offices */}
            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>Head Office:</strong> Tech Park, Gulberg III, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>Sindh Campus:</strong> Clifton Block 4, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>UAN Helpline: +92 (42) 111-888-777 | WhatsApp: +92 300 1234567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('find-tutors')} className="hover:text-emerald-400 transition-colors">
                  Find Verified Tutors
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('student-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Student Portal & Classes
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('tutor-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Tutor Portal & Earnings
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('live-classroom')} className="hover:text-emerald-400 transition-colors">
                  Virtual Live Classroom
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('pricing')} className="hover:text-emerald-400 transition-colors">
                  Tuition Rates & Packages
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('blog')} className="hover:text-emerald-400 transition-colors">
                  Study Guides & Past Papers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('db-schema')} className="hover:text-emerald-400 transition-colors">
                  Database & API Playground
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Subjects */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Popular Subjects</h4>
            <ul className="space-y-2 text-xs">
              {schoolSubjects.map(sub => (
                <li key={sub}>
                  <button
                    onClick={() => {
                      setCurrentPage('find-tutors');
                    }}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {sub}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Pakistani Cities */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Tutors by City</h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {cities.map(city => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCityFilter(city);
                    setCurrentPage('find-tutors');
                  }}
                  className="px-2 py-1 rounded-md bg-slate-900 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-700 text-[11px] transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
            
            <div className="pt-3">
              <h5 className="text-[11px] font-bold text-slate-300 mb-1">Supported Payments in Pakistan:</h5>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">JazzCash</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">Easypaisa</span>
                <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-bold">1Link Bank</span>
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">Visa / Master</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">Meezan IBFT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} TutorHub Pakistan Technologies Pvt. Ltd. All rights reserved. Registered under SECP.
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-slate-300">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-slate-300">Terms of Service</button>
            <span>•</span>
            <button onClick={() => setCurrentPage('faq')} className="hover:text-slate-300">FAQ</button>
            <span>•</span>
            <button onClick={() => setCurrentPage('contact')} className="hover:text-slate-300">Contact Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
