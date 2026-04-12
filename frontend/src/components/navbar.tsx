'use client'
import Link from 'next/link';
import { navLinks } from '@/lib/landing-data';


export default function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">

        <div className="absolute pointer-events-none blur-3xl opacity-20 bg-purple-600 w-[400px] h-[400px] rounded-full"></div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <Link href="#" className="flex items-center gap-2 text-white">
          <div className="grid h-7 w-7 place-items-center rounded-xl bg-[#814AC8] font-bold">C</div>
          <span className="text-lg font-extrabold tracking-tight">XTRACT</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link 
            key={item.href} 
            href={item.href} 

            className="text-sm text-white/70 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a
          href="https://cal.com"
          target="_blank"
          className="rounded-md border border-white/10 bg-[#814AC8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9b5de5]"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}