import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AppShell from "../components/layout/AppShell";
import { ArrowLeft, TrendingUp, Users, Clock, Trophy, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

// Dark-mode tooltip that looks good on your UI
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="p-3 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-xl shadow-xl text-xs text-slate-100">
      {label !== undefined && label !== null && (
        <div className="font-semibold mb-1 text-slate-100">{String(label)}</div>
      )}
      <div className="space-y-1">
        {payload.map((p: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between gap-6">
            <span className="text-slate-300">{p.name}</span>
            <span className="font-semibold" style={{ color: p.color }}>
              {p.value} min
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartCard({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "bg-slate-900/50 border border-slate-800 rounded-2xl shadow-2xl " +
        "backdrop-blur-sm p-5 hover:border-cyan-500/40 transition " +
        className
      }
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
          {icon}
        </div>
        <h3 className="font-semibold text-slate-100">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function StatisticsPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

 useEffect(() => {
  (async () => {
    try {
      const res = await api.get("/api/statistics");
      setStats(res.data);
    } catch (e) {
      console.error("Failed to fetch statistics:", e);
      setStats({ games: [], users: [], week: [], leaderboard: [] });
    }
  })();
}, []);

  if (!stats) {
    return (
      <AppShell>
        <div className="p-10 text-cyan-300">Loading statistics…</div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-6 py-8 space-y-8">
          {/* Top row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition w-fit"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">
                Game Statistics
              </h1>
            </div>
          </div>

          {/* Main grid (like your screenshot) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar */}
            <ChartCard
              title="Total Minutes per Game"
              icon={<Gamepad2 size={18} className="text-cyan-400" />}
            >
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.games}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                      tick={{ fontSize: 10 }}
                      interval={0}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
                    <Bar
                      dataKey="minutes"
                      name="minutes"
                      fill="#22d3ee"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            {/* Scatter */}
            <ChartCard
              title="Total Minutes per User (Dots)"
              icon={<Users size={18} className="text-fuchsia-400" />}
              className="lg:col-span-1"
            >
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      type="category"
                      dataKey="user"
                      name="User"
                      stroke="#94a3b8"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      type="number"
                      dataKey="minutes"
                      name="Minutes"
                      stroke="#94a3b8"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter data={stats.users} name="minutes" fill="#e879f9" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            {/* Line */}
            <ChartCard
              title="Weekly Trend (Last 7 Days)"
              icon={<Clock size={18} className="text-emerald-400" />}
            >
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats.week}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis
                      dataKey="day"
                      stroke="#94a3b8"
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "#cbd5e1", fontSize: 12 }} />
                    <Line
                      type="monotone"
                      dataKey="minutes"
                      name="minutes"
                      stroke="#34d399"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Bottom section (Leaderboard like your screenshot) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ChartCard
                title="Leaderboard (This Week)"
                icon={<Trophy size={18} className="text-yellow-400" />}
              >
                <ol className="space-y-2">
                  {stats.leaderboard?.length ? (
                    stats.leaderboard.map((x: any, idx: number) => (
                      <li
                        key={x.user}
                        className={
                          "flex items-center justify-between rounded-xl px-3 py-2 border " +
                          (idx === 0
                            ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-200"
                            : "border-slate-800 bg-slate-950/40 text-slate-200")
                        }
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={
                              "w-7 h-7 grid place-items-center rounded-lg text-sm font-extrabold " +
                              (idx === 0
                                ? "bg-yellow-400/15 text-yellow-200"
                                : "bg-slate-800 text-slate-200")
                            }
                          >
                            {idx + 1}
                          </span>
                          <span className="font-semibold">{x.user}</span>
                        </div>
                        <span className="text-sm font-semibold">{x.minutes} min</span>
                      </li>
                    ))
                  ) : (
                    <div className="text-sm text-slate-400">No data yet.</div>
                  )}
                </ol>
              </ChartCard>
            </div>

            {/* Empty space / future widget area to match dashboard feel */}
            <div className="lg:col-span-2">
              <div className="h-full bg-slate-900/30 border border-slate-800 rounded-2xl p-6 text-slate-400 flex items-center justify-center">
                <span className="text-sm">
                  More insights coming soon…
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
