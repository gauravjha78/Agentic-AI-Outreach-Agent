'use client'
import Link from 'next/link';
import { navLinks } from '@/lib/landing-data';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">

      <div className="absolute pointer-events-none blur-3xl opacity-20 bg-purple-600 w-[400px] h-[400px] rounded-full"></div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 text-white">
          <div className="grid h-7 w-7 place-items-center rounded-xl bg-[#814AC8] font-bold">C</div>
          <span className="text-lg font-extrabold tracking-tight">XTRACT</span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Desktop CTA */}
        <Link
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block rounded-md border border-white/10 bg-[#814AC8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#9b5de5]"
        >
          Book a call
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 p-1 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-5 py-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-sm text-white/70 transition hover:text-white border-b border-white/[0.06] last:border-none"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-3 mb-2 rounded-md border border-white/10 bg-[#814AC8] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#9b5de5]"
          >
            Book a call
          </Link>
        </div>
      </div>

    </nav>
  );
}