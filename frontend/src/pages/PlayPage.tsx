import { useEffect, useState } from "react";
import genres from "../assets/genres";
import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import { getAvatarForUser } from "../utils/avatars";
import AppShell from "../components/layout/AppShell";
import { ArrowLeft } from "lucide-react";
import { api } from "../lib/api";

export default function PlayPage() {
  const [users, setUsers] = useState<any[]>([]);
  
  const [games, setGames] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | undefined>();
  const [gameId, setGameId] = useState<number | undefined>();

  const navigate = useNavigate();
const isAdmin = localStorage.getItem("isAdmin") === "true";
const me = JSON.parse(localStorage.getItem("user") || "null"); // { email, uid, ... }

useEffect(() => {
  (async () => {
    const [usersRes, gamesRes] = await Promise.all([
      api.get("/api/users"),
      api.get("/api/games"),
    ]);

    setUsers(usersRes.data);
    setGames(gamesRes.data);

    if (!isAdmin && me?.email) {
      const found = usersRes.data.find((u: any) => u.email === me.email);
      if (found) setUserId(found.id);
    }
  })();
}, [isAdmin, me?.email]);


  function start() {
    if (!userId || !gameId) {
      alert("Select game first.");
      return;
    }
    const user = users.find((u) => u.id === userId);
    const game = games.find((g) => g.id === gameId);
    if (!user || !game) return;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const avatar = user.profilePic?.startsWith("/uploads")
  ? `${API_URL}${user.profilePic}`
      : user.profilePic || getAvatarForUser(user.id);

    navigate("/play/timer", { state: { user, game, avatar } });
  }

  function handleShowcaseClick(name: string) {
    const found = games.find(
      (g: any) => g.name.toLowerCase() === name.toLowerCase()
    );
    if (found) setGameId(found.id);
  }

  const totalShowcase = genres.length;

  return (
    <AppShell>
    <div className="p-6 space-y-6">
      {/* Back to Dashboard */}
    <button
      onClick={() => navigate("/dashboard")}
      className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition mb-6"
    >
      <ArrowLeft size={18} />
      <span className="text-sm">Back to Dashboard</span>
    </button>
      <h2 className="text-2xl font-bold text-gray-100">Play Game</h2>

      <div className="flex flex-wrap items-center gap-3">
        {isAdmin && (
        <select
          className="border border-slate-600 bg-slate-800 text-slate-100 p-2 rounded min-w-[180px]"
          value={userId ?? ""}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.firstName} {u.lastName}
            </option>
          ))}
        </select>
        )}
        <select
          className="border border-slate-600 bg-slate-800 text-slate-100 p-2 rounded min-w-[180px]"
          value={gameId ?? ""}
          onChange={(e) => setGameId(Number(e.target.value))}
        >
          <option value="">Select Game</option>
          {games.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-40 flex items-center gap-2"
          onClick={start}
          disabled={!userId || !gameId}
        >
          <span>▶</span> Start
        </button>
      </div>

      <section className="mt-4">
        <h3 className="text-3xl font-black uppercase tracking-wide">
          Games{" "}
          <span className="text-orange-500 align-top text-2xl">
            ({totalShowcase})
          </span>
        </h3>

        <div className="w-full flex justify-center">
  <div className="w-full max-w-7xl px-6">
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {genres.slice(0, 4).map((genre) => {
        const game = genre.games[0];
        return (
          <GameCard
            key={genre.id}
            genre={genre}
            game={game}
            onClick={() => handleShowcaseClick(game.name)}
          />
        );
      })}
    </div>
  </div>
</div>

      </section>
    </div>
    </AppShell>
  );
}
