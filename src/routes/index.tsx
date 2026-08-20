import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Plus, RefreshCw, SlidersHorizontal, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Card, PageHeader, Pill, StatCard } from "@/components/ui-bits";
import { progressItems, tickets } from "@/lib/tickets-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — HelpDesk Lite Support Console" },
      {
        name: "description",
        content:
          "Track support tickets, response times and team progress from the HelpDesk Lite home overview.",
      },
      { property: "og:title", content: "Home — HelpDesk Lite Support Console" },
      {
        property: "og:description",
        content: "Ticket volume, first response, resolution time and team progress at a glance.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [page, setPage] = useState(3);

  return (
    <AppShell>
      <PageHeader
        title="Home"
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground shadow-card transition-transform hover:-translate-y-0.5 active:translate-y-0">
            <Plus className="size-4" />
            Create
          </button>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="# Tickets" value="0" index={0} />
        <StatCard label="Avg. First Response" value="0" unit="min" index={1} />
        <StatCard label="Avg. Resolution" value="0" unit="Day" index={2} />
        <StatCard label="Late Tickets %" value="0%" index={3} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card className="animate-rise stagger-2 overflow-hidden">
          <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-5">
            <h2 className="text-lg font-bold">Status Board</h2>
            <div className="flex items-center gap-4 text-muted-foreground">
              {[SlidersHorizontal, Pencil, Trash2, RefreshCw].map((Icon, i) => (
                <button
                  key={i}
                  className="transition-transform hover:scale-110 hover:text-foreground"
                  aria-label="Board action"
                >
                  <Icon className="size-4.5" />
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {["", "Ticket ID", "Title", "Status", "First Response", "Resolution", "Team", "Priority"].map(
                    (h) => (
                      <th key={h} className="px-4 py-4 text-left font-semibold">
                        {h === "" ? <input type="checkbox" className="size-4 accent-brand" /> : h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-t border-border transition-colors hover:bg-muted/60">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="size-4 accent-brand" />
                    </td>
                    <td className="px-4 py-4 font-medium text-muted-foreground">{t.id}</td>
                    <td className="px-4 py-4 font-medium">{t.title}</td>
                    <td className="px-4 py-4">
                      <Pill tone={t.status.tone} upper>
                        {t.status.label}
                      </Pill>
                    </td>
                    <td className="px-4 py-4">
                      {t.firstResponse ? <Pill tone="info">{t.firstResponse}</Pill> : "—"}
                    </td>
                    <td className="px-4 py-4">
                      {t.resolution ? <Pill tone="success">{t.resolution}</Pill> : "—"}
                    </td>
                    <td className="px-4 py-4">
                      <Pill tone="info">{t.team}</Pill>
                    </td>
                    <td className="px-4 py-4">
                      <Pill tone={t.priority.tone} upper>
                        {t.priority.label}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border px-6 py-4 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`size-9 rounded-lg text-sm font-medium transition-colors ${
                    page === n ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {String(n).padStart(2, "0")}
                </button>
              ))}
              <span className="px-1 text-muted-foreground">...</span>
              {[10, 11].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`size-9 rounded-lg text-sm font-medium transition-colors ${
                    page === n ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(11, p + 1))}
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </Card>

        <Card className="animate-rise stagger-3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Progress</h2>
            <button className="text-sm font-medium text-brand hover:underline">See All</button>
          </div>
          <div className="mt-5 space-y-4">
            {progressItems.map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-4 rounded-xl p-4 text-brand-foreground transition-transform duration-200 hover:scale-[1.02] ${item.className}`}
              >
                <span className="grid size-13 shrink-0 place-items-center rounded-full border-2 border-white/70 text-sm font-bold">
                  {item.percent}%
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="font-bold">{item.name}</p>
                  <p className="truncate text-xs opacity-90">{item.note}</p>
                  <p className="mt-1 text-xs font-semibold">Status: {item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
