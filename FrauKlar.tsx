import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

const AGENT_ID = "agent_0801kqtw8cy2eh88h65zedwyfw5q";

type ConvStatus = "idle" | "connecting" | "listening" | "speaking" | "ended";

export default function FrauKlar() {
  const [status, setStatus] = useState<ConvStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<{ role: "agent" | "user"; text: string }[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [sdkReady, setSdkReady] = useState(false);

  const conversationRef = useRef<any>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Load ElevenLabs SDK from CDN once, poll until available on window
  useEffect(() => {
    if ((window as any).__EL_SDK) { setSdkReady(true); return; }
    const script = document.createElement("script");
    script.type = "module";
    script.textContent = `
      import { Conversation } from "https://cdn.jsdelivr.net/npm/@11labs/client@latest/+esm";
      window.__EL_SDK = { Conversation };
    `;
    document.head.appendChild(script);
    const poll = setInterval(() => {
      if ((window as any).__EL_SDK) { setSdkReady(true); clearInterval(poll); }
    }, 100);
    return () => clearInterval(poll);
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  useEffect(() => {
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, []);

  function startCountdown() {
    setSecondsLeft(600);
    countdownRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(countdownRef.current!); handleEnd(); return 0; }
        return s - 1;
      });
    }, 1000);
  }

  function stopCountdown() {
    if (countdownRef.current) clearInterval(countdownRef.current);
  }

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60);
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  async function handleStart() {
    const sdk = (window as any).__EL_SDK;
    if (!sdk) return;
    setStatus("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      conversationRef.current = await sdk.Conversation.startSession({
        agentId: AGENT_ID,
        onConnect: () => { setStatus("listening"); startCountdown(); },
        onMessage: ({ source, message }: { source: string; message: string }) => {
          setTranscript((prev) => [...prev, { role: source === "ai" ? "agent" : "user", text: message }]);
        },
        onModeChange: ({ mode }: { mode: string }) => {
          setStatus(mode === "speaking" ? "speaking" : "listening");
        },
        onDisconnect: () => { stopCountdown(); setStatus("ended"); },
        onError: (msg: string) => { console.error(msg); setStatus("idle"); },
      });
    } catch (err) {
      console.error("Failed to start:", err);
      setStatus("idle");
    }
  }

  async function handleEnd() {
    stopCountdown();
    if (conversationRef.current) await conversationRef.current.endSession();
    setStatus("ended");
  }

  function handleMute() {
    if (!conversationRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    conversationRef.current.setMicMuted(next);
  }

  function handleReset() {
    conversationRef.current = null;
    setStatus("idle");
    setIsMuted(false);
    setTranscript([]);
    setSecondsLeft(600);
  }

  const isActive = status === "listening" || status === "speaking";
  const pct = (secondsLeft / 600) * 100;
  const isUrgent = secondsLeft <= 60;
  const circum = 2 * Math.PI * 52;

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f6", fontFamily: "'EB Garamond', serif", position: "relative", overflow: "hidden" }}>

      {/* Blob */}
      <div style={{ position: "absolute", top: "-60px", left: "-40px", pointerEvents: "none" }}>
        <svg width="320" height="280" viewBox="0 0 280 240" fill="none">
          <path d="M120 40C150 25 180 30 200 50C220 70 225 100 215 130C205 160 185 180 155 185C125 190 95 175 75 150C55 125 50 90 65 65C80 40 90 55 120 40Z" fill="#03AAE8" opacity="0.10" />
        </svg>
      </div>

      {/* Back */}
      <div style={{ position: "absolute", top: "2rem", left: "2rem" }}>
        <Link to="/" style={{ color: "#888", textDecoration: "none", fontSize: "14px" }}>← azulito</Link>
      </div>

      {/* Big title */}
      <div style={{ position: "absolute", top: "12%", left: 0, width: "100%", pointerEvents: "none", userSelect: "none", textAlign: "center", opacity: isActive ? 0.12 : 0.18, transition: "opacity 0.6s ease" }}>
        <h1 style={{ fontFamily: "'Pirata One', cursive", fontSize: "clamp(3rem, 13vw, 11rem)", fontWeight: 400, lineHeight: 1, letterSpacing: "0.05em", color: "#03AAE8", whiteSpace: "nowrap", margin: 0 }}>
          FRAU KLAR
        </h1>
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", paddingTop: "clamp(180px, 28vw, 300px)", paddingBottom: "4rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>

        {status === "idle" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", animation: "rise 0.6s ease forwards", opacity: 0 }}>
            <p style={{ fontSize: "15px", color: "#888", maxWidth: 260, textAlign: "center", lineHeight: 1.7 }}>
              A 10-minute voice conversation.<br />Press start when you're ready.
            </p>
            <button onClick={handleStart} disabled={!sdkReady} style={{ background: sdkReady ? "#03AAE8" : "#ccc", color: "#faf9f6", border: "none", borderRadius: "100px", padding: "0.85rem 2.4rem", fontFamily: "'EB Garamond', serif", fontSize: "16px", letterSpacing: "0.04em", cursor: sdkReady ? "pointer" : "not-allowed" }}>
              {sdkReady ? "Start conversation" : "Loading…"}
            </button>
          </div>
        )}

        {status === "connecting" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", animation: "rise 0.4s ease forwards", opacity: 0 }}>
            <MicOrb active={false} speaking={false} />
            <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#03AAE8" }}>Connecting…</p>
          </div>
        )}

        {isActive && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", width: "100%", maxWidth: 360, animation: "rise 0.4s ease forwards", opacity: 0 }}>

            <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="120" height="120" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e8e4df" strokeWidth="4" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={isUrgent ? "#E95BEB" : "#03AAE8"} strokeWidth="4" strokeDasharray={circum} strokeDashoffset={circum * (1 - pct / 100)} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }} />
              </svg>
              <MicOrb active={true} speaking={status === "speaking"} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: status === "speaking" ? "#1a1a1a" : "#03AAE8", transition: "color 0.3s ease", margin: 0 }}>
                {status === "speaking" ? "Frau Klar is speaking…" : isMuted ? "Muted" : "Listening"}
              </p>
              <p style={{ fontFamily: "'Pirata One', cursive", fontSize: "30px", color: isUrgent ? "#E95BEB" : "#4a4a4a", letterSpacing: "0.05em", transition: "color 0.3s ease", margin: 0 }}>
                {formatTime(secondsLeft)}
              </p>
            </div>

            {transcript.length > 0 && (
              <div style={{ width: "100%", maxHeight: 180, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {transcript.map((t, i) => (
                  <div key={i} style={{ paddingLeft: "0.6rem", borderLeft: `2px solid ${t.role === "agent" ? "#03AAE8" : "#ccc"}` }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: t.role === "agent" ? "#03AAE8" : "#aaa", marginBottom: 2 }}>
                      {t.role === "agent" ? "Frau Klar" : "You"}
                    </div>
                    <div style={{ fontSize: "13px", color: t.role === "agent" ? "#1a1a1a" : "#666", lineHeight: 1.5 }}>{t.text}</div>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            )}

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={handleMute} style={ghostBtn(isMuted ? "#E95BEB" : "#888")}>{isMuted ? "Unmute" : "Mute"}</button>
              <button onClick={handleEnd} style={ghostBtn("#888")}>End</button>
            </div>
          </div>
        )}

        {status === "ended" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", width: "100%", maxWidth: 360, animation: "rise 0.5s ease forwards", opacity: 0 }}>
            <p style={{ fontSize: "15px", color: "#888", textAlign: "center", lineHeight: 1.7 }}>Conversation ended.</p>
            {transcript.length > 0 && (
              <div style={{ width: "100%", maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {transcript.map((t, i) => (
                  <div key={i} style={{ paddingLeft: "0.6rem", borderLeft: `2px solid ${t.role === "agent" ? "#03AAE8" : "#ccc"}` }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: t.role === "agent" ? "#03AAE8" : "#aaa", marginBottom: 2 }}>
                      {t.role === "agent" ? "Frau Klar" : "You"}
                    </div>
                    <div style={{ fontSize: "13px", color: t.role === "agent" ? "#1a1a1a" : "#666", lineHeight: 1.5 }}>{t.text}</div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={handleReset} style={ghostBtn("#03AAE8")}>Start again</button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ripple { 0% { transform: scale(1); opacity: 0.25; } 100% { transform: scale(2.4); opacity: 0; } }
      `}</style>
    </div>
  );
}

function MicOrb({ active, speaking }: { active: boolean; speaking: boolean }) {
  const color = speaking ? "#1a1a1a" : "#03AAE8";
  return (
    <div style={{ position: "relative", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {active && [0, 0.7, 1.4].map((delay) => (
        <div key={delay} style={{ position: "absolute", width: 56, height: 56, borderRadius: "50%", background: color, opacity: 0, animation: `ripple 2.2s ease-out ${delay}s infinite`, transition: "background 0.3s ease" }} />
      ))}
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: active ? color : "#d0cdc8", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, transition: "background 0.3s ease" }}>
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" strokeLinecap="round" />
          <line x1="8" y1="23" x2="16" y2="23" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function ghostBtn(color: string): React.CSSProperties {
  return { background: "transparent", color, border: `1px solid ${color}66`, borderRadius: "100px", padding: "0.6rem 1.5rem", fontFamily: "'EB Garamond', serif", fontSize: "14px", letterSpacing: "0.04em", cursor: "pointer" };
}
