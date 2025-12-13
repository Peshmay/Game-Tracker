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
  Legend
} from "recharts";
import AppShell from "../components/layout/AppShell";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StatisticsPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://localhost:4000/api/statistics");
      setStats(res.data);
    })();
  }, []);

  if (!stats) return <div className="p-6">Loading…</div>;

  return (
    <AppShell>
    <div className="p-6 space-y-8">
      {/* Back to Dashboard */}
    <button
      onClick={() => navigate("/dashboard")}
      className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition mb-6"
    >
      <ArrowLeft size={18} />
      <span className="text-sm">Back to Dashboard</span>
    </button>
      <h2 className="text-xl font-semibold">Game Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-4 rounded-xl">
          <h3 className="font-semibold mb-2 text-sm">
            Total Minutes per Game
          </h3>
          <BarChart width={320} height={240} data={stats.games}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutes" />
          </BarChart>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h3 className="font-semibold mb-2 text-sm">
            Total Minutes per User (Dots)
          </h3>
          <ScatterChart width={320} height={240}>
            <CartesianGrid />
            <XAxis type="category" dataKey="user" />
            <YAxis dataKey="minutes" />
            <Tooltip />
            <Scatter data={stats.users} />
          </ScatterChart>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl">
          <h3 className="font-semibold mb-2 text-sm">
            Weekly Trend (Last 7 Days)
          </h3>
          <LineChart width={320} height={240} data={stats.week}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="minutes" />
          </LineChart>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Leaderboard (This Week)</h3>
        <ul className="list-disc pl-5 text-sm">
          {stats.leaderboard.map((x: any) => (
            <li key={x.user}>
              {x.user} — {x.minutes} min
            </li>
          ))}
        </ul>
      </div>
    </div>
    </AppShell>
  );
}
