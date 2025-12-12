// frontend/src/pages/AdminMenuPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";

export default function AdminMenuPage() {
  const navigate = useNavigate();

  // SIMPLE ACCESS GUARD
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) navigate("/admin-login");
  }, [navigate]);

  return (
    <AppShell>
      <div className="p-10 text-slate-100">
        <h1 className="text-3xl font-bold mb-8">Admin Menu</h1>

        <div className="flex flex-col gap-6 max-w-sm">

          {/* All Users Button */}
          <button
            onClick={() => navigate("/users")}
            className="px-6 py-3 rounded bg-cyan-500 text-black font-semibold shadow hover:bg-cyan-400 transition"
          >
            📋 All Users
          </button>

          {/* Register User Button */}
          <button
            onClick={() => navigate("/register-user")}
            className="px-6 py-3 rounded bg-green-500 text-black font-semibold shadow hover:bg-green-400 transition"
          >
            ➕ Register User
          </button>

        
        </div>
      </div>
    </AppShell>
  );
}
