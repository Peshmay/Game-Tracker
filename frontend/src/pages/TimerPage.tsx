import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AppShell from "../components/layout/AppShell";
import { Gamepad2, UserCircle, CheckCircle } from "lucide-react";

type TimerState = {
  user: any;
  game: any;
  avatar: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function TimerPage() {
  const { state } = useLocation() as { state?: TimerState };
  const navigate = useNavigate();

  const [simMinutes, setSimMinutes] = useState(0);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [isStopping, setIsStopping] = useState(false);
  const tickRef = useRef<number | null>(null);

  // Guard: if state is missing, go back
  useEffect(() => {
    if (!state?.user || !state?.game) {
      navigate("/play", { replace: true });
    }
  }, [state, navigate]);

  // Start session + start timer
  useEffect(() => {
    if (!state?.user || !state?.game) return;

    let alive = true;

    (async () => {
      try {
        const { data } = await axios.post("http://localhost:4000/api/sessions/start", {
          userId: state.user.id,
          gameId: state.game.id,
        });
        if (!alive) return;

        setSessionId(data.id);

        // 1 second = 1 minute (demo)
        tickRef.current = window.setInterval(() => setSimMinutes((m) => m + 1), 1000);
      } catch (err) {
        console.error("Failed to start session:", err);

        // Fallback: still show timer even if backend fails
        tickRef.current = window.setInterval(() => setSimMinutes((m) => m + 1), 1000);
        setSessionId(-1);
      }
    })();

    return () => {
      alive = false;
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [state]);

  const timeLabel = useMemo(() => {
    const h = Math.floor(simMinutes / 60);
    const m = simMinutes % 60;
    return `${pad(h)}:${pad(m)}:00`;
  }, [simMinutes]);

  const formattedDateTime = useMemo(() => {
    const d = new Date();
    const date = d.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${date} | ${time}`;
  }, []);

  async function stop() {
    if (isStopping) return;

    if (tickRef.current) window.clearInterval(tickRef.current);
    setIsStopping(true);

    if (sessionId != null && sessionId !== -1) {
      try {
        await axios.patch("http://localhost:4000/api/sessions/stop", { id: sessionId });
      } catch (err) {
        console.error("Failed to stop session:", err);
      }
    }

    // small UX pause then go back
    setTimeout(() => navigate("/play", { replace: true }), 700);
  }

  function exit() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    navigate("/play", { replace: true });
  }

  if (!state?.user || !state?.game) {
    return (
      <AppShell>
        <div className="p-10 text-red-300">Missing session details. Redirecting…</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="relative w-full min-h-[calc(100vh-64px)] overflow-hidden bg-[#151c31]">
        {/* Subtle geometric background */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(34,211,238,0.10) 0%, transparent 35%), radial-gradient(circle at 80% 30%, rgba(168,85,247,0.10) 0%, transparent 35%), radial-gradient(circle at 40% 85%, rgba(34,197,94,0.08) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.00) 40%), linear-gradient(225deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 45%)",
          }}
        />

        {/* Top-left date/time */}
        <div className="absolute top-5 left-6 text-xs md:text-sm text-slate-300 font-mono">
          {formattedDateTime}
        </div>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16">
          {/* Icon */}
          <div className="mb-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-400/30 grid place-items-center shadow-lg">
              <Gamepad2 className="w-8 h-8 text-purple-300" />
            </div>
          </div>

          {/* Game name */}
          <div className="text-slate-100 font-semibold text-lg mb-8">
            {state.game.name}
          </div>

          {/* Timer pill */}
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl px-6 py-5 flex items-center justify-center gap-6">
            <span className="text-xs md:text-sm font-semibold bg-slate-200 text-slate-700 px-3 py-1 rounded-full tracking-wider">
              TIME PLAYING:
            </span>
            <span className="font-mono text-4xl md:text-5xl font-extrabold text-slate-900">
              {timeLabel}
            </span>
          </div>

          {/* Buttons */}
          <div className="mt-10 w-full max-w-xs flex flex-col gap-4">
            <button
              onClick={stop}
              disabled={isStopping}
              className={
                "w-full py-3 rounded-xl text-lg font-extrabold shadow-xl transition " +
                (isStopping
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-rose-500 text-white hover:bg-rose-600")
              }
            >
              {isStopping ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  STOPPED
                </span>
              ) : (
                "STOP"
              )}
            </button>

            <button
              onClick={exit}
              disabled={isStopping}
              className="w-full py-3 rounded-xl text-lg font-bold border-2 border-slate-400 text-slate-200 hover:bg-white/5 transition disabled:opacity-50"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Bottom-right user bubble */}
        <div className="fixed right-6 bottom-6 z-20 flex items-center gap-3 bg-slate-900/40 backdrop-blur border border-slate-700/60 shadow-lg rounded-full px-3 py-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400/80">
            {state.avatar ? (
              <img src={state.avatar} alt="User avatar" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="w-full h-full text-slate-300" />
            )}
          </div>
          <div className="text-sm font-semibold text-slate-100 pr-2">
            {state.user?.firstName} {state.user?.lastName}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
