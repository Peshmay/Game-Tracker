import AvatarMenu from "../AvatarMenu";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
      <header className="flex justify-between items-center px-6 py-3 border-b border-slate-800">
        <div className="text-lg font-bold">🎮 GameTimeTracker</div>

        {user && (
          <AvatarMenu
            email={user.email}
            avatarUrl={user.avatarUrl}
          />
        )}
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
