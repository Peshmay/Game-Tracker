import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const ADMIN_EMAILS = ["admin@example.com"];

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const loggedEmail = cred.user.email || "";
      if (!ADMIN_EMAILS.includes(loggedEmail)) {
        setError("You are not registered as an admin.");
        return;
      }
      navigate("/users", { replace: true });
    } catch (err: any) {
      console.error(err);
      setError("Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <div className="w-[360px] rounded-xl shadow-2xl bg-slate-800 text-white p-6">
        <h2 className="text-[22px] font-bold text-center mb-4">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Admin email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-600 bg-slate-900 text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-600 bg-slate-900 text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md py-2 font-semibold bg-pink-600 hover:bg-pink-500 transition disabled:opacity-60"
          >
            {loading ? "LOGGING IN..." : "LOGIN AS ADMIN"}
          </button>
        </form>
        {error && (
          <p className="mt-3 text-center text-sm text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
