import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
};

const AppShell: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-[#071725] text-white">
      {/* Left sidebar */}
      <Sidebar />

      {/* Main area */}
      <main className="flex-1 bg-gradient-to-br from-[#102538] to-[#050c16]">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
