import { NavLink } from "react-router-dom";
import { User, Users, Gamepad2 } from "lucide-react";

const sidebarItems = [
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    to: "/users",
    label: "Users",
    icon: Users,
  },
  {
    to: "/play",
    label: "Games",
    icon: Gamepad2,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-24 bg-gradient-to-b from-[#050c1b] to-[#020816] border-r border-white/5 flex flex-col items-center pt-10">
      
      {/* Logo */}
      <div className="mb-10 text-xl">🎮</div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-8">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className="group flex flex-col items-center gap-2 w-20 select-none"
            >
              {({ isActive }) => (
                <>
                  {/* Icon bubble */}
                  <div
                    className={[
                      "h-12 w-12 rounded-full flex items-center justify-center",
                      "transition-all duration-200 border",
                      isActive
                        ? "bg-white/10 border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.45)]"
                        : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10",
                    ].join(" ")}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-purple-300"
                          : "text-slate-300 group-hover:text-slate-100"
                      }
                    />
                  </div>

                  {/* Label */}
                  <div
                    className={[
                      "text-[11px] tracking-wide",
                      isActive
                        ? "text-slate-200"
                        : "text-slate-400 group-hover:text-slate-200",
                    ].join(" ")}
                  >
                    {item.label}
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
