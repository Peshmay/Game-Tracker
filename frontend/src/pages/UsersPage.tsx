import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAvatarForUser } from "../utils/avatars";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import WeatherWidget from "../components/WeatherWidget";
import AppShell from "../components/layout/AppShell";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const authUser = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this user? This cannot be undone.")) return;

    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      fetchUsers();
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(
        err?.response?.data?.message ||
          "Could not delete this user. They might have existing game sessions."
      );
    }
  }

  function picSrc(u: any) {
    const p = u.profilePic as string | null;

    if (!p || p === "/uploads/default.png") {
      return getAvatarForUser(u.id);
    }
    if (p.startsWith("/uploads")) {
      return `http://localhost:4000${p}`;
    }
    return p;
  }

  async function logout() {
    await signOut(auth);
    navigate("/login", { replace: true });
  }

  return (
    <AppShell>
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">All Users</h2>
          <WeatherWidget />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">
            Logged in as: {authUser?.email}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition"
          >
            Logout
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition"
          >
            + Add User
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="w-48 bg-gray-100 text-slate-900 p-3 rounded shadow text-center hover:scale-105 hover:bg-blue-50 transition transform relative"
          >
            <button
              onClick={() => handleDelete(u.id)}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
            >
              ✕
            </button>

            <img
              src={picSrc(u)}
              alt={u.firstName}
              className="w-24 h-24 object-cover mx-auto rounded-full"
            />

            <p className="font-semibold mt-2">
              {u.firstName} {u.lastName}
            </p>

            <p className="text-xs text-gray-600">{u.email}</p>

            <button
              onClick={() => navigate(`/users/${u.id}`)}
              className="mt-3 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
    </AppShell>
  );
}
