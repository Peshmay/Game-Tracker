import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AppShell from "../components/layout/AppShell";

type TimerState = {
  user: any;
  game: any;
  avatar: string;
};

export default function TimerPage() {
  const { state } = useLocation() as { state?: TimerState };
  const navigate = useNavigate();
  const [simMinutes, setSimMinutes] = useState(0);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    if (!state?.user || !state?.game) navigate("/play");
  }, [state, navigate]);

  useEffect(() => {
    if (!state?.user || !state?.game) return;

    let alive = true;
    (async () => {
      const { data } = await axios.post("http://localhost:4000/api/sessions/start", {
        userId: state.user.id,
        gameId: state.game.id
      });
      if (!alive) return;
      setSessionId(data.id);
      tickRef.current = window.setInterval(
        () => setSimMinutes((m) => m + 1),
        1000
      );
    })();

    return () => {
      alive = false;
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [state]);

  function pad(n: number) {
    return String(n).padStart(2, "0");
  }
  const h = Math.floor(simMinutes / 60);
  const m = simMinutes % 60;
  const timeLabel = `${pad(h)}:${pad(m)}:00`;

  async function stop() {
    if (tickRef.current) window.clearInterval(tickRef.current);
    if (sessionId != null) {
      try {
        await axios.patch("http://localhost:4000/api/sessions/stop", {
          id: sessionId
        });
      } catch (err) {
        console.error(err);
      }
    }
    navigate("/play");
  }

  return (
    <AppShell>
    <div className="p-6">
      <div className="flex justify-between text-sm text-gray-400 mb-8">
        <div>
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
          })}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-6xl mb-2">👾</div>
        <div className="mb-6 text-lg font-semibold">{state?.game?.name}</div>

        <div className="flex items-center gap-6 bg-gray-100 text-slate-900 rounded-2xl px-6 py-4 mb-8 w-[520px] justify-center">
          <span className="text-sm font-semibold bg-gray-300 text-gray-800 px-3 py-1 rounded-full">
            TIME PLAYING:
          </span>
          <span className="font-mono text-5xl">{timeLabel}</span>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={stop}
            className="text-2xl px-10 py-3 border-2 border-white rounded hover:bg-white/10"
          >
            STOP
          </button>
          <button
            onClick={() => navigate("/play")}
            className="text-2xl px-10 py-3 border-2 border-white rounded hover:bg-white/10"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="fixed right-8 bottom-8 flex items-center gap-3">
        <img
          src={state?.avatar}
          className="w-20 h-20 rounded-full object-cover border border-slate-400"
        />
        <div className="text-sm font-semibold">
          {state?.user?.firstName} {state?.user?.lastName}
        </div>
      </div>
    </div>
    </AppShell>
  );
}
