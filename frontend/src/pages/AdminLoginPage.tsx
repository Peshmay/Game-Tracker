// src/pages/AdminLoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AppShell from "../components/layout/AppShell";

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

  const dateLabel = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleForgotPassword(e: React.MouseEvent) {
  e.preventDefault();
  alert("Admin password reset is not implemented in this demo.");
}


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // simple admin check – you can later make this role-based from backend
      const isAdminEmail = email.endsWith("@admin.com");
      if (!isAdminEmail) {
        throw new Error("You are not authorized as admin.");
      }
const storage = rememberMe ? localStorage : sessionStorage;

// clear the other storage so admin doesn't "stick" accidentally
localStorage.removeItem("isAdmin");
localStorage.removeItem("adminEmail");
sessionStorage.removeItem("isAdmin");
sessionStorage.removeItem("adminEmail");

storage.setItem("isAdmin", "true");
storage.setItem("adminEmail", cred.user.email || email);


      navigate("/admin", { replace: true }); // go to admin menu
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Could not sign in as admin.");
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
    {/* Top bar */}
    <header className="flex items-center justify-between px-10 pt-6 pb-4">
      <div>
        <div className="text-sm font-semibold text-slate-100">
          {dateLabel}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
          <span>🌤</span>
          <span>10 °C</span>
        </div>
      </div>
    </header>

    {/* Brand */}
<div className="w-full flex justify-center pt-6 pb-2">
  <div className="w-full max-w-3xl flex items-center justify-center gap-6">
    <div className="w-20 h-20 rounded-full bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center">
      <span className="text-cyan-400 text-4xl">⏱</span>
    </div>

    <div className="text-6xl font-extrabold tracking-tight leading-none">
      <span className="text-slate-100">GameTime</span>
      <span className="text-cyan-400">Tracker</span>
    </div>
  </div>
</div>


    {/* Center card */}
    <div className="flex-1 flex items-center justify-center pb-10">
      <div className="w-full max-w-3xl bg-[#102437] rounded-2xl shadow-2xl px-12 py-10">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-sm text-slate-300 mb-8">
          Log in to manage users and game sessions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              E-mail <span className="text-cyan-400">*</span>
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-sm bg-[#e7f0ff] text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Password <span className="text-cyan-400">*</span>
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-sm bg-[#e7f0ff] text-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="flex items-center justify-between">
  <label className="flex items-center gap-2 text-sm text-slate-300">
    <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e) => setRememberMe(e.target.checked)}
      className="accent-cyan-400"
    />
    Remember me
  </label>

  <button
    type="button"
    onClick={handleForgotPassword}
    className="text-sm text-slate-300 hover:text-cyan-300 underline-offset-4 hover:underline"
  >
    Forgot Password?
  </button>
</div>


          {error && (
            <p className="text-sm text-red-400 bg-red-900/20 border border-red-700 rounded px-3 py-2">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-sm bg-[#00c4ff] text-slate-900 font-semibold shadow-md hover:bg-[#03b1e3] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "LOGGING IN..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-slate-300 hover:text-cyan-300 underline-offset-4 hover:underline"
            >
              ← Back to user login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

};

export default AdminLoginPage;
