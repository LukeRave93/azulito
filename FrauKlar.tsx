import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

const AGENT_ID = "agent_0801kqtw8cy2eh88h65zedwyfw5q";

type ConvStatus = "idle" | "connecting" | "listening" | "speaking" | "ended";

export default function FrauKlar() {
  const [status, setStatus] = useState<ConvStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<{ role: "agent" | "user"; text: string }[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 min

  const conversationRef = useRef<any>(null);
  const startTimeRef = useRef<number | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  function startCountdown() {
    setSecondsLeft(600);
    countdownRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(countdownRef.current!);
          handleEnd();
          return 0;
        }
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
    setStatus("connecting");

    try {
      // Dynamically import the ElevenLabs SDK from CDN
      const { Conversation } = await (window as any).__elImport || import(
        /* @vite-ignore */ "https://cdn.jsdelivr.net/npm/@11labs/client@latest/+esm"
      );

      await navigator.mediaDevices.getUserMedia({ audio: true });

      startTimeRef.current = Date.now();

      conversationRef.current = await Conversation.startSession({
        agentId: AGENT_ID,

        onConnect: () => {
          setStatus("listening");
          startCountdown();
        },

        onMessage: ({ source, message }: { source: string; message: string }) => {
          const role = source === "ai" ? "agent" : "user";
          setTranscript((prev) => [...prev, { role, text: message }]);
        },

        onModeChange: ({ mode }: { mode: string }) => {
          if (mode === "speaking") setStatus("speaking");
          else setStatus("listening");
        },

        onDisconnect: () => {
          stopCountdown();
          setStatus("ended");
        },

        onError: (msg: string) => {
          console.error("ElevenLabs error:", msg);
          setStatus("idle");
        },
      });
    } catch (err) {
      console.error("Failed to start:", err);
      setStatus("idle");
    }
  }

  async function handleEnd() {
    stopCountdown();
    if (conversationRef.current) {
      await conversationRef.current.endSession();
    }
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

  return (
    <div
      className="size-full relative overflow-hidden"
      style={{
        background: "#faf9f6",
        fontFamily: "'EB Garamond', serif",
        minHeight: "100vh",
      }}
    >
      {/* Background blob — same as App.tsx */}
      <div className="absolute top-[15%] left-[42%] pointer-events-none">
        <svg width="280" height="240" viewBox="0 0 280 240" fill="none">
          <path
            d="M120 40C150 25 180 30 200 50C220 70 225 100 215 130C205 160 185 180 155 185C125 190 95 175 75 150C55 125 50 90 65 65C80 40 90 55 120 40Z"
            fill="#03AAE8"
            opacity="0.12"
          />
        </svg>
      </div>

      {/* Back link */}
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          style={{ color: "#888", textDecoration: "none", fontSize: "14px", fontFamily: "'EB Garamond', serif" }}
        >
          ← azulito
        </Link>
      </div>

      {/* Header — FRAU KLAR in the big Azulito style */}
      <div className="absolute top-[8%] left-0 w-full pointer-events-none select-none">
        <h1
          className="text-[#03AAE8] whitespace-nowrap text-center"
          style={{
            fontFamily: "'Pirata One', cursive",
            fontSize: "15vw",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "0.05em",
            opacity: isActive ? 0.15 : 0.18,
            transition: "opacity 0.6s ease",
          }}
        >
          FRAU KLAR
        </h1>
      </div>

      {/* Main content — centred */}
      <div className="flex flex-col items-center justify-center size-full" style={{ paddingTop: "28vw", paddingBottom: "6rem" }}>

        {/* ── IDLE ── */}
        {status === "idle" && (
          <div
            className="flex flex-col items-center gap-6"
            style={{ animation: "rise 0.6s ease forwards", opacity: 0 }}
          >
            <p style={{ fontSize: "14px", color: "#888", maxWidth: 280, textAlign: "center", lineHeight: 1.7 }}>
              A 10-minute voice conversation.<br />Press start when you're ready.
            </p>
            <button onClick={handleStart} style={btnStyle("#03AAE8")}>
              Start conversation
            </button>
          </div>
        )}

        {/* ── CONNECTING ── */}
        {status === "connecting" && (
          <div className="flex flex-col items-center gap-4" style={{ animation: "rise 0.4s ease forwards", opacity: 0 }}>
            <MicOrb active={false} speaking={false} />
            <p style={{ fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#03AAE8" }}>
              Connecting…
            </p>
          </div>
        )}

        {/* ── ACTIVE (listening / speaking) ── */}
        {isActive && (
          <div className="flex flex-col items-center gap-5 w-full max-w-sm px-6" style={{ animation: "rise 0.4s ease forwards", opacity: 0 }}>

            {/* Countdown ring */}
            <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
              <svg width="120" height="120" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e8e4df" strokeWidth="4" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={isUrgent ? "#E95BEB" : "#03AAE8"}
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s ease" }}
                />
              </svg>
              <MicOrb active={true} speaking={status === "speaking"} />
            </div>

            {/* Status + timer */}
            <div className="flex flex-col items-center gap-1">
              <p style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: status === "speaking" ? "#1a1a1a" : "#03AAE8",
                transition: "color 0.3s ease",
              }}>
                {status === "speaking" ? "Frau Klar is speaking…" : isMuted ? "Muted" : "Listening"}
              </p>
              <p style={{
                fontFamily: "'Pirata One', cursive",
                fontSize: "28px",
                color: isUrgent ? "#E95BEB" : "#4a4a4a",
                letterSpacing: "0.05em",
                transition: "color 0.3s ease",
              }}>
                {formatTime(secondsLeft)}
              </p>
            </div>

            {/* Transcript */}
            {transcript.length > 0 && (
              <div
                style={{
                  width: "100%",
                  maxHeight: 180,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {transcript.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      paddingLeft: "0.6rem",
                      borderLeft: `2px solid ${t.role === "agent" ? "#03AAE8" : "#ccc"}`,
                      animation: "rise 0.3s ease forwards",
                      opacity: 0,
                    }}
                  >
                    <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: t.role === "agent" ? "#03AAE8" : "#aaa", marginBottom: 2 }}>
                      {t.role === "agent" ? "Frau Klar" : "You"}
                    </div>
                    <div style={{ fontSize: "13px", color: t.role === "agent" ? "#1a1a1a" : "#666", lineHeight: 1.5 }}>
                      {t.text}
                    </div>
                  </div>
                ))}
                <div ref={transcriptEndRef} />
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3 mt-1">
              <button onClick={handleMute} style={btnStyleGhost(isMuted ? "#E95BEB" : "#888")}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <button onClick={handleEnd} style={btnStyleGhost("#888")}>
                End
              </button>
            </div>
          </div>
        )}

        {/* ── ENDED ── */}
        {status === "ended" && (
          <div className="flex flex-col items-center gap-5 w-full max-w-sm px-6" style={{ animation: "rise 0.5s ease forwards", opacity: 0 }}>
            <p style={{ fontSize: "14px", color: "#888", textAlign: "center", lineHeight: 1.7 }}>
              Conversation ended.
            </p>

            {transcript.length > 0 && (
              <div style={{ width: "100%", maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {transcript.map((t, i) => (
                  <div key={i} style={{ paddingLeft: "0.6rem", borderLeft: `2px solid ${t.role === "agent" ? "#03AAE8" : "#ccc"}` }}>
                    <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: t.role === "agent" ? "#03AAE8" : "#aaa", marginBottom: 2 }}>
                      {t.role === "agent" ? "Frau Klar" : "You"}
                    </div>
                    <div style={{ fontSize: "13px", color: t.role === "agent" ? "#1a1a1a" : "#666", lineHeight: 1.5 }}>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={handleReset} style={btnStyleGhost("#03AAE8")}>
              Start again
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ripple {
          0%   { transform: scale(1);   opacity: 0.25; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Mic orb with ripple rings ── */
function MicOrb({ active, speaking }: { active: boolean; speaking: boolean }) {
  return (
    <div style={{ position: "relative", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {active && (
        <>
          {[0, 0.7, 1.4].map((delay) => (
            <div
              key={delay}
              style={{
                position: "absolute",
                width: 56, height: 56,
                borderRadius: "50%",
                background: speaking ? "#1a1a1a" : "#03AAE8",
                opacity: 0,
                animation: `ripple 2.2s ease-out ${delay}s infinite`,
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </>
      )}
      <div style={{
        width: 56, height: 56,
        borderRadius: "50%",
        background: active ? (speaking ? "#1a1a1a" : "#03AAE8") : "#d0cdc8",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 2,
        transition: "background 0.3s ease",
        boxShadow: active ? `0 0 0 2px ${speaking ? "#1a1a1a" : "#03AAE8"}22` : "none",
      }}>
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

/* ── Button helpers ── */
function btnStyle(color: string) {
  return {
    background: color,
    color: "#faf9f6",
    border: "none",
    borderRadius: "100px",
    padding: "0.85rem 2.2rem",
    fontFamily: "'EB Garamond', serif",
    fontSize: "15px",
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "transform 0.15s ease, opacity 0.15s ease",
  } as React.CSSProperties;
}

function btnStyleGhost(color: string) {
  return {
    background: "transparent",
    color,
    border: `1px solid ${color}55`,
    borderRadius: "100px",
    padding: "0.6rem 1.5rem",
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "border-color 0.15s ease, color 0.15s ease",
  } as React.CSSProperties;
}
