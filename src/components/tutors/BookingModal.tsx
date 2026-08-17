import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  Video,
  CreditCard,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PaymentMethod } from '../../types';

export const BookingModal: React.FC = () => {
  const {
    bookingModalOpen,
    setBookingModalOpen,
    bookingTutor,
    currentUser,
    createBooking,
    setCurrentPage,
    setActiveClassroomId,
    setAuthModalOpen
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Booking details
  const [sessionType, setSessionType] = useState<'trial' | 'single_class' | 'monthly_package'>('trial');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [classMode, setClassMode] = useState<'online' | 'in_person'>('online');
  const [platform, setPlatform] = useState<'builtin' | 'zoom' | 'google_meet' | 'teams'>('builtin');
  const [notes, setNotes] = useState('');

  // Payment details
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('jazzcash');
  const [mobileAccount, setMobileAccount] = useState('03001234567');
  const [mpin, setMpin] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('890');
  const [isProcessing, setIsProcessing] = useState(false);

  // Result
  const [completedBooking, setCompletedBooking] = useState<any>(null);

  if (!bookingModalOpen || !bookingTutor) return null;

  const subjectOptions = bookingTutor.subjects;
  const currentSubject = selectedSubject || subjectOptions[0]?.subjectName || 'General Tutoring';

  // Calculate pricing
  const calculateTotalPKR = () => {
    if (sessionType === 'trial') return bookingTutor.trialRatePKR;
    if (sessionType === 'single_class') return bookingTutor.hourlyRatePKR;
    if (sessionType === 'monthly_package') return bookingTutor.hourlyRatePKR * 12 * 0.85; // 15% discount for 12 classes
    return bookingTutor.hourlyRatePKR;
  };

  const totalPKR = calculateTotalPKR();

  // Next 7 available dates
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      formattedDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  const slots = bookingTutor.availabilitySchedule[0]?.timeSlots || [
    '15:00 - 16:00',
    '16:30 - 17:30',
    '18:00 - 19:00',
    '20:00 - 21:00'
  ];

  const handleNextStep = () => {
    if (step === 1 && !selectedSubject && subjectOptions[0]) {
      setSelectedSubject(subjectOptions[0].subjectName);
    }
    if (step === 2 && (!selectedDate || !selectedSlot)) {
      if (!selectedDate) setSelectedDate(availableDates[0].dateString);
      if (!selectedSlot) setSelectedSlot(slots[0]);
    }
    setStep((step + 1) as any);
  };

  const handlePrevStep = () => {
    setStep((step - 1) as any);
  };

  const handleConfirmAndPay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const booking = createBooking({
        studentId: currentUser?.id || 'stud-ayesha',
        studentName: currentUser?.name || 'Ayesha Khan',
        studentAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        studentEmail: currentUser?.email || 'ayesha.khan@gmail.com',
        studentPhone: currentUser?.phone || '+92 334 9876543',
        tutorId: bookingTutor.id,
        tutorName: bookingTutor.name,
        tutorAvatar: bookingTutor.avatar,
        subjectName: currentSubject,
        sessionType,
        classMode,
        date: selectedDate || availableDates[0].dateString,
        timeSlot: selectedSlot || slots[0],
        amountPKR: totalPKR,
        status: 'confirmed',
        paymentStatus: 'completed',
        paymentMethod,
        meetingPlatform: platform,
        notes
      });

      setCompletedBooking(booking);
      setStep(5);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }
    }, 1200);
  };

  const handleClose = () => {
    setBookingModalOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={bookingTutor.avatar}
              alt={bookingTutor.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-white/40"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm sm:text-base leading-tight">{bookingTutor.name}</h3>
                {bookingTutor.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-200" />}
              </div>
              <p className="text-xs text-emerald-100 line-clamp-1">{bookingTutor.headline}</p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-emerald-50 dark:bg-slate-800/80 px-5 py-2.5 border-b border-emerald-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-200">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              {step}
            </span>
            <span>
              {step === 1 && 'Select Session & Subject'}
              {step === 2 && 'Choose Date & Time Slot'}
              {step === 3 && 'Choose Classroom Mode'}
              {step === 4 && 'Payment (JazzCash / Easypaisa / Cards)'}
              {step === 5 && 'Booking Confirmed! 🎉'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Step {step} of 5</span>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Session & Subject */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Subject to Learn
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {subjectOptions.map(s => (
                    <button
                      key={s.subjectId}
                      type="button"
                      onClick={() => setSelectedSubject(s.subjectName)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        (selectedSubject || subjectOptions[0]?.subjectName) === s.subjectName
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-xs">{s.subjectName}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {s.category} • Rs. {s.hourlyRatePKR.toLocaleString()}/hr
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Session Package
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSessionType('trial')}
                    className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                      sessionType === 'trial'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">25-Min Trial Diagnostic Session</span>
                        <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Discuss syllabus roadmap, past paper weaknesses & test online whiteboard.
                      </p>
                    </div>
                    <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      {bookingTutor.trialRatePKR === 0 ? 'FREE' : `Rs. ${bookingTutor.trialRatePKR}`}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionType('single_class')}
                    className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                      sessionType === 'single_class'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs">1-Hour Standard Class</div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Full topic coverage, past paper derivations & homework sheet.
                      </p>
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Rs. {bookingTutor.hourlyRatePKR.toLocaleString()}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionType('monthly_package')}
                    className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                      sessionType === 'monthly_package'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs">Monthly Master Package (12 Classes)</span>
                        <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded-full">
                          Save 15%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        3 classes/week, 24/7 WhatsApp doubt solver & weekly graded assignments.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs line-through text-slate-400">
                        Rs. {(bookingTutor.hourlyRatePKR * 12).toLocaleString()}
                      </div>
                      <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                        Rs. {(bookingTutor.hourlyRatePKR * 12 * 0.85).toLocaleString()}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Slot */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {availableDates.map(d => {
                    const isSel = (selectedDate || availableDates[0].dateString) === d.dateString;
                    return (
                      <button
                        key={d.dateString}
                        type="button"
                        onClick={() => setSelectedDate(d.dateString)}
                        className={`p-2.5 rounded-2xl text-center border transition-all ${
                          isSel
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold opacity-80">{d.dayName}</div>
                        <div className="text-xs font-extrabold mt-0.5">{d.formattedDate}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Time Slot (PST - Pakistan Standard Time)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {slots.map(s => {
                    const isSlotSel = (selectedSlot || slots[0]) === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSlot(s)}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                          isSlotSel
                            ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                            : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Topic or Specific Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please solve Cambridge May/June 2023 Paper 4 questions..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Platform */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Class Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setClassMode('online')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      classMode === 'online'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-emerald-600" />
                      <span>Online Virtual Classroom</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Learn from anywhere with interactive digital whiteboard & screen share.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setClassMode('in_person')}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      classMode === 'in_person'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Home / In-Person Tuition</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      In {bookingTutor.city} area (Tutor visits student’s home).
                    </p>
                  </button>
                </div>
              </div>

              {classMode === 'online' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Select Online Tool
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPlatform('builtin')}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                        platform === 'builtin'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>TutorHub Classroom</span>
                      </div>
                      <p className="text-[10px] font-normal text-slate-500 mt-0.5">Built-in Whiteboard & Notes (Zero Install)</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlatform('zoom')}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                        platform === 'zoom'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Zoom Meetings</span>
                      </div>
                      <p className="text-[10px] font-normal text-slate-500 mt-0.5">Automated Zoom link generated</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlatform('google_meet')}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                        platform === 'google_meet'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>Google Meet</span>
                      <p className="text-[10px] font-normal text-slate-500 mt-0.5">Calendar invite & link</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlatform('teams')}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                        platform === 'teams'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>Microsoft Teams</span>
                      <p className="text-[10px] font-normal text-slate-500 mt-0.5">Teams link</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Payment */}
          {step === 4 && (
            <div className="space-y-4">
              {/* Summary box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{currentSubject}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedDate || availableDates[0].dateString} at {selectedSlot || slots[0]}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Payable</span>
                  <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                    Rs. {totalPKR.toLocaleString()} PKR
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Choose Payment Gateway in Pakistan
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 ring-1 ring-rose-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-xs text-rose-600">JazzCash</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Mobile Account / MPIN</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-xs text-emerald-600">Easypaisa</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Mobile Wallet / OTP</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'stripe'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 ring-1 ring-blue-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-xs text-blue-600">Visa / Mastercard</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Debit / Credit Card</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank_transfer')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'bank_transfer'
                        ? 'border-teal-600 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 ring-1 ring-teal-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-xs text-teal-600">1Link Bank IBFT</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Meezan / HBL / UBL</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 ring-1 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-extrabold text-xs text-indigo-600">PayPal / USD</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Overseas Students</p>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Inputs */}
              {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Enter {paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} Mobile Account
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">100% Encrypted</span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Mobile Account Number</label>
                    <input
                      type="tel"
                      value={mobileAccount}
                      onChange={e => setMobileAccount(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    You will receive an instant approval MPIN prompt / OTP on your mobile handset to authenticate Rs.{' '}
                    {totalPKR.toLocaleString()}.
                  </p>
                </div>
              )}

              {paymentMethod === 'stripe' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 dark:text-white">TutorHub Pakistan Official Account:</div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1">
                    <div><strong>Bank:</strong> Meezan Bank Ltd (Gulberg Branch Lahore)</div>
                    <div><strong>Account Title:</strong> TutorHub Pakistan (Pvt) Ltd</div>
                    <div><strong>IBAN:</strong> PK42MEZN0009876543210987</div>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Instant automated verification enabled via 1Link payment switch.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Success Screen */}
          {step === 5 && completedBooking && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Class Booked Successfully! 🎉
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Booking Reference: <strong>#{completedBooking.id.toUpperCase()}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-left text-xs space-y-2 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tutor:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{completedBooking.tutorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Subject:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{completedBooking.subjectName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled Date:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {completedBooking.date} ({completedBooking.timeSlot})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-bold text-emerald-600">
                    Rs. {completedBooking.amountPKR.toLocaleString()} (Paid via {completedBooking.paymentMethod.toUpperCase()})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    setActiveClassroomId(completedBooking.classRoomId || 'room-live');
                    setCurrentPage('live-classroom');
                  }}
                  className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch Live Classroom</span>
                </button>

                <button
                  onClick={() => {
                    handleClose();
                    setCurrentPage('student-dashboard');
                  }}
                  className="py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold"
                >
                  View in Student Portal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step < 5 && (
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmAndPay}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center gap-1.5"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Confirm & Pay PKR {totalPKR.toLocaleString()}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
