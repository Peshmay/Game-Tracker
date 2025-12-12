import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import PlayPage from "./pages/PlayPage";
import TimerPage from "./pages/TimerPage";
import StatisticsPage from "./pages/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";
import useAuth from "./hooks/useAuth";
import AdminMenuPage from "./pages/AdminMenuPage";
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import UserDashboardPage from "./pages/UserDashboardPage";


function Shell({ children }: { children: React.ReactNode }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
const adminEmail = localStorage.getItem("adminEmail") || "admin";

const [open, setOpen] = useState(false);
const menuRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  function onDocClick(e: MouseEvent) {
    if (!menuRef.current) return;
    if (!menuRef.current.contains(e.target as Node)) setOpen(false);
  }
  document.addEventListener("mousedown", onDocClick);
  return () => document.removeEventListener("mousedown", onDocClick);
}, []);

async function handleAdminLogout() {
  await signOut(auth);
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("adminEmail");
  setOpen(false);
  window.location.href = "/login";
}

  const user = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <Link to="/" className="text-lg font-bold tracking-tight">
          🎮 GameTimeTracker
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link to="/play" className="hover:text-pink-400">
            Play
          </Link>
          <Link to="/statistics" className="hover:text-pink-400">
            Statistics
          </Link>
          <Link to="/admin" className="hover:text-pink-400">
            Admin
          </Link>
        </nav>
        <div className="relative" ref={menuRef}>
  {isAdmin ? (
    <>
      <button
  onClick={() => setOpen((v) => !v)}
  className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 hover:border-cyan-400 transition"
  title="Admin menu"
>
  <img
    src="/avatars/fox.png"
    alt="Admin avatar"
    className="w-full h-full object-cover"
  />
</button>


      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800">
            <div className="text-xs text-slate-400">Signed in as</div>
            <div className="text-sm font-semibold text-slate-100 truncate">
              {adminEmail}
            </div>
          </div>

          <button
            onClick={handleAdminLogout}
            className="w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/10 hover:text-red-200 transition"
          >
            Logout
          </button>
        </div>
      )}
    </>
  ) : (
    <div className="text-xs text-slate-300">
      {user ? `Logged in as ${user.email}` : "Not logged in"}
    </div>
  )}
</div>

      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />

<Route
  path="/admin"
  element={
    <Shell>
      <AdminMenuPage />
    </Shell>
  }
/>

<Route
  path="/register-user"
  element={
    <Shell>
      <ProfilePage />
    </Shell>
  }
/>

<Route
  path="/dashboard"
  element={
    <Shell>
      <UserDashboardPage />
    </Shell>
  }
/>


      <Route
        path="/play"
        element={
          <Shell>
            <PlayPage />
          </Shell>
        }
      />
      <Route
        path="/play/timer"
        element={
          <Shell>
            <TimerPage />
          </Shell>
        }
      />
      <Route
        path="/statistics"
        element={
          <Shell>
            <StatisticsPage />
          </Shell>
        }
      />

      <Route
        path="/users"
        element={
          <Shell>
            <UsersPage />
          </Shell>
        }
      />
      <Route
        path="/users/:id"
        element={
          <Shell>
            <UserDetailsPage />
          </Shell>
        }
      />
      <Route
        path="/profile"
        element={
          <Shell>
            <ProfilePage />
          </Shell>
        }
      />

      <Route path="*" element={<div className="p-6">Not found</div>} />
    </Routes>
  );
}
