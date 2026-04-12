import React from 'react';

type Props = {
  badge: string;
  title: string;
  sub?: string;
};

export default function SectionHeading({ badge, title, sub }: Props) {
  return (

    
    <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">

        


      <span className="mb-5 inline-flex rounded-md border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
        {badge}
      </span>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {sub ? <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">{sub}</p> : null}
    </div>
  );
}