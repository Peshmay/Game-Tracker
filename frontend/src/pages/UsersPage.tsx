import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAvatarForUser } from "../utils/avatars";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import WeatherWidget from "../components/WeatherWidget";
import AppShell from "../components/layout/AppShell";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "../utils/requireAdmin"; // ✅ NEW

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const authUser = useAuth();

  // ✅ ADMIN GUARD
  useEffect(() => {
    if (!requireAdmin(navigate)) return;
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await axios.get("http://localhost:4000/api/users");
    setUsers(res.data);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    fetchUsers();
  }

  function picSrc(u: any) {
    if (u.profilePic?.startsWith("/avatars")) return u.profilePic;
    return getAvatarForUser(u.id);
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("isAdmin");
    navigate("/login", { replace: true });
  }

  return (
    <AppShell>
      <div className="p-6 space-y-4">
        {/* Back */}
        <button
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Admin Menu</span>
        </button>

        <h2 className="text-xl font-semibold">All Users</h2>

        <div className="flex flex-wrap gap-4">
          {users.map((u) => (
            <div key={u.id} className="w-48 bg-white p-3 rounded shadow text-center relative">
              <button
                onClick={() => handleDelete(u.id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>

              <img
                src={picSrc(u)}
                className="w-24 h-24 rounded-full mx-auto"
              />

              <p className="font-semibold mt-2">
                {u.firstName} {u.lastName}
              </p>

              <p className="text-xs text-gray-600">{u.email}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
