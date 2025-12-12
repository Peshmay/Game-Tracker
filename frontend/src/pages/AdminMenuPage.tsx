// frontend/src/pages/AdminMenuPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { Users, UserPlus, ShieldCheck, ChevronRight, Sparkles } from "lucide-react";
import AdminShell from "../components/layout/AdminShell";
export default function AdminMenuPage() {
  const navigate = useNavigate();

  // ACCESS GUARD
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) navigate("/admin-login", { replace: true });
  }, [navigate]);

  return (
    <AdminShell>
      {/* Full page canvas */}
      <div className="relative min-h-[calc(100vh-0px)] overflow-hidden px-6 py-10">
        {/* Background gradient + soft glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_30%_10%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_500px_at_70%_50%,rgba(34,211,238,0.14),transparent_60%),radial-gradient(900px_500px_at_60%_90%,rgba(16,185,129,0.12),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-slate-950/50" />

        {/* Content wrapper (centered like screenshot) */}
        <div className="relative mx-auto w-full max-w-5xl">
          {/* Header */}
          <div className="mb-10 flex items-start gap-6">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 shadow-[0_0_0_1px_rgba(168,85,247,0.12),0_16px_40px_rgba(0,0,0,0.35)]">
                <ShieldCheck className="h-9 w-9 text-purple-300" />
              </div>
              <div className="pointer-events-none absolute -right-4 -bottom-5 opacity-60">
                <Sparkles className="h-6 w-6 text-slate-300" />
              </div>
            </div>

            <div className="pt-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">
                Admin Dashboard
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300/80">
                Welcome back. Select an option below to manage your application.
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Card: All Users */}
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="group relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/35 p-10 text-left shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-900/45"
            >
              {/* glow blob */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/15" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-80" />

              <div className="relative">
                <div className="mb-8 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/40 bg-slate-950/35 shadow-inner transition group-hover:scale-[1.03] group-hover:border-cyan-300/70">
                    <Users className="h-10 w-10 text-cyan-300" />
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-100">All Users</h2>
                <p className="mt-2 text-sm text-slate-300/80">
                  View registered players, manage details, and review activity.
                </p>

                <div className="mt-8 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-6 py-3 text-sm font-semibold text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950">
                    View List <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </button>

            {/* Card: Register User */}
            <button
              type="button"
              onClick={() => navigate("/register-user")}
              className="group relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/35 p-10 text-left shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-slate-900/45"
            >
              {/* glow blob */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl transition group-hover:bg-emerald-400/15" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-80" />

              <div className="relative">
                <div className="mb-8 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/40 bg-slate-950/35 shadow-inner transition group-hover:scale-[1.03] group-hover:border-emerald-300/70">
                    <UserPlus className="h-10 w-10 text-emerald-300" />
                  </div>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-100">Register User</h2>
                <p className="mt-2 text-sm text-slate-300/80">
                  Add a new player and set up their profile (avatar optional).
                </p>

                <div className="mt-8 flex items-center justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-6 py-3 text-sm font-semibold text-emerald-200 transition group-hover:bg-emerald-300 group-hover:text-slate-950">
                    Add New <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* little sparkle bottom right (like screenshot corner) */}
          <div className="pointer-events-none mt-10 flex justify-end opacity-40">
            <Sparkles className="h-7 w-7 text-slate-200" />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
