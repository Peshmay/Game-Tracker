import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  email: string;
  avatarUrl?: string | null;
  name?: string | null;
};

function getInitials(email: string) {
  const base = (email || "").split("@")[0] || "U";
  const parts = base.split(/[._-]+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "U";
  const second = parts[1]?.[0] ?? (parts[0]?.[1] ?? "");
  return (first + second).toUpperCase();
}

export default function UserMenu({
  user,
  onLogout,
}: {
  user: User | null;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  if (!user) return null;

  const initials = getInitials(user.email);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.06)",
          padding: "8px 10px",
          borderRadius: 999,
          cursor: "pointer",
        }}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="User avatar"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />
        ) : (
          <div
            aria-hidden
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: 0.5,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.10)",
              color: "white",
            }}
          >
            {initials}
          </div>
        )}

        <span style={{ color: "white", fontSize: 13, opacity: 0.9 }}>
          {user.email}
        </span>

        <span style={{ color: "white", opacity: 0.7, fontSize: 12 }}>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="User menu"
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 10px)",
            minWidth: 260,
            background: "rgba(20, 20, 28, 0.98)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 14,
            boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              padding: 14,
              borderBottom: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
              Signed in
            </div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
              {user.email}
            </div>
          </div>

          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "12px 14px",
              background: "transparent",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Profile
          </button>

          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "12px 14px",
              background: "transparent",
              color: "#ffb4b4",
              border: "none",
              cursor: "pointer",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
