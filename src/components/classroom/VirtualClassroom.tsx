import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  Share2,
  PenTool,
  Eraser,
  Square,
  Circle,
  Type,
  Trash2,
  Download,
  MessageSquare,
  FileText,
  Clock,
  PhoneOff,
  Users,
  Settings,
  Sparkles,
  ChevronRight,
  Send,
  Star,
  CheckCircle2,
  ExternalLink,
  Code,
  Layers
} from 'lucide-react';

export const VirtualClassroom: React.FC = () => {
  const {
    activeClassroomId,
    setCurrentPage,
    currentUser,
    tutors,
    addReviewToTutor,
    selectedTutorId
  } = useApp();

  // Classroom States
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'whiteboard' | 'pastpaper' | 'code'>('whiteboard');
  const [sidebarTab, setSidebarTab] = useState<'chat' | 'notes' | 'participants'>('chat');

  // Whiteboard drawing tools
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawTool, setDrawTool] = useState<'pen' | 'highlighter' | 'eraser' | 'rect' | 'circle'>('pen');
  const [drawColor, setDrawColor] = useState('#10b981');
  const [strokeWidth, setStrokeWidth] = useState(3);

  // In-class chat
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isMe: boolean }>>([
    {
      sender: 'Prof. Salman Ahmed',
      text: 'Assalam-o-Alaikum! Welcome to today’s physics derivation session. Let’s look at Faraday’s Law on the board.',
      time: '16:30',
      isMe: false
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Class Notes
  const [classNotes, setClassNotes] = useState(
    '### A-Level Physics Notes (Class 12)\n- Magnetic Flux Φ = B * A * cos(θ)\n- Faraday’s Law: Induced EMF = -N * (dΦ / dt)\n- Lenz’s Law explains the negative sign: direction of induced current opposes the change.'
  );

  // Class Timer
  const [elapsedSeconds, setElapsedSeconds] = useState(745); // start at ~12 mins

  // End Session Modal
  const [showEndModal, setShowEndModal] = useState(false);
  const [classRating, setClassRating] = useState(5);
  const [classReviewComment, setClassReviewComment] = useState('Excellent lecture! The derivations and whiteboard diagrams were very clear.');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Canvas drawing handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw initial diagram demo
    ctx.strokeStyle = '#047857';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(280, 180, 70, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('B-Field: ⊙ (Out of page)', 200, 180);
    ctx.fillText('Induced EMF = - dΦ/dt', 190, 290);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = drawTool === 'highlighter' ? 14 : drawTool === 'eraser' ? 24 : strokeWidth;
    ctx.strokeStyle = drawTool === 'eraser' ? '#ffffff' : drawColor;
    ctx.globalAlpha = drawTool === 'highlighter' ? 0.35 : 1.0;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => [
      ...prev,
      {
        sender: currentUser?.name || 'Student',
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }
    ]);
    setChatInput('');
  };

  const handleEndClass = () => {
    setShowEndModal(true);
  };

  const handleSubmitRating = () => {
    setReviewSubmitted(true);
    addReviewToTutor(selectedTutorId || 'tutor-salman', {
      rating: classRating,
      comment: classReviewComment,
      subject: 'Physics (O/A Level)'
    });

    setTimeout(() => {
      setShowEndModal(false);
      setCurrentPage('student-dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white flex flex-col">
      {/* Top Classroom Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              LIVE CLASSROOM
            </span>
            <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-800">
              HD Encrypted Room
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800 text-xs text-slate-400">
            <span>Subject: <strong className="text-white">A-Level Physics (Cambridge)</strong></span>
            <span>•</span>
            <span>Tutor: <strong className="text-emerald-400">Prof. Salman Ahmed</strong></span>
          </div>
        </div>

        {/* Timer & External Fallback */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-300 border border-slate-700 transition-colors"
          >
            <span>Open in Google Meet / Zoom</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={handleEndClass}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-rose-600/30"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Class</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden">
        {/* Left Interactive Workspace (Whiteboard / Past Paper / Code Editor) */}
        <div className="lg:col-span-8 flex flex-col bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
          {/* Workspace Tabs & Tool Bar */}
          <div className="bg-slate-950 p-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('whiteboard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'whiteboard' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Whiteboard</span>
              </button>
              <button
                onClick={() => setActiveTab('pastpaper')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'pastpaper' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Past Paper Slides</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'code' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Code Lab</span>
              </button>
            </div>

            {/* Whiteboard Controls */}
            {activeTab === 'whiteboard' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setDrawTool('pen')}
                  className={`p-1.5 rounded-lg border text-xs ${
                    drawTool === 'pen' ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                  title="Pen tool"
                >
                  <PenTool className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDrawTool('highlighter')}
                  className={`p-1.5 rounded-lg border text-xs ${
                    drawTool === 'highlighter' ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                  title="Highlighter"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDrawTool('eraser')}
                  className={`p-1.5 rounded-lg border text-xs ${
                    drawTool === 'eraser' ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                  title="Eraser"
                >
                  <Eraser className="w-3.5 h-3.5" />
                </button>

                {/* Color pickers */}
                <div className="flex items-center gap-1 pl-1">
                  {['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#0f172a'].map(color => (
                    <button
                      key={color}
                      onClick={() => setDrawColor(color)}
                      className={`w-5 h-5 rounded-full ring-1 ring-slate-700 transition-transform ${
                        drawColor === color ? 'scale-125 ring-2 ring-white' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <button
                  onClick={clearCanvas}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800 ml-1"
                  title="Clear Whiteboard"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Active Canvas / Screen Area */}
          <div className="flex-1 relative bg-white flex items-center justify-center overflow-auto min-h-[360px]">
            {activeTab === 'whiteboard' && (
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-full cursor-crosshair touch-none"
              />
            )}

            {activeTab === 'pastpaper' && (
              <div className="p-6 text-slate-900 max-w-xl w-full space-y-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-between">
                  <span>Cambridge CAIE A-Level Physics 9702 / Paper 42</span>
                  <span>May/June 2024 Exam</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3">
                  <h4 className="font-bold text-sm">Question 3 [Structured Derivation]:</h4>
                  <p className="leading-relaxed">
                    A flat circular coil of 250 turns and radius 4.5 cm is placed perpendicular to a uniform magnetic field of flux density 0.18 T.
                  </p>
                  <p className="leading-relaxed font-mono bg-white p-2.5 rounded-lg border border-slate-200">
                    (a) Calculate the magnetic flux linkage of the coil. [3 marks]<br />
                    (b) The magnetic field reduces to zero uniformly in 0.040 s. Determine the magnitude of the induced electromotive force (e.m.f.). [3 marks]
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="w-full h-full bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-auto">
                <div className="text-slate-500 mb-2"># Interactive Python Physics Calculation Simulation</div>
                <pre>{`import numpy as np

def calculate_induced_emf(turns, radius_cm, b_field_tesla, time_delta_sec):
    area_m2 = np.pi * ((radius_cm / 100.0) ** 2)
    initial_flux = b_field_tesla * area_m2
    total_flux_linkage = turns * initial_flux
    emf = total_flux_linkage / time_delta_sec
    return total_flux_linkage, emf

turns = 250
radius = 4.5  # cm
b_field = 0.18  # Tesla
delta_t = 0.040  # seconds

flux_linkage, induced_emf = calculate_induced_emf(turns, radius, b_field, delta_t)

print(f"Total Magnetic Flux Linkage: {flux_linkage:.4f} Wb-turns")
print(f"Induced EMF: {induced_emf:.2f} Volts")

# Output:
# Total Magnetic Flux Linkage: 0.2863 Wb-turns
# Induced EMF: 7.16 Volts`}</pre>
              </div>
            )}
          </div>

          {/* Bottom Live Media Controls */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-2.5 rounded-2xl transition-all ${
                  micOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'
                }`}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setCameraOn(!cameraOn)}
                className={`p-2.5 rounded-2xl transition-all ${
                  cameraOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-rose-600 text-white'
                }`}
                title={cameraOn ? 'Stop Video' : 'Start Video'}
              >
                {cameraOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setScreenSharing(!screenSharing)}
                className={`px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  screenSharing ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>{screenSharing ? 'Sharing Screen' : 'Share Screen'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Recording: <span className="text-emerald-400 font-bold">Auto-Cloud Record (ON)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Video Feeds & Chat / Notes Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {/* Two Video Tiles */}
          <div className="grid grid-cols-2 gap-2">
            {/* Tutor Video */}
            <div className="relative h-36 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                alt="Prof. Salman"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-md text-[10px] font-bold text-white flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Prof. Salman (Tutor)</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 p-1 rounded-md text-[10px] text-emerald-400">
                <Mic className="w-3 h-3" />
              </div>
            </div>

            {/* Student Video */}
            <div className="relative h-36 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
              {cameraOn ? (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Ayesha"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-xs font-bold">
                    AK
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">Camera Off</span>
                </div>
              )}
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-md text-[10px] font-bold text-white flex items-center gap-1">
                <span>{currentUser?.name || 'Ayesha Khan'} (You)</span>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 p-1 rounded-md text-[10px] text-white">
                {micOn ? <Mic className="w-3 h-3 text-emerald-400" /> : <MicOff className="w-3 h-3 text-rose-400" />}
              </div>
            </div>
          </div>

          {/* Sidebar Tabs (Chat & Notes) */}
          <div className="flex-1 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col overflow-hidden min-h-[300px]">
            <div className="bg-slate-950 p-2 border-b border-slate-800 flex gap-1">
              <button
                onClick={() => setSidebarTab('chat')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  sidebarTab === 'chat' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Q&A Chat</span>
              </button>

              <button
                onClick={() => setSidebarTab('notes')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  sidebarTab === 'notes' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Class Notes</span>
              </button>
            </div>

            {/* Chat Body */}
            {sidebarTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between p-3 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-2xl max-w-[85%] ${
                        msg.isMe
                          ? 'ml-auto bg-emerald-600 text-white rounded-br-xs'
                          : 'bg-slate-800 text-slate-200 rounded-bl-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] opacity-75 mb-0.5">
                        <span className="font-bold">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="pt-2 flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Ask a question or type doubt..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Notes Body */}
            {sidebarTab === 'notes' && (
              <div className="flex-1 flex flex-col p-3 overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Scratchpad (Auto-saved to Student Portal)</span>
                  <button
                    onClick={() => alert('Notes downloaded as PDF!')}
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
                <textarea
                  value={classNotes}
                  onChange={e => setClassNotes(e.target.value)}
                  className="flex-1 w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono resize-none focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* End Session Review Modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            {reviewSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold">Class Finished!</h3>
                <p className="text-xs text-slate-500">
                  Your feedback and class recording notes have been saved to your portal.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-extrabold">How was your class?</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Rate your learning session with Prof. Salman Ahmed
                  </p>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setClassRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= classRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Feedback Comment</label>
                  <textarea
                    rows={3}
                    value={classReviewComment}
                    onChange={e => setClassReviewComment(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      setShowEndModal(false);
                      setCurrentPage('student-dashboard');
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                  >
                    Skip & Exit
                  </button>
                  <button
                    onClick={handleSubmitRating}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
