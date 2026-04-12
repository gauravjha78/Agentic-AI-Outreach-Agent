"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";

const PURPLE = "#814AC8";
const PURPLE_HOVER = "#9b5de5";

const plans = [
  {
    name: "Starter",
    monthly: { price: 0, label: "Free" },
    yearly: { price: 0, label: "Free" },
    tagline: "Perfect for individuals and small projects just getting started.",
    cta: "Get Started Free",
    color: "rgba(129,74,200,0.08)",
    border: "rgba(129,74,200,0.25)",
    benefits: [
      "✦ Up to 50 leads/month",
      "✦ Basic AI outreach engine",
      "✦ 1 automation workflow",
      "✦ Email support (48h response)",
      "✦ Standard analytics dashboard",
      "✦ Access to template library",
    ],
  },
  {
    name: "Growth",
    monthly: { price: 20, label: "$20" },
    yearly: { price: 16, label: "$16" },
    tagline: "For teams scaling their outreach operations with AI.",
    cta: "Get Started",
    color: "rgba(129,74,200,0.18)",
    border: "#814AC8",
    badge: "Most Popular",
    benefits: [
      "✦ Up to 500 leads/month",
      "✦ Advanced AI outreach suite",
      "✦ 5 automation workflows",
      "✦ Priority chat & email support",
      "✦ Advanced analytics + exports",
      "✦ CRM integrations (HubSpot, SF)",
    ],
  },
  {
    name: "Pro",
    monthly: { price: 45, label: "$45" },
    yearly: { price: 36, label: "$36" },
    tagline: "The ultimate plan for global businesses and enterprises.",
    cta: "Get Started",
    color: "rgba(129,74,200,0.08)",
    border: "rgba(129,74,200,0.25)",
    benefits: [
      "✦ Unlimited leads/month",
      "✦ Full AI outreach suite",
      "✦ Unlimited workflows",
      "✦ 24/7 dedicated support",
      "✦ White-label reports",
      "✦ Dedicated account manager",
    ],
  },
];

const faqs = [
  { q: "Can I switch plans at any time?", a: "Yes — upgrade or downgrade instantly. Billing is prorated so you only pay for what you use." },
  { q: "Is there a free trial for paid plans?", a: "All paid plans come with a 7-day free trial. No credit card required to start." },
  { q: "What counts as a lead?", a: "Any contact enriched and reached out to via our AI engine within a billing period." },
  { q: "Do you offer enterprise pricing?", a: "Absolutely. Talk to Sales and our team will craft a plan tailored to your scale." },
];

function FlipCard({ plan, billing, index }: { plan: typeof plans[0]; billing: "monthly" | "yearly"; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const isPopular = !!plan.badge;
  const priceData = billing === "monthly" ? plan.monthly : plan.yearly;

  return (
    <div
      className="flip-card-wrapper"
      style={{
        perspective: "1200px",
        animationDelay: `${index * 0.12}s`,
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "420px",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: 20,
            border: `1.5px solid ${plan.border}`,
            background: isPopular
              ? "linear-gradient(160deg, rgba(129,74,200,0.22) 0%, rgba(129,74,200,0.06) 100%)"
              : `linear-gradient(160deg, ${plan.color} 0%, rgba(0,0,0,0.5) 100%)`,
            boxShadow: isPopular ? `0 0 60px rgba(129,74,200,0.3), inset 0 0 40px rgba(129,74,200,0.05)` : "none",
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {plan.badge && (
            <div style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%)",
              background: PURPLE,
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "4px 16px",
              borderRadius: 99,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 20px rgba(129,74,200,0.6)",
            }}>
              {plan.badge}
            </div>
          )}

          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: PURPLE, textTransform: "uppercase", marginBottom: 8 }}>
            {plan.name}
          </div>

          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 28, minHeight: 42 }}>
            {plan.tagline}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1 }}>
              {priceData.label}
            </span>
            {priceData.price > 0 && (
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
                /mo
              </span>
            )}
          </div>

          {billing === "yearly" && priceData.price > 0 && (
            <div style={{ fontSize: 12, color: "#4ade80", marginBottom: 20 }}>
              Save ${(plan.monthly.price - priceData.price) * 12}/year ✓
            </div>
          )}
          {!(billing === "yearly" && priceData.price > 0) && <div style={{ marginBottom: 20 }} />}

          <a
            href="/enrollment"
            style={{
              display: "block",
              textAlign: "center",
              padding: "13px 24px",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              background: isPopular ? PURPLE : "rgba(255,255,255,0.06)",
              border: isPopular ? "none" : "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              transition: "all 0.2s",
              marginTop: "auto",
            }}
          >
            {plan.cta}
          </a>

          <div style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
            Hover to see whats included →
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 20,
            border: `1.5px solid ${PURPLE}`,
            background: "linear-gradient(160deg, rgba(129,74,200,0.25) 0%, rgba(20,0,40,0.95) 100%)",
            boxShadow: `0 0 80px rgba(129,74,200,0.35)`,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: PURPLE, textTransform: "uppercase", marginBottom: 4 }}>
            {plan.name} — What you get
          </div>
          <div style={{ width: 32, height: 2, background: PURPLE, borderRadius: 2, marginBottom: 24 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            {plan.benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontSize: 13,
                  color: "rgba(255,255,255,0.85)",
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <span style={{ color: PURPLE, fontSize: 14, flexShrink: 0 }}>✦</span>
                <span>{b.replace("✦ ", "")}</span>
              </div>
            ))}
          </div>

          <a
            href="/enrollment"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 24,
              padding: "12px 24px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              background: PURPLE,
              color: "#fff",
            }}
          >
            {plan.cta} →
          </a>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ faq,}: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderRadius: 14,
        border: open ? `1px solid ${PURPLE}` : "1px solid rgba(255,255,255,0.08)",
        background: open ? "rgba(129,74,200,0.07)" : "rgba(255,255,255,0.02)",
        overflow: "visible",
        cursor: "pointer",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{faq.q}</span>
        <span style={{
          fontSize: 20,
          color: PURPLE,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s",
          lineHeight: 1,
        }}>+</span>
      </div>
      {open && (
        <div style={{ padding: "0 24px 20px", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
    
        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes spinR { to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes marquee { to { transform: translateX(-50%); } }
        @keyframes pulse { 0%,100% { opacity: 0.2; } 50% { opacity: 0.35; } }
        .fade-up { opacity: 0; animation: fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) forwards; }
        .card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        @media (max-width: 900px) { .card-grid { grid-template-columns: 1fr; } }
        a { text-decoration: none; }
        .toggle-btn:hover { background: rgba(255,255,255,0.1) !important; }
      `}</style>

      {/* NAV */}
      {/* <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, background: PURPLE, borderRadius: 10, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14 }}>C</div>
            <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>XTRACT</span>
          </Link>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[["Services", "/service"], ["Process", "/#process"], ["Benefits", "/#benefits"], ["Pricing", "/pricing"], ["ChatBot", "/chatbot"]].map(([label, href]) => (
              <a key={label} href={href} style={{ fontSize: 13, color: label === "Pricing" ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: label === "Pricing" ? 600 : 400, transition: "color 0.2s" }}>
                {label}
              </a>
            ))}
          </div>
          <a href="https://cal.com" target="_blank" style={{ background: PURPLE, color: "#fff", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 700 }}>
            Book a call
          </a>
        </div>
      </nav> */}
      <Navbar/>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "visible", paddingTop: 140, paddingBottom: 60, textAlign: "center",isolation:"isolate" }}>
        {/* Animated orbs */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 700, height: 700, borderRadius: "50%", background: "conic-gradient(from 0deg, transparent 70%, rgba(129,74,200,0.15) 100%)", animation: "spin 20s linear infinite", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 400, height: 400, borderRadius: "50%", background: "conic-gradient(from 0deg, rgba(129,74,200,0.1) 0%, transparent 60%)", animation: "spinR 12s linear infinite", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,74,200,0.15) 0%, transparent 70%)", animation: "pulse 4s ease-in-out infinite", pointerEvents: "none" }} />

        <div className="fade-up" style={{ animationDelay: "0.1s", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", borderRadius: 99, padding: "6px 16px", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>
            <span style={{ background: PURPLE, borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#fff" }}>Simple</span>
            No hidden fees. No surprises.
          </div>
        </div>

        <h1 className="fade-up" style={{ animationDelay: "0.2s", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, position: "relative", zIndex: 1, padding: "0 20px",overflow:"visible" }}>
          Plans that{" "}
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            scale with you
          </span>
        </h1>

        <p className="fade-up" style={{ animationDelay: "0.3s", marginTop: 20, fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "20px auto 0", lineHeight: 1.7, position: "relative", zIndex: 1 }}>
          Choose the right plan and unlock the full power of AI-driven enrollment and outreach.
        </p>

        {/* Billing toggle */}
        <div className="fade-up" style={{ animationDelay: "0.4s", marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: billing === "monthly" ? "#fff" : "rgba(255,255,255,0.35)", transition: "color 0.3s" }}>Monthly</span>

          <button
            onClick={() => setBilling(b => b === "monthly" ? "yearly" : "monthly")}
            style={{
              width: 56, height: 28, borderRadius: 99,
              border: `1px solid ${billing === "yearly" ? PURPLE : "rgba(255,255,255,0.15)"}`,
              background: billing === "yearly" ? "rgba(129,74,200,0.2)" : "rgba(255,255,255,0.06)",
              position: "relative", cursor: "pointer", transition: "all 0.3s",
            }}
          >
            <span style={{
              position: "absolute", top: 4, width: 18, height: 18, borderRadius: "50%",
              background: PURPLE, transition: "left 0.3s cubic-bezier(0.23,1,0.32,1)",
              left: billing === "yearly" ? 33 : 5,
              boxShadow: "0 2px 8px rgba(129,74,200,0.6)",
            }} />
          </button>

          <span style={{ fontSize: 13, fontWeight: 600, color: billing === "yearly" ? "#fff" : "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 8, transition: "color 0.3s" }}>
            Yearly
            <span style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80", borderRadius: 99, padding: "2px 10px", fontSize: 10, fontWeight: 700, border: "1px solid rgba(74,222,128,0.3)" }}>
              SAVE 20%
            </span>
          </span>
        </div>
      </section>

      {/* CARDS */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" }}>
        <div className="card-grid">
          {plans.map((plan, i) => (
            <div key={plan.name} className="fade-up" style={{ animationDelay: `${0.5 + i * 0.12}s` }}>
              <FlipCard plan={plan} billing={billing} index={i} />
            </div>
          ))}
        </div>

        {/* Enterprise strip */}
        <div className="fade-up" style={{
          animationDelay: "0.9s",
          marginTop: 20,
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.02)",
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Custom Pricing</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Tailored for organisations that need advanced scale and enterprise security.</div>
          </div>
          <a href="/enrollment" style={{
            padding: "12px 28px", borderRadius: 10, fontSize: 13, fontWeight: 700,
            border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
            color: "#fff", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            Talk to Sales →
          </a>
        </div>
      </section>

      {/* FEATURE TABLE */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 className="fade-up" style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 8 }}>
            Compare plan features
          </h2>
          <p className="fade-up" style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 48 }}>
            Everything you need, nothing you dont.
          </p>

          <div style={{ borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <th style={{ padding: "18px 28px", textAlign: "left", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>Feature</th>
                  {plans.map(p => (
                    <th key={p.name} style={{ padding: "18px 16px", textAlign: "center", fontWeight: 700, color: p.badge ? PURPLE_HOVER : "#fff" }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["AI outreach engine", true, true, true],
                  ["Monthly leads", "50", "500", "Unlimited"],
                  ["Automation workflows", "1", "5", "Unlimited"],
                  ["Advanced analytics", false, true, true],
                  ["CRM integrations", false, true, true],
                  ["Priority support", false, false, true],
                  ["White-label reports", false, false, true],
                  ["Dedicated account manager", false, false, true],
                ].map(([label, s, g, p], i) => (
                  <tr key={String(label)} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: i % 2 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                    <td style={{ padding: "14px 28px", color: "rgba(255,255,255,0.65)" }}>{label}</td>
                    {[s, g, p].map((val, j) => (
                      <td key={j} style={{ padding: "14px 16px", textAlign: "center" }}>
                        {typeof val === "boolean" ? (
                          val
                            ? <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "rgba(129,74,200,0.2)", color: PURPLE, alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>✓</span>
                            : <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", fontSize: 11 }}>✕</span>
                        ) : (
                          <span style={{ color: j === 1 ? PURPLE_HOVER : "rgba(255,255,255,0.7)", fontWeight: j === 1 ? 600 : 400 }}>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 8 }}>
            Your questions, answered
          </h2>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 40 }}>
            Cant find it? <a href="/enrollment" style={{ color: PURPLE }}>Talk to our team →</a>
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {faqs.map((faq, i) => <FaqItem key={i} faq={faq} index={i} />)}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: "0 24px 80px" }}>
        <div style={{
          maxWidth: 800, margin: "0 auto",
          borderRadius: 28,
          border: "1px solid rgba(129,74,200,0.35)",
          background: "linear-gradient(135deg, rgba(129,74,200,0.2) 0%, rgba(0,0,0,0.8) 60%)",
          padding: "64px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "visible",
          boxShadow: "0 0 100px rgba(129,74,200,0.2)",
          zIndex:0,
        }}>
          <div style={{ position: "absolute", inset: 0, background: "conic-gradient(from 180deg, rgba(129,74,200,0.1), transparent 60%)", pointerEvents: "none" , }} />
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", position: "relative", zIndex: 1 }}>
            Ready to scale your outreach?
          </h2>
          <p style={{ marginTop: 16, color: "rgba(255,255,255,0.5)", fontSize: 15, position: "relative", zIndex: 1, lineHeight: 1.7 }}>
            Join 50+ businesses already using XTRACT to automate enrollment and outreach.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            <a href="/enrollment" style={{ background: PURPLE, color: "#fff", borderRadius: 10, padding: "14px 32px", fontSize: 14, fontWeight: 700 }}>
              Get started free
            </a>
            <a href="https://cal.com" target="_blank" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "#fff", borderRadius: 10, padding: "14px 32px", fontSize: 14, fontWeight: 700 }}>
              Book a demo
            </a>
          </div>
        </div>
      </section>

      {/* CHAT BUTTON */}
      
    </main>
  );
}
