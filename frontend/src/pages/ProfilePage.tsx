import { useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const form = new FormData();
    form.append("email", email);
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    if (profilePic) form.append("profilePic", profilePic);

    try {
      await axios.post("http://localhost:4000/api/users", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("User registered successfully!");
      setEmail("");
      setFirstName("");
      setLastName("");
      setProfilePic(null);
    } catch (err: any) {
      console.error(err);
      setMessage("Failed to register user");
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register User</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs mb-1">Email</label>
          <input
            className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm"
            value={email}
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs mb-1">First name</label>
            <input
              className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs mb-1">Last name</label>
            <input
              className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-sm"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs mb-1">Profile picture (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProfilePic(e.target.files && e.target.files[0]
                ? e.target.files[0]
                : null)
            }
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-emerald-300">{message}</p>
      )}
    </div>
  );
}
