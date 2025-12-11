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

function Shell({ children }: { children: React.ReactNode }) {
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
          <Link to="/users" className="hover:text-pink-400">
            Admin
          </Link>
        </nav>
        <div className="text-xs text-slate-300">
          {user ? `Logged in as ${user.email}` : "Not logged in"}
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
