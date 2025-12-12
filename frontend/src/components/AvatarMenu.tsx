import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

type Props = {
  email: string;
  avatarUrl?: string | null;
  isAdmin?: boolean;
};

export default function AvatarMenu({ email, avatarUrl, isAdmin }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleLogout() {
    await signOut(auth);
    localStorage.clear();
    navigate(isAdmin ? "/admin-login" : "/login", { replace: true });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-10 h-10 rounded-full overflow-hidden border border-slate-700 hover:border-cyan-400 transition"
      >
        {avatarUrl ? (
          <img src={avatarUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs font-bold">
            {email[0].toUpperCase()}
          </div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-60 rounded-xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-slate-800">
            <div className="text-xs text-slate-400">
              Signed in as
            </div>
            <div className="text-sm font-semibold truncate">
              {email}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-500/10"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
