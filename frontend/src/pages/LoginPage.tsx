import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AppShell from "../components/layout/AppShell";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const dateLabel = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // normal user: go to Users page after login
      navigate("/users", { replace: true });
    } catch (err: any) {
      console.error(err);
      if (err?.code === "auth/user-not-found") {
        setError("No user found with that email.");
      } else if (err?.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err?.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Could not sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="min-h-screen flex flex-col">
        {/* Top bar: date + fake weather + search */}
        <header className="flex items-center justify-between px-10 pt-6 pb-4">
          <div>
            <div className="text-sm font-semibold text-slate-100">
              {dateLabel}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
              <span>🌤</span>
              {/* you can replace this with real weather widget later */}
              <span>10 °C</span>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-64 rounded-full bg-[#07111d] border border-slate-700 px-4 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              🔍
            </span>
          </div>
        </header>

        {/* Center login card */}
        <div className="flex-1 flex items-center justify-center pb-10">
          <div className="w-full max-w-3xl bg-[#102437] rounded-2xl shadow-2xl px-12 py-10">
            <h1 className="text-2xl font-bold mb-8">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">
                  Email address <span className="text-cyan-400">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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

              {error && (
                <p className="text-sm text-red-400 bg-red-900/20 border border-red-700 rounded px-3 py-2">
                  {error}
                </p>
              )}

              {/* Buttons row */}
              <div className="flex justify-between pt-4">
                {/* LOGIN */}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 rounded-sm bg-[#00c4ff] text-slate-900 font-semibold shadow-md hover:bg-[#03b1e3] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "LOGGING IN..." : "LOGIN"}
                </button>

                {/* ADMIN button instead of Register */}
                <button
                  type="button"
                  onClick={() => navigate("/admin-login")}
                  className="px-8 py-2 rounded-sm border border-[#00c4ff] text-[#00c4ff] font-semibold hover:bg-[#00c4ff] hover:text-slate-900 transition"
                >
                  ADMIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default LoginPage;
