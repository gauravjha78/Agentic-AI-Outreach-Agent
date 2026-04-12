import { logos } from '@/lib/landing-data';

export default function Logos() {
  const loop = [...logos, ...logos];

  return (
    <section className="border-t border-white/10 py-14">
      <p className="mb-8 text-center text-xs uppercase tracking-[0.2em] text-white/60">
        Over 50+ businesses trust us
      </p>

      {/* <div className="absolute blur-3xl opacity-20 bg-purple-600 w-[400px] h-[400px] rounded-full"></div> */}

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        
        {/* FIXED: open div instead of self-closing */}
        <div className="flex w-max animate-[marquee_20s_linear_infinite] gap-20 hover:[animation-play-state:paused]">
          
          {loop.map((name, idx) => (
            <div
              key={`${name}-${idx}`}
              className="flex items-center gap-2 whitespace-nowrap text-base font-semibold text-white/70 opacity-60"
            >
              <span className="h-2 w-2 rounded-full bg-[#814AC8]" />
              {name}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}