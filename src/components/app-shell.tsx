import { useState, type ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <AppSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="flex-1 space-y-6 px-4 pb-10 pt-2 lg:px-8">{children}</main>
      </div>
    </div>
  );
}