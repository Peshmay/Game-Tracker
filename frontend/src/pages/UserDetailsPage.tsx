import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type Stat = { game: string; minutes: number; percent: number };

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`http://localhost:4000/api/users/${id}`);
      setUser(res.data);
      const sessions = res.data.sessions || [];
      const totals: Record<string, number> = {};
      let totalMinutes = 0;

      sessions.forEach((s: any) => {
        if (!s.minutes) return;
        totals[s.game.name] = (totals[s.game.name] || 0) + s.minutes;
        totalMinutes += s.minutes;
      });
      const arr = Object.entries(totals).map(([game, minutes]) => ({
        game,
        minutes,
        percent: totalMinutes ? Math.round((minutes / totalMinutes) * 100) : 0
      }));
      setStats(arr);
    })();
  }, [id]);

  if (!user) return <div className="p-6">Loading user data...</div>;

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={() => navigate("/users")}
        className="text-blue-400 underline"
      >
        ← Back to Users
      </button>

      <div className="flex items-center gap-4">
        <img
          src={`http://localhost:4000${user.profilePic || "/uploads/default.png"}`}
          alt={user.firstName}
          className="w-24 h-24 object-cover rounded-full shadow"
        />
        <div>
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-300">{user.email}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Game breakdown</h3>
        {stats.length === 0 ? (
          <p className="text-sm text-gray-400">No completed sessions yet.</p>
        ) : (
          <ul className="list-disc pl-5 text-sm">
            {stats.map((s) => (
              <li key={s.game}>
                {s.game}: {s.minutes} min ({s.percent}%)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
