import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/profile", label: "Profile", icon: "👤" },
  { to: "/users", label: "Users", icon: "👥" },
  { to: "/play", label: "Games", icon: "🎮" },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-56 bg-[#061019] text-slate-100 flex flex-col items-center py-10 shadow-xl">
      <div className="mb-10 text-xl font-bold tracking-wide">
        GameTime
      </div>

      <nav className="flex flex-col gap-8 w-full items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "flex flex-col items-center gap-2 text-sm transition",
                isActive ? "text-cyan-300" : "text-slate-300 hover:text-white",
              ].join(" ")
            }
          >
            <div
              className={
                "w-12 h-12 rounded-full flex items-center justify-center " +
                "bg-gradient-to-br from-[#262f4a] to-[#5f2c8a] shadow-md"
              }
            >
              <span className="text-xl">{item.icon}</span>
            </div>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
