import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { requireAdmin } from "../utils/requireAdmin"; // ✅ NEW

export default function ProfilePage() {
  const navigate = useNavigate();

  // ✅ ADMIN GUARD
  useEffect(() => {
    requireAdmin(navigate);
  }, []);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = new FormData();
    form.append("email", email);
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    if (profilePic) form.append("profilePic", profilePic);

    await axios.post("http://localhost:4000/api/users", form);
    setMessage("User registered successfully!");
  }

  return (
    <AppShell>
      <div className="p-6 max-w-xl mx-auto">
        <button
          onClick={() => navigate("/admin")}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Admin Menu</span>
        </button>

        <h2 className="text-xl font-semibold mb-4">Register User</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Email"
            className="w-full bg-slate-800 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="First name"
            className="w-full bg-slate-800 p-2 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last name"
            className="w-full bg-slate-800 p-2 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <button className="bg-blue-500 px-4 py-2 rounded">Save</button>
        </form>

        {message && <p className="mt-4 text-emerald-400">{message}</p>}
      </div>
    </AppShell>
  );
}
