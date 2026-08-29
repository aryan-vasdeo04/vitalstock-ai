import Head from "next/head";
import dynamic from "next/dynamic";

// The dashboard uses recharts + browser-only APIs (canvas measurements, Blob downloads),
// so it's loaded client-side only — avoids Next.js server-side rendering errors.
const StockoutRiskDashboard = dynamic(
  () => import("../components/StockoutRiskDashboard"),
  { ssr: false }
);

export default function Home() {
  // Off by default (no API key = no cost). To turn the chatbot on later,
  // set NEXT_PUBLIC_CHAT_ENABLED=true in Vercel's Environment Variables
  // alongside a real ANTHROPIC_API_KEY, then redeploy — no code changes needed.
  const chatEnabled = process.env.NEXT_PUBLIC_CHAT_ENABLED === "true";

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
      <StockoutRiskDashboard chatEnabled={chatEnabled} />
    </>
  );
}
