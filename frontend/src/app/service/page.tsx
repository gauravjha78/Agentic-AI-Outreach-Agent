"use client";

import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck, PhoneOff, MailCheck, Users,
  User, Bot, Send, PhoneCall,
  ChevronRight, Sparkles, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import ChatBot from "@/components/chatbot";

/* ─── colour tokens ─────────────────────────── */
const C = {
  purple:  "#814AC8",
  magenta: "#e040fb",
  pink:    "#f06292",
  bg:      "#050505",
};

/* ═══════════════════════════════════════════════
   ZOOM-POP hook
   Each watched element starts at scale(0.72) + blur(6px).
   When it enters the viewport the "popped" class fires,
   transitioning it to scale(1) with a spring cubic-bezier
   that overshoots slightly — that's the "pop".
   Stagger delay is set via inline transitionDelay.
═══════════════════════════════════════════════ */
function useZoomPop(threshold = 0.12) {
  const ref    = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setPopped(true); obs.disconnect(); } },
      { threshold, rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, popped };
}

/* plain fade-up for text headings */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "-30px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── card data ──────────────────────────────── */
const INTENT_CARDS = [
  { Icon: ShieldCheck, color: C.purple,  bg: "rgba(129,74,200,0.12)", title: "AI Gatekeeper",         body: "A conversational AI that separates genuine buyers from idle browsers — scoring intent in real-time before any human is involved.",               tag: "Intent Scoring"    },
  { Icon: PhoneOff,    color: C.magenta, bg: "rgba(224,64,251,0.1)",  title: "Zero-Cold-Call Engine",  body: "Your team receives only high-intent leads who have already confirmed they want to enroll. Every call is warm. Every minute is productive.", tag: "100% Warm Leads", featured: true },
  { Icon: MailCheck,   color: C.pink,    bg: "rgba(240,98,146,0.1)",  title: "Seamless Gmail Sync",    body: "Personalised follow-up emails dispatch the instant a lead qualifies — keeping prospects engaged while your team focuses on closing.",          tag: "Instant Follow-up" },
  { Icon: Users,       color: "#22d3ee", bg: "rgba(34,211,238,0.1)",  title: "Scale Ready",            body: "Built on a high-performance architecture supporting 50+ concurrent team members with zero bottlenecks or slowdowns.",                        tag: "50+ Users"         },
];

const STEPS = [
  { num: "01", Icon: User,      color: C.purple,  title: "Visitor Lands",        desc: "A prospect discovers XTRACT and submits your enrollment form — their first intent signal." },
  { num: "02", Icon: Bot,       color: C.magenta, title: "AI Qualifies Intent",  desc: "Our chatbot engages in real-time, asking targeted questions to score genuine purchase intent." },
  { num: "03", Icon: Send,      color: C.pink,    title: "Auto Email Sent",      desc: "Qualified leads receive a personalised Gmail follow-up instantly — zero human intervention." },
  { num: "04", Icon: PhoneCall, color: "#4ade80", title: "Team Closes the Deal", desc: "Your team calls only confirmed, high-intent leads. Every conversation converts." },
];

const STATS = [
  { num: "94%", label: "Reduction in wasted calls" },
  { num: "3×",  label: "Faster enrollment cycle"   },
  { num: "50+", label: "Concurrent team members"   },
];

/* ═══ GLOBAL CSS ══════════════════════════════ */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
    

@keyframes fadeUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes spin    { to{transform:rotate(360deg)} }
@keyframes spinR   { to{transform:rotate(-360deg)} }
@keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
@keyframes floatY2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes drip    { 0%,100%{opacity:.3;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.1)} }
@keyframes marquee { to{transform:translateX(-50%)} }

.syne { font-family:'Syne',sans-serif; }
.grad-text {
  background:linear-gradient(135deg,#c084fc 0%,#e040fb 50%,#f06292 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
}

/* heading fade-up */
.reveal { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
.reveal.vis { opacity:1; transform:translateY(0); }

/* ══════════════════════════════════════════════
   ZOOM-POP  —  scroll-triggered card entrance
   spring cubic-bezier(0.34,1.56,0.64,1) causes
   the scale to overshoot 1.0 before settling — "pop"
══════════════════════════════════════════════ */
.zoom-pop {
  opacity: 0;
  transform: scale(0.72) translateY(24px);
  filter: blur(7px);
  will-change: transform, opacity, filter;
  transition:
    opacity    0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform  0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    filter     0.42s ease,
    border-color 0.3s ease,
    box-shadow   0.3s ease;
}
.zoom-pop.popped {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: blur(0px);
}
/* hover lift — only kicks in after popped */
.zoom-pop.popped:hover {
  transform: scale(1.03) translateY(-6px) !important;
  border-color: rgba(129,74,200,.55) !important;
  box-shadow: 0 28px 64px rgba(0,0,0,.55), 0 0 0 1px rgba(129,74,200,.15) !important;
}
.zoom-pop.popped:hover .card-accent { opacity:1 !important; }

/* buttons */
.btn-pri {
  display:inline-flex; align-items:center; gap:8px;
  padding:14px 32px; border-radius:10px;
  background:linear-gradient(135deg,#814AC8,#e040fb);
  color:#fff; font-size:14px; font-weight:700; text-decoration:none;
  border:none; cursor:pointer;
  box-shadow:0 0 40px rgba(129,74,200,.35);
  transition:transform .2s, box-shadow .2s;
}
.btn-pri:hover { transform:translateY(-2px); box-shadow:0 0 70px rgba(129,74,200,.55); }
.btn-ghost {
  display:inline-flex; align-items:center; gap:8px;
  padding:14px 32px; border-radius:10px;
  border:1px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.04);
  color:#f0f0f0; font-size:14px; font-weight:500; text-decoration:none;
  transition:background .2s, border-color .2s, transform .2s;
}
.btn-ghost:hover { background:rgba(255,255,255,.09); border-color:rgba(129,74,200,.4); transform:translateY(-2px); }
.step-node { transition:border-color .3s, box-shadow .3s; }
.step-node:hover { border-color:rgba(129,74,200,.6) !important; box-shadow:0 0 28px rgba(129,74,200,.25) !important; }
`;

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function ServicePage() {
  return (
    <main style={{ background: C.bg, color: "#f0f0f0", fontFamily: "'DM Sans',sans-serif", overflowX: "hidden", isolation:"isolate"}}>
      <style>{GLOBAL_CSS}</style>
      <Navbar/>
      <HeroSection />
      <TrustBand />
      <IntentGrid />
      <StatsBand />
      <WorkflowSection />
      <CtaSection />
      <ChatBot/>
    </main>
  );
}

/* ═══ HERO ════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"140px 32px 100px", position:"relative", overflow:"visible" }}>
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", top:"50%", left:"50%", marginTop:-350, marginLeft:-350, background:"conic-gradient(from 0deg,transparent 70%,rgba(129,74,200,0.15) 100%)", animation:"spin 24s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:450, height:450, borderRadius:"50%", top:"50%", left:"50%", marginTop:-225, marginLeft:-225, background:"conic-gradient(from 0deg,rgba(224,64,251,0.08) 0%,transparent 60%)", animation:"spinR 14s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", top:"-80px", left:"50%", marginLeft:-250, background:"radial-gradient(circle,rgba(129,74,200,0.22) 0%,transparent 70%)", filter:"blur(80px)", animation:"floatY 9s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:280, height:280, borderRadius:"50%", bottom:"6%", right:"0", background:"radial-gradient(circle,rgba(224,64,251,0.12) 0%,transparent 70%)", filter:"blur(60px)", animation:"floatY2 11s ease-in-out infinite reverse", pointerEvents:"none" }} />

      <div style={{ animation:"fadeUp .6s ease both", position:"relative", zIndex:1, display:"inline-flex", alignItems:"center", gap:8, padding:"6px 18px", borderRadius:99, border:"1px solid rgba(255,255,255,.08)", background:"rgba(255,255,255,.04)", fontSize:11, letterSpacing:".12em", color:"rgba(240,240,240,.6)", marginBottom:32 }}>
        <span style={{ background:C.purple, color:"#fff", fontSize:10, fontWeight:700, letterSpacing:".06em", padding:"2px 10px", borderRadius:20 }}>Services</span>
        Efficiency through intent
      </div>

      <h1 className="syne" style={{ animation:"fadeUp .6s .1s ease both", position:"relative", zIndex:1, fontSize:"clamp(50px,9vw,96px)", fontWeight:800, lineHeight:1.02, letterSpacing:"-.03em", maxWidth:900 }}>
        The End of the<br />
        <span className="grad-text">Cold Call.</span>
      </h1>

      <p style={{ animation:"fadeUp .6s .22s ease both", position:"relative", zIndex:1, marginTop:24, fontSize:17, color:"rgba(240,240,240,.55)", maxWidth:520, lineHeight:1.75 }}>
        XTRACT replaces manual prospecting with a fully automated intent engine — so your team only speaks to people who are ready to enroll.
      </p>

      <div style={{ animation:"fadeUp .6s .34s ease both", position:"relative", zIndex:1, marginTop:44, display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
        <a href="#cta" className="btn-pri">Book a Demo <ArrowRight size={15} /></a>
        <a href="#workflow" className="btn-ghost">See How It Works <ChevronRight size={15} /></a>
      </div>

      <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, fontSize:10, letterSpacing:".15em", textTransform:"uppercase", color:"rgba(240,240,240,.28)", animation:"fadeUp 1s .8s ease both" }}>
        <div style={{ width:1, height:48, background:`linear-gradient(to bottom,${C.purple},transparent)`, animation:"drip 2.2s ease-in-out infinite" }} />
        scroll
      </div>
    </section>
  );
}

/* ═══ TRUST BAND ══════════════════════════════ */
function TrustBand() {
  const logos = ["Logosys","GrowthPeak","NexaCorp","TechFlow","TrailForge","MedixChain","ScaleByte","FinSolve"];
  const doubled = [...logos, ...logos];
  return (
    <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", borderBottom:"1px solid rgba(255,255,255,.06)", padding:"28px 0" }}>
      <p style={{ textAlign:"center", fontSize:11, letterSpacing:".18em", textTransform:"uppercase", color:"rgba(240,240,240,.3)", marginBottom:20 }}>Over 50+ businesses trust us</p>
      <div style={{ overflow:"hidden", maskImage:"linear-gradient(to right,transparent,black 12%,black 88%,transparent)" }}>
        <div style={{ display:"flex", width:"max-content", animation:"marquee 22s linear infinite", gap:48 }}>
          {doubled.map((name, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, whiteSpace:"nowrap", fontSize:13, fontWeight:600, color:"rgba(240,240,240,.45)" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:C.purple, display:"inline-block", flexShrink:0 }} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══ INTENT GRID ═════════════════════════════ */
function IntentGrid() {
  const { ref, visible } = useReveal();
  return (
    <section id="services" style={{ padding:"100px 48px", position:"relative" }}>
      <div style={{ position:"absolute", width:500, height:300, top:"20%", left:"50%", marginLeft:-250, background:"radial-gradient(ellipse,rgba(129,74,200,0.1) 0%,transparent 70%)", filter:"blur(60px)", pointerEvents:"none" }} />

      {/* section label + heading — plain reveal */}
      <div ref={ref} className={`reveal${visible?" vis":""}`} style={{ maxWidth:800, marginBottom:64 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, fontSize:11, letterSpacing:".18em", textTransform:"uppercase", color:C.purple, fontWeight:700, marginBottom:16 }}>
          <span style={{ width:24, height:1, background:C.purple, display:"inline-block" }} />
          Core Capabilities
        </div>
        <h2 className="syne" style={{ fontSize:"clamp(32px,4.5vw,56px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-.025em" }}>
          Four pillars of <span className="grad-text">zero-waste outreach</span>
        </h2>
        <p style={{ marginTop:16, fontSize:16, color:"rgba(240,240,240,.5)", lineHeight:1.75, maxWidth:520 }}>
          Every feature is designed with one goal: your teams time is never wasted on an unqualified lead.
        </p>
      </div>

      {/* CARD GRID */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
        {INTENT_CARDS.map((card, i) => (
          <IntentCard key={card.title} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

function IntentCard({ card, index }: { card: typeof INTENT_CARDS[0]; index: number }) {
  const { ref, popped } = useZoomPop(0.1);
  return (
    <div
      ref={ref}
      className={`zoom-pop${popped ? " popped" : ""}`}
      style={{
        /* stagger: card N waits index×130 ms AFTER its own IntersectionObserver fires */
        transitionDelay: popped ? `${index * 0.13}s` : "0s",
        borderRadius: 20,
        border: card.featured ? `1.5px solid ${C.purple}` : "1px solid rgba(255,255,255,.07)",
        background: card.featured
          ? "linear-gradient(160deg,rgba(129,74,200,0.18) 0%,rgba(0,0,0,0.6) 100%)"
          : "rgba(255,255,255,0.025)",
        padding: "32px",
        position: "relative", overflow: "hidden",
        boxShadow: card.featured ? `0 0 60px rgba(129,74,200,0.22)` : "none",
      }}
    >
      {/* top shimmer accent — CSS shows it on hover via .card-accent */}
      <div className="card-accent" style={{ position:"absolute", top:0, left:28, right:28, height:2, borderRadius:"0 0 2px 2px", background:`linear-gradient(90deg,${card.color},${C.magenta})`, opacity: card.featured ? 1 : 0, transition:"opacity .35s" }} />

      {card.featured && (
        <div style={{ position:"absolute", top:-1, right:28, background:C.purple, color:"#fff", fontSize:10, fontWeight:700, letterSpacing:".08em", padding:"3px 12px", borderRadius:"0 0 8px 8px" }}>
          Most Used
        </div>
      )}

      <div style={{ width:52, height:52, borderRadius:14, background:card.bg, display:"grid", placeItems:"center", marginBottom:22 }}>
        <card.Icon size={22} color={card.color} />
      </div>

      <h3 className="syne" style={{ fontSize:18, fontWeight:700, marginBottom:10 }}>{card.title}</h3>
      <p style={{ fontSize:14, color:"rgba(240,240,240,.5)", lineHeight:1.72 }}>{card.body}</p>

      <div style={{ display:"inline-block", marginTop:22, fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", padding:"4px 14px", borderRadius:99, border:`1px solid rgba(${card.featured?"129,74,200":"255,255,255"},.25)`, color: card.featured ? "#c084fc" : "rgba(240,240,240,.4)" }}>
        {card.tag}
      </div>
    </div>
  );
}

/* ═══ STATS BAND ══════════════════════════════ */
function StatsBand() {
  const { ref, visible } = useReveal(0.2);
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:"1px solid rgba(255,255,255,.06)", borderBottom:"1px solid rgba(255,255,255,.06)", background:"linear-gradient(135deg,rgba(129,74,200,0.07),rgba(224,64,251,0.04))" }}>
      {STATS.map((s, i) => (
        <div key={s.label} className={`reveal${visible?" vis":""}`} style={{ transitionDelay:`${i*0.12}s`, padding:"52px 40px", textAlign:"center", borderRight: i < STATS.length-1 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
          <div className="syne grad-text" style={{ fontSize:"clamp(42px,6vw,68px)", fontWeight:800, lineHeight:1 }}>{s.num}</div>
          <div style={{ marginTop:10, fontSize:13, color:"rgba(240,240,240,.45)", letterSpacing:".04em" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══ WORKFLOW ════════════════════════════════ */
function WorkflowSection() {
  const { ref, visible } = useReveal();
  return (
    <section id="workflow" style={{ padding:"110px 48px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(255,255,255,0.008)", pointerEvents:"none" }} />

      <div ref={ref} className={`reveal${visible?" vis":""}`} style={{ textAlign:"center", marginBottom:88 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:11, letterSpacing:".18em", textTransform:"uppercase", color:C.purple, fontWeight:700, marginBottom:16 }}>
          <Sparkles size={12} color={C.purple} />
          The Process
        </div>
        <h2 className="syne" style={{ fontSize:"clamp(32px,4.5vw,56px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-.025em" }}>
          From <span className="grad-text">visitor</span> to enrolled —<br />without lifting a finger
        </h2>
        <p style={{ marginTop:16, fontSize:16, color:"rgba(240,240,240,.5)", maxWidth:480, margin:"16px auto 0", lineHeight:1.75 }}>
          A four-step pipeline that runs 24 / 7, so your team wakes up to curated confirmed enrollments.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, position:"relative", maxWidth:1100, margin:"0 auto" }}>
        <div style={{ position:"absolute", top:43, left:"12.5%", right:"12.5%", height:1, background:`linear-gradient(to right,${C.purple},${C.magenta},${C.pink},#4ade80)`, zIndex:0 }} />
        {STEPS.map((step, i) => (
          <WorkflowStep key={step.title} step={step} index={i} total={STEPS.length} />
        ))}
      </div>
    </section>
  );
}

/* Workflow steps also zoom-pop in sequence */
function WorkflowStep({ step, index, total }: { step: typeof STEPS[0]; index: number; total: number }) {
  const { ref, popped } = useZoomPop(0.08);
  return (
    <div
      ref={ref}
      className={`zoom-pop${popped ? " popped" : ""}`}
      style={{
        transitionDelay: popped ? `${index * 0.14}s` : "0s",
        display:"flex", flexDirection:"column", alignItems:"center",
        textAlign:"center", padding:"0 20px",
        position:"relative", zIndex:1,
      }}
    >
      {index < total - 1 && (
        <div style={{ position:"absolute", top:30, right:-10, zIndex:2, width:26, height:26, borderRadius:"50%", background:C.bg, border:`1px solid rgba(129,74,200,.4)`, display:"grid", placeItems:"center" }}>
          <ChevronRight size={12} color={C.purple} />
        </div>
      )}
      <div className="step-node" style={{ width:88, height:88, borderRadius:"50%", border:"1px solid rgba(255,255,255,.08)", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28 }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:`linear-gradient(135deg,rgba(129,74,200,0.18),rgba(224,64,251,0.1))`, border:`1px solid rgba(129,74,200,.25)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span className="syne" style={{ fontSize:20, fontWeight:800, color:"#c084fc" }}>{step.num}</span>
        </div>
      </div>
      <step.Icon size={18} color={step.color} style={{ marginBottom:12, opacity:.8 }} />
      <h3 className="syne" style={{ fontSize:15, fontWeight:700, marginBottom:10, lineHeight:1.3 }}>{step.title}</h3>
      <p style={{ fontSize:13, color:"rgba(240,240,240,.45)", lineHeight:1.72 }}>{step.desc}</p>
    </div>
  );
}

/* ═══ CTA ═════════════════════════════════════ */
function CtaSection() {
  const { ref, popped } = useZoomPop(0.18);
  return (
    <section id="cta" style={{ padding:"80px 48px 120px" }}>
      <div
        ref={ref}
        className={`zoom-pop${popped ? " popped" : ""}`}
        style={{ maxWidth:860, margin:"0 auto", borderRadius:28, border:"1px solid rgba(129,74,200,.35)", background:"linear-gradient(135deg,rgba(129,74,200,0.18) 0%,rgba(0,0,0,.85) 60%)", padding:"72px 56px", textAlign:"center", position:"relative", overflow:"hidden", boxShadow:"0 0 120px rgba(129,74,200,.18)" }}
      >
        <div style={{ position:"absolute", inset:0, background:"conic-gradient(from 180deg,rgba(129,74,200,0.12),transparent 60%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:500, height:300, top:"50%", left:"50%", marginTop:-150, marginLeft:-250, background:"radial-gradient(ellipse,rgba(129,74,200,0.18) 0%,transparent 70%)", filter:"blur(50px)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <h2 className="syne" style={{ fontSize:"clamp(32px,5vw,60px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-.025em", marginBottom:20 }}>
            Ready to <span className="grad-text">eliminate</span><br />cold calls forever?
          </h2>
          <p style={{ fontSize:16, color:"rgba(240,240,240,.5)", maxWidth:440, margin:"0 auto 44px", lineHeight:1.75 }}>
            Join 50+ businesses already running on XTRACTs intent-driven enrollment engine.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/enrollment" className="btn-pri">Book a Demo <ArrowRight size={15} /></a>
            <a href="/pricing"    className="btn-ghost">View Plans</a>
          </div>
          <div style={{ marginTop:44, display:"flex", alignItems:"center", justifyContent:"center", gap:14, fontSize:12, color:"rgba(240,240,240,.35)" }}>
            <div style={{ display:"flex" }}>
              {["G","N","T","F"].map((l, i) => (
                <div key={i} style={{ width:28, height:28, borderRadius:"50%", border:`2px solid ${C.bg}`, marginLeft:i===0?0:-8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff", background: [
                  `linear-gradient(135deg,${C.purple},${C.magenta})`,
                  `linear-gradient(135deg,${C.magenta},${C.pink})`,
                  `linear-gradient(135deg,#22d3ee,${C.purple})`,
                  `linear-gradient(135deg,${C.pink},${C.magenta})`,
                ][i] }}>{l}</div>
              ))}
            </div>
            Trusted by Logosys, NexaCorp, TechFlow &amp; more
          </div>
        </div>
      </div>
    </section>
  );
}
