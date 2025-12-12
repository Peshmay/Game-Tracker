import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Play, BarChart3 } from "lucide-react";

export default function UserDashboardPage() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-10">Welcome 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">

          {/* Play */}
          <button
            onClick={() => navigate("/play")}
            className="p-8 rounded-3xl bg-slate-800 hover:bg-slate-700 transition shadow-xl text-center"
          >
            <Play className="w-10 h-10 mx-auto mb-4 text-cyan-400" />
            <h2 className="text-xl font-bold">Play Games</h2>
            <p className="text-slate-400 text-sm mt-2">
              Choose a game and start tracking your play time
            </p>
          </button>

          {/* Stats */}
          <button
            onClick={() => navigate("/statistics")}
            className="p-8 rounded-3xl bg-slate-800 hover:bg-slate-700 transition shadow-xl text-center"
          >
            <BarChart3 className="w-10 h-10 mx-auto mb-4 text-purple-400" />
            <h2 className="text-xl font-bold">Statistics</h2>
            <p className="text-slate-400 text-sm mt-2">
              View your play history and trends
            </p>
          </button>

        </div>
      </div>
    </AppShell>
  );
}
