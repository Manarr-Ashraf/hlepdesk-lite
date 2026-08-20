import { Bell, Mail, Menu, Search, ChevronDown } from "lucide-react";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 bg-background/80 px-4 py-4 backdrop-blur-md lg:px-8">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted lg:hidden"
      >
        <Menu className="size-5" />
      </button>

      <label className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-full bg-card py-3 pl-10 pr-4 text-sm outline-none ring-brand/40 transition-shadow placeholder:text-muted-foreground focus:ring-2"
        />
      </label>

      <div className="ml-auto flex items-center gap-4">
        {[Mail, Bell].map((Icon, i) => (
          <button
            key={i}
            className="relative rounded-lg p-1.5 text-muted-foreground transition-transform hover:scale-110 hover:text-foreground"
          >
            <Icon className="size-5" />
            <span className="absolute right-1 top-1 size-1.5 rounded-full bg-danger" />
          </button>
        ))}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="text-right leading-tight">
            <p className="text-sm font-semibold">Jane Cooper</p>
            <p className="text-xs text-muted-foreground">jane234@example.com</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-violet/15 text-sm font-semibold text-violet">
            JC
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}