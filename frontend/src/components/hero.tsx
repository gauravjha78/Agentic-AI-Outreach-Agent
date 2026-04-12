import Link from 'next/link';


export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28 text-center md:px-10">

        <div className="absolute blur-3xl opacity-20 bg-purple-600 w-[400px] h-[400px] rounded-full"></div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(129,74,200,0.15)_100%)] animate-[spin_20s_linear_infinite]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(129,74,200,0.08)_0%,transparent_60%)] animate-[spin_12s_linear_infinite_reverse]" />


      <div className="relative z-10 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70">
        <span className="rounded-lg bg-[#814AC8] px-2 py-0.5 text-[11px] font-semibold text-white">New</span>
        Automated Lead Generation
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight fade-up">
  AI-Powered <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent fade-up">Enrollment & Outreach</span> System
</h1>

      {/* <h1 className="relative z-10 max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl">
        Intelligent Automation for Modern Businesses.
      </h1> */}

      <p className="relative z-10 mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
        XTRACT brings AI automation to your fingertips and helps streamline tasks.
      </p>

      <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link href='/enrollment' className="rounded-md bg-[#814AC8] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#9b5de5]">
          Get in touch
        </Link>
        <Link href='/service' className="rounded-md border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
          View services
        </Link>
      </div>
    </section>
  );
}