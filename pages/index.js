import Head from "next/head";
import { useRouter } from "next/router";

const THEME = {
  bg: "#0A0F1A",
  panel: "#111A2B",
  panelAlt: "#0D1521",
  border: "#1E2B40",
  borderSoft: "#162236",
  text: "#E7EDF5",
  textMuted: "#7C8BA3",
  textDim: "#4E5C74",
  accent: "#2FE0C8",
  accentDim: "#1B7F72",
  amber: "#F5A623",
};

const MODULES = [
  {
    title: "Inventory Stockout Risk",
    desc: "Random forest classifier predicting Critical/High/Medium/Low stockout risk from stock levels, usage rate, and lead time — plus a reorder calculator and full explainability.",
    stat: "69% test accuracy · 500 records",
  },
  {
    title: "Bed Capacity & Refusal Risk",
    desc: "Predicts patient-refusal risk per service (ICU, Emergency, Surgery, General Medicine) from demand, available beds, staff morale, and disruption events.",
    stat: "69% test accuracy · 208 weekly records",
  },
  {
    title: "Medicine Clusters & Expiry Risk",
    desc: "K-Means clustering segments medicines by real usage behavior, and a separate model predicts expiry-waste risk before stock goes unused.",
    stat: "90% test accuracy · 8 clusters · 105 medicines",
  },
  {
    title: "Cost & Impact",
    desc: "A live command center pulling real-time state from every module, plus an adjustable ROI calculator grounded in published hospital-pharmacy benchmarks.",
    stat: "Live, adjustable assumptions",
  },
];

const TECH = ["Random Forest", "K-Means Clustering", "PCA", "Client-side ML Inference", "React", "Next.js", "scikit-learn"];

export default function Landing() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>VitalStock AI — Hospital Operations Intelligence</title>
        <meta
          name="description"
          content="ML-driven hospital operations dashboard: inventory stockout risk, bed capacity, medicine expiry & clustering, cost impact."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ background: THEME.bg, minHeight: "100vh", fontFamily: "Inter, -apple-system, Segoe UI, sans-serif", color: THEME.text }}>
        <style>{`
          @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
          .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
        `}</style>

        {/* Nav */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <div className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, borderRadius: 7, background: `${THEME.accent}22`, border: `1px solid ${THEME.accent}55`, display: "flex", alignItems: "center", justifyContent: "center", color: THEME.accent, fontWeight: 700, fontSize: 13 }}>
              V
            </div>
            <span style={{ fontWeight: 600, fontSize: 15 }}>VitalStock AI</span>
          </div>
          <button
            onClick={() => router.push("/login")}
            style={{ background: THEME.accentDim, color: THEME.accent, border: `1px solid ${THEME.accent}`, borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Admin Login
          </button>
        </div>

        {/* Hero */}
        <div className="px-6 md:px-10 pt-16 pb-14 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${THEME.panel} 0%, ${THEME.bg} 100%)` }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, animation: "scanline 8s linear infinite", background: `linear-gradient(180deg, transparent, ${THEME.accent}, transparent)`, height: "40%" }} />
          <div className="max-w-3xl relative">
            <div className="flex items-center gap-2 mb-4" style={{ color: THEME.accent }}>
              <span className="mono" style={{ fontSize: 11.5, letterSpacing: "0.14em" }}>HOSPITAL OPERATIONS INTELLIGENCE</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Predict stockouts, bed shortages &amp; medicine waste — before they happen.
            </h1>
            <p style={{ color: THEME.textMuted, fontSize: 16, marginTop: 18, maxWidth: 560, lineHeight: 1.6 }}>
              Three machine learning models and a live cost-impact calculator, all running in your
              browser — no backend, no data leaving the page. Built as a digital-transformation
              case study for hospital supply chain, bed capacity, and pharmacy management.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => router.push("/login")}
                style={{ background: THEME.accent, color: THEME.bg, border: "none", borderRadius: 9, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                Enter Dashboard →
              </button>
            </div>
          </div>
        </div>

        {/* Tech strip */}
        <div className="px-6 md:px-10 py-5 flex flex-wrap gap-2" style={{ borderBottom: `1px solid ${THEME.border}`, borderTop: `1px solid ${THEME.border}` }}>
          {TECH.map((t) => (
            <span key={t} className="mono" style={{ fontSize: 11, color: THEME.textDim, border: `1px solid ${THEME.borderSoft}`, borderRadius: 999, padding: "4px 10px" }}>
              {t}
            </span>
          ))}
        </div>

        {/* Modules */}
        <div className="px-6 md:px-10 py-16">
          <div style={{ color: THEME.textMuted, fontSize: 12.5, letterSpacing: "0.08em", marginBottom: 8 }}>WHAT'S INSIDE</div>
          <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 36 }}>Four modules, one ecosystem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MODULES.map((m) => (
              <div key={m.title} className="rounded-lg p-6" style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 600, marginBottom: 8 }}>{m.title}</h3>
                <p style={{ color: THEME.textMuted, fontSize: 13.5, lineHeight: 1.6, marginBottom: 14 }}>{m.desc}</p>
                <span className="mono" style={{ fontSize: 11, color: THEME.accent }}>{m.stat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA footer */}
        <div className="px-6 md:px-10 py-16 text-center" style={{ borderTop: `1px solid ${THEME.border}` }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>Ready to explore the dashboard?</h2>
          <p style={{ color: THEME.textMuted, fontSize: 13.5, marginBottom: 22 }}>Sign in to access live predictions, bulk file upload, and the cost-impact calculator.</p>
          <button
            onClick={() => router.push("/login")}
            style={{ background: THEME.accent, color: THEME.bg, border: "none", borderRadius: 9, padding: "12px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Admin Login →
          </button>
          <div style={{ color: THEME.textDim, fontSize: 11.5, marginTop: 40 }}>
            Built as an academic digital-transformation project. Synthesized datasets used where real hospital data was unavailable.
          </div>
        </div>
      </div>
    </>
  );
}
