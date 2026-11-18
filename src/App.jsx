import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  HelpCircle,
  BookOpen,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles
} from 'lucide-react';
import { QUESTIONS } from './data/questions';
import { calculateReadiness } from './utils/scoringEngine';

export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' | 'quiz' | 'results'
  const [targetExam, setTargetExam] = useState('Goethe A1');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showFormula, setShowFormula] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [blindSpotChecks, setBlindSpotChecks] = useState({
    listening: false,
    speaking: false,
  });

  // Subtle elapsed timer during quiz
  useEffect(() => {
    if (screen !== 'quiz') return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [screen]);

  const currentQ = QUESTIONS[currentIdx];
  const currentAnswer = answers[currentQ?.id] || { selectedIndex: null, isGuess: false };

  const handleSelectOption = (optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedIndex: optionIdx,
        isGuess: prev[currentQ.id]?.isGuess || false,
      },
    }));
  };

  const handleToggleGuess = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedIndex: prev[currentQ.id]?.selectedIndex ?? null,
        isGuess: !prev[currentQ.id]?.isGuess,
      },
    }));
  };

  const handleStart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setElapsedSeconds(0);
    setShowReview(false);
    setBlindSpotChecks({ listening: false, speaking: false });
    setScreen('quiz');
  };

  // Founder Demo Shortcut: Simulates an "Almost Ready" learner with 1 weak section & 2 lucky guesses
  const handleFounderDemo = () => {
    const demoAnswers = {};
    QUESTIONS.forEach((q) => {
      if (q.id === 'g1' || q.id === 'g2' || q.id === 'r3') {
        // Incorrect answers
        demoAnswers[q.id] = { selectedIndex: (q.correctIndex + 1) % 4, isGuess: false };
      } else if (q.id === 'v2' || q.id === 'g4') {
        // Lucky guesses
        demoAnswers[q.id] = { selectedIndex: q.correctIndex, isGuess: true };
      } else {
        demoAnswers[q.id] = { selectedIndex: q.correctIndex, isGuess: false };
      }
    });
    setAnswers(demoAnswers);
    setElapsedSeconds(275); // 4m 35s
    setScreen('results');
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // ================= SCREEN 1: LANDING =================
  if (screen === 'landing') {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                G
              </div>
              <span className="font-semibold text-slate-900 tracking-tight">
                Globio <span className="text-slate-400 font-normal">| Exam Readiness Check</span>
              </span>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
              CEFR A1
            </span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium mb-6">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Protect your ₹8,000+ exam fee before booking
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            Are you actually ready to pay for your German A1 exam?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            Many learners finish A1 lessons and book their exam too early—losing money and weeks on their move abroad. Take this 5-minute diagnostic across <strong className="text-slate-800">Vocabulary, Grammar, and Reading</strong> to get an honest readiness verdict and the exact 2–3 gaps to fix first.
          </p>

          {/* Exam Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Which exam are you planning to book?
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Goethe A1', 'ÖSD A1', 'Not sure yet'].map((exam) => (
                <button
                  key={exam}
                  type="button"
                  onClick={() => setTargetExam(exam)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-medium border transition ${
                    targetExam === exam
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>

          {/* Value Props */}
          <div className="grid sm:grid-cols-3 gap-3 mb-8 text-sm">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-900 mb-1">15 Exam-Style Qs</div>
              <div className="text-slate-500 text-xs">Covers Vocabulary, Grammar traps, and Lesen notices.</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-900 mb-1">Guess-Adjusted Score</div>
              <div className="text-slate-500 text-xs">Discounts lucky guesses so you don’t get false confidence.</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-900 mb-1">20-Min Fix Plan</div>
              <div className="text-slate-500 text-xs">Pinpoints your 2–3 weakest micro-topics before booking.</div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            Start 5-Minute Readiness Check
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-xs text-slate-400 mt-3">
            No sign-up required • Instant skill-by-skill breakdown
          </p>
        </main>

        <footer className="border-t border-slate-200 bg-white py-4 px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <span>Built for Globio Learners • CEFR A1 Diagnostic</span>
            <button
              onClick={handleFounderDemo}
              className="text-indigo-600 hover:underline font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Founder Preview: Jump to Sample Results
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // ================= SCREEN 2: DIAGNOSTIC FLOW =================
  if (screen === 'quiz') {
    const progressPct = Math.round(((currentIdx + 1) / QUESTIONS.length) * 100);
    const isLast = currentIdx === QUESTIONS.length - 1;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Top Progress Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
              <span>
                Question <strong className="text-slate-900">{currentIdx + 1}</strong> of {QUESTIONS.length} •{' '}
                <span className="text-indigo-600 font-semibold">{currentQ.skill}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(elapsedSeconds)}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </header>

        {/* Question Body */}
        <main className="max-w-2xl w-full mx-auto px-4 py-8 flex-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Optional Reading Passage */}
            {currentQ.passage && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-slate-800 text-sm sm:text-base leading-relaxed">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Read the text carefully
                </div>
                “{currentQ.passage}”
              </div>
            )}

            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug mb-6">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const selected = currentAnswer.selectedIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base transition flex items-center gap-3 cursor-pointer ${
                      selected
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-medium ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        selected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Confidence Toggle ("I'm guessing") */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={currentAnswer.isGuess}
                  onChange={handleToggleGuess}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-700 font-medium">
                  I’m guessing on this one
                </span>
              </label>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Be honest—lucky guesses get 0.5x credit so your score stays accurate.
              </span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => i - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium disabled:opacity-40 hover:bg-slate-50 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {isLast ? (
              <button
                type="button"
                disabled={currentAnswer.selectedIndex === null}
                onClick={() => setScreen('results')}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                See My Readiness Verdict
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={currentAnswer.selectedIndex === null}
                onClick={() => setCurrentIdx((i) => i + 1)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                Next Question
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ================= SCREEN 3: RESULTS DASHBOARD =================
  const result = calculateReadiness(answers, elapsedSeconds);

  const tierStyles = {
    READY: {
      bg: 'bg-emerald-50 border-emerald-200',
      badge: 'bg-emerald-600 text-white',
      scoreText: 'text-emerald-700',
      Icon: ShieldCheck,
    },
    ALMOST_READY: {
      bg: 'bg-amber-50 border-amber-200',
      badge: 'bg-amber-500 text-white',
      scoreText: 'text-amber-700',
      Icon: AlertTriangle,
    },
    NOT_READY: {
      bg: 'bg-rose-50 border-rose-200',
      badge: 'bg-rose-600 text-white',
      scoreText: 'text-rose-700',
      Icon: XCircle,
    },
  }[result.tier];

  const VerdictIcon = tierStyles.Icon;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-semibold text-slate-900">
            Globio <span className="text-slate-400 font-normal">| {targetExam} Diagnostic</span>
          </div>
          <button
            onClick={handleStart}
            className="text-xs font-medium text-slate-600 hover:text-indigo-600 inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Retake Check
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-8 space-y-6">
        {/* 1. Verdict Banner */}
        <section className={`rounded-2xl border p-6 sm:p-8 ${tierStyles.bg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${tierStyles.badge}`}>
                <VerdictIcon className="w-3.5 h-3.5" />
                {result.badge}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3">
                {result.headline}
              </h1>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-2xl px-5 py-4 border border-white shadow-sm text-center shrink-0">
              <div className={`text-3xl sm:text-4xl font-extrabold ${tierStyles.scoreText}`}>
                {result.overallScore}%
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                Readiness Score
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Safe target: ≥ 78%
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {result.summary}
          </p>

          <div className="mt-4 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex flex-wrap gap-4">
              <span>Time taken: <strong>{formatTime(result.totalSeconds)}</strong></span>
              <span>Marked as guesses: <strong>{result.totalGuesses}</strong></span>
              {result.pacingFlag && (
                <span className="text-amber-700 font-semibold">
                  ⚠ Pacing note: Over 8 mins (watch your clock on Lesen)
                </span>
              )}
            </div>
            <button
              onClick={() => setShowFormula(!showFormula)}
              className="text-indigo-700 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              How we calculated this
            </button>
          </div>

          {showFormula && (
            <div className="mt-4 p-4 rounded-xl bg-white/90 text-xs text-slate-600 space-y-1.5 border border-slate-200">
              <div className="font-semibold text-slate-900">3-Layer Exam Fee Protection Logic:</div>
              <p>1. <strong>Confidence Discounting:</strong> Confident correct answers earn 1.0 pt; correct answers marked "I'm guessing" earn 0.5 pt.</p>
              <p>2. <strong>Weighted Pillars:</strong> Vocabulary (30%) + Grammar (35%) + Reading (35%).</p>
              <p>3. <strong>Buffer & Skill Floors:</strong> Official Goethe/ÖSD passing score is 60%. To protect your exam fee against test-day anxiety, "Ready to Book" requires ≥ 78% overall AND ≥ 60% in every individual skill.</p>
            </div>
          )}
        </section>

        {/* 2. Skill Breakdown */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Skill-by-Skill Breakdown</h2>
          <div className="space-y-4">
            {result.skills.map((s) => {
              const barColor =
                s.pct >= 75 ? 'bg-emerald-500' : s.pct >= 60 ? 'bg-amber-500' : 'bg-rose-500';
              return (
                <div key={s.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-2">
                      {s.name}
                      {s.pct < 60 && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                          Below 60% floor
                        </span>
                      )}
                    </div>
                    <div className="text-slate-600 text-xs sm:text-sm">
                      <strong>{s.pct}%</strong> ({s.rawCorrect}/{s.max} right
                      {s.guesses > 0 ? `, ${s.guesses} guessed` : ''})
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Top 2–3 Priorities Before Booking */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-1">
            {result.topPriorities.length > 0
              ? `Your Top ${result.topPriorities.length} Things to Practise Before Booking`
              : 'Zero Major Written Gaps Found'}
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Prioritized from the exact questions you missed or guessed on.
          </p>

          {result.topPriorities.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm">
              You answered every question confidently and accurately. Focus on timed full-length mock papers—especially Listening and Speaking—before booking.
            </div>
          ) : (
            <div className="space-y-3">
              {result.topPriorities.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold text-slate-900">
                      {idx + 1}. {item.microTopic}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {item.skill} • {item.reason}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{item.whyItMatters}</p>
                  <div className="text-xs font-medium text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong>20-Min Drill:</strong> {item.actionDrill}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. Honest Blind-Spot Self-Audit (Listening & Speaking) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-start gap-3 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Don’t Forget What This Check Doesn’t Test
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {targetExam} also grades <strong>Listening (Hören)</strong> and <strong>Speaking (Sprechen)</strong>. Before paying your exam fee, confirm you can check both boxes:
              </p>
            </div>
          </div>

          <div className="space-y-2.5 mt-4">
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={blindSpotChecks.listening}
                onChange={(e) =>
                  setBlindSpotChecks((p) => ({ ...p, listening: e.target.checked }))
                }
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600"
              />
              <span className="text-xs sm:text-sm text-slate-700">
                <strong>Listening Check:</strong> I have scored at least 60% on a full timed {targetExam} Hören sample test.
              </span>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={blindSpotChecks.speaking}
                onChange={(e) =>
                  setBlindSpotChecks((p) => ({ ...p, speaking: e.target.checked }))
                }
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-indigo-600"
              />
              <span className="text-xs sm:text-sm text-slate-700">
                <strong>Speaking Check:</strong> I can introduce myself, spell my name/city aloud, and make 3 simple requests using <em>können/möchten</em>.
              </span>
            </label>
          </div>
        </section>

        {/* 5. Expandable Answer Review */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <button
            type="button"
            onClick={() => setShowReview(!showReview)}
            className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 hover:bg-slate-50 cursor-pointer"
          >
            <span>Review All 15 Questions & Explanations</span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showReview && (
            <div className="p-5 pt-0 space-y-4 border-t border-slate-100">
              {result.reviewItems.map((item, idx) => (
                <div key={item.id} className="pt-4 border-t first:border-t-0 border-slate-100 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                    <span className={item.isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                      {item.isCorrect ? '✓' : '✗'}
                    </span>
                    <span>
                      Q{idx + 1}. {item.question}
                    </span>
                  </div>
                  <div className="text-slate-600 ml-5 space-y-1">
                    <div>
                      Your answer:{' '}
                      <strong className={item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                        {item.selectedIndex !== null ? item.options[item.selectedIndex] : 'None'}
                      </strong>
                      {item.isGuess && ' (Marked as guess)'}
                    </div>
                    {!item.isCorrect && (
                      <div>
                        Correct answer: <strong className="text-emerald-700">{item.options[item.correctIndex]}</strong>
                      </div>
                    )}
                    <p className="text-slate-500 text-xs pt-0.5">{item.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}