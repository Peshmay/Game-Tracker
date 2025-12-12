import AvatarMenu from "../AvatarMenu";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const email = localStorage.getItem("adminEmail") || "admin";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
      <header className="flex justify-between items-center px-6 py-3 border-b border-slate-800">
        <div className="text-lg font-bold">🛠 Admin Dashboard</div>

        <AvatarMenu
          email={email}
          isAdmin
        />
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
