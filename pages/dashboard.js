import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// The dashboard uses recharts + browser-only APIs (canvas measurements, Blob downloads,
// file uploads), so it's loaded client-side only — avoids Next.js server-side rendering errors.
const StockoutRiskDashboard = dynamic(
  () => import("../components/StockoutRiskDashboard"),
  { ssr: false }
);

export default function Dashboard() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const ok = typeof window !== "undefined" && sessionStorage.getItem("vs_authed") === "true";
    if (!ok) {
      router.replace("/login");
    } else {
      setAuthed(true);
    }
    setChecked(true);
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem("vs_authed");
    router.push("/login");
  }

  // Off by default (no API key = no cost). To turn the chatbot on later,
  // set NEXT_PUBLIC_CHAT_ENABLED=true in Vercel's Environment Variables
  // alongside a real ANTHROPIC_API_KEY, then redeploy — no code changes needed.
  const chatEnabled = process.env.NEXT_PUBLIC_CHAT_ENABLED === "true";

  if (!checked || !authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0A0F1A", display: "flex", alignItems: "center", justifyContent: "center", color: "#7C8BA3", fontFamily: "Inter, sans-serif", fontSize: 13 }}>
        Checking session&hellip;
      </div>
    );
  }

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
      <StockoutRiskDashboard chatEnabled={chatEnabled} onLogout={handleLogout} />
    </>
  );
}
