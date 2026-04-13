'use client';

import Link from 'next/link';
import { useState } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const steps = [
  { num: '01', icon: '🎯', title: 'Define Your ICP', desc: 'Tell us your ideal customer profile — industry, size, role, location. Our AI maps the exact audience for your offer.' },
  { num: '02', icon: '🤖', title: 'AI Builds Your List', desc: 'We crawl verified data sources and qualify leads with enrichment scores, contact info, and intent signals.' },
  { num: '03', icon: '✉️', title: 'Automated Outreach', desc: 'Personalized sequences launch automatically — email, LinkedIn, and follow-ups — all managed by AI.' },
  { num: '04', icon: '📈', title: 'Track & Scale', desc: 'Real-time analytics show open rates, replies, and conversions. Double down on what works instantly.' },
];

const stats = [
  { num: '50+', label: 'Businesses Scaled' },
  { num: '3.8x', label: 'Avg. Reply Rate Lift' },
  { num: '12K+', label: 'Leads Generated' },
  { num: '48h', label: 'Setup to Launch' },
  { num: '98%', label: 'Client Retention' },
];

const features = [
  { icon: '🧠', color: 'rgba(129,74,200,.15)', title: 'AI Lead Scoring', desc: 'Rank every lead by likelihood to convert using behavioral signals and firmographic data.' },
  { icon: '⚡', color: 'rgba(34,197,94,.1)', title: 'Instant Enrichment', desc: 'Auto-fill company size, revenue, tech stack, and verified emails in seconds.' },
  { icon: '💬', color: 'rgba(59,130,246,.1)', title: 'Personalized Sequences', desc: 'AI writes unique outreach for each lead based on their industry, role, and pain points.' },
  { icon: '🔗', color: 'rgba(239,68,68,.1)', title: 'CRM Integration', desc: 'Sync with HubSpot, Salesforce, and Pipedrive. No manual data entry ever again.' },
  { icon: '📊', color: 'rgba(251,191,36,.1)', title: 'Real-time Dashboard', desc: 'Monitor campaigns, A/B tests, and revenue attribution in one clean view.' },
  { icon: '🛡️', color: 'rgba(129,74,200,.1)', title: 'GDPR Compliant', desc: 'Built-in consent management, opt-out handling, and data residency controls.' },
];

const videos = [
  { tag: 'AI & Analytics', title: 'AI for Data Analytics — Full Crash Course', desc: 'Machine learning fundamentals for data-driven decisions.', ytId: 'ua-CiDNNj30', thumb: 'https://img.youtube.com/vi/ua-CiDNNj30/hqdefault.jpg' },
  { tag: 'AI & Analytics', title: 'Python for Data Science in 2025', desc: 'From pandas to predictive models — complete walkthrough.', ytId: 'HrRA67O-QXI', thumb: 'https://img.youtube.com/vi/HrRA67O-QXI/hqdefault.jpg' },
  { tag: 'Web Dev', title: 'Next.js 14 Full Course', desc: 'Build production-ready apps with the latest Next.js features.', ytId: 'ZjAqacIC_3c', thumb: 'https://img.youtube.com/vi/ZjAqacIC_3c/hqdefault.jpg' },
  { tag: 'AI & Analytics', title: 'Build an AI Agent from Scratch', desc: 'LangChain + OpenAI to create autonomous AI workflows.', ytId: 'vUYnRGotTbo', thumb: 'https://img.youtube.com/vi/vUYnRGotTbo/hqdefault.jpg' },
  { tag: 'Web Dev', title: 'Tailwind CSS Masterclass', desc: 'Utility-first CSS for fast, beautiful UI development.', ytId: '6biMWgD6_JY', thumb: 'https://img.youtube.com/vi/6biMWgD6_JY/hqdefault.jpg' },
  { tag: 'Growth', title: 'B2B Lead Generation Strategy 2025', desc: 'Frameworks top SaaS companies use to fill their pipeline.', ytId: 'ThLMW1Qr5U0', thumb: 'https://img.youtube.com/vi/ThLMW1Qr5U0/hqdefault.jpg' },
];

const testimonials = [
  { stars: 5, text: '"XTRACT replaced an entire SDR team. We went from 20 qualified leads/month to 180 in 6 weeks. The AI personalization is uncanny."', initials: 'SR', name: 'Sarah Ruiz', role: 'CEO, GrowthPeak' },
  { stars: 5, text: '"Setup took literally 2 days. By the end of week one we had 14 booked demos. Nothing else has come close to this ROI."', initials: 'MT', name: 'Marcus Trent', role: 'Head of Sales, TechFlow' },
  { stars: 5, text: '"We scaled from $40K to $200K MRR in 4 months. XTRACT\'s outreach quality is what makes the difference — leads actually respond."', initials: 'AK', name: 'Anita Kapoor', role: 'Founder, ScaleByte' },
];

type QuizQuestion = { q: string; opts: string[]; ans: number; exp: string };
type QuizData = Record<string, QuizQuestion[]>;

const quizData: QuizData = {
  'AI Basics': [
    { q: "What does 'LLM' stand for in AI?", opts: ['Large Language Model', 'Linear Logic Method', 'Layered Learning Machine', 'Linked Language Model'], ans: 0, exp: 'LLMs are deep learning models trained on massive text to generate human-like language.' },
    { q: "Which technique helps AI models 'remember' context across long conversations?", opts: ['Backpropagation', 'Attention mechanism', 'Dropout', 'Gradient clipping'], ans: 1, exp: 'Attention (used in Transformers) lets models weigh the importance of different tokens in context.' },
    { q: "What is 'hallucination' in AI?", opts: ['AI generating random images', 'AI confidently stating false info', 'Model training on wrong data', 'Overfitting to training set'], ans: 1, exp: 'Hallucination = when AI generates plausible-sounding but factually incorrect outputs.' },
    { q: 'Which company created the GPT series of models?', opts: ['Google', 'Meta', 'Anthropic', 'OpenAI'], ans: 3, exp: 'OpenAI released GPT-1 through GPT-4 and the ChatGPT product line.' },
    { q: "What is 'fine-tuning' in machine learning?", opts: ['Adjusting hyperparameters randomly', 'Training a pretrained model on a smaller specific dataset', 'Removing neurons from a neural net', 'Increasing model size'], ans: 1, exp: 'Fine-tuning adapts a general pretrained model to a specific task using targeted data.' },
  ],
  'Data Analytics': [
    { q: 'Which Python library is most commonly used for data manipulation?', opts: ['NumPy', 'TensorFlow', 'Pandas', 'Matplotlib'], ans: 2, exp: 'Pandas provides DataFrames — the go-to structure for data cleaning and analysis.' },
    { q: "What does 'ETL' stand for in data engineering?", opts: ['Extract, Transform, Load', 'Evaluate, Test, Launch', 'Encode, Train, Learn', 'Export, Track, Log'], ans: 0, exp: 'ETL pipelines move data from source → transform it → load into a destination.' },
    { q: 'A scatter plot is best used to show:', opts: ['Proportions of a whole', 'Trends over time', 'Correlation between two variables', 'Category comparisons'], ans: 2, exp: 'Scatter plots reveal relationships and correlations between two numeric variables.' },
    { q: "What is 'data normalization'?", opts: ['Backing up your database', 'Scaling values to a standard range', 'Removing duplicate rows', 'Encrypting sensitive fields'], ans: 1, exp: 'Normalization scales data (e.g. 0 to 1) so features don\'t dominate due to magnitude.' },
    { q: "SQL 'GROUP BY' is used to:", opts: ['Sort rows alphabetically', 'Filter rows by condition', 'Aggregate rows with same value', 'Join two tables'], ans: 2, exp: 'GROUP BY collapses rows with the same value so you can apply aggregate functions like SUM, COUNT.' },
  ],
  'Web Dev': [
    { q: "What does 'SSR' mean in Next.js?", opts: ['Static Style Rendering', 'Server-Side Rendering', 'Synchronized Script Runtime', 'Stylesheet Scoped Rules'], ans: 1, exp: 'SSR generates HTML on the server per request — great for SEO and dynamic content.' },
    { q: "Which hook re-runs a side effect when a dependency changes in React?", opts: ['useState', 'useRef', 'useMemo', 'useEffect'], ans: 3, exp: 'useEffect runs after render and re-runs whenever listed dependencies update.' },
    { q: 'What is the purpose of a CDN?', opts: ['To store database backups', 'To deliver content from servers close to the user', 'To compile JavaScript', 'To manage SSL certificates'], ans: 1, exp: 'CDNs cache assets at edge locations globally so users get faster load times.' },
    { q: "In CSS, 'rem' is relative to:", opts: ['The parent element font size', 'The viewport width', 'The root element font size', 'The screen resolution'], ans: 2, exp: 'rem = root em, always relative to the <html> font-size (usually 16px).' },
    { q: "What does 'API' stand for?", opts: ['Application Programming Interface', 'Automated Page Indexer', 'Advanced Protocol Integration', 'Application Process Instance'], ans: 0, exp: 'APIs define how software components communicate — the backbone of modern web apps.' },
  ],
};

const categories = Object.keys(quizData);

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function VideoModal({ ytId, onClose }: { ytId: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
      onClick={onClose}
    >
      <div
        className="relative w-[90%] max-w-3xl rounded-2xl overflow-hidden bg-[#111]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
        >
          ✕
        </button>
        <iframe
          className="w-full aspect-video border-none"
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
          allowFullScreen
        />
      </div>
    </div>
  );
}

function QuizSection() {
  const [cat, setCat] = useState(categories[0]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [streak, setStreak] = useState<(boolean | null)[]>(Array(5).fill(null));
  const [done, setDone] = useState(false);

  const questions = quizData[cat];
  const current = questions[qIdx];
  const progress = (qIdx / questions.length) * 100;

  const handleCat = (c: string) => {
    setCat(c);
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setStreak(Array(5).fill(null));
    setDone(false);
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === current.ans;
    if (correct) setScore((s) => s + 1);
    const newStreak = [...streak];
    newStreak[qIdx] = correct;
    setStreak(newStreak);
  };

  const handleNext = () => {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setStreak(Array(5).fill(null));
    setDone(false);
  };

  const pct = Math.round((score / questions.length) * 100);
  const msg = pct >= 80 ? '🏆 Expert level!' : pct >= 60 ? '👍 Nice work!' : '📚 Keep learning!';

  return (
    <section className="border-t border-white/10 py-20 px-5 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[.18em] text-[#814AC8] mb-3">Interactive Learning</p>
        <h2 className="text-4xl font-bold mb-4">Test Your Knowledge</h2>
        <p className="text-white/60 mb-10 max-w-lg">Quiz yourself on AI, data analytics, and web development. Track your streak and sharpen your edge.</p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => handleCat(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
                c === cat
                  ? 'bg-[#814AC8] border-[#814AC8] text-white'
                  : 'border-white/10 text-white/50 hover:text-white hover:border-white/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Quiz Card */}
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-bold tracking-[.1em] uppercase text-[#9b5de5] bg-[#814AC8]/15 px-3 py-1 rounded-full">{cat}</span>
            <div className="flex-1 h-1 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#814AC8] transition-all duration-500"
                style={{ width: done ? '100%' : `${progress}%` }}
              />
            </div>
            <span className="text-xs text-white/40">{Math.min(qIdx + 1, questions.length)} / {questions.length}</span>
          </div>

          {/* Streak dots */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-white/40 mr-1">Progress:</span>
            {streak.map((s, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  s === true ? 'bg-[#9b5de5]' : s === false ? 'bg-red-500/50' : 'bg-white/15'
                }`}
              />
            ))}
          </div>

          {done ? (
            <div className="text-center py-6">
              <div className="text-6xl font-extrabold text-[#9b5de5] mb-2">{score}/{questions.length}</div>
              <div className="text-white/50 mb-4">{pct}% correct</div>
              <div className="text-xl font-semibold mb-8">{msg}</div>
              <button
                onClick={handleRestart}
                className="bg-[#814AC8] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#9b5de5] transition"
              >
                Try Again ↺
              </button>
            </div>
          ) : (
            <>
              <p className="text-xl font-semibold leading-snug mb-7">{current.q}</p>
              <div className="grid gap-3 mb-6">
                {current.opts.map((opt, i) => {
                  let cls = 'bg-white/5 border-white/10 text-white hover:bg-[#814AC8]/15 hover:border-[#814AC8]/50';
                  if (selected !== null) {
                    if (i === current.ans) cls = 'bg-green-500/10 border-green-400/50 text-green-400';
                    else if (i === selected) cls = 'bg-red-500/10 border-red-400/40 text-red-400';
                    else cls = 'bg-white/5 border-white/5 text-white/30';
                  }
                  return (
                    <button
                      key={i}
                      disabled={selected !== null}
                      onClick={() => handleSelect(i)}
                      className={`text-left w-full border rounded-xl px-5 py-3.5 text-sm font-medium transition ${cls}`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <p className="text-sm text-white/60 mb-5 leading-relaxed">
                  {selected === current.ans ? '✅' : '❌'} {current.exp}
                </p>
              )}
              <button
                disabled={selected === null}
                onClick={handleNext}
                className="bg-[#814AC8] text-white px-7 py-3 rounded-xl text-sm font-semibold hover:bg-[#9b5de5] transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {qIdx + 1 === questions.length ? 'See Results' : 'Next →'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28 text-center md:px-10">
        <div className="absolute blur-3xl opacity-20 bg-purple-600 w-[400px] h-[400px] rounded-full" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(129,74,200,0.15)_100%)] animate-[spin_20s_linear_infinite]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(129,74,200,0.08)_0%,transparent_60%)] animate-[spin_12s_linear_infinite_reverse]" />

        <div className="relative z-10 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70">
          <span className="rounded-lg bg-[#814AC8] px-2 py-0.5 text-[11px] font-semibold text-white">New</span>
          Automated Lead Generation
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight fade-up">
          AI-Powered{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent fade-up">
            Enrollment & Outreach
          </span>{' '}
          System
        </h1>

        <p className="relative z-10 mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
          XTRACT brings AI automation to your fingertips — from lead discovery to booked meetings, fully on autopilot.
        </p>

        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/enrollment" className="rounded-md bg-[#814AC8] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9b5de5]">
            Get in touch
          </Link>
          <Link href="/service" className="rounded-md border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
            View services
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-white/10 py-20 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[.18em] text-[#814AC8] mb-3">Simple Process</p>
          <h2 className="text-4xl font-bold mb-4">How XTRACT Works</h2>
          <p className="text-white/60 mb-12 max-w-lg">From setup to results in under 48 hours. Our AI handles the heavy lifting so you can focus on closing deals.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-white/[.04] border border-white/[.08] rounded-2xl p-7">
                <div className="w-10 h-10 rounded-xl bg-[#814AC8]/15 flex items-center justify-center text-xl mb-4">{s.icon}</div>
                <p className="text-xs font-bold tracking-[.1em] text-[#814AC8] mb-2">STEP {s.num}</p>
                <h3 className="text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-10 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#814AC8]/20 to-[#814AC8]/5 border border-[#814AC8]/20 rounded-2xl p-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-extrabold text-[#9b5de5] mb-1">{s.num}</div>
                <div className="text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="border-t border-white/10 py-20 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[.18em] text-[#814AC8] mb-3">Platform Capabilities</p>
          <h2 className="text-4xl font-bold mb-4">Everything You Need to Scale</h2>
          <p className="text-white/60 mb-12 max-w-lg">A complete suite of AI tools built for modern growth teams and agencies.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-white/[.03] border border-white/[.07] rounded-xl">
                <div className="w-11 h-11 min-w-[44px] rounded-xl flex items-center justify-center text-xl" style={{ background: f.color }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO LIBRARY ── */}
      <section className="border-t border-white/10 py-20 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[.18em] text-[#814AC8] mb-3">Learn & Grow</p>
          <h2 className="text-4xl font-bold mb-4">Resources to Level Up Your Skills</h2>
          <p className="text-white/60 mb-12 max-w-lg">Curated videos on AI, data analytics, and web development — the stack behind XTRACT.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <button
                key={v.ytId}
                onClick={() => setActiveVideo(v.ytId)}
                className="group text-left bg-white/[.04] border border-white/[.08] rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-[#814AC8]/50 transition-all duration-200"
              >
                <div className="relative aspect-video bg-black/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-13 h-13 rounded-full bg-[#814AC8]/90 flex items-center justify-center w-14 h-14">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <polygon points="5,3 15,9 5,15" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="inline-block text-[11px] font-bold tracking-[.08em] uppercase text-[#9b5de5] bg-[#814AC8]/12 px-3 py-0.5 rounded-full mb-2">
                    {v.tag}
                  </span>
                  <h3 className="text-sm font-semibold leading-snug mb-1">{v.title}</h3>
                  <p className="text-xs text-white/45">{v.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="border-t border-white/10 py-20 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[.18em] text-[#814AC8] mb-3">Client Stories</p>
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-white/60 mb-12 max-w-lg">Real results from real businesses across industries.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/[.04] border border-white/[.08] rounded-2xl p-6">
                <div className="text-[#9b5de5] text-sm mb-3">{'★'.repeat(t.stars)}</div>
                <p className="text-sm text-white/70 leading-relaxed italic mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#814AC8] flex items-center justify-center text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <QuizSection />

      {/* ── CTA ── */}
      <section className="border-t border-white/10 py-20 px-5 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#814AC8]/20 to-[#814AC8]/5 border border-[#814AC8]/30 rounded-3xl px-10 py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to 10x Your Outreach?</h2>
            <p className="text-white/60 text-base mb-8 max-w-md mx-auto">
              Join 50+ businesses automating their growth with XTRACT. Get set up in 48 hours — no credit card required.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noreferrer"
                className="bg-[#814AC8] text-white px-8 py-3.5 rounded-xl text-sm font-bold hover:bg-[#9b5de5] transition"
              >
                Book a Free Call
              </a>
              <Link href="/pricing" className="border border-white/20 text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-white/5 transition">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
      {activeVideo && <VideoModal ytId={activeVideo} onClose={() => setActiveVideo(null)} />}
    </>
  );
}