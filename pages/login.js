import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const VALID_EMAIL = "abc@gmail.com";
const VALID_PASSWORD = "Group1";

const THEME = {
  bg: "#0A0F1A",
  panel: "#111A2B",
  panelAlt: "#0D1521",
  border: "#1E2B40",
  text: "#E7EDF5",
  textMuted: "#7C8BA3",
  textDim: "#4E5C74",
  accent: "#2FE0C8",
  error: "#FF4D5E",
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const emailOk = email.trim().toLowerCase() === VALID_EMAIL;
    const passOk = password === VALID_PASSWORD;

    setTimeout(() => {
      if (!emailOk) {
        setError("This email is not authorised for admin access.");
        setSubmitting(false);
        return;
      }
      if (!passOk) {
        setError("Incorrect password.");
        setSubmitting(false);
        return;
      }
      sessionStorage.setItem("vs_authed", "true");
      router.push("/dashboard");
    }, 300);
  }

  return (
    <>
      <Head>
        <title>Admin Login — VitalStock AI</title>
      </Head>
      <div
        style={{
          minHeight: "100vh",
          background: THEME.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, -apple-system, Segoe UI, sans-serif",
          padding: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            background: THEME.panel,
            border: `1px solid ${THEME.border}`,
            borderRadius: 14,
            padding: "36px 32px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `${THEME.accent}22`,
                border: `1px solid ${THEME.accent}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
                color: THEME.accent,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              V
            </div>
            <div style={{ color: THEME.text, fontSize: 18, fontWeight: 600 }}>Admin Login</div>
            <div style={{ color: THEME.textMuted, fontSize: 12.5, marginTop: 4 }}>
              VitalStock AI — Hospital Operations Intelligence
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ color: THEME.textMuted, fontSize: 12, display: "block", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{
                  width: "100%",
                  background: THEME.panelAlt,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: THEME.text,
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: THEME.textMuted, fontSize: 12, display: "block", marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: "100%",
                  background: THEME.panelAlt,
                  border: `1px solid ${THEME.border}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: THEME.text,
                  fontSize: 13.5,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  background: `${THEME.error}18`,
                  border: `1px solid ${THEME.error}55`,
                  color: THEME.error,
                  borderRadius: 8,
                  padding: "9px 12px",
                  fontSize: 12.5,
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                background: THEME.accent,
                color: THEME.bg,
                border: "none",
                borderRadius: 8,
                padding: "11px 0",
                fontSize: 14,
                fontWeight: 600,
                cursor: submitting ? "default" : "pointer",
                opacity: submitting ? 0.7 : 1,
              }}
            >
              {submitting ? "Checking..." : "Log in"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 18 }}>
            <a href="/" style={{ color: THEME.textDim, fontSize: 12 }}>
              &larr; Back to overview
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
