import { Link } from "@tanstack/react-router";
import { Headphones, Home, LayoutGrid, CreditCard, Settings, HelpCircle, LogOut, X } from "lucide-react";

export const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid },
  { title: "Tickets", url: "/tickets", icon: CreditCard },
  { title: "Setting", url: "/setting", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
] as const;

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-foreground/30 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-card px-4 py-6 shadow-card transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-2">
          <span className="grid size-10 place-items-center rounded-xl bg-brand text-brand-foreground">
            <Headphones className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">HelpDesk Lite</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto rounded-md p-1 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              onClick={onClose}
              activeOptions={{ exact: item.url === "/" }}
              activeProps={{ className: "bg-brand text-brand-foreground shadow-card" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-muted hover:text-foreground" }}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:translate-x-0.5"
            >
              <item.icon className="size-4.5" />
              {item.title}
            </Link>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <LogOut className="size-4.5" />
          Log out
        </button>
      </aside>
    </>
  );
}